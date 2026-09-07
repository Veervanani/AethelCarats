import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search, X, Check, Image as ImageIcon, RefreshCw, Upload } from 'lucide-react';
import { api } from '../../services/api';
import { AdminButton, AdminInput } from './AdminUI';

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(18, 22, 26, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 8px;
  width: 100%;
  max-width: 960px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e8e3d9;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    color: #1f1f1f;
    margin: 0;
  }

  button.close-btn {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    &:hover {
      color: #1f1f1f;
      background: #f5f2ea;
    }
  }
`;

const ToolbarRow = styled.div`
  padding: 16px 24px;
  background: #faf8f5;
  border-bottom: 1px solid #e8e3d9;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
`;

const MediaGrid = styled.div`
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  overflow-y: auto;
  flex: 1;
`;

const MediaCard = styled.div<{ $selected?: boolean }>`
  position: relative;
  aspect-ratio: 1 / 1;
  background: #fff;
  border: 2px solid ${({ $selected }) => ($selected ? '#c9a45c' : '#e8e3d9')};
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c9a45c;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .meta-tag {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(25, 32, 42, 0.85);
    color: #fff;
    padding: 4px 6px;
    font-size: 0.65rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .selected-badge {
    position: absolute;
    top: 6px;
    right: 6px;
    background: #c9a45c;
    color: #fff;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e8e3d9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #faf8f5;
`;

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia: (url: string) => void;
}

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({ isOpen, onClose, onSelectMedia }) => {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen]);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const res = await api.getAllMedia(searchTerm);
      const items = Array.isArray(res) ? res : res?.media || [];
      if (items.length === 0) {
        // Fallback default assets if database media table is empty
        setMediaItems([
          { id: '1', url: '/assets/gem_hero_luxury.png', filename: 'gem_hero_luxury.png' },
          { id: '2', url: '/assets/gem_rings_cat.png', filename: 'gem_rings_cat.png' },
          { id: '3', url: '/assets/gem_rings_cat_2.png', filename: 'gem_rings_cat_2.png' },
          { id: '4', url: '/assets/gem_earrings_cat.png', filename: 'gem_earrings_cat.png' },
          { id: '5', url: '/assets/gem_necklaces_cat.png', filename: 'gem_necklaces_cat.png' },
          { id: '6', url: '/assets/gem_bracelets_cat.png', filename: 'gem_bracelets_cat.png' },
          { id: '7', url: '/assets/gem_diamonds_cat.png', filename: 'gem_diamonds_cat.png' },
          { id: '8', url: '/assets/gem_craftsmanship.jpg', filename: 'gem_craftsmanship.jpg' },
        ]);
      } else {
        setMediaItems(items);
      }
    } catch (err) {
      console.error('Failed to fetch media library items:', err);
      setMediaItems([
        { id: '1', url: '/assets/gem_hero_luxury.png', filename: 'gem_hero_luxury.png' },
        { id: '2', url: '/assets/gem_rings_cat.png', filename: 'gem_rings_cat.png' },
        { id: '3', url: '/assets/gem_rings_cat_2.png', filename: 'gem_rings_cat_2.png' },
        { id: '4', url: '/assets/gem_earrings_cat.png', filename: 'gem_earrings_cat.png' },
        { id: '5', url: '/assets/gem_necklaces_cat.png', filename: 'gem_necklaces_cat.png' },
        { id: '6', url: '/assets/gem_bracelets_cat.png', filename: 'gem_bracelets_cat.png' },
        { id: '7', url: '/assets/gem_diamonds_cat.png', filename: 'gem_diamonds_cat.png' },
        { id: '8', url: '/assets/gem_craftsmanship.jpg', filename: 'gem_craftsmanship.jpg' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const filtered = mediaItems.filter((m) => {
    const fn = (m.filename || m.url || '').toLowerCase();
    return fn.includes(searchTerm.toLowerCase());
  });

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>Media Library Selector</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </ModalHeader>

        <ToolbarRow>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, maxWidth: 400 }}>
            <Search size={16} color="#666" />
            <AdminInput
              type="text"
              placeholder="Search by filename or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '6px 12px' }}
            />
          </div>
          <AdminButton $variant="secondary" $size="sm" onClick={loadMedia} icon={<RefreshCw size={13} />}>
            Refresh Library
          </AdminButton>
        </ToolbarRow>

        <MediaGrid>
          {loading ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 40, color: '#77736c' }}>
              <RefreshCw size={24} className="spin" /> Loading Central Media Vault...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 40, color: '#77736c' }}>
              No images match your search criteria.
            </div>
          ) : (
            filtered.map((item) => {
              const url = item.url || item.path || '';
              const isSelected = selectedUrl === url;
              const name = item.filename || item.originalName || url.split('/').pop() || 'Media';
              return (
                <MediaCard key={item.id || url} $selected={isSelected} onClick={() => setSelectedUrl(url)}>
                  <img src={url} alt={name} />
                  <div className="meta-tag" title={name}>{name}</div>
                  {isSelected && (
                    <div className="selected-badge">
                      <Check size={14} />
                    </div>
                  )}
                </MediaCard>
              );
            })
          )}
        </MediaGrid>

        <ModalFooter>
          <div style={{ fontSize: '0.8rem', color: '#77736c' }}>
            {selectedUrl ? `Selected: ${selectedUrl.split('/').pop()}` : 'Select an image asset from the grid above'}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <AdminButton $variant="secondary" onClick={onClose}>
              Cancel
            </AdminButton>
            <AdminButton
              $variant="gold"
              disabled={!selectedUrl}
              onClick={() => {
                if (selectedUrl) {
                  onSelectMedia(selectedUrl);
                  onClose();
                }
              }}
              icon={<Check size={14} />}
            >
              Select Image
            </AdminButton>
          </div>
        </ModalFooter>
      </ModalContent>
    </ModalBackdrop>
  );
};
