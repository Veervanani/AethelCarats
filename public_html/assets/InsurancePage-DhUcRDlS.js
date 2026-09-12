import{r as x,j as e,f as c,l as h,a3 as j,v as b,aG as C}from"./react-vendor-BQZO0c5l.js";import{g as n}from"./ui-vendor-Bs2yixgz.js";import{a as w,R as s,S as v}from"./admin-pages-CFpKmMlb.js";import{W as A}from"./WhyAuraDiamondNav-BH7wMw0-.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const E=n.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`,I=n.div`
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
`,z=n.section`
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
`,S=n.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,d=n.section`
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
`,O=n.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,g=n.div`
  background: #111111;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 24px;
  border-radius: 4px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    color: #F5F1E8;
    letter-spacing: 0.06em;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    font-size: 0.9rem;
    color: #A8A8A8;
    line-height: 1.6;
  }
`,k=n.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,B=n.div`
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
`,W=()=>{var p,m;const[o,u]=x.useState(null);x.useEffect(()=>{window.scrollTo(0,0),w.getPageBySlug("insurance").then(i=>{var l;if(i){const r=i.draftContent||i.content;let a={};if(r)try{a=typeof r=="string"?JSON.parse(r):r}catch{a={content:r}}if((!a||Object.keys(a).length===0)&&i.content)try{a=typeof i.content=="string"?JSON.parse(i.content):i.content}catch{a={content:i.content}}u({...i,parsedContent:a}),(l=i.seoMetadata)!=null&&l.seoTitle?document.title=i.seoMetadata.seoTitle:i.title&&(document.title=`${i.title} | AethelCarats Fine Jewellery`)}}).catch(console.warn)},[]);const t=(o==null?void 0:o.parsedContent)||{},f=t.desktopImage||((p=t.pageImages)==null?void 0:p.desktopImage)||"/assets/why-aura/insurance-hero.jpg";return e.jsxs(E,{children:[e.jsxs(I,{children:[e.jsx(c,{to:"/",children:"Home"}),e.jsx(h,{size:12}),e.jsx("span",{children:"Why AethelCarats"}),e.jsx(h,{size:12}),e.jsx("span",{className:"current",children:t.heading||(o==null?void 0:o.title)||"Jewellery Insurance"})]}),e.jsx(s,{yOffset:35,children:e.jsxs(z,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",style:{color:t.eyebrowColor||void 0},children:t.eyebrow||"PROTECTING YOUR PRECIOUS CREATIONS"}),e.jsx("h1",{style:{color:t.headingColor||void 0},children:t.heading||(o==null?void 0:o.title)||"Jewellery Insurance"}),e.jsx("p",{className:"subtitle",style:{color:t.introductionColor||void 0},children:t.introduction||"Your fine jewellery represents both sentimental devotion and enduring financial value. We assist you with official appraisal documentation and GIA/IGI certificates to simplify insurance coverage."}),e.jsx(c,{to:"/contact-us",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#C9A96E",color:"#0B0B0B",padding:"14px 28px",borderRadius:2,fontSize:"0.85rem",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:700,textDecoration:"none"},children:"REQUEST APPRAISAL DOCUMENTATION"})]}),e.jsx("div",{className:"image-side",children:e.jsx(v,{src:f,alt:t.heading||"Fine Diamond Necklace in Vault Display Case"})})]})}),e.jsxs(S,{children:[e.jsx(s,{yOffset:35,children:e.jsxs(d,{children:[e.jsx("h2",{children:"Official Valuation & Appraisal"}),e.jsx("p",{style:{color:t.insuranceInformationColor||void 0},children:t.insuranceInformation||"While AethelCarats provides comprehensive transit insurance until your purchase is delivered, personal jewellery insurance protects your piece against loss, theft, or damage throughout your lifetime."}),e.jsx("p",{style:{color:t.coverageColor||void 0},children:t.coverage||"To help you secure comprehensive coverage from specialized jewellery insurers, AethelCarats provides complimentary official appraisal documentation for fine jewellery pieces."}),e.jsxs(O,{children:[e.jsx(s,{delay:0,yOffset:25,children:e.jsxs(g,{children:[e.jsxs("h3",{children:[e.jsx(j,{size:18,color:"#C9A96E"})," Valuation Documents"]}),e.jsx("p",{children:"Detailed itemized description including metal gram weight, diamond carat weight, cut grade, color, and retail replacement value."})]})}),e.jsx(s,{delay:.1,yOffset:25,children:e.jsxs(g,{children:[e.jsxs("h3",{children:[e.jsx(b,{size:18,color:"#C9A96E"})," Independent Certificates"]}),e.jsx("p",{children:"Original GIA or IGI diamond grading reports verifying laser inscriptions and stone micro-details."})]})})]})]})}),e.jsx(s,{yOffset:35,children:e.jsxs(d,{children:[e.jsx("h2",{children:"Recommended Insurance Steps"}),e.jsx("p",{style:{color:t.claimsColor||void 0},children:t.claims||"Securing specialized jewellery insurance is quick and straightforward:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Request your AethelCarats appraisal valuation document upon order completion."}),e.jsx("li",{children:"Submit the valuation and diamond certificate to your insurance provider."}),e.jsx("li",{children:"Ensure coverage includes worldwide protection against loss, theft, damage, and mysterious disappearance."})]})]})}),(m=o==null?void 0:o.sections)==null?void 0:m.map((i,l)=>{if(i.isVisible===!1)return null;let r={};try{r=typeof i.content=="string"?JSON.parse(i.content):i.content||{}}catch{r={text:i.content}}return e.jsx(s,{yOffset:35,children:e.jsxs(d,{children:[e.jsx("h2",{children:i.title||r.title||r.heading}),r.subtitle&&e.jsx("h4",{style:{color:"#C9A96E",margin:"0 0 12px",fontSize:"1rem"},children:r.subtitle}),e.jsx("p",{style:{whiteSpace:"pre-line"},children:r.description||r.text||r.content||""})]})},i.id||l)})]}),e.jsx(s,{yOffset:35,children:e.jsx(k,{children:e.jsxs(B,{children:[e.jsx("h2",{children:"Need an Insurance Valuation Report?"}),e.jsx("p",{children:"Contact our Customer Care team to receive a duplicate copy of your item's appraisal documentation."}),e.jsxs(c,{to:"/contact-us",className:"primary-btn",children:[e.jsx(C,{size:16})," REQUEST APPRAISAL COPY"]})]})})}),e.jsx(A,{})]})};export{W as InsurancePage};
