import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Save, Plus, Trash2, Edit3, Eye, EyeOff, Check, Gem, Sliders } from 'lucide-react';
import { api } from '../../services/api';

const PageWrapper = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.2rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1f1f1f;
  margin: 0 0 6px 0;
`;

const Subtitle = styled.p`
  font-size: 0.88rem;
  color: #777;
  margin-bottom: 28px;
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  padding: 24px;
  margin-bottom: 20px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin: 0 0 16px 0;
    border-bottom: 1px solid #f2ede4;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
  }

  input, select {
    padding: 8px 12px;
    font-size: 0.88rem;
    border: 1px solid #d9d3c7;
    background: #faf5eb;
    outline: none;

    &:focus {
      border-color: #c9a45c;
      background: #ffffff;
    }
  }
`;

const ItemChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const OptionChip = styled.div<{ $enabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: ${({ $enabled }) => ($enabled !== false ? '#ffffff' : '#f5f5f5')};
  border: 1px solid ${({ $enabled }) => ($enabled !== false ? '#d9d3c7' : '#e0e0e0')};
  opacity: ${({ $enabled }) => ($enabled !== false ? 1 : 0.6)};
  font-size: 0.82rem;
  font-weight: 600;
  color: #1f1f1f;

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  .actions {
    display: flex;
    gap: 4px;
    margin-left: 6px;

    button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 2px;
      color: #666;
      &:hover {
        color: #c9a45c;
      }
    }
  }
`;

const SmallBtn = styled.button`
  padding: 6px 14px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: #ffffff;
  border: 1px solid #d9d3c7;
  color: #1f1f1f;
  cursor: pointer;

  &:hover {
    border-color: #c9a45c;
    color: #c9a45c;
  }
`;

const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #1f1f1f;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid #1f1f1f;
  cursor: pointer;

  &:hover {
    background: #c9a45c;
    border-color: #c9a45c;
    color: #1f1f1f;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(24, 23, 21, 0.75);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalCard = styled.div`
  background: #ffffff;
  border: 1px solid #d9d3c7;
  width: 100%;
  max-width: 480px;
  padding: 28px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    margin: 0 0 16px 0;
  }

  .field {
    margin-bottom: 14px;
    label {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    input {
      width: 100%;
      padding: 10px;
      font-size: 0.88rem;
      border: 1px solid #d9d3c7;
      background: #faf5eb;
      outline: none;
    }
  }

  .btn-row {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
  }
`;

export const AdminDiamondFilterManagerPage: React.FC = () => {
  const [configs, setConfigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalConfigId, setModalConfigId] = useState<string | null>(null);
  const [newOptionLabel, setNewOptionLabel] = useState('');
  const [newOptionValue, setNewOptionValue] = useState('');
  const [newOptionIcon, setNewOptionIcon] = useState('');

  const [toastMessage, setToastMessage] = useState('');

  const fetchFilters = async () => {
    setLoading(true);
    try {
      const data = await api.getDiamondFilters({ includeDisabled: true });
      setConfigs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  const getConfig = (key: string) => configs.find((c) => c.key === key);

  const handleAddOption = async () => {
    if (!modalConfigId || !newOptionLabel || !newOptionValue) return;
    try {
      await api.createDiamondFilterOption({
        configId: modalConfigId,
        label: newOptionLabel,
        value: newOptionValue,
        iconUrl: newOptionIcon || undefined,
      });
      setModalConfigId(null);
      setNewOptionLabel('');
      setNewOptionValue('');
      setNewOptionIcon('');
      fetchFilters();
    } catch (err) {
      alert('Failed to add option.');
    }
  };

  const handleToggleOption = async (option: any) => {
    try {
      await api.updateDiamondFilterOption(option.id, { isEnabled: !option.isEnabled });
      fetchFilters();
    } catch (err) {
      alert('Failed to toggle option.');
    }
  };

  const handleDeleteOption = async (optionId: string) => {
    if (!window.confirm('Delete this filter option?')) return;
    try {
      await api.deleteDiamondFilterOption(optionId);
      fetchFilters();
    } catch (err) {
      alert('Failed to delete option.');
    }
  };

  const handleUpdateRange = async (key: string, configJsonObj: any) => {
    const target = getConfig(key);
    if (!target) return;
    try {
      await api.updateDiamondFilterGroup(target.id, { configJson: configJsonObj });
      setToastMessage(`Updated ${target.title} bounds successfully!`);
      setTimeout(() => setToastMessage(''), 3000);
      fetchFilters();
    } catch (err) {
      alert('Failed to update range bounds.');
    }
  };

  if (loading) {
    return <PageWrapper style={{ color: '#777' }}>Loading Diamond Vault Filter Configurations...</PageWrapper>;
  }

  const typeConfig = getConfig('type');
  const classConfig = getConfig('classification');
  const shapeConfig = getConfig('shape');
  const caratConfig = getConfig('carat');
  const colorConfig = getConfig('color');
  const clarityConfig = getConfig('clarity');
  const certConfig = getConfig('certification');
  const priceConfig = getConfig('price');

  const caratJson = caratConfig?.configJson ? (typeof caratConfig.configJson === 'string' ? JSON.parse(caratConfig.configJson) : caratConfig.configJson) : { min: 0.3, max: 10.0, step: 0.01 };
  const priceJson = priceConfig?.configJson ? (typeof priceConfig.configJson === 'string' ? JSON.parse(priceConfig.configJson) : priceConfig.configJson) : { min: 500, max: 100000, step: 100 };

  return (
    <PageWrapper>
      <Title>DIAMOND VAULT FILTER CONFIGURATION</Title>
      <Subtitle>Configure Diamond Origin types, Classifications, Stone Shapes, Carat/Price bounds, Colors, Clarities & Certifications</Subtitle>

      {/* DIAMOND TYPES */}
      <Card>
        <h3>
          <span>DIAMOND TYPES / ORIGIN</span>
          {typeConfig && (
            <SmallBtn onClick={() => setModalConfigId(typeConfig.id)}>+ ADD TYPE</SmallBtn>
          )}
        </h3>
        <ItemChipRow>
          {typeConfig?.options?.map((opt: any) => (
            <OptionChip key={opt.id} $enabled={opt.isEnabled}>
              <span>{opt.label}</span>
              <div className="actions">
                <button onClick={() => handleToggleOption(opt)} title={opt.isEnabled ? 'Disable' : 'Enable'}>
                  {opt.isEnabled ? <Eye size={13} /> : <EyeOff size={13} />}
                </button>
                <button onClick={() => handleDeleteOption(opt.id)} title="Delete">
                  <Trash2 size={13} color="#c53030" />
                </button>
              </div>
            </OptionChip>
          ))}
        </ItemChipRow>
      </Card>

      {/* CLASSIFICATION */}
      <Card>
        <h3>
          <span>CLASSIFICATION TABS</span>
          {classConfig && (
            <SmallBtn onClick={() => setModalConfigId(classConfig.id)}>+ ADD CLASSIFICATION</SmallBtn>
          )}
        </h3>
        <ItemChipRow>
          {classConfig?.options?.map((opt: any) => (
            <OptionChip key={opt.id} $enabled={opt.isEnabled}>
              <span>{opt.label}</span>
              <div className="actions">
                <button onClick={() => handleToggleOption(opt)}>
                  {opt.isEnabled ? <Eye size={13} /> : <EyeOff size={13} />}
                </button>
                <button onClick={() => handleDeleteOption(opt.id)}>
                  <Trash2 size={13} color="#c53030" />
                </button>
              </div>
            </OptionChip>
          ))}
        </ItemChipRow>
      </Card>

      {/* STONE SHAPES */}
      <Card>
        <h3>
          <span>STONE SHAPES MANAGER</span>
          {shapeConfig && (
            <SmallBtn onClick={() => setModalConfigId(shapeConfig.id)}>+ ADD SHAPE (e.g. Baguette)</SmallBtn>
          )}
        </h3>
        <ItemChipRow>
          {shapeConfig?.options?.map((opt: any) => (
            <OptionChip key={opt.id} $enabled={opt.isEnabled}>
              {opt.iconUrl && <img src={opt.iconUrl} alt={opt.label} />}
              <span>{opt.label}</span>
              <div className="actions">
                <button onClick={() => handleToggleOption(opt)}>
                  {opt.isEnabled ? <Eye size={13} /> : <EyeOff size={13} />}
                </button>
                <button onClick={() => handleDeleteOption(opt.id)}>
                  <Trash2 size={13} color="#c53030" />
                </button>
              </div>
            </OptionChip>
          ))}
        </ItemChipRow>
      </Card>

      {/* CARAT WEIGHT BOUNDS */}
      <Card>
        <h3>CARAT WEIGHT BOUNDS</h3>
        <FormGrid>
          <FormGroup>
            <label>Minimum Carat</label>
            <input
              type="number"
              step="0.01"
              value={caratJson.min}
              onChange={(e) => handleUpdateRange('carat', { ...caratJson, min: Number(e.target.value) })}
            />
          </FormGroup>

          <FormGroup>
            <label>Maximum Carat</label>
            <input
              type="number"
              step="0.1"
              value={caratJson.max}
              onChange={(e) => handleUpdateRange('carat', { ...caratJson, max: Number(e.target.value) })}
            />
          </FormGroup>

          <FormGroup>
            <label>Slider Step Value</label>
            <input
              type="number"
              step="0.001"
              value={caratJson.step}
              onChange={(e) => handleUpdateRange('carat', { ...caratJson, step: Number(e.target.value) })}
            />
          </FormGroup>
        </FormGrid>
      </Card>

      {/* COLOR GRADE */}
      <Card>
        <h3>
          <span>COLOR GRADES</span>
          {colorConfig && (
            <SmallBtn onClick={() => setModalConfigId(colorConfig.id)}>+ ADD COLOR</SmallBtn>
          )}
        </h3>
        <ItemChipRow>
          {colorConfig?.options?.map((opt: any) => (
            <OptionChip key={opt.id} $enabled={opt.isEnabled}>
              <span>{opt.label}</span>
              <div className="actions">
                <button onClick={() => handleToggleOption(opt)}>
                  {opt.isEnabled ? <Eye size={13} /> : <EyeOff size={13} />}
                </button>
                <button onClick={() => handleDeleteOption(opt.id)}>
                  <Trash2 size={13} color="#c53030" />
                </button>
              </div>
            </OptionChip>
          ))}
        </ItemChipRow>
      </Card>

      {/* CLARITY GRADE */}
      <Card>
        <h3>
          <span>CLARITY GRADES</span>
          {clarityConfig && (
            <SmallBtn onClick={() => setModalConfigId(clarityConfig.id)}>+ ADD CLARITY</SmallBtn>
          )}
        </h3>
        <ItemChipRow>
          {clarityConfig?.options?.map((opt: any) => (
            <OptionChip key={opt.id} $enabled={opt.isEnabled}>
              <span>{opt.label}</span>
              <div className="actions">
                <button onClick={() => handleToggleOption(opt)}>
                  {opt.isEnabled ? <Eye size={13} /> : <EyeOff size={13} />}
                </button>
                <button onClick={() => handleDeleteOption(opt.id)}>
                  <Trash2 size={13} color="#c53030" />
                </button>
              </div>
            </OptionChip>
          ))}
        </ItemChipRow>
      </Card>

      {/* CERTIFICATION LABS */}
      <Card>
        <h3>
          <span>CERTIFICATION LABS</span>
          {certConfig && (
            <SmallBtn onClick={() => setModalConfigId(certConfig.id)}>+ ADD LAB</SmallBtn>
          )}
        </h3>
        <ItemChipRow>
          {certConfig?.options?.map((opt: any) => (
            <OptionChip key={opt.id} $enabled={opt.isEnabled}>
              <span>{opt.label}</span>
              <div className="actions">
                <button onClick={() => handleToggleOption(opt)}>
                  {opt.isEnabled ? <Eye size={13} /> : <EyeOff size={13} />}
                </button>
                <button onClick={() => handleDeleteOption(opt.id)}>
                  <Trash2 size={13} color="#c53030" />
                </button>
              </div>
            </OptionChip>
          ))}
        </ItemChipRow>
      </Card>

      {/* PRICE RANGE BOUNDS */}
      <Card>
        <h3>PRICE RANGE BOUNDS ($)</h3>
        <FormGrid>
          <FormGroup>
            <label>Minimum Price ($)</label>
            <input
              type="number"
              value={priceJson.min}
              onChange={(e) => handleUpdateRange('price', { ...priceJson, min: Number(e.target.value) })}
            />
          </FormGroup>

          <FormGroup>
            <label>Maximum Price ($)</label>
            <input
              type="number"
              value={priceJson.max}
              onChange={(e) => handleUpdateRange('price', { ...priceJson, max: Number(e.target.value) })}
            />
          </FormGroup>

          <FormGroup>
            <label>Step ($)</label>
            <input
              type="number"
              value={priceJson.step}
              onChange={(e) => handleUpdateRange('price', { ...priceJson, step: Number(e.target.value) })}
            />
          </FormGroup>
        </FormGrid>
      </Card>

      {/* ADD OPTION MODAL */}
      {modalConfigId && (
        <ModalOverlay onClick={() => setModalConfigId(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>ADD FILTER OPTION</h3>
            <div className="field">
              <label>Option Display Label</label>
              <input
                type="text"
                placeholder="e.g. Baguette or Platinum"
                value={newOptionLabel}
                onChange={(e) => setNewOptionLabel(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Query Value / Code</label>
              <input
                type="text"
                placeholder="e.g. Baguette or GIA"
                value={newOptionValue}
                onChange={(e) => setNewOptionValue(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Icon / SVG Image URL (Optional)</label>
              <input
                type="text"
                placeholder="/assets/diamonds/Baguette.svg"
                value={newOptionIcon}
                onChange={(e) => setNewOptionIcon(e.target.value)}
              />
            </div>
            <div className="btn-row">
              <SmallBtn onClick={() => setModalConfigId(null)}>CANCEL</SmallBtn>
              <PrimaryBtn onClick={handleAddOption}>ADD OPTION</PrimaryBtn>
            </div>
          </ModalCard>
        </ModalOverlay>
      )}

      {toastMessage && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#1f1f1f', color: '#c9a45c', padding: '12px 24px', border: '1px solid #c9a45c', fontWeight: 600 }}>
          <Check size={16} style={{ display: 'inline', marginRight: 6 }} /> {toastMessage}
        </div>
      )}
    </PageWrapper>
  );
};
