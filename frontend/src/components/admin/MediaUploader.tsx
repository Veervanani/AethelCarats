import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Upload, FolderOpen, Image as ImageIcon, Trash2, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { MediaLibraryModal } from './MediaLibraryModal';
import { AdminButton } from './AdminUI';
import { api } from '../../services/api';

const UploadCardContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
`;

const UploadHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .label-title {
    font-weight: 600;
    font-size: 0.85rem;
    color: #1f1f1f;
  }
`;

const DropZone = styled.div<{ $isDragging?: boolean }>`
  border: 2px dashed ${({ $isDragging }) => ($isDragging ? '#c9a45c' : '#d9d3c7')};
  background: ${({ $isDragging }) => ($isDragging ? '#faf6ee' : '#faf8f5')};
  border-radius: 6px;
  padding: 24px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    border-color: #c9a45c;
    background: #faf6ee;
  }

  .icon-circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #e8e3d9;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c9a45c;
  }

  .main-text {
    font-size: 0.88rem;
    font-weight: 600;
    color: #1f1f1f;
  }

  .sub-text {
    font-size: 0.75rem;
    color: #77736c;
  }
`;

const PreviewBox = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 12px 14px;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
  flex-wrap: wrap;

  .img-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    border: 1px solid #d9d3c7;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info-col {
    flex: 1;
    min-width: 120px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow: hidden;

    .filename {
      font-weight: 700;
      font-size: 0.82rem;
      color: #1f1f1f;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .meta {
      font-size: 0.72rem;
      color: #77736c;
    }
  }

  .actions-col {
    display: flex;
    gap: 6px;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: #1f1f1f;
  cursor: pointer;
  margin-top: 4px;
  user-select: none;

  input[type='checkbox'] {
    width: 16px;
    height: 16px;
    accent-color: #c9a45c;
    cursor: pointer;
  }
`;

interface MediaUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  helpText?: string;
  allowDesktopToggle?: boolean;
  useDesktop?: boolean;
  onToggleDesktop?: (val: boolean) => void;
  desktopValue?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  value = '',
  onChange,
  label = 'Image Asset',
  helpText = 'JPG, PNG, WEBP or SVG up to 15MB',
  allowDesktopToggle = false,
  useDesktop = false,
  onToggleDesktop,
  desktopValue = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [errorToast, setErrorToast] = useState('');

  const displayUrl = useDesktop ? desktopValue : value;
  const filename = displayUrl ? displayUrl.split('/').pop() || 'Selected Image' : '';

  const handleFileUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    const filesArray = Array.from(files);

    try {
      setUploading(true);
      setErrorToast('');
      const token = localStorage.getItem('admin_session_token') || localStorage.getItem('app_auth_token');
      const BATCH_SIZE = 10;
      let lastUploadedUrl = '';

      for (let i = 0; i < filesArray.length; i += BATCH_SIZE) {
        const chunk = filesArray.slice(i, i + BATCH_SIZE);
        const formData = new FormData();
        for (const file of chunk) {
          formData.append('files', file);
        }

        const res = await api.post('/admin/media/upload', formData);
        const data = res.data;

        const batchUrls = (data.media || [{ url: data.url }])
          .map((m: any) => (typeof m === 'string' ? m : (m.url || m.path)))
          .filter(Boolean);

        if (batchUrls.length > 0) {
          lastUploadedUrl = batchUrls[batchUrls.length - 1];
        }
      }

      if (lastUploadedUrl) {
        if (value && value.startsWith('/uploads/') && value !== lastUploadedUrl) {
          api.deleteUploadedFile(value).catch(console.warn);
        }
        onChange(lastUploadedUrl);
        if (useDesktop && onToggleDesktop) {
          onToggleDesktop(false);
        }
      }
    } catch (err: any) {
      setErrorToast(err.message || 'Image upload failed. Please try again.');
      setTimeout(() => setErrorToast(''), 5000);
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  return (
    <UploadCardContainer>
      <UploadHeader>
        <span className="label-title">{label}</span>
        {allowDesktopToggle && onToggleDesktop && (
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={useDesktop}
              onChange={(e) => onToggleDesktop(e.target.checked)}
            />
            <span>☑ Use Desktop Image</span>
          </CheckboxLabel>
        )}
      </UploadHeader>

      {errorToast && (
        <div style={{ background: '#fff5f5', color: '#c53030', padding: '8px 12px', borderRadius: 4, fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #feb2b2' }}>
          <AlertCircle size={14} /> {errorToast}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        style={{ display: 'none' }}
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
      />

      {displayUrl ? (
        <PreviewBox>
          <div className="img-wrapper">
            <img src={displayUrl} alt="Preview" />
          </div>
          <div className="info-col">
            <span className="filename" title={filename}>{filename}</span>
            <span className="meta">{useDesktop ? 'Using Desktop Image asset' : 'Verified PC Upload'}</span>
          </div>
          <div className="actions-col">
            <AdminButton
              $variant="secondary"
              $size="sm"
              onClick={() => fileInputRef.current?.click()}
              $loading={uploading}
              icon={<Upload size={12} />}
            >
              Replace
            </AdminButton>
            <AdminButton
              $variant="secondary"
              $size="sm"
              onClick={() => setIsLibraryOpen(true)}
              icon={<FolderOpen size={12} />}
            >
              Library
            </AdminButton>
            {!useDesktop && (
              <AdminButton
                $variant="danger"
                $size="sm"
                onClick={() => {
                  if (value && value.startsWith('/uploads/')) {
                    api.deleteUploadedFile(value).catch(console.warn);
                  }
                  onChange('');
                }}
                icon={<Trash2 size={12} />}
              />
            )}
          </div>
        </PreviewBox>
      ) : (
        <DropZone
          $isDragging={isDragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="icon-circle">
            {uploading ? <RefreshCw size={20} className="spin" /> : <Upload size={20} />}
          </div>
          <div>
            <div className="main-text">{uploading ? 'Uploading Image to Atelier Vault...' : 'Drag & Drop image here or click to browse from PC'}</div>
            <div className="sub-text">{helpText}</div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }} onClick={(e) => e.stopPropagation()}>
            <AdminButton
              $variant="gold"
              $size="sm"
              onClick={() => fileInputRef.current?.click()}
              $loading={uploading}
              icon={<Upload size={13} />}
            >
              + Upload From PC
            </AdminButton>
            <AdminButton
              $variant="secondary"
              $size="sm"
              onClick={() => setIsLibraryOpen(true)}
              icon={<FolderOpen size={13} />}
            >
              Choose From Media Library
            </AdminButton>
          </div>
        </DropZone>
      )}

      <MediaLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelectMedia={(url) => {
          if (value && value.startsWith('/uploads/') && value !== url) {
            api.deleteUploadedFile(value).catch(console.warn);
          }
          onChange(url);
          if (useDesktop && onToggleDesktop) {
            onToggleDesktop(false);
          }
        }}
      />
    </UploadCardContainer>
  );
};
