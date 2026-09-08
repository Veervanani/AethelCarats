import{r as s,j as e,f as a,l as o,v as l,a$ as d,a2 as c,aE as p}from"./react-vendor-CKfE40gi.js";import{g as i}from"./ui-vendor-5voluciG.js";import{R as r,S as m}from"./admin-pages-CLj1E1WA.js";import{W as x}from"./WhyAuraDiamondNav-LmZ2M4rm.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const h=i.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`,g=i.div`
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
`,b=i.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,t=i.section`
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
`,u=i.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,n=i.div`
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
`,j=i.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,y=i.div`
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
`,F=()=>(s.useEffect(()=>{document.title="Conflict Free Diamonds | AethelCarats Fine Jewellery"},[]),e.jsxs(h,{children:[e.jsxs(g,{children:[e.jsx(a,{to:"/",children:"Home"}),e.jsx(o,{size:12}),e.jsx("span",{children:"Why AethelCarats"}),e.jsx(o,{size:12}),e.jsx("span",{className:"current",children:"Conflict Free Diamonds"})]}),e.jsx(r,{yOffset:35,children:e.jsxs(f,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",children:"ETHICAL RESPONSIBILITY & COMMITMENT"}),e.jsx("h1",{children:"Conflict Free Diamonds"}),e.jsx("p",{className:"subtitle",children:"At AethelCarats, integrity is woven into every diamond we curate. We strictly enforce ethical sourcing standards, guarantee 100% Kimberley Process compliance, and pioneer sustainable lab-grown diamond creations."}),e.jsx(a,{to:"/diamonds",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#C9A96E",color:"#0B0B0B",padding:"14px 28px",borderRadius:2,fontSize:"0.85rem",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:700,textDecoration:"none"},children:"EXPLORE CERTIFIED DIAMONDS"})]}),e.jsx("div",{className:"image-side",children:e.jsx(m,{src:"/assets/why-aura/sustainability-hero.jpg",alt:"Master Jeweller Inspecting Diamond under Loupe"})})]})}),e.jsxs(b,{children:[e.jsx(r,{yOffset:35,children:e.jsxs(t,{children:[e.jsx("h2",{children:"Our Ethical Sourcing Philosophy"}),e.jsx("p",{children:"Fine jewellery should symbolize beauty, devotion, and lasting value—never environmental harm or human exploitation. AethelCarats is committed to working exclusively with diamond sightholders and master cutters who adhere to the strict guidance of the Kimberley Process and international human rights frameworks."}),e.jsx("p",{children:"Whether selecting a rare natural solitaire or a precision-engineered lab-grown diamond, every gem in our collection is fully traceable to legitimate, conflict-free sources."}),e.jsxs(u,{children:[e.jsx(r,{delay:0,yOffset:25,children:e.jsxs(n,{children:[e.jsx("div",{className:"icon-box",children:e.jsx(l,{size:20})}),e.jsx("h3",{children:"100% Conflict-Free"}),e.jsx("p",{children:"Guaranteed Kimberley Process compliance for all natural diamonds without exception."})]})}),e.jsx(r,{delay:.1,yOffset:25,children:e.jsxs(n,{children:[e.jsx("div",{className:"icon-box",children:e.jsx(d,{size:20})}),e.jsx("h3",{children:"Sustainable Lab-Grown"}),e.jsx("p",{children:"Pure carbon diamonds grown with renewable energy, zero mining impact, and full transparency."})]})}),e.jsx(r,{delay:.2,yOffset:25,children:e.jsxs(n,{children:[e.jsx("div",{className:"icon-box",children:e.jsx(c,{size:20})}),e.jsx("h3",{children:"Recycled Precious Metals"}),e.jsx("p",{children:"Crafted using refined 100% recycled 14K & 18K solid gold."})]})})]})]})}),e.jsx(r,{yOffset:35,children:e.jsxs(t,{children:[e.jsx("h2",{children:"Natural vs. Lab-Grown Integrity"}),e.jsx("p",{children:"We believe in complete transparency. Our lab-grown diamonds possess the exact same physical, chemical, and optical properties as natural earth-mined diamonds. They are graded by independent gemmological laboratories (GIA / IGI) using identical standards for Carat, Color, Clarity, and Cut."}),e.jsx("p",{children:"By offering both choices alongside certified provenance, we empower our clients to make an informed, ethical investment that aligns with their personal values."})]})})]}),e.jsx(r,{yOffset:35,children:e.jsx(j,{children:e.jsxs(y,{children:[e.jsx("h2",{children:"Have Questions About Diamond Provenance?"}),e.jsx("p",{children:"Our gemmologists are available to provide certificate verification, laser inscription confirmation, or custom sourcing assistance."}),e.jsxs(a,{to:"/contact-us",className:"primary-btn",children:[e.jsx(p,{size:16})," SPEAK WITH OUR GEMMOLOGISTS"]})]})})}),e.jsx(x,{})]}));export{F as SustainabilityPage};
