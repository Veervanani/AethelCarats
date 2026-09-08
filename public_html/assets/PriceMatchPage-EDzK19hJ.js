import{r as s,j as e,f as t,l as o,aG as d}from"./react-vendor-BsBv4awM.js";import{g as i}from"./ui-vendor-C0FaE403.js";import{R as r,S as l}from"./admin-pages-DDF5_dHZ.js";import{W as c}from"./WhyAuraDiamondNav-BnF4jfae.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const p=i.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`,m=i.div`
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
`,x=i.section`
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
`,h=i.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,n=i.section`
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
`,g=i.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,a=i.div`
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
`,f=i.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,u=i.div`
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
`,v=()=>(s.useEffect(()=>{document.title="Diamond Price Matching | AethelCarats Fine Jewellery"},[]),e.jsxs(p,{children:[e.jsxs(m,{children:[e.jsx(t,{to:"/",children:"Home"}),e.jsx(o,{size:12}),e.jsx("span",{children:"Why AethelCarats"}),e.jsx(o,{size:12}),e.jsx("span",{className:"current",children:"Diamond Price Matching"})]}),e.jsx(r,{yOffset:35,children:e.jsxs(x,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",children:"UNCOMPROMISING DIAMOND VALUE"}),e.jsx("h1",{children:"Diamond Price Matching"}),e.jsx("p",{className:"subtitle",children:"We are dedicated to providing superior diamond quality at fair, competitive prices. If you locate an identical certified diamond offered for less by a recognized retailer, AethelCarats will match the price."}),e.jsx(t,{to:"/contact-us",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#C9A96E",color:"#0B0B0B",padding:"14px 28px",borderRadius:2,fontSize:"0.85rem",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:700,textDecoration:"none"},children:"REQUEST A PRICE MATCH"})]}),e.jsx("div",{className:"image-side",children:e.jsx(l,{src:"/assets/why-aura/price-match-hero.jpg",alt:"Loose Diamond Appraisal on Velvet Display"})})]})}),e.jsxs(h,{children:[e.jsx(r,{yOffset:35,children:e.jsxs(n,{children:[e.jsx("h2",{children:"How Price Matching Works"}),e.jsx("p",{children:"At AethelCarats, pricing integrity is paramount. Because we work directly with diamond sightholders and maintain direct atelier oversight, we deliver exceptional diamond value without traditional retail markups."}),e.jsx("p",{children:"To request a price match before completing your purchase, simply submit the diamond specifications or GIA/IGI certificate number to our concierge team."}),e.jsxs(g,{children:[e.jsx(r,{delay:0,yOffset:25,children:e.jsxs(a,{children:[e.jsx("div",{className:"num",children:"01"}),e.jsx("h3",{children:"Locate Diamond"}),e.jsx("p",{children:"Find a loose diamond with identical Carat, Color, Clarity, Cut, and GIA/IGI grading report."})]})}),e.jsx(r,{delay:.1,yOffset:25,children:e.jsxs(a,{children:[e.jsx("div",{className:"num",children:"02"}),e.jsx("h3",{children:"Submit Details"}),e.jsx("p",{children:"Share the certificate number and retailer offer link with our concierge team."})]})}),e.jsx(r,{delay:.2,yOffset:25,children:e.jsxs(a,{children:[e.jsx("div",{className:"num",children:"03"}),e.jsx("h3",{children:"Review & Match"}),e.jsx("p",{children:"Our gemmologists verify like-for-like criteria and adjust your price immediately."})]})})]})]})}),e.jsx(r,{yOffset:35,children:e.jsxs(n,{children:[e.jsx("h2",{children:"Matching Eligibility Criteria"}),e.jsx("p",{children:"To ensure genuine equity, price matching applies to loose certified diamonds meeting these like-for-like standards:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Must have identical 4Cs (Carat, Color, Clarity, Cut) and proportions."}),e.jsx("li",{children:"Must possess an authentic GIA or IGI grading report."}),e.jsx("li",{children:"Must be currently in stock and available for immediate purchase from an authorized retailer."}),e.jsx("li",{children:"Applies prior to diamond order placement."})]})]})})]}),e.jsx(r,{yOffset:35,children:e.jsx(f,{children:e.jsxs(u,{children:[e.jsx("h2",{children:"Ready to Verify a Diamond Price?"}),e.jsx("p",{children:"Contact our jewellery concierge with your target diamond details for an instant price evaluation."}),e.jsxs(t,{to:"/contact-us",className:"primary-btn",children:[e.jsx(d,{size:16})," SUBMIT PRICE MATCH REQUEST"]})]})})}),e.jsx(c,{})]}));export{v as PriceMatchPage};
