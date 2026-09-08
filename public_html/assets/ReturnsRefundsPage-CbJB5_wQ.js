import{r as o,j as e,f as a,l,b as p,aG as m}from"./react-vendor-BsBv4awM.js";import{g as i}from"./ui-vendor-C0FaE403.js";import{a as h,R as r,S as x}from"./admin-pages-Dyn6Mexs.js";import{W as u}from"./WhyAuraDiamondNav-DecPpKpY.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const g=i.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`,f=i.div`
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
`,j=i.section`
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
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 28px 20px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .step-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 700;
    color: #C9A96E;
    line-height: 1;
  }

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: #F5F1E8;
  }

  p {
    font-size: 0.88rem;
    color: #A8A8A8;
    line-height: 1.5;
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

  ul {
    margin: 12px 0 16px 20px;
    color: #D8D2C5;
    font-size: 0.95rem;

    li {
      margin-bottom: 8px;
      line-height: 1.6;
    }
  }
`,w=i.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,C=i.div`
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

  .btn-group {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;

    a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      border-radius: 2px;
      font-size: 0.85rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.25s ease;
    }

    a.primary-btn {
      background: #C9A96E;
      color: #0B0B0B;
      &:hover {
        background: #DFBA73;
        box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
      }
    }

    a.secondary-btn {
      border: 1px solid rgba(140, 116, 75, 0.35);
      background: #111111;
      color: #F5F1E8;
      &:hover {
        border-color: #C9A96E;
        color: #C9A96E;
      }
    }
  }
`,N=()=>{const[d,c]=o.useState("concierge@aethelcarats.com");return o.useEffect(()=>{document.title="Returns & Refunds | AethelCarats Fine Jewellery",h.getSiteSettings().then(s=>{s&&s.contactEmail&&c(s.contactEmail)}).catch(console.error)},[]),e.jsxs(g,{children:[e.jsxs(f,{children:[e.jsx(a,{to:"/",children:"Home"}),e.jsx(l,{size:12}),e.jsx("span",{children:"Customer Care"}),e.jsx(l,{size:12}),e.jsx("span",{className:"current",children:"Returns & Refunds"})]}),e.jsx(r,{yOffset:35,children:e.jsxs(y,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",children:"OUR COMMITMENT TO CLIENT ASSURANCE"}),e.jsx("h1",{children:"Returns & Refunds"}),e.jsx("p",{className:"subtitle",children:"Clear and transparent guidance for your AethelCarats purchase. We ensure total peace of mind with our complimentary 30-day return policy and gemmological inspection."}),e.jsx(a,{to:"/contact-us",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#C9A96E",color:"#0B0B0B",padding:"14px 28px",borderRadius:2,fontSize:"0.85rem",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:700,textDecoration:"none"},children:"INITIATE RETURN REQUEST"})]}),e.jsx("div",{className:"image-side",children:e.jsx(x,{src:"/assets/why-aura/returns-refunds-hero.jpg",alt:"AethelCarats Presentation Box and Solitaire Ring"})})]})}),e.jsxs(j,{children:[e.jsx(r,{delay:0,yOffset:25,children:e.jsxs(n,{children:[e.jsx("span",{className:"step-number",children:"01"}),e.jsx("h3",{children:"Submit Request"}),e.jsx("p",{children:"Contact our concierge team with your Order ID to initiate a return request."})]})}),e.jsx(r,{delay:.1,yOffset:25,children:e.jsxs(n,{children:[e.jsx("span",{className:"step-number",children:"02"}),e.jsx("h3",{children:"Instructions"}),e.jsx("p",{children:"Receive return shipping guidelines and secure return paperwork."})]})}),e.jsx(r,{delay:.2,yOffset:25,children:e.jsxs(n,{children:[e.jsx("span",{className:"step-number",children:"03"}),e.jsx("h3",{children:"Secure Return"}),e.jsx("p",{children:"Package the item securely with original certificates and luxury box."})]})}),e.jsx(r,{delay:.3,yOffset:25,children:e.jsxs(n,{children:[e.jsx("span",{className:"step-number",children:"04"}),e.jsx("h3",{children:"Inspection"}),e.jsx("p",{children:"Gemmological verification by our master jewellers upon arrival."})]})}),e.jsx(r,{delay:.4,yOffset:25,children:e.jsxs(n,{children:[e.jsx("span",{className:"step-number",children:"05"}),e.jsx("h3",{children:"Refund"}),e.jsx("p",{children:"Reimbursement processed to original payment method within 5–7 business days."})]})})]}),e.jsxs(b,{children:[e.jsx(r,{yOffset:35,children:e.jsxs(t,{children:[e.jsx("h2",{children:"30-Day Return Policy"}),e.jsx("p",{children:"At AethelCarats, we stand behind the craftsmanship and quality of our fine jewellery. If for any reason you are not completely satisfied with your purchase of a standard, non-customised item, you may return it within 30 days of initial delivery for a full refund or exchange."}),e.jsx("p",{children:"To be eligible for a return, the jewellery piece must satisfy all of the following conditions:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Must be unworn, undamaged, and in pristine original condition."}),e.jsx("li",{children:"Must include all original diamond grading certificates (GIA, IGI), authenticity cards, and documentation."}),e.jsx("li",{children:"Must be returned in the original illuminated AethelCarats presentation packaging."})]})]})}),e.jsx(r,{yOffset:35,children:e.jsxs(t,{children:[e.jsx("h2",{children:"Custom & Bespoke Creations"}),e.jsx("p",{children:"Because custom jewellery pieces, special-order diamond cuts, and personalized engraved creations are uniquely hand-crafted to your individual specifications, they are exempt from standard returns and non-refundable."}),e.jsx("p",{children:"However, we want you to cherish your piece. We offer complimentary ring resizing within 60 days of purchase and complimentary cleaning, inspection, and prong checks."})]})}),e.jsx(r,{yOffset:35,children:e.jsxs(t,{children:[e.jsx("h2",{children:"Inspection & Quality Controls"}),e.jsx("p",{children:"All returned jewellery undergoes rigorous gemmological inspection at our master atelier. We verify the diamond laser inscriptions, serial numbers, metal purity hallmarks, and stone settings against original production records."}),e.jsx("p",{children:"Items showing signs of wear, alteration, resizing by unauthorized third-party jewellers, or missing diamond certificates will not be accepted and will be returned to the sender."})]})}),e.jsx(r,{yOffset:35,children:e.jsxs(t,{children:[e.jsx("h2",{children:"Refund Processing & Timelines"}),e.jsx("p",{children:"Upon successful inspection (typically within 2 to 3 business days of receipt), your refund will be issued to your original payment method. Depending on your financial institution, funds usually appear on your statement within 5 to 7 business days."}),e.jsx("p",{children:"Return shipping fees are complimentary for domestic orders using our prepaid insured shipping labels. International return shipping rates may vary."})]})}),e.jsx(r,{yOffset:35,children:e.jsxs(t,{children:[e.jsx("h2",{children:"Damaged or Incorrect Items"}),e.jsx("p",{children:"In the unlikely event that an item arrives damaged, defective, or incorrect, please notify Customer Care within 48 hours of delivery. We will immediately arrange a priority replacement or full refund."})]})})]}),e.jsx(r,{yOffset:35,children:e.jsx(w,{children:e.jsxs(C,{children:[e.jsx("h2",{children:"Need Help With a Return?"}),e.jsx("p",{children:"Our customer care concierge team is available to assist you with return authorizations, shipping labels, or exchange guidance."}),e.jsxs("div",{className:"btn-group",children:[e.jsxs(a,{to:"/contact-us",className:"primary-btn",children:[e.jsx(p,{size:16})," CONTACT CUSTOMER CARE"]}),e.jsxs("a",{href:`mailto:${d}`,className:"secondary-btn",children:[e.jsx(m,{size:16})," EMAIL CONCIERGE"]})]})]})})}),e.jsx(u,{})]})};export{N as ReturnsRefundsPage};
