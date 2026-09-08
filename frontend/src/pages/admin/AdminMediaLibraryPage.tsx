import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Copy, Check, Upload, Trash2 } from 'lucide-react';
import { api } from '../../services/api';
import {
  AdminPageHeader,
  AdminCard,
  AdminCardHeader,
  AdminButton,
  AdminInput,
} from '../../components/admin/AdminUI';

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;

const MediaCard = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c9a45c;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  }

  .img-container {
    height: 180px;
    background: #faf8f5;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 12px;
    border-bottom: 1px solid #f2ede4;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .meta {
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .name {
      font-size: 0.8rem;
      font-weight: 600;
      color: #1f1f1f;
      word-break: break-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

export const AdminMediaLibraryPage: React.FC = () => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [newUrlInput, setNewUrlInput] = useState('');
  const [newFileInputName, setNewFileInputName] = useState('');

  const fetchMedia = async () => {
    try {
      const data = await api.getAllMedia();
      if (data && Array.isArray(data)) {
        setMediaList(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleAddMedia = async () => {
    if (!newUrlInput || !newFileInputName) return;
    try {
      await api.uploadMedia({ name: newFileInputName, url: newUrlInput, fileType: 'IMAGE', fileSize: 1024 });
      setNewUrlInput('');
      setNewFileInputName('');
      fetchMedia();
    } catch (err) {
      alert('Failed to register media item.');
    }
  };

  const handleDeleteMedia = async (media: any) => {
    if (!window.confirm(`Delete media item "${media.name}"?`)) return;
    try {
      await api.deleteMedia(media.id);
      fetchMedia();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete media item.');
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Central Media Library"
        description="Browse, upload, and copy URLs for brand image assets, banners, icons, and product media."
      />

      <AdminCard>
        <AdminCardHeader>
          <h3>REGISTER / UPLOAD BRAND ASSET</h3>
        </AdminCardHeader>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <AdminInput
              type="text"
              placeholder="Asset Display Name (e.g. Oval Diamond Icon)"
              value={newFileInputName}
              onChange={(e) => setNewFileInputName(e.target.value)}
            />
          </div>
          <div style={{ flex: 2, minWidth: 300 }}>
            <AdminInput
              type="text"
              placeholder="Image URL or Path (e.g. /assets/aura_hero_luxury.webp)"
              value={newUrlInput}
              onChange={(e) => setNewUrlInput(e.target.value)}
            />
          </div>
          <AdminButton $variant="gold" onClick={handleAddMedia} icon={<Upload size={14} />}>
            Register Asset
          </AdminButton>
        </div>
      </AdminCard>

      <MediaGrid>
        {mediaList.map((asset) => (
          <MediaCard key={asset.url}>
            <div className="img-container">
              <img src={asset.url} alt={asset.name} />
            </div>
            <div className="meta">
              <div className="name" title={asset.name}>{asset.name}</div>
              <div className="actions">
                <AdminButton $size="sm" $variant="secondary" onClick={() => handleCopy(asset.url)} icon={copiedUrl === asset.url ? <Check size={13} color="#137333" /> : <Copy size={13} />}>
                  {copiedUrl === asset.url ? 'Copied' : 'Copy URL'}
                </AdminButton>
                <AdminButton $size="sm" $variant="danger" onClick={() => handleDeleteMedia(asset)} icon={<Trash2 size={13} />} />
              </div>
            </div>
          </MediaCard>
        ))}
      </MediaGrid>
    </div>
  );
};
