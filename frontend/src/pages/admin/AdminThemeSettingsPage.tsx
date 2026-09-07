import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Save, Check, Palette } from 'lucide-react';
import { api } from '../../services/api';

const PageWrapper = styled.div`
  padding: 32px;
  max-width: 1000px;
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
  padding: 28px;
  margin-bottom: 24px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin: 0 0 18px 0;
    border-bottom: 1px solid #f2ede4;
    padding-bottom: 10px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
  }

  .color-picker-row {
    display: flex;
    gap: 10px;
    align-items: center;

    input[type='color'] {
      width: 44px;
      height: 40px;
      border: 1px solid #d9d3c7;
      padding: 0;
      background: none;
      cursor: pointer;
    }

    input[type='text'] {
      flex: 1;
      padding: 10px 14px;
      font-size: 0.88rem;
      border: 1px solid #d9d3c7;
      background: #faf5eb;
      outline: none;
    }
  }

  input[type='text'], select {
    padding: 10px 14px;
    font-size: 0.88rem;
    border: 1px solid #d9d3c7;
    background: #faf5eb;
    outline: none;
    font-family: 'Inter', sans-serif;
  }
`;

const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: #1f1f1f;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: 1px solid #1f1f1f;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: #c9a45c;
    border-color: #c9a45c;
    color: #1f1f1f;
  }
`;

const Toast = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #1f1f1f;
  color: #c9a45c;
  border: 1px solid #c9a45c;
  padding: 14px 24px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AdminThemeSettingsPage: React.FC = () => {
  const [config, setConfig] = useState({
    primaryColor: '#1f1f1f',
    secondaryColor: '#c9a45c',
    accentColor: '#b8944d',
    backgroundColor: '#ffffff',
    textColor: '#1f1f1f',
    borderColor: '#d9d3c7',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Inter',
    buttonRadius: '2px',
    containerWidth: '1280px',
  });

  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    api.getSiteSettings('global_theme_config').then((res) => {
      if (res.global_theme_config) {
        setConfig((prev) => ({ ...prev, ...res.global_theme_config }));
      }
    }).catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateSiteSetting('global_theme_config', config);
      setToastMessage('Global theme settings saved successfully!');
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err: any) {
      alert('Failed to save theme settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageWrapper>
      <Title>GLOBAL THEME SETTINGS</Title>
      <Subtitle>Configure luxury color tokens, typography fonts, button border radius, and container widths</Subtitle>

      <Card>
        <h3>COLOR PALETTE TOKENS</h3>
        <FormGrid>
          <FormGroup>
            <label>Primary Brand Color</label>
            <div className="color-picker-row">
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
              />
              <input
                type="text"
                value={config.primaryColor}
                onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
              />
            </div>
          </FormGroup>

          <FormGroup>
            <label>AURA Gold Secondary Color</label>
            <div className="color-picker-row">
              <input
                type="color"
                value={config.secondaryColor}
                onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
              />
              <input
                type="text"
                value={config.secondaryColor}
                onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
              />
            </div>
          </FormGroup>

          <FormGroup>
            <label>Accent Hover Color</label>
            <div className="color-picker-row">
              <input
                type="color"
                value={config.accentColor}
                onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
              />
              <input
                type="text"
                value={config.accentColor}
                onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
              />
            </div>
          </FormGroup>

          <FormGroup>
            <label>Border & Separator Color</label>
            <div className="color-picker-row">
              <input
                type="color"
                value={config.borderColor}
                onChange={(e) => setConfig({ ...config, borderColor: e.target.value })}
              />
              <input
                type="text"
                value={config.borderColor}
                onChange={(e) => setConfig({ ...config, borderColor: e.target.value })}
              />
            </div>
          </FormGroup>
        </FormGrid>
      </Card>

      <Card>
        <h3>TYPOGRAPHY & LAYOUT</h3>
        <FormGrid>
          <FormGroup>
            <label>Heading Font Family</label>
            <select
              value={config.headingFont}
              onChange={(e) => setConfig({ ...config, headingFont: e.target.value })}
            >
              <option value="Cormorant Garamond">Cormorant Garamond (Default Serif)</option>
              <option value="Playfair Display">Playfair Display</option>
              <option value="Cinzel">Cinzel Luxury</option>
              <option value="Bodoni Moda">Bodoni Moda</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Body Font Family</label>
            <select
              value={config.bodyFont}
              onChange={(e) => setConfig({ ...config, bodyFont: e.target.value })}
            >
              <option value="Inter">Inter (Default Sans-Serif)</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Roboto">Roboto</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Button Border Radius</label>
            <input
              type="text"
              value={config.buttonRadius}
              onChange={(e) => setConfig({ ...config, buttonRadius: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label>Container Max Width</label>
            <input
              type="text"
              value={config.containerWidth}
              onChange={(e) => setConfig({ ...config, containerWidth: e.target.value })}
            />
          </FormGroup>
        </FormGrid>
      </Card>

      <SaveButton onClick={handleSave} disabled={saving}>
        <Save size={16} /> {saving ? 'SAVING...' : 'SAVE THEME CONFIGURATION'}
      </SaveButton>

      {toastMessage && (
        <Toast>
          <Check size={18} /> {toastMessage}
        </Toast>
      )}
    </PageWrapper>
  );
};
