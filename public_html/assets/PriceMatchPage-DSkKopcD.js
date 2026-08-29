import{r as c,j as e,f as r,m as n,aD as d}from"./react-vendor-BXyx942q.js";import{g as i}from"./ui-vendor-VHkRGmvp.js";import{S as l}from"./admin-pages-Bh8Atj7w.js";import{W as m}from"./WhyFloksyJewelNav-Cvx06bJT.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const p=i.div`
  background-color: #f7f6f2;
  color: #1a1918;
  min-height: 100vh;
  padding-bottom: 80px;
`,h=i.div`
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
`,f=i.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,s=i.section`
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
`,g=i.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,o=i.div`
  background: #f9f7f2;
  border: 1px solid #e8e3d9;
  padding: 24px;
  border-radius: 4px;

  .num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 600;
    color: #c9a45c;
    margin-bottom: 8px;
  }

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    color: #1a1918;
    margin-bottom: 6px;
  }

  p {
    font-size: 0.88rem;
    color: #55524d;
    line-height: 1.5;
  }
`,u=i.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,y=i.div`
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
`,I=()=>(c.useEffect(()=>{document.title="Diamond Price Matching | Floksy Jewel";const a=document.querySelector('meta[name="description"]');a&&a.setAttribute("content","Discover the Floksy Jewel Diamond Price Match guarantee. We match like-for-like certified GIA and IGI loose diamond offers.");const t=document.createElement("script");return t.type="application/ld+json",t.innerHTML=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":"https://floksyjewel.com/price-match#webpage",url:"https://floksyjewel.com/price-match",name:"Diamond Price Matching Guarantee | Floksy Jewel",description:"Our commitment to exceptional diamond pricing and like-for-like certified diamond matching."},{"@type":"BreadcrumbList","@id":"https://floksyjewel.com/price-match#breadcrumb",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://floksyjewel.com"},{"@type":"ListItem",position:2,name:"Why Floksy Jewel",item:"https://floksyjewel.com/price-match"},{"@type":"ListItem",position:3,name:"Diamond Price Matching",item:"https://floksyjewel.com/price-match"}]}]}),document.head.appendChild(t),()=>{document.head.removeChild(t)}},[]),e.jsxs(p,{children:[e.jsxs(h,{children:[e.jsx(r,{to:"/",children:"Home"}),e.jsx(n,{size:12}),e.jsx("span",{children:"Why Floksy Jewel"}),e.jsx(n,{size:12}),e.jsx("span",{className:"current",children:"Diamond Price Matching"})]}),e.jsxs(x,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",children:"UNCOMPROMISING DIAMOND VALUE"}),e.jsx("h1",{children:"Diamond Price Matching"}),e.jsx("p",{className:"subtitle",children:"We are dedicated to providing superior diamond quality at fair, competitive prices. If you locate an identical certified diamond offered for less by a recognized retailer, Floksy Jewel will match the price."}),e.jsx(r,{to:"/contact-us",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#1a1918",color:"#fffdf9",padding:"14px 28px",borderRadius:4,fontSize:"0.85rem",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,textDecoration:"none"},children:"REQUEST A PRICE MATCH"})]}),e.jsx("div",{className:"image-side",children:e.jsx(l,{src:"/assets/why-floksy/price-match-hero.jpg",alt:"Loose Diamond Appraisal on Velvet Display"})})]}),e.jsxs(f,{children:[e.jsxs(s,{children:[e.jsx("h2",{children:"How Price Matching Works"}),e.jsx("p",{children:"At Floksy Jewel, pricing integrity is paramount. Because we work directly with diamond sightholders and maintain direct atelier oversight, we deliver exceptional diamond value without traditional retail markups."}),e.jsx("p",{children:"To request a price match before completing your purchase, simply submit the diamond specifications or GIA/IGI certificate number to our concierge team."}),e.jsxs(g,{children:[e.jsxs(o,{children:[e.jsx("div",{className:"num",children:"01"}),e.jsx("h3",{children:"Locate Diamond"}),e.jsx("p",{children:"Find a loose diamond with identical Carat, Color, Clarity, Cut, and GIA/IGI grading report."})]}),e.jsxs(o,{children:[e.jsx("div",{className:"num",children:"02"}),e.jsx("h3",{children:"Submit Details"}),e.jsx("p",{children:"Share the certificate number and retailer offer link with our concierge team."})]}),e.jsxs(o,{children:[e.jsx("div",{className:"num",children:"03"}),e.jsx("h3",{children:"Review & Match"}),e.jsx("p",{children:"Our gemmologists verify like-for-like criteria and adjust your price immediately."})]})]})]}),e.jsxs(s,{children:[e.jsx("h2",{children:"Matching Eligibility Criteria"}),e.jsx("p",{children:"To ensure genuine equity, price matching applies to loose certified diamonds meeting these like-for-like standards:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Must have identical 4Cs (Carat, Color, Clarity, Cut) and proportions."}),e.jsx("li",{children:"Must possess an authentic GIA or IGI grading report."}),e.jsx("li",{children:"Must be currently in stock and available for immediate purchase from a authorized retailer."}),e.jsx("li",{children:"Applies prior to diamond order placement."})]})]})]}),e.jsx(u,{children:e.jsxs(y,{children:[e.jsx("h2",{children:"Ready to Verify a Diamond Price?"}),e.jsx("p",{children:"Contact our jewellery concierge with your target diamond details for an instant price evaluation."}),e.jsxs(r,{to:"/contact-us",className:"primary-btn",children:[e.jsx(d,{size:16})," SUBMIT PRICE MATCH REQUEST"]})]})}),e.jsx(m,{})]}));export{I as PriceMatchPage};
