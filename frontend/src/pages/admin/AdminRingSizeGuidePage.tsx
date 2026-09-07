import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Save, RefreshCw, Eye, Check, Plus, Trash2 } from 'lucide-react';
import { api } from '../../services/api';
import { AdminImageUploadField } from '../../components/admin/AdminImageUploadField';
import { AdminPageHeader, AdminButton } from '../../components/admin/AdminUI';

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    color: #1f1f1f;
    margin: 0;
  }

  .subtitle {
    font-size: 0.88rem;
    color: #666;
    margin-top: 4px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;

  button {
    padding: 10px 18px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;

    &.btn-save {
      background: #19202a;
      color: #fff;
      &:hover {
        background: #c9a45c;
        color: #19202a;
      }
    }

    &.btn-view {
      background: #fff;
      border: 1px solid #d9d3c7;
      color: #1f1f1f;
      &:hover {
        border-color: #1f1f1f;
      }
    }
  }
`;

const TabsHeader = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e8e3d9;
  margin-bottom: 24px;
  overflow-x: auto;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 12px 18px;
  background: none;
  border: none;
  border-bottom: 3px solid ${({ $active }) => ($active ? '#19202A' : 'transparent')};
  color: ${({ $active }) => ($active ? '#19202A' : '#666')};
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  font-size: 0.88rem;
  cursor: pointer;
  white-space: nowrap;
  margin-bottom: -2px;

  &:hover {
    color: #19202a;
  }
`;

const FormCard = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 24px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    color: #1f1f1f;
    margin-top: 0;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f2ede4;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;

  label {
    font-size: 0.82rem;
    font-weight: 700;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  input,
  textarea,
  select {
    padding: 10px 14px;
    border: 1px solid #d9d3c7;
    border-radius: 4px;
    font-size: 0.9rem;
    font-family: inherit;
    color: #1f1f1f;

    &:focus {
      outline: none;
      border-color: #19202a;
    }
  }

  textarea {
    min-height: 90px;
    resize: vertical;
  }
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TableEditor = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;

  th,
  td {
    padding: 10px 12px;
    border: 1px solid #e8e3d9;
    text-align: left;
    font-size: 0.85rem;
  }

  th {
    background: #faf8f5;
    font-weight: 700;
    color: #1f1f1f;
  }

  input {
    width: 100%;
    padding: 6px 10px;
    border: 1px solid #d9d3c7;
    border-radius: 4px;
    font-size: 0.85rem;
  }

  button.btn-del {
    background: none;
    border: none;
    color: #c00;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const AdminRingSizeGuidePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('HERO');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState<any>({
    title: 'Ring Size Guide',
    slug: 'find-your-ring-size',
    status: 'PUBLISHED',
    heroTitle: 'FIND YOUR PERFECT RING SIZE',
    heroSubtitle: 'Comprehensive Aura Diamond Atelier Sizing Guide',
    heroImage: '/assets/education/ring-sizer-hero.jpg',
    heroImagePosition: 'center',
    heroBg: '#19202A',
    heroCtaText: 'Request Free Ring Sizer',
    heroCtaUrl: '#free-sizer',
    introHeading: "Precision Sizing for Life's Timeless Moments",
    introParagraphs: "At Aura Diamond Atelier, a ring is a symbol of lifelong devotion crafted to fit comfortably and securely.",
    introContent: '',
    infoHeading: 'International Ring Size Conversion',
    infoDescription: 'Measure your finger diameter or convert existing ring sizes using our standardized international chart.',
    chartImage: '/assets/education/ring-size-chart-printable.png',
    chartTitle: 'Ring Size Measurement Chart',
    chartDescription: 'Print at 100% scale to match your existing rings directly.',
    conversions: [
      { us: '3', uk: 'F', eu: '44', diameter: '14.1', circumference: '44.2' },
      { us: '4', uk: 'H 1/2', eu: '46.5', diameter: '14.9', circumference: '46.8' },
      { us: '5', uk: 'J 1/2', eu: '49', diameter: '15.7', circumference: '49.3' },
      { us: '6', uk: 'L 1/2', eu: '51.5', diameter: '16.5', circumference: '51.9' },
      { us: '7', uk: 'N 1/2', eu: '54', diameter: '17.3', circumference: '54.4' },
      { us: '8', uk: 'P 1/2', eu: '56.5', diameter: '18.1', circumference: '56.9' },
      { us: '9', uk: 'R 1/2', eu: '59', diameter: '18.9', circumference: '59.5' },
      { us: '10', uk: 'T 1/2', eu: '61.5', diameter: '19.8', circumference: '62.1' },
      { us: '11', uk: 'V 1/2', eu: '64', diameter: '20.6', circumference: '64.6' },
      { us: '12', uk: 'X 1/2', eu: '66.5', diameter: '21.4', circumference: '67.2' },
    ],
    sizerHeading: 'COMPLIMENTARY AURA RING SIZER',
    sizerDescription: 'Receive our reusable precision ring sizer delivered directly to your door with complimentary shipping.',
    sizerImage: '/assets/education/ring-sizer-tool.jpg',
    sizerButtonText: 'REQUEST FREE SIZER',
    sizerButtonUrl: '#request-sizer',
    measureHeading: 'HOW TO MEASURE AT HOME',
    measureDescription: 'Follow these three simple steps using a strip of paper or string.',
    measureSteps: [
      {
        step: 1,
        title: 'Wrap Paper or String',
        description: 'Wrap a paper strip comfortably around the base of your finger.',
        image: '/assets/education/step-1-wrap.jpg',
      },
      {
        step: 2,
        title: 'Mark Measurement Point',
        description: 'Mark the exact point where the ends meet with a fine pen.',
        image: '/assets/education/step-2-mark.jpg',
      },
      {
        step: 3,
        title: 'Measure Length in Millimeters',
        description: 'Measure the length against a ruler in mm to determine circumference.',
        image: '/assets/education/step-3-ruler.jpg',
      },
    ],
    ctaHeading: 'NEED EXPERT SIZING ASSISTANCE?',
    ctaDescription: 'Our master jewellers are available 7 days a week for personalized consultations.',
    ctaButtonText: 'BOOK ATELIER CONSULTATION',
    ctaButtonUrl: '/contact-us',
    ctaBg: '#19202A',
    seoTitle: 'Ring Size Guide | Aura Diamond Atelier',
    metaDescription: 'Find your perfect ring size with Aura Diamond Atelier international conversion chart.',
    keywords: 'ring size guide, ring sizer, international ring sizes',
    canonicalUrl: 'https://auroradiamonds.com/education/rings/find-your-ring-size',
    ogTitle: 'Aura Diamond Atelier Ring Size Guide',
    ogDescription: 'Find your exact ring size using our international chart and free ring sizer tool.',
    ogImage: '/assets/education/ring-sizer-hero.jpg',
  });

  useEffect(() => {
    loadGuide();
  }, []);

  const loadGuide = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/v1/admin/ring-size-guide');
      if (res.data) {
        let conversions = res.data.conversionsJson;
        if (typeof conversions === 'string') {
          try {
            conversions = JSON.parse(conversions);
          } catch {}
        }

        let measureSteps = res.data.measureStepsJson;
        if (typeof measureSteps === 'string') {
          try {
            measureSteps = JSON.parse(measureSteps);
          } catch {}
        }

        setFormData((prev: any) => ({
          ...prev,
          ...res.data,
          conversions: conversions || prev.conversions,
          measureSteps: measureSteps || prev.measureSteps,
        }));
      }
    } catch (err) {
      console.error('Failed to load ring size guide:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleConversionChange = (idx: number, field: string, val: string) => {
    const nextConversions = [...(formData.conversions || [])];
    nextConversions[idx] = { ...nextConversions[idx], [field]: val };
    setFormData((prev: any) => ({ ...prev, conversions: nextConversions }));
  };

  const addConversionRow = () => {
    setFormData((prev: any) => ({
      ...prev,
      conversions: [...(prev.conversions || []), { us: '', uk: '', eu: '', diameter: '', circumference: '' }],
    }));
  };

  const deleteConversionRow = (idx: number) => {
    setFormData((prev: any) => ({
      ...prev,
      conversions: prev.conversions.filter((_: any, i: number) => i !== idx),
    }));
  };

  const handleStepChange = (idx: number, field: string, val: string) => {
    const nextSteps = [...(formData.measureSteps || [])];
    nextSteps[idx] = { ...nextSteps[idx], [field]: val };
    setFormData((prev: any) => ({ ...prev, measureSteps: nextSteps }));
  };

  const addStepRow = () => {
    const nextNum = (formData.measureSteps || []).length + 1;
    setFormData((prev: any) => ({
      ...prev,
      measureSteps: [...(prev.measureSteps || []), { step: nextNum, title: `Step ${nextNum}`, description: '', image: '' }],
    }));
  };

  const deleteStepRow = (idx: number) => {
    setFormData((prev: any) => ({
      ...prev,
      measureSteps: prev.measureSteps.filter((_: any, i: number) => i !== idx),
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccessMsg('');
      const payload = {
        ...formData,
        conversionsJson: JSON.stringify(formData.conversions || []),
        measureStepsJson: JSON.stringify(formData.measureSteps || []),
      };
      await api.put('/api/v1/admin/ring-size-guide', payload);
      setSuccessMsg('Ring Size Guide CMS Page saved successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to save ring size guide:', err);
      alert('Error saving Ring Size Guide');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading Ring Size Guide CMS...</div>;
  }

  return (
    <div>
      <AdminPageHeader
        title="Ring Size Guide CMS"
        description="Manage ring size education content, international size conversions, and sizer request forms."
        actions={
          <>
            <AdminButton
              $variant="secondary"
              onClick={() => window.open('/education/rings/find-your-ring-size', '_blank')}
              icon={<Eye size={14} color="#c9a45c" />}
            >
              Preview Live Page
            </AdminButton>
            <AdminButton
              $variant="gold"
              onClick={handleSave}
              $loading={saving}
              icon={<Save size={14} />}
            >
              Save CMS Page
            </AdminButton>
          </>
        }
      />

      {successMsg && (
        <div style={{ background: '#e6f4ea', color: '#137333', padding: '12px 16px', borderRadius: 4, marginBottom: 20, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Check size={18} /> {successMsg}
        </div>
      )}

      <TabsHeader>
        {['HERO', 'INTRODUCTION', 'CONVERSION CHART', 'COMPLIMENTARY SIZER', 'HOW TO MEASURE', 'CTA SECTION', 'SEO & METADATA'].map((tab) => (
          <TabButton key={tab} $active={activeTab === tab} onClick={() => setActiveTab(tab)}>
            {tab}
          </TabButton>
        ))}
      </TabsHeader>

      {/* HERO TAB */}
      {activeTab === 'HERO' && (
        <FormCard>
          <h3>Hero Banner Configuration</h3>
          <GridRow>
            <FormGroup>
              <label>Page Title</label>
              <input type="text" value={formData.title || ''} onChange={(e) => handleChange('title', e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>URL Slug</label>
              <input type="text" value={formData.slug || ''} onChange={(e) => handleChange('slug', e.target.value)} />
            </FormGroup>
          </GridRow>

          <FormGroup>
            <label>Hero Heading Title</label>
            <input type="text" value={formData.heroTitle || ''} onChange={(e) => handleChange('heroTitle', e.target.value)} />
          </FormGroup>

          <FormGroup>
            <label>Hero Subtitle</label>
            <input type="text" value={formData.heroSubtitle || ''} onChange={(e) => handleChange('heroSubtitle', e.target.value)} />
          </FormGroup>

          <GridRow>
            <FormGroup>
              <label>Hero Background Color / Gradient</label>
              <input type="text" value={formData.heroBg || '#19202A'} onChange={(e) => handleChange('heroBg', e.target.value)} />
            </FormGroup>
          <div style={{ marginTop: 16 }}>
            <AdminImageUploadField
              label="Hero Background Image"
              value={formData.heroImage || ''}
              onChange={(val) => handleChange('heroImage', val)}
            />
          </div>
          </GridRow>

          <GridRow>
            <FormGroup>
              <label>CTA Button Text</label>
              <input type="text" value={formData.heroCtaText || ''} onChange={(e) => handleChange('heroCtaText', e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>CTA Target URL</label>
              <input type="text" value={formData.heroCtaUrl || ''} onChange={(e) => handleChange('heroCtaUrl', e.target.value)} />
            </FormGroup>
          </GridRow>
        </FormCard>
      )}

      {/* INTRODUCTION TAB */}
      {activeTab === 'INTRODUCTION' && (
        <FormCard>
          <h3>Introduction & Storytelling</h3>
          <FormGroup>
            <label>Intro Heading</label>
            <input type="text" value={formData.introHeading || ''} onChange={(e) => handleChange('introHeading', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Intro Paragraph Text</label>
            <textarea value={formData.introParagraphs || ''} onChange={(e) => handleChange('introParagraphs', e.target.value)} rows={4} />
          </FormGroup>
          <FormGroup>
            <label>Rich Text / Additional Guidance Content</label>
            <textarea value={formData.introContent || ''} onChange={(e) => handleChange('introContent', e.target.value)} rows={6} placeholder="Enter extended HTML or Markdown..." />
          </FormGroup>
        </FormCard>
      )}

      {/* CONVERSION CHART TAB */}
      {activeTab === 'CONVERSION CHART' && (
        <FormCard>
          <h3>International Ring Size Conversion Matrix</h3>
          <GridRow>
            <FormGroup>
              <label>Chart Section Heading</label>
              <input type="text" value={formData.infoHeading || ''} onChange={(e) => handleChange('infoHeading', e.target.value)} />
            </FormGroup>
          <div style={{ marginTop: 16 }}>
            <AdminImageUploadField
              label="Chart Image"
              value={formData.chartImage || ''}
              onChange={(val) => handleChange('chartImage', val)}
            />
          </div>
          </GridRow>

          <FormGroup>
            <label>Chart Description</label>
            <textarea value={formData.infoDescription || ''} onChange={(e) => handleChange('infoDescription', e.target.value)} rows={2} />
          </FormGroup>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 12 }}>
            <h4 style={{ margin: 0, fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem' }}>Size Conversion Data Rows</h4>
            <button
              onClick={addConversionRow}
              style={{ padding: '6px 12px', background: '#19202A', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <Plus size={14} /> Add Row
            </button>
          </div>

          <TableEditor>
            <thead>
              <tr>
                <th>US Size</th>
                <th>UK Size</th>
                <th>EU Size</th>
                <th>Diameter (mm)</th>
                <th>Circumference (mm)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(formData.conversions || []).map((row: any, i: number) => (
                <tr key={i}>
                  <td>
                    <input type="text" value={row.us || ''} onChange={(e) => handleConversionChange(i, 'us', e.target.value)} placeholder="e.g. 7" />
                  </td>
                  <td>
                    <input type="text" value={row.uk || ''} onChange={(e) => handleConversionChange(i, 'uk', e.target.value)} placeholder="e.g. N 1/2" />
                  </td>
                  <td>
                    <input type="text" value={row.eu || ''} onChange={(e) => handleConversionChange(i, 'eu', e.target.value)} placeholder="e.g. 54" />
                  </td>
                  <td>
                    <input type="text" value={row.diameter || ''} onChange={(e) => handleConversionChange(i, 'diameter', e.target.value)} placeholder="e.g. 17.3" />
                  </td>
                  <td>
                    <input type="text" value={row.circumference || ''} onChange={(e) => handleConversionChange(i, 'circumference', e.target.value)} placeholder="e.g. 54.4" />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn-del" onClick={() => deleteConversionRow(i)} title="Delete row">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableEditor>
        </FormCard>
      )}

      {/* COMPLIMENTARY SIZER TAB */}
      {activeTab === 'COMPLIMENTARY SIZER' && (
        <FormCard>
          <h3>Complimentary Ring Sizer Banner</h3>
          <FormGroup>
            <label>Banner Heading</label>
            <input type="text" value={formData.sizerHeading || ''} onChange={(e) => handleChange('sizerHeading', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Banner Description</label>
            <textarea value={formData.sizerDescription || ''} onChange={(e) => handleChange('sizerDescription', e.target.value)} rows={3} />
          </FormGroup>
          <div style={{ marginTop: 16 }}>
            <AdminImageUploadField
              label="Sizer Image"
              value={formData.sizerImage || ''}
              onChange={(val) => handleChange('sizerImage', val)}
            />
          </div>
          <GridRow>
            <FormGroup>
              <label>Button Text</label>
              <input type="text" value={formData.sizerButtonText || ''} onChange={(e) => handleChange('sizerButtonText', e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>Button Target URL</label>
              <input type="text" value={formData.sizerButtonUrl || ''} onChange={(e) => handleChange('sizerButtonUrl', e.target.value)} />
            </FormGroup>
          </GridRow>
        </FormCard>
      )}

      {/* HOW TO MEASURE TAB */}
      {activeTab === 'HOW TO MEASURE' && (
        <FormCard>
          <h3>How to Measure at Home Steps</h3>
          <FormGroup>
            <label>Section Heading</label>
            <input type="text" value={formData.measureHeading || ''} onChange={(e) => handleChange('measureHeading', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Section Description</label>
            <textarea value={formData.measureDescription || ''} onChange={(e) => handleChange('measureDescription', e.target.value)} rows={2} />
          </FormGroup>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 12 }}>
            <h4 style={{ margin: 0, fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem' }}>Measurement Steps</h4>
            <button
              onClick={addStepRow}
              style={{ padding: '6px 12px', background: '#1920A', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <Plus size={14} /> Add Step
            </button>
          </div>

          {(formData.measureSteps || []).map((st: any, i: number) => (
            <div key={i} style={{ background: '#faf8f5', border: '1px solid #e8e3d9', padding: 16, borderRadius: 6, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <strong>Step #{i + 1}</strong>
                <button className="btn-del" onClick={() => deleteStepRow(i)} style={{ background: 'none', border: 'none', color: '#c00', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
              <FormGroup>
                <label>Step Title</label>
                <input type="text" value={st.title || ''} onChange={(e) => handleStepChange(i, 'title', e.target.value)} />
              </FormGroup>
              <div style={{ marginTop: 12 }}>
                <AdminImageUploadField
                  label="Step Image"
                  value={st.image || ''}
                  onChange={(val) => handleStepChange(i, 'image', val)}
                />
              </div>
              <FormGroup style={{ marginTop: 12 }}>
                <label>Step Description</label>
                <textarea value={st.description || ''} onChange={(e) => handleStepChange(i, 'description', e.target.value)} rows={2} />
              </FormGroup>
            </div>
          ))}
        </FormCard>
      )}

      {/* CTA SECTION TAB */}
      {activeTab === 'CTA SECTION' && (
        <FormCard>
          <h3>Bottom Call To Action Section</h3>
          <FormGroup>
            <label>CTA Heading</label>
            <input type="text" value={formData.ctaHeading || ''} onChange={(e) => handleChange('ctaHeading', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>CTA Description</label>
            <textarea value={formData.ctaDescription || ''} onChange={(e) => handleChange('ctaDescription', e.target.value)} rows={2} />
          </FormGroup>
          <GridRow>
            <FormGroup>
              <label>Button Text</label>
              <input type="text" value={formData.ctaButtonText || ''} onChange={(e) => handleChange('ctaButtonText', e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>Button Target URL</label>
              <input type="text" value={formData.ctaButtonUrl || ''} onChange={(e) => handleChange('ctaButtonUrl', e.target.value)} />
            </FormGroup>
          </GridRow>
          <FormGroup>
            <label>Background Color / Gradient</label>
            <input type="text" value={formData.ctaBg || '#19202A'} onChange={(e) => handleChange('ctaBg', e.target.value)} />
          </FormGroup>
        </FormCard>
      )}

      {/* SEO & METADATA TAB */}
      {activeTab === 'SEO & METADATA' && (
        <FormCard>
          <h3>SEO & Social Metadata</h3>
          <FormGroup>
            <label>SEO Meta Title</label>
            <input type="text" value={formData.seoTitle || ''} onChange={(e) => handleChange('seoTitle', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Meta Description</label>
            <textarea value={formData.metaDescription || ''} onChange={(e) => handleChange('metaDescription', e.target.value)} rows={3} />
          </FormGroup>
          <FormGroup>
            <label>Keywords</label>
            <input type="text" value={formData.keywords || ''} onChange={(e) => handleChange('keywords', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Canonical URL</label>
            <input type="text" value={formData.canonicalUrl || ''} onChange={(e) => handleChange('canonicalUrl', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Open Graph Title</label>
            <input type="text" value={formData.ogTitle || ''} onChange={(e) => handleChange('ogTitle', e.target.value)} />
          </FormGroup>
          <div style={{ marginTop: 12 }}>
            <AdminImageUploadField
              label="Open Graph Social Image"
              value={formData.ogImage || ''}
              onChange={(val) => handleChange('ogImage', val)}
            />
          </div>
        </FormCard>
      )}
    </div>
  );
};
