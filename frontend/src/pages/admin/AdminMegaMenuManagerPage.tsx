import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Layers,
  Plus,
  Trash2,
  Check,
  RotateCcw,
  Eye,
  Image as ImageIcon,
} from 'lucide-react';
import { api } from '../../services/api';
import { MediaUploader } from '../../components/admin/MediaUploader';
import {
  AdminCard,
  AdminCardHeader,
  AdminButton,
  AdminInput,
  AdminSelect,
} from '../../components/admin/AdminUI';

const StickyTopHeader = styled.div`
  position: sticky;
  top: 64px;
  z-index: 80;
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  @media (max-width: 900px) {
    top: 58px;
  }

  h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.8rem;
    color: #1f1f1f;
    margin: 0;
  }
`;

const ContentCanvas = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CategoryTabsBar = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e8e3d9;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 2px;
`;

const CategoryTabBtn = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? '#19202a' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#fffdfa' : '#55524d')};
  border: 1px solid ${({ $active }) => ($active ? '#19202a' : '#e8e3d9')};
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    border-color: #19202a;
    color: ${({ $active }) => ($active ? '#fffdfa' : '#19202a')};
  }
`;

const SectionContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`;

const LinkRowItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 120px 80px 40px;
  gap: 12px;
  align-items: center;
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 10px 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PromoCardBox = styled.div`
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 18px;
  display: grid;
  grid-template-columns: 320px 1fr 50px;
  gap: 20px;
  align-items: start;
  margin-bottom: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LivePreviewContainer = styled.div`
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
`;

const DEFAULT_MEGAMENU_STATE = [
  {
    id: 'rings-menu',
    title: 'RINGS',
    url: '/rings',
    position: 1,
    hasDropdown: true,
    megaMenu: {
      columns: [
        {
          sections: [
            {
              heading: 'WEDDING RINGS',
              links: [
                { label: "Women's Wedding Rings", url: '/rings?category=womens-wedding', badge: '' },
                { label: "Men's Wedding Bands", url: '/rings?category=mens-wedding', badge: '' },
              ],
            },
            {
              heading: 'DIAMOND ESSENTIALS',
              links: [
                { label: 'Eternity Rings', url: '/rings?category=eternity', badge: '' },
                { label: 'Anniversary Rings', url: '/rings?category=anniversary', badge: '' },
              ],
            },
            {
              heading: 'ENGAGEMENT RINGS',
              links: [
                { label: 'Design Your Own Engagement Ring', url: '/customise', badge: '' },
                { label: 'Ready To Ship Engagement Rings', url: '/rings?category=ready-to-ship', badge: 'NEW' },
              ],
            },
            {
              heading: 'EDUCATION',
              links: [{ label: 'Rings Guide', url: '/education/rings/find-your-ring-size', badge: '' }],
            },
          ],
        },
        {
          sections: [
            {
              heading: 'SHOP ALL RINGS',
              links: [
                { label: 'Best Selling Rings', url: '/rings?sort=best-selling', badge: '' },
                { label: 'Diamond Rings', url: '/rings?category=diamond', badge: '' },
                { label: 'Gemstone Rings', url: '/rings?category=gemstone', badge: '' },
                { label: 'Emerald Rings', url: '/rings?category=emerald', badge: '' },
                { label: 'Sapphire Rings', url: '/rings?category=sapphire', badge: '' },
                { label: 'Pearl Rings', url: '/rings?category=pearl', badge: '' },
                { label: 'Stackable Rings', url: '/rings?category=stackable', badge: '' },
                { label: 'Fashion Rings', url: '/rings?category=fashion', badge: '' },
                { label: 'Signet Rings', url: '/rings?category=signet', badge: '' },
                { label: "Men's Rings", url: '/rings?category=mens', badge: '' },
                { label: 'Infinity Rings', url: '/rings?category=infinity', badge: '' },
              ],
            },
            {
              heading: 'NEW ARRIVALS',
              links: [{ label: 'Shop Aura Collection', url: '/rings?sort=newest', badge: 'NEW' }],
            },
          ],
        },
        {
          promos: [
            {
              title: 'SOLITAIRE RINGS',
              subtitle: '18K Basket & Peg Settings',
              desktopImage: '/assets/gem_rings_cat.png',
              url: '/rings?style=solitaire',
              enabled: true,
            },
            {
              title: 'WEDDING BANDS',
              subtitle: 'Handcrafted 18K Gold & Platinum',
              desktopImage: '/assets/gem_solitaire_ring_perfect.png',
              url: '/rings?category=womens-wedding',
              enabled: true,
            },
          ],
        },
      ],
    },
  },
  {
    id: 'earrings-menu',
    title: 'EARRINGS',
    url: '/earrings',
    position: 2,
    hasDropdown: true,
    megaMenu: {
      columns: [
        {
          sections: [
            {
              heading: 'CATEGORIES',
              links: [
                { label: 'All Earrings', url: '/earrings', badge: '' },
                { label: 'Stud Earrings', url: '/earrings?category=studs', badge: '' },
                { label: 'Drop & Dangle', url: '/earrings?category=drop', badge: '' },
                { label: 'Hoop Earrings', url: '/earrings?category=hoops', badge: '' },
                { label: 'Diamond Huggies', url: '/earrings?category=huggies', badge: '' },
              ],
            },
          ],
        },
        {
          sections: [
            {
              heading: 'FEATURED STYLES',
              links: [
                { label: 'Solitaire Studs', url: '/earrings?style=solitaire-studs', badge: '' },
                { label: 'Pear Cut Drops', url: '/earrings?style=pear-drops', badge: '' },
                { label: 'Halo Studs', url: '/earrings?style=halo-studs', badge: '' },
                { label: 'Cluster Earrings', url: '/earrings?style=cluster', badge: '' },
              ],
            },
          ],
        },
        {
          sections: [
            {
              heading: 'SHOP BY METAL',
              links: [
                { label: '18K Yellow Gold', url: '/earrings?metal=18k-yellow-gold', badge: '' },
                { label: '18K White Gold', url: '/earrings?metal=18k-white-gold', badge: '' },
                { label: '18K Rose Gold', url: '/earrings?metal=18k-rose-gold', badge: '' },
              ],
            },
          ],
        },
        {
          promos: [
            {
              title: 'DIAMOND DROP EARRINGS',
              subtitle: 'Handcrafted Pear Cuts',
              desktopImage: '/assets/gem_earrings_cat.png',
              url: '/earrings?category=drop',
              enabled: true,
            },
          ],
        },
      ],
    },
  },
  {
    id: 'necklaces-menu',
    title: 'NECKLACES',
    url: '/necklaces',
    position: 3,
    hasDropdown: true,
    megaMenu: {
      columns: [
        {
          sections: [
            {
              heading: 'CATEGORIES',
              links: [
                { label: 'All Necklaces', url: '/necklaces', badge: '' },
                { label: 'Diamond Necklaces', url: '/necklaces?category=diamond', badge: '' },
                { label: 'Tennis Necklaces', url: '/necklaces?category=tennis', badge: '' },
                { label: 'Statement Pieces', url: '/necklaces?category=statement', badge: '' },
                { label: 'Chokers', url: '/necklaces?category=chokers', badge: '' },
              ],
            },
          ],
        },
        {
          sections: [
            {
              heading: 'FEATURED DESIGNS',
              links: [
                { label: 'Graduated Tennis Necklaces', url: '/necklaces?style=graduated', badge: '' },
                { label: 'Marquise & Pear Clusters', url: '/necklaces?style=marquise-pear', badge: '' },
                { label: 'Layering Chains', url: '/necklaces?style=chains', badge: '' },
              ],
            },
          ],
        },
        {
          sections: [
            {
              heading: 'SHOP BY METAL',
              links: [
                { label: '18K Yellow Gold', url: '/necklaces?metal=18k-yellow-gold', badge: '' },
                { label: '18K White Gold', url: '/necklaces?metal=18k-white-gold', badge: '' },
                { label: '18K Rose Gold', url: '/necklaces?metal=18k-rose-gold', badge: '' },
              ],
            },
          ],
        },
        {
          promos: [
            {
              title: 'RIVIÈRE NECKLACES',
              subtitle: 'Precision Hand-Set Diamonds',
              desktopImage: '/assets/gem_necklaces_cat.png',
              url: '/necklaces?category=tennis',
              enabled: true,
            },
          ],
        },
      ],
    },
  },
  {
    id: 'bracelets-menu',
    title: 'BRACELETS',
    url: '/bracelets',
    position: 4,
    hasDropdown: true,
    megaMenu: {
      columns: [
        {
          sections: [
            {
              heading: 'CATEGORIES',
              links: [
                { label: 'All Bracelets', url: '/bracelets', badge: '' },
                { label: 'Tennis Bracelets', url: '/bracelets?category=tennis', badge: '' },
                { label: 'Bangles & Cuffs', url: '/bracelets?category=bangles', badge: '' },
                { label: 'Chain Bracelets', url: '/bracelets?category=chains', badge: '' },
              ],
            },
          ],
        },
        {
          sections: [
            {
              heading: 'DIAMOND CARAT SIZES',
              links: [
                { label: '2.00ct Tennis Bracelets', url: '/bracelets?carat=2', badge: '' },
                { label: '3.00ct Tennis Bracelets', url: '/bracelets?carat=3', badge: '' },
                { label: '5.00ct Tennis Bracelets', url: '/bracelets?carat=5', badge: '' },
                { label: '7.00ct+ High Jewelry', url: '/bracelets?carat=7', badge: '' },
              ],
            },
          ],
        },
        {
          promos: [
            {
              title: 'TENNIS BRACELETS',
              subtitle: 'Iconic Four-Prong Brilliance',
              desktopImage: '/assets/gem_bracelets_cat.png',
              url: '/bracelets?category=tennis',
              enabled: true,
            },
          ],
        },
      ],
    },
  },
  {
    id: 'pendants-menu',
    title: 'PENDANTS',
    url: '/pendants',
    position: 5,
    hasDropdown: true,
    megaMenu: {
      columns: [
        {
          sections: [
            {
              heading: 'SOLITAIRE PENDANTS',
              links: [
                { label: 'All Pendants', url: '/pendants', badge: '' },
                { label: 'Round Brilliant Pendants', url: '/pendants?shape=round', badge: '' },
                { label: 'Oval Cut Pendants', url: '/pendants?shape=oval', badge: '' },
                { label: 'Emerald Cut Pendants', url: '/pendants?shape=emerald', badge: '' },
                { label: 'Pear Cut Pendants', url: '/pendants?shape=pear', badge: '' },
              ],
            },
          ],
        },
        {
          sections: [
            {
              heading: 'DESIGN STYLES',
              links: [
                { label: 'Bezel Set Pendants', url: '/pendants?style=bezel', badge: '' },
                { label: 'Halo Diamond Pendants', url: '/pendants?style=halo', badge: '' },
                { label: 'Three-Prong Martini', url: '/pendants?style=martini', badge: '' },
              ],
            },
          ],
        },
        {
          promos: [
            {
              title: 'SOLITAIRE PENDANTS',
              subtitle: 'Custom Diamond Settings',
              desktopImage: '/assets/gem_pendants_cat.png',
              url: '/pendants',
              enabled: true,
            },
          ],
        },
      ],
    },
  },
  {
    id: 'diamonds-menu',
    title: 'DIAMONDS',
    url: '/diamonds',
    position: 6,
    hasDropdown: false,
    megaMenu: null,
  },
];

export const AdminMegaMenuManagerPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<any[]>(DEFAULT_MEGAMENU_STATE);
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<'sections' | 'promos' | 'preview'>('sections');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await api.getSiteSettings('megamenu_config');
      if (res && res.megamenu_config) {
        const parsed = typeof res.megamenu_config === 'string' ? JSON.parse(res.megamenu_config) : res.megamenu_config;
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized = parsed.map((item: any) => {
            const isDiamonds = (item.title || '').trim().toUpperCase() === 'DIAMONDS';
            if (isDiamonds) {
              return { ...item, hasDropdown: false, megaMenu: null };
            }
            return {
              ...item,
              hasDropdown: item.hasDropdown !== false && Boolean(item.megaMenu),
              megaMenu: typeof item.megaMenu === 'string' ? JSON.parse(item.megaMenu) : item.megaMenu || null,
            };
          });
          setMenuItems(normalized);
          return;
        }
      }
    } catch (err) {
      console.warn('Using default mega menu state:', err);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccessMsg('');
      setErrorMsg('');

      const payload = menuItems.map((item: any, idx: number) => ({
        ...item,
        position: idx + 1,
        hasDropdown: item.hasDropdown !== false && Boolean(item.megaMenu),
        megaMenu: (item.hasDropdown !== false && item.megaMenu) ? (typeof item.megaMenu === 'object' ? JSON.stringify(item.megaMenu) : item.megaMenu) : null,
      }));

      await api.updateSiteSetting('megamenu_config', payload);
      setSuccessMsg('✓ Mega Menu & navigation configuration saved successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save mega menu settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all mega menu categories, links, and promo hero cards to standard atelier defaults?')) {
      setMenuItems([...DEFAULT_MEGAMENU_STATE]);
    }
  };

  const currentItem = menuItems[activeCategoryIdx] || menuItems[0];
  const hasDropdown = currentItem?.hasDropdown !== false && Boolean(currentItem?.megaMenu);
  const currentMega = currentItem?.megaMenu || { columns: [] };

  const handleAddCategory = () => {
    const newCat = {
      id: 'custom-menu-' + Date.now(),
      title: 'NEW CATEGORY',
      url: '/shop',
      position: menuItems.length + 1,
      hasDropdown: true,
      megaMenu: {
        columns: [
          {
            sections: [
              {
                heading: 'FEATURED',
                links: [{ label: 'Discover All', url: '/shop', badge: '' }],
              },
            ],
          },
          {
            promos: [
              {
                title: 'NEW ARRIVALS',
                subtitle: 'Fine Handcrafted Pieces',
                desktopImage: '/assets/gem_rings_cat.png',
                url: '/shop',
                enabled: true,
              },
            ],
          },
        ],
      },
    };
    setMenuItems([...menuItems, newCat]);
    setActiveCategoryIdx(menuItems.length);
  };

  const handleDeleteCategory = (idx: number) => {
    if (menuItems.length <= 1) {
      alert('You must have at least one navigation menu category.');
      return;
    }
    if (window.confirm('Delete ' + menuItems[idx].title + ' menu category?')) {
      const updated = menuItems.filter((_, i) => i !== idx);
      setMenuItems(updated);
      setActiveCategoryIdx(Math.max(0, idx - 1));
    }
  };

  const handleAddSection = () => {
    const updated = [...menuItems];
    const item = { ...updated[activeCategoryIdx] };
    const mega = { ...(item.megaMenu || { columns: [] }) };
    const cols = [...(mega.columns || [])];

    let targetColIdx = cols.findIndex((c: any) => c.sections && Array.isArray(c.sections));
    if (targetColIdx === -1) {
      cols.unshift({ sections: [] });
      targetColIdx = 0;
    }

    const sections = [...(cols[targetColIdx].sections || [])];
    sections.push({
      heading: 'NEW SECTION HEADING',
      links: [{ label: 'New Product Link', url: '/shop', badge: '' }],
    });

    cols[targetColIdx] = { ...cols[targetColIdx], sections };
    item.megaMenu = { ...mega, columns: cols };
    updated[activeCategoryIdx] = item;
    setMenuItems(updated);
  };

  const handleDeleteSection = (colIdx: number, secIdx: number) => {
    const updated = [...menuItems];
    const item = { ...updated[activeCategoryIdx] };
    const mega = { ...(item.megaMenu || { columns: [] }) };
    const cols = [...(mega.columns || [])];

    if (cols[colIdx] && cols[colIdx].sections) {
      const sections = cols[colIdx].sections.filter((_: any, i: number) => i !== secIdx);
      cols[colIdx] = { ...cols[colIdx], sections };
      item.megaMenu = { ...mega, columns: cols };
      updated[activeCategoryIdx] = item;
      setMenuItems(updated);
    }
  };

  const handleUpdateSectionHeading = (colIdx: number, secIdx: number, newHeading: string) => {
    const updated = [...menuItems];
    const item = { ...updated[activeCategoryIdx] };
    const mega = { ...(item.megaMenu || { columns: [] }) };
    const cols = [...(mega.columns || [])];

    if (cols[colIdx] && cols[colIdx].sections && cols[colIdx].sections[secIdx]) {
      const sections = [...cols[colIdx].sections];
      sections[secIdx] = { ...sections[secIdx], heading: newHeading };
      cols[colIdx] = { ...cols[colIdx], sections };
      item.megaMenu = { ...mega, columns: cols };
      updated[activeCategoryIdx] = item;
      setMenuItems(updated);
    }
  };

  const handleAddLinkToSection = (colIdx: number, secIdx: number) => {
    const updated = [...menuItems];
    const item = { ...updated[activeCategoryIdx] };
    const mega = { ...(item.megaMenu || { columns: [] }) };
    const cols = [...(mega.columns || [])];

    if (cols[colIdx]?.sections?.[secIdx]) {
      const sections = [...cols[colIdx].sections];
      const links = [...(sections[secIdx].links || [])];
      links.push({ label: 'New Link', url: '/shop', badge: '' });
      sections[secIdx] = { ...sections[secIdx], links };
      cols[colIdx] = { ...cols[colIdx], sections };
      item.megaMenu = { ...mega, columns: cols };
      updated[activeCategoryIdx] = item;
      setMenuItems(updated);
    }
  };

  const handleUpdateLink = (colIdx: number, secIdx: number, linkIdx: number, field: string, val: string) => {
    const updated = [...menuItems];
    const item = { ...updated[activeCategoryIdx] };
    const mega = { ...(item.megaMenu || { columns: [] }) };
    const cols = [...(mega.columns || [])];

    if (cols[colIdx]?.sections?.[secIdx]?.links?.[linkIdx]) {
      const sections = [...cols[colIdx].sections];
      const links = [...sections[secIdx].links];
      links[linkIdx] = { ...links[linkIdx], [field]: val };
      sections[secIdx] = { ...sections[secIdx], links };
      cols[colIdx] = { ...cols[colIdx], sections };
      item.megaMenu = { ...mega, columns: cols };
      updated[activeCategoryIdx] = item;
      setMenuItems(updated);
    }
  };

  const handleDeleteLink = (colIdx: number, secIdx: number, linkIdx: number) => {
    const updated = [...menuItems];
    const item = { ...updated[activeCategoryIdx] };
    const mega = { ...(item.megaMenu || { columns: [] }) };
    const cols = [...(mega.columns || [])];

    if (cols[colIdx]?.sections?.[secIdx]?.links) {
      const sections = [...cols[colIdx].sections];
      const links = sections[secIdx].links.filter((_: any, i: number) => i !== linkIdx);
      sections[secIdx] = { ...sections[secIdx], links };
      cols[colIdx] = { ...cols[colIdx], sections };
      item.megaMenu = { ...mega, columns: cols };
      updated[activeCategoryIdx] = item;
      setMenuItems(updated);
    }
  };

  const handleAddPromoCard = () => {
    const updated = [...menuItems];
    const item = { ...updated[activeCategoryIdx] };
    const mega = { ...(item.megaMenu || { columns: [] }) };
    const cols = [...(mega.columns || [])];

    let promoColIdx = cols.findIndex((c: any) => c.promos && Array.isArray(c.promos));
    if (promoColIdx === -1) {
      cols.push({ promos: [] });
      promoColIdx = cols.length - 1;
    }

    const promos = [...(cols[promoColIdx].promos || [])];
    promos.push({
      title: 'FEATURED SPOTLIGHT',
      subtitle: 'Handcrafted Atelier Jewellery',
      desktopImage: '/assets/gem_rings_cat.png',
      url: '/rings',
      enabled: true,
    });

    cols[promoColIdx] = { ...cols[promoColIdx], promos };
    item.megaMenu = { ...mega, columns: cols };
    updated[activeCategoryIdx] = item;
    setMenuItems(updated);
  };

  const handleUpdatePromoCard = (promoIdx: number, field: string, val: any) => {
    const updated = [...menuItems];
    const item = { ...updated[activeCategoryIdx] };
    const mega = { ...(item.megaMenu || { columns: [] }) };
    const cols = [...(mega.columns || [])];

    const promoColIdx = cols.findIndex((c: any) => c.promos && Array.isArray(c.promos));
    if (promoColIdx !== -1 && cols[promoColIdx].promos[promoIdx]) {
      const promos = [...cols[promoColIdx].promos];
      promos[promoIdx] = { ...promos[promoIdx], [field]: val };
      cols[promoColIdx] = { ...cols[promoColIdx], promos };
      item.megaMenu = { ...mega, columns: cols };
      updated[activeCategoryIdx] = item;
      setMenuItems(updated);
    }
  };

  const handleDeletePromoCard = (promoIdx: number) => {
    const updated = [...menuItems];
    const item = { ...updated[activeCategoryIdx] };
    const mega = { ...(item.megaMenu || { columns: [] }) };
    const cols = [...(mega.columns || [])];

    const promoColIdx = cols.findIndex((c: any) => c.promos && Array.isArray(c.promos));
    if (promoColIdx !== -1 && cols[promoColIdx].promos) {
      const promos = cols[promoColIdx].promos.filter((_: any, i: number) => i !== promoIdx);
      cols[promoColIdx] = { ...cols[promoColIdx], promos };
      item.megaMenu = { ...mega, columns: cols };
      updated[activeCategoryIdx] = item;
      setMenuItems(updated);
    }
  };

  const promoCol = (currentMega.columns || []).find((c: any) => c.promos && Array.isArray(c.promos));
  const currentPromos = promoCol?.promos || [];

  return (
    <div>
      <StickyTopHeader>
        <div>
          <h1>Mega Menu & Category Navigation Manager</h1>
          <div style={{ fontSize: '0.82rem', color: '#77736c' }}>
            Customize all header navigation categories, dropdown column sections, product links, badges, and promotional hero image cards.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <AdminButton $variant="secondary" onClick={handleResetDefaults} icon={<RotateCcw size={13} />}>
            Reset Defaults
          </AdminButton>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              padding: '9px 14px',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#55524d',
              background: '#fff',
              border: '1px solid #e8e3d9',
              borderRadius: 6,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Eye size={14} /> View Storefront
          </a>
          <AdminButton $variant="gold" onClick={handleSave} $loading={saving} icon={<Check size={14} />}>
            Save Mega Menu Settings
          </AdminButton>
        </div>
      </StickyTopHeader>

      {successMsg && (
        <div style={{ maxWidth: 1400, margin: '0 auto 20px', background: '#e6f4ea', border: '1px solid #ceead6', color: '#137333', padding: '14px 18px', borderRadius: 6, fontWeight: 600 }}>
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ maxWidth: 1400, margin: '0 auto 20px', background: '#fff5f5', color: '#c53030', padding: '14px 18px', borderRadius: 6, border: '1px solid #feb2b2', fontWeight: 600 }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <ContentCanvas>
        {/* CATEGORY SELECTOR TABS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <CategoryTabsBar>
            {menuItems.map((item, idx) => (
              <CategoryTabBtn
                key={item.id || idx}
                $active={activeCategoryIdx === idx}
                onClick={() => setActiveCategoryIdx(idx)}
              >
                {item.title}
                {item.hasDropdown === false && (
                  <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.2)', padding: '1px 5px', borderRadius: 3, opacity: 0.8 }}>LINK</span>
                )}
              </CategoryTabBtn>
            ))}
          </CategoryTabsBar>

          <AdminButton $variant="secondary" $size="sm" onClick={handleAddCategory} icon={<Plus size={13} />}>
            + Add Menu Category
          </AdminButton>
        </div>

        {/* ACTIVE CATEGORY SETTINGS */}
        <AdminCard>
          <AdminCardHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h3 style={{ margin: 0 }}>CATEGORY: {currentItem?.title}</h3>
              {itemHasDropdownBadge(currentItem)}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <AdminButton
                $variant="danger"
                $size="sm"
                onClick={() => handleDeleteCategory(activeCategoryIdx)}
                icon={<Trash2 size={13} />}
              >
                Delete Category
              </AdminButton>
            </div>
          </AdminCardHeader>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 14 }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#555' }}>
                Header Menu Title
              </label>
              <AdminInput
                type="text"
                value={currentItem?.title || ''}
                onChange={(e) => {
                  const updated = [...menuItems];
                  updated[activeCategoryIdx] = { ...updated[activeCategoryIdx], title: e.target.value };
                  setMenuItems(updated);
                }}
                placeholder="Category Name (e.g. RINGS)"
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#555' }}>
                Destination URL
              </label>
              <AdminInput
                type="text"
                value={currentItem?.url || ''}
                onChange={(e) => {
                  const updated = [...menuItems];
                  updated[activeCategoryIdx] = { ...updated[activeCategoryIdx], url: e.target.value };
                  setMenuItems(updated);
                }}
                placeholder="Link Destination (e.g. /rings)"
              />
            </div>
          </div>

          {/* DROPDOWN TOGGLE OPTION */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0 20px', padding: '12px 16px', background: '#faf8f5', borderRadius: 6, border: '1px solid #e8e3d9' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 600, color: '#19202a', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={hasDropdown}
                onChange={(e) => {
                  const updated = [...menuItems];
                  const current = { ...updated[activeCategoryIdx] };
                  current.hasDropdown = e.target.checked;
                  if (!e.target.checked) {
                    current.megaMenu = null;
                  } else if (!current.megaMenu) {
                    current.megaMenu = { columns: [{ sections: [{ heading: 'CATEGORIES', links: [{ label: 'All ' + current.title, url: current.url || '/shop', badge: '' }] }] }] };
                  }
                  updated[activeCategoryIdx] = current;
                  setMenuItems(updated);
                }}
                style={{ accentColor: '#c9a45c', width: 16, height: 16 }}
              />
              Enable Mega Menu Dropdown for "{currentItem?.title}"
            </label>
            {!hasDropdown && (
              <span style={{ fontSize: '0.75rem', background: '#e2e8f0', color: '#475569', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                Direct Link Only
              </span>
            )}
          </div>

          {!hasDropdown ? (
            <div style={{ padding: '36px 24px', textAlign: 'center', background: '#faf8f5', borderRadius: 8, border: '1px dashed #d9d3c7' }}>
              <div style={{ fontSize: '1.2rem', marginBottom: 8 }}>🔗 Direct Navigation Link Active</div>
              <div style={{ fontSize: '0.85rem', color: '#666', maxWidth: 480, margin: '0 auto 16px' }}>
                Mega menu dropdown is currently <strong>disabled</strong> for <strong>{currentItem?.title}</strong>. When customers click this menu button on the storefront, they will navigate directly to <code>{currentItem?.url}</code> without opening any dropdown.
              </div>
              <AdminButton
                $variant="gold"
                $size="sm"
                onClick={() => {
                  const updated = [...menuItems];
                  const current = { ...updated[activeCategoryIdx] };
                  current.hasDropdown = true;
                  current.megaMenu = { columns: [{ sections: [{ heading: 'FEATURED', links: [{ label: 'Discover ' + current.title, url: current.url, badge: '' }] }] }] };
                  updated[activeCategoryIdx] = current;
                  setMenuItems(updated);
                }}
                icon={<Plus size={13} />}
              >
                + Enable Dropdown Mega Menu
              </AdminButton>
            </div>
          ) : (
            <>
              {/* SUB TABS */}
              <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid #e8e3d9', paddingBottom: 8, marginBottom: 20 }}>
                <button
                  type="button"
                  onClick={() => setActiveSubTab('sections')}
                  style={{
                    background: activeSubTab === 'sections' ? '#19202a' : 'transparent',
                    color: activeSubTab === 'sections' ? '#fff' : '#555',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                  }}
                >
                  📂 Column Sub-Sections & Links
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSubTab('promos')}
                  style={{
                    background: activeSubTab === 'promos' ? '#19202a' : 'transparent',
                    color: activeSubTab === 'promos' ? '#fff' : '#555',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                  }}
                >
                  🖼️ Promotional Hero Cards ({currentPromos.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSubTab('preview')}
                  style={{
                    background: activeSubTab === 'preview' ? '#19202a' : 'transparent',
                    color: activeSubTab === 'preview' ? '#fff' : '#555',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                  }}
                >
                  👁️ Visual Storefront Preview
                </button>
              </div>

              {/* SUB-TAB 1: SECTIONS & LINKS */}
              {activeSubTab === 'sections' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: '#19202a' }}>Navigation Sub-Sections</h4>
                      <div style={{ fontSize: '0.78rem', color: '#777' }}>
                        Add sections (e.g. WEDDING RINGS, SHOP ALL RINGS) and organize links beneath each header.
                      </div>
                    </div>
                    <AdminButton $variant="gold" $size="sm" onClick={handleAddSection} icon={<Plus size={13} />}>
                      + Add New Section
                    </AdminButton>
                  </div>

                  {(currentMega.columns || []).map((col: any, colIdx: number) => {
                    if (!col.sections || col.sections.length === 0) return null;

                    return (
                      <div key={colIdx} style={{ marginBottom: 20 }}>
                        {col.sections.map((sec: any, secIdx: number) => (
                          <SectionContainer key={secIdx}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                                <span style={{ fontWeight: 700, fontSize: '0.75rem', color: '#c9a45c', textTransform: 'uppercase' }}>
                                  SECTION HEADING:
                                </span>
                                <AdminInput
                                  type="text"
                                  value={sec.heading || ''}
                                  onChange={(e) => handleUpdateSectionHeading(colIdx, secIdx, e.target.value)}
                                  placeholder="e.g. WEDDING RINGS, DIAMOND ESSENTIALS"
                                  style={{ fontWeight: 700, maxWidth: 350 }}
                                />
                              </div>

                              <div style={{ display: 'flex', gap: 8 }}>
                                <AdminButton
                                  $variant="secondary"
                                  $size="sm"
                                  onClick={() => handleAddLinkToSection(colIdx, secIdx)}
                                  icon={<Plus size={12} />}
                                >
                                  + Add Link
                                </AdminButton>
                                <AdminButton
                                  $variant="danger"
                                  $size="sm"
                                  onClick={() => handleDeleteSection(colIdx, secIdx)}
                                  icon={<Trash2 size={12} />}
                                />
                              </div>
                            </div>

                            {/* LINKS LIST */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                              {(sec.links || []).map((link: any, linkIdx: number) => (
                                <LinkRowItem key={linkIdx}>
                                  <AdminInput
                                    type="text"
                                    value={link.label || ''}
                                    onChange={(e) => handleUpdateLink(colIdx, secIdx, linkIdx, 'label', e.target.value)}
                                    placeholder="Link Label (e.g. Women's Wedding Rings)"
                                  />
                                  <AdminInput
                                    type="text"
                                    value={link.url || ''}
                                    onChange={(e) => handleUpdateLink(colIdx, secIdx, linkIdx, 'url', e.target.value)}
                                    placeholder="Destination URL (e.g. /rings?category=wedding)"
                                  />
                                  <AdminSelect
                                    value={link.badge || ''}
                                    onChange={(e) => handleUpdateLink(colIdx, secIdx, linkIdx, 'badge', e.target.value)}
                                  >
                                    <option value="">No Badge</option>
                                    <option value="NEW">Badge: NEW</option>
                                    <option value="HOT">Badge: HOT</option>
                                    <option value="SALE">Badge: SALE</option>
                                    <option value="BEST">Badge: BEST</option>
                                  </AdminSelect>
                                  <div style={{ fontSize: '0.75rem', color: '#888' }}>
                                    #{linkIdx + 1}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteLink(colIdx, secIdx, linkIdx)}
                                    style={{
                                      border: '1px solid #fca5a5',
                                      background: '#fff5f5',
                                      color: '#c53030',
                                      borderRadius: 4,
                                      padding: 6,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </LinkRowItem>
                              ))}
                            </div>
                          </SectionContainer>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* SUB-TAB 2: PROMOTIONAL HERO CARDS */}
              {activeSubTab === 'promos' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: '#19202a' }}>Visual Promotional Hero Cards</h4>
                      <div style={{ fontSize: '0.78rem', color: '#777' }}>
                        Promotional cards render on the right-hand side of the mega menu with full PC file upload support.
                      </div>
                    </div>
                    <AdminButton $variant="gold" $size="sm" onClick={handleAddPromoCard} icon={<Plus size={13} />}>
                      + Add Promo Card
                    </AdminButton>
                  </div>

                  {currentPromos.map((promo: any, promoIdx: number) => (
                    <PromoCardBox key={promoIdx}>
                      <div>
                        <MediaUploader
                          label={'Hero Image #' + (promoIdx + 1)}
                          value={promo.desktopImage || promo.image || ''}
                          onChange={(url) => handleUpdatePromoCard(promoIdx, 'desktopImage', url)}
                          helpText="Drag & drop JPG, PNG or WEBP from your computer"
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#555' }}>
                            Promo Card Title
                          </label>
                          <AdminInput
                            type="text"
                            value={promo.title || ''}
                            onChange={(e) => handleUpdatePromoCard(promoIdx, 'title', e.target.value)}
                            placeholder="e.g. SOLITAIRE RINGS"
                            style={{ fontWeight: 700 }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#555' }}>
                            Promo Subtitle / Tagline
                          </label>
                          <AdminInput
                            type="text"
                            value={promo.subtitle || ''}
                            onChange={(e) => handleUpdatePromoCard(promoIdx, 'subtitle', e.target.value)}
                            placeholder="e.g. 18K Basket & Peg Settings"
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#555' }}>
                            Destination URL
                          </label>
                          <AdminInput
                            type="text"
                            value={promo.url || ''}
                            onChange={(e) => handleUpdatePromoCard(promoIdx, 'url', e.target.value)}
                            placeholder="e.g. /rings?style=solitaire"
                          />
                        </div>

                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', cursor: 'pointer', color: '#333', fontWeight: 600, marginTop: 4 }}>
                          <input
                            type="checkbox"
                            checked={promo.enabled !== false}
                            onChange={(e) => handleUpdatePromoCard(promoIdx, 'enabled', e.target.checked)}
                            style={{ accentColor: '#c9a45c' }}
                          />
                          Enable & Display this Card in Mega Menu
                        </label>
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={() => handleDeletePromoCard(promoIdx)}
                          style={{
                            border: '1px solid #fca5a5',
                            background: '#fff5f5',
                            color: '#c53030',
                            borderRadius: 6,
                            padding: 8,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          title="Delete Promo Card"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </PromoCardBox>
                  ))}

                  {currentPromos.length === 0 && (
                    <div style={{ textAlign: 'center', padding: 32, background: '#faf8f5', borderRadius: 8, border: '1px dashed #d9d3c7', color: '#777' }}>
                      No promo cards added for this category yet. Click "+ Add Promo Card" above to add image cards.
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TAB 3: LIVE PREVIEW */}
              {activeSubTab === 'preview' && (
                <div>
                  <div style={{ fontSize: '0.82rem', color: '#777', marginBottom: 16 }}>
                    Below is an interactive live preview of how the <strong>{currentItem?.title}</strong> mega menu will look on the live storefront:
                  </div>

                  <LivePreviewContainer>
                    <div style={{ display: 'flex', gap: 40, justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                      {/* LINKS SECTION */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, flex: 1 }}>
                        {(currentMega.columns || []).map((col: any, cIdx: number) => {
                          if (!col.sections) return null;
                          return (
                            <div key={cIdx} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                              {col.sections.map((sec: any, sIdx: number) => (
                                <div key={sIdx}>
                                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#242321', borderBottom: '1px solid #e8e3d9', paddingBottom: 6, marginBottom: 10 }}>
                                    {sec.heading}
                                  </div>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {(sec.links || []).map((link: any, lIdx: number) => (
                                      <div key={lIdx} style={{ fontSize: 13, color: '#55524d', display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span>{link.label}</span>
                                        {link.badge && (
                                          <span style={{ fontSize: 9, fontWeight: 700, background: '#c9a45c', color: '#fff', padding: '1px 5px', borderRadius: 2 }}>
                                            {link.badge}
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>

                      {/* PROMOS PREVIEW */}
                      {currentPromos.filter((p: any) => p.enabled !== false).length > 0 && (
                        <div style={{ display: 'flex', gap: 20, borderLeft: '1px solid #e8e3d9', paddingLeft: 32 }}>
                          {currentPromos.filter((p: any) => p.enabled !== false).map((promo: any, pIdx: number) => (
                            <div key={pIdx} style={{ width: 190, display: 'flex', flexDirection: 'column' }}>
                              <div style={{ width: '100%', height: 140, borderRadius: 4, overflow: 'hidden', background: '#e8e3d9', marginBottom: 8 }}>
                                <img
                                  src={promo.desktopImage || promo.image || '/assets/gem_rings_cat.png'}
                                  alt={promo.title}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              </div>
                              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: 13, color: '#1f1f1f', textTransform: 'uppercase' }}>
                                {promo.title}
                              </div>
                              <div style={{ fontSize: 11, color: '#77736c' }}>
                                {promo.subtitle}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </LivePreviewContainer>
                </div>
              )}
            </>
          )}
        </AdminCard>
      </ContentCanvas>
    </div>
  );
};

function itemHasDropdownBadge(item: any) {
  if (item?.hasDropdown === false || !item?.megaMenu) {
    return (
      <span style={{ fontSize: '0.72rem', background: '#e2e8f0', color: '#475569', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
        Direct Link (No Dropdown)
      </span>
    );
  }
  return (
    <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
      Dropdown Active
    </span>
  );
}
