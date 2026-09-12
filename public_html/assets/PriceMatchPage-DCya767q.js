import{r as h,j as e,f as d,l as g,aG as y}from"./react-vendor-BsBv4awM.js";import{g as n}from"./ui-vendor-C0FaE403.js";import{a as j,R as s,S as C}from"./admin-pages-DCCVRAkw.js";import{W as w}from"./WhyAuraDiamondNav-BWfXuC3r.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const v=n.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`,A=n.div`
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
`,E=n.section`
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
`,I=n.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,c=n.section`
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
`,k=n.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,p=n.div`
  background: #111111;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 24px;
  border-radius: 4px;

  .num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 700;
    color: #C9A96E;
    margin-bottom: 8px;
  }

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    color: #F5F1E8;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
  }

  p {
    font-size: 0.88rem;
    color: #A8A8A8;
    line-height: 1.5;
  }
`,z=n.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,S=n.div`
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
`,F=()=>{var m,x;const[o,f]=h.useState(null);h.useEffect(()=>{window.scrollTo(0,0),j.getPageBySlug("price-match").then(t=>{var l;if(t){const r=t.draftContent||t.content;let a={};if(r)try{a=typeof r=="string"?JSON.parse(r):r}catch{a={content:r}}if((!a||Object.keys(a).length===0)&&t.content)try{a=typeof t.content=="string"?JSON.parse(t.content):t.content}catch{a={content:t.content}}f({...t,parsedContent:a}),(l=t.seoMetadata)!=null&&l.seoTitle?document.title=t.seoMetadata.seoTitle:t.title&&(document.title=`${t.title} | AethelCarats Fine Jewellery`)}}).catch(console.warn)},[]);const i=(o==null?void 0:o.parsedContent)||{},u=i.desktopImage||((m=i.pageImages)==null?void 0:m.desktopImage)||"/assets/why-aura/price-match-hero.jpg";return e.jsxs(v,{children:[e.jsxs(A,{children:[e.jsx(d,{to:"/",children:"Home"}),e.jsx(g,{size:12}),e.jsx("span",{children:"Why AethelCarats"}),e.jsx(g,{size:12}),e.jsx("span",{className:"current",children:i.heading||(o==null?void 0:o.title)||"Diamond Price Matching"})]}),e.jsx(s,{yOffset:35,children:e.jsxs(E,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",style:{color:i.eyebrowColor||void 0},children:i.eyebrow||"UNCOMPROMISING DIAMOND VALUE"}),e.jsx("h1",{style:{color:i.headingColor||void 0},children:i.heading||(o==null?void 0:o.title)||"Diamond Price Matching"}),e.jsx("p",{className:"subtitle",style:{color:i.subheadingColor||void 0},children:i.subheading||"We are dedicated to providing superior diamond quality at fair, competitive prices. If you locate an identical certified diamond offered for less by a recognized retailer, AethelCarats will match the price."}),e.jsx(d,{to:i.buttonUrl||"/contact-us",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#C9A96E",color:i.buttonTextColor||"#0B0B0B",padding:"14px 28px",borderRadius:2,fontSize:"0.85rem",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:700,textDecoration:"none"},children:i.buttonText||"REQUEST A PRICE MATCH"})]}),e.jsx("div",{className:"image-side",children:e.jsx(C,{src:u,alt:i.heading||"Loose Diamond Appraisal on Velvet Display"})})]})}),e.jsxs(I,{children:[e.jsx(s,{yOffset:35,children:e.jsxs(c,{children:[e.jsx("h2",{children:"How Price Matching Works"}),e.jsx("p",{style:{color:i.eligibilityColor||void 0},children:i.eligibility||"At AethelCarats, pricing integrity is paramount. Because we work directly with diamond sightholders and maintain direct atelier oversight, we deliver exceptional diamond value without traditional retail markups."}),e.jsx("p",{style:{color:i.verificationProcessColor||void 0},children:i.verificationProcess||"To request a price match before completing your purchase, simply submit the diamond specifications or GIA/IGI certificate number to our concierge team."}),e.jsxs(k,{children:[e.jsx(s,{delay:0,yOffset:25,children:e.jsxs(p,{children:[e.jsx("div",{className:"num",children:"01"}),e.jsx("h3",{children:"Locate Diamond"}),e.jsx("p",{children:"Find a loose diamond with identical Carat, Color, Clarity, Cut, and GIA/IGI grading report."})]})}),e.jsx(s,{delay:.1,yOffset:25,children:e.jsxs(p,{children:[e.jsx("div",{className:"num",children:"02"}),e.jsx("h3",{children:"Submit Details"}),e.jsx("p",{children:"Share the certificate number and retailer offer link with our concierge team."})]})}),e.jsx(s,{delay:.2,yOffset:25,children:e.jsxs(p,{children:[e.jsx("div",{className:"num",children:"03"}),e.jsx("h3",{children:"Review & Match"}),e.jsx("p",{children:"Our gemmologists verify like-for-like criteria and adjust your price immediately."})]})})]})]})}),e.jsx(s,{yOffset:35,children:e.jsxs(c,{children:[e.jsx("h2",{children:"Matching Eligibility Criteria"}),e.jsx("p",{style:{color:i.requirementsColor||void 0},children:i.requirements||"To ensure genuine equity, price matching applies to loose certified diamonds meeting these like-for-like standards:"}),i.excludedProducts?e.jsx("p",{style:{color:i.excludedProductsColor||void 0},children:i.excludedProducts}):e.jsxs("ul",{children:[e.jsx("li",{children:"Must have identical 4Cs (Carat, Color, Clarity, Cut) and proportions."}),e.jsx("li",{children:"Must possess an authentic GIA or IGI grading report."}),e.jsx("li",{children:"Must be currently in stock and available for immediate purchase from an authorized retailer."}),e.jsx("li",{children:"Applies prior to diamond order placement."})]})]})}),(x=o==null?void 0:o.sections)==null?void 0:x.map((t,l)=>{if(t.isVisible===!1)return null;let r={};try{r=typeof t.content=="string"?JSON.parse(t.content):t.content||{}}catch{r={text:t.content}}return e.jsx(s,{yOffset:35,children:e.jsxs(c,{children:[e.jsx("h2",{children:t.title||r.title||r.heading}),r.subtitle&&e.jsx("h4",{style:{color:"#C9A96E",margin:"0 0 12px",fontSize:"1rem"},children:r.subtitle}),e.jsx("p",{style:{whiteSpace:"pre-line"},children:r.description||r.text||r.content||""})]})},t.id||l)})]}),e.jsx(s,{yOffset:35,children:e.jsx(z,{children:e.jsxs(S,{children:[e.jsx("h2",{children:"Ready to Verify a Diamond Price?"}),e.jsx("p",{children:"Contact our jewellery concierge with your target diamond details for an instant price evaluation."}),e.jsxs(d,{to:i.buttonUrl||"/contact-us",className:"primary-btn",children:[e.jsx(y,{size:16})," ",i.buttonText?`SUBMIT: ${i.buttonText}`:"SUBMIT PRICE MATCH REQUEST"]})]})})}),e.jsx(w,{})]})};export{F as PriceMatchPage};
