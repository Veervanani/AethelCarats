import{r as l,j as e,e as t,l as n,N as c,w as d,aC as p}from"./react-vendor-BSubOYpr.js";import{g as i}from"./ui-vendor-C-kywwZi.js";import{S as m}from"./admin-pages-YV7C3BNA.js";import{W as x}from"./WhyFloksyJewelNav-BR5kXv3e.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const h=i.div`
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
`,g=i.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,o=i.section`
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
`,y=i.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,s=i.div`
  background: #f9f7f2;
  border: 1px solid #e8e3d9;
  padding: 24px;
  border-radius: 4px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    color: #1a1918;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    font-size: 0.9rem;
    color: #55524d;
    line-height: 1.6;
  }
`,j=i.section`
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
`,A=()=>(l.useEffect(()=>{document.title="Jewelry Insurance | Floksy Jewel";const a=document.querySelector('meta[name="description"]');a&&a.setAttribute("content","Protect your investment with Floksy Jewel official valuation documentation, GIA/IGI certificates, and specialized jewellery insurance guidance.");const r=document.createElement("script");return r.type="application/ld+json",r.innerHTML=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":"https://floksyjewel.com/insurance#webpage",url:"https://floksyjewel.com/insurance",name:"Jewelry Insurance & Appraisal Valuation | Floksy Jewel",description:"Official appraisal documentation, diamond certificates, and guidance for securing comprehensive jewellery insurance."},{"@type":"BreadcrumbList","@id":"https://floksyjewel.com/insurance#breadcrumb",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://floksyjewel.com"},{"@type":"ListItem",position:2,name:"Why Floksy Jewel",item:"https://floksyjewel.com/insurance"},{"@type":"ListItem",position:3,name:"Jewelry Insurance",item:"https://floksyjewel.com/insurance"}]}]}),document.head.appendChild(r),()=>{document.head.removeChild(r)}},[]),e.jsxs(h,{children:[e.jsxs(u,{children:[e.jsx(t,{to:"/",children:"Home"}),e.jsx(n,{size:12}),e.jsx("span",{children:"Why Floksy Jewel"}),e.jsx(n,{size:12}),e.jsx("span",{className:"current",children:"Jewelry Insurance"})]}),e.jsxs(f,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",children:"PROTECTING YOUR PRECIOUS CREATIONS"}),e.jsx("h1",{children:"Jewelry Insurance"}),e.jsx("p",{className:"subtitle",children:"Your fine jewellery represents both sentimental devotion and enduring financial value. We assist you with official appraisal documentation and GIA/IGI certificates to simplify insurance coverage."}),e.jsx(t,{to:"/contact-us",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#1a1918",color:"#fffdf9",padding:"14px 28px",borderRadius:4,fontSize:"0.85rem",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,textDecoration:"none"},children:"REQUEST APPRAISAL DOCUMENTATION"})]}),e.jsx("div",{className:"image-side",children:e.jsx(m,{src:"/assets/why-floksy/insurance-hero.jpg",alt:"Fine Diamond Necklace in Vault Display Case"})})]}),e.jsxs(g,{children:[e.jsxs(o,{children:[e.jsx("h2",{children:"Official Valuation & Appraisal"}),e.jsx("p",{children:"While Floksy Jewel provides comprehensive transit insurance until your purchase is delivered, personal jewellery insurance protects your piece against loss, theft, or damage throughout your lifetime."}),e.jsx("p",{children:"To help you secure comprehensive coverage from specialized jewellery insurers (such as Jewelers Mutual or your preferred provider), Floksy Jewel provides complimentary official appraisal documentation for high-value purchases."}),e.jsxs(y,{children:[e.jsxs(s,{children:[e.jsxs("h3",{children:[e.jsx(c,{size:18,color:"#c9a45c"})," Valuation Documents"]}),e.jsx("p",{children:"Detailed itemized description including metal gram weight, diamond carat weight, cut grade, color, and retail replacement value."})]}),e.jsxs(s,{children:[e.jsxs("h3",{children:[e.jsx(d,{size:18,color:"#c9a45c"})," Independent Certificates"]}),e.jsx("p",{children:"Original GIA or IGI diamond grading reports verifying laser inscriptions and stone micro-details."})]})]})]}),e.jsxs(o,{children:[e.jsx("h2",{children:"Recommended Insurance Steps"}),e.jsx("p",{children:"Securing specialized jewellery insurance is quick and straightforward:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Request your Floksy Jewel appraisal valuation document upon order completion."}),e.jsx("li",{children:"Submit the valuation and diamond certificate to your insurance provider."}),e.jsx("li",{children:"Ensure coverage includes worldwide protection against loss, theft, damage, and mysterious disappearance."})]})]})]}),e.jsx(j,{children:e.jsxs(w,{children:[e.jsx("h2",{children:"Need an Insurance Valuation Report?"}),e.jsx("p",{children:"Contact our Customer Care team to receive a duplicate copy of your item's appraisal documentation."}),e.jsxs(t,{to:"/contact-us",className:"primary-btn",children:[e.jsx(p,{size:16})," REQUEST APPRAISAL COPY"]})]})}),e.jsx(x,{})]}));export{A as InsurancePage};
