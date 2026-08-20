import React, { useState } from 'react';
import styled from 'styled-components';
import { Upload, Trash2, Image as ImageIcon, Link as LinkIcon, Check } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const UploadFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;

  label {
    font-size: 0.86rem;
    font-weight: 600;
    color: #12161a;
    letter-spacing: 0.02em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .help-text {
      font-weight: 400;
      color: #77736c;
      font-size: 0.78rem;
    }
  }
`;

const UploadCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px dashed #c9a45c;
  border-radius: 6px;
  padding: 14px 18px;
  background: #fcfaf6;
  width: 100%;
  box-sizing: border-box;

  .preview-box {
    width: 84px;
    height: 84px;
    border-radius: 4px;
    overflow: hidden;
    background: #ffffff;
    border: 1px solid #e8e3d9;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .upload-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;

    .buttons-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
  }
`;

const ActionBtn = styled.button<{ $variant?: 'primary' | 'outline' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  ${({ $variant }) =>
    $variant === 'danger'
      ? `
    background: #fff0f0;
    color: #c5221f;
    border: 1px solid #f8c4c4;
    &:hover { background: #c5221f; color: #fff; }
  `
      : $variant === 'outline'
      ? `
    background: transparent;
    color: #12161a;
    border: 1px solid #d9d3c7;
    &:hover { background: #faf8f5; border-color: #12161a; }
  `
      : `
    background: #c9a45c;
    color: #ffffff;
    border: 1px solid #c9a45c;
    &:hover { background: #b38f46; border-color: #b38f46; }
  `}
`;

interface AdminImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  helpText?: string;
}

export const AdminImageUploadField: React.FC<AdminImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helpText,
}) => {
  const { showToast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    showToast('Uploading image from PC...', 'info');

    try {
      const formData = new FormData();
      formData.append('files', file);

      const res = await api.post('/admin/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data && res.data.urls && res.data.urls.length > 0) {
        onChange(res.data.urls[0]);
        showToast('Image uploaded successfully!', 'success');
      } else {
        // Fallback to FileReader if server upload returns raw response
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            onChange(event.target.result as string);
            showToast('Image loaded successfully!', 'success');
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      // Fallback read as Data URL on network error
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(event.target.result as string);
          showToast('Image uploaded locally!', 'success');
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  return (
    <UploadFieldContainer>
      {label && (
        <label>
          {label}
          {helpText && <span className="help-text">{helpText}</span>}
        </label>
      )}

      <UploadCard>
        <div className="preview-box">
          {value ? (
            <img src={value} alt="Uploaded Preview" />
          ) : (
            <ImageIcon size={28} color="#c9a45c" />
          )}
        </div>

        <div className="upload-actions">
          <div className="buttons-row">
            <label style={{ cursor: 'pointer', margin: 0 }}>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                disabled={uploading}
              />
              <ActionBtn type="button" $variant="primary" as="span">
                <Upload size={14} /> {uploading ? 'Uploading...' : 'Upload Image from PC'}
              </ActionBtn>
            </label>

            {value && (
              <ActionBtn
                type="button"
                $variant="danger"
                onClick={() => onChange('')}
              >
                <Trash2 size={14} /> Remove Image
              </ActionBtn>
            )}

            <ActionBtn
              type="button"
              $variant="outline"
              onClick={() => setShowUrlInput(!showUrlInput)}
            >
              <LinkIcon size={14} /> {showUrlInput ? 'Hide URL Input' : 'Edit URL'}
            </ActionBtn>
          </div>

          {showUrlInput && (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Paste direct image URL or assets path..."
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '0.82rem',
                border: '1px solid #d9d3c7',
                borderRadius: '4px',
                marginTop: '4px',
              }}
            />
          )}
        </div>
      </UploadCard>
    </UploadFieldContainer>
  );
};
