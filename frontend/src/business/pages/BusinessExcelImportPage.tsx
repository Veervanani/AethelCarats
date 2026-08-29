import React, { useState } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const UploadZone = styled.div`
  background: #ffffff;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  margin-bottom: 24px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #0d1319;
    background: #f8fafc;
  }
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 20px;
`;

const StatCard = styled.div<{ $color?: string }>`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid ${({ $color }) => $color || '#0d1319'};
  border-radius: 8px;
  padding: 16px;

  .label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
  }
  .val {
    font-size: 1.4rem;
    font-weight: 800;
    color: #0f172a;
    margin-top: 4px;
  }
`;

const TableContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow-x: auto;
  margin-bottom: 24px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
  white-space: nowrap;

  th {
    background: #0d1319;
    color: #ffffff;
    padding: 10px 12px;
    text-align: left;
  }

  td {
    padding: 8px 12px;
    border-bottom: 1px solid #f1f5f9;
  }
`;

export const BusinessExcelImportPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [importing, setImporting] = useState(false);
  const [importReport, setImportReport] = useState<any>(null);
  const [skipDuplicates, setSkipDuplicates] = useState(true);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selected = e.target.files[0];
    setFile(selected);
    setValidationResult(null);
    setImportReport(null);

    // Auto-validate
    setValidating(true);
    const formData = new FormData();
    formData.append('file', selected);

    try {
      const res = await businessApi.validateSalesImport(formData);
      setValidationResult(res);
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Validation failed');
    } finally {
      setValidating(false);
    }
  };

  const handleExecuteImport = async () => {
    if (!validationResult || !validationResult.allRows) return;
    setImporting(true);
    try {
      const res = await businessApi.executeSalesImport({
        rows: validationResult.allRows,
        skipDuplicates,
      });
      setImportReport(res);
      alert(`✅ Migration Complete! ${res.importedCount} sales imported.`);
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Import execution failed');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div>
      <PageHeader>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
          Excel Sales Tracker Migration & Importer
        </h1>
        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
          Upload <code style={{ background: '#f1f5f9', padding: '2px 4px' }}>Sales Tracker Final.xlsx</code> to migrate all historical records without altering calculations
        </p>
      </PageHeader>

      <UploadZone onClick={() => document.getElementById('excelFileInput')?.click()}>
        <input
          type="file"
          id="excelFileInput"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <UploadCloud size={44} color="#0d1319" style={{ margin: '0 auto 12px auto' }} />
        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
          {file ? file.name : 'Click or Drag & Drop Excel Spreadsheet'}
        </div>
        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 4 }}>
          Supports .xlsx, .xls, and .csv with automatic 46-column header detection
        </div>
        {validating && <div style={{ marginTop: 12, color: '#2563eb', fontWeight: 600 }}>Validating spreadsheet rows...</div>}
      </UploadZone>

      {validationResult && (
        <div>
          <SummaryGrid>
            <StatCard $color="#2563eb">
              <div className="label">Total Rows Detected</div>
              <div className="val">{validationResult.totalRows}</div>
            </StatCard>
            <StatCard $color="#16a34a">
              <div className="label">Valid New Invoices</div>
              <div className="val" style={{ color: '#16a34a' }}>
                {validationResult.validRows}
              </div>
            </StatCard>
            <StatCard $color="#d97706">
              <div className="label">Existing Duplicates</div>
              <div className="val" style={{ color: '#d97706' }}>
                {validationResult.duplicateRows}
              </div>
            </StatCard>
            <StatCard $color="#dc2626">
              <div className="label">Invalid Rows</div>
              <div className="val" style={{ color: '#dc2626' }}>
                {validationResult.invalidRows}
              </div>
            </StatCard>
          </SummaryGrid>

          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '12px 18px',
              marginBottom: 16,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                id="skipDupCheck"
                checked={skipDuplicates}
                onChange={(e) => setSkipDuplicates(e.target.checked)}
              />
              <label htmlFor="skipDupCheck" style={{ fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>
                Skip already imported invoice numbers (Recommended to avoid duplicates)
              </label>
            </div>

            <button
              onClick={handleExecuteImport}
              disabled={importing}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 22px',
                background: '#0d1319',
                color: '#ffffff',
                border: 'none',
                borderRadius: 6,
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              {importing ? 'Importing Rows...' : 'Execute Database Migration'} <ArrowRight size={15} />
            </button>
          </div>

          <h3 style={{ fontSize: '0.92rem', fontWeight: 700, margin: '20px 0 10px 0' }}>Data Preview (First 20 Rows)</h3>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Row #</th>
                  <th>Invoice No</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Type</th>
                  <th>Shape / Item</th>
                  <th>Carat</th>
                  <th>Selling Price</th>
                  <th>Final Sale</th>
                  <th>Purchase Price</th>
                  <th>Gross Profit</th>
                  <th>Net Profit</th>
                  <th>Sales Person</th>
                  <th>Commission</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {validationResult.preview?.map((r: any) => (
                  <tr key={r.rowIndex}>
                    <td>{r.rowIndex}</td>
                    <td style={{ fontWeight: 700 }}>{r.invoiceNo}</td>
                    <td>{r.saleDate}</td>
                    <td>{r.customerName}</td>
                    <td>{r.productType}</td>
                    <td>{r.shape || r.productDescription || '-'}</td>
                    <td>{r.caratWeight || '-'}</td>
                    <td>${r.sellingPrice?.toLocaleString()}</td>
                    <td style={{ fontWeight: 700 }}>${r.finalSaleAmount?.toLocaleString()}</td>
                    <td>${r.purchasePrice?.toLocaleString()}</td>
                    <td>${r.grossProfit?.toLocaleString()}</td>
                    <td style={{ color: '#16a34a', fontWeight: 600 }}>${r.netProfit?.toLocaleString()}</td>
                    <td>{r.salesPersonName}</td>
                    <td style={{ color: '#d97706' }}>${r.commissionAmount?.toLocaleString()}</td>
                    <td>
                      {r.isDuplicate ? (
                        <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: '#fff9db', color: '#f59f00', borderRadius: 4, fontWeight: 700 }}>
                          Duplicate
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: '#ebfbee', color: '#2b8a3e', borderRadius: 4, fontWeight: 700 }}>
                          Ready
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </div>
      )}

      {importReport && (
        <div
          style={{
            background: '#ebfbee',
            border: '1px solid #b2f2bb',
            borderRadius: 8,
            padding: 20,
            color: '#2b8a3e',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.1rem', fontWeight: 700 }}>
            <CheckCircle2 size={20} /> Migration Successful
          </div>
          <div style={{ marginTop: 8, fontSize: '0.85rem' }}>
            Successfully imported <strong>{importReport.importedCount}</strong> records. Skipped {importReport.skippedCount} duplicates.
          </div>
        </div>
      )}
    </div>
  );
};
