import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Sliders, RotateCcw, ChevronDown, Check, X } from 'lucide-react';
import { LuxuryDropdown, LuxuryOption } from './LuxuryDropdown';
import { ShapeSelector } from './ShapeSelector';
import { api } from '../../services/api';

export interface FilterOption {
  label: string;
  value: string;
  iconUrl?: string;
  colorHex?: string;
}

export interface FilterGroupConfig {
  key: string;
  name: string;
  customerLabel: string;
  filterType: string;
  applicableJewelleryTypes: string;
  options: FilterOption[];
}

interface FloksyFilterBarProps {
  selectedFilters: Record<string, string[]>;
  onFilterChange: (key: string, values: string[]) => void;
  onClearAll: () => void;
  sortValue: string;
  onSortChange: (value: string) => void;
  totalResults?: number;
  minPrice?: number;
  maxPrice?: number;
  onPriceChange?: (min: number, max: number) => void;
  categorySlug?: string;
}

const DEFAULT_SORT_OPTIONS: FilterOption[] = [
  { label: 'Best Selling', value: 'bestsellers' },
  { label: 'Newest Arrivals', value: 'newest' },
  { label: 'Price: Low → High', value: 'price-low' },
  { label: 'Price: High → Low', value: 'price-high' },
  { label: 'Name: A → Z', value: 'name' },
];

const CATEGORY_STYLE_DEFAULTS: Record<string, FilterOption[]> = {
  rings: [
    { label: 'Solitaire', value: 'Solitaire' },
    { label: 'Halo', value: 'Halo' },
    { label: 'Three-Stone', value: 'Three-Stone' },
    { label: 'Eternity', value: 'Eternity' },
    { label: 'Vintage & Antique', value: 'Vintage & Antique' },
    { label: 'Bezel Settings', value: 'Bezel Settings' },
    { label: 'Cocktail', value: 'Cocktail' },
  ],
  earrings: [
    { label: 'Solitaire Studs', value: 'Solitaire Studs' },
    { label: 'Pear Drops', value: 'Pear Drops' },
    { label: 'Halo Studs', value: 'Halo Studs' },
    { label: 'Hoops', value: 'Hoops' },
    { label: 'Huggies', value: 'Huggies' },
    { label: 'Dangle & Drop', value: 'Dangle & Drop' },
    { label: 'Cluster', value: 'Cluster' },
  ],
  necklaces: [
    { label: 'Graduated Tennis', value: 'Graduated Tennis' },
    { label: 'Marquise & Pear Cluster', value: 'Marquise & Pear Cluster' },
    { label: 'Pendant Chain', value: 'Pendant Chain' },
    { label: 'Choker', value: 'Choker' },
    { label: 'Statement', value: 'Statement' },
    { label: 'Riviere', value: 'Riviere' },
    { label: 'Layering Chains', value: 'Layering Chains' },
  ],
  bracelets: [
    { label: 'Emerald Cut Tennis', value: 'Emerald Cut Tennis' },
    { label: 'Round Brilliant Tennis', value: 'Round Brilliant Tennis' },
    { label: 'Bangles', value: 'Bangles' },
    { label: 'Stacking Bangles', value: 'Stacking Bangles' },
    { label: 'Chain Bracelets', value: 'Chain Bracelets' },
    { label: 'Cuff', value: 'Cuff' },
    { label: 'Line Bracelet', value: 'Line Bracelet' },
  ],
  pendants: [
    { label: 'Solitaire Pendants', value: 'Solitaire Pendants' },
    { label: 'Halo Pendants', value: 'Halo Pendants' },
    { label: 'Pear Cut Pendants', value: 'Pear Cut Pendants' },
    { label: 'Gemstone Pendants', value: 'Gemstone Pendants' },
    { label: 'Cross Pendants', value: 'Cross Pendants' },
    { label: 'Heart Pendants', value: 'Heart Pendants' },
    { label: 'Initial & Letter', value: 'Initial & Letter' },
  ],
  diamonds: [
    { label: 'Natural Certified', value: 'Natural Certified' },
    { label: 'Lab-Grown', value: 'Lab-Grown' },
    { label: 'GIA Authenticated', value: 'GIA Authenticated' },
    { label: 'IGI Authenticated', value: 'IGI Authenticated' },
    { label: 'Fancy Color', value: 'Fancy Color' },
    { label: 'Loose Diamond Vault', value: 'Loose Diamond Vault' },
  ],
  collections: [
    { label: 'Signature Collection', value: 'Signature Collection' },
    { label: 'High Jewellery', value: 'High Jewellery' },
    { label: 'Bridal Suite', value: 'Bridal Suite' },
    { label: 'Diamond Essentials', value: 'Diamond Essentials' },
    { label: 'Golden Hour', value: 'Golden Hour' },
  ],
};

const FilterPanelContainer = styled.div`
  background-color: #F9F7F2;
  border: 1px solid #d9d3c7;
  padding: 24px 28px;
  margin-bottom: 24px;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(31, 31, 31, 0.03);

  @media (max-width: 992px) {
    display: none;
  }
`;

const FilterHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid #f0eae1;

  .title-group {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #1f1f1f;
    }
  }

  .clear-btn {
    background: none;
    border: none;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6b6b6b;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s ease;

    &:hover {
      color: #c9a45c;
    }
  }
`;

const MainFilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FilterBlock = styled.div`
  .block-label {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6b6b6b;
    margin-bottom: 10px;
  }

  .options-box {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 180px;
    overflow-y: auto;
    padding-right: 4px;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #d9d3c7;
      border-radius: 2px;
    }
  }

  .option-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.78rem;
    color: #4a4a4a;
    transition: all 0.15s ease;

    &:hover {
      background-color: #faf8f5;
      color: #1f1f1f;
    }

    &.selected {
      background-color: #faf5eb;
      color: #1f1f1f;
      font-weight: 600;
    }
  }

  .metal-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
`;

const PriceBlock = styled.div`
  .preset-pills {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;

    .price-pill {
      padding: 6px 8px;
      font-size: 0.72rem;
      background: #faf8f5;
      border: 1px solid #e8e3d9;
      border-radius: 3px;
      cursor: pointer;
      color: #4a4a4a;
      text-align: center;
      transition: all 0.15s ease;

      &:hover,
      &.active {
        background: #1f1f1f;
        color: #ffffff;
        border-color: #1f1f1f;
      }
    }
  }
`;

const BottomDropdownRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f0eae1;

  > div {
    flex: 1;
    min-width: 150px;
  }
`;

const ResultsHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .count {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    color: #1f1f1f;
    letter-spacing: 0.04em;
    display: flex;
    align-items: baseline;
    gap: 6px;

    .num-highlight {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      font-weight: 700;
      font-size: 1.35rem;
      color: #1f1f1f;
      letter-spacing: 0;
      line-height: 1;
    }
  }

  .sort-area {
    display: flex;
    align-items: center;
    gap: 12px;

    .sort-label {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #6b6b6b;
    }
  }

  @media (max-width: 992px) {
    margin-bottom: 14px;
    justify-content: flex-start;

    .count {
      font-size: 1.1rem;

      .num-highlight {
        font-size: 1.25rem;
      }
    }

    .sort-area {
      display: none;
    }
  }
`;

const MobileBarContainer = styled.div`
  display: none;
  @media (max-width: 992px) {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;

    button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px;
      background: #F9F7F2;
      border: 1px solid #d9d3c7;
      border-radius: 4px;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #1f1f1f;
      cursor: pointer;
    }
  }
`;

const MobileDrawerOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(18, 22, 26, 0.7);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: ${({ $open }) => ($open ? 'block' : 'none')};
`;

const MobileDrawerContent = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 380px;
  background: #ffffff;
  z-index: 10000;
  transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;

  .drawer-header {
    padding: 20px 24px;
    border-bottom: 1px solid #e8e3d9;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.4rem;
      margin: 0;
    }
  }

  .drawer-body {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .drawer-actions {
    padding: 20px 24px;
    border-top: 1px solid #e8e3d9;
    display: flex;
    gap: 12px;

    button {
      flex: 1;
      padding: 12px;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border-radius: 4px;
      cursor: pointer;

      &.clear {
        background: #ffffff;
        border: 1px solid #d9d3c7;
        color: #1f1f1f;
      }
      &.apply {
        background: #1f1f1f;
        border: 1px solid #1f1f1f;
        color: #ffffff;
      }
    }
  }
`;

export const FloksyFilterBar: React.FC<FloksyFilterBarProps> = ({
  selectedFilters,
  onFilterChange,
  onClearAll,
  sortValue,
  onSortChange,
  totalResults = 0,
  minPrice = 0,
  maxPrice = 50000,
  onPriceChange,
  categorySlug = 'all',
}) => {
  const [filterConfigs, setFilterConfigs] = useState<FilterGroupConfig[]>([]);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [activePricePill, setActivePricePill] = useState<string | null>(null);

  const isRingCategory =
    !categorySlug ||
    categorySlug === 'rings' ||
    categorySlug === 'engagement-rings' ||
    categorySlug === 'wedding-bands' ||
    categorySlug === 'all';

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const data = await api.getPublicFilters({ jewelleryType: categorySlug });
        setFilterConfigs(data.filters || []);
      } catch (err) {
        console.error('Error fetching storefront filters:', err);
      }
    };
    loadFilters();
  }, [categorySlug]);

  const handleSelectOption = (key: string, val: string) => {
    const currentList = selectedFilters[key] || [];
    const isCurrentlyActive = currentList.includes(val);

    if (val === 'All' || val === 'Any' || isCurrentlyActive) {
      onFilterChange(key, []);
    } else {
      onFilterChange(key, [val]);
    }
  };

  const handlePricePillClick = (label: string, min: number, max: number) => {
    if (activePricePill === label) {
      setActivePricePill(null);
      if (onPriceChange) onPriceChange(500, 50000);
    } else {
      setActivePricePill(label);
      if (onPriceChange) onPriceChange(min, max);
    }
  };

  const luxurySortOptions: LuxuryOption[] = DEFAULT_SORT_OPTIONS.map((opt) => ({
    label: opt.label,
    value: opt.value,
  }));

  // Find dynamic filter configs
  const genderConfig = filterConfigs.find((f) => f.key === 'gender');
  const styleConfig = filterConfigs.find((f) => f.key === 'style');
  const metalConfig = filterConfigs.find((f) => f.key === 'metal');
  const diamondConfig = filterConfigs.find((f) => f.key === 'diamond_origin');
  const ringSizeConfig = filterConfigs.find((f) => f.key === 'ring_size');
  const caratConfig = filterConfigs.find((f) => f.key === 'carat');
  const clarityConfig = filterConfigs.find((f) => f.key === 'clarity');
  const colorConfig = filterConfigs.find((f) => f.key === 'color');
  const cutConfig = filterConfigs.find((f) => f.key === 'cut');
  const certConfig = filterConfigs.find((f) => f.key === 'certification');

  const selectedGender = selectedFilters.gender?.[0] || 'All';
  const selectedStyle = selectedFilters.style?.[0] || 'All';
  const selectedMetal = selectedFilters.metal?.[0] || 'All';
  const selectedShape = selectedFilters.shape?.[0] || 'All';
  const selectedDiamond = selectedFilters.diamond?.[0] || selectedFilters.diamond_origin?.[0] || 'All';

  return (
    <>
      {/* DESKTOP MASTER FILTER PANEL */}
      <FilterPanelContainer>
        <FilterHeaderRow>
          <div className="title-group">
            <Sliders size={16} color="#1F1F1F" />
            <span>FILTERS</span>
          </div>

          <button className="clear-btn" onClick={onClearAll}>
            CLEAR ALL <RotateCcw size={13} />
          </button>
        </FilterHeaderRow>

        <MainFilterGrid>
          {/* GENDER BLOCK */}
          <FilterBlock>
            <div className="block-label">{genderConfig?.customerLabel || 'GENDER'}</div>
            <div className="options-box">
              {(genderConfig?.options || [
                { label: 'All', value: 'All' },
                { label: 'Women', value: 'Women' },
                { label: 'Men', value: 'Men' },
                { label: 'Unisex', value: 'Unisex' },
              ]).map((g) => (
                <div
                  key={g.value}
                  className={`option-row ${selectedGender === g.value ? 'selected' : ''}`}
                  onClick={() => handleSelectOption('gender', g.value)}
                >
                  <span>{g.label}</span>
                  {selectedGender === g.value && <Check size={14} color="#C9A45C" />}
                </div>
              ))}
            </div>
          </FilterBlock>

          {/* STYLE BLOCK */}
          <FilterBlock>
            <div className="block-label">{styleConfig?.customerLabel || 'STYLE'}</div>
            <div className="options-box">
              {(() => {
                const currentCat = (categorySlug || 'rings').toLowerCase();
                const defaultStyles = CATEGORY_STYLE_DEFAULTS[currentCat] || CATEGORY_STYLE_DEFAULTS.rings;
                const styleList = defaultStyles;

                return [{ label: 'All', value: 'All' }, ...styleList].map((st) => (
                  <div
                    key={st.value}
                    className={`option-row ${selectedStyle === st.value ? 'selected' : ''}`}
                    onClick={() => handleSelectOption('style', st.value)}
                  >
                    <span>{st.label}</span>
                    {selectedStyle === st.value && <Check size={14} color="#C9A45C" />}
                  </div>
                ));
              })()}
            </div>
          </FilterBlock>

          {/* METAL BLOCK */}
          <FilterBlock>
            <div className="block-label">{metalConfig?.customerLabel || 'METAL'}</div>
            <div className="options-box">
              {(metalConfig?.options || [
                { label: 'All Metals', value: 'All' },
                { label: '14K Yellow Gold', value: '14k-yellow-gold', colorHex: '#E8C872' },
                { label: '14K White Gold', value: '14k-white-gold', colorHex: '#CBD5E1' },
                { label: '14K Rose Gold', value: '14k-rose-gold', colorHex: '#E4A8A5' },
                { label: '18K Yellow Gold', value: '18k-yellow-gold', colorHex: '#E8C872' },
                { label: '18K White Gold', value: '18k-white-gold', colorHex: '#CBD5E1' },
                { label: '18K Rose Gold', value: '18k-rose-gold', colorHex: '#E4A8A5' },
              ]).map((m) => (
                <div
                  key={m.value}
                  className={`option-row ${selectedMetal === m.value ? 'selected' : ''}`}
                  onClick={() => handleSelectOption('metal', m.value)}
                >
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {m.colorHex && (
                      <span className="metal-dot" style={{ backgroundColor: m.colorHex }} />
                    )}
                    {m.label}
                  </span>
                  {selectedMetal === m.value && <Check size={14} color="#C9A45C" />}
                </div>
              ))}
            </div>
          </FilterBlock>

          {/* STONE SHAPE VISUAL SELECTOR */}
          <FilterBlock style={{ gridColumn: 'span 2' }}>
            <div className="block-label">STONE SHAPE</div>
            <ShapeSelector
              selectedShape={selectedShape}
              onSelectShape={(s) => handleSelectOption('shape', s)}
            />
          </FilterBlock>

          {/* DIAMOND ORIGIN & PRICE BLOCK */}
          <FilterBlock>
            <div className="block-label">{diamondConfig?.customerLabel || 'DIAMOND'}</div>
            <div className="options-box">
              {(diamondConfig?.options || [
                { label: 'All', value: 'All' },
                { label: 'Natural', value: 'Natural' },
                { label: 'Lab-Grown', value: 'Lab-Grown' },
              ]).map((d) => (
                <div
                  key={d.value}
                  className={`option-row ${selectedDiamond === d.value || selectedFilters.diamond?.[0] === d.value ? 'selected' : ''}`}
                  onClick={() => {
                    handleSelectOption('diamond', d.value);
                    handleSelectOption('diamond_origin', d.value);
                  }}
                >
                  <span>{d.label}</span>
                  {(selectedDiamond === d.value || selectedFilters.diamond?.[0] === d.value) && <Check size={14} color="#C9A45C" />}
                </div>
              ))}
            </div>

            <PriceBlock style={{ marginTop: 12 }}>
              <div className="preset-pills">
                <button
                  type="button"
                  className={`price-pill ${activePricePill === 'p1' ? 'active' : ''}`}
                  onClick={() => handlePricePillClick('p1', 500, 2000)}
                >
                  $500 - $2k
                </button>
                <button
                  type="button"
                  className={`price-pill ${activePricePill === 'p2' ? 'active' : ''}`}
                  onClick={() => handlePricePillClick('p2', 2000, 5000)}
                >
                  $2k - $5k
                </button>
                <button
                  type="button"
                  className={`price-pill ${activePricePill === 'p3' ? 'active' : ''}`}
                  onClick={() => handlePricePillClick('p3', 5000, 10000)}
                >
                  $5k - $10k
                </button>
                <button
                  type="button"
                  className={`price-pill ${activePricePill === 'p4' ? 'active' : ''}`}
                  onClick={() => handlePricePillClick('p4', 10000, 50000)}
                >
                  $10k+
                </button>
              </div>
            </PriceBlock>
          </FilterBlock>
        </MainFilterGrid>

        {/* BOTTOM LUXURY DROPDOWN ROW */}
        <BottomDropdownRow>
          {isRingCategory && (
            <LuxuryDropdown
              label={ringSizeConfig?.customerLabel || 'Ring Size'}
              options={(ringSizeConfig?.options || []).map((o) => ({ label: o.label, value: o.value }))}
              value={selectedFilters.ringSize?.[0] || 'All'}
              onChange={(val) => handleSelectOption('ringSize', val)}
            />
          )}

          <LuxuryDropdown
            label={caratConfig?.customerLabel || 'Carat Weight'}
            options={(caratConfig?.options || []).map((o) => ({ label: o.label, value: o.value }))}
            value={selectedFilters.carat?.[0] || 'Any'}
            onChange={(val) => handleSelectOption('carat', val)}
          />

          <LuxuryDropdown
            label={clarityConfig?.customerLabel || 'Clarity'}
            options={(clarityConfig?.options || []).map((o) => ({ label: o.label, value: o.value }))}
            value={selectedFilters.clarity?.[0] || 'Any'}
            onChange={(val) => handleSelectOption('clarity', val)}
          />

          <LuxuryDropdown
            label={colorConfig?.customerLabel || 'Color'}
            options={(() => {
              const apiOpts = colorConfig?.options || [];
              if (apiOpts.length === 0) {
                return [
                  { label: 'Any Color', value: 'Any' },
                  { label: 'STANDARD COLORS', value: 'HEADER_STD', isHeader: true },
                  { label: 'D Grade', value: 'D' },
                  { label: 'E Grade', value: 'E' },
                  { label: 'F Grade', value: 'F' },
                  { label: 'G Grade', value: 'G' },
                  { label: 'H Grade', value: 'H' },
                  { label: 'I Grade', value: 'I' },
                  { label: 'J Grade', value: 'J' },
                  { label: 'K Grade', value: 'K' },
                  { label: 'L Grade', value: 'L' },
                  { label: 'M Grade', value: 'M' },
                  { label: 'FANCY COLORS', value: 'HEADER_FANCY', isHeader: true },
                  { label: 'Fancy Yellow', value: 'fancy-yellow', colorHex: '#FACC15' },
                  { label: 'Fancy Pink', value: 'fancy-pink', colorHex: '#F472B6' },
                  { label: 'Fancy Blue', value: 'fancy-blue', colorHex: '#60A5FA' },
                  { label: 'Fancy Green', value: 'fancy-green', colorHex: '#4ADE80' },
                  { label: 'Fancy Orange', value: 'fancy-orange', colorHex: '#FB923C' },
                  { label: 'Fancy Red', value: 'fancy-red', colorHex: '#EF4444' },
                  { label: 'Fancy Purple', value: 'fancy-purple', colorHex: '#A855F7' },
                  { label: 'Fancy Brown', value: 'fancy-brown', colorHex: '#78350F' },
                  { label: 'Fancy Black', value: 'fancy-black', colorHex: '#18181B' },
                  { label: 'Other Fancy Color', value: 'fancy-other', colorHex: '#E2E8F0' },
                ];
              }
              const stdList = apiOpts.filter((o) => !o.label.toLowerCase().includes('fancy') && o.value !== 'Any Color');
              const fancyList = apiOpts.filter((o) => o.label.toLowerCase().includes('fancy'));
              const result: LuxuryOption[] = [{ label: 'Any Color', value: 'Any' }];
              if (stdList.length > 0) {
                result.push({ label: 'STANDARD COLORS', value: 'HEADER_STD', isHeader: true });
                stdList.forEach((o) => result.push({ label: o.label, value: o.value, colorHex: o.colorHex }));
              }
              if (fancyList.length > 0) {
                result.push({ label: 'FANCY COLORS', value: 'HEADER_FANCY', isHeader: true });
                fancyList.forEach((o) => result.push({ label: o.label, value: o.value, colorHex: o.colorHex }));
              }
              return result;
            })()}
            value={selectedFilters.color?.[0] || 'Any'}
            onChange={(val) => handleSelectOption('color', val)}
          />

          <LuxuryDropdown
            label={cutConfig?.customerLabel || 'Cut'}
            options={(cutConfig?.options || []).map((o) => ({ label: o.label, value: o.value }))}
            value={selectedFilters.cut?.[0] || 'Any'}
            onChange={(val) => handleSelectOption('cut', val)}
          />

          <LuxuryDropdown
            label={certConfig?.customerLabel || 'Certification'}
            options={(certConfig?.options || []).map((o) => ({ label: o.label, value: o.value }))}
            value={selectedFilters.certification?.[0] || 'Any'}
            onChange={(val) => handleSelectOption('certification', val)}
          />
        </BottomDropdownRow>
      </FilterPanelContainer>

      {/* RESULTS COUNT & SORT ROW */}
      <ResultsHeaderRow>
        <div className="count">
          <span className="num-highlight">{totalResults}</span>
          <span>{totalResults === 1 ? 'Result Found' : 'Results Found'}</span>
        </div>

        <div className="sort-area">
          <span className="sort-label">SORT BY</span>
          <LuxuryDropdown
            options={luxurySortOptions}
            value={sortValue}
            onChange={(val) => onSortChange(val)}
            fullWidth={false}
            style={{ width: 190 }}
          />
        </div>
      </ResultsHeaderRow>

      {/* MOBILE TRIGGER BAR */}
      <MobileBarContainer>
        <button type="button" onClick={() => setIsMobileDrawerOpen(true)}>
          <Sliders size={16} /> FILTERS
        </button>
        <button type="button" onClick={() => setIsMobileDrawerOpen(true)}>
          SORT BY <ChevronDown size={14} />
        </button>
      </MobileBarContainer>

      {/* MOBILE FILTER DRAWER */}
      <MobileDrawerOverlay $open={isMobileDrawerOpen} onClick={() => setIsMobileDrawerOpen(false)} />
      <MobileDrawerContent $open={isMobileDrawerOpen}>
        <div className="drawer-header">
          <h3>FILTERS & SORT</h3>
          <button type="button" onClick={() => setIsMobileDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          <LuxuryDropdown
            label="SORT BY"
            options={luxurySortOptions}
            value={sortValue}
            onChange={(val) => onSortChange(val)}
          />

          <LuxuryDropdown
            label={genderConfig?.customerLabel || 'Gender'}
            options={(genderConfig?.options || []).map((o) => ({ label: o.label, value: o.value }))}
            value={selectedGender}
            onChange={(val) => handleSelectOption('gender', val)}
          />

          <LuxuryDropdown
            label={metalConfig?.customerLabel || 'Metal'}
            options={(metalConfig?.options || []).map((o) => ({ label: o.label, value: o.value }))}
            value={selectedMetal}
            onChange={(val) => handleSelectOption('metal', val)}
          />

          <div>
            <label style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b6b', display: 'block', marginBottom: 6 }}>
              Stone Shape
            </label>
            <ShapeSelector selectedShape={selectedShape} onSelectShape={(s) => handleSelectOption('shape', s)} />
          </div>

          {isRingCategory && (
            <LuxuryDropdown
              label={ringSizeConfig?.customerLabel || 'Ring Size'}
              options={(ringSizeConfig?.options || []).map((o) => ({ label: o.label, value: o.value }))}
              value={selectedFilters.ringSize?.[0] || 'All'}
              onChange={(val) => handleSelectOption('ringSize', val)}
            />
          )}

          <LuxuryDropdown
            label={caratConfig?.customerLabel || 'Carat Weight'}
            options={(caratConfig?.options || []).map((o) => ({ label: o.label, value: o.value }))}
            value={selectedFilters.carat?.[0] || 'Any'}
            onChange={(val) => handleSelectOption('carat', val)}
          />

          <LuxuryDropdown
            label={clarityConfig?.customerLabel || 'Clarity'}
            options={(clarityConfig?.options || []).map((o) => ({ label: o.label, value: o.value }))}
            value={selectedFilters.clarity?.[0] || 'Any'}
            onChange={(val) => handleSelectOption('clarity', val)}
          />

          <LuxuryDropdown
            label={colorConfig?.customerLabel || 'Color'}
            options={(colorConfig?.options || []).map((o) => ({ label: o.label, value: o.value }))}
            value={selectedFilters.color?.[0] || 'Any'}
            onChange={(val) => handleSelectOption('color', val)}
          />
        </div>

        <div className="drawer-actions">
          <button
            type="button"
            className="clear"
            onClick={() => {
              onClearAll();
              setIsMobileDrawerOpen(false);
            }}
          >
            CLEAR ALL
          </button>
          <button type="button" className="apply" onClick={() => setIsMobileDrawerOpen(false)}>
            VIEW RESULTS
          </button>
        </div>
      </MobileDrawerContent>
    </>
  );
};
