import{r as s,j as e,e as k,l as b,aX as E,aC as S,aY as z,q,ag as P}from"./react-vendor-BSubOYpr.js";import{g as o}from"./ui-vendor-C-kywwZi.js";import{a as x,R as A}from"./admin-pages-YV7C3BNA.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const I=o.div`
  background-color: #f7f6f2;
  color: #1a1918;
  min-height: 100vh;
  padding-bottom: 80px;
`,T=o.div`
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
`,D=o.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 40px;
  text-align: center;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    font-weight: 500;
    color: #1a1918;
    margin-bottom: 16px;
    letter-spacing: -0.01em;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  p.subtitle {
    font-size: 1.1rem;
    color: #55524d;
    max-width: 680px;
    margin: 0 auto;
    line-height: 1.6;
  }
`,L=o.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 64px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`,R=o.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: #1a1918;
    margin-bottom: 8px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e8e3d9;
  }
`,u=o.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;

  .icon-wrapper {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #f5f2ea;
    border: 1px solid #e8e3d9;
    color: #c9a45c;
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
      color: #77736c;
      font-weight: 600;
    }

    a, span {
      font-size: 1.05rem;
      color: #1a1918;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    a:hover {
      color: #c9a45c;
    }

    p.note {
      font-size: 0.85rem;
      color: #77736c;
      margin-top: 2px;
    }
  }
`,M=o.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #1a1918;
  color: #fffdf9;
  padding: 14px 24px;
  border-radius: 4px;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    background: #c9a45c;
    color: #1a1918;
  }
`,F=o.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  padding: 40px;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: #1a1918;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e8e3d9;
  }

  @media (max-width: 576px) {
    padding: 24px;
  }
`,w=o.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`,c=o.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  grid-column: ${({$fullWidth:n})=>n?"span 2":"span 1"};
  margin-bottom: 20px;

  @media (max-width: 576px) {
    grid-column: span 1 !important;
  }

  label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
    color: #4a4741;
  }

  input, select, textarea {
    padding: 12px 16px;
    border: 1px solid #e8e3d9;
    background: #fffdf9;
    font-size: 0.95rem;
    color: #1a1918;
    border-radius: 4px;
    outline: none;
    font-family: inherit;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #c9a45c;
    }
  }

  textarea {
    min-height: 130px;
    resize: vertical;
  }
`,G=o.button`
  width: 100%;
  background: #1a1918;
  color: #fffdf9;
  border: none;
  padding: 16px;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #c9a45c;
    color: #1a1918;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,J=o.p`
  font-size: 0.8rem;
  color: #77736c;
  margin-top: 12px;
  text-align: center;
  line-height: 1.5;
`,H=o.section`
  max-width: 1200px;
  margin: 64px auto 0;
  padding: 0 24px;
`,O=o.div`
  background: #1a1918;
  color: #fffdf9;
  padding: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 32px 24px;
  }

  .text-content {
    h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.2rem;
      color: #fffdf9;
      margin-bottom: 12px;
    }

    p {
      font-size: 1rem;
      color: #d9d3c7;
      max-width: 580px;
      line-height: 1.6;
    }
  }

  a.banner-btn {
    background: #c9a45c;
    color: #1a1918;
    padding: 14px 28px;
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      background: #fffdf9;
      color: #1a1918;
    }
  }
`,K=()=>{const[n,f]=s.useState({firstName:"",lastName:"",email:"",phone:"",enquiryType:"Diamond Enquiry",message:""}),[g,y]=s.useState(!1),[C,j]=s.useState(!1),[m,v]=s.useState(null),[i,h]=s.useState({phone:"+91973785306",displayPhone:"+91973785306",email:"contact@floksyjewel.com",address:"Surat, India",whatsappNumber:"91973785306"});s.useEffect(()=>{document.title="Contact Floksy Jewel | Diamond & Fine Jewellery Concierge",x.getPageBySlug("contact-us").then(t=>{var r;if(t){let d={};const p=t.draftContent||t.content;if(p)try{d=typeof p=="string"?JSON.parse(p):p}catch{d={heading:t.title}}v({...t,cmsContent:d}),(r=t.seoMetadata)!=null&&r.seoTitle&&(document.title=t.seoMetadata.seoTitle)}}).catch(console.error),x.getSiteSettings().then(t=>{t&&(t.contactPhone&&h(r=>({...r,phone:t.contactPhone.replace(/[^\d+]/g,""),displayPhone:t.contactPhone})),t.contactEmail&&h(r=>({...r,email:t.contactEmail})),t.whatsappNumber&&h(r=>({...r,whatsappNumber:t.whatsappNumber})))}).catch(console.error)},[]);const a=(m==null?void 0:m.cmsContent)||{};s.useEffect(()=>{const t=document.createElement("script");return t.type="application/ld+json",t.innerHTML=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://floksyjewel.com/#organization",name:"Floksy Jewel",url:"https://floksyjewel.com",telephone:i.phone,email:i.email,logo:"https://floksyjewel.com/assets/floksy-jewel-logo.png"},{"@type":"ContactPage","@id":"https://floksyjewel.com/contact-us#webpage",url:"https://floksyjewel.com/contact-us",name:"Contact Floksy Jewel",description:"Contact Floksy Jewel for diamond and fine jewellery enquiries."},{"@type":"BreadcrumbList","@id":"https://floksyjewel.com/contact-us#breadcrumb",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://floksyjewel.com"},{"@type":"ListItem",position:2,name:"Customer Care",item:"https://floksyjewel.com/contact-us"},{"@type":"ListItem",position:3,name:"Contact Us",item:"https://floksyjewel.com/contact-us"}]}]}),document.head.appendChild(t),()=>{document.head.removeChild(t)}},[i.email,i.phone]);const l=(t,r)=>{f(d=>({...d,[t]:r}))},N=async t=>{t.preventDefault(),y(!0);try{await x.createCustomRequest({name:`${n.firstName} ${n.lastName}`.trim(),email:n.email,phone:n.phone,category:n.enquiryType,notes:n.message}),j(!0),f({firstName:"",lastName:"",email:"",phone:"",enquiryType:"Diamond Enquiry",message:""})}catch(r){console.error("Contact form submission error:",r),j(!0)}finally{y(!1)}};return e.jsxs(I,{children:[e.jsxs(T,{children:[e.jsx(k,{to:"/",children:"Home"}),e.jsx(b,{size:12}),e.jsx("span",{children:"Customer Care"}),e.jsx(b,{size:12}),e.jsx("span",{className:"current",children:"Contact Us"})]}),e.jsx(A,{yOffset:35,children:e.jsxs(D,{children:[e.jsx("h1",{children:a.heading||"Contact Floksy Jewel"}),e.jsx("p",{className:"subtitle",children:a.subheading||"Personalised assistance for diamonds, fine jewellery and bespoke creations. Our dedicated atelier team is at your service."})]})}),e.jsxs(L,{children:[e.jsxs(R,{children:[e.jsxs("div",{children:[e.jsx("h2",{children:a.customerCareHeading||"CUSTOMER CARE"}),e.jsx("p",{style:{color:"#55524d",fontSize:"0.95rem",lineHeight:"1.6",marginTop:8},children:a.customerCareDescription||"Our diamond specialists and master jewellers are available to guide you through diamond selection, sizing, or custom CAD requests."})]}),e.jsxs(u,{children:[e.jsx("div",{className:"icon-wrapper",children:e.jsx(E,{size:20})}),e.jsxs("div",{className:"details",children:[e.jsx("label",{children:a.phoneLabel||"Telephone Assistance"}),e.jsx("a",{href:`tel:${(a.phone||i.phone).replace(/[^\d+]/g,"")}`,children:a.phone||i.displayPhone}),e.jsx("p",{className:"note",children:a.businessHours||"Mon – Sat: 9:00 AM – 7:00 PM GMT"})]})]}),e.jsxs(u,{children:[e.jsx("div",{className:"icon-wrapper",children:e.jsx(S,{size:20})}),e.jsxs("div",{className:"details",children:[e.jsx("label",{children:a.emailLabel||"Email Concierge"}),e.jsx("a",{href:`mailto:${a.email||i.email}`,children:a.email||i.email}),e.jsx("p",{className:"note",children:a.responseTime||"Responses within 24 business hours"})]})]}),e.jsxs(u,{children:[e.jsx("div",{className:"icon-wrapper",children:e.jsx(z,{size:20})}),e.jsxs("div",{className:"details",children:[e.jsx("label",{children:a.locationLabel||"Private Atelier Appointments"}),e.jsx("span",{children:a.address||i.address||"Surat, India"}),e.jsx("p",{className:"note",children:a.appointmentDescription||"By private appointment only"})]})]}),e.jsx("div",{children:e.jsxs(M,{href:`https://wa.me/${(a.whatsappNumber||i.whatsappNumber||"91973785306").replace(/[^\d]/g,"")||"91973785306"}?text=${encodeURIComponent("Hello Floksy Jewel Atelier, I would like to inquire about fine jewellery and diamond assistance.")}`,target:"_blank",rel:"noopener noreferrer",children:[e.jsx(q,{size:18})," WhatsApp Concierge"]})})]}),e.jsxs(F,{children:[e.jsx("h2",{children:a.formHeading||"Send an Enquiry"}),C?e.jsxs("div",{style:{textAlign:"center",padding:"40px 20px"},children:[e.jsx(P,{size:48,color:"#c9a45c",style:{margin:"0 auto 16px"}}),e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",marginBottom:12},children:"Thank You for Contacting Us"}),e.jsx("p",{style:{color:"#55524d",lineHeight:"1.6",fontSize:"0.95rem"},children:"Your enquiry has been submitted successfully. A Floksy Jewel concierge specialist will respond to your request within 24 hours."})]}):e.jsxs("form",{onSubmit:N,children:[e.jsxs(w,{children:[e.jsxs(c,{children:[e.jsxs("label",{children:[a.firstNameLabel||"FIRST NAME"," *"]}),e.jsx("input",{type:"text",required:!0,placeholder:a.firstNamePlaceholder||"Enter your first name",value:n.firstName,onChange:t=>l("firstName",t.target.value)})]}),e.jsxs(c,{children:[e.jsxs("label",{children:[a.lastNameLabel||"LAST NAME"," *"]}),e.jsx("input",{type:"text",required:!0,placeholder:a.lastNamePlaceholder||"Enter your last name",value:n.lastName,onChange:t=>l("lastName",t.target.value)})]})]}),e.jsxs(w,{children:[e.jsxs(c,{children:[e.jsxs("label",{children:[a.emailInputLabel||"EMAIL ADDRESS"," *"]}),e.jsx("input",{type:"email",required:!0,placeholder:a.emailInputPlaceholder||"name@example.com",value:n.email,onChange:t=>l("email",t.target.value)})]}),e.jsxs(c,{children:[e.jsx("label",{children:a.phoneInputLabel||"PHONE NUMBER"}),e.jsx("input",{type:"tel",placeholder:a.phoneInputPlaceholder||"+1 (555) 000-0000",value:n.phone,onChange:t=>l("phone",t.target.value)})]})]}),e.jsxs(c,{$fullWidth:!0,children:[e.jsxs("label",{children:[a.enquiryTypeLabel||"ENQUIRY TYPE"," *"]}),e.jsx("select",{value:n.enquiryType,onChange:t=>l("enquiryType",t.target.value),children:Array.isArray(a.enquiryTypes)&&a.enquiryTypes.length>0?a.enquiryTypes.filter(t=>t.isEnabled!==!1).map(t=>e.jsx("option",{value:t.name,children:t.name},t.id||t.name)):e.jsxs(e.Fragment,{children:[e.jsx("option",{value:"Diamond Enquiry",children:"Diamond Enquiry"}),e.jsx("option",{value:"Jewellery Enquiry",children:"Jewellery Enquiry"}),e.jsx("option",{value:"Custom CAD",children:"Custom CAD"}),e.jsx("option",{value:"Wholesale",children:"Wholesale"}),e.jsx("option",{value:"General Question",children:"General Question"})]})})]}),e.jsxs(c,{$fullWidth:!0,children:[e.jsxs("label",{children:[a.messageLabel||"MESSAGE"," *"]}),e.jsx("textarea",{required:!0,placeholder:a.messagePlaceholder||"Please describe how we can assist you with your diamond or jewellery selection...",value:n.message,onChange:t=>l("message",t.target.value)})]}),e.jsx(G,{type:"submit",disabled:g,children:g?"SENDING ENQUIRY...":"SEND ENQUIRY"}),e.jsx(J,{children:"Your information is used only to respond to your enquiry and provide requested assistance."})]})]})]}),e.jsx(H,{children:e.jsxs(O,{children:[e.jsxs("div",{className:"text-content",children:[e.jsx("h2",{children:"Private Jewellery Concierge"}),e.jsx("p",{children:"Looking for a bespoke diamond ring, advice on certified lab-grown diamonds, or custom 3D CAD design? Our master jewellers are here to assist you at every step."})]}),e.jsx("a",{href:`mailto:${i.email}?subject=Private%20Concierge%20Inquiry`,className:"banner-btn",children:"SPEAK WITH OUR CONCIERGE"})]})})]})};export{K as ContactUsPage};
