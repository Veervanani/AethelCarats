import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Save, Check, Type } from 'lucide-react';
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

  input {
    padding: 10px 14px;
    font-size: 0.88rem;
    border: 1px solid #d9d3c7;
    background: #faf5eb;
    outline: none;
    font-family: 'Inter', sans-serif;

    &:focus {
      border-color: #c9a45c;
      background: #ffffff;
    }
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

export const AdminTextLabelsPage: React.FC = () => {
  const [labels, setLabels] = useState({
    addToCart: 'ADD TO SHOPPING BAG',
    requestQuote: 'REQUEST ATELIER QUOTE',
    shopNow: 'DISCOVER COLLECTION',
    viewCollection: 'VIEW COLLECTION',
    signIn: 'SIGN IN',
    createAccount: 'CREATE ACCOUNT',
    contactUs: 'CONTACT ATELIER',
    learnMore: 'DISCOVER MORE',
    clearAll: 'CLEAR FILTERS',
    noResults: 'NO FINE JEWELLERY MATCHES YOUR SELECTION',
  });

  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    api.getSiteSettings('storefront_labels_config').then((res) => {
      if (res.storefront_labels_config) {
        setLabels((prev) => ({ ...prev, ...res.storefront_labels_config }));
      }
    }).catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateSiteSetting('storefront_labels_config', labels);
      setToastMessage('Storefront text labels saved successfully!');
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err: any) {
      alert('Failed to save text labels.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageWrapper>
      <Title>STOREFRONT TEXT & LABELS DICTIONARY</Title>
      <Subtitle>Customize customer-facing UI buttons, CTA text, and empty state messages across the website</Subtitle>

      <Card>
        <h3>BUTTONS & CALL TO ACTIONS</h3>
        <FormGrid>
          <FormGroup>
            <label>Add To Cart / Bag Button</label>
            <input
              type="text"
              value={labels.addToCart}
              onChange={(e) => setLabels({ ...labels, addToCart: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label>Request Quote Button</label>
            <input
              type="text"
              value={labels.requestQuote}
              onChange={(e) => setLabels({ ...labels, requestQuote: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label>Shop Now CTA</label>
            <input
              type="text"
              value={labels.shopNow}
              onChange={(e) => setLabels({ ...labels, shopNow: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label>View Collection CTA</label>
            <input
              type="text"
              value={labels.viewCollection}
              onChange={(e) => setLabels({ ...labels, viewCollection: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label>Sign In Label</label>
            <input
              type="text"
              value={labels.signIn}
              onChange={(e) => setLabels({ ...labels, signIn: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label>Create Account Label</label>
            <input
              type="text"
              value={labels.createAccount}
              onChange={(e) => setLabels({ ...labels, createAccount: e.target.value })}
            />
          </FormGroup>
        </FormGrid>
      </Card>

      <Card>
        <h3>MESSAGES & UTILITIES</h3>
        <FormGrid>
          <FormGroup>
            <label>Clear Filters Button</label>
            <input
              type="text"
              value={labels.clearAll}
              onChange={(e) => setLabels({ ...labels, clearAll: e.target.value })}
            />
          </FormGroup>

          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <label>No Search Results Found Message</label>
            <input
              type="text"
              value={labels.noResults}
              onChange={(e) => setLabels({ ...labels, noResults: e.target.value })}
            />
          </FormGroup>
        </FormGrid>
      </Card>

      <SaveButton onClick={handleSave} disabled={saving}>
        <Save size={16} /> {saving ? 'SAVING...' : 'SAVE TEXT LABELS'}
      </SaveButton>

      {toastMessage && (
        <Toast>
          <Check size={18} /> {toastMessage}
        </Toast>
      )}
    </PageWrapper>
  );
};
