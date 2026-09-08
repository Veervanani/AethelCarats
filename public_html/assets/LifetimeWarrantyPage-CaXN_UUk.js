import{r as p,j as e,f as l,l as m,ag as y,aR as b,aG as j}from"./react-vendor-BsBv4awM.js";import{g as o}from"./ui-vendor-C0FaE403.js";import{a as C,R as a,S as w}from"./admin-pages-BM_sro6k.js";import{W as v}from"./WhyAuraDiamondNav-Dprt2BeB.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const A=o.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`,E=o.div`
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
`,z=o.section`
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
`,B=o.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,x=o.section`
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
`,S=o.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,g=o.div`
  background: #111111;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 24px;
  border-radius: 4px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    color: #F5F1E8;
    letter-spacing: 0.06em;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    font-size: 0.9rem;
    color: #A8A8A8;
    line-height: 1.6;
  }
`,F=o.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,N=o.div`
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
`,O=()=>{var c;const[i,h]=p.useState(null);p.useEffect(()=>{window.scrollTo(0,0),C.getPageBySlug("lifetime-warranty").then(t=>{var d;if(t){const s=t.draftContent||t.content;let n={};if(s)try{n=typeof s=="string"?JSON.parse(s):s}catch{n={content:s}}if((!n||Object.keys(n).length===0)&&t.content)try{n=typeof t.content=="string"?JSON.parse(t.content):t.content}catch{n={content:t.content}}h({...t,parsedContent:n}),(d=t.seoMetadata)!=null&&d.seoTitle?document.title=t.seoMetadata.seoTitle:t.title&&(document.title=`${t.title} | AethelCarats Fine Jewellery`)}}).catch(console.warn)},[]);const r=(i==null?void 0:i.parsedContent)||{},f=r.desktopImage||((c=r.pageImages)==null?void 0:c.desktopImage)||"/assets/why-aura/lifetime-warranty-hero.jpg";return e.jsxs(A,{children:[e.jsxs(E,{children:[e.jsx(l,{to:"/",children:"Home"}),e.jsx(m,{size:12}),e.jsx("span",{children:"Why AethelCarats"}),e.jsx(m,{size:12}),e.jsx("span",{className:"current",children:r.heading||(i==null?void 0:i.title)||"Lifetime Warranty"})]}),e.jsx(a,{yOffset:35,children:e.jsxs(z,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",style:{color:r.eyebrowColor||void 0},children:r.eyebrow||"GUARANTEED CRAFTSMANSHIP"}),e.jsx("h1",{style:{color:r.headingColor||void 0},children:r.heading||(i==null?void 0:i.title)||"Lifetime Warranty"}),e.jsx("p",{className:"subtitle",style:{color:r.introductionColor||void 0},children:r.subheading||r.introduction||"Every piece created by AethelCarats is hand-crafted to exacting standards. We proudly stand behind our master goldsmiths with a complimentary Lifetime Warranty against manufacturing defects."}),e.jsx(l,{to:"/contact-us",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#C9A96E",color:"#0B0B0B",padding:"14px 28px",borderRadius:2,fontSize:"0.85rem",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:700,textDecoration:"none"},children:"REQUEST WARRANTY ASSISTANCE"})]}),e.jsx("div",{className:"image-side",children:e.jsx(w,{src:f,alt:r.heading||"Master Jeweller Polishing Diamond Ring"})})]})}),e.jsxs(B,{children:[e.jsx(a,{yOffset:35,children:e.jsxs(x,{children:[e.jsx("h2",{children:"Our Quality Guarantee"}),e.jsx("p",{style:{color:r.coverageColor||void 0},children:r.coverage||"When you purchase fine jewellery from AethelCarats, your piece is inspected through multi-point gemmological protocols. We guarantee that your item is free from manufacturing defects in structure, setting, and metal casting at the time of delivery."}),e.jsx("p",{style:{color:r.claimProcessColor||void 0},children:r.claimProcess||"If you ever believe your item has a manufacturing defect, send it to our atelier for expert inspection. If a defect is confirmed, we will repair or replace the item free of charge."}),e.jsxs(S,{children:[e.jsx(a,{delay:0,yOffset:25,children:e.jsxs(g,{children:[e.jsxs("h3",{children:[e.jsx(y,{size:18,color:"#C9A96E"})," What Is Covered"]}),e.jsx("p",{style:{color:r.whatsIncludedColor||void 0},children:r.whatsIncluded||"Manufacturing defects in metal casting, prong alignment, channel settings, solder joints, and structural integrity under normal wear."})]})}),e.jsx(a,{delay:.1,yOffset:25,children:e.jsxs(g,{children:[e.jsxs("h3",{children:[e.jsx(b,{size:18,color:"#C9A96E"})," Complimentary Services"]}),e.jsx("p",{children:"Complimentary annual prong tightening, stone inspection, steam cleaning, and rhodium polishing at our atelier."})]})})]})]})}),e.jsx(a,{yOffset:35,children:e.jsxs(x,{children:[e.jsx("h2",{children:"Care & Maintenance Guidance"}),e.jsx("p",{style:{color:r.whatsExcludedColor||void 0},children:r.whatsExcluded||"Fine jewellery is crafted from precious metals that can naturally experience wear over time. Normal wear and tear, accidental damage, loss of stones due to impact, or repairs performed by third-party jewellers are not covered under warranty."}),e.jsx("p",{children:"We recommend scheduling an annual inspection with our concierge to ensure prongs remain taut and settings remain secure."})]})})]}),e.jsx(a,{yOffset:35,children:e.jsx(F,{children:e.jsxs(N,{children:[e.jsx("h2",{children:"Need Maintenance or Repair Assistance?"}),e.jsx("p",{children:"Contact our Customer Care team to schedule your complimentary annual jewellery inspection or service."}),e.jsxs(l,{to:"/contact-us",className:"primary-btn",children:[e.jsx(j,{size:16})," CONTACT CUSTOMER CARE"]})]})})}),e.jsx(v,{})]})};export{O as LifetimeWarrantyPage};
