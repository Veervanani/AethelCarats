import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { RotateCcw, X, ChevronDown, Check } from 'lucide-react';
import { api } from '../../services/api';
import { Diamond } from '../../types';
import { DiamondCard } from '../../components/ui/DiamondCard';
import { LuxuryDropdown } from '../../components/ui/LuxuryDropdown';
import { RevealContainer } from '../../components/ui/RevealContainer';

import {
  DIAMOND_SHAPES,
  ALL_DIAMOND_COLORS,
  ALL_DIAMOND_CLARITIES,
} from '../../config/diamondShapes';

const CERTIFICATION_LABS = ['IGI', 'GIA', 'GCAL', 'HRD'];

const SORT_OPTIONS = [
  { label: 'PRICE: LOW → HIGH', value: 'price-asc' },
  { label: 'PRICE: HIGH → LOW', value: 'price-desc' },
  { label: 'CARAT: HIGH → LOW', value: 'carat-desc' },
  { label: 'CARAT: LOW → HIGH', value: 'carat-asc' },
];

const PageWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  box-sizing: border-box;
  color: #F5F1E8;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 24px 16px 60px;
  }
`;

const TitleHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 3rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 12px;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.7rem;
      letter-spacing: 0.05em;
    }
  }

  p {
    font-size: 1.05rem;
    color: #D8D2C5;

    @media (max-width: 480px) {
      font-size: 0.88rem;
    }
  }
`;

const TypeTabRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;

  @media (max-width: 576px) {
    gap: 8px;
  }
`;

const TypeTab = styled.button<{ $active: boolean }>`
  padding: 12px 28px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background-color: ${({ $active }) => ($active ? '#C9A96E' : 'transparent')};
  color: ${({ $active }) => ($active ? '#0B0B0B' : '#F5F1E8')};
  border: 1px solid ${({ $active }) => ($active ? '#C9A96E' : 'rgba(140, 116, 75, 0.35)')};
  transition: all 0.2s ease;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 4px;

  @media (max-width: 576px) {
    padding: 10px 16px;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
  }

  &:hover {
    background-color: #DFBA73;
    color: #0B0B0B;
    border-color: #DFBA73;
  }
`;

const ShapesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  gap: 10px;
  margin-bottom: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`;

const ShapeSvgImg = styled.img<{ $selected?: boolean }>`
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: ${({ $selected }) =>
    $selected
      ? 'brightness(0) saturate(100%) invert(69%) sepia(26%) saturate(1048%) hue-rotate(5deg) brightness(92%) contrast(87%)'
      : 'brightness(0) invert(0.85)'};
  transition: filter 0.2s ease, transform 0.2s ease;
`;

const ShapeBtn = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 6px;
  background-color: ${({ $selected }) => ($selected ? '#1E1E1E' : '#151515')};
  border: 1px solid ${({ $selected }) => ($selected ? '#C9A96E' : 'rgba(140, 116, 75, 0.25)')};
  border-radius: 4px;
  box-shadow: ${({ $selected }) => ($selected ? '0 2px 10px rgba(201, 169, 110, 0.25)' : 'none')};
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;

  span {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-top: 6px;
    color: ${({ $selected }) => ($selected ? '#C9A96E' : '#F5F1E8')};
    transition: color 0.2s ease;
  }

  &:hover, &:focus-visible {
    border-color: #C9A96E;
    background-color: #1E1E1E;
    box-shadow: 0 4px 12px rgba(201, 169, 110, 0.2);

    span {
      color: #C9A96E;
    }

    ${ShapeSvgImg} {
      filter: brightness(0) saturate(100%) invert(69%) sepia(26%) saturate(1048%) hue-rotate(5deg) brightness(92%) contrast(87%);
      transform: scale(1.08);
    }
  }
`;

const FiltersPanel = styled.div`
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 10;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 16px;
  }
`;

const MainFiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 24px;
  align-items: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
  }

  .input-row {
    display: flex;
    gap: 8px;
    align-items: center;
    color: #A8A8A8;
  }

  input {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    font-size: 0.85rem;
    border: 1px solid rgba(140, 116, 75, 0.25);
    background-color: #111111;
    color: #F5F1E8;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #C9A96E;
    }

    &::placeholder {
      color: #777777;
    }
  }
`;

const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Chip = styled.button<{ $active: boolean }>`
  padding: 6px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid ${({ $active }) => ($active ? '#C9A96E' : 'rgba(140, 116, 75, 0.25)')};
  background-color: ${({ $active }) => ($active ? '#C9A96E' : '#111111')};
  color: ${({ $active }) => ($active ? '#0B0B0B' : '#F5F1E8')};
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: #C9A96E;
  }
`;

const ActiveFilterSummaryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 12px 16px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 6px;

  .label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #C9A96E;
    margin-right: 4px;
  }
`;

const ActiveFilterTag = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background-color: #1F1F1F;
  border: 1px solid rgba(140, 116, 75, 0.35);
  color: #F5F1E8;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #C9A96E;
    color: #0B0B0B;
  }
`;

const ClearAllTag = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: transparent;
  border: 1px dashed #C9A96E;
  color: #C9A96E;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #C9A96E;
    color: #0B0B0B;
  }
`;

const FilterControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 6px;
  margin-bottom: 32px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #F5F1E8;
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 12px 16px;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const PaginationRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 48px;
  color: #F5F1E8;

  button {
    padding: 8px 16px;
    border: 1px solid rgba(140, 116, 75, 0.25);
    background-color: #151515;
    color: #F5F1E8;
    border-radius: 4px;
    font-size: 0.85rem;
    cursor: pointer;

    &:hover:not(:disabled) {
      border-color: #C9A96E;
      color: #C9A96E;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export const DiamondVaultPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initial values from URL
  const initialTypeParam = searchParams.get('type')?.toUpperCase();
  const initialType: 'ALL' | 'NATURAL' | 'LAB_GROWN' =
    initialTypeParam === 'NATURAL' || initialTypeParam === 'LAB_GROWN' ? initialTypeParam : 'ALL';

  const initialShapes = searchParams.get('shapes') ? searchParams.get('shapes')!.split(',') : [];
  const initialColors = searchParams.get('colors') ? searchParams.get('colors')!.split(',') : [];
  const initialClarities = searchParams.get('clarities') ? searchParams.get('clarities')!.split(',') : [];
  const initialLabs = (searchParams.get('certificate') || searchParams.get('labs') || searchParams.get('lab'))
    ? (searchParams.get('certificate') || searchParams.get('labs') || searchParams.get('lab'))!.split(',')
    : [];

  const initialMinCarat = searchParams.get('minCarat') || '';
  const initialMaxCarat = searchParams.get('maxCarat') || '';
  const initialMinPrice = searchParams.get('minPrice') || '';
  const initialMaxPrice = searchParams.get('maxPrice') || '';
  const initialGrowthType = searchParams.get('growthType') || '';
  const initialSort = searchParams.get('sort') || 'price-asc';

  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  // Filters State
  const [type, setType] = useState<'ALL' | 'NATURAL' | 'LAB_GROWN'>(initialType);
  const [selectedShapes, setSelectedShapes] = useState<string[]>(initialShapes);
  const [selectedColors, setSelectedColors] = useState<string[]>(initialColors);
  const [selectedClarities, setSelectedClarities] = useState<string[]>(initialClarities);
  const [selectedLabs, setSelectedLabs] = useState<string[]>(initialLabs);
  const [minCarat, setMinCarat] = useState(initialMinCarat);
  const [maxCarat, setMaxCarat] = useState(initialMaxCarat);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [growthType, setGrowthType] = useState(initialGrowthType);
  const [sort, setSort] = useState(initialSort);

  // Custom Dropdown state
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsSortOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Classification (WHITE vs FANCY) State
  const initialClassification = (searchParams.get('classification')?.toUpperCase() as 'WHITE' | 'FANCY') || 'WHITE';
  const initialFancyColors = searchParams.get('fancyColor') ? searchParams.get('fancyColor')!.split(',') : [];
  const initialOvertones = searchParams.get('overtone') ? searchParams.get('overtone')!.split(',') : [];
  const initialIntensities = searchParams.get('intensity') ? searchParams.get('intensity')!.split(',') : [];

  const [classification, setClassification] = useState<'WHITE' | 'FANCY'>(initialClassification);
  const [selectedFancyColors, setSelectedFancyColors] = useState<string[]>(initialFancyColors);
  const [selectedOvertones, setSelectedOvertones] = useState<string[]>(initialOvertones);
  const [selectedIntensities, setSelectedIntensities] = useState<string[]>(initialIntensities);

  // Update URL Query Parameters dynamically
  useEffect(() => {
    const params: Record<string, string> = {};
    if (type !== 'ALL') params.type = type;
    if (classification) params.classification = classification;
    if (selectedShapes.length > 0) params.shapes = selectedShapes.join(',');
    if (selectedColors.length > 0) params.colors = selectedColors.join(',');
    if (selectedFancyColors.length > 0) params.fancyColor = selectedFancyColors.join(',');
    if (selectedOvertones.length > 0) params.overtone = selectedOvertones.join(',');
    if (selectedIntensities.length > 0) params.intensity = selectedIntensities.join(',');
    if (selectedClarities.length > 0) params.clarities = selectedClarities.join(',');
    if (selectedLabs.length > 0) params.certificate = selectedLabs.join(',');
    if (minCarat) params.minCarat = minCarat;
    if (maxCarat) params.maxCarat = maxCarat;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (growthType) params.growthType = growthType;
    if (sort && sort !== 'price-asc') params.sort = sort;
    if (page > 1) params.page = page.toString();

    setSearchParams(params, { replace: true });
  }, [
    type,
    classification,
    selectedShapes,
    selectedColors,
    selectedFancyColors,
    selectedOvertones,
    selectedIntensities,
    selectedClarities,
    selectedLabs,
    minCarat,
    maxCarat,
    minPrice,
    maxPrice,
    growthType,
    sort,
    page,
    setSearchParams,
  ]);

  const [filterConfig, setFilterConfig] = useState<any>(null);

  useEffect(() => {
    api.getDiamondFilterConfig().then((cfg) => {
      if (cfg) setFilterConfig(cfg);
    }).catch(console.error);
  }, []);

  const fetchDiamonds = () => {
    const params: any = {
      page,
      limit: 100,
      sort,
      type: type === 'ALL' ? undefined : type,
      classification,
      shapes: selectedShapes.length > 0 ? selectedShapes.join(',') : undefined,
      minCarat: minCarat || undefined,
      maxCarat: maxCarat || undefined,
      colors: selectedColors.length > 0 ? selectedColors.join(',') : undefined,
      fancyColor: selectedFancyColors.length > 0 ? selectedFancyColors.join(',') : undefined,
      overtone: selectedOvertones.length > 0 ? selectedOvertones.join(',') : undefined,
      intensity: selectedIntensities.length > 0 ? selectedIntensities.join(',') : undefined,
      clarities: selectedClarities.length > 0 ? selectedClarities.join(',') : undefined,
      labs: selectedLabs.length > 0 ? selectedLabs.join(',') : undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      growthType: growthType || undefined,
    };

    api.getDiamonds(params).then((data) => {
      setDiamonds(data.diamonds || []);
      setTotalCount(data.pagination?.total || 0);
      setTotalPages(data.pagination?.totalPages || 1);
    }).catch(console.error);
  };

  useEffect(() => {
    fetchDiamonds();
  }, [
    type,
    classification,
    selectedShapes,
    selectedColors,
    selectedFancyColors,
    selectedOvertones,
    selectedIntensities,
    selectedClarities,
    selectedLabs,
    minCarat,
    maxCarat,
    minPrice,
    maxPrice,
    growthType,
    sort,
    page,
  ]);

  const toggleShape = (shape: string) => {
    setSelectedShapes((prev) => (prev.includes(shape) ? prev.filter((s) => s !== shape) : [...prev, shape]));
  };

  const toggleColor = (col: string) => {
    setSelectedColors((prev) => (prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]));
  };

  const toggleClarity = (cla: string) => {
    setSelectedClarities((prev) => (prev.includes(cla) ? prev.filter((c) => c !== cla) : [...prev, cla]));
  };

  const toggleLab = (lab: string) => {
    setSelectedLabs((prev) => (prev.includes(lab) ? prev.filter((l) => l !== lab) : [...prev, lab]));
  };

  const clearAllFilters = () => {
    setSelectedShapes([]);
    setSelectedColors([]);
    setSelectedFancyColors([]);
    setSelectedOvertones([]);
    setSelectedIntensities([]);
    setSelectedClarities([]);
    setSelectedLabs([]);
    setMinCarat('');
    setMaxCarat('');
    setMinPrice('');
    setMaxPrice('');
    setGrowthType('');
    setPage(1);
  };

  const resetFilters = () => {
    setType('ALL');
    clearAllFilters();
    setSort('price-asc');
  };

  const hasActiveFilters =
    type !== 'ALL' ||
    selectedShapes.length > 0 ||
    selectedColors.length > 0 ||
    selectedFancyColors.length > 0 ||
    selectedOvertones.length > 0 ||
    selectedIntensities.length > 0 ||
    selectedClarities.length > 0 ||
    selectedLabs.length > 0 ||
    Boolean(minCarat) ||
    Boolean(maxCarat) ||
    Boolean(minPrice) ||
    Boolean(maxPrice) ||
    Boolean(growthType);

  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label || 'PRICE: LOW → HIGH';

  return (
    <PageWrapper>
      <RevealContainer yOffset={35}>
        <TitleHeader>
          <h1>THE DIAMOND VAULT</h1>
          <p>Select your perfect loose diamond from our certified international inventory.</p>
        </TitleHeader>
      </RevealContainer>

      {/* Top Filter Tabs: ALL DIAMONDS | NATURAL DIAMONDS | LAB-GROWN */}
      <RevealContainer yOffset={25}>
        <TypeTabRow>
          <TypeTab $active={type === 'ALL'} onClick={() => { setType('ALL'); clearAllFilters(); }}>ALL DIAMONDS</TypeTab>
          <TypeTab $active={type === 'NATURAL'} onClick={() => { setType('NATURAL'); clearAllFilters(); }}>NATURAL DIAMONDS</TypeTab>
          <TypeTab $active={type === 'LAB_GROWN'} onClick={() => { setType('LAB_GROWN'); clearAllFilters(); }}>LAB-GROWN</TypeTab>
        </TypeTabRow>
      </RevealContainer>

      {/* Classification Tabs (WHITE vs FANCY) */}
      <RevealContainer yOffset={20}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 24, borderBottom: '1px solid rgba(140, 116, 75, 0.25)', paddingBottom: 12 }}>
          <button
            onClick={() => {
              setClassification('WHITE');
              clearAllFilters();
            }}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.2rem',
              fontWeight: classification === 'WHITE' ? 700 : 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: classification === 'WHITE' ? '#C9A96E' : '#A8A8A8',
              borderBottom: classification === 'WHITE' ? '2px solid #C9A96E' : '2px solid transparent',
              paddingBottom: 6,
              cursor: 'pointer',
            }}
          >
            WHITE DIAMONDS
          </button>
          <button
            onClick={() => {
              setClassification('FANCY');
              clearAllFilters();
            }}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.2rem',
              fontWeight: classification === 'FANCY' ? 700 : 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: classification === 'FANCY' ? '#C9A96E' : '#A8A8A8',
              borderBottom: classification === 'FANCY' ? '2px solid #C9A96E' : '2px solid transparent',
              paddingBottom: 6,
              cursor: 'pointer',
            }}
          >
            FANCY COLOR DIAMONDS
          </button>
        </div>
      </RevealContainer>

      {/* Shapes Selector Grid */}
      <RevealContainer yOffset={25}>
        <ShapesGrid>
          {DIAMOND_SHAPES.map((shapeObj: any, idx: number) => {
            const shapeVal = shapeObj.value || shapeObj.name;
            const shapeName = shapeObj.name || shapeVal;
            const capitalizedShape = shapeVal ? (shapeVal.charAt(0).toUpperCase() + shapeVal.slice(1).toLowerCase()) : '';
            const shapeImg = shapeObj.image || `/assets/diamonds/${capitalizedShape}.svg`;
            const isSelected = selectedShapes.includes(shapeVal.toUpperCase()) || selectedShapes.includes(shapeVal);
            return (
              <ShapeBtn
                key={shapeVal}
                $selected={isSelected}
                onClick={() => { toggleShape(shapeVal.toUpperCase()); setPage(1); }}
                data-testid={`shape-btn-${shapeVal.toLowerCase()}`}
              >
                <ShapeSvgImg
                  src={shapeImg}
                  alt={shapeName}
                  $selected={isSelected}
                  onError={(e: any) => {
                    e.target.style.display = 'block';
                  }}
                />
                <span>{shapeName.toUpperCase()}</span>
              </ShapeBtn>
            );
          })}
        </ShapesGrid>
      </RevealContainer>

      {/* Main Filter Inputs */}
      <RevealContainer yOffset={25} style={{ position: 'relative', zIndex: 100 }}>
        <FiltersPanel>
        <MainFiltersGrid>
          {/* COLUMN 1, ROW 1: CARAT WEIGHT */}
          <FilterGroup>
            <label>Carat Weight</label>
            <div className="input-row">
              <input type="number" step="0.01" min="0" placeholder="Min" value={minCarat} onChange={(e) => { setMinCarat(e.target.value); setPage(1); }} />
              <span>-</span>
              <input type="number" step="0.01" min="0" placeholder="Max" value={maxCarat} onChange={(e) => { setMaxCarat(e.target.value); setPage(1); }} />
            </div>
          </FilterGroup>

          {/* WHITE CLASSIFICATION FILTERS */}
          {classification === 'WHITE' && (
            <>
              {/* COLUMN 2, ROW 1: COLOR GRADE */}
              <FilterGroup>
                <LuxuryDropdown
                  label="Color Grade"
                  options={[
                    { label: 'All White Colors', value: '' },
                    ...(filterConfig?.colors || ALL_DIAMOND_COLORS).map((c: string) => ({ label: `Color ${c}`, value: c }))
                  ]}
                  value={selectedColors[0] || ''}
                  onChange={(val) => {
                    setSelectedColors(val ? [val] : []);
                    setPage(1);
                  }}
                  fullWidth
                />
              </FilterGroup>

              {/* COLUMN 3, ROW 1: GROWTH METHOD */}
              {type !== 'NATURAL' ? (
                <FilterGroup>
                  <LuxuryDropdown
                    label="Growth Method"
                    options={[
                      { label: 'All Growth Methods', value: '' },
                      { label: 'HPHT (High Pressure High Temp)', value: 'HPHT' },
                      { label: 'CVD (Chemical Vapor Deposition)', value: 'CVD' }
                    ]}
                    value={growthType}
                    onChange={(val) => {
                      setGrowthType(val);
                      setPage(1);
                    }}
                    fullWidth
                  />
                </FilterGroup>
              ) : (
                <FilterGroup>
                  <LuxuryDropdown
                    label="Lab Certification"
                    options={[
                      { label: 'All Certifications', value: '' },
                      ...(filterConfig?.certifications || CERTIFICATION_LABS).map((lab: string) => ({ label: lab, value: lab }))
                    ]}
                    value={selectedLabs[0] || ''}
                    onChange={(val) => {
                      setSelectedLabs(val ? [val] : []);
                      setPage(1);
                    }}
                    fullWidth
                  />
                </FilterGroup>
              )}

              {/* COLUMN 1, ROW 2: PRICE RANGE */}
              <FilterGroup>
                <label>Price Range ($)</label>
                <div className="input-row">
                  <input type="number" step="10" min="0" placeholder="Min $" value={minPrice} onChange={(e) => { setMinPrice(e.target.value); setPage(1); }} />
                  <span>-</span>
                  <input type="number" step="10" min="0" placeholder="Max $" value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }} />
                </div>
              </FilterGroup>

              {/* COLUMN 2, ROW 2: CLARITY GRADE */}
              <FilterGroup>
                <LuxuryDropdown
                  label="Clarity Grade"
                  options={[
                    { label: 'All Clarities', value: '' },
                    ...(filterConfig?.clarities || ALL_DIAMOND_CLARITIES).map((cla: string) => ({ label: cla, value: cla }))
                  ]}
                  value={selectedClarities[0] || ''}
                  onChange={(val) => {
                    setSelectedClarities(val ? [val] : []);
                    setPage(1);
                  }}
                  fullWidth
                />
              </FilterGroup>

              {/* COLUMN 3, ROW 2: LAB CERTIFICATION */}
              {type !== 'NATURAL' && (
                <FilterGroup>
                  <LuxuryDropdown
                    label="Lab Certification"
                    options={[
                      { label: 'All Certifications', value: '' },
                      ...(filterConfig?.certifications || CERTIFICATION_LABS).map((lab: string) => ({ label: lab, value: lab }))
                    ]}
                    value={selectedLabs[0] || ''}
                    onChange={(val) => {
                      setSelectedLabs(val ? [val] : []);
                      setPage(1);
                    }}
                    fullWidth
                  />
                </FilterGroup>
              )}
            </>
          )}

          {/* FANCY CLASSIFICATION FILTERS */}
          {classification === 'FANCY' && (
            <>
              <FilterGroup>
                <LuxuryDropdown
                  label="Fancy Color"
                  options={[
                    { label: 'All Fancy Colors', value: '' },
                    ...(filterConfig?.fancyColors || [
                      'Yellow', 'Orange', 'Pink', 'Blue', 'Green', 'Brown', 'Red', 'White', 'Violet', 'Purple', 'Gray', 'Olive', 'Black', 'Other'
                    ]).map((fc: any) => {
                      const fcName = typeof fc === 'string' ? fc : (fc.name || fc.value);
                      return { label: fcName, value: fcName };
                    })
                  ]}
                  value={selectedFancyColors[0] || ''}
                  onChange={(val) => {
                    setSelectedFancyColors(val ? [val] : []);
                    setPage(1);
                  }}
                  fullWidth
                />
              </FilterGroup>

              <FilterGroup>
                <LuxuryDropdown
                  label="Overtone"
                  options={[
                    { label: 'All Overtones', value: '' },
                    ...(filterConfig?.overtones || [
                      'Yellow', 'Yellowish', 'Pink', 'Pinkish', 'Blue', 'Bluish', 'Red', 'Reddish',
                      'Green', 'Greenish', 'Purple', 'Purplish', 'Orange', 'Orangy', 'Violet', 'Violetish',
                      'Gray', 'Grayish', 'Black', 'Brown', 'Brownish', 'Champagne', 'Cognac', 'Chameleon', 'White', 'Other'
                    ]).map((o: string) => ({ label: o, value: o }))
                  ]}
                  value={selectedOvertones[0] || ''}
                  onChange={(val) => {
                    setSelectedOvertones(val ? [val] : []);
                    setPage(1);
                  }}
                  fullWidth
                />
              </FilterGroup>

              <FilterGroup>
                <label>Price Range ($)</label>
                <div className="input-row">
                  <input type="number" step="10" min="0" placeholder="Min $" value={minPrice} onChange={(e) => { setMinPrice(e.target.value); setPage(1); }} />
                  <span>-</span>
                  <input type="number" step="10" min="0" placeholder="Max $" value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }} />
                </div>
              </FilterGroup>

              <FilterGroup>
                <LuxuryDropdown
                  label="Intensity"
                  options={[
                    { label: 'All Intensities', value: '' },
                    ...(filterConfig?.intensities || [
                      'Fancy Deep', 'Fancy Dark', 'Fancy Vivid', 'Fancy Intense', 'Fancy', 'Very Light', 'Fancy Light', 'Light', 'Faint'
                    ]).map((i: string) => ({ label: i, value: i }))
                  ]}
                  value={selectedIntensities[0] || ''}
                  onChange={(val) => {
                    setSelectedIntensities(val ? [val] : []);
                    setPage(1);
                  }}
                  fullWidth
                />
              </FilterGroup>

              <FilterGroup>
                <LuxuryDropdown
                  label="Clarity Grade"
                  options={[
                    { label: 'All Clarities', value: '' },
                    ...(filterConfig?.clarities || ALL_DIAMOND_CLARITIES).map((cla: string) => ({ label: cla, value: cla }))
                  ]}
                  value={selectedClarities[0] || ''}
                  onChange={(val) => {
                    setSelectedClarities(val ? [val] : []);
                    setPage(1);
                  }}
                  fullWidth
                />
              </FilterGroup>

              <FilterGroup>
                <LuxuryDropdown
                  label="Lab Certification"
                  options={[
                    { label: 'All Certifications', value: '' },
                    ...(filterConfig?.certifications || CERTIFICATION_LABS).map((lab: string) => ({ label: lab, value: lab }))
                  ]}
                  value={selectedLabs[0] || ''}
                  onChange={(val) => {
                    setSelectedLabs(val ? [val] : []);
                    setPage(1);
                  }}
                  fullWidth
                />
              </FilterGroup>

              {type !== 'NATURAL' && (
                <FilterGroup>
                  <LuxuryDropdown
                    label="Growth Method"
                    options={[
                      { label: 'All Growth Methods', value: '' },
                      { label: 'HPHT (High Pressure High Temp)', value: 'HPHT' },
                      { label: 'CVD (Chemical Vapor Deposition)', value: 'CVD' }
                    ]}
                    value={growthType}
                    onChange={(val) => {
                      setGrowthType(val);
                      setPage(1);
                    }}
                    fullWidth
                  />
                </FilterGroup>
              )}
            </>
          )}
        </MainFiltersGrid>
      </FiltersPanel>
    </RevealContainer>

      {/* Active Filters Summary Bar */}
      {hasActiveFilters && (
        <ActiveFilterSummaryRow>
          <span className="label">FILTERS:</span>
          {type !== 'ALL' && (
            <ActiveFilterTag onClick={() => { setType('ALL'); setPage(1); }}>
              {type === 'NATURAL' ? 'Natural Diamonds' : 'Lab-Grown'} <X size={12} />
            </ActiveFilterTag>
          )}
          {selectedShapes.map((s) => (
            <ActiveFilterTag key={s} onClick={() => { toggleShape(s); setPage(1); }}>
              {s} <X size={12} />
            </ActiveFilterTag>
          ))}
          {selectedLabs.map((l) => (
            <ActiveFilterTag key={l} onClick={() => { toggleLab(l); setPage(1); }}>
              {l} <X size={12} />
            </ActiveFilterTag>
          ))}
          {selectedColors.map((c) => (
            <ActiveFilterTag key={c} onClick={() => { toggleColor(c); setPage(1); }}>
              Color {c} <X size={12} />
            </ActiveFilterTag>
          ))}
          {selectedFancyColors.map((fc) => (
            <ActiveFilterTag key={fc} onClick={() => { setSelectedFancyColors((prev) => prev.filter((item) => item !== fc)); setPage(1); }}>
              Fancy: {fc} <X size={12} />
            </ActiveFilterTag>
          ))}
          {selectedOvertones.map((ov) => (
            <ActiveFilterTag key={ov} onClick={() => { setSelectedOvertones((prev) => prev.filter((item) => item !== ov)); setPage(1); }}>
              Overtone: {ov} <X size={12} />
            </ActiveFilterTag>
          ))}
          {selectedIntensities.map((fi) => (
            <ActiveFilterTag key={fi} onClick={() => { setSelectedIntensities((prev) => prev.filter((item) => item !== fi)); setPage(1); }}>
              Intensity: {fi} <X size={12} />
            </ActiveFilterTag>
          ))}
          {selectedClarities.map((c) => (
            <ActiveFilterTag key={c} onClick={() => { toggleClarity(c); setPage(1); }}>
              {c} <X size={12} />
            </ActiveFilterTag>
          ))}
          {(minCarat || maxCarat) && (
            <ActiveFilterTag onClick={() => { setMinCarat(''); setMaxCarat(''); setPage(1); }}>
              {minCarat || '0'} - {maxCarat || '∞'} ct <X size={12} />
            </ActiveFilterTag>
          )}
          {growthType && (
            <ActiveFilterTag onClick={() => { setGrowthType(''); setPage(1); }}>
              Growth: {growthType} <X size={12} />
            </ActiveFilterTag>
          )}
          {(minPrice || maxPrice) && (
            <ActiveFilterTag onClick={() => { setMinPrice(''); setMaxPrice(''); setPage(1); }}>
              ${minPrice || '0'} - ${maxPrice || '∞'} <X size={12} />
            </ActiveFilterTag>
          )}
          <ClearAllTag onClick={resetFilters}>
            <RotateCcw size={12} /> CLEAR ALL
          </ClearAllTag>
        </ActiveFilterSummaryRow>
      )}

      {/* Control Bar showing count & custom sort dropdown */}
      <FilterControlBar>
        <div>
          <span data-testid="diamond-count">{totalCount.toLocaleString()} {totalCount === 1 ? 'DIAMOND FOUND' : 'DIAMONDS FOUND'}</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button onClick={resetFilters} style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', background: 'none', border: 'none', color: '#D8D2C5' }}>
            <RotateCcw size={14} /> RESET FILTERS
          </button>

          <LuxuryDropdown
            options={SORT_OPTIONS}
            value={sort}
            onChange={(val) => {
              setSort(val);
              setPage(1);
            }}
            fullWidth={false}
            style={{ width: 220 }}
          />
        </div>
      </FilterControlBar>

      {/* Results Diamond Cards Grid */}
      <ResultsGrid>
        {diamonds.map((diamond, idx) => (
          <RevealContainer key={diamond.id} staggerIndex={idx} yOffset={25}>
            <DiamondCard diamond={diamond} />
          </RevealContainer>
        ))}
      </ResultsGrid>

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationRow>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>PREVIOUS</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>NEXT</button>
        </PaginationRow>
      )}
    </PageWrapper>
  );
};
