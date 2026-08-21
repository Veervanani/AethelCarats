import{r as d,j as e,e as t,l as s,v as l,w as c,aE as p,aC as m}from"./react-vendor-BSubOYpr.js";import{g as i}from"./ui-vendor-C-kywwZi.js";import{S as h}from"./admin-pages-D6Our18J.js";import{W as x}from"./WhyFloksyJewelNav-BZ3hxkts.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const g=i.div`
  background-color: #f7f6f2;
  color: #1a1918;
  min-height: 100vh;
  padding-bottom: 80px;
`,u=i.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 24px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #77736c;

  a {
    color: #77736c;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #c9a45c;
    }
  }

  span.current {
    color: #1a1918;
    font-weight: 500;
  }
`,f=i.section`
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
      color: #c9a45c;
      font-weight: 600;
      margin-bottom: 12px;
      display: block;
    }

    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3.2rem;
      font-weight: 500;
      color: #1a1918;
      margin-bottom: 20px;
      letter-spacing: -0.01em;
      line-height: 1.1;

      @media (max-width: 768px) {
        font-size: 2.3rem;
      }
    }

    p.subtitle {
      font-size: 1.05rem;
      color: #55524d;
      line-height: 1.7;
      margin-bottom: 28px;
    }
  }

  .image-side {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);

    img {
      width: 100%;
      height: 420px;
      object-fit: cover;

      @media (max-width: 768px) {
        height: 280px;
      }
    }
  }
`,y=i.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,a=i.section`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  padding: 36px;
  border-radius: 4px;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    font-weight: 500;
    color: #1a1918;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e8e3d9;
  }

  p {
    font-size: 0.95rem;
    color: #55524d;
    line-height: 1.7;
    margin-bottom: 14px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul {
    margin: 12px 0 16px 20px;
    color: #55524d;
    font-size: 0.95rem;

    li {
      margin-bottom: 8px;
      line-height: 1.6;
    }
  }
`,j=i.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,n=i.div`
  background: #f9f7f2;
  border: 1px solid #e8e3d9;
  padding: 24px;
  border-radius: 4px;

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #1a1918;
    color: #c9a45c;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    color: #1a1918;
    margin-bottom: 6px;
  }

  p {
    font-size: 0.88rem;
    color: #55524d;
    line-height: 1.5;
  }
`,b=i.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,w=i.div`
  background: #1a1918;
  color: #fffdf9;
  padding: 40px;
  border-radius: 4px;
  text-align: center;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    color: #fffdf9;
    margin-bottom: 12px;
  }

  p {
    color: #d9d3c7;
    font-size: 0.95rem;
    max-width: 540px;
    margin: 0 auto 24px;
    line-height: 1.6;
  }

  a.primary-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #c9a45c;
    color: #1a1918;
    padding: 14px 28px;
    border-radius: 4px;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background: #fffdf9;
    }
  }
`,I=()=>(d.useEffect(()=>{document.title="Free Secure Shipping | Floksy Jewel";const o=document.querySelector('meta[name="description"]');o&&o.setAttribute("content","Floksy Jewel offers complimentary fully-insured express shipping worldwide. Learn about discreet packaging, transit insurance, and tracking.");const r=document.createElement("script");return r.type="application/ld+json",r.innerHTML=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":"https://floksyjewel.com/shipping-delivery#webpage",url:"https://floksyjewel.com/shipping-delivery",name:"Free Secure Shipping & Global Delivery | Floksy Jewel",description:"Complimentary fully-insured global courier shipping with discreet packaging and signature verification."},{"@type":"BreadcrumbList","@id":"https://floksyjewel.com/shipping-delivery#breadcrumb",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://floksyjewel.com"},{"@type":"ListItem",position:2,name:"Why Floksy Jewel",item:"https://floksyjewel.com/shipping-delivery"},{"@type":"ListItem",position:3,name:"Free Secure Shipping",item:"https://floksyjewel.com/shipping-delivery"}]}]}),document.head.appendChild(r),()=>{document.head.removeChild(r)}},[]),e.jsxs(g,{children:[e.jsxs(u,{children:[e.jsx(t,{to:"/",children:"Home"}),e.jsx(s,{size:12}),e.jsx("span",{children:"Why Floksy Jewel"}),e.jsx(s,{size:12}),e.jsx("span",{className:"current",children:"Free Secure Shipping"})]}),e.jsxs(f,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",children:"WHITE-GLOVE TRANSIT & PROTECTION"}),e.jsx("h1",{children:"Free Secure Shipping"}),e.jsx("p",{className:"subtitle",children:"Every creation leaving our atelier is delivered with complete discretion, 100% transit insurance, and complimentary express courier dispatch worldwide."}),e.jsx(t,{to:"/contact-us",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#1a1918",color:"#fffdf9",padding:"14px 28px",borderRadius:4,fontSize:"0.85rem",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,textDecoration:"none"},children:"DISCUSS DELIVERY OPTIONS"})]}),e.jsx("div",{className:"image-side",children:e.jsx(h,{src:"/assets/why-floksy/shipping-delivery-hero.jpg",alt:"Floksy Jewel Luxury Packaging Box"})})]}),e.jsxs(y,{children:[e.jsxs(a,{children:[e.jsx("h2",{children:"Discreet & Fully Insured Delivery"}),e.jsx("p",{children:"We understand that fine jewellery is often purchased as a surprise proposal or special anniversary gift. To preserve secrecy, all parcels are dispatched in unbranded, non-descript outer packaging that gives no indication of the valuable contents inside."}),e.jsx("p",{children:"Inside the outer box, your item is housed in our signature illuminated leatherette presentation case, complete with diamond certificates and care guides."}),e.jsxs(j,{children:[e.jsxs(n,{children:[e.jsx("div",{className:"icon",children:e.jsx(l,{size:20})}),e.jsx("h3",{children:"Complimentary Express"}),e.jsx("p",{children:"Free overnight or 2-day express courier dispatch on all orders."})]}),e.jsxs(n,{children:[e.jsx("div",{className:"icon",children:e.jsx(c,{size:20})}),e.jsx("h3",{children:"100% Transit Insured"}),e.jsx("p",{children:"Fully covered from our vault until signed for at your address."})]}),e.jsxs(n,{children:[e.jsx("div",{className:"icon",children:e.jsx(p,{size:20})}),e.jsx("h3",{children:"Signature Required"}),e.jsx("p",{children:"Delivered strictly with direct adult signature verification."})]})]})]}),e.jsxs(a,{children:[e.jsx("h2",{children:"International Shipping & Customs"}),e.jsx("p",{children:"We ship to over 50 countries worldwide including the United Kingdom, United States, Canada, Europe, Australia, and the UAE. International shipments are handled by premium global couriers (FedEx, DHL Express, Armored Courier)."}),e.jsx("p",{children:"Detailed tracking numbers are provided immediately upon dispatch so you can trace your parcel in real-time."})]})]}),e.jsx(b,{children:e.jsxs(w,{children:[e.jsx("h2",{children:"Need Delivery Assistance or Hold For Pick-Up?"}),e.jsx("p",{children:"Our concierge can arrange delivery to a local FedEx/DHL hold facility for secret proposal planning."}),e.jsxs(t,{to:"/contact-us",className:"primary-btn",children:[e.jsx(m,{size:16})," CONTACT DELIVERY CONCIERGE"]})]})}),e.jsx(x,{})]}));export{I as ShippingDeliveryPage};
