import{r as m,j as e,f as l,l as x,v as b,b2 as y,$ as j,aG as w}from"./react-vendor-BsBv4awM.js";import{g as t}from"./ui-vendor-C0FaE403.js";import{a as C,R as a,S as v}from"./admin-pages-COWs66LI.js";import{W as A}from"./WhyAuraDiamondNav-Cut7z1Pa.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const E=t.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`,I=t.div`
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
`,z=t.section`
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
`,F=t.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,h=t.section`
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
`,D=t.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,d=t.div`
  background: #111111;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 24px;
  border-radius: 4px;

  .icon-box {
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
    margin-bottom: 8px;
  }

  p {
    font-size: 0.88rem;
    color: #A8A8A8;
    line-height: 1.6;
  }
`,O=t.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,S=t.div`
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
`,P=()=>{var c;const[r,g]=m.useState(null);m.useEffect(()=>{window.scrollTo(0,0),C.getPageBySlug("sustainability").then(o=>{var p;if(o){const s=o.draftContent||o.content;let n={};if(s)try{n=typeof s=="string"?JSON.parse(s):s}catch{n={content:s}}if((!n||Object.keys(n).length===0)&&o.content)try{n=typeof o.content=="string"?JSON.parse(o.content):o.content}catch{n={content:o.content}}g({...o,parsedContent:n}),(p=o.seoMetadata)!=null&&p.seoTitle?document.title=o.seoMetadata.seoTitle:o.title&&(document.title=`${o.title} | AethelCarats Fine Jewellery`)}}).catch(console.warn)},[]);const i=(r==null?void 0:r.parsedContent)||{},f=i.desktopImage||((c=i.pageImages)==null?void 0:c.desktopImage)||"/assets/why-aura/sustainability-hero.jpg";return e.jsxs(E,{children:[e.jsxs(I,{children:[e.jsx(l,{to:"/",children:"Home"}),e.jsx(x,{size:12}),e.jsx("span",{children:"Why AethelCarats"}),e.jsx(x,{size:12}),e.jsx("span",{className:"current",children:i.heading||(r==null?void 0:r.title)||"Conflict Free Diamonds"})]}),e.jsx(a,{yOffset:35,children:e.jsxs(z,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",style:{color:i.eyebrowColor||void 0},children:i.eyebrow||"ETHICAL RESPONSIBILITY & COMMITMENT"}),e.jsx("h1",{style:{color:i.headingColor||void 0},children:i.heading||(r==null?void 0:r.title)||"Conflict Free Diamonds"}),e.jsx("p",{className:"subtitle",style:{color:i.introductionColor||void 0},children:i.introduction||"At AethelCarats, integrity is woven into every diamond we curate. We strictly enforce ethical sourcing standards, guarantee 100% Kimberley Process compliance, and pioneer sustainable lab-grown diamond creations."}),e.jsx(l,{to:"/diamonds",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#C9A96E",color:"#0B0B0B",padding:"14px 28px",borderRadius:2,fontSize:"0.85rem",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:700,textDecoration:"none"},children:"EXPLORE CERTIFIED DIAMONDS"})]}),e.jsx("div",{className:"image-side",children:e.jsx(v,{src:f,alt:i.heading||"Master Jeweller Inspecting Diamond under Loupe"})})]})}),e.jsxs(F,{children:[e.jsx(a,{yOffset:35,children:e.jsxs(h,{children:[e.jsx("h2",{children:"Our Ethical Sourcing Philosophy"}),e.jsx("p",{style:{color:i.conflictFreePolicyColor||void 0},children:i.conflictFreePolicy||"Fine jewellery should symbolize beauty, devotion, and lasting value—never environmental harm or human exploitation. AethelCarats is committed to working exclusively with diamond sightholders and master cutters who adhere to the strict guidance of the Kimberley Process and international human rights frameworks."}),e.jsx("p",{style:{color:i.naturalDiamondsColor||void 0},children:i.naturalDiamonds||"Whether selecting a rare natural solitaire or a precision-engineered lab-grown diamond, every gem in our collection is fully traceable to legitimate, conflict-free sources."}),e.jsxs(D,{children:[e.jsx(a,{delay:0,yOffset:25,children:e.jsxs(d,{children:[e.jsx("div",{className:"icon-box",children:e.jsx(b,{size:20})}),e.jsx("h3",{children:"100% Conflict-Free"}),e.jsx("p",{children:"Guaranteed Kimberley Process compliance for all natural diamonds without exception."})]})}),e.jsx(a,{delay:.1,yOffset:25,children:e.jsxs(d,{children:[e.jsx("div",{className:"icon-box",children:e.jsx(y,{size:20})}),e.jsx("h3",{children:"Sustainable Lab-Grown"}),e.jsx("p",{style:{color:i.labGrownDiamondsColor||void 0},children:i.labGrownDiamonds||"Pure carbon diamonds grown with renewable energy, zero mining impact, and full transparency."})]})}),e.jsx(a,{delay:.2,yOffset:25,children:e.jsxs(d,{children:[e.jsx("div",{className:"icon-box",children:e.jsx(j,{size:20})}),e.jsx("h3",{children:"Recycled Precious Metals"}),e.jsx("p",{style:{color:i.responsibleManufacturingColor||void 0},children:i.responsibleManufacturing||"Crafted using refined 100% recycled 14K & 18K solid gold."})]})})]})]})}),e.jsx(a,{yOffset:35,children:e.jsxs(h,{children:[e.jsx("h2",{children:"Natural vs. Lab-Grown Integrity"}),e.jsx("p",{children:"We believe in complete transparency. Our lab-grown diamonds possess the exact same physical, chemical, and optical properties as natural earth-mined diamonds. They are graded by independent gemmological laboratories (GIA / IGI) using identical standards for Carat, Color, Clarity, and Cut."}),e.jsx("p",{children:"By offering both choices alongside certified provenance, we empower our clients to make an informed, ethical investment that aligns with their personal values."})]})})]}),e.jsx(a,{yOffset:35,children:e.jsx(O,{children:e.jsxs(S,{children:[e.jsx("h2",{children:"Have Questions About Diamond Provenance?"}),e.jsx("p",{children:"Our gemmologists are available to provide certificate verification, laser inscription confirmation, or custom sourcing assistance."}),e.jsxs(l,{to:"/contact-us",className:"primary-btn",children:[e.jsx(w,{size:16})," SPEAK WITH OUR GEMMOLOGISTS"]})]})})}),e.jsx(A,{})]})};export{P as SustainabilityPage};
