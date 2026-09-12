import{r as m,j as e,f as d,l as g,g as b,v as j,aR as C,aG as w}from"./react-vendor-BsBv4awM.js";import{g as n}from"./ui-vendor-C0FaE403.js";import{a as A,R as a,S as v}from"./admin-pages-DCCVRAkw.js";import{W as E}from"./WhyAuraDiamondNav-BWfXuC3r.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const S=n.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`,k=n.div`
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
`,O=n.main`
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
`,B=n.div`
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

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #151515;
    border: 1px solid rgba(140, 116, 75, 0.3);
    color: #C9A96E;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
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
`,D=n.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,I=n.div`
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
`,L=()=>{var h,x;const[o,f]=m.useState(null);m.useEffect(()=>{window.scrollTo(0,0),A.getPageBySlug("about-us").then(r=>{var l;if(r){const t=r.draftContent||r.content;let s={};if(t)try{s=typeof t=="string"?JSON.parse(t):t}catch{s={content:t}}if((!s||Object.keys(s).length===0)&&r.content)try{s=typeof r.content=="string"?JSON.parse(r.content):r.content}catch{s={content:r.content}}f({...r,parsedContent:s}),(l=r.seoMetadata)!=null&&l.seoTitle?document.title=r.seoMetadata.seoTitle:r.title&&(document.title=`${r.title} | AethelCarats Fine Jewellery`)}}).catch(console.warn)},[]);const i=(o==null?void 0:o.parsedContent)||{},u=i.desktopImage||((h=i.pageImages)==null?void 0:h.desktopImage)||"/assets/why-aura/about-us-hero.jpg";return e.jsxs(S,{children:[e.jsxs(k,{children:[e.jsx(d,{to:"/",children:"Home"}),e.jsx(g,{size:12}),e.jsx("span",{children:"About AethelCarats"}),e.jsx(g,{size:12}),e.jsx("span",{className:"current",children:i.heading||(o==null?void 0:o.title)||"Quality & Value"})]}),e.jsx(a,{yOffset:35,children:e.jsxs(z,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",style:{color:i.eyebrowColor||void 0},children:i.eyebrow||"OUR HERITAGE & ATELIER PHILOSOPHY"}),e.jsx("h1",{style:{color:i.headingColor||void 0},children:i.heading||(o==null?void 0:o.title)||"Quality & Value"}),e.jsx("p",{className:"subtitle",style:{color:i.subheadingColor||i.introductionColor||void 0},children:i.subheading||i.introduction||"Luxury jewellery should feel exceptional in every detail. AethelCarats bridges master artisanal goldsmithing with direct diamond sightholder sourcing to deliver uncompromised quality without traditional retail inflation."}),e.jsx(d,{to:"/collections",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#C9A96E",color:"#0B0B0B",padding:"14px 28px",borderRadius:2,fontSize:"0.85rem",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:700,textDecoration:"none"},children:"DISCOVER THE COLLECTION"})]}),e.jsx("div",{className:"image-side",children:e.jsx(v,{src:u,alt:i.heading||"Master Jeweller Setting Diamond in Atelier"})})]})}),e.jsxs(O,{children:[e.jsx(a,{yOffset:35,children:e.jsxs(c,{children:[e.jsx("h2",{children:"The AethelCarats Atelier Standard"}),e.jsx("p",{style:{color:i.brandStoryColor||void 0},children:i.brandStory||"Founded on the belief that fine jewellery should be timeless, transparent, and personally meaningful, AethelCarats creates solitaire rings, tennis bracelets, high-jewellery necklaces, and bespoke heirlooms."}),e.jsx("p",{style:{color:i.ourValuesColor||void 0},children:i.ourValues||"Every piece is forged in solid 14K Gold, 18K Gold, or Platinum 950, and set with hand-selected certified diamonds verified for superior brilliance, symmetry, and fire."}),e.jsxs(B,{children:[e.jsx(a,{delay:0,yOffset:25,children:e.jsxs(p,{children:[e.jsx("div",{className:"icon",children:e.jsx(b,{size:20})}),e.jsx("h3",{children:"Master Craftsmanship"}),e.jsx("p",{style:{color:i.craftsmanshipColor||void 0},children:i.craftsmanship||"Hand-finished settings, secure prongs, and meticulous CAD modeling by expert jewellers."})]})}),e.jsx(a,{delay:.1,yOffset:25,children:e.jsxs(p,{children:[e.jsx("div",{className:"icon",children:e.jsx(j,{size:20})}),e.jsx("h3",{children:"GIA & IGI Certified"}),e.jsx("p",{style:{color:i.diamondsColor||void 0},children:i.diamonds||"Every major diamond carries an independent certificate verifying carat, color, clarity, and cut."})]})}),e.jsx(a,{delay:.2,yOffset:25,children:e.jsxs(p,{children:[e.jsx("div",{className:"icon",children:e.jsx(C,{size:20})}),e.jsx("h3",{children:"Direct Sightholder Value"}),e.jsx("p",{style:{color:i.manufacturingColor||void 0},children:i.manufacturing||"Ethical direct sourcing eliminates unnecessary middleman markups for honest luxury pricing."})]})})]})]})}),e.jsx(a,{yOffset:35,children:e.jsxs(c,{children:[e.jsx("h2",{children:"Bespoke Personalization & Concierge"}),e.jsx("p",{style:{color:i.whyAuraDiamondColor||void 0},children:i.whyAuraDiamond||"Whether searching for the perfect diamond engagement ring or designing a custom heirloom from reference sketches, our dedicated Jewellery Concierge guides you through every decision."}),e.jsx("p",{children:"We offer complimentary 3D CAD renders, custom diamond sourcing, fully-insured global shipping, and a limited lifetime warranty on every piece."})]})}),(x=o==null?void 0:o.sections)==null?void 0:x.map((r,l)=>{if(r.isVisible===!1)return null;let t={};try{t=typeof r.content=="string"?JSON.parse(r.content):r.content||{}}catch{t={text:r.content}}return e.jsx(a,{yOffset:35,children:e.jsxs(c,{children:[e.jsx("h2",{children:r.title||t.title||t.heading}),t.subtitle&&e.jsx("h4",{style:{color:"#C9A96E",margin:"0 0 12px",fontSize:"1rem"},children:t.subtitle}),e.jsx("p",{style:{whiteSpace:"pre-line"},children:t.description||t.text||t.content||""})]})},r.id||l)})]}),e.jsx(a,{yOffset:35,children:e.jsx(D,{children:e.jsxs(I,{children:[e.jsx("h2",{children:"Experience AethelCarats Luxury"}),e.jsx("p",{children:"Speak with a diamond specialist or browse our curated collection of fine jewellery."}),e.jsxs(d,{to:"/contact-us",className:"primary-btn",children:[e.jsx(w,{size:16})," SPEAK WITH OUR CONCIERGE"]})]})})}),e.jsx(E,{})]})};export{L as AboutUsPage};
