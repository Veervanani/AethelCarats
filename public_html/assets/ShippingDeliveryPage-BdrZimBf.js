import{r as s,j as e,f as t,l as n,ax as d,v as l,y as c,aG as p}from"./react-vendor-BsBv4awM.js";import{g as r}from"./ui-vendor-C0FaE403.js";import{R as i,S as x}from"./admin-pages-DDF5_dHZ.js";import{W as m}from"./WhyAuraDiamondNav-BnF4jfae.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const h=r.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`,g=r.div`
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
`,u=r.section`
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
`,f=r.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,o=r.section`
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
`,b=r.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,a=r.div`
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
`,j=r.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,y=r.div`
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
`,D=()=>(s.useEffect(()=>{document.title="Free Secure Shipping | AethelCarats Fine Jewellery"},[]),e.jsxs(h,{children:[e.jsxs(g,{children:[e.jsx(t,{to:"/",children:"Home"}),e.jsx(n,{size:12}),e.jsx("span",{children:"Why AethelCarats"}),e.jsx(n,{size:12}),e.jsx("span",{className:"current",children:"Free Secure Shipping"})]}),e.jsx(i,{yOffset:35,children:e.jsxs(u,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",children:"WHITE-GLOVE TRANSIT & PROTECTION"}),e.jsx("h1",{children:"Free Secure Shipping"}),e.jsx("p",{className:"subtitle",children:"Every creation leaving our atelier is delivered with complete discretion, 100% transit insurance, and complimentary express courier dispatch worldwide."}),e.jsx(t,{to:"/contact-us",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#C9A96E",color:"#0B0B0B",padding:"14px 28px",borderRadius:2,fontSize:"0.85rem",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:700,textDecoration:"none"},children:"DISCUSS DELIVERY OPTIONS"})]}),e.jsx("div",{className:"image-side",children:e.jsx(x,{src:"/assets/why-aura/shipping-delivery-hero.jpg",alt:"AethelCarats Luxury Packaging Box"})})]})}),e.jsxs(f,{children:[e.jsx(i,{yOffset:35,children:e.jsxs(o,{children:[e.jsx("h2",{children:"Discreet & Fully Insured Delivery"}),e.jsx("p",{children:"We understand that fine jewellery is often purchased as a surprise proposal or special anniversary gift. To preserve secrecy, all parcels are dispatched in unbranded, non-descript outer packaging that gives no indication of the valuable contents inside."}),e.jsx("p",{children:"Inside the outer box, your item is housed in our signature illuminated leatherette presentation case, complete with diamond certificates and care guides."}),e.jsxs(b,{children:[e.jsx(i,{delay:0,yOffset:25,children:e.jsxs(a,{children:[e.jsx("div",{className:"icon",children:e.jsx(d,{size:20})}),e.jsx("h3",{children:"Complimentary Express"}),e.jsx("p",{children:"Free express courier dispatch on all fine jewellery orders worldwide."})]})}),e.jsx(i,{delay:.1,yOffset:25,children:e.jsxs(a,{children:[e.jsx("div",{className:"icon",children:e.jsx(l,{size:20})}),e.jsx("h3",{children:"100% Transit Insured"}),e.jsx("p",{children:"Fully covered from our vault until signed for at your address."})]})}),e.jsx(i,{delay:.2,yOffset:25,children:e.jsxs(a,{children:[e.jsx("div",{className:"icon",children:e.jsx(c,{size:20})}),e.jsx("h3",{children:"Signature Required"}),e.jsx("p",{children:"Delivered strictly with direct adult signature verification."})]})})]})]})}),e.jsx(i,{yOffset:35,children:e.jsxs(o,{children:[e.jsx("h2",{children:"International Shipping & Customs"}),e.jsx("p",{children:"We ship to over 50 countries worldwide including the United Kingdom, United States, Canada, Europe, Australia, and the UAE. International shipments are handled by premium global couriers (FedEx, DHL Express, Armored Courier)."}),e.jsx("p",{children:"Detailed tracking numbers are provided immediately upon dispatch so you can trace your parcel in real-time."})]})})]}),e.jsx(i,{yOffset:35,children:e.jsx(j,{children:e.jsxs(y,{children:[e.jsx("h2",{children:"Need Delivery Assistance or Hold For Pick-Up?"}),e.jsx("p",{children:"Our concierge can arrange delivery to a local FedEx/DHL hold facility for secret proposal planning."}),e.jsxs(t,{to:"/contact-us",className:"primary-btn",children:[e.jsx(p,{size:16})," CONTACT DELIVERY CONCIERGE"]})]})})}),e.jsx(m,{})]}));export{D as ShippingDeliveryPage};
