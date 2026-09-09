import{r as h,j as e,f as d,l as g,ax as b,v as j,y as v,aG as C}from"./react-vendor-BsBv4awM.js";import{g as n}from"./ui-vendor-C0FaE403.js";import{a as w,R as a,S as E}from"./admin-pages-DXIvgMF9.js";import{W as A}from"./WhyAuraDiamondNav-D1rd2HGC.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const I=n.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`,S=n.div`
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
`,T=n.section`
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
`,k=n.main`
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
`,z=n.div`
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
`,O=n.div`
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
`,H=()=>{var x,m;const[o,u]=h.useState(null);h.useEffect(()=>{window.scrollTo(0,0),w.getPageBySlug("shipping-delivery").then(r=>{var l;if(r){const t=r.draftContent||r.content;let s={};if(t)try{s=typeof t=="string"?JSON.parse(t):t}catch{s={content:t}}if((!s||Object.keys(s).length===0)&&r.content)try{s=typeof r.content=="string"?JSON.parse(r.content):r.content}catch{s={content:r.content}}u({...r,parsedContent:s}),(l=r.seoMetadata)!=null&&l.seoTitle?document.title=r.seoMetadata.seoTitle:r.title&&(document.title=`${r.title} | AethelCarats Fine Jewellery`)}}).catch(console.warn)},[]);const i=(o==null?void 0:o.parsedContent)||{},f=i.desktopImage||((x=i.pageImages)==null?void 0:x.desktopImage)||"/assets/why-aura/shipping-delivery-hero.jpg";return e.jsxs(I,{children:[e.jsxs(S,{children:[e.jsx(d,{to:"/",children:"Home"}),e.jsx(g,{size:12}),e.jsx("span",{children:"Why AethelCarats"}),e.jsx(g,{size:12}),e.jsx("span",{className:"current",children:i.heading||(o==null?void 0:o.title)||"Free Secure Shipping"})]}),e.jsx(a,{yOffset:35,children:e.jsxs(T,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",style:{color:i.eyebrowColor||void 0},children:i.eyebrow||"WHITE-GLOVE TRANSIT & PROTECTION"}),e.jsx("h1",{style:{color:i.headingColor||void 0},children:i.heading||(o==null?void 0:o.title)||"Free Secure Shipping"}),e.jsx("p",{className:"subtitle",style:{color:i.introductionColor||void 0},children:i.introduction||"Every creation leaving our atelier is delivered with complete discretion, 100% transit insurance, and complimentary express courier dispatch worldwide."}),e.jsx(d,{to:"/contact-us",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#C9A96E",color:"#0B0B0B",padding:"14px 28px",borderRadius:2,fontSize:"0.85rem",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:700,textDecoration:"none"},children:"DISCUSS DELIVERY OPTIONS"})]}),e.jsx("div",{className:"image-side",children:e.jsx(E,{src:f,alt:i.heading||"AethelCarats Luxury Packaging Box"})})]})}),e.jsxs(k,{children:[e.jsx(a,{yOffset:35,children:e.jsxs(c,{children:[e.jsx("h2",{children:"Discreet & Fully Insured Delivery"}),e.jsx("p",{style:{color:i.processingTimeColor||void 0},children:i.processingTime?`Order Processing: ${i.processingTime}`:"We understand that fine jewellery is often purchased as a surprise proposal or special anniversary gift. To preserve secrecy, all parcels are dispatched in unbranded, non-descript outer packaging that gives no indication of the valuable contents inside."}),e.jsx("p",{style:{color:i.deliveryTimeColor||void 0},children:i.deliveryTime?`Estimated Delivery Time: ${i.deliveryTime}`:"Inside the outer box, your item is housed in our signature illuminated leatherette presentation case, complete with diamond certificates and care guides."}),e.jsxs(z,{children:[e.jsx(a,{delay:0,yOffset:25,children:e.jsxs(p,{children:[e.jsx("div",{className:"icon",children:e.jsx(b,{size:20})}),e.jsx("h3",{children:"Complimentary Express"}),e.jsx("p",{style:{color:i.courierInformationColor||void 0},children:i.courierInformation?`Partners: ${i.courierInformation}`:"Free express courier dispatch on all fine jewellery orders worldwide."})]})}),e.jsx(a,{delay:.1,yOffset:25,children:e.jsxs(p,{children:[e.jsx("div",{className:"icon",children:e.jsx(j,{size:20})}),e.jsx("h3",{children:"100% Transit Insured"}),e.jsx("p",{style:{color:i.insuranceInformationColor||void 0},children:i.insuranceInformation||"Fully covered from our vault until signed for at your address."})]})}),e.jsx(a,{delay:.2,yOffset:25,children:e.jsxs(p,{children:[e.jsx("div",{className:"icon",children:e.jsx(v,{size:20})}),e.jsx("h3",{children:"Signature Required"}),e.jsx("p",{style:{color:i.signatureRequirementColor||void 0},children:i.signatureRequirement||"Delivered strictly with direct adult signature verification."})]})})]})]})}),e.jsx(a,{yOffset:35,children:e.jsxs(c,{children:[e.jsx("h2",{children:"International Shipping & Customs"}),e.jsx("p",{style:{color:i.customsInformationColor||void 0},children:i.customsInformation||"We ship to over 50 countries worldwide including the United Kingdom, United States, Canada, Europe, Australia, and the UAE. International shipments are handled by premium global couriers (FedEx, DHL Express, Armored Courier)."}),e.jsx("p",{children:"Detailed tracking numbers are provided immediately upon dispatch so you can trace your parcel in real-time."})]})}),(m=o==null?void 0:o.sections)==null?void 0:m.map((r,l)=>{if(r.isVisible===!1)return null;let t={};try{t=typeof r.content=="string"?JSON.parse(r.content):r.content||{}}catch{t={text:r.content}}return e.jsx(a,{yOffset:35,children:e.jsxs(c,{children:[e.jsx("h2",{children:r.title||t.title||t.heading}),t.subtitle&&e.jsx("h4",{style:{color:"#C9A96E",margin:"0 0 12px",fontSize:"1rem"},children:t.subtitle}),e.jsx("p",{style:{whiteSpace:"pre-line"},children:t.description||t.text||t.content||""})]})},r.id||l)})]}),e.jsx(a,{yOffset:35,children:e.jsx(D,{children:e.jsxs(O,{children:[e.jsx("h2",{children:"Planning a Proposal Delivery?"}),e.jsx("p",{children:"Speak with our concierge to coordinate hold-for-pickup at secure local courier depots or customized delivery timing."}),e.jsxs(d,{to:"/contact-us",className:"primary-btn",children:[e.jsx(C,{size:16})," COORDINATE WITH CONCIERGE"]})]})})}),e.jsx(A,{})]})};export{H as ShippingDeliveryPage};
