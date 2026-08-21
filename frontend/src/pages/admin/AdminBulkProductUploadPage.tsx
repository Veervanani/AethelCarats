import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import {
  Download,
  Upload,
  FileSpreadsheet,
  FileArchive,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  RefreshCw,
  Eye,
  FileText,
  PackageCheck,
  Image as ImageIcon,
  Video,
} from 'lucide-react';
import { api } from '../../services/api';
import { PRIVATE_ADMIN_PATH } from '../../App';
import { useToast } from '../../context/ToastContext';
import { AdminPageHeader, AdminButton } from '../../components/admin/AdminUI';
import { exportProductsToEbayExcel, exportProductsToEbayCsv } from '../../utils/ebayExcelExportHelper';

const spinAnim = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const PageWrapper = styled.div`
  padding: 32px;
  max-width: 1300px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1f1f1f;
`;

const HeaderArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    color: #666;
    text-decoration: none;
    font-weight: 600;
    margin-bottom: 8px;
    &:hover {
      color: #1f1f1f;
    }
  }

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    font-weight: 600;
    margin: 0;
    letter-spacing: 0.05em;
  }

  p {
    margin: 4px 0 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);

  .card-title {
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #19202a;

    svg {
      color: #c9a45c;
    }
  }
`;

const DropZone = styled.div<{ $hasFile?: boolean }>`
  border: 2px dashed ${({ $hasFile }) => ($hasFile ? '#137333' : '#d9d3c7')};
  background: ${({ $hasFile }) => ($hasFile ? '#f6fbf7' : '#faf8f5')};
  border-radius: 6px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c9a45c;
    background: #faf5eb;
  }

  .icon {
    margin-bottom: 12px;
    color: ${({ $hasFile }) => ($hasFile ? '#137333' : '#888')};
  }

  .title {
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .sub {
    font-size: 0.8rem;
    color: #666;
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div<{ $color?: string }>`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-left: 4px solid ${({ $color }) => $color || '#19202a'};
  padding: 16px 20px;
  border-radius: 4px;

  .stat-num {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1f1f1f;
  }

  .stat-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  margin-top: 16px;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;

    th {
      background: #faf8f5;
      padding: 12px 14px;
      text-align: left;
      font-weight: 700;
      border-bottom: 1px solid #e8e3d9;
      color: #19202a;
    }

    td {
      padding: 12px 14px;
      border-bottom: 1px solid #f0f0f0;

      &.err {
        color: #c5221f;
        font-weight: 600;
      }
      &.warn {
        color: #b06000;
        font-weight: 600;
      }
      &.valid {
        color: #137333;
        font-weight: 600;
      }
    }
  }
`;

const Btn = styled.button<{ $variant?: string }>`
  padding: 10px 20px;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.15s ease;
  border: none;

  ${({ $variant }) =>
    $variant === 'primary' &&
    `
    background: #19202a;
    color: #ffffff;
    &:hover { background: #2c3645; }
  `}

  ${({ $variant }) =>
    $variant === 'gold' &&
    `
    background: #c9a45c;
    color: #ffffff;
    &:hover { background: #b8934b; }
  `}

  ${({ $variant }) =>
    $variant === 'outline' &&
    `
    background: #ffffff;
    border: 1px solid #d9d3c7;
    color: #1f1f1f;
    &:hover { background: #faf5eb; border-color: #c9a45c; }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ModeRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 12px;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.88rem;
    cursor: pointer;
  }
`;

const ProgressOverlay = styled.div`
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  padding: 24px;
  border-radius: 6px;
  text-align: center;
  margin-top: 20px;

  .spin {
    animation: ${spinAnim} 1s linear infinite;
    color: #c9a45c;
    margin-bottom: 12px;
  }

  .msg {
    font-size: 1.1rem;
    font-weight: 700;
    color: #1f1f1f;
    margin-bottom: 8px;
  }

  .bar-outer {
    height: 8px;
    background: #e8e3d9;
    border-radius: 4px;
    overflow: hidden;
    max-width: 400px;
    margin: 12px auto 0;

    .bar-inner {
      height: 100%;
      background: #c9a45c;
      transition: width 0.3s ease;
    }
  }
`;

export const AdminBulkProductUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [mediaZip, setMediaZip] = useState<File | null>(null);
  const [importMode, setImportMode] = useState<string>('CREATE_NEW');

  const [validating, setValidating] = useState(false);
  const [importing, setImporting] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressStatusMsg, setProgressStatusMsg] = useState('');

  const [validationResult, setValidationResult] = useState<any | null>(null);
  const [importResult, setImportResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const excelInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);

  // 1. Download Sample Excel Template
  const handleDownloadTemplate = async () => {
    try {
      const response = await api.get('/api/v1/admin/products/bulk-upload/template', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'floksy-jewel-product-import-template.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Sample 7-sheet Excel template downloaded!');
    } catch (err: any) {
      console.error('Template download error:', err);
      toast.error('Failed to download sample Excel template.');
    }
  };

  // 2. File Selections
  const handleExcelSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
        alert('Please upload a valid CSV (.csv) or Excel (.xlsx, .xls) file.');
        return;
      }
      setExcelFile(file);
      setValidationResult(null);
      setImportResult(null);
    }
  };

  const handleZipSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.name.endsWith('.zip')) {
        alert('Please upload a Media Package .zip file.');
        return;
      }
      setMediaZip(file);
      setValidationResult(null);
      setImportResult(null);
    }
  };

  // 3. Validate Excel & Media Package
  const handleValidate = async () => {
    if (!excelFile) {
      alert('Please select a CSV or Excel file first.');
      return;
    }

    try {
      setValidating(true);
      setErrorMsg('');

      const formData = new FormData();
      formData.append('excelFile', excelFile);
      if (mediaZip) {
        formData.append('mediaZip', mediaZip);
      }
      formData.append('importMode', importMode);

      const res = await api.post('/api/v1/admin/products/bulk-upload/validate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setValidationResult(res.data);
    } catch (err: any) {
      console.error('Validation error:', err);
      const msg = err.response?.data?.message || err.message || 'Error validating file.';
      setErrorMsg(msg);
    } finally {
      setValidating(false);
    }
  };

  // 4. Execute Import
  const handleExecuteImport = async () => {
    if (!excelFile || !validationResult) {
      alert('Please validate the CSV/Excel file before importing.');
      return;
    }

    try {
      setImporting(true);
      setErrorMsg('');
      setProgressPercent(15);
      setProgressStatusMsg('Uploading files...');

      const formData = new FormData();
      formData.append('excelFile', excelFile);
      if (mediaZip) {
        formData.append('mediaZip', mediaZip);
      }
      formData.append('importMode', importMode);

      const timer1 = setTimeout(() => {
        setProgressPercent(45);
        setProgressStatusMsg('Processing CSV/Excel & extracting Media...');
      }, 800);

      const timer2 = setTimeout(() => {
        setProgressPercent(75);
        setProgressStatusMsg('Creating product records & variations in database...');
      }, 2000);

      const res = await api.post('/api/v1/admin/products/bulk-upload/execute', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      setProgressPercent(100);
      setProgressStatusMsg('Import Complete!');

      setTimeout(() => {
        setImportResult(res.data);
        setImporting(false);
      }, 500);
    } catch (err: any) {
      console.error('Import execution error:', err);
      const msg = err.response?.data?.message || err.message || 'Error executing import.';
      setErrorMsg(msg);
      setImporting(false);
    }
  };

  // 5. Download Error Report
  const handleDownloadErrorReport = async () => {
    if (!validationResult || !validationResult.errors) return;

    try {
      const res = await api.post(
        '/api/v1/admin/products/bulk-upload/error-report',
        { errors: validationResult.errors },
        { responseType: 'blob' }
      );

      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'floksy-import-error-report.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Download error report failed:', err);
    }
  };

  const [exportingEbay, setExportingEbay] = useState(false);

  // 6. Export Current Products in eBay Excel Format
  const handleExportEbay = async () => {
    try {
      setExportingEbay(true);
      const data = await api.getProducts({ status: 'ALL', limit: 1000 });
      const products = data.products || [];

      if (products.length === 0) {
        toast.error('No products found in the catalog to export.');
        return;
      }

      const res = await exportProductsToEbayExcel(products);
      toast.success(`Exported ${res.count} products to eBay Excel (${res.fileName})!`);
    } catch (err: any) {
      console.error('eBay export error:', err);
      toast.error(err.message || 'Failed to export products in eBay format.');
    } finally {
      setExportingEbay(false);
    }
  };

  const handleExportEbayCsv = async () => {
    try {
      setExportingEbay(true);
      const data = await api.getProducts({ status: 'ALL', limit: 1000 });
      const products = data.products || [];

      if (products.length === 0) {
        toast.error('No products found in the catalog to export.');
        return;
      }

      const res = exportProductsToEbayCsv(products);
      toast.success(`Exported ${res.count} products to eBay CSV (${res.fileName})!`);
    } catch (err: any) {
      console.error('eBay CSV export error:', err);
      toast.error(err.message || 'Failed to export products in eBay CSV format.');
    } finally {
      setExportingEbay(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Bulk Product Upload"
        description="Upload multiple products, pricing matrix, and media assets using Etsy CSV files (e.g. EtsyListingsDownload.csv), Shopify CSV, or Floksy Excel templates."
        actions={
          <div style={{ display: 'flex', gap: '10px' }}>
            <AdminButton
              $variant="secondary"
              onClick={handleExportEbay}
              $loading={exportingEbay}
              icon={<Download size={14} />}
              title="Download all products in official 94-column eBay Category Listing Excel format"
            >
              Export eBay Excel (.xlsx)
            </AdminButton>
            <AdminButton
              $variant="secondary"
              onClick={handleExportEbayCsv}
              $loading={exportingEbay}
              icon={<Download size={14} />}
              title="Download all products in eBay CSV format for instant bulk upload"
            >
              Export eBay CSV (.csv)
            </AdminButton>
            <AdminButton $variant="gold" onClick={handleDownloadTemplate} icon={<Download size={14} />}>
              Download Sample Excel Template
            </AdminButton>
          </div>
        }
      />

      {errorMsg && (
        <div style={{ background: '#fce8e6', border: '1px solid #f5c2c7', color: '#c5221f', padding: '16px 20px', borderRadius: 6, marginBottom: 24, fontWeight: 600 }}>
          <XCircle size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} /> {errorMsg}
        </div>
      )}

      {/* STEP GRID: EXCEL & MEDIA ZIP UPLOADER */}
      {!importResult && (
        <>
          <StepsGrid>
            {/* CARD 1: EXCEL / CSV FILE */}
            <Card>
              <div className="card-title">
                <FileSpreadsheet size={20} /> 1. Upload CSV / Excel File (.csv, .xlsx, .xls)
              </div>
              <input ref={excelInputRef} type="file" accept=".xlsx,.xls,.csv" style={{ display: 'none' }} onChange={handleExcelSelect} />
              <DropZone $hasFile={Boolean(excelFile)} onClick={() => excelInputRef.current?.click()}>
                <FileSpreadsheet size={36} className="icon" />
                <div className="title">{excelFile ? excelFile.name : 'Choose CSV or Excel File (.csv, .xlsx, .xls)'}</div>
                <div className="sub">{excelFile ? `${(excelFile.size / 1024).toFixed(1)} KB` : 'Supports Etsy CSV (EtsyListingsDownload.csv), Shopify, & Floksy Excel'}</div>
              </DropZone>
            </Card>

            {/* CARD 2: MEDIA ZIP */}
            <Card>
              <div className="card-title">
                <FileArchive size={20} /> 2. Product Media ZIP (Optional)
              </div>
              <input ref={zipInputRef} type="file" accept=".zip" style={{ display: 'none' }} onChange={handleZipSelect} />
              <DropZone $hasFile={Boolean(mediaZip)} onClick={() => zipInputRef.current?.click()}>
                <FileArchive size={36} className="icon" />
                <div className="title">{mediaZip ? mediaZip.name : 'Choose Media Package (.zip)'}</div>
                <div className="sub">{mediaZip ? `${(mediaZip.size / 1024 / 1024).toFixed(2)} MB` : 'Contains product images e.g. FJ-RNG-001-1.jpg'}</div>
              </DropZone>
            </Card>

            {/* CARD 3: IMPORT MODE */}
            <Card>
              <div className="card-title">
                <PackageCheck size={20} /> 3. Import Settings
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: 8 }}>Import Mode:</div>
              <ModeRow>
                <label>
                  <input type="radio" name="importMode" value="CREATE_NEW" checked={importMode === 'CREATE_NEW'} onChange={(e) => setImportMode(e.target.value)} />
                  Create New Products Only
                </label>
              </ModeRow>
              <ModeRow>
                <label>
                  <input type="radio" name="importMode" value="UPDATE_EXISTING" checked={importMode === 'UPDATE_EXISTING'} onChange={(e) => setImportMode(e.target.value)} />
                  Update Existing Products
                </label>
              </ModeRow>

              <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
                <Btn $variant="primary" onClick={handleValidate} disabled={validating || !excelFile} style={{ width: '100%', justifyContent: 'center' }}>
                  {validating ? <RefreshCw size={16} className="spin" /> : <Eye size={16} />} Validate Excel & Preview
                </Btn>
              </div>
            </Card>
          </StepsGrid>

          {/* VALIDATION PREVIEW AREA */}
          {validationResult && (
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div className="card-title" style={{ margin: 0 }}>
                  <FileText size={20} /> Import Preview & Validation Summary
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {validationResult.errorRows > 0 && (
                    <Btn $variant="outline" onClick={handleDownloadErrorReport}>
                      <Download size={16} /> Download Error Report (.xlsx)
                    </Btn>
                  )}
                  <Btn $variant="gold" onClick={handleExecuteImport} disabled={importing || validationResult.validRows === 0}>
                    {importing ? <RefreshCw size={16} className="spin" /> : <Upload size={16} />} Confirm & Import Products Now
                  </Btn>
                </div>
              </div>

              {/* STAT CARDS */}
              {(() => {
                const previewList = validationResult.preview || validationResult.products || [];
                const totalRows = validationResult.totalRows ?? validationResult.summary?.totalProducts ?? previewList.length;
                const validRows = validationResult.validRows ?? previewList.filter((p: any) => p.isValid !== false).length;
                const errorRows = validationResult.errorRows ?? (validationResult.errors?.length || 0);
                const warningRows = validationResult.warningRows ?? (validationResult.warnings?.length || 0);

                return (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
                      <StatCard $color="#19202a">
                        <div className="stat-num">{totalRows}</div>
                        <div className="stat-label">Total Rows Detected</div>
                      </StatCard>
                      <StatCard $color="#137333">
                        <div className="stat-num">{validRows}</div>
                        <div className="stat-label">Valid Products Ready</div>
                      </StatCard>
                      <StatCard $color="#c5221f">
                        <div className="stat-num">{errorRows}</div>
                        <div className="stat-label">Error Rows (Blocked)</div>
                      </StatCard>
                      <StatCard $color="#b06000">
                        <div className="stat-num">{warningRows}</div>
                        <div className="stat-label">Warnings Noted</div>
                      </StatCard>
                    </div>

                    {/* PREVIEW TABLE */}
                    <TableWrapper>
                      <table>
                        <thead>
                          <tr>
                            <th style={{ width: 60 }}>Row #</th>
                            <th>Product Name</th>
                            <th>SKU</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Metal</th>
                            <th>Diamond</th>
                            <th>Price ($)</th>
                            <th>Status</th>
                            <th>Validation Result</th>
                          </tr>
                        </thead>
                        <tbody>
                          {previewList.map((p: any, idx: number) => (
                            <tr key={idx}>
                              <td>#{p.rowNum || idx + 2}</td>
                              <td>{p.name}</td>
                              <td>
                                <code>{p.sku}</code>
                              </td>
                              <td>{p.category || p.categoryName || 'Rings'}</td>
                              <td>{p.jewelleryType || p.jewelryType || 'Ring'}</td>
                              <td>{p.metal || 'Standard'}</td>
                              <td>{p.shape || 'Round'} {p.carat || 1.0}ct</td>
                              <td>${p.price?.toLocaleString() || 5000}</td>
                              <td>{p.status || 'ACTIVE'}</td>
                              <td className={p.isValid !== false ? (p.warnings?.length ? 'warn' : 'valid') : 'err'}>
                                {p.isValid !== false ? (
                                  p.warnings?.length ? (
                                    <span>
                                      <AlertTriangle size={14} style={{ verticalAlign: 'middle' }} /> Warning: {p.warnings[0]}
                                    </span>
                                  ) : (
                                    <span>
                                      <CheckCircle size={14} style={{ verticalAlign: 'middle' }} /> Valid Ready
                                    </span>
                                  )
                                ) : (
                                  <span>
                                    <XCircle size={14} style={{ verticalAlign: 'middle' }} /> Error: {p.errors?.join('; ') || 'Validation error'}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TableWrapper>
                  </>
                );
              })()}
            </Card>
          )}

          {/* PROGRESS OVERLAY */}
          {importing && (
            <ProgressOverlay>
              <RefreshCw size={36} className="spin" />
              <div className="msg">{progressStatusMsg}</div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>{progressPercent}% Complete</div>
              <div className="bar-outer">
                <div className="bar-inner" style={{ width: `${progressPercent}%` }} />
              </div>
            </ProgressOverlay>
          )}
        </>
      )}

      {/* FINAL IMPORT RESULTS DASHBOARD */}
      {importResult && (
        <Card style={{ padding: 36, textAlign: 'center' }}>
          <CheckCircle size={54} color="#137333" style={{ marginBottom: 16 }} />
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', margin: '0 0 8px' }}>BULK PRODUCT IMPORT COMPLETE</h2>
          <p style={{ color: '#666', marginBottom: 28 }}>Products and Media files have been saved to the database and storefront</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12, marginBottom: 32 }}>
            <StatCard $color="#19202a">
              <div className="stat-num">{importResult.processed}</div>
              <div className="stat-label">Processed</div>
            </StatCard>
            <StatCard $color="#137333">
              <div className="stat-num">{importResult.created}</div>
              <div className="stat-label">Created</div>
            </StatCard>
            <StatCard $color="#c9a45c">
              <div className="stat-num">{importResult.updated}</div>
              <div className="stat-label">Updated</div>
            </StatCard>
            <StatCard $color="#777">
              <div className="stat-num">{importResult.skipped}</div>
              <div className="stat-label">Skipped</div>
            </StatCard>
            <StatCard $color="#c5221f">
              <div className="stat-num">{importResult.failed}</div>
              <div className="stat-label">Failed</div>
            </StatCard>
            <StatCard $color="#19202a">
              <div className="stat-num">{importResult.imagesUploaded}</div>
              <div className="stat-label">Images</div>
            </StatCard>
            <StatCard $color="#19202a">
              <div className="stat-num">{importResult.videosUploaded}</div>
              <div className="stat-label">Videos</div>
            </StatCard>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <Btn $variant="primary" onClick={() => navigate(`${PRIVATE_ADMIN_PATH}/products`)}>
              <PackageCheck size={16} /> View All Products
            </Btn>
            <Btn
              $variant="outline"
              onClick={() => {
                setImportResult(null);
                setValidationResult(null);
                setExcelFile(null);
                setMediaZip(null);
              }}
            >
              <RefreshCw size={16} /> Import Another Excel File
            </Btn>
          </div>
        </Card>
      )}
    </div>
  );
};
