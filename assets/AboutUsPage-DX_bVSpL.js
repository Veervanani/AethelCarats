import{r as d,j as e,f as o,m as a,h as c,x as m,aP as p,aD as h}from"./react-vendor-DxLkccZ0.js";import{g as i}from"./ui-vendor-BuBsKREC.js";import{R as t,S as x}from"./admin-pages-BsXizCU8.js";import{W as f}from"./WhyFloksyJewelNav-CD_u3hh6.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const g=i.div`
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
`,y=i.section`
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
`,j=i.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,l=i.section`
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
`,b=i.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,s=i.div`
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
`,w=i.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,k=i.div`
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
`,I=()=>(d.useEffect(()=>{document.title="Quality & Value | Floksy Jewel";const n=document.querySelector('meta[name="description"]');n&&n.setAttribute("content","Discover Floksy Jewel commitment to master craftsmanship, certified diamonds, transparent pricing, and personalized luxury jewellery concierge services.");const r=document.createElement("script");return r.type="application/ld+json",r.innerHTML=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://floksyjewel.com/#organization",name:"Floksy Jewel",url:"https://floksyjewel.com",logo:"https://floksyjewel.com/assets/floksy-jewel-logo.png",description:"Luxury fine jewellery atelier specializing in certified natural & lab-grown diamonds, bespoke engagement rings, and high jewellery."},{"@type":"WebPage","@id":"https://floksyjewel.com/about-us#webpage",url:"https://floksyjewel.com/about-us",name:"Quality & Value | Floksy Jewel Brand Story",description:"Learn about our heritage, master goldsmith craftsmanship, and ethical diamond sourcing."},{"@type":"BreadcrumbList","@id":"https://floksyjewel.com/about-us#breadcrumb",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://floksyjewel.com"},{"@type":"ListItem",position:2,name:"About Floksy Jewel",item:"https://floksyjewel.com/about-us"},{"@type":"ListItem",position:3,name:"Quality & Value",item:"https://floksyjewel.com/about-us"}]}]}),document.head.appendChild(r),()=>{document.head.removeChild(r)}},[]),e.jsxs(g,{children:[e.jsxs(u,{children:[e.jsx(o,{to:"/",children:"Home"}),e.jsx(a,{size:12}),e.jsx("span",{children:"About Floksy Jewel"}),e.jsx(a,{size:12}),e.jsx("span",{className:"current",children:"Quality & Value"})]}),e.jsx(t,{yOffset:35,children:e.jsxs(y,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",children:"OUR HERITAGE & ATELIER PHILOSOPHY"}),e.jsx("h1",{children:"Quality & Value"}),e.jsx("p",{className:"subtitle",children:"Luxury jewellery should feel exceptional in every detail. Floksy Jewel bridges master European craftsmanship with direct diamond sightholder sourcing to deliver uncompromised quality without traditional retail inflation."}),e.jsx(o,{to:"/collections",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#1a1918",color:"#fffdf9",padding:"14px 28px",borderRadius:4,fontSize:"0.85rem",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,textDecoration:"none"},children:"DISCOVER THE COLLECTION"})]}),e.jsx("div",{className:"image-side",children:e.jsx(x,{src:"/assets/why-floksy/about-us-hero.jpg",alt:"Master Jeweller Setting Diamond in Atelier"})})]})}),e.jsxs(j,{children:[e.jsx(t,{yOffset:35,children:e.jsxs(l,{children:[e.jsx("h2",{children:"The Floksy Jewel Standard"}),e.jsx("p",{children:"Founded on the belief that fine jewellery should be timeless, transparent, and personally meaningful, Floksy Jewel creates solitaire rings, tennis bracelets, high-jewellery necklaces, and bespoke heirlooms."}),e.jsx("p",{children:"Every piece is forged in solid 14K Gold, 18K Gold, or Platinum 950, and set with hand-selected certified diamonds verified for superior brilliance, symmetry, and fire."}),e.jsxs(b,{children:[e.jsx(t,{delay:0,yOffset:25,children:e.jsxs(s,{children:[e.jsx("div",{className:"icon",children:e.jsx(c,{size:20})}),e.jsx("h3",{children:"Master Craftsmanship"}),e.jsx("p",{children:"Hand-finished settings, secure prongs, and meticulous CAD modeling by expert jewellers."})]})}),e.jsx(t,{delay:.1,yOffset:25,children:e.jsxs(s,{children:[e.jsx("div",{className:"icon",children:e.jsx(m,{size:20})}),e.jsx("h3",{children:"GIA & IGI Certified"}),e.jsx("p",{children:"Every major diamond carries an independent certificate verifying carat, color, clarity, and cut."})]})}),e.jsx(t,{delay:.2,yOffset:25,children:e.jsxs(s,{children:[e.jsx("div",{className:"icon",children:e.jsx(p,{size:20})}),e.jsx("h3",{children:"Direct Sightholder Value"}),e.jsx("p",{children:"Ethical direct sourcing eliminates unnecessary middleman markups for honest luxury pricing."})]})})]})]})}),e.jsx(t,{yOffset:35,children:e.jsxs(l,{children:[e.jsx("h2",{children:"Bespoke Personalization & Concierge"}),e.jsx("p",{children:"Whether searching for the perfect diamond engagement ring or designing a custom heirloom from reference sketches, our dedicated Jewellery Concierge guides you through every decision."}),e.jsx("p",{children:"We offer complimentary 3D CAD renders, custom diamond sourcing, fully-insured global shipping, and a limited lifetime warranty on every piece."})]})})]}),e.jsx(t,{yOffset:35,children:e.jsx(w,{children:e.jsxs(k,{children:[e.jsx("h2",{children:"Experience Floksy Jewel Luxury"}),e.jsx("p",{children:"Speak with a diamond specialist or browse our curated collection of fine jewellery."}),e.jsxs(o,{to:"/contact-us",className:"primary-btn",children:[e.jsx(h,{size:16})," SPEAK WITH OUR CONCIERGE"]})]})})}),e.jsx(f,{})]}));export{I as AboutUsPage};
