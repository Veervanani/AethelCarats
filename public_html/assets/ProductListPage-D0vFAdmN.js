import{r,j as e,c as pe,n as ye,G as Ee,aa as He,X as Ie,e as ze,aP as Ge,f as me,aQ as Ue,k as _e,l as Oe,q as $e,s as Me}from"./react-vendor-BsBv4awM.js";import{g as c,E as Ve}from"./ui-vendor-C0FaE403.js";import{N as Ke}from"./swiper-vendor-X0C8N8nm.js";import{a as fe,R as he,S as Ye}from"./admin-pages-Dyn6Mexs.js";import{P as We}from"./ProductCard-Bwf5YpaG.js";import{L as A}from"./LuxuryDropdown-C7uKpys6.js";import{n as ge,D as ve}from"./diamondShapes-Cr3dfuxZ.js";import"./admin-tools-vendor-CKN5doRT.js";const qe=c.div`
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Je=c.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,Qe=c.button`
  position: relative;
  background-color: ${({$selected:t})=>t?"#242018":"#0B0B0B"};
  border: 1px solid ${({$selected:t})=>t?"#C9A96E":"rgba(140, 116, 75, 0.25)"};
  border-radius: 4px;
  padding: 10px 6px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({$selected:t})=>t?"0 2px 10px rgba(201, 169, 110, 0.25)":"none"};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;

  &:hover, &:focus-visible {
    border-color: #C9A96E;
    background-color: #242018;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(201, 169, 110, 0.25);
  }

  .svg-wrapper {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: ${({$selected:t})=>t?"brightness(0) saturate(100%) invert(75%) sepia(35%) saturate(800%) hue-rotate(5deg) brightness(95%) contrast(90%)":"brightness(0) invert(1) opacity(0.85)"};
      transition: filter 0.2s ease, transform 0.2s ease;
    }
  }

  span.shape-name {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${({$selected:t})=>t?"#C9A96E":"#F5F1E8"};
    transition: color 0.2s ease;
  }

  .check-icon {
    position: absolute;
    top: 4px;
    right: 4px;
    opacity: ${({$selected:t})=>t?1:0};
    transition: opacity 0.2s ease;
  }
`,Xe=c.button`
  background: none;
  border: none;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #A8A8A8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 0 0;
  transition: color 0.2s ease;

  &:hover {
    color: #C9A96E;
  }

  svg {
    transition: transform 0.25s ease;
    transform: ${({$expanded:t})=>t?"rotate(180deg)":"rotate(0deg)"};
  }
`,je=({selectedShape:t,onSelectShape:n,className:U,style:J})=>{const[p,_]=r.useState(!1),oe=ge(t),ae=ve.slice(0,9),F=ve.slice(9),j=p?ve:ae;return e.jsxs(qe,{className:U,style:J,children:[e.jsx(Je,{children:j.map(g=>{const O=oe===g.value;return e.jsxs(Qe,{type:"button",$selected:O,onClick:()=>n(O?"All":g.value),"data-testid":`shape-card-${g.value.toLowerCase()}`,children:[e.jsx("div",{className:"check-icon",children:e.jsx(pe,{size:10,color:"#C9A96E"})}),e.jsx("div",{className:"svg-wrapper",children:e.jsx("img",{src:g.image,alt:g.name,onError:Q=>{const k=`/assets/diamonds/${g.value}.svg`;Q.target.src!==k&&(Q.target.src=k)}})}),e.jsx("span",{className:"shape-name",children:g.name})]},g.value)})}),F.length>0&&e.jsxs(Xe,{type:"button",$expanded:p,onClick:()=>_(!p),children:[e.jsx("span",{children:p?"Show Fewer Shapes":"More Shapes"}),e.jsx(ye,{size:12})]})]})},Ze=[{label:"Best Selling",value:"bestsellers"},{label:"Newest Arrivals",value:"newest"},{label:"Price: Low → High",value:"price-low"},{label:"Price: High → Low",value:"price-high"},{label:"Name: A → Z",value:"name"}],ke=[{label:"All Metals",value:"All"},{label:"9K Yellow Gold",value:"9k-yellow-gold",colorHex:"#E8C872"},{label:"9K White Gold",value:"9k-white-gold",colorHex:"#CBD5E1"},{label:"9K Rose Gold",value:"9k-rose-gold",colorHex:"#E4A8A5"},{label:"10K Yellow Gold",value:"10k-yellow-gold",colorHex:"#E8C872"},{label:"10K White Gold",value:"10k-white-gold",colorHex:"#CBD5E1"},{label:"10K Rose Gold",value:"10k-rose-gold",colorHex:"#E4A8A5"},{label:"14K Yellow Gold",value:"14k-yellow-gold",colorHex:"#E8C872"},{label:"14K White Gold",value:"14k-white-gold",colorHex:"#CBD5E1"},{label:"14K Rose Gold",value:"14k-rose-gold",colorHex:"#E4A8A5"},{label:"18K Yellow Gold",value:"18k-yellow-gold",colorHex:"#E8C872"},{label:"18K White Gold",value:"18k-white-gold",colorHex:"#CBD5E1"},{label:"18K Rose Gold",value:"18k-rose-gold",colorHex:"#E4A8A5"},{label:"925 Sterling Silver",value:"silver",colorHex:"#D1D5DB"},{label:"Platinum",value:"platinum",colorHex:"#E2E8F0"}],Le=[{label:"All Sizes",value:"All"},{label:"US 4",value:"US 4"},{label:"US 4.5",value:"US 4.5"},{label:"US 5",value:"US 5"},{label:"US 5.5",value:"US 5.5"},{label:"US 6",value:"US 6"},{label:"US 6.5",value:"US 6.5"},{label:"US 7",value:"US 7"},{label:"US 7.5",value:"US 7.5"},{label:"US 8",value:"US 8"},{label:"US 8.5",value:"US 8.5"},{label:"US 9",value:"US 9"},{label:"US 9.5",value:"US 9.5"},{label:"US 10",value:"US 10"},{label:"US 10.5",value:"US 10.5"},{label:"US 11",value:"US 11"},{label:"US 11.5",value:"US 11.5"},{label:"US 12",value:"US 12"}],De=[{label:"Any Carat",value:"All"},{label:"0.50 ct+",value:"0.5"},{label:"0.75 ct+",value:"0.75"},{label:"1.00 ct+",value:"1.0"},{label:"1.50 ct+",value:"1.5"},{label:"2.00 ct+",value:"2.0"},{label:"3.00 ct+",value:"3.0"},{label:"4.00 ct+",value:"4.0"},{label:"5.00 ct+",value:"5.0"}],Ne=[{label:"Any Clarity",value:"Any"},{label:"FL (Flawless)",value:"FL"},{label:"IF (Internally Flawless)",value:"IF"},{label:"VVS1 (Very Very Slightly Included 1)",value:"VVS1"},{label:"VVS2 (Very Very Slightly Included 2)",value:"VVS2"},{label:"VS1 (Very Slightly Included 1)",value:"VS1"},{label:"VS2 (Very Slightly Included 2)",value:"VS2"},{label:"SI1 (Slightly Included 1)",value:"SI1"},{label:"SI2 (Slightly Included 2)",value:"SI2"},{label:"I1 (Included 1)",value:"I1"}],Pe=[{label:"Any Cut",value:"Any"},{label:"Excellent",value:"Excellent"},{label:"Very Good",value:"Very Good"},{label:"Good",value:"Good"},{label:"Fair",value:"Fair"},{label:"Ideal",value:"Ideal"}],Be=[{label:"Any Certification",value:"Any"},{label:"IGI Certified",value:"IGI"},{label:"GIA Authenticated",value:"GIA"},{label:"GCAL Guaranteed",value:"GCAL"},{label:"HRD Certified",value:"HRD"},{label:"None",value:"None"}],Re={rings:[{label:"Solitaire",value:"Solitaire"},{label:"Halo",value:"Halo"},{label:"Three-Stone",value:"Three-Stone"},{label:"Eternity",value:"Eternity"},{label:"Vintage & Antique",value:"Vintage & Antique"},{label:"Bezel Settings",value:"Bezel Settings"},{label:"Cocktail",value:"Cocktail"},{label:"Pavé",value:"Pavé"},{label:"Hidden Halo",value:"Hidden Halo"},{label:"Toi et Moi",value:"Toi et Moi"}],earrings:[{label:"Solitaire Studs",value:"Solitaire Studs"},{label:"Pear Drops",value:"Pear Drops"},{label:"Halo Studs",value:"Halo Studs"},{label:"Hoops",value:"Hoops"},{label:"Huggies",value:"Huggies"},{label:"Dangle & Drop",value:"Dangle & Drop"},{label:"Cluster",value:"Cluster"},{label:"Chandeliers",value:"Chandeliers"}],necklaces:[{label:"Graduated Tennis",value:"Graduated Tennis"},{label:"Marquise & Pear Cluster",value:"Marquise & Pear Cluster"},{label:"Pendant Chain",value:"Pendant Chain"},{label:"Choker",value:"Choker"},{label:"Statement",value:"Statement"},{label:"Riviere",value:"Riviere"},{label:"Layering Chains",value:"Layering Chains"},{label:"Solitaire Necklace",value:"Solitaire Necklace"}],bracelets:[{label:"Emerald Cut Tennis",value:"Emerald Cut Tennis"},{label:"Round Brilliant Tennis",value:"Round Brilliant Tennis"},{label:"Bangles",value:"Bangles"},{label:"Stacking Bangles",value:"Stacking Bangles"},{label:"Chain Bracelets",value:"Chain Bracelets"},{label:"Cuff",value:"Cuff"},{label:"Line Bracelet",value:"Line Bracelet"}],pendants:[{label:"Solitaire Pendants",value:"Solitaire Pendants"},{label:"Halo Pendants",value:"Halo Pendants"},{label:"Pear Cut Pendants",value:"Pear Cut Pendants"},{label:"Gemstone Pendants",value:"Gemstone Pendants"},{label:"Cross Pendants",value:"Cross Pendants"},{label:"Heart Pendants",value:"Heart Pendants"},{label:"Initial & Letter",value:"Initial & Letter"},{label:"Medallion",value:"Medallion"}],diamonds:[{label:"Natural Certified",value:"Natural Certified"},{label:"Lab-Grown",value:"Lab-Grown"},{label:"GIA Authenticated",value:"GIA Authenticated"},{label:"IGI Authenticated",value:"IGI Authenticated"},{label:"Fancy Color",value:"Fancy Color"},{label:"Loose Diamond Vault",value:"Loose Diamond Vault"}],collections:[{label:"Signature Collection",value:"Signature Collection"},{label:"High Jewellery",value:"High Jewellery"},{label:"Bridal Suite",value:"Bridal Suite"},{label:"Diamond Essentials",value:"Diamond Essentials"},{label:"Golden Hour",value:"Golden Hour"}]},el=c.div`
  background-color: #111111;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 24px 28px;
  margin-bottom: 24px;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(31, 31, 31, 0.03);
  position: relative;
  z-index: 100;
  overflow: visible;

  @media (max-width: 992px) {
    display: none;
  }
`,ll=c.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);

  .title-group {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #F5F1E8;
    }
  }

  .clear-btn {
    background: none;
    border: none;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #C9A96E;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s ease;

    &:hover {
      color: #C9A96E;
    }
  }
`,al=c.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`,ue=c.div`
  .block-label {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #C9A96E;
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
    color: #D8D2C5;
    transition: all 0.15s ease;

    &:hover {
      background-color: #242018;
      color: #C9A96E;
    }

    &.selected {
      background-color: #2A241A;
      color: #C9A96E;
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
`,tl=c.div`
  .preset-pills {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;

    .price-pill {
      padding: 6px 8px;
      font-size: 0.72rem;
      background: #151515;
      border: 1px solid rgba(140, 116, 75, 0.25);
      border-radius: 3px;
      cursor: pointer;
      color: #D8D2C5;
      text-align: center;
      transition: all 0.15s ease;

      &:hover,
      &.active {
        background: #242018;
        color: #C9A96E;
        border-color: #C9A96E;
      }
    }
  }
`,nl=c.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(140, 116, 75, 0.25);
  position: relative;
  z-index: 120;
  overflow: visible;

  > div {
    flex: 1;
    min-width: 150px;
    position: relative;
  }
`,il=c.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .count {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    color: #F5F1E8;
    letter-spacing: 0.04em;
    display: flex;
    align-items: baseline;
    gap: 6px;

    .num-highlight {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      font-weight: 700;
      font-size: 1.35rem;
      color: #F5F1E8;
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
      color: #C9A96E;
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
`,sl=c.div`
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
      background: #151515;
      border: 1px solid rgba(140, 116, 75, 0.3);
      border-radius: 4px;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #F5F1E8;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #1E1E1E;
        color: #C9A96E;
        border-color: #C9A96E;
      }
    }
  }
`,ol=c.div`
  position: fixed;
  inset: 0;
  background: rgba(11, 11, 11, 0.8);
  backdrop-filter: blur(6px);
  z-index: 9999;
  display: ${({$open:t})=>t?"block":"none"};
`,rl=c.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 380px;
  background: #151515;
  z-index: 10000;
  transform: ${({$open:t})=>t?"translateX(0)":"translateX(100%)"};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;

  .drawer-header {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(140, 116, 75, 0.25);
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.4rem;
      color: #F5F1E8;
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
    border-top: 1px solid rgba(140, 116, 75, 0.25);
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
      transition: all 0.2s ease;

      &.clear {
        background: #151515;
        border: 1px solid rgba(140, 116, 75, 0.3);
        color: #F5F1E8;

        &:hover {
          background: #1E1E1E;
          border-color: #C9A96E;
          color: #C9A96E;
        }
      }
      &.apply {
        background: #C9A96E;
        border: 1px solid #C9A96E;
        color: #0B0B0B;

        &:hover {
          background: #DFBA73;
          border-color: #DFBA73;
          color: #0B0B0B;
        }
      }
    }
  }
`,cl=({selectedFilters:t,onFilterChange:n,onClearAll:U,sortValue:J,onSortChange:p,totalResults:_=0,minPrice:oe=0,maxPrice:ae=5e4,onPriceChange:F,categorySlug:j="all"})=>{var E,ie,V,re,K,ce,I,se,be,B,Z,ee,de,le,z,Y,R,W;const[g,O]=r.useState([]),[Q,k]=r.useState(!1),[$,L]=r.useState(null),te=!j||j==="rings"||j==="engagement-rings"||j==="wedding-bands"||j==="all";r.useEffect(()=>{(async()=>{try{const v=await fe.getPublicFilters({jewelleryType:j});O(v.filters||[])}catch(v){console.error("Error fetching storefront filters:",v)}})()},[j]);const o=(l,v)=>{const s=(t[l]||[]).includes(v);v==="All"||v==="Any"||s?n(l,[]):n(l,[v])},M=(l,v,a)=>{$===l?(L(null),F&&F(500,5e4)):(L(l),F&&F(v,a))},D=Ze.map(l=>({label:l.label,value:l.value})),y=g.find(l=>l.key==="gender"),N=g.find(l=>l.key==="style"),P=g.find(l=>l.key==="metal"),S=g.find(l=>l.key==="diamond_origin"),m=g.find(l=>l.key==="ring_size"),u=g.find(l=>l.key==="carat"),x=g.find(l=>l.key==="clarity"),b=g.find(l=>l.key==="color"),h=g.find(l=>l.key==="cut"),d=g.find(l=>l.key==="certification"),X=((E=t.gender)==null?void 0:E[0])||"All",C=((ie=t.style)==null?void 0:ie[0])||"All",H=((V=t.metal)==null?void 0:V[0])||"All",w=((re=t.shape)==null?void 0:re[0])||"All",ne=((K=t.diamond)==null?void 0:K[0])||((ce=t.diamond_origin)==null?void 0:ce[0])||"All";return e.jsxs(e.Fragment,{children:[e.jsxs(el,{children:[e.jsxs(ll,{children:[e.jsxs("div",{className:"title-group",children:[e.jsx(Ee,{size:16,color:"#1F1F1F"}),e.jsx("span",{children:"FILTERS"})]}),e.jsxs("button",{className:"clear-btn",onClick:U,children:["CLEAR ALL ",e.jsx(He,{size:13})]})]}),e.jsxs(al,{children:[e.jsxs(ue,{children:[e.jsx("div",{className:"block-label",children:(y==null?void 0:y.customerLabel)||"GENDER"}),e.jsx("div",{className:"options-box",children:((y==null?void 0:y.options)||[{label:"All",value:"All"},{label:"Women",value:"Women"},{label:"Men",value:"Men"},{label:"Unisex",value:"Unisex"}]).map(l=>e.jsxs("div",{className:`option-row ${X===l.value?"selected":""}`,onClick:()=>o("gender",l.value),children:[e.jsx("span",{children:l.label}),X===l.value&&e.jsx(pe,{size:14,color:"#C9A45C"})]},l.value))})]}),e.jsxs(ue,{children:[e.jsx("div",{className:"block-label",children:(N==null?void 0:N.customerLabel)||"STYLE"}),e.jsx("div",{className:"options-box",children:(()=>{const l=(j||"rings").toLowerCase(),a=Re[l]||Re.rings;return[{label:"All",value:"All"},...a].map(s=>e.jsxs("div",{className:`option-row ${C===s.value?"selected":""}`,onClick:()=>o("style",s.value),children:[e.jsx("span",{children:s.label}),C===s.value&&e.jsx(pe,{size:14,color:"#C9A45C"})]},s.value))})()})]}),e.jsxs(ue,{children:[e.jsx("div",{className:"block-label",children:(P==null?void 0:P.customerLabel)||"METAL"}),e.jsx("div",{className:"options-box",style:{maxHeight:200},children:ke.map(l=>e.jsxs("div",{className:`option-row ${H===l.value||H.toLowerCase()===l.label.toLowerCase()?"selected":""}`,onClick:()=>o("metal",l.value),children:[e.jsxs("span",{style:{display:"flex",alignItems:"center"},children:[l.colorHex&&e.jsx("span",{className:"metal-dot",style:{backgroundColor:l.colorHex}}),l.label]}),(H===l.value||H.toLowerCase()===l.label.toLowerCase())&&e.jsx(pe,{size:14,color:"#C9A45C"})]},l.value))})]}),e.jsxs(ue,{style:{gridColumn:"span 2"},children:[e.jsx("div",{className:"block-label",children:"STONE SHAPE"}),e.jsx(je,{selectedShape:w,onSelectShape:l=>o("shape",l)})]}),e.jsxs(ue,{children:[e.jsx("div",{className:"block-label",children:(S==null?void 0:S.customerLabel)||"DIAMOND"}),e.jsx("div",{className:"options-box",children:((S==null?void 0:S.options)||[{label:"All",value:"All"},{label:"Natural",value:"Natural"},{label:"Lab-Grown",value:"Lab-Grown"}]).map(l=>{var v,a;return e.jsxs("div",{className:`option-row ${ne===l.value||((v=t.diamond)==null?void 0:v[0])===l.value?"selected":""}`,onClick:()=>{o("diamond",l.value),o("diamond_origin",l.value)},children:[e.jsx("span",{children:l.label}),(ne===l.value||((a=t.diamond)==null?void 0:a[0])===l.value)&&e.jsx(pe,{size:14,color:"#C9A45C"})]},l.value)})}),e.jsx(tl,{style:{marginTop:12},children:e.jsxs("div",{className:"preset-pills",children:[e.jsx("button",{type:"button",className:`price-pill ${$==="p1"?"active":""}`,onClick:()=>M("p1",500,2e3),children:"$500 - $2k"}),e.jsx("button",{type:"button",className:`price-pill ${$==="p2"?"active":""}`,onClick:()=>M("p2",2e3,5e3),children:"$2k - $5k"}),e.jsx("button",{type:"button",className:`price-pill ${$==="p3"?"active":""}`,onClick:()=>M("p3",5e3,1e4),children:"$5k - $10k"}),e.jsx("button",{type:"button",className:`price-pill ${$==="p4"?"active":""}`,onClick:()=>M("p4",1e4,5e4),children:"$10k+"})]})})]})]}),e.jsxs(nl,{children:[te&&e.jsx(A,{label:(m==null?void 0:m.customerLabel)||"Ring Size",options:(m!=null&&m.options&&m.options.length>0?m.options:Le).map(l=>({label:l.label,value:l.value})),value:((I=t.ringSize)==null?void 0:I[0])||"All",onChange:l=>o("ringSize",l)}),e.jsx(A,{label:(u==null?void 0:u.customerLabel)||"Carat Weight",options:(u!=null&&u.options&&u.options.length>0?u.options:De).map(l=>({label:l.label,value:l.value})),value:((se=t.carat)==null?void 0:se[0])||"All",placeholder:"Any Carat",onChange:l=>o("carat",l)}),e.jsx(A,{label:(x==null?void 0:x.customerLabel)||"Clarity",options:(x!=null&&x.options&&x.options.length>0?x.options:Ne).map(l=>({label:l.label,value:l.value})),value:((be=t.clarity)==null?void 0:be[0])||"Any",onChange:l=>o("clarity",l)}),e.jsx(A,{label:(b==null?void 0:b.customerLabel)||"Color",options:(()=>{const l=(b==null?void 0:b.options)||[];if(l.length===0)return[{label:"Any Color",value:"Any"},{label:"STANDARD COLORS",value:"HEADER_STD",isHeader:!0},{label:"D (Colorless)",value:"D"},{label:"E (Colorless)",value:"E"},{label:"F (Colorless)",value:"F"},{label:"G (Near Colorless)",value:"G"},{label:"H (Near Colorless)",value:"H"},{label:"I (Near Colorless)",value:"I"},{label:"J (Near Colorless)",value:"J"},{label:"K (Faint Yellow)",value:"K"},{label:"FANCY COLORS",value:"HEADER_FANCY",isHeader:!0},{label:"Fancy Yellow",value:"fancy-yellow",colorHex:"#FACC15"},{label:"Fancy Pink",value:"fancy-pink",colorHex:"#F472B6"},{label:"Fancy Blue",value:"fancy-blue",colorHex:"#60A5FA"},{label:"Fancy Green",value:"fancy-green",colorHex:"#4ADE80"},{label:"Fancy Orange",value:"fancy-orange",colorHex:"#FB923C"},{label:"Fancy Red",value:"fancy-red",colorHex:"#EF4444"},{label:"Fancy Purple",value:"fancy-purple",colorHex:"#A855F7"},{label:"Fancy Brown",value:"fancy-brown",colorHex:"#78350F"},{label:"Fancy Black",value:"fancy-black",colorHex:"#18181B"}];const v=l.filter(i=>!i.label.toLowerCase().includes("fancy")&&i.value!=="Any Color"),a=l.filter(i=>i.label.toLowerCase().includes("fancy")),s=[{label:"Any Color",value:"Any"}];return v.length>0&&(s.push({label:"STANDARD COLORS",value:"HEADER_STD",isHeader:!0}),v.forEach(i=>s.push({label:i.label,value:i.value,colorHex:i.colorHex}))),a.length>0&&(s.push({label:"FANCY COLORS",value:"HEADER_FANCY",isHeader:!0}),a.forEach(i=>s.push({label:i.label,value:i.value,colorHex:i.colorHex}))),s})(),value:((B=t.color)==null?void 0:B[0])||"Any",onChange:l=>o("color",l)}),e.jsx(A,{label:(h==null?void 0:h.customerLabel)||"Cut",options:(h!=null&&h.options&&h.options.length>0?h.options:Pe).map(l=>({label:l.label,value:l.value})),value:((Z=t.cut)==null?void 0:Z[0])||"Any",onChange:l=>o("cut",l)}),e.jsx(A,{label:(d==null?void 0:d.customerLabel)||"Certification",options:(d!=null&&d.options&&d.options.length>0?d.options:Be).map(l=>({label:l.label,value:l.value})),value:((ee=t.certification)==null?void 0:ee[0])||"Any",onChange:l=>o("certification",l)})]})]}),e.jsxs(il,{children:[e.jsxs("div",{className:"count",children:[e.jsx("span",{className:"num-highlight",children:_}),e.jsx("span",{children:_===1?"Result Found":"Results Found"})]}),e.jsxs("div",{className:"sort-area",children:[e.jsx("span",{className:"sort-label",children:"SORT BY"}),e.jsx(A,{options:D,value:J,onChange:l=>p(l),fullWidth:!1,style:{width:190}})]})]}),e.jsxs(sl,{children:[e.jsxs("button",{type:"button",onClick:()=>k(!0),children:[e.jsx(Ee,{size:16})," FILTERS"]}),e.jsxs("button",{type:"button",onClick:()=>k(!0),children:["SORT BY ",e.jsx(ye,{size:14})]})]}),e.jsx(ol,{$open:Q,onClick:()=>k(!1)}),e.jsxs(rl,{$open:Q,children:[e.jsxs("div",{className:"drawer-header",children:[e.jsx("h3",{children:"FILTERS & SORT"}),e.jsx("button",{type:"button",onClick:()=>k(!1),style:{background:"none",border:"none",cursor:"pointer"},children:e.jsx(Ie,{size:20})})]}),e.jsxs("div",{className:"drawer-body",children:[e.jsx(A,{label:"SORT BY",options:D,value:J,onChange:l=>p(l)}),e.jsx(A,{label:(y==null?void 0:y.customerLabel)||"Gender",options:((y==null?void 0:y.options)||[]).map(l=>({label:l.label,value:l.value})),value:X,onChange:l=>o("gender",l)}),e.jsx(A,{label:(P==null?void 0:P.customerLabel)||"Metal",options:ke.map(l=>({label:l.label,value:l.value})),value:H,onChange:l=>o("metal",l)}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#6b6b6b",display:"block",marginBottom:6},children:"Stone Shape"}),e.jsx(je,{selectedShape:w,onSelectShape:l=>o("shape",l)})]}),te&&e.jsx(A,{label:(m==null?void 0:m.customerLabel)||"Ring Size",options:(m!=null&&m.options&&m.options.length>0?m.options:Le).map(l=>({label:l.label,value:l.value})),value:((de=t.ringSize)==null?void 0:de[0])||"All",onChange:l=>o("ringSize",l)}),e.jsx(A,{label:(u==null?void 0:u.customerLabel)||"Carat Weight",options:(u!=null&&u.options&&u.options.length>0?u.options:De).map(l=>({label:l.label,value:l.value})),value:((le=t.carat)==null?void 0:le[0])||"All",placeholder:"Any Carat",onChange:l=>o("carat",l)}),e.jsx(A,{label:(x==null?void 0:x.customerLabel)||"Clarity",options:(x!=null&&x.options&&x.options.length>0?x.options:Ne).map(l=>({label:l.label,value:l.value})),value:((z=t.clarity)==null?void 0:z[0])||"Any",onChange:l=>o("clarity",l)}),e.jsx(A,{label:(b==null?void 0:b.customerLabel)||"Color",options:(b!=null&&b.options&&b.options.length>0?b.options:[{label:"Any Color",value:"Any"},{label:"D (Colorless)",value:"D"},{label:"E (Colorless)",value:"E"},{label:"F (Colorless)",value:"F"},{label:"G (Near Colorless)",value:"G"},{label:"H (Near Colorless)",value:"H"},{label:"I (Near Colorless)",value:"I"},{label:"J (Near Colorless)",value:"J"},{label:"K (Faint Yellow)",value:"K"},{label:"Fancy Yellow",value:"fancy-yellow"},{label:"Fancy Pink",value:"fancy-pink"},{label:"Fancy Blue",value:"fancy-blue"},{label:"Fancy Green",value:"fancy-green"},{label:"Fancy Red",value:"fancy-red"},{label:"Fancy Black",value:"fancy-black"}]).map(l=>({label:l.label,value:l.value})),value:((Y=t.color)==null?void 0:Y[0])||"Any",onChange:l=>o("color",l)}),e.jsx(A,{label:(h==null?void 0:h.customerLabel)||"Cut",options:(h!=null&&h.options&&h.options.length>0?h.options:Pe).map(l=>({label:l.label,value:l.value})),value:((R=t.cut)==null?void 0:R[0])||"Any",onChange:l=>o("cut",l)}),e.jsx(A,{label:(d==null?void 0:d.customerLabel)||"Certification",options:(d!=null&&d.options&&d.options.length>0?d.options:Be).map(l=>({label:l.label,value:l.value})),value:((W=t.certification)==null?void 0:W[0])||"Any",onChange:l=>o("certification",l)})]}),e.jsxs("div",{className:"drawer-actions",children:[e.jsx("button",{type:"button",className:"clear",onClick:()=>{U(),k(!1)},children:"CLEAR ALL"}),e.jsx("button",{type:"button",className:"apply",onClick:()=>k(!1),children:"VIEW RESULTS"})]})]})]})},dl=c.div`
  background-color: #0B0B0B;
  min-height: 100vh;
  width: 100%;
`,ul=c.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 24px 80px;
  box-sizing: border-box;
  overflow-x: hidden;
  background-color: #0B0B0B;

  @media (max-width: 768px) {
    padding: 16px 16px 60px;
  }
`,pl=c.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #A8A8A8;
  margin-bottom: 24px;
  letter-spacing: 0.05em;

  a {
    color: #A8A8A8;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: #C9A96E;
    }
  }

  span.separator {
    color: #C9A96E;
    font-size: 0.7rem;
  }

  span.current {
    color: #F5F1E8;
    font-weight: 600;
  }
`,gl=c.div`
  margin-bottom: 32px;

  h1 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.8rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  @media (max-width: 768px) {
    margin-bottom: 24px;
    h1 {
      font-size: 2.1rem;
    }
  }
`,bl=c.div`
  max-width: 920px;
  line-height: 1.65;
  color: #D8D2C5;
  font-size: 0.95rem;

  p {
    margin-bottom: 8px;
  }
`,ml=c.button`
  background: none;
  border: none;
  color: #C9A96E;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 0;
  margin-top: 4px;

  &:hover {
    text-decoration: underline;
  }
`,xl=c.div`
  margin-bottom: 40px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);
  position: relative;
  width: 100%;

  .swiper {
    padding: 4px 4px 12px;
    overflow: visible;
  }
`,Te=c.button`
  position: absolute;
  top: 36%;
  ${({$direction:t})=>t==="prev"?"left: -18px;":"right: -18px;"}
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  color: #F5F1E8;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
  z-index: 20;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #C9A96E;
    color: #0B0B0B;
    border-color: #C9A96E;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    top: 36%;
    ${({$direction:t})=>t==="prev"?"left: -4px;":"right: -4px;"}
  }
`,Ae=c(me)`
  flex: 0 0 190px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  background-color: transparent;
  padding: 0;
  transition: all 0.25s ease;
  position: relative;

  @media (max-width: 768px) {
    flex: 0 0 150px;
  }
`,hl=c.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 10px;
  background-color: #0B0B0B;
  border: ${({$active:t})=>t?"2px solid #C9A96E":"1px solid rgba(140, 116, 75, 0.25)"};
  box-shadow: ${({$active:t})=>t?"0 6px 20px rgba(201, 169, 110, 0.35)":"0 2px 8px rgba(0, 0, 0, 0.4)"};
  transform: ${({$active:t})=>t?"scale(1.03)":"none"};
  transition: all 0.25s ease;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  ${Ae}:hover & {
    border-color: #C9A96E;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(201, 169, 110, 0.35);

    img {
      transform: scale(1.06);
    }
  }
`,vl=c.span`
  font-size: 0.88rem;
  font-weight: ${({$active:t})=>t?"700":"600"};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({$active:t})=>t?"#C9A96E":"#D8D2C5"};
  text-align: left;
  margin-left: 2px;
  transition: color 0.2s ease;

  ${Ae}:hover & {
    color: #C9A96E;
  }
`,Fe=c.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,fl=Ve`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`,yl=c.div`
  aspect-ratio: 3 / 4;
  background: linear-gradient(90deg, #151515 0%, #1f1f1f 50%, #151515 100%);
  background-size: 400px 100%;
  animation: ${fl} 1.4s infinite;
  border-radius: 4px;
`,Al=c.div`
  text-align: center;
  padding: 64px 20px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  margin: 40px 0;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #A8A8A8;
    margin-bottom: 24px;
  }
`,Sl=c.button`
  padding: 12px 24px;
  background-color: #C9A96E;
  color: #0B0B0B;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: 1px solid #C9A96E;
  border-radius: 2px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
  transition: all 0.25s ease;

  &:hover {
    background-color: #DFBA73;
    border-color: #DFBA73;
    box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
    transform: translateY(-1px);
  }
`,Cl=[{id:"rings",name:"Rings",slug:"rings",description:"Discover AETHELCARATS engagement rings, diamond wedding bands, and bespoke solitaires.",image:"/assets/gem_rings_cat.png"},{id:"earrings",name:"Earrings",slug:"earrings",description:"Discover AETHELCARATS solitaire studs, drop earrings, and diamond huggies.",image:"/assets/gem_earrings_cat.png"},{id:"necklaces",name:"Necklaces",slug:"necklaces",description:"Discover AETHELCARATS diamond rivière necklaces, solitaire pendants, and statement colliers.",image:"/assets/gem_necklaces_cat.png"},{id:"bracelets",name:"Bracelets",slug:"bracelets",description:"Explore AETHELCARATS diamond tennis bracelets, line cuffs, and high-jewellery bangles.",image:"/assets/gem_bracelets_cat.png"},{id:"pendants",name:"Pendants",slug:"pendants",description:"Explore AETHELCARATS solitaire diamond pendants and custom halo medallion drops.",image:"/assets/aura_pendants_cat.png"},{id:"diamonds",name:"Diamonds",slug:"diamonds",description:"Browse GIA & IGI authenticated loose diamonds across Round, Oval, Emerald, and Cushion cuts.",image:"/assets/gem_diamonds_cat.png"},{id:"collections",name:"Collections",slug:"collections",description:"Explore the complete AETHELCARATS portfolio of handcrafted fine jewellery.",image:"/assets/GOLD-MARQUISE-DIAMOND-JEWELRY-SET.webp"}],wl={"womens-wedding":{title:"Women's Wedding Rings",subtitle:"Explore our handcrafted collection of women's wedding rings, diamond bands, and eternity rings in 18K gold and platinum."},"mens-wedding":{title:"Men's Wedding Bands",subtitle:"Discover refined men's wedding bands engineered in 18K solid gold, platinum, and comfort-fit silhouettes."},eternity:{title:"Eternity Rings",subtitle:"Endless brilliance. Explore full and half eternity rings set with conflict-free diamonds."},anniversary:{title:"Anniversary Rings",subtitle:"Commemorate unforgettable milestones with handcrafted diamond anniversary rings."},"ready-to-ship":{title:"Ready To Ship Engagement Rings",subtitle:"In stock and ready to dispatch within 24 hours in luxury presentation packaging."},diamond:{title:"Diamond Rings",subtitle:"Curated collection of brilliant natural and lab-grown diamond rings."},gemstone:{title:"Gemstone Rings",subtitle:"Exquisite sapphire, emerald, ruby, and precious gemstone rings."},emerald:{title:"Emerald Rings",subtitle:"Vibrant Colombian and Zambian emerald rings in bespoke settings."},sapphire:{title:"Sapphire Rings",subtitle:"Royal blue and fancy sapphire rings set in 18K gold and platinum."},pearl:{title:"Pearl Rings",subtitle:"Luminous South Sea and Akoya cultured pearl fine jewelry rings."},stackable:{title:"Stackable Rings",subtitle:"Delicate and striking bands designed to mix, match, and stack seamlessly."},fashion:{title:"Fashion & Cocktail Rings",subtitle:"Bold contemporary statement rings crafted for modern elegance."},signet:{title:"Signet Rings",subtitle:"Classic and modern monogram-ready signet rings in solid gold."},mens:{title:"Men's Rings",subtitle:"Sophisticated men's signet, diamond, and precious metal rings."},infinity:{title:"Infinity Rings",subtitle:"Timeless infinity motif diamond and fine gold rings."},solitaire:{title:"Solitaire Rings",subtitle:"Classic solitaire settings highlighting the center diamond with pure sophistication."},"wedding-bands":{title:"Wedding Bands",subtitle:"Handcrafted wedding bands in 18K yellow gold, white gold, rose gold, and platinum."},"aura-collection":{title:"NEW Aura Collection",subtitle:"Exclusive modern silhouettes designed in our master jewellery atelier."},"all-earrings":{title:"All Earrings",subtitle:"Explore our full suite of diamond stud, drop, hoop, and huggie earrings."},studs:{title:"Stud Earrings",subtitle:"Timeless solitaire and halo diamond stud earrings for everyday luxury."},drop:{title:"Drop & Dangle Earrings",subtitle:"Graceful diamond drop and chandelier earrings designed for maximum movement and light."},hoops:{title:"Hoop Earrings",subtitle:"Diamond pavé and fine gold hoops in micro, midi, and statement diameters."},huggies:{title:"Diamond Huggies",subtitle:"Effortless snug-fit diamond huggie earrings for curated ear styling."},"solitaire-studs":{title:"Solitaire Studs",subtitle:"Four-prong and bezel-set diamond solitaire studs in 18K gold and platinum."},"pear-drops":{title:"Pear Cut Drops",subtitle:"Elongated pear cut diamond drop earrings with mesmerizing brilliance."},"halo-studs":{title:"Halo Studs",subtitle:"Center diamonds enveloped in a halo of microscopic pavé diamonds."},cluster:{title:"Cluster Earrings",subtitle:"Artistic diamond clusters designed for magnificent scintillation."},"diamond-drop-earrings":{title:"Diamond Drop Earrings",subtitle:"Handcrafted pear cuts and fancy diamond drops."},"all-necklaces":{title:"All Necklaces",subtitle:"Discover Rivière colliers, solitaire pendants, and layering diamond chains."},"diamond-necklaces":{title:"Diamond Necklaces",subtitle:"Handcrafted diamond necklaces in fine 18K solid gold."},tennis:{title:"Tennis Necklaces",subtitle:"Continuous lines of matched brilliant diamonds crafted with fluid flexibility."},statement:{title:"Statement Necklaces",subtitle:"High-jewellery colliers and dramatic diamond statement necklaces."},chokers:{title:"Choker Necklaces",subtitle:"Close-fitting modern choker necklaces set with fiery diamonds."},graduated:{title:"Graduated Tennis Necklaces",subtitle:"Gracefully graduating diamonds culminating in an extraordinary centerpiece."},"marquise-pear":{title:"Marquise & Pear Clusters",subtitle:"Intricate floral and geometric clusters of fancy marquise and pear diamonds."},chains:{title:"Layering Chains",subtitle:"Fine 18K solid gold chains crafted for effortless layered style."},"diamond-tennis-necklace":{title:"Diamond Tennis Necklace",subtitle:"18K fine gold setting with seamless diamond articulation."},"all-bracelets":{title:"All Bracelets",subtitle:"Explore our collection of tennis bracelets, solid gold bangles, and chain cuffs."},"tennis-bracelets":{title:"Tennis Bracelets",subtitle:"The definitive diamond tennis bracelet, handcrafted with microscopic precision."},bangles:{title:"Bangles",subtitle:"Structured diamond bangles and stacking bracelets in solid 18K gold."},chain:{title:"Chain Bracelets",subtitle:"Fluid link and charm chain bracelets set with sparkling diamond accents."},cuff:{title:"Cuff Bracelets",subtitle:"Open cuff bracelets with bold architectural lines and pavé detailing."},"emerald-cut":{title:"Emerald Cut Tennis Bracelets",subtitle:"Clean geometric emerald cut diamonds in seamless four-prong settings."},"round-brilliant":{title:"Round Brilliant Tennis",subtitle:"Timeless Round brilliant diamonds mounted in flexible gold links."},stacking:{title:"Stacking Bangles",subtitle:"Slender diamond and polished gold bangles made for stacking."},"emerald-tennis-bracelet":{title:"Emerald Tennis Bracelet",subtitle:"Bezel and prong settings handcrafted in solid 18K gold."},"all-pendants":{title:"All Pendants",subtitle:"Hand-set solitaire and halo pendants suspended on delicate gold chains."},"solitaire-pendants":{title:"Solitaire Pendants",subtitle:"Exquisite four-prong diamond solitaires on 18K gold chains."},"halo-pendants":{title:"Halo Pendants",subtitle:"Radiant center gemstones framed by luminous diamond halos."},"pear-cut-pendants":{title:"Pear Cut Pendants",subtitle:"Graceful tear-drop silhouette diamond and gemstone pendants."},"gemstone-pendants":{title:"Gemstone Pendants",subtitle:"Natural sapphire, emerald, and ruby pendants in bespoke mountings."},round:{title:"Round Brilliant Pendants",subtitle:"Classic round brilliant diamonds suspended on delicate gold chains."},oval:{title:"Oval Cut Pendants",subtitle:"Elongated oval cut diamonds offering unmatched elegance."},marquise:{title:"Marquise Pendants",subtitle:"Dramatic eye-shaped marquise diamond pendants."}},Rl=()=>{const t=ze(),[n,U]=Ge(),J=t.pathname.replace("/","")||"rings",p=J==="vault-mgmt-k8m3x9q2v7"?"rings":J,[_,oe]=r.useState([]),[ae,F]=r.useState(Cl),[j,g]=r.useState(!0),[O,Q]=r.useState(!1),k=r.useRef(null),$=r.useRef(null),[L,te]=r.useState(n.get("gender")||"All"),[o,M]=r.useState(n.get("style")||"All"),[D,y]=r.useState(n.get("ringSize")||"All"),[N,P]=r.useState(n.get("shape")||"All"),[S,m]=r.useState(n.get("carat")||"All"),[u,x]=r.useState(n.get("diamond")||"All"),[b,h]=r.useState(n.get("metal")||"All"),[d,X]=r.useState(n.get("clarity")||"Any"),[C,H]=r.useState(n.get("color")||"Any"),[w,ne]=r.useState(n.get("cut")||"Any"),[E,ie]=r.useState(n.get("certification")||"Any"),[V,re]=r.useState(n.get("minPrice")?Number(n.get("minPrice")):500),[K,ce]=r.useState(n.get("maxPrice")?Number(n.get("maxPrice")):5e4),[I,se]=r.useState(n.get("sort")||"bestsellers");r.useEffect(()=>{fe.getCategories().then(a=>{if(a&&Array.isArray(a)){const s=["rings","earrings","necklaces","bracelets","pendants","collections","diamonds"],i=[...a].sort((T,f)=>{var Ce,we;const q=s.indexOf((Ce=T.slug)==null?void 0:Ce.toLowerCase()),G=s.indexOf((we=f.slug)==null?void 0:we.toLowerCase());return(q!==-1?q:999)-(G!==-1?G:999)});F(i)}else F([])}).catch(a=>console.error("Failed to load category cards",a))},[]),r.useEffect(()=>{const a={},s=n.get("category"),i=n.get("collection");s&&s!==p&&(a.category=s),i&&(a.collection=i),L!=="All"&&(a.gender=L),o!=="All"&&(a.style=o),D!=="All"&&(a.ringSize=D),b!=="All"&&(a.metal=b),N!=="All"&&(a.shape=ge(N)),u!=="All"&&(a.diamond=u),S!=="All"&&(a.carat=S),d!=="Any"&&d!=="All"&&(a.clarity=d),C!=="Any"&&C!=="All"&&(a.color=C),w!=="Any"&&w!=="All"&&(a.cut=w),E!=="Any"&&E!=="All"&&(a.certification=E),V>500&&(a.minPrice=V.toString()),K<5e4&&(a.maxPrice=K.toString()),I!=="bestsellers"&&(a.sort=I),U(a,{replace:!0})},[L,o,D,b,N,u,S,d,C,w,E,V,K,I,U]),r.useEffect(()=>{te(n.get("gender")||"All"),M(n.get("style")||"All"),y(n.get("ringSize")||"All"),h(n.get("metal")||"All"),P(n.get("shape")?ge(n.get("shape")):"All"),x(n.get("diamond")||"All"),m(n.get("carat")||"All"),X(n.get("clarity")||"Any"),H(n.get("color")||"Any"),ne(n.get("cut")||"Any"),ie(n.get("certification")||"Any"),se(n.get("sort")||"bestsellers")},[t.pathname,t.search]);const be=()=>{g(!0);let a=p==="collections"?"All":p;const s=n.get("category"),i=n.get("collection");s&&s!==p&&(a=s);const T=ge(N),f={...a!=="All"&&{category:a},...i&&{collection:i},sort:I},q=n.get("search")||n.get("q")||n.get("query");q&&(f.search=q),L!=="All"&&(f.gender=L),o!=="All"&&(f.style=o),D!=="All"&&(f.ringSize=D),b!=="All"&&(f.metal=b),T!=="All"&&(f.shape=T),u!=="All"&&(f.diamondType=u),S!=="All"&&(f.minCarat=S),d!=="Any"&&d!=="All"&&(f.clarity=d),C!=="Any"&&C!=="All"&&(f.color=C),w!=="Any"&&w!=="All"&&(f.cut=w),E!=="Any"&&E!=="All"&&(f.certification=E),fe.getProducts(f).then(G=>{oe(G.products||[]),g(!1)}).catch(G=>{console.error("Error fetching products:",G),oe([]),g(!1)})};r.useEffect(()=>{be()},[p,t.search,L,o,D,b,N,u,S,d,C,w,E,V,K,I]);const B=n.get("category"),Z=n.get("collection"),ee=n.get("style"),de=(B&&B!==p?B:null)||Z,le=de?wl[de]:null,z=ae.find(a=>a.slug===p),Y=p==="collections"?"Fine Jewellery Collections":(z==null?void 0:z.name)||p.charAt(0).toUpperCase()+p.slice(1).toLowerCase();let R=Y,W=(z==null?void 0:z.description)||"Discover AETHELCARATS solitaire studs, drop earrings, and fine handcrafted diamond jewellery.";le?(R=le.title,le.subtitle&&(W=le.subtitle)):B&&B!==p&&B!=="All"?R=B.replace(/-/g," ").replace(/\b\w/g,a=>a.toUpperCase()):Z&&Z!=="All"?R=Z.replace(/-/g," ").replace(/\b\w/g,a=>a.toUpperCase()):ee&&ee!=="All"&&ee!=="Any"&&(R=`${ee} ${Y}`);const l=R!==Y,v=()=>{te("All"),M("All"),y("All"),P("All"),m("All"),x("All"),h("All"),X("Any"),H("Any"),ne("Any"),ie("Any"),re(500),ce(5e4),se("bestsellers"),U({})};return e.jsx(dl,{children:e.jsxs(ul,{children:[e.jsxs(pl,{"aria-label":"Breadcrumb",children:[e.jsx(me,{to:"/",children:"Home"}),e.jsx("span",{className:"separator",children:"/"}),e.jsx(me,{to:"/rings",children:"Jewelry"}),e.jsx("span",{className:"separator",children:"/"}),l?e.jsxs(e.Fragment,{children:[e.jsx(me,{to:`/${p}`,children:Y}),e.jsx("span",{className:"separator",children:"/"}),e.jsx("span",{className:"current",children:R})]}):e.jsx("span",{className:"current",children:Y})]}),e.jsx(he,{yOffset:35,children:e.jsxs(gl,{children:[e.jsx("h1",{children:R}),e.jsxs(bl,{children:[e.jsx("p",{children:O||W.length<=180?W:`${W.slice(0,180)}...`}),W.length>180&&e.jsx(ml,{onClick:()=>Q(!O),children:O?e.jsxs(e.Fragment,{children:["Show Less ",e.jsx(Ue,{size:14})]}):e.jsxs(e.Fragment,{children:["Show More ",e.jsx(ye,{size:14})]})})]})]})}),e.jsx(he,{yOffset:25,children:e.jsxs(xl,{children:[e.jsx(Te,{ref:k,$direction:"prev","aria-label":"Previous categories",children:e.jsx(_e,{size:18})}),e.jsx(Te,{ref:$,$direction:"next","aria-label":"Next categories",children:e.jsx(Oe,{size:18})}),e.jsx($e,{modules:[Ke],spaceBetween:16,slidesPerView:2.2,grabCursor:!0,onBeforeInit:a=>{a.params.navigation&&typeof a.params.navigation!="boolean"&&(a.params.navigation.prevEl=k.current,a.params.navigation.nextEl=$.current)},breakpoints:{576:{slidesPerView:3.2,spaceBetween:16},768:{slidesPerView:4.2,spaceBetween:18},1024:{slidesPerView:5.2,spaceBetween:20},1280:{slidesPerView:6,spaceBetween:20}},children:(()=>{const a=[{name:"Rings",slug:"rings",image:"/assets/gem_rings_cat.png"},{name:"Earrings",slug:"earrings",image:"/assets/gem_earrings_cat.png"},{name:"Bracelets",slug:"bracelets",image:"/assets/gem_bracelets_cat.png"},{name:"Necklaces",slug:"necklaces",image:"/assets/gem_necklaces_cat.png"},{name:"Pendants",slug:"pendants",image:"/assets/aura_pendants_cat.png"},{name:"Diamonds",slug:"diamonds",image:"/assets/gem_diamonds_cat.png"},{name:"Collections",slug:"collections",image:"/assets/GOLD-MARQUISE-DIAMOND-JEWELRY-SET.webp"}];return(ae.length>0?ae:a).map(i=>{var G,xe;const T=i.slug||((G=i.name)==null?void 0:G.toLowerCase()),f=T===p||p==="rings"&&T==="rings",q=((xe=a.find(Se=>Se.slug===T))==null?void 0:xe.image)||"/assets/gem_rings_cat.png";return e.jsx(Me,{children:e.jsxs(Ae,{to:i.link||`/${T}`,$active:f,children:[e.jsx(hl,{$active:f,children:e.jsx(Ye,{src:i.image||q,alt:i.name,fallbackSrc:q})}),e.jsx(vl,{$active:f,children:i.name})]})},i.id||T)})})()})]})}),e.jsx("div",{style:{position:"relative",zIndex:100,overflow:"visible"},children:e.jsx(cl,{selectedFilters:{gender:L!=="All"?[L]:[],style:o!=="All"?[o]:[],shape:N!=="All"?[N]:[],metal:b!=="All"?[b]:[],diamond:u!=="All"?[u]:[],ringSize:D!=="All"?[D]:[],carat:S!=="All"?[S]:[],clarity:d!=="Any"?[d]:[],color:C!=="Any"?[C]:[],cut:w!=="Any"?[w]:[],certification:E!=="Any"?[E]:[]},onFilterChange:(a,s)=>{const i=s[0]||"All";a==="gender"&&te(i),a==="style"&&M(i),a==="shape"&&P(ge(i)),a==="metal"&&h(i),a==="diamond"&&x(i),a==="ringSize"&&y(i),a==="carat"&&m(i),a==="clarity"&&X(i),a==="color"&&H(i),a==="cut"&&ne(i),a==="certification"&&ie(i)},onClearAll:v,sortValue:I,onSortChange:a=>se(a),totalResults:_.length,minPrice:V,maxPrice:K,onPriceChange:(a,s)=>{re(a),ce(s)},categorySlug:p})}),j?e.jsx(Fe,{children:Array.from({length:8}).map((a,s)=>e.jsx(yl,{},s))}):_.length===0?e.jsxs(Al,{children:[e.jsx("h3",{children:"NO JEWELLERY FOUND"}),e.jsx("p",{children:"We couldn't find pieces matching your selected filters."}),e.jsxs(Sl,{onClick:v,children:[e.jsx(He,{size:14})," CLEAR FILTERS"]})]}):e.jsx(Fe,{children:_.map((a,s)=>e.jsx(he,{staggerIndex:s,yOffset:25,children:e.jsx(We,{product:a})},a.id))})]})})};export{wl as MEGA_MENU_TITLES,Rl as ProductListPage};
