import{r as s,j as e,f as t,l as n,g as l,v as d,aR as c,aG as p}from"./react-vendor-BsBv4awM.js";import{g as i}from"./ui-vendor-C0FaE403.js";import{R as r,S as x}from"./admin-pages-DDF5_dHZ.js";import{W as m}from"./WhyAuraDiamondNav-BnF4jfae.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const h=i.div`
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
`,u=i.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,o=i.section`
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
`,b=i.div`
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
`,k=()=>(s.useEffect(()=>{document.title="Quality & Value | AethelCarats Fine Jewellery"},[]),e.jsxs(h,{children:[e.jsxs(g,{children:[e.jsx(t,{to:"/",children:"Home"}),e.jsx(n,{size:12}),e.jsx("span",{children:"About AethelCarats"}),e.jsx(n,{size:12}),e.jsx("span",{className:"current",children:"Quality & Value"})]}),e.jsx(r,{yOffset:35,children:e.jsxs(f,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",children:"OUR HERITAGE & ATELIER PHILOSOPHY"}),e.jsx("h1",{children:"Quality & Value"}),e.jsx("p",{className:"subtitle",children:"Luxury jewellery should feel exceptional in every detail. AethelCarats bridges master artisanal goldsmithing with direct diamond sightholder sourcing to deliver uncompromised quality without traditional retail inflation."}),e.jsx(t,{to:"/collections",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#C9A96E",color:"#0B0B0B",padding:"14px 28px",borderRadius:2,fontSize:"0.85rem",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:700,textDecoration:"none"},children:"DISCOVER THE COLLECTION"})]}),e.jsx("div",{className:"image-side",children:e.jsx(x,{src:"/assets/why-aura/about-us-hero.jpg",alt:"Master Jeweller Setting Diamond in Atelier"})})]})}),e.jsxs(u,{children:[e.jsx(r,{yOffset:35,children:e.jsxs(o,{children:[e.jsx("h2",{children:"The AethelCarats Atelier Standard"}),e.jsx("p",{children:"Founded on the belief that fine jewellery should be timeless, transparent, and personally meaningful, AethelCarats creates solitaire rings, tennis bracelets, high-jewellery necklaces, and bespoke heirlooms."}),e.jsx("p",{children:"Every piece is forged in solid 14K Gold, 18K Gold, or Platinum 950, and set with hand-selected certified diamonds verified for superior brilliance, symmetry, and fire."}),e.jsxs(b,{children:[e.jsx(r,{delay:0,yOffset:25,children:e.jsxs(a,{children:[e.jsx("div",{className:"icon",children:e.jsx(l,{size:20})}),e.jsx("h3",{children:"Master Craftsmanship"}),e.jsx("p",{children:"Hand-finished settings, secure prongs, and meticulous CAD modeling by expert jewellers."})]})}),e.jsx(r,{delay:.1,yOffset:25,children:e.jsxs(a,{children:[e.jsx("div",{className:"icon",children:e.jsx(d,{size:20})}),e.jsx("h3",{children:"GIA & IGI Certified"}),e.jsx("p",{children:"Every major diamond carries an independent certificate verifying carat, color, clarity, and cut."})]})}),e.jsx(r,{delay:.2,yOffset:25,children:e.jsxs(a,{children:[e.jsx("div",{className:"icon",children:e.jsx(c,{size:20})}),e.jsx("h3",{children:"Direct Sightholder Value"}),e.jsx("p",{children:"Ethical direct sourcing eliminates unnecessary middleman markups for honest luxury pricing."})]})})]})]})}),e.jsx(r,{yOffset:35,children:e.jsxs(o,{children:[e.jsx("h2",{children:"Bespoke Personalization & Concierge"}),e.jsx("p",{children:"Whether searching for the perfect diamond engagement ring or designing a custom heirloom from reference sketches, our dedicated Jewellery Concierge guides you through every decision."}),e.jsx("p",{children:"We offer complimentary 3D CAD renders, custom diamond sourcing, fully-insured global shipping, and a limited lifetime warranty on every piece."})]})})]}),e.jsx(r,{yOffset:35,children:e.jsx(j,{children:e.jsxs(y,{children:[e.jsx("h2",{children:"Experience AethelCarats Luxury"}),e.jsx("p",{children:"Speak with a diamond specialist or browse our curated collection of fine jewellery."}),e.jsxs(t,{to:"/contact-us",className:"primary-btn",children:[e.jsx(p,{size:16})," SPEAK WITH OUR CONCIERGE"]})]})})}),e.jsx(m,{})]}));export{k as AboutUsPage};
