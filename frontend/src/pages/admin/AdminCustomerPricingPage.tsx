import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Save, RefreshCw, Plus, Trash2, Search, UserCheck } from 'lucide-react';
import { api } from '../../services/api';
import { AdminPageHeader } from '../../components/admin/AdminUI';

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
  select,
  textarea {
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
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PriceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;

  th,
  td {
    padding: 12px;
    border: 1px solid #e8e3d9;
    text-align: left;
    font-size: 0.88rem;
  }

  th {
    background: #faf8f5;
    font-weight: 700;
    color: #1f1f1f;
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

export const AdminCustomerPricingPage: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [customPrices, setCustomPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [specialPrice, setSpecialPrice] = useState('');
  const [priceAdjustment, setPriceAdjustment] = useState('');
  const [metalAdjustmentsJson, setMetalAdjustmentsJson] = useState('{\n  "18K Yellow Gold": 200,\n  "Platinum": 450\n}');
  const [diamondAdjustmentsJson, setDiamondAdjustmentsJson] = useState('{\n  "d1": 2200,\n  "d2": 3800\n}');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [custRes, prodRes, pricesRes] = await Promise.all([
        api.get('/api/v1/admin/users?role=CUSTOMER').catch(() => ({ data: [] })),
        api.get('/api/v1/products?limit=100').catch(() => ({ data: { products: [] } })),
        api.get('/api/v1/admin/customer-prices').catch(() => ({ data: [] })),
      ]);

      setCustomers(Array.isArray(custRes.data) ? custRes.data : custRes.data?.users || []);
      setProducts(prodRes.data?.products || []);
      setCustomPrices(Array.isArray(pricesRes.data) ? pricesRes.data : []);
    } catch (err) {
      console.error('Failed to load customer pricing data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCustomerPrice = async () => {
    if (!selectedCustomerId || !selectedProductId) {
      alert('Please select both a Customer and a Product.');
      return;
    }

    try {
      setSaving(true);

      let metalRules = null;
      let diamondRules = null;
      try {
        if (metalAdjustmentsJson) metalRules = JSON.parse(metalAdjustmentsJson);
      } catch {
        alert('Invalid Metal Adjustments JSON string.');
        setSaving(false);
        return;
      }

      try {
        if (diamondAdjustmentsJson) diamondRules = JSON.parse(diamondAdjustmentsJson);
      } catch {
        alert('Invalid Diamond Adjustments JSON string.');
        setSaving(false);
        return;
      }

      const payload = {
        customerId: selectedCustomerId,
        productId: selectedProductId,
        specialPrice: specialPrice !== '' ? parseFloat(specialPrice) : null,
        priceAdjustment: priceAdjustment !== '' ? parseFloat(priceAdjustment) : 0,
        metalsPriceAdjustments: metalRules,
        diamondsPriceAdjustments: diamondRules,
      };

      await api.post('/api/v1/admin/customer-prices', payload);
      alert('Customer-Specific Price saved successfully!');
      fetchInitialData();
    } catch (err) {
      console.error('Failed to save customer price:', err);
      alert('Error saving customer-specific price');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this customer specific price rule?')) return;
    try {
      await api.delete(`/api/v1/admin/customer-prices/${id}`);
      fetchInitialData();
    } catch (err) {
      console.error('Failed to delete customer price rule:', err);
    }
  };

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading Customer Pricing Portal...</div>;
  }

  return (
    <PageWrapper>
      <AdminPageHeader
        title="Customer & Metal Pricing"
        description="Configure targeted VIP discounts, custom metal pricing rules, and special diamond pricing per customer account."
      />

      <FormCard>
        <h3>Add or Update Customer Price Rule</h3>
        <GridRow>
          <FormGroup>
            <label>Select VIP Customer</label>
            <select value={selectedCustomerId} onChange={(e) => setSelectedCustomerId(e.target.value)}>
              <option value="">-- Choose Customer --</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name || c.email} ({c.email})
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <label>Select Product</label>
            <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
              <option value="">-- Choose Product --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (Public Price: ${p.price?.toLocaleString()})
                </option>
              ))}
            </select>
          </FormGroup>
        </GridRow>

        <GridRow>
          <FormGroup>
            <label>Fixed Special Base Price ($)</label>
            <input
              type="number"
              placeholder="e.g. 1750 (Leave empty to use base price + adjustment)"
              value={specialPrice}
              onChange={(e) => setSpecialPrice(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>Or Base Price Offset ($)</label>
            <input
              type="number"
              placeholder="e.g. -200 for $200 discount"
              value={priceAdjustment}
              onChange={(e) => setPriceAdjustment(e.target.value)}
            />
          </FormGroup>
        </GridRow>

        <GridRow>
          <FormGroup>
            <label>Custom Metal Adjustments (JSON)</label>
            <textarea
              rows={4}
              value={metalAdjustmentsJson}
              onChange={(e) => setMetalAdjustmentsJson(e.target.value)}
              placeholder='{ "18K Yellow Gold": 150, "Platinum": 350 }'
            />
          </FormGroup>

          <FormGroup>
            <label>Custom Diamond Prices (JSON)</label>
            <textarea
              rows={4}
              value={diamondAdjustmentsJson}
              onChange={(e) => setDiamondAdjustmentsJson(e.target.value)}
              placeholder='{ "d1": 2100, "d2": 3600 }'
            />
          </FormGroup>
        </GridRow>

        <button
          onClick={handleSaveCustomerPrice}
          disabled={saving}
          style={{
            padding: '12px 24px',
            background: '#19202A',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {saving ? <RefreshCw size={16} className="spin" /> : <Save size={16} />} Save Customer Price Rule
        </button>
      </FormCard>

      <FormCard>
        <h3>Active Customer Price Override Rules</h3>
        {customPrices.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>No customer price override rules currently active.</p>
        ) : (
          <PriceTable>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Public Base Price</th>
                <th>Customer Base Price</th>
                <th>Custom Metals</th>
                <th>Custom Diamonds</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customPrices.map((cp) => {
                const pubPrice = cp.product?.price || 0;
                const effPrice = cp.specialPrice !== null ? cp.specialPrice : pubPrice + (cp.priceAdjustment || 0);

                return (
                  <tr key={cp.id}>
                    <td>
                      <strong>{cp.customer?.name || 'Customer'}</strong>
                      <br />
                      <span style={{ fontSize: '0.78rem', color: '#666' }}>{cp.customer?.email}</span>
                    </td>
                    <td>
                      <strong>{cp.product?.name}</strong>
                      <br />
                      <span style={{ fontSize: '0.78rem', color: '#666' }}>SKU: {cp.product?.sku}</span>
                    </td>
                    <td>${pubPrice.toLocaleString()}</td>
                    <td style={{ color: '#137333', fontWeight: 700 }}>${effPrice.toLocaleString()}</td>
                    <td style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>{cp.metalsPriceAdjustments || 'Standard'}</td>
                    <td style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>{cp.diamondsPriceAdjustments || 'Standard'}</td>
                    <td>
                      <button className="btn-del" onClick={() => handleDelete(cp.id)} title="Delete price override">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </PriceTable>
        )}
      </FormCard>
    </PageWrapper>
  );
};
