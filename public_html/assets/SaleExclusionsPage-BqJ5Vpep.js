import{r as x,j as e,f as m,l as h,aG as j}from"./react-vendor-BQZO0c5l.js";import{g as s}from"./ui-vendor-Bs2yixgz.js";import{a as b,R as l,S as y}from"./admin-pages-j3hObUzd.js";import{W as C}from"./WhyAuraDiamondNav-Dl8A3LAR.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const w=s.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`,E=s.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 24px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #A8A8A8;

  a {
    color: #A8A8A8;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #C9A96E;
    }
  }

  span.current {
    color: #C9A96E;
    font-weight: 600;
  }
`,A=s.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px 24px;
  }

  .text-side {
    .eyebrow {
      font-size: 0.8rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #C9A96E;
      font-weight: 700;
      margin-bottom: 12px;
      display: block;
    }

    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3.2rem;
      font-weight: 500;
      color: #F5F1E8;
      margin-bottom: 20px;
      letter-spacing: 0.04em;
      line-height: 1.1;

      @media (max-width: 768px) {
        font-size: 2.3rem;
      }
    }

    p.subtitle {
      font-size: 1.05rem;
      color: #D8D2C5;
      line-height: 1.7;
      margin-bottom: 28px;
    }
  }

  .image-side {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(140, 116, 75, 0.25);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);

    img {
      width: 100%;
      height: 420px;
      object-fit: cover;

      @media (max-width: 768px) {
        height: 280px;
      }
    }
  }
`,v=s.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,d=s.section`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 36px;
  border-radius: 4px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    font-weight: 500;
    color: #F5F1E8;
    letter-spacing: 0.08em;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(140, 116, 75, 0.2);
  }

  p {
    font-size: 0.95rem;
    color: #D8D2C5;
    line-height: 1.7;
    margin-bottom: 14px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul {
    margin: 12px 0 16px 20px;
    color: #D8D2C5;
    font-size: 0.95rem;

    li {
      margin-bottom: 8px;
      line-height: 1.6;
    }
  }
`,S=s.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,z=s.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  color: #F5F1E8;
  padding: 40px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    letter-spacing: 0.1em;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  p {
    color: #D8D2C5;
    font-size: 0.95rem;
    max-width: 540px;
    margin: 0 auto 24px;
    line-height: 1.6;
  }

  a.primary-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #C9A96E;
    color: #0B0B0B;
    padding: 14px 28px;
    border-radius: 2px;
    font-size: 0.85rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.25s ease;

    &:hover {
      background: #DFBA73;
      box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
    }
  }
`,R=()=>{var c,p;const[r,g]=x.useState(null);x.useEffect(()=>{window.scrollTo(0,0),b.getPageBySlug("sale-exclusions").then(i=>{var a;if(i){const t=i.draftContent||i.content;let n={};if(t)try{n=typeof t=="string"?JSON.parse(t):t}catch{n={content:t}}if((!n||Object.keys(n).length===0)&&i.content)try{n=typeof i.content=="string"?JSON.parse(i.content):i.content}catch{n={content:i.content}}g({...i,parsedContent:n}),(a=i.seoMetadata)!=null&&a.seoTitle?document.title=i.seoMetadata.seoTitle:i.title&&(document.title=`${i.title} | AethelCarats Fine Jewellery`)}}).catch(console.warn)},[]);const o=(r==null?void 0:r.parsedContent)||{},u=o.desktopImage||((c=o.pageImages)==null?void 0:c.desktopImage)||"/assets/why-aura/sale-exclusions-hero.jpg";return e.jsxs(w,{children:[e.jsxs(E,{children:[e.jsx(m,{to:"/",children:"Home"}),e.jsx(h,{size:12}),e.jsx("span",{children:"Why AethelCarats"}),e.jsx(h,{size:12}),e.jsx("span",{className:"current",children:o.heading||(r==null?void 0:r.title)||"Sale Exclusions"})]}),e.jsx(l,{yOffset:35,children:e.jsxs(A,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",style:{color:o.eyebrowColor||void 0},children:o.eyebrow||"PROMOTIONAL GUIDELINES & TERMS"}),e.jsx("h1",{style:{color:o.headingColor||void 0},children:o.heading||(r==null?void 0:r.title)||"Sale Exclusions"}),e.jsx("p",{className:"subtitle",style:{color:o.introductionColor||void 0},children:o.introduction||"Official guidelines and policy terms regarding promotional discount codes, special seasonal offers, loose certified diamonds, and bespoke custom jewellery."})]}),e.jsx("div",{className:"image-side",children:e.jsx(y,{src:u,alt:o.heading||"AethelCarats Ring on Pedestal"})})]})}),e.jsxs(v,{children:[e.jsx(l,{yOffset:35,children:e.jsxs(d,{children:[e.jsx("h2",{children:"Promotional Discount Guidelines"}),o.exclusionRules?e.jsx("p",{style:{color:o.exclusionRulesColor||void 0,whiteSpace:"pre-line"},children:o.exclusionRules}):e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"Promotional codes, seasonal offers, and storewide discounts offered by AethelCarats apply to eligible ready-to-ship fine jewellery items unless explicitly stated otherwise."}),e.jsx("p",{children:"Promotional offers cannot be combined with existing sale prices, trade-in allowances, or price-matched diamond orders. Limit one promotional code per transaction."})]})]})}),e.jsx(l,{yOffset:35,children:e.jsxs(d,{children:[e.jsx("h2",{children:"Standard Exclusions"}),o.excludedProducts||o.excludedCategories?e.jsxs(e.Fragment,{children:[o.excludedProducts&&e.jsxs("div",{style:{marginBottom:16},children:[e.jsx("h3",{style:{fontSize:"1.1rem",color:"#C9A96E",marginBottom:8},children:"Excluded Products"}),e.jsx("p",{style:{color:o.excludedProductsColor||void 0,whiteSpace:"pre-line"},children:o.excludedProducts})]}),o.excludedCategories&&e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"1.1rem",color:"#C9A96E",marginBottom:8},children:"Excluded Categories"}),e.jsx("p",{style:{color:o.excludedCategoriesColor||void 0,whiteSpace:"pre-line"},children:o.excludedCategories})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"Unless explicitly specified in a promotional campaign announcement, the following categories are excluded from discount promotional codes:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Loose Natural and Lab-Grown Diamonds."}),e.jsx("li",{children:"Custom 3D CAD Bespoke Jewellery Creations."}),e.jsx("li",{children:"Special order gemstones and rare fancy-colored diamonds."}),e.jsx("li",{children:"Gift Cards and e-Vouchers."}),e.jsx("li",{children:"Shipping, insurance, and duties charges."})]})]})]})}),(p=r==null?void 0:r.sections)==null?void 0:p.map((i,a)=>{if(i.isVisible===!1)return null;let t={};try{t=typeof i.content=="string"?JSON.parse(i.content):i.content||{}}catch{t={text:i.content}}return e.jsx(l,{yOffset:35,children:e.jsxs(d,{children:[e.jsx("h2",{children:i.title||t.title||t.heading}),t.subtitle&&e.jsx("h4",{style:{color:"#C9A96E",margin:"0 0 12px",fontSize:"1rem"},children:t.subtitle}),e.jsx("p",{style:{whiteSpace:"pre-line"},children:t.description||t.text||t.content||""})]})},i.id||a)})]}),e.jsx(l,{yOffset:35,children:e.jsx(S,{children:e.jsxs(z,{children:[e.jsx("h2",{children:"Have Questions About a Promo Code?"}),e.jsx("p",{children:"Our customer care team is available to assist you with order verification or discount eligibility."}),e.jsxs(m,{to:"/contact-us",className:"primary-btn",children:[e.jsx(j,{size:16})," CONTACT CUSTOMER CARE"]})]})})}),e.jsx(C,{})]})};export{R as SaleExclusionsPage};
