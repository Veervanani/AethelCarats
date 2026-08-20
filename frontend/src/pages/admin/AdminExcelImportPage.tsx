import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Upload, Download, FileSpreadsheet, AlertTriangle, CheckCircle, FileArchive, Trash2 } from 'lucide-react';
import { api } from '../../services/api';
import { AdminPageHeader, AdminButton } from '../../components/admin/AdminUI';

const Header = styled.div`
  margin-bottom: 32px;
  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 2.2rem;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 32px;
  margin-bottom: 32px;
`;

const StepHeader = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UploadBox = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.gold};
  background-color: #faf8f3;
  padding: 40px;
  text-align: center;
  cursor: pointer;

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 12px;
  }
`;

const Button = styled.button<{ $variant?: 'primary' | 'outline' | 'success' }>`
  padding: 12px 24px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  background-color: ${({ $variant, theme }) => ($variant === 'outline' ? 'transparent' : $variant === 'success' ? '#2e7d32' : theme.colors.textPrimary)};
  color: ${({ $variant, theme }) => ($variant === 'outline' ? theme.colors.textPrimary : theme.colors.white)};
  border: 1px solid ${({ $variant, theme }) => ($variant === 'outline' ? theme.colors.textPrimary : 'transparent')};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;

  th, td {
    padding: 10px 14px;
    font-size: 0.8rem;
    text-align: left;
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  th {
    background-color: #f5f2ea;
  }
`;

export const AdminExcelImportPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] = useState<any | null>(null);
  const [importMode, setImportMode] = useState('UPSERT');
  const [importSummary, setImportSummary] = useState<any | null>(null);
  const [importHistory, setImportHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getImportHistory().then(setImportHistory).catch(console.error);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setValidationResult(null);
      setImportSummary(null);
    }
  };

  const handleValidate = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const data = await api.parseExcelFile(formData);
      setValidationResult(data);
    } catch (e: any) {
      alert(e.response?.data?.message || 'Failed to parse Excel file');
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteImport = async () => {
    if (!validationResult || !validationResult.validatedPayload) return;
    setLoading(true);
    try {
      const res = await api.executeDiamondImport({
        diamonds: validationResult.validatedPayload,
        mode: importMode,
        fileName: file?.name,
      });
      setImportSummary(res.summary);
      api.getImportHistory().then(setImportHistory);
    } catch (e: any) {
      alert(e.response?.data?.message || 'Failed to execute import');
    } finally {
      setLoading(false);
    }
  };

  const handleZipUpload = async () => {
    if (!zipFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', zipFile);
    try {
      const res = await api.uploadZipImages(formData);
      alert(res.message);
    } catch (e: any) {
      alert(e.response?.data?.message || 'Failed to upload ZIP');
    } finally {
      setLoading(false);
    }
  };

  const handleClearAllDiamonds = async () => {
    if (!window.confirm('⚠️ Are you sure you want to CLEAR ALL diamonds from the database?\n\nThis will remove all current diamond records from the database.')) {
      return;
    }
    setLoading(true);
    try {
      const res = await api.deleteAllDiamonds();
      alert(`Done! ${res.message}`);
      setValidationResult(null);
      setImportSummary(null);
    } catch (e: any) {
      alert(e.response?.data?.message || 'Failed to clear diamond database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Excel Diamond Import"
        description="Bulk upload diamond inventory, perform row validation, certificate verification, and auto-match media ZIP packages."
        actions={
          <div style={{ display: 'flex', gap: 12 }}>
            <AdminButton $variant="secondary" onClick={handleClearAllDiamonds} icon={<Trash2 size={14} />}>
              Clear All Diamonds Database
            </AdminButton>
            <AdminButton $variant="gold" onClick={() => api.downloadExcelTemplate()} icon={<Download size={14} />}>
              Download Excel Template (.xlsx)
            </AdminButton>
          </div>
        }
      />

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <StepHeader><FileSpreadsheet size={20} color="#C9A45C" /> Step 1: Upload Excel / CSV Inventory File</StepHeader>
          <Button $variant="outline" onClick={() => api.downloadExcelTemplate()}>
            <Download size={16} /> Download Excel Template (.xlsx)
          </Button>
        </div>

        <div style={{ background: '#fcf8f0', border: '1px solid #e8dec9', borderRadius: 6, padding: '12px 16px', marginBottom: 20, fontSize: '0.84rem', color: '#55524d', lineHeight: 1.5 }}>
          <strong>✨ Universal Diamond Excel Parser Enabled:</strong> Auto-detects standard columns from <strong>D VARNI PRICE LIST</strong>, <strong>Fancy Color Stock</strong>, and supplier price lists. Supports <em>STOCK ID, SHAPE, Color, Fancy Color, Fancy Color Intensity, Clarity, Weight (Carat), P/CT (Price/Ct), TOTAL $, CVD/HPHT, LAB, Certificate Link, ImageURL, Diamond Video, Measurement, Depth %, Table %, Fluorescence, Girdle, Culet</em>.
        </div>

        <UploadBox onClick={() => document.getElementById('excel-input')?.click()}>
          <Upload size={36} color="#C9A45C" style={{ margin: '0 auto' }} />
          <p>{file ? `Selected file: ${file.name}` : 'Click to browse or drop .xlsx / .xls / .csv file here'}</p>
          <input id="excel-input" type="file" accept=".xlsx,.xls,.csv" style={{ display: 'none' }} onChange={handleFileChange} />
        </UploadBox>

        {file && !validationResult && (
          <div style={{ marginTop: 20, textAlign: 'right' }}>
            <Button onClick={handleValidate} disabled={loading}>
              {loading ? 'Validating...' : 'Validate Excel File'}
            </Button>
          </div>
        )}
      </Card>

      {validationResult && (
        <Card>
          <StepHeader><CheckCircle size={20} color="#388E3C" /> Step 2: Data Validation Report</StepHeader>

          <div style={{ display: 'flex', gap: 32, marginBottom: 24 }}>
            <div><strong>Total Rows:</strong> {validationResult.totalRows}</div>
            <div style={{ color: '#388E3C' }}><strong>Valid Rows:</strong> {validationResult.validCount}</div>
            <div style={{ color: '#D32F2F' }}><strong>Invalid/Errors:</strong> {validationResult.failedCount}</div>
          </div>

          {validationResult.errors && validationResult.errors.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ color: '#D32F2F', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertTriangle size={18} /> Line Errors Detected ({validationResult.errors.length}):
              </h4>
              <Table>
                <thead>
                  <tr>
                    <th>Row #</th>
                    <th>Diamond ID</th>
                    <th>Errors Found</th>
                  </tr>
                </thead>
                <tbody>
                  {validationResult.errors.map((err: any, idx: number) => (
                    <tr key={idx}>
                      <td>Row {err.row}</td>
                      <td>{err.diamondId}</td>
                      <td>{err.errors.join('; ')}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          <div style={{ marginTop: 24, borderTop: '1px solid #eee', paddingTop: 24 }}>
            <StepHeader>Step 3: Choose Import Mode & Execute</StepHeader>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 24 }}>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.85rem' }}>
                <input type="radio" name="mode" value="UPSERT" checked={importMode === 'UPSERT'} onChange={(e) => setImportMode(e.target.value)} />
                Add New + Update Existing (Upsert)
              </label>

              <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.85rem' }}>
                <input type="radio" name="mode" value="ADD_ONLY" checked={importMode === 'ADD_ONLY'} onChange={(e) => setImportMode(e.target.value)} />
                Add New Only
              </label>

              <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.85rem' }}>
                <input type="radio" name="mode" value="UPDATE_ONLY" checked={importMode === 'UPDATE_ONLY'} onChange={(e) => setImportMode(e.target.value)} />
                Update Existing Only
              </label>
            </div>

            <Button $variant="success" onClick={handleExecuteImport} disabled={loading || validationResult.validCount === 0}>
              {loading ? 'Importing...' : `Execute Import (${validationResult.validCount} Diamonds)`}
            </Button>
          </div>

          {importSummary && (
            <div style={{ marginTop: 24, padding: 16, backgroundColor: '#e8f5e9', border: '1px solid #81c784' }}>
              <strong>Import Completed:</strong> Added {importSummary.importedCount} new, updated {importSummary.updatedCount} existing, {importSummary.failedCount} skipped.
            </div>
          )}
        </Card>
      )}

      {/* ZIP Image Matcher */}
      <Card>
        <StepHeader><FileArchive size={20} color="#C9A45C" /> Bulk ZIP Image Auto-Matcher</StepHeader>
        <p style={{ fontSize: '0.85rem', color: '#777', marginBottom: 16 }}>
          Upload a .zip file containing images named by Diamond ID (e.g. <code>D10001.jpg</code>, <code>D10002.png</code>). The system automatically matches images to diamonds in database.
        </p>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <input type="file" accept=".zip" onChange={(e) => setZipFile(e.target.files ? e.target.files[0] : null)} />
          <Button onClick={handleZipUpload} disabled={!zipFile || loading}>
            <Upload size={16} /> Process ZIP Images
          </Button>
        </div>
      </Card>

      {/* Import History */}
      <Card>
        <StepHeader>Import History Log</StepHeader>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>File Name</th>
              <th>Total Rows</th>
              <th>Imported</th>
              <th>Updated</th>
              <th>Failed</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {importHistory.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>{item.fileName}</td>
                <td>{item.totalRows}</td>
                <td style={{ color: '#388E3C' }}>{item.importedCount}</td>
                <td style={{ color: '#0288D1' }}>{item.updatedCount}</td>
                <td style={{ color: item.failedCount > 0 ? '#D32F2F' : '#777' }}>{item.failedCount}</td>
                <td>{item.importedBy}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};
