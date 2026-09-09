import{r as c,j as e,f as C,l as A,i as W,b1 as P,M as R,P as G,aG as L,a$ as H}from"./react-vendor-BsBv4awM.js";import{g as a}from"./ui-vendor-C0FaE403.js";import{a as y,R as u}from"./admin-pages-B_nC9bIo.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const N=[{id:"d1",category:"Diamonds",question:"What types of diamonds does AethelCarats offer?",answer:"AethelCarats offers both premium certified Natural Diamonds and ethically created Lab-Grown Diamonds. Every diamond in our vault is meticulously hand-selected by master gemmologists for exceptional brilliance, clarity, and cut precision."},{id:"d2",category:"Diamonds",question:"What is the difference between natural and lab-grown diamonds?",answer:"Chemically, physically, and optically, natural and lab-grown diamonds are 100% identical. Both consist of pure carbon crystallised in a cubic lattice structure. Natural diamonds were formed deep within the earth over billions of years, whereas lab-grown diamonds are grown using advanced technology mimicking geothermal conditions."},{id:"d3",category:"Diamonds",question:"What diamond certifications are available?",answer:"All major diamonds at AethelCarats are accompanied by independent gemmological certificates from world-renowned laboratories, including GIA (Gemological Institute of America) and IGI (International Gemological Institute), detailing exact carat, colour, clarity, and cut grades."},{id:"d4",category:"Diamonds",question:"Can I request a specific diamond shape or custom cut?",answer:"Yes. Our Diamond Vault features Round Brilliant, Oval, Emerald, Radiant, Princess, Cushion, Pear, Marquise, Asscher, and Heart shapes. If you desire a specific proportion or rare cut, our concierge team can source it directly for you."},{id:"j1",category:"Jewellery",question:"Can I customise a jewellery design?",answer:"Absolutely. Every piece in our collection can be customized with your choice of metal (18K Yellow Gold, 18K White Gold, 18K Rose Gold, or Platinum 950), center diamond shape, size, and accent stones."},{id:"j2",category:"Jewellery",question:"Can I request a different metal colour or purity?",answer:"Yes. We work exclusively with solid 14K Gold, 18K Gold, and Platinum 950. We do not use gold plating or vermeil, ensuring your fine jewellery lasts for generations."},{id:"j3",category:"Jewellery",question:"Can I order a design based on my own reference photo?",answer:"Yes. You can share your inspiration images, reference sketches, or family heirlooms with our concierge team. We will produce detailed CAD renders and craft a bespoke piece tailored to your vision."},{id:"c1",category:"Custom Jewellery",question:"Can AethelCarats create custom jewellery from scratch?",answer:"Yes. Our Bespoke Atelier specialises in custom engagement rings, wedding bands, high-jewellery necklaces, and bespoke pendants. We partner with you from initial sketch through 3D CAD modeling to hand-finishing."},{id:"c2",category:"Custom Jewellery",question:"Do you provide 3D CAD renders before production?",answer:"Yes. Before crafting your piece, we provide photo-realistic 3D CAD digital renders and exact dimensional specifications for your review and approval."},{id:"c3",category:"Custom Jewellery",question:"How long does custom jewellery production take?",answer:"Custom bespoke pieces typically require 2 to 3 weeks from CAD approval to hand-crafting, setting, hallmarking, and final quality inspection before shipping."},{id:"o1",category:"Orders",question:"How do I place an order?",answer:"You can order directly online through our secure checkout, or consult with our Jewellery Concierge to place your order via telephone, email, or WhatsApp."},{id:"o2",category:"Orders",question:"Can I enquire or speak with a specialist before ordering?",answer:'We highly encourage it. Click "Inquire on WhatsApp" or "Contact Us" on any product page to connect directly with a diamond specialist who can guide your choice.'},{id:"o3",category:"Orders",question:"Can I modify or cancel my order after it has been placed?",answer:"Orders can be modified or cancelled within 24 hours of placement before crafting or dispatch commences. Please contact Customer Care immediately if changes are required."},{id:"s1",category:"Shipping",question:"Where do you ship?",answer:"We provide complimentary fully-insured express shipping worldwide, including the United Kingdom, United States, Europe, Canada, Australia, and the Middle East."},{id:"s2",category:"Shipping",question:"How is jewellery packaged?",answer:"Every piece is delivered in an unbranded, secure outer box for privacy, containing our signature illuminated luxury leatherette box, protective polishing cloth, certificate holder, and authenticity card."},{id:"s3",category:"Shipping",question:"Is shipping fully insured?",answer:"Yes. All shipments are 100% transit-insured from our atelier until signed for at your delivery address. A signature is required upon receipt."},{id:"r1",category:"Returns & Refunds",question:"What is your return policy?",answer:"We offer a complimentary 30-day return policy for standard, ready-to-ship jewellery items in their unworn, original condition with original diamond certificates and packaging intact."},{id:"r2",category:"Returns & Refunds",question:"Are custom or engraved items returnable?",answer:"Custom bespoke creations and personalized engraved items are non-refundable due to their unique tailored nature. However, we offer complimentary resizing and adjustments."},{id:"r3",category:"Returns & Refunds",question:"When will I receive my refund?",answer:"Once your returned item undergoes gemmological inspection at our atelier (usually 2–3 business days), your refund will be processed back to your original payment method within 5 to 7 business days."},{id:"p1",category:"Payments",question:"What payment methods are accepted?",answer:"We accept major credit/debit cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, Bank Wire Transfer, and flexible installment options."},{id:"crt1",category:"Certificates",question:"Do jewellery products include diamond grading certificates?",answer:"Yes. All center diamonds 0.30ct and above include an official grading report from GIA or IGI verifying color, clarity, carat weight, cut, and laser inscription."},{id:"cm1",category:"Care & Maintenance",question:"How should I clean and care for my diamond jewellery?",answer:"Clean your piece gently with warm water, mild dish soap, and a soft-bristled toothbrush. Avoid harsh chemicals, perfumes, or swimming pools while wearing fine jewellery."}],Q=a.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`,J=a.div`
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
    color: #F5F1E8;
    font-weight: 500;
  }
`,T=a.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 32px;
  text-align: center;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    font-weight: 500;
    color: #F5F1E8;
    margin-bottom: 16px;
    letter-spacing: -0.01em;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  p.subtitle {
    font-size: 1.1rem;
    color: #D8D2C5;
    max-width: 680px;
    margin: 0 auto 32px;
    line-height: 1.6;
  }
`,Y=a.div`
  max-width: 640px;
  margin: 0 auto;
  position: relative;

  input {
    width: 100%;
    padding: 16px 20px 16px 48px;
    border: 1px solid rgba(140, 116, 75, 0.3);
    border-radius: 30px;
    background: #111111;
    font-size: 0.95rem;
    color: #F5F1E8;
    outline: none;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #C9A96E;
    }

    &::placeholder {
      color: #777777;
    }
  }

  .search-icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: #C9A96E;
  }
`,$=a.div`
  max-width: 1000px;
  margin: 32px auto 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 0 24px;
`,M=a.button`
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${({$active:i})=>i?"#C9A96E":"rgba(140, 116, 75, 0.25)"};
  background: ${({$active:i})=>i?"#C9A96E":"#151515"};
  color: ${({$active:i})=>i?"#0B0B0B":"#D8D2C5"};
  transition: all 0.2s ease;

  &:hover {
    border-color: #C9A96E;
    color: ${({$active:i})=>i?"#0B0B0B":"#C9A96E"};
  }
`,K=a.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,U=a.div`
  background: #151515;
  border: 1px solid ${({$open:i})=>i?"#C9A96E":"rgba(140, 116, 75, 0.25)"};
  border-radius: 6px;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,V=a.button`
  width: 100%;
  padding: 24px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  gap: 16px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: #F5F1E8;
    line-height: 1.4;
  }

  .toggle-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #1F1F1F;
    border: 1px solid rgba(140, 116, 75, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #C9A96E;
    flex-shrink: 0;
  }
`,_=a.div`
  max-height: ${({$open:i})=>i?"500px":"0"};
  opacity: ${({$open:i})=>i?"1":"0"};
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  .body-inner {
    padding: 0 28px 24px;
    color: #D8D2C5;
    font-size: 0.95rem;
    line-height: 1.7;
    border-top: 1px solid rgba(140, 116, 75, 0.15);
    padding-top: 16px;
  }
`,X=a.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`,Z=a.div`
  background: #151515;
  color: #F5F1E8;
  padding: 40px;
  border-radius: 6px;
  border: 1px solid rgba(140, 116, 75, 0.3);
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
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
      border-radius: 4px;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    a.primary-btn {
      background: #C9A96E;
      color: #0B0B0B;
      &:hover {
        background: #DFBA73;
        transform: translateY(-2px);
      }
    }

    a.secondary-btn {
      border: 1px solid rgba(140, 116, 75, 0.4);
      color: #F5F1E8;
      background: #1F1F1F;
      &:hover {
        border-color: #C9A96E;
        color: #C9A96E;
        transform: translateY(-2px);
      }
    }
  }
`,ee=["All","Diamonds","Jewellery","Custom Jewellery","Orders","Shipping","Returns & Refunds","Payments","Certificates","Care & Maintenance"],se=()=>{var b;const[i,j]=c.useState(N),[m,v]=c.useState(""),[h,q]=c.useState("All"),[E,F]=c.useState(["d1","j1"]),[s,k]=c.useState(null),[f,S]=c.useState("+91 79902 78892"),[te,D]=c.useState("concierge@aethelcarats.com");c.useEffect(()=>{window.scrollTo(0,0),document.title="AethelCarats FAQ | Diamonds, Jewellery, Orders & Shipping",y.getFaqs().then(r=>{Array.isArray(r)&&r.length>0&&j(r.map(l=>({id:l.id,category:l.category,question:l.question,answer:l.answer})))}).catch(console.error),y.getPageBySlug("faq").then(r=>{var l;if(r){let g={};const p=r.draftContent||r.content;if(p)try{g=typeof p=="string"?JSON.parse(p):p}catch{g={content:p}}k({...r,parsedContent:g}),(l=r.seoMetadata)!=null&&l.seoTitle?document.title=r.seoMetadata.seoTitle:r.title&&(document.title=`${r.title} | AethelCarats Fine Jewellery`)}}).catch(console.warn),y.getSiteSettings().then(r=>{r&&(r.contactPhone&&S(r.contactPhone),r.contactEmail&&D(r.contactEmail))}).catch(console.warn);const t=document.querySelector('meta[name="description"]');t&&t.setAttribute("content","Find answers to common AethelCarats questions about diamonds, fine jewellery, custom designs, orders, shipping, returns and customer care.");const n=document.createElement("script");n.type="application/ld+json";const o=i.map(r=>({"@type":"Question",name:r.question,acceptedAnswer:{"@type":"Answer",text:r.answer}}));return n.innerHTML=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":"https://aethelcarats.com/faq#webpage",url:"https://aethelcarats.com/faq",name:"AethelCarats Frequently Asked Questions",description:"Find answers to common questions about diamonds, jewellery, custom orders, shipping and returns."},{"@type":"FAQPage","@id":"https://aethelcarats.com/faq#faqpage",mainEntity:o},{"@type":"BreadcrumbList","@id":"https://aethelcarats.com/faq#breadcrumb",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://aethelcarats.com"},{"@type":"ListItem",position:2,name:"Customer Care",item:"https://aethelcarats.com/faq"},{"@type":"ListItem",position:3,name:"FAQ",item:"https://aethelcarats.com/faq"}]}]}),document.head.appendChild(n),()=>{document.head.removeChild(n)}},[]);const z=t=>{F(n=>n.includes(t)?n.filter(o=>o!==t):[...n,t])},x=i.filter(t=>{const n=h==="All"||t.category===h,o=m===""||t.question.toLowerCase().includes(m.toLowerCase())||t.answer.toLowerCase().includes(m.toLowerCase());return n&&o}),d=(s==null?void 0:s.parsedContent)||{},w=d.heading||(s==null?void 0:s.title)||"Frequently Asked Questions",I=d.subheading||"Everything you need to know before choosing your diamond or fine jewellery piece.",B=(d.phone||f).replace(/[^\d+]/g,""),O=d.phone||f;return e.jsxs(Q,{children:[e.jsxs(J,{children:[e.jsx(C,{to:"/",children:"Home"}),e.jsx(A,{size:12}),e.jsx("span",{children:"Customer Care"}),e.jsx(A,{size:12}),e.jsx("span",{className:"current",children:w})]}),e.jsx(u,{yOffset:35,children:e.jsxs(T,{children:[e.jsx("h1",{style:{color:d.headingColor||void 0},children:w}),e.jsx("p",{className:"subtitle",style:{color:d.subheadingColor||void 0},children:I}),e.jsxs(Y,{children:[e.jsx(W,{className:"search-icon",size:20}),e.jsx("input",{type:"text",placeholder:"Search questions (e.g. Lab-grown diamonds, shipping, custom CAD...)",value:m,onChange:t=>v(t.target.value)})]})]})}),e.jsx(u,{yOffset:25,children:e.jsx($,{children:ee.map(t=>e.jsx(M,{$active:h===t,onClick:()=>q(t),children:t},t))})}),e.jsx(K,{children:x.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"48px 0",color:"#77736c"},children:[e.jsx(P,{size:40,style:{margin:"0 auto 12px",opacity:.5}}),e.jsx("p",{style:{fontSize:"1.1rem"},children:"No questions match your search query."}),e.jsx("p",{style:{fontSize:"0.85rem",marginTop:4},children:'Try searching for alternate terms or click "All".'})]}):x.map((t,n)=>{const o=E.includes(t.id);return e.jsx(u,{staggerIndex:n,yOffset:20,children:e.jsxs(U,{$open:o,children:[e.jsxs(V,{onClick:()=>z(t.id),children:[e.jsx("h3",{children:t.question}),e.jsx("div",{className:"toggle-icon",children:o?e.jsx(R,{size:16}):e.jsx(G,{size:16})})]}),e.jsx(_,{$open:o,children:e.jsx("div",{className:"body-inner",children:e.jsx("p",{children:t.answer})})})]})},t.id)})}),(b=s==null?void 0:s.sections)==null?void 0:b.map((t,n)=>{if(t.isVisible===!1)return null;let o={};try{o=typeof t.content=="string"?JSON.parse(t.content):t.content||{}}catch{o={text:t.content}}return e.jsx(u,{yOffset:35,children:e.jsxs("div",{style:{maxWidth:900,margin:"40px auto 0",padding:"32px",background:"#151515",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:6},children:[e.jsx("h2",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",color:"#F5F1E8",marginBottom:12},children:t.title||o.title||o.heading}),o.subtitle&&e.jsx("h4",{style:{color:"#C9A96E",margin:"0 0 12px",fontSize:"0.95rem"},children:o.subtitle}),e.jsx("p",{style:{color:"#D8D2C5",lineHeight:1.7,whiteSpace:"pre-line"},children:o.description||o.text||o.content||""})]})},t.id||n)}),e.jsx(u,{yOffset:35,children:e.jsx(X,{children:e.jsxs(Z,{children:[e.jsx("h2",{children:"Still Have Questions?"}),e.jsx("p",{children:"Our diamond specialists and customer care concierge are available to assist you with any custom questions or guidance."}),e.jsxs("div",{className:"btn-group",children:[e.jsxs(C,{to:"/contact-us",className:"primary-btn",children:[e.jsx(L,{size:16})," CONTACT CUSTOMER CARE"]}),e.jsxs("a",{href:`tel:${B}`,className:"secondary-btn",children:[e.jsx(H,{size:16})," CALL ",O]})]})]})})})]})};export{se as FAQPage};
