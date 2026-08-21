import{r,j as e,c as re,n as xe,V as fe,ax as we,X as ke,G as Ce,aL as Ee,e as pe,aM as Le,k as Pe,l as Ne,s as ze,t as De}from"./react-vendor-BSubOYpr.js";import{g as i,E as Re}from"./ui-vendor-C-kywwZi.js";import{N as Fe}from"./swiper-vendor-B7SuwHD8.js";import{a as ue,R as ce,S as He}from"./admin-pages-D6Our18J.js";import{P as Oe}from"./ProductCard-BUST46dY.js";import{L as S}from"./LuxuryDropdown-Bp229C8l.js";import{n as oe,D as de}from"./diamondShapes-Cr3dfuxZ.js";import"./admin-tools-vendor-CKN5doRT.js";const Ge=i.div`
  background-color: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Be=i.div`
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
`,Te=i.button`
  position: relative;
  background-color: ${({$selected:l})=>l?"#faf5eb":"#ffffff"};
  border: 1px solid ${({$selected:l})=>l?"#c9a45c":"#e8e3d9"};
  border-radius: 4px;
  padding: 10px 6px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({$selected:l})=>l?"0 2px 10px rgba(201, 164, 92, 0.2)":"none"};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;

  &:hover, &:focus-visible {
    border-color: #c9a45c;
    background-color: #faf5eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(201, 164, 92, 0.15);
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
      filter: ${({$selected:l})=>l?"brightness(0) saturate(100%) invert(69%) sepia(26%) saturate(1048%) hue-rotate(5deg) brightness(92%) contrast(87%)":"brightness(0.2)"};
      transition: filter 0.2s ease, transform 0.2s ease;
    }
  }

  span.shape-name {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${({$selected:l})=>l?"#c9a45c":"#1f1f1f"};
    transition: color 0.2s ease;
  }

  .check-icon {
    position: absolute;
    top: 4px;
    right: 4px;
    opacity: ${({$selected:l})=>l?1:0};
    transition: opacity 0.2s ease;
  }
`,$e=i.button`
  background: none;
  border: none;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #6b6b6b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 0 0;
  transition: color 0.2s ease;

  &:hover {
    color: #c9a45c;
  }

  svg {
    transition: transform 0.25s ease;
    transform: ${({$expanded:l})=>l?"rotate(180deg)":"rotate(0deg)"};
  }
`,he=({selectedShape:l,onSelectShape:n,className:G,style:Y})=>{const[m,B]=r.useState(!1),ee=oe(l),U=de.slice(0,9),F=de.slice(9),L=m?de:U;return e.jsxs(Ge,{className:G,style:Y,children:[e.jsx(Be,{children:L.map(d=>{const T=ee===d.value;return e.jsxs(Te,{type:"button",$selected:T,onClick:()=>n(T?"All":d.value),"data-testid":`shape-card-${d.value.toLowerCase()}`,children:[e.jsx("div",{className:"check-icon",children:e.jsx(re,{size:10,color:"#C9A45C"})}),e.jsx("div",{className:"svg-wrapper",children:e.jsx("img",{src:d.image,alt:d.name,onError:W=>{const P=`/assets/diamonds/${d.value}.svg`;W.target.src!==P&&(W.target.src=P)}})}),e.jsx("span",{className:"shape-name",children:d.name})]},d.value)})}),F.length>0&&e.jsxs($e,{type:"button",$expanded:m,onClick:()=>B(!m),children:[e.jsx("span",{children:m?"Show Fewer Shapes":"More Shapes"}),e.jsx(xe,{size:12})]})]})},_e=[{label:"Best Selling",value:"bestsellers"},{label:"Newest Arrivals",value:"newest"},{label:"Price: Low → High",value:"price-low"},{label:"Price: High → Low",value:"price-high"},{label:"Name: A → Z",value:"name"}],ve={rings:[{label:"Solitaire",value:"Solitaire"},{label:"Halo",value:"Halo"},{label:"Three-Stone",value:"Three-Stone"},{label:"Eternity",value:"Eternity"},{label:"Vintage & Antique",value:"Vintage & Antique"},{label:"Bezel Settings",value:"Bezel Settings"},{label:"Cocktail",value:"Cocktail"}],earrings:[{label:"Solitaire Studs",value:"Solitaire Studs"},{label:"Pear Drops",value:"Pear Drops"},{label:"Halo Studs",value:"Halo Studs"},{label:"Hoops",value:"Hoops"},{label:"Huggies",value:"Huggies"},{label:"Dangle & Drop",value:"Dangle & Drop"},{label:"Cluster",value:"Cluster"}],necklaces:[{label:"Graduated Tennis",value:"Graduated Tennis"},{label:"Marquise & Pear Cluster",value:"Marquise & Pear Cluster"},{label:"Pendant Chain",value:"Pendant Chain"},{label:"Choker",value:"Choker"},{label:"Statement",value:"Statement"},{label:"Riviere",value:"Riviere"},{label:"Layering Chains",value:"Layering Chains"}],bracelets:[{label:"Emerald Cut Tennis",value:"Emerald Cut Tennis"},{label:"Round Brilliant Tennis",value:"Round Brilliant Tennis"},{label:"Bangles",value:"Bangles"},{label:"Stacking Bangles",value:"Stacking Bangles"},{label:"Chain Bracelets",value:"Chain Bracelets"},{label:"Cuff",value:"Cuff"},{label:"Line Bracelet",value:"Line Bracelet"}],pendants:[{label:"Solitaire Pendants",value:"Solitaire Pendants"},{label:"Halo Pendants",value:"Halo Pendants"},{label:"Pear Cut Pendants",value:"Pear Cut Pendants"},{label:"Gemstone Pendants",value:"Gemstone Pendants"},{label:"Cross Pendants",value:"Cross Pendants"},{label:"Heart Pendants",value:"Heart Pendants"},{label:"Initial & Letter",value:"Initial & Letter"}],diamonds:[{label:"Natural Certified",value:"Natural Certified"},{label:"Lab-Grown",value:"Lab-Grown"},{label:"GIA Authenticated",value:"GIA Authenticated"},{label:"IGI Authenticated",value:"IGI Authenticated"},{label:"Fancy Color",value:"Fancy Color"},{label:"Loose Diamond Vault",value:"Loose Diamond Vault"}],collections:[{label:"Signature Collection",value:"Signature Collection"},{label:"High Jewellery",value:"High Jewellery"},{label:"Bridal Suite",value:"Bridal Suite"},{label:"Diamond Essentials",value:"Diamond Essentials"},{label:"Golden Hour",value:"Golden Hour"}]},Ie=i.div`
  background-color: #F9F7F2;
  border: 1px solid #d9d3c7;
  padding: 24px 28px;
  margin-bottom: 24px;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(31, 31, 31, 0.03);

  @media (max-width: 992px) {
    display: none;
  }
`,Me=i.div`
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
`,Ye=i.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`,ne=i.div`
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
`,We=i.div`
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
`,Ve=i.div`
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
`,Je=i.div`
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
`,Ke=i.div`
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
`,Ue=i.div`
  position: fixed;
  inset: 0;
  background: rgba(18, 22, 26, 0.7);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: ${({$open:l})=>l?"block":"none"};
`,qe=i.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 380px;
  background: #ffffff;
  z-index: 10000;
  transform: ${({$open:l})=>l?"translateX(0)":"translateX(100%)"};
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
`,Qe=({selectedFilters:l,onFilterChange:n,onClearAll:G,sortValue:Y,onSortChange:m,totalResults:B=0,minPrice:ee=0,maxPrice:U=5e4,onPriceChange:F,categorySlug:L="all"})=>{var E,X,I,ae,M,le,H,Z,ie,O,te,K,se,t,g,s;const[d,T]=r.useState([]),[W,P]=r.useState(!1),[$,N]=r.useState(null),q=!L||L==="rings"||L==="engagement-rings"||L==="wedding-bands"||L==="all";r.useEffect(()=>{(async()=>{try{const c=await ue.getPublicFilters({jewelleryType:L});T(c.filters||[])}catch(c){console.error("Error fetching storefront filters:",c)}})()},[L]);const o=(a,c)=>{const x=(l[a]||[]).includes(c);c==="All"||c==="Any"||x?n(a,[]):n(a,[c])},_=(a,c,A)=>{$===a?(N(null),F&&F(500,5e4)):(N(a),F&&F(c,A))},z=_e.map(a=>({label:a.label,value:a.value})),f=d.find(a=>a.key==="gender"),D=d.find(a=>a.key==="style"),h=d.find(a=>a.key==="metal"),w=d.find(a=>a.key==="diamond_origin"),v=d.find(a=>a.key==="ring_size"),p=d.find(a=>a.key==="carat"),y=d.find(a=>a.key==="clarity"),u=d.find(a=>a.key==="color"),R=d.find(a=>a.key==="cut"),b=d.find(a=>a.key==="certification"),V=((E=l.gender)==null?void 0:E[0])||"All",k=((X=l.style)==null?void 0:X[0])||"All",J=((I=l.metal)==null?void 0:I[0])||"All",C=((ae=l.shape)==null?void 0:ae[0])||"All",Q=((M=l.diamond)==null?void 0:M[0])||((le=l.diamond_origin)==null?void 0:le[0])||"All";return e.jsxs(e.Fragment,{children:[e.jsxs(Ie,{children:[e.jsxs(Me,{children:[e.jsxs("div",{className:"title-group",children:[e.jsx(fe,{size:16,color:"#1F1F1F"}),e.jsx("span",{children:"FILTERS"})]}),e.jsxs("button",{className:"clear-btn",onClick:G,children:["CLEAR ALL ",e.jsx(we,{size:13})]})]}),e.jsxs(Ye,{children:[e.jsxs(ne,{children:[e.jsx("div",{className:"block-label",children:(f==null?void 0:f.customerLabel)||"GENDER"}),e.jsx("div",{className:"options-box",children:((f==null?void 0:f.options)||[{label:"All",value:"All"},{label:"Women",value:"Women"},{label:"Men",value:"Men"},{label:"Unisex",value:"Unisex"}]).map(a=>e.jsxs("div",{className:`option-row ${V===a.value?"selected":""}`,onClick:()=>o("gender",a.value),children:[e.jsx("span",{children:a.label}),V===a.value&&e.jsx(re,{size:14,color:"#C9A45C"})]},a.value))})]}),e.jsxs(ne,{children:[e.jsx("div",{className:"block-label",children:(D==null?void 0:D.customerLabel)||"STYLE"}),e.jsx("div",{className:"options-box",children:(()=>{const a=(L||"rings").toLowerCase(),A=ve[a]||ve.rings;return[{label:"All",value:"All"},...A].map(x=>e.jsxs("div",{className:`option-row ${k===x.value?"selected":""}`,onClick:()=>o("style",x.value),children:[e.jsx("span",{children:x.label}),k===x.value&&e.jsx(re,{size:14,color:"#C9A45C"})]},x.value))})()})]}),e.jsxs(ne,{children:[e.jsx("div",{className:"block-label",children:(h==null?void 0:h.customerLabel)||"METAL"}),e.jsx("div",{className:"options-box",children:((h==null?void 0:h.options)||[{label:"All Metals",value:"All"},{label:"14K Yellow Gold",value:"14k-yellow-gold",colorHex:"#E8C872"},{label:"14K White Gold",value:"14k-white-gold",colorHex:"#CBD5E1"},{label:"14K Rose Gold",value:"14k-rose-gold",colorHex:"#E4A8A5"},{label:"18K Yellow Gold",value:"18k-yellow-gold",colorHex:"#E8C872"},{label:"18K White Gold",value:"18k-white-gold",colorHex:"#CBD5E1"},{label:"18K Rose Gold",value:"18k-rose-gold",colorHex:"#E4A8A5"}]).map(a=>e.jsxs("div",{className:`option-row ${J===a.value?"selected":""}`,onClick:()=>o("metal",a.value),children:[e.jsxs("span",{style:{display:"flex",alignItems:"center"},children:[a.colorHex&&e.jsx("span",{className:"metal-dot",style:{backgroundColor:a.colorHex}}),a.label]}),J===a.value&&e.jsx(re,{size:14,color:"#C9A45C"})]},a.value))})]}),e.jsxs(ne,{style:{gridColumn:"span 2"},children:[e.jsx("div",{className:"block-label",children:"STONE SHAPE"}),e.jsx(he,{selectedShape:C,onSelectShape:a=>o("shape",a)})]}),e.jsxs(ne,{children:[e.jsx("div",{className:"block-label",children:(w==null?void 0:w.customerLabel)||"DIAMOND"}),e.jsx("div",{className:"options-box",children:((w==null?void 0:w.options)||[{label:"All",value:"All"},{label:"Natural",value:"Natural"},{label:"Lab-Grown",value:"Lab-Grown"}]).map(a=>{var c,A;return e.jsxs("div",{className:`option-row ${Q===a.value||((c=l.diamond)==null?void 0:c[0])===a.value?"selected":""}`,onClick:()=>{o("diamond",a.value),o("diamond_origin",a.value)},children:[e.jsx("span",{children:a.label}),(Q===a.value||((A=l.diamond)==null?void 0:A[0])===a.value)&&e.jsx(re,{size:14,color:"#C9A45C"})]},a.value)})}),e.jsx(We,{style:{marginTop:12},children:e.jsxs("div",{className:"preset-pills",children:[e.jsx("button",{type:"button",className:`price-pill ${$==="p1"?"active":""}`,onClick:()=>_("p1",500,2e3),children:"$500 - $2k"}),e.jsx("button",{type:"button",className:`price-pill ${$==="p2"?"active":""}`,onClick:()=>_("p2",2e3,5e3),children:"$2k - $5k"}),e.jsx("button",{type:"button",className:`price-pill ${$==="p3"?"active":""}`,onClick:()=>_("p3",5e3,1e4),children:"$5k - $10k"}),e.jsx("button",{type:"button",className:`price-pill ${$==="p4"?"active":""}`,onClick:()=>_("p4",1e4,5e4),children:"$10k+"})]})})]})]}),e.jsxs(Ve,{children:[q&&e.jsx(S,{label:(v==null?void 0:v.customerLabel)||"Ring Size",options:((v==null?void 0:v.options)||[]).map(a=>({label:a.label,value:a.value})),value:((H=l.ringSize)==null?void 0:H[0])||"All",onChange:a=>o("ringSize",a)}),e.jsx(S,{label:(p==null?void 0:p.customerLabel)||"Carat Weight",options:((p==null?void 0:p.options)||[]).map(a=>({label:a.label,value:a.value})),value:((Z=l.carat)==null?void 0:Z[0])||"Any",onChange:a=>o("carat",a)}),e.jsx(S,{label:(y==null?void 0:y.customerLabel)||"Clarity",options:((y==null?void 0:y.options)||[]).map(a=>({label:a.label,value:a.value})),value:((ie=l.clarity)==null?void 0:ie[0])||"Any",onChange:a=>o("clarity",a)}),e.jsx(S,{label:(u==null?void 0:u.customerLabel)||"Color",options:(()=>{const a=(u==null?void 0:u.options)||[];if(a.length===0)return[{label:"Any Color",value:"Any"},{label:"STANDARD COLORS",value:"HEADER_STD",isHeader:!0},{label:"D Grade",value:"D"},{label:"E Grade",value:"E"},{label:"F Grade",value:"F"},{label:"G Grade",value:"G"},{label:"H Grade",value:"H"},{label:"I Grade",value:"I"},{label:"J Grade",value:"J"},{label:"K Grade",value:"K"},{label:"L Grade",value:"L"},{label:"M Grade",value:"M"},{label:"FANCY COLORS",value:"HEADER_FANCY",isHeader:!0},{label:"Fancy Yellow",value:"fancy-yellow",colorHex:"#FACC15"},{label:"Fancy Pink",value:"fancy-pink",colorHex:"#F472B6"},{label:"Fancy Blue",value:"fancy-blue",colorHex:"#60A5FA"},{label:"Fancy Green",value:"fancy-green",colorHex:"#4ADE80"},{label:"Fancy Orange",value:"fancy-orange",colorHex:"#FB923C"},{label:"Fancy Red",value:"fancy-red",colorHex:"#EF4444"},{label:"Fancy Purple",value:"fancy-purple",colorHex:"#A855F7"},{label:"Fancy Brown",value:"fancy-brown",colorHex:"#78350F"},{label:"Fancy Black",value:"fancy-black",colorHex:"#18181B"},{label:"Other Fancy Color",value:"fancy-other",colorHex:"#E2E8F0"}];const c=a.filter(j=>!j.label.toLowerCase().includes("fancy")&&j.value!=="Any Color"),A=a.filter(j=>j.label.toLowerCase().includes("fancy")),x=[{label:"Any Color",value:"Any"}];return c.length>0&&(x.push({label:"STANDARD COLORS",value:"HEADER_STD",isHeader:!0}),c.forEach(j=>x.push({label:j.label,value:j.value,colorHex:j.colorHex}))),A.length>0&&(x.push({label:"FANCY COLORS",value:"HEADER_FANCY",isHeader:!0}),A.forEach(j=>x.push({label:j.label,value:j.value,colorHex:j.colorHex}))),x})(),value:((O=l.color)==null?void 0:O[0])||"Any",onChange:a=>o("color",a)}),e.jsx(S,{label:(R==null?void 0:R.customerLabel)||"Cut",options:((R==null?void 0:R.options)||[]).map(a=>({label:a.label,value:a.value})),value:((te=l.cut)==null?void 0:te[0])||"Any",onChange:a=>o("cut",a)}),e.jsx(S,{label:(b==null?void 0:b.customerLabel)||"Certification",options:((b==null?void 0:b.options)||[]).map(a=>({label:a.label,value:a.value})),value:((K=l.certification)==null?void 0:K[0])||"Any",onChange:a=>o("certification",a)})]})]}),e.jsxs(Je,{children:[e.jsxs("div",{className:"count",children:[e.jsx("span",{className:"num-highlight",children:B}),e.jsx("span",{children:B===1?"Result Found":"Results Found"})]}),e.jsxs("div",{className:"sort-area",children:[e.jsx("span",{className:"sort-label",children:"SORT BY"}),e.jsx(S,{options:z,value:Y,onChange:a=>m(a),fullWidth:!1,style:{width:190}})]})]}),e.jsxs(Ke,{children:[e.jsxs("button",{type:"button",onClick:()=>P(!0),children:[e.jsx(fe,{size:16})," FILTERS"]}),e.jsxs("button",{type:"button",onClick:()=>P(!0),children:["SORT BY ",e.jsx(xe,{size:14})]})]}),e.jsx(Ue,{$open:W,onClick:()=>P(!1)}),e.jsxs(qe,{$open:W,children:[e.jsxs("div",{className:"drawer-header",children:[e.jsx("h3",{children:"FILTERS & SORT"}),e.jsx("button",{type:"button",onClick:()=>P(!1),style:{background:"none",border:"none",cursor:"pointer"},children:e.jsx(ke,{size:20})})]}),e.jsxs("div",{className:"drawer-body",children:[e.jsx(S,{label:"SORT BY",options:z,value:Y,onChange:a=>m(a)}),e.jsx(S,{label:(f==null?void 0:f.customerLabel)||"Gender",options:((f==null?void 0:f.options)||[]).map(a=>({label:a.label,value:a.value})),value:V,onChange:a=>o("gender",a)}),e.jsx(S,{label:(h==null?void 0:h.customerLabel)||"Metal",options:((h==null?void 0:h.options)||[]).map(a=>({label:a.label,value:a.value})),value:J,onChange:a=>o("metal",a)}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#6b6b6b",display:"block",marginBottom:6},children:"Stone Shape"}),e.jsx(he,{selectedShape:C,onSelectShape:a=>o("shape",a)})]}),q&&e.jsx(S,{label:(v==null?void 0:v.customerLabel)||"Ring Size",options:((v==null?void 0:v.options)||[]).map(a=>({label:a.label,value:a.value})),value:((se=l.ringSize)==null?void 0:se[0])||"All",onChange:a=>o("ringSize",a)}),e.jsx(S,{label:(p==null?void 0:p.customerLabel)||"Carat Weight",options:((p==null?void 0:p.options)||[]).map(a=>({label:a.label,value:a.value})),value:((t=l.carat)==null?void 0:t[0])||"Any",onChange:a=>o("carat",a)}),e.jsx(S,{label:(y==null?void 0:y.customerLabel)||"Clarity",options:((y==null?void 0:y.options)||[]).map(a=>({label:a.label,value:a.value})),value:((g=l.clarity)==null?void 0:g[0])||"Any",onChange:a=>o("clarity",a)}),e.jsx(S,{label:(u==null?void 0:u.customerLabel)||"Color",options:((u==null?void 0:u.options)||[]).map(a=>({label:a.label,value:a.value})),value:((s=l.color)==null?void 0:s[0])||"Any",onChange:a=>o("color",a)})]}),e.jsxs("div",{className:"drawer-actions",children:[e.jsx("button",{type:"button",className:"clear",onClick:()=>{G(),P(!1)},children:"CLEAR ALL"}),e.jsx("button",{type:"button",className:"apply",onClick:()=>P(!1),children:"VIEW RESULTS"})]})]})]})},Xe=i.div`
  background-color: #F9F7F2;
  min-height: 100vh;
  width: 100%;
`,Ze=i.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 24px 80px;
  box-sizing: border-box;
  overflow-x: hidden;
  background-color: #F9F7F2;

  @media (max-width: 768px) {
    padding: 16px 16px 60px;
  }
`,ea=i.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #77736c;
  margin-bottom: 24px;
  letter-spacing: 0.05em;

  a {
    color: #77736c;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: #c9a45c;
    }
  }

  span.separator {
    color: #c9a45c;
    font-size: 0.7rem;
  }

  span.current {
    color: #242321;
    font-weight: 600;
  }
`,aa=i.div`
  margin-bottom: 32px;

  h1 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.8rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: #242321;
    margin-bottom: 12px;
  }

  @media (max-width: 768px) {
    margin-bottom: 24px;
    h1 {
      font-size: 2.1rem;
    }
  }
`,la=i.div`
  max-width: 920px;
  line-height: 1.65;
  color: #55524d;
  font-size: 0.95rem;

  p {
    margin-bottom: 8px;
  }
`,ye=i.button`
  background: none;
  border: none;
  color: #c9a45c;
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
`,ta=i.div`
  margin-bottom: 40px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e8e3d9;
  position: relative;
  width: 100%;

  .swiper {
    padding: 4px 4px 12px;
    overflow: visible;
  }
`,Ae=i.button`
  position: absolute;
  top: 36%;
  ${({$direction:l})=>l==="prev"?"left: -18px;":"right: -18px;"}
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fffdf9;
  border: 1px solid #e8e3d9;
  color: #242321;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 20;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #242321;
    color: #fffdf9;
    border-color: #242321;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    top: 36%;
    ${({$direction:l})=>l==="prev"?"left: -4px;":"right: -4px;"}
  }
`,Se=i(pe)`
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
`,sa=i.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
  background-color: #faf5eb;
  border: ${({$active:l})=>l?"2.5px solid #C9A45C":"1px solid #e8e3d9"};
  box-shadow: ${({$active:l})=>l?"0 6px 20px rgba(201, 164, 92, 0.35)":"0 2px 8px rgba(0, 0, 0, 0.04)"};
  transform: ${({$active:l})=>l?"scale(1.03)":"none"};
  transition: all 0.25s ease;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  ${Se}:hover & {
    border-color: #C9A45C;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(201, 164, 92, 0.3);

    img {
      transform: scale(1.06);
    }
  }
`,na=i.span`
  font-size: 0.88rem;
  font-weight: ${({$active:l})=>l?"700":"600"};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({$active:l})=>l?"#C9A45C":"#242321"};
  text-align: left;
  margin-left: 2px;
  transition: color 0.2s ease;
`,je=i.div`
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
`,ra=Re`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`,oa=i.div`
  aspect-ratio: 3 / 4;
  background: linear-gradient(90deg, #f3efe6 0%, #e8e3d9 50%, #f3efe6 100%);
  background-size: 400px 100%;
  animation: ${ra} 1.4s infinite;
  border-radius: 4px;
`,ia=i.div`
  text-align: center;
  padding: 64px 20px;
  background-color: #fdfbf7;
  border: 1px dashed #e8e3d9;
  margin: 40px 0;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: #242321;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #77736c;
    margin-bottom: 20px;
  }
`,ca=[{id:"rings",name:"Rings",slug:"rings",description:"Discover FLOKSY JEWEL solitaire studs, drop earrings, and diamond huggies.",image:"/assets/floksy_rings_cat.png"},{id:"earrings",name:"Earrings",slug:"earrings",description:"Discover FLOKSY JEWEL solitaire studs, drop earrings, and diamond huggies.",image:"/assets/floksy_earrings_cat.png"},{id:"necklaces",name:"Necklaces",slug:"necklaces",description:"Discover FLOKSY JEWEL diamond rivière necklaces, solitaire pendants, and statement colliers.",image:"/assets/floksy_necklaces_cat.png"},{id:"bracelets",name:"Bracelets",slug:"bracelets",description:"Explore FLOKSY JEWEL diamond tennis bracelets, line cuffs, and high-jewellery bangles.",image:"/assets/floksy_bracelets_cat.png"},{id:"pendants",name:"Pendants",slug:"pendants",description:"Explore FLOKSY JEWEL solitaire diamond pendants and custom halo medallion drops.",image:"/assets/floksy_pendants_cat.png"},{id:"diamonds",name:"Diamonds",slug:"diamonds",description:"Browse GIA & IGI authenticated loose diamonds across Round, Oval, Emerald, and Cushion cuts.",image:"/assets/floksy_diamonds_cat.png"},{id:"collections",name:"Collections",slug:"collections",description:"Explore the complete FLOKSY JEWEL portfolio of handcrafted fine jewellery.",image:"/assets/GOLD-MARQUISE-DIAMOND-JEWELRY-SET.webp"}],ha=()=>{const l=Ce(),[n,G]=Ee(),Y=l.pathname.replace("/","")||"rings",m=Y==="atelier-vault-7Kx9Qm4R2Lp8Nw6T"?"rings":Y,[B,ee]=r.useState([]),[U,F]=r.useState(ca),[L,d]=r.useState(!0),[T,W]=r.useState(!1),P=r.useRef(null),$=r.useRef(null),[N,q]=r.useState(n.get("gender")||"All"),[o,_]=r.useState(n.get("style")||"All"),[z,f]=r.useState(n.get("ringSize")||"All"),[D,h]=r.useState(n.get("shape")||"All"),[w,v]=r.useState(n.get("carat")||"All"),[p,y]=r.useState(n.get("diamond")||"All"),[u,R]=r.useState(n.get("metal")||"All"),[b,V]=r.useState(n.get("clarity")||"Any"),[k,J]=r.useState(n.get("color")||"Any"),[C,Q]=r.useState(n.get("cut")||"Any"),[E,X]=r.useState(n.get("certification")||"Any"),[I,ae]=r.useState(n.get("minPrice")?Number(n.get("minPrice")):500),[M,le]=r.useState(n.get("maxPrice")?Number(n.get("maxPrice")):5e4),[H,Z]=r.useState(n.get("sort")||"bestsellers");r.useEffect(()=>{ue.getCategories().then(t=>{if(t&&Array.isArray(t)){const g=["rings","earrings","necklaces","bracelets","pendants","collections","diamonds"],s=[...t].sort((a,c)=>{var be,ge;const A=g.indexOf((be=a.slug)==null?void 0:be.toLowerCase()),x=g.indexOf((ge=c.slug)==null?void 0:ge.toLowerCase());return(A!==-1?A:999)-(x!==-1?x:999)});F(s)}else F([])}).catch(t=>console.error("Failed to load category cards",t))},[]),r.useEffect(()=>{const t={};N!=="All"&&(t.gender=N),o!=="All"&&(t.style=o),z!=="All"&&(t.ringSize=z),u!=="All"&&(t.metal=u),D!=="All"&&(t.shape=oe(D)),p!=="All"&&(t.diamond=p),w!=="All"&&(t.carat=w),b!=="Any"&&b!=="All"&&(t.clarity=b),k!=="Any"&&k!=="All"&&(t.color=k),C!=="Any"&&C!=="All"&&(t.cut=C),E!=="Any"&&E!=="All"&&(t.certification=E),I>500&&(t.minPrice=I.toString()),M<5e4&&(t.maxPrice=M.toString()),H!=="bestsellers"&&(t.sort=H),G(t,{replace:!0})},[N,o,z,u,D,p,w,b,k,C,E,I,M,H,G]),r.useEffect(()=>{q(n.get("gender")||"All"),_(n.get("style")||"All"),f(n.get("ringSize")||"All"),R(n.get("metal")||"All"),h(n.get("shape")?oe(n.get("shape")):"All"),y(n.get("diamond")||"All"),v(n.get("carat")||"All"),V(n.get("clarity")||"Any"),J(n.get("color")||"Any"),Q(n.get("cut")||"Any"),X(n.get("certification")||"Any"),Z(n.get("sort")||"bestsellers")},[l.pathname,l.search]);const ie=()=>{d(!0);const t=m==="collections"?"All":m,g=oe(D),s={...t!=="All"&&{category:t},sort:H},a=n.get("search")||n.get("q")||n.get("query");a&&(s.search=a),N!=="All"&&(s.gender=N),o!=="All"&&(s.style=o),z!=="All"&&(s.ringSize=z),u!=="All"&&(s.metal=u),g!=="All"&&(s.shape=g),p!=="All"&&(s.diamondType=p),w!=="All"&&(s.minCarat=w),b!=="Any"&&b!=="All"&&(s.clarity=b),k!=="Any"&&k!=="All"&&(s.color=k),C!=="Any"&&C!=="All"&&(s.cut=C),E!=="Any"&&E!=="All"&&(s.certification=E),ue.getProducts(s).then(c=>{ee(c.products||[]),d(!1)}).catch(c=>{console.error("Error fetching products:",c),ee([]),d(!1)})};r.useEffect(()=>{ie()},[m,N,o,z,u,D,p,w,b,k,C,E,I,M,H]);const O=U.find(t=>t.slug===m),te=m==="collections"?"Fine Jewellery Collections":(O==null?void 0:O.name)||m.charAt(0).toUpperCase()+m.slice(1).toLowerCase(),K=(O==null?void 0:O.description)||"Discover FLOKSY JEWEL solitaire studs, drop earrings, and fine handcrafted diamond jewellery.",se=()=>{q("All"),_("All"),f("All"),h("All"),v("All"),y("All"),R("All"),V("Any"),J("Any"),Q("Any"),X("Any"),ae(500),le(5e4),Z("bestsellers"),G({})};return e.jsx(Xe,{children:e.jsxs(Ze,{children:[e.jsxs(ea,{"aria-label":"Breadcrumb",children:[e.jsx(pe,{to:"/",children:"Home"}),e.jsx("span",{className:"separator",children:"/"}),e.jsx(pe,{to:"/rings",children:"Jewelry"}),e.jsx("span",{className:"separator",children:"/"}),e.jsx("span",{className:"current",children:te})]}),e.jsx(ce,{yOffset:35,children:e.jsxs(aa,{children:[e.jsx("h1",{children:te}),e.jsxs(la,{children:[e.jsx("p",{children:T||K.length<=180?K:`${K.slice(0,180)}...`}),K.length>180&&e.jsx(ye,{onClick:()=>W(!T),children:T?e.jsxs(e.Fragment,{children:["Show Less ",e.jsx(Le,{size:14})]}):e.jsxs(e.Fragment,{children:["Show More ",e.jsx(xe,{size:14})]})})]})]})}),e.jsx(ce,{yOffset:25,children:e.jsxs(ta,{children:[e.jsx(Ae,{ref:P,$direction:"prev","aria-label":"Previous categories",children:e.jsx(Pe,{size:18})}),e.jsx(Ae,{ref:$,$direction:"next","aria-label":"Next categories",children:e.jsx(Ne,{size:18})}),e.jsx(ze,{modules:[Fe],spaceBetween:16,slidesPerView:2.2,grabCursor:!0,onBeforeInit:t=>{t.params.navigation&&typeof t.params.navigation!="boolean"&&(t.params.navigation.prevEl=P.current,t.params.navigation.nextEl=$.current)},breakpoints:{576:{slidesPerView:3.2,spaceBetween:16},768:{slidesPerView:4.2,spaceBetween:18},1024:{slidesPerView:5.2,spaceBetween:20},1280:{slidesPerView:6,spaceBetween:20}},children:(()=>{const t=[{name:"Rings",slug:"rings",image:"/assets/floksy_rings_cat.png"},{name:"Earrings",slug:"earrings",image:"/assets/floksy_earrings_cat.png"},{name:"Bracelets",slug:"bracelets",image:"/assets/floksy_bracelets_cat.png"},{name:"Necklaces",slug:"necklaces",image:"/assets/floksy_necklaces_cat.png"},{name:"Pendants",slug:"pendants",image:"/assets/floksy_pendants_cat.png"},{name:"Diamonds",slug:"diamonds",image:"/assets/floksy_diamonds_cat.png"},{name:"Collections",slug:"collections",image:"/assets/GOLD-MARQUISE-DIAMOND-JEWELRY-SET.webp"}];return(U.length>0?U:t).map(s=>{var x,j;const a=s.slug||((x=s.name)==null?void 0:x.toLowerCase()),c=a===m||m==="rings"&&a==="rings",A=((j=t.find(me=>me.slug===a))==null?void 0:j.image)||"/assets/floksy_rings_cat.png";return e.jsx(De,{children:e.jsxs(Se,{to:s.link||`/${a}`,$active:c,children:[e.jsx(sa,{$active:c,children:e.jsx(He,{src:s.image||A,alt:s.name,fallbackSrc:A})}),e.jsx(na,{$active:c,children:s.name})]})},s.id||a)})})()})]})}),e.jsx(ce,{yOffset:25,children:e.jsx(Qe,{selectedFilters:{gender:N!=="All"?[N]:[],style:o!=="All"?[o]:[],shape:D!=="All"?[D]:[],metal:u!=="All"?[u]:[],diamond:p!=="All"?[p]:[],ringSize:z!=="All"?[z]:[],carat:w!=="All"?[w]:[],clarity:b!=="Any"?[b]:[],color:k!=="Any"?[k]:[],cut:C!=="Any"?[C]:[],certification:E!=="Any"?[E]:[]},onFilterChange:(t,g)=>{const s=g[0]||"All";t==="gender"&&q(s),t==="style"&&_(s),t==="shape"&&h(oe(s)),t==="metal"&&R(s),t==="diamond"&&y(s),t==="ringSize"&&f(s),t==="carat"&&v(s),t==="clarity"&&V(s),t==="color"&&J(s),t==="cut"&&Q(s),t==="certification"&&X(s)},onClearAll:se,sortValue:H,onSortChange:t=>Z(t),totalResults:B.length,minPrice:I,maxPrice:M,onPriceChange:(t,g)=>{ae(t),le(g)},categorySlug:m})}),L?e.jsx(je,{children:Array.from({length:8}).map((t,g)=>e.jsx(oa,{},g))}):B.length===0?e.jsxs(ia,{children:[e.jsx("h3",{children:"NO JEWELLERY FOUND"}),e.jsx("p",{children:"We couldn't find pieces matching your selected filters."}),e.jsxs(ye,{onClick:se,style:{margin:"0 auto",fontSize:"0.85rem"},children:[e.jsx(we,{size:14})," CLEAR FILTERS"]})]}):e.jsx(je,{children:B.map((t,g)=>e.jsx(ce,{staggerIndex:g,yOffset:25,children:e.jsx(Oe,{product:t})},t.id))})]})})};export{ha as ProductListPage};
