import{r as l,j as e,f as c,m as p,b as x,aD as g}from"./react-vendor-DSaFutMS.js";import{g as i}from"./ui-vendor-DguFyjS7.js";import{a as m,S as y}from"./admin-pages-CVbMhYb3.js";import{W as j}from"./WhyFloksyJewelNav-Cm0XXVVb.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const b=i.div`
  background-color: #f7f6f2;
  color: #1a1918;
  min-height: 100vh;
  padding-bottom: 80px;
`,w=i.div`
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
`,C=i.section`
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
`,R=i.section`
  max-width: 1200px;
  margin: 0 auto 64px;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,n=i.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  padding: 28px 20px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .step-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 600;
    color: #c9a45c;
    line-height: 1;
  }

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1918;
  }

  p {
    font-size: 0.88rem;
    color: #55524d;
    line-height: 1.5;
  }
`,k=i.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,t=i.section`
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
`,v=i.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,I=i.div`
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

  .btn-group {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;

    a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 4px;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    a.primary-btn {
      background: #c9a45c;
      color: #1a1918;
      &:hover {
        background: #fffdf9;
      }
    }

    a.secondary-btn {
      border: 1px solid #fffdf9;
      color: #fffdf9;
      &:hover {
        border-color: #c9a45c;
        color: #c9a45c;
      }
    }
  }
`,G=()=>{const[u,h]=l.useState("contact@floksyjewel.com"),[z,f]=l.useState(null);return l.useEffect(()=>{document.title="Returns & Refunds | Floksy Jewel",m.getPageBySlug("returns-refunds").then(r=>{var d;if(r){let a={};const o=r.draftContent||r.content;if(o)try{a=typeof o=="string"?JSON.parse(o):o}catch{a={}}f({...r,cmsContent:a}),(d=r.seoMetadata)!=null&&d.seoTitle&&(document.title=r.seoMetadata.seoTitle)}}).catch(console.error),m.getSiteSettings().then(r=>{r&&r.contactEmail&&h(r.contactEmail)}).catch(console.error);const s=document.createElement("script");return s.type="application/ld+json",s.innerHTML=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":"https://floksyjewel.com/returns-refunds#webpage",url:"https://floksyjewel.com/returns-refunds",name:"Returns & Refunds | Floksy Jewel Policy",description:"Information on Floksy Jewel return policies, return process, inspection, and refund timelines."},{"@type":"BreadcrumbList","@id":"https://floksyjewel.com/returns-refunds#breadcrumb",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://floksyjewel.com"},{"@type":"ListItem",position:2,name:"Customer Care",item:"https://floksyjewel.com/returns-refunds"},{"@type":"ListItem",position:3,name:"Returns & Refunds",item:"https://floksyjewel.com/returns-refunds"}]}]}),document.head.appendChild(s),()=>{document.head.removeChild(s)}},[]),e.jsxs(b,{children:[e.jsxs(w,{children:[e.jsx(c,{to:"/",children:"Home"}),e.jsx(p,{size:12}),e.jsx("span",{children:"Customer Care"}),e.jsx(p,{size:12}),e.jsx("span",{className:"current",children:"Returns & Refunds"})]}),e.jsxs(C,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",children:"OUR COMMITMENT TO CLIENT ASSURANCE"}),e.jsx("h1",{children:"Returns & Refunds"}),e.jsx("p",{className:"subtitle",children:"Clear and transparent guidance for your Floksy Jewel purchase. We ensure total peace of mind with our complimentary 30-day return policy and gemmological inspection."}),e.jsx(c,{to:"/contact-us",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#1a1918",color:"#fffdf9",padding:"14px 28px",borderRadius:4,fontSize:"0.85rem",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,textDecoration:"none"},children:"INITIATE RETURN REQUEST"})]}),e.jsx("div",{className:"image-side",children:e.jsx(y,{src:"/assets/why-floksy/returns-refunds-hero.jpg",alt:"Floksy Jewel Presentation Box and Solitaire Ring"})})]}),e.jsxs(R,{children:[e.jsxs(n,{children:[e.jsx("span",{className:"step-number",children:"01"}),e.jsx("h3",{children:"Submit Request"}),e.jsx("p",{children:"Contact our concierge team with your Order ID to initiate a return request."})]}),e.jsxs(n,{children:[e.jsx("span",{className:"step-number",children:"02"}),e.jsx("h3",{children:"Instructions"}),e.jsx("p",{children:"Receive return shipping guidelines and secure return paperwork."})]}),e.jsxs(n,{children:[e.jsx("span",{className:"step-number",children:"03"}),e.jsx("h3",{children:"Secure Return"}),e.jsx("p",{children:"Package the item securely with original certificates and luxury box."})]}),e.jsxs(n,{children:[e.jsx("span",{className:"step-number",children:"04"}),e.jsx("h3",{children:"Inspection"}),e.jsx("p",{children:"Gemmological verification by our master jewellers upon arrival."})]}),e.jsxs(n,{children:[e.jsx("span",{className:"step-number",children:"05"}),e.jsx("h3",{children:"Refund"}),e.jsx("p",{children:"Reimbursement processed to original payment method within 5–7 business days."})]})]}),e.jsxs(k,{children:[e.jsxs(t,{children:[e.jsx("h2",{children:"30-Day Return Policy"}),e.jsx("p",{children:"At Floksy Jewel, we stand behind the craftsmanship and quality of our fine jewellery. If for any reason you are not completely satisfied with your purchase of a standard, non-customised item, you may return it within 30 days of initial delivery for a full refund or exchange."}),e.jsx("p",{children:"To be eligible for a return, the jewellery piece must satisfy all of the following conditions:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Must be unworn, undamaged, and in pristine original condition."}),e.jsx("li",{children:"Must include all original diamond grading certificates (GIA, IGI), authenticity cards, and documentation."}),e.jsx("li",{children:"Must be returned in the original illuminated Floksy Jewel presentation packaging."})]})]}),e.jsxs(t,{children:[e.jsx("h2",{children:"Custom & Bespoke Creations"}),e.jsx("p",{children:"Because custom jewellery pieces, special-order diamond cuts, and personalized engraved creations are uniquely hand-crafted to your individual specifications, they are exempt from standard returns and non-refundable."}),e.jsx("p",{children:"However, we want you to cherish your piece. We offer complimentary ring resizing within 60 days of purchase and complimentary cleaning, inspection, and prong checks."})]}),e.jsxs(t,{children:[e.jsx("h2",{children:"Inspection & Quality Controls"}),e.jsx("p",{children:"All returned jewellery undergoes rigorous gemmological inspection at our master atelier. We verify the diamond laser inscriptions, serial numbers, metal purity hallmarks, and stone settings against original production records."}),e.jsx("p",{children:"Items showing signs of wear, alteration, resizing by unauthorized third-party jewellers, or missing diamond certificates will not be accepted and will be returned to the sender."})]}),e.jsxs(t,{children:[e.jsx("h2",{children:"Refund Processing & Timelines"}),e.jsx("p",{children:"Upon successful inspection (typically within 2 to 3 business days of receipt), your refund will be issued to your original payment method. Depending on your financial institution, funds usually appear on your statement within 5 to 7 business days."}),e.jsx("p",{children:"Return shipping fees are complimentary for domestic orders using our prepaid insured shipping labels. International return shipping rates may vary."})]}),e.jsxs(t,{children:[e.jsx("h2",{children:"Damaged or Incorrect Items"}),e.jsx("p",{children:"In the unlikely event that an item arrives damaged, defective, or incorrect, please notify Customer Care within 48 hours of delivery. We will immediately arrange a priority replacement or full refund."})]})]}),e.jsx(v,{children:e.jsxs(I,{children:[e.jsx("h2",{children:"Need Help With a Return?"}),e.jsx("p",{children:"Our customer care concierge team is available to assist you with return authorizations, shipping labels, or exchange guidance."}),e.jsxs("div",{className:"btn-group",children:[e.jsxs(c,{to:"/contact-us",className:"primary-btn",children:[e.jsx(x,{size:16})," CONTACT CUSTOMER CARE"]}),e.jsxs("a",{href:`mailto:${u}`,className:"secondary-btn",children:[e.jsx(g,{size:16})," EMAIL CONCIERGE"]})]})]})}),e.jsx(j,{})]})};export{G as ReturnsRefundsPage};
