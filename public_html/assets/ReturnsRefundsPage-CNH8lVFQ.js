import{r as h,j as e,f as m,l as f,b as A,aG as E}from"./react-vendor-BQZO0c5l.js";import{g as a}from"./ui-vendor-Bs2yixgz.js";import{a as y,R as n,S}from"./admin-pages-Ct4W_IMd.js";import{W as I}from"./WhyAuraDiamondNav-BTBatq-8.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const O=a.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`,N=a.div`
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
`,T=a.section`
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
`,z=a.section`
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
`,c=a.div`
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
`,k=a.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`,s=a.section`
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
`,B=a.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,D=a.div`
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
`,J=()=>{var x,g;const[j,b]=h.useState("concierge@aethelcarats.com"),[o,w]=h.useState(null);h.useEffect(()=>{window.scrollTo(0,0),y.getPageBySlug("returns-refunds").then(i=>{var p;if(i){const t=i.draftContent||i.content;let l={};if(t)try{l=typeof t=="string"?JSON.parse(t):t}catch{l={content:t}}if((!l||Object.keys(l).length===0)&&i.content)try{l=typeof i.content=="string"?JSON.parse(i.content):i.content}catch{l={content:i.content}}w({...i,parsedContent:l}),(p=i.seoMetadata)!=null&&p.seoTitle?document.title=i.seoMetadata.seoTitle:i.title&&(document.title=`${i.title} | AethelCarats Fine Jewellery`)}}).catch(console.warn),y.getSiteSettings().then(i=>{i&&i.contactEmail&&b(i.contactEmail)}).catch(console.error)},[]);const r=(o==null?void 0:o.parsedContent)||{},C=r.desktopImage||((x=r.pageImages)==null?void 0:x.desktopImage)||"/assets/why-aura/returns-refunds-hero.jpg",u=r.returnWindow||"15 Days",d=u.replace(/\s*from\s+date\s+of\s+delivery/i,"").trim(),v=d.toLowerCase().includes("day")?`${d} Return Policy`:`${d}-Day Return Policy`;return e.jsxs(O,{children:[e.jsxs(N,{children:[e.jsx(m,{to:"/",children:"Home"}),e.jsx(f,{size:12}),e.jsx("span",{children:"Customer Care"}),e.jsx(f,{size:12}),e.jsx("span",{className:"current",children:r.heading||(o==null?void 0:o.title)||"Returns & Refunds"})]}),e.jsx(n,{yOffset:35,children:e.jsxs(T,{children:[e.jsxs("div",{className:"text-side",children:[e.jsx("span",{className:"eyebrow",style:{color:r.eyebrowColor||void 0},children:r.eyebrow||"OUR COMMITMENT TO CLIENT ASSURANCE"}),e.jsx("h1",{style:{color:r.headingColor||void 0},children:r.heading||(o==null?void 0:o.title)||"Returns & Refunds"}),e.jsx("p",{className:"subtitle",style:{color:r.introductionColor||void 0},children:r.introduction||`Clear and transparent guidance for your AethelCarats purchase. We ensure total peace of mind with our complimentary ${d.toLowerCase()} return policy and gemmological inspection.`}),e.jsx(m,{to:"/contact-us",style:{display:"inline-flex",alignItems:"center",gap:8,background:"#C9A96E",color:"#0B0B0B",padding:"14px 28px",borderRadius:2,fontSize:"0.85rem",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:700,textDecoration:"none"},children:"INITIATE RETURN REQUEST"})]}),e.jsx("div",{className:"image-side",children:e.jsx(S,{src:C,alt:r.heading||"AethelCarats Presentation Box and Solitaire Ring"})})]})}),e.jsxs(z,{children:[e.jsx(n,{delay:0,yOffset:25,children:e.jsxs(c,{children:[e.jsx("span",{className:"step-number",children:"01"}),e.jsx("h3",{children:"Submit Request"}),e.jsx("p",{children:"Contact our concierge team with your Order ID to initiate a return request."})]})}),e.jsx(n,{delay:.1,yOffset:25,children:e.jsxs(c,{children:[e.jsx("span",{className:"step-number",children:"02"}),e.jsx("h3",{children:"Instructions"}),e.jsx("p",{children:"Receive return shipping guidelines and secure return paperwork."})]})}),e.jsx(n,{delay:.2,yOffset:25,children:e.jsxs(c,{children:[e.jsx("span",{className:"step-number",children:"03"}),e.jsx("h3",{children:"Secure Return"}),e.jsx("p",{children:"Package the item securely with original certificates and luxury box."})]})}),e.jsx(n,{delay:.3,yOffset:25,children:e.jsxs(c,{children:[e.jsx("span",{className:"step-number",children:"04"}),e.jsx("h3",{children:"Inspection"}),e.jsx("p",{style:{color:r.inspectionProcessColor||void 0},children:r.inspectionProcess?r.inspectionProcess.slice(0,100)+"...":"Gemmological verification by our master jewellers upon arrival."})]})}),e.jsx(n,{delay:.4,yOffset:25,children:e.jsxs(c,{children:[e.jsx("span",{className:"step-number",children:"05"}),e.jsx("h3",{children:"Refund"}),e.jsx("p",{style:{color:r.refundTimingColor||void 0},children:r.refundTiming?`Reimbursement processed within ${r.refundTiming}.`:"Reimbursement processed to original payment method within 5–7 business days."})]})})]}),e.jsxs(k,{children:[e.jsx(n,{yOffset:35,children:e.jsxs(s,{children:[e.jsx("h2",{style:{color:r.returnWindowColor||void 0},children:v}),e.jsx("p",{style:{color:r.returnEligibilityColor||void 0,whiteSpace:"pre-line"},children:r.returnEligibility||`At AethelCarats, we stand behind the craftsmanship and quality of our fine jewellery. If for any reason you are not completely satisfied with your purchase of a standard, non-customised item, you may return it within ${u} for a full refund or exchange.`}),e.jsx("p",{children:"To be eligible for a return, the jewellery piece must satisfy all of the following conditions:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Must be unworn, undamaged, and in pristine original condition."}),e.jsx("li",{children:"Must include all original diamond grading certificates (GIA, IGI), authenticity cards, and documentation."}),e.jsx("li",{children:"Must be returned in the original illuminated AethelCarats presentation packaging."})]})]})}),r.returnProcess&&e.jsx(n,{yOffset:35,children:e.jsxs(s,{children:[e.jsx("h2",{children:"Return Step-by-Step Process"}),e.jsx("p",{style:{color:r.returnProcessColor||void 0,whiteSpace:"pre-line"},children:r.returnProcess})]})}),e.jsx(n,{yOffset:35,children:e.jsxs(s,{children:[e.jsx("h2",{children:"Custom & Bespoke Creations"}),e.jsx("p",{style:{color:r.customJewelleryRulesColor||void 0,whiteSpace:"pre-line"},children:r.customJewelleryRules||"Because custom jewellery pieces, special-order diamond cuts, and personalized engraved creations are uniquely hand-crafted to your individual specifications, they are exempt from standard returns and non-refundable."}),e.jsx("p",{children:"However, we want you to cherish your piece. We offer complimentary ring resizing within 60 days of purchase and complimentary cleaning, inspection, and prong checks."})]})}),r.nonReturnableItems&&e.jsx(n,{yOffset:35,children:e.jsxs(s,{children:[e.jsx("h2",{children:"Non-Returnable Items"}),e.jsx("p",{style:{color:r.nonReturnableItemsColor||void 0,whiteSpace:"pre-line"},children:r.nonReturnableItems})]})}),e.jsx(n,{yOffset:35,children:e.jsxs(s,{children:[e.jsx("h2",{children:"Inspection & Quality Controls"}),e.jsx("p",{style:{color:r.inspectionProcessColor||void 0,whiteSpace:"pre-line"},children:r.inspectionProcess||"All returned jewellery undergoes rigorous gemmological inspection at our master atelier. We verify the diamond laser inscriptions, serial numbers, metal purity hallmarks, and stone settings against original production records."}),e.jsx("p",{children:"Items showing signs of wear, alteration, resizing by unauthorized third-party jewellers, or missing diamond certificates will not be accepted and will be returned to the sender."})]})}),r.diamondRules&&e.jsx(n,{yOffset:35,children:e.jsxs(s,{children:[e.jsx("h2",{children:"Loose Diamond & Certification Rules"}),e.jsx("p",{style:{color:r.diamondRulesColor||void 0,whiteSpace:"pre-line"},children:r.diamondRules})]})}),e.jsx(n,{yOffset:35,children:e.jsxs(s,{children:[e.jsx("h2",{children:"Refund Processing & Timelines"}),e.jsx("p",{style:{color:r.refundTimingColor||void 0,whiteSpace:"pre-line"},children:r.refundTiming?`Reimbursement is processed within ${r.refundTiming} following atelier inspection verification to your original payment method.`:"Upon successful inspection (typically within 2 to 3 business days of receipt), your refund will be issued to your original payment method. Depending on your financial institution, funds usually appear on your statement within 5 to 7 business days."}),e.jsx("p",{children:"Return shipping fees are complimentary for domestic orders using our prepaid insured shipping labels. International return shipping rates may vary."})]})}),e.jsx(n,{yOffset:35,children:e.jsxs(s,{children:[e.jsx("h2",{children:"Damaged or Incorrect Items"}),e.jsx("p",{children:"In the unlikely event that an item arrives damaged, defective, or incorrect, please notify Customer Care within 48 hours of delivery. We will immediately arrange a priority replacement or full refund."})]})}),(g=o==null?void 0:o.sections)==null?void 0:g.map((i,p)=>{if(!i.isVisible)return null;let t={};try{t=typeof i.content=="string"?JSON.parse(i.content):i.content}catch{t={text:i.content}}return e.jsx(n,{yOffset:35,children:e.jsxs(s,{children:[e.jsx("h2",{children:i.title||t.title||t.heading||"Additional Policy"}),e.jsx("p",{style:{whiteSpace:"pre-line"},children:t.text||t.content||t.body||""})]})},i.id||p)})]}),e.jsx(n,{yOffset:35,children:e.jsx(B,{children:e.jsxs(D,{children:[e.jsx("h2",{children:"Need Help With a Return?"}),e.jsx("p",{children:"Our customer care concierge team is available to assist you with return authorizations, shipping labels, or exchange guidance."}),e.jsxs("div",{className:"btn-group",children:[e.jsxs(m,{to:"/contact-us",className:"primary-btn",children:[e.jsx(A,{size:16})," CONTACT CUSTOMER CARE"]}),e.jsxs("a",{href:`mailto:${j}`,className:"secondary-btn",children:[e.jsx(E,{size:16})," EMAIL CONCIERGE"]})]})]})})}),e.jsx(I,{})]})};export{J as ReturnsRefundsPage};
