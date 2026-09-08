import{r as d,j as e,f as A,l as j,aY as N,aE as F,aZ as S,aU as D,aj as z}from"./react-vendor-CKfE40gi.js";import{g as t}from"./ui-vendor-5voluciG.js";import{a as h,R as p}from"./admin-pages-CLj1E1WA.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const q=t.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`,B=t.div`
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
`,P=t.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 40px;
  text-align: center;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    font-weight: 500;
    color: #F5F1E8;
    margin-bottom: 16px;
    letter-spacing: 0.04em;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  p.subtitle {
    font-size: 1.05rem;
    color: #D8D2C5;
    max-width: 680px;
    margin: 0 auto;
    line-height: 1.6;
  }
`,I=t.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 48px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`,k=t.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: #F5F1E8;
    margin-bottom: 8px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(140, 116, 75, 0.2);
    letter-spacing: 0.08em;
  }
`,u=t.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;

  .icon-wrapper {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #111111;
    border: 1px solid rgba(140, 116, 75, 0.3);
    color: #C9A96E;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 4px;

    label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #A8A8A8;
      font-weight: 700;
    }

    a, span {
      font-size: 1.05rem;
      color: #F5F1E8;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    a:hover {
      color: #C9A96E;
    }

    p.note {
      font-size: 0.85rem;
      color: #A8A8A8;
      margin-top: 2px;
    }
  }
`,T=t.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #111111;
  border: 1px solid rgba(140, 116, 75, 0.3);
  color: #F5F1E8;
  padding: 14px 24px;
  border-radius: 2px;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s ease;
  margin-top: 8px;

  &:hover {
    background: #C9A96E;
    border-color: #C9A96E;
    color: #0B0B0B;
  }
`,R=t.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: #F5F1E8;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(140, 116, 75, 0.2);
    letter-spacing: 0.08em;
  }

  @media (max-width: 576px) {
    padding: 24px;
  }
`,C=t.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`,c=t.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  grid-column: ${({$fullWidth:o})=>o?"span 2":"span 1"};
  margin-bottom: 20px;

  @media (max-width: 576px) {
    grid-column: span 1 !important;
  }

  label {
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
    color: #F5F1E8;
  }

  input, select, textarea {
    padding: 12px 16px;
    border: 1px solid rgba(140, 116, 75, 0.25);
    background: #111111;
    font-size: 0.95rem;
    color: #F5F1E8;
    border-radius: 2px;
    outline: none;
    font-family: inherit;
    transition: all 0.2s ease;

    &::placeholder {
      color: #666666;
    }

    &:focus {
      border-color: #C9A96E;
      background: #0B0B0B;
      box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.2);
    }
  }

  textarea {
    min-height: 130px;
    resize: vertical;
  }
`,G=t.button`
  width: 100%;
  background: #C9A96E;
  color: #0B0B0B;
  border: 1px solid #C9A96E;
  padding: 16px;
  font-size: 0.85rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.25s ease;

  &:hover {
    background: #DFBA73;
    border-color: #DFBA73;
    box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,L=t.p`
  font-size: 0.8rem;
  color: #A8A8A8;
  margin-top: 12px;
  text-align: center;
  line-height: 1.5;
`,M=t.section`
  max-width: 1200px;
  margin: 64px auto 0;
  padding: 0 24px;
`,O=t.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  color: #F5F1E8;
  padding: 48px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 32px 24px;
  }

  .text-content {
    h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.2rem;
      color: #F5F1E8;
      margin-bottom: 12px;
      letter-spacing: 0.08em;
    }

    p {
      font-size: 1rem;
      color: #D8D2C5;
      max-width: 580px;
      line-height: 1.6;
    }
  }

  a.banner-btn {
    background: #C9A96E;
    color: #0B0B0B;
    padding: 14px 28px;
    font-size: 0.85rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
    border-radius: 2px;
    transition: all 0.25s ease;

    &:hover {
      background: #DFBA73;
      box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
    }
  }
`,Q=()=>{const[o,g]=d.useState({firstName:"",lastName:"",email:"",phone:"",enquiryType:"Diamond Enquiry",message:""}),[f,b]=d.useState(!1),[v,y]=d.useState(!1),[m,w]=d.useState(null),[i,x]=d.useState({phone:"+91973785306",displayPhone:"+91973785306",email:"contact@auroradiamonds.com",address:"Surat, India",whatsappNumber:"91973785306"});d.useEffect(()=>{document.title="Contact AethelCarats | Diamond & Fine Jewellery Concierge",h.getPageBySlug("contact-us").then(a=>{if(a){let n={};const l=a.draftContent||a.content;if(l)try{n=typeof l=="string"?JSON.parse(l):l}catch{n={heading:a.title}}w({...a,cmsContent:n})}}).catch(console.error),h.getSiteSettings().then(a=>{a&&(a.contactPhone&&x(n=>({...n,phone:a.contactPhone.replace(/[^\d+]/g,""),displayPhone:a.contactPhone})),a.contactEmail&&x(n=>({...n,email:a.contactEmail})),a.whatsappNumber&&x(n=>({...n,whatsappNumber:a.whatsappNumber})))}).catch(console.error)},[]);const r=(m==null?void 0:m.cmsContent)||{},s=(a,n)=>{g(l=>({...l,[a]:n}))},E=async a=>{a.preventDefault(),b(!0);try{await h.createCustomRequest({name:`${o.firstName} ${o.lastName}`.trim(),email:o.email,phone:o.phone,category:o.enquiryType,notes:o.message}),y(!0),g({firstName:"",lastName:"",email:"",phone:"",enquiryType:"Diamond Enquiry",message:""})}catch(n){console.error("Contact form submission error:",n),y(!0)}finally{b(!1)}};return e.jsxs(q,{children:[e.jsxs(B,{children:[e.jsx(A,{to:"/",children:"Home"}),e.jsx(j,{size:12}),e.jsx("span",{children:"Customer Care"}),e.jsx(j,{size:12}),e.jsx("span",{className:"current",children:"Contact Us"})]}),e.jsx(p,{yOffset:35,children:e.jsxs(P,{children:[e.jsx("h1",{style:{color:r.headingColor||void 0},children:r.heading||"Contact AethelCarats Atelier"}),e.jsx("p",{className:"subtitle",style:{color:r.subheadingColor||void 0},children:r.subheading||"Personalised assistance for certified diamonds, fine jewellery, and bespoke creations. Our dedicated atelier team is at your service."})]})}),e.jsxs(I,{children:[e.jsx(p,{delay:0,yOffset:25,children:e.jsxs(k,{children:[e.jsxs("div",{children:[e.jsx("h2",{style:{color:r.customerCareColor||void 0},children:r.customerCareHeading||"ATELIER CONCIERGE"}),e.jsx("p",{style:{color:r.customerCareColor||"#D8D2C5",fontSize:"0.95rem",lineHeight:"1.6",marginTop:8},children:r.customerCareDescription||"Our diamond specialists and master goldsmiths are available to guide you through diamond selection, sizing, or custom CAD requests."})]}),e.jsxs(u,{children:[e.jsx("div",{className:"icon-wrapper",children:e.jsx(N,{size:20})}),e.jsxs("div",{className:"details",children:[e.jsx("label",{style:{color:r.phoneColor||void 0},children:r.phoneLabel||"Telephone Assistance"}),e.jsx("a",{href:`tel:${(r.phone||i.phone).replace(/[^\d+]/g,"")}`,children:r.phone||i.displayPhone}),e.jsx("p",{className:"note",children:r.businessHours||"Mon – Sat: 9:00 AM – 7:00 PM GMT"})]})]}),e.jsxs(u,{children:[e.jsx("div",{className:"icon-wrapper",children:e.jsx(F,{size:20})}),e.jsxs("div",{className:"details",children:[e.jsx("label",{style:{color:r.emailColor||void 0},children:r.emailLabel||"Email Concierge"}),e.jsx("a",{href:`mailto:${r.email||i.email}`,children:r.email||i.email}),e.jsx("p",{className:"note",children:r.responseTime||"Responses within 24 business hours"})]})]}),e.jsxs(u,{children:[e.jsx("div",{className:"icon-wrapper",children:e.jsx(S,{size:20})}),e.jsxs("div",{className:"details",children:[e.jsx("label",{style:{color:r.appointmentColor||void 0},children:r.locationLabel||"Private Atelier Appointments"}),e.jsx("span",{children:r.address||i.address||"Surat, India"}),e.jsx("p",{className:"note",children:r.appointmentDescription||"By private appointment only"})]})]}),e.jsx("div",{children:e.jsxs(T,{href:`https://wa.me/${(r.whatsappNumber||i.whatsappNumber||"91973785306").replace(/[^\d]/g,"")||"91973785306"}?text=${encodeURIComponent("Hello AethelCarats, I would like to inquire about fine jewellery and diamond assistance.")}`,target:"_blank",rel:"noopener noreferrer",children:[e.jsx(D,{size:18})," WhatsApp Concierge"]})})]})}),e.jsx(p,{delay:.1,yOffset:25,children:e.jsxs(R,{children:[e.jsx("h2",{style:{color:r.formHeadingColor||void 0},children:r.formHeading||"Send an Enquiry"}),v?e.jsxs("div",{style:{textAlign:"center",padding:"40px 20px"},children:[e.jsx(z,{size:48,color:"#C9A96E",style:{margin:"0 auto 16px"}}),e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",color:"#F5F1E8",marginBottom:12},children:"Thank You for Contacting Us"}),e.jsx("p",{style:{color:"#D8D2C5",lineHeight:"1.6",fontSize:"0.95rem"},children:"Your enquiry has been submitted successfully. An AethelCarats concierge specialist will respond to your request within 24 hours."})]}):e.jsxs("form",{onSubmit:E,children:[e.jsxs(C,{children:[e.jsxs(c,{children:[e.jsxs("label",{children:[r.firstNameLabel||"FIRST NAME"," *"]}),e.jsx("input",{type:"text",required:!0,placeholder:r.firstNamePlaceholder||"Enter your first name",value:o.firstName,onChange:a=>s("firstName",a.target.value)})]}),e.jsxs(c,{children:[e.jsxs("label",{children:[r.lastNameLabel||"LAST NAME"," *"]}),e.jsx("input",{type:"text",required:!0,placeholder:r.lastNamePlaceholder||"Enter your last name",value:o.lastName,onChange:a=>s("lastName",a.target.value)})]})]}),e.jsxs(C,{children:[e.jsxs(c,{children:[e.jsxs("label",{children:[r.emailInputLabel||"EMAIL ADDRESS"," *"]}),e.jsx("input",{type:"email",required:!0,placeholder:r.emailInputPlaceholder||"name@example.com",value:o.email,onChange:a=>s("email",a.target.value)})]}),e.jsxs(c,{children:[e.jsx("label",{children:r.phoneInputLabel||"PHONE NUMBER"}),e.jsx("input",{type:"tel",placeholder:r.phoneInputPlaceholder||"+1 (555) 000-0000",value:o.phone,onChange:a=>s("phone",a.target.value)})]})]}),e.jsxs(c,{$fullWidth:!0,children:[e.jsxs("label",{children:[r.enquiryTypeLabel||"ENQUIRY TYPE"," *"]}),e.jsx("select",{value:o.enquiryType,onChange:a=>s("enquiryType",a.target.value),children:Array.isArray(r.enquiryTypes)&&r.enquiryTypes.length>0?r.enquiryTypes.filter(a=>a.isEnabled!==!1).map(a=>e.jsx("option",{value:a.name,children:a.name},a.id||a.name)):e.jsxs(e.Fragment,{children:[e.jsx("option",{value:"Diamond Enquiry",children:"Diamond Enquiry"}),e.jsx("option",{value:"Jewellery Enquiry",children:"Jewellery Enquiry"}),e.jsx("option",{value:"Custom CAD",children:"Custom CAD"}),e.jsx("option",{value:"Wholesale",children:"Wholesale"}),e.jsx("option",{value:"General Question",children:"General Question"})]})})]}),e.jsxs(c,{$fullWidth:!0,children:[e.jsxs("label",{children:[r.messageLabel||"MESSAGE"," *"]}),e.jsx("textarea",{required:!0,placeholder:r.messagePlaceholder||"Please describe how we can assist you with your diamond or jewellery selection...",value:o.message,onChange:a=>s("message",a.target.value)})]}),e.jsx(G,{type:"submit",disabled:f,children:f?"SENDING ENQUIRY...":"SEND ENQUIRY"}),e.jsx(L,{children:"Your information is used strictly to respond to your enquiry and provide requested concierge assistance."})]})]})})]}),e.jsx(p,{yOffset:35,children:e.jsx(M,{children:e.jsxs(O,{children:[e.jsxs("div",{className:"text-content",children:[e.jsx("h2",{children:"Private Jewellery Concierge"}),e.jsx("p",{children:"Looking for a bespoke diamond ring, advice on certified diamonds, or custom 3D CAD design? Our master jewellers are here to assist you at every step."})]}),e.jsx("a",{href:`mailto:${i.email}?subject=Private%20Concierge%20Inquiry`,className:"banner-btn",children:"SPEAK WITH OUR CONCIERGE"})]})})})]})};export{Q as ContactUsPage};
