import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Upload, FileSpreadsheet, CheckCircle, AlertTriangle, X, RefreshCw, Layers } from 'lucide-react';
import * as XLSX from 'xlsx';
import { api } from '../../../services/api';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
  backdrop-filter: blur(4px);
`;

const ModalCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e8e3d9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #faf8f5;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: #1a1918;
    margin: 0;
  }

  button.close-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    color: #77736c;
    &:hover { color: #1a1918; }
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;

const UploadBox = styled.div<{ $isDragOver?: boolean }>`
  border: 2px dashed ${({ $isDragOver }) => ($isDragOver ? '#c9a45c' : '#d9d3c7')};
  background-color: ${({ $isDragOver }) => ($isDragOver ? '#fdfbf7' : '#faf9f6')};
  border-radius: 6px;
  padding: 36px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c9a45c;
    background-color: #fdfbf7;
  }

  svg {
    color: #c9a45c;
    margin-bottom: 12px;
  }

  h4 {
    font-size: 1.05rem;
    font-weight: 600;
    margin: 0 0 6px;
    color: #1a1918;
  }

  p {
    font-size: 0.85rem;
    color: #77736c;
    margin: 0;
  }
`;

const PreviewTableContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #e8e3d9;
  border-radius: 4px;
  max-height: 280px;
  overflow: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8rem;

    th {
      background: #f4f0e8;
      padding: 10px 12px;
      text-align: left;
      font-weight: 600;
      color: #1a1918;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    td {
      padding: 8px 12px;
      border-bottom: 1px solid #eee;
      color: #444;
      white-space: nowrap;
    }

    tr:nth-child(even) td {
      background: #faf8f5;
    }
  }
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e8e3d9;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: #faf8f5;

  button {
    padding: 10px 20px;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  button.cancel {
    background: transparent;
    border: 1px solid #ccc;
    color: #555;
    &:hover { background: #eee; }
  }

  button.submit {
    background: #1a1918;
    border: 1px solid #1a1918;
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    &:hover { background: #c9a45c; border-color: #c9a45c; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  }
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const DiamondExcelImportModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const [parsedDiamonds, setParsedDiamonds] = useState<any[]>([]);
  const [importing, setImporting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const parseExcelFile = (file: File) => {
    setError('');
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buffer = e.target?.result;
        const wb = XLSX.read(buffer, { type: 'array' });
        
        let allRows: any[] = [];

        wb.SheetNames.forEach((sheetName) => {
          const sheet = wb.Sheets[sheetName];
          const jsonRows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });
          
          jsonRows.forEach((r) => {
            const clean: Record<string, any> = {};
            Object.keys(r).forEach((k) => {
              clean[k.trim()] = r[k];
            });

            // Clean column mapping
            const getVal = (keys: string[]) => {
              for (const key of keys) {
                const foundKey = Object.keys(clean).find((k) => k.toLowerCase() === key.toLowerCase());
                if (foundKey && clean[foundKey] !== undefined && clean[foundKey] !== '') {
                  return String(clean[foundKey]).trim();
                }
              }
              return '';
            };

            const getFloat = (keys: string[]) => {
              const val = getVal(keys);
              const num = parseFloat(val);
              return isNaN(num) ? 0 : num;
            };

            const stockId = getVal(['stock id', 'stockid', 'diamond id', 'id']);
            if (!stockId) return;

            const carat = getFloat(['weight', ' weight ', 'carat', 'wt']);
            const price = getFloat(['total', 'total $', 'price']);
            const pct = getFloat(['p/ct', 'price/ct', 'pct']);
            const calculatedPrice = price > 0 ? price : (carat > 0 && pct > 0 ? carat * pct : 1500);

            const cvdHpht = getVal(['cvd/hpht', 'growth type', 'type']);
            const fancyColor = getVal(['fancy color']);
            const fancyIntensity = getVal(['fancy color intensity']);

            let diamondType = 'NATURAL';
            if (cvdHpht.toUpperCase().includes('HPHT') || cvdHpht.toUpperCase().includes('CVD') || cvdHpht.toUpperCase().includes('LAB')) {
              diamondType = 'LAB_GROWN';
            }
            if (fancyColor) {
              diamondType = diamondType === 'LAB_GROWN' ? 'LAB_GROWN_FANCY' : 'FANCY';
            }

            allRows.push({
              diamondId: stockId,
              stockId: stockId,
              diamondType,
              shape: getVal(['shape']) || 'Round',
              carat: carat || 1.0,
              color: (getVal(['color']) || 'D').toUpperCase(),
              clarity: (getVal(['clarity']) || 'VS1').toUpperCase(),
              cut: (getVal(['cut']) || 'EXCELLENT').toUpperCase(),
              polish: (getVal(['polish']) || 'EXCELLENT').toUpperCase(),
              symmetry: (getVal(['symmetry']) || 'EXCELLENT').toUpperCase(),
              fluorescence: getVal(['fluorescence']) || 'None',
              lab: (getVal(['lab']) || 'IGI').toUpperCase(),
              price: calculatedPrice,
              pricePerCarat: pct || (carat > 0 ? calculatedPrice / carat : null),
              certificateNo: getVal(['certificate', 'certificate ', 'cert no', 'certificate_no']),
              certificateLink: getVal(['cerificate link', 'certificate link', 'cert link']),
              imageUrl: getVal(['imageurl', 'image url', 'image', 'photo']),
              videoUrl: getVal(['diamond video', 'video url', 'video', 'video link']),
              depth: getFloat(['depth %', 'depth']),
              table: getFloat(['table %', 'table']),
              fancyColor: fancyColor || undefined,
              fancyIntensity: fancyIntensity || undefined,
            });
          });
        });

        if (allRows.length === 0) {
          setError('No valid diamond rows found in the Excel file.');
        } else {
          setParsedDiamonds(allRows);
        }
      } catch (err: any) {
        console.error(err);
        setError('Failed to parse Excel file. Please ensure it is a valid .xlsx or .csv file.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      parseExcelFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      parseExcelFile(e.dataTransfer.files[0]);
    }
  };

  const handleImport = async () => {
    if (parsedDiamonds.length === 0) return;
    setImporting(true);
    try {
      const res = await api.executeDiamondImport({ diamonds: parsedDiamonds, mode: 'UPSERT', fileName: fileName });
      alert(`Success! ${res.message || 'Imported diamonds successfully.'}\nTotal Rows: ${parsedDiamonds.length}`);
      setImporting(false);
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Error executing diamond import.');
      setImporting(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>Import Diamond Vault Inventory</h3>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </ModalHeader>

        <ModalBody>
          <UploadBox
            $isDragOver={isDragOver}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".xlsx, .xls, .csv"
              style={{ display: 'none' }}
            />
            <FileSpreadsheet size={44} />
            <h4>{fileName ? fileName : 'Click or Drag & Drop Excel File Here'}</h4>
            <p>Supports <strong>.xlsx</strong>, <strong>.xls</strong>, and <strong>.csv</strong> files (e.g. D VARNI PRICE LIST, Fancy Color Lists)</p>
          </UploadBox>

          {error && (
            <div style={{ marginTop: 16, padding: '12px 16px', background: '#fee2e2', color: '#991b1b', borderRadius: 4, fontSize: '0.85rem' }}>
              ⚠️ {error}
            </div>
          )}

          {parsedDiamonds.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 8 }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1918' }}>
                  <CheckCircle size={16} color="#16a34a" style={{ verticalAlign: 'middle', marginRight: 6 }} />
                  Detected {parsedDiamonds.length} Diamond Records to Import
                </span>
                <span style={{ fontSize: '0.8rem', color: '#777' }}>Ready to sync into database</span>
              </div>

              <PreviewTableContainer>
                <table>
                  <thead>
                    <tr>
                      <th>Stock ID</th>
                      <th>Type</th>
                      <th>Shape</th>
                      <th>Carat</th>
                      <th>Color</th>
                      <th>Clarity</th>
                      <th>Price ($)</th>
                      <th>Lab</th>
                      <th>Image</th>
                      <th>360 Video</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedDiamonds.slice(0, 50).map((d, idx) => (
                      <tr key={idx}>
                        <td><strong>{d.diamondId}</strong></td>
                        <td>{d.diamondType}</td>
                        <td>{d.shape}</td>
                        <td>{d.carat}ct</td>
                        <td>{d.color}</td>
                        <td>{d.clarity}</td>
                        <td>${d.price.toLocaleString()}</td>
                        <td>{d.lab}</td>
                        <td>{d.imageUrl ? '✅ Linked' : '—'}</td>
                        <td>{d.videoUrl ? '🎥 Linked' : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </PreviewTableContainer>
              {parsedDiamonds.length > 50 && (
                <div style={{ fontSize: '0.75rem', color: '#888', marginTop: 6, textAlign: 'right' }}>
                  Showing first 50 rows of {parsedDiamonds.length} total rows
                </div>
              )}
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <button className="cancel" onClick={onClose} disabled={importing}>Cancel</button>
          <button
            className="submit"
            onClick={handleImport}
            disabled={importing || parsedDiamonds.length === 0}
          >
            {importing ? <RefreshCw size={16} className="spin" /> : <Upload size={16} />}
            {importing ? 'Importing Inventory...' : `Import ${parsedDiamonds.length} Diamonds Now`}
          </button>
        </ModalFooter>
      </ModalCard>
    </ModalOverlay>
  );
};
