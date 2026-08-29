import{r as c,j as e,f as r,m as n,ah as l,aP as m,aD as d}from"./react-vendor-BQh5Swqi.js";import{g as t}from"./ui-vendor-DAVddLg0.js";import{S as p}from"./admin-pages-CoyKBZo2.js";import{W as f}from"./WhyFloksyJewelNav-BmRhW-de.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const x=t.div`
  background-color: #f7f6f2;
  color: #1a1918;
  min-height: 100vh;
  padding-bottom: 80px;
`,h=t.div`
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
`,g=t.section`
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
`,u=t.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,o=t.section`
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
`,y=t.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,s=t.div`
  background: #f9f7f2;
  border: 1px solid #e8e3d9;
  padding: 24px;
  border-radius: 4px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    color: #1a1918;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    font-size: 0.9rem;
    color: #55524d;
    line-height: 1.6;
  }
`,j=t.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,w=t.div`
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
`,z=()=>(c.useEffect(()=>{document.title="Limited Lifetime Warranty | Floksy Jewel";const a=document.querySelector('meta[name="description"]');a&&a.setAttribute("content","Learn about the Floksy Jewel Free Limited Lifetime Warranty covering manufacturing craftsmanship, prong inspection, and complimentary cleaning.");const i=document.createElement("script");return i.type="application/ld+json",i.innerHTML=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":"https://floksyjewel.com/lifetime-warranty#webpage",url:"https://floksyjewel.com/lifetime-warranty",name:"Free Limited Lifetime Warranty | Floksy Jewel",description:"Our lifetime commitment to manufacturing quality, stone security, and complimentary maintenance."},{"@type":"BreadcrumbList","@id":"https://floksyjewel.com/lifetime-warranty#breadcrumb",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://floksyjewel.com"},{"@type":"ListItem",position:2,name:"Why Floksy Jewel",item:"https://floksyjewel.com/lifetime-warranty"},{"@type":"ListItem",position:3,name:"Limited Lifetime Warranty",item:"https://floksyjewel.com/lifetime-warranty"}]}]}),document.head.appendChild(i),()=>{document.head.removeChild(i)}},[]),e.jsxs(x,{children:[e.jsxs(h,{children:[e.jsx(r,{to:"/",children:"Home"}),e.jsx(n,{size:12}),e.jsx("span",{children:"Why Floksy Jewel"}),e.jsx(n,{size:12}),e.jsx("span",{className:"current",children:"Limited Lifetime Warranty"})]}),e.jsxs(g,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",children:"GUARANTEED CRAFTSMANSHIP"}),e.jsx("h1",{children:"Limited Lifetime Warranty"}),e.jsx("p",{className:"subtitle",children:"Every piece created by Floksy Jewel is hand-crafted to exacting standards. We proudly stand behind our master goldsmiths with a complimentary Limited Lifetime Warranty against manufacturing defects."}),e.jsx(r,{to:"/contact-us",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#1a1918",color:"#fffdf9",padding:"14px 28px",borderRadius:4,fontSize:"0.85rem",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,textDecoration:"none"},children:"REQUEST WARRANTY ASSISTANCE"})]}),e.jsx("div",{className:"image-side",children:e.jsx(p,{src:"/assets/why-floksy/lifetime-warranty-hero.jpg",alt:"Master Jeweller Polishing Diamond Ring"})})]}),e.jsxs(u,{children:[e.jsxs(o,{children:[e.jsx("h2",{children:"Our Quality Guarantee"}),e.jsx("p",{children:"When you purchase fine jewellery from Floksy Jewel, your piece is inspected through multi-point gemmological protocols. We guarantee that your item is free from manufacturing defects in structure, setting, and metal casting at the time of delivery."}),e.jsx("p",{children:"If you ever believe your item has a manufacturing defect, send it to our atelier for expert inspection. If a defect is confirmed, we will repair or replace the item free of charge."}),e.jsxs(y,{children:[e.jsxs(s,{children:[e.jsxs("h3",{children:[e.jsx(l,{size:18,color:"#c9a45c"})," What Is Covered"]}),e.jsx("p",{children:"Manufacturing defects in metal casting, prong alignment, channel settings, solder joints, and structural integrity under normal wear."})]}),e.jsxs(s,{children:[e.jsxs("h3",{children:[e.jsx(m,{size:18,color:"#c9a45c"})," Complimentary Services"]}),e.jsx("p",{children:"Complimentary annual prong tightening, stone inspection, steam cleaning, and rhodium polishing at our atelier."})]})]})]}),e.jsxs(o,{children:[e.jsx("h2",{children:"Care & Maintenance Guidance"}),e.jsx("p",{children:"Fine jewellery is crafted from precious metals that can naturally experience wear over time. Normal wear and tear, accidental damage, loss of stones due to impact, or repairs performed by third-party jewellers are not covered under warranty."}),e.jsx("p",{children:"We recommend scheduling an annual inspection with our concierge to ensure prongs remain taut and settings remain secure."})]})]}),e.jsx(j,{children:e.jsxs(w,{children:[e.jsx("h2",{children:"Need Maintenance or Repair Assistance?"}),e.jsx("p",{children:"Contact our Customer Care team to schedule your complimentary annual jewellery inspection or service."}),e.jsxs(r,{to:"/contact-us",className:"primary-btn",children:[e.jsx(d,{size:16})," CONTACT CUSTOMER CARE"]})]})}),e.jsx(f,{})]}));export{z as LifetimeWarrantyPage};
