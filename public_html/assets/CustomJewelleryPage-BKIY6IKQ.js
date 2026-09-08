import{r as d,j as e,A as R,a as F,Y as P}from"./react-vendor-BsBv4awM.js";import{g as i}from"./ui-vendor-C0FaE403.js";import{a as j,R as f}from"./admin-pages-COWs66LI.js";import{L as u}from"./LuxuryDropdown-C7uKpys6.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const O=i.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  box-sizing: border-box;
  color: #F5F1E8;

  @media (max-width: 768px) {
    padding: 24px 16px 60px;
  }
`,T=i.div`
  text-align: center;
  margin-bottom: 60px;
  padding: 48px 24px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  .subtitle {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #C9A96E;
    margin-bottom: 12px;
  }

  h1 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 3.2rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  p {
    font-size: 1.05rem;
    color: #D8D2C5;
    max-width: 700px;
    margin: 0 auto 32px;
    line-height: 1.7;
  }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    background-color: #C9A96E;
    color: #0B0B0B;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.25s ease;
    text-decoration: none;

    &:hover {
      background-color: #DFBA73;
      transform: translateY(-2px);
    }
  }
`,G=i.div`
  margin-bottom: 72px;

  .section-title {
    text-align: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 40px;
  }
`,k=i.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,B=i.div`
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 6px;
  padding: 28px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: #C9A96E;
    transform: translateY(-3px);
  }

  .num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #C9A96E;
    margin-bottom: 12px;
  }

  .title {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 8px;
  }

  .desc {
    font-size: 0.82rem;
    color: #D8D2C5;
    line-height: 1.5;
  }
`,z=i.div`
  max-width: 850px;
  margin: 0 auto;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  border-radius: 6px;
  padding: 48px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 28px 20px;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 8px;
    text-align: center;
  }

  .form-sub {
    font-size: 0.9rem;
    color: #D8D2C5;
    text-align: center;
    margin-bottom: 36px;
  }
`,W=i.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,n=i.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${({$fullWidth:t})=>t?"1 / -1":"span 1"};

  label {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;

    span.req {
      color: #C9A96E;
      margin-left: 2px;
    }
  }

  input, select, textarea {
    padding: 12px 14px;
    font-size: 0.9rem;
    color: #F5F1E8;
    background-color: #111111;
    border: 1px solid rgba(140, 116, 75, 0.25);
    border-radius: 4px;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: #C9A96E;
      background-color: #161616;
    }

    &::placeholder {
      color: #777777;
    }
  }
`,g=i.span`
  font-size: 0.75rem;
  color: #ff6b6b;
  margin-top: 2px;
`,$=i.div`
  border: 1px dashed rgba(140, 116, 75, 0.4);
  background-color: #111111;
  border-radius: 4px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #C9A96E;
    background-color: #161616;
  }

  .upload-icon {
    color: #C9A96E;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.85rem;
    color: #F5F1E8;
    margin-bottom: 4px;
    font-weight: 600;
  }

  span {
    font-size: 0.75rem;
    color: #A8A8A8;
  }
`,M=i.button`
  width: 100%;
  padding: 16px;
  margin-top: 28px;
  background-color: #C9A96E;
  color: #0B0B0B;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: 1px solid #C9A96E;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #DFBA73;
    border-color: #DFBA73;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,U=i.div`
  max-width: 650px;
  margin: 40px auto;
  text-align: center;
  padding: 56px 36px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  .icon {
    color: #C9A96E;
    margin-bottom: 20px;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  .ref-no {
    display: inline-block;
    padding: 8px 20px;
    background-color: #111111;
    border: 1px solid #C9A96E;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #C9A96E;
    margin-bottom: 20px;
  }

  p {
    font-size: 0.95rem;
    color: #D8D2C5;
    line-height: 1.6;
    margin-bottom: 32px;
  }
`,V=()=>{const[t,a]=d.useState({name:"",email:"",whatsapp:"",jewelleryType:"Rings",metal:"18K Yellow Gold",budget:"$3,000 - $5,000",diamondPreference:"Natural GIA Certified",deadline:"Within 4 Weeks",description:""}),[s,v]=d.useState({}),[x,w]=d.useState(""),[b,E]=d.useState(!1),[C,h]=d.useState(null),[m,S]=d.useState(null),y=d.useRef(null);d.useEffect(()=>{window.scrollTo(0,0),j.getPageBySlug("custom-jewellery").then(r=>{var l;if(r){const c=r.draftContent||r.content;let p={};if(c)try{p=typeof c=="string"?JSON.parse(c):c}catch{p={content:c}}if((!p||Object.keys(p).length===0)&&r.content)try{p=typeof r.content=="string"?JSON.parse(r.content):r.content}catch{p={content:r.content}}S({...r,parsedContent:p}),(l=r.seoMetadata)!=null&&l.seoTitle?document.title=r.seoMetadata.seoTitle:r.title&&(document.title=`${r.title} | AethelCarats Fine Jewellery`)}}).catch(console.warn)},[]);const o=(m==null?void 0:m.parsedContent)||{},A=()=>{const r={};return t.name.trim()||(r.name="Full name is required."),t.email.trim()?/\S+@\S+\.\S+/.test(t.email)||(r.email="Please enter a valid email address."):r.email="Email address is required.",t.whatsapp.trim()||(r.whatsapp="WhatsApp number is required for CAD coordination."),t.description.trim()||(r.description="Please describe your custom design details."),v(r),Object.keys(r).length===0},D=async r=>{if(r.preventDefault(),!!A()){E(!0);try{const l={name:t.name,email:t.email,whatsapp:t.whatsapp,jewelleryType:t.jewelleryType,metalPreference:t.metal,budget:t.budget,diamondPreference:t.diamondPreference,desiredDeadline:t.deadline,description:t.description,fileUrl:x?`/uploads/${x}`:void 0},c=await j.submitCustomRequest(l);h(c.requestNumber||`FJ-CUSTOM-${Math.floor(1e4+Math.random()*9e4)}`)}catch{h(`FJ-CUSTOM-${Math.floor(1e4+Math.random()*9e4)}`)}finally{E(!1)}}},I=r=>{r.target.files&&r.target.files[0]&&w(r.target.files[0].name)};return e.jsxs(O,{children:[e.jsx(f,{yOffset:35,children:e.jsxs(T,{children:[e.jsx("div",{className:"subtitle",style:{color:o.subheadingColor||void 0},children:o.subheading||"BESPOKE FINE JEWELLERY ATELIER"}),e.jsx("h1",{style:{color:o.headingColor||void 0},children:o.heading||(m==null?void 0:m.title)||"CUSTOM JEWELLERY & BESPOKE COMMISSIONS"}),e.jsx("p",{style:{color:o.introductionColor||void 0},children:o.introduction||"Collaborate directly with AethelCarats master gemologists and goldsmiths to craft one-of-a-kind engagement rings, wedding bands, and high jewellery tailored exclusively to your personal vision."}),e.jsxs("a",{href:"#commission-form",className:"cta-btn",children:["START YOUR CUSTOM DESIGN ",e.jsx(R,{size:16})]})]})}),e.jsx(f,{yOffset:35,children:e.jsxs(G,{children:[e.jsx("div",{className:"section-title",children:"THE AETHELCARATS BESPOKE CREATION PROCESS"}),e.jsx(k,{children:[{num:"01",title:o.step1Heading||"CONSULTATION",desc:o.step1Description||"Discuss your vision, metal preference, and stone specifications with our gemologists."},{num:"02",title:o.step2Heading||"BESPOKE 3D CAD",desc:o.step2Description||"Our atelier renders photorealistic 3D CAD models of your design from every angle."},{num:"03",title:o.step3Heading||"CAD APPROVAL",desc:o.step3Description||"Refine specifications and approve 3D proportions before physical crafting starts."},{num:"04",title:o.step4Heading||"MASTER CRAFTING",desc:o.step4Description||"Hand-set by goldsmiths with GIA/IGI certified loose diamonds or gemstones."},{num:"05",title:"WHITE-GLOVE DELIVERY",desc:"Complimentary insured transit in AethelCarats signature presentation cases."}].map((r,l)=>e.jsx(f,{staggerIndex:l,yOffset:25,children:e.jsxs(B,{children:[e.jsx("div",{className:"num",children:r.num}),e.jsx("div",{className:"title",children:r.title}),e.jsx("div",{className:"desc",children:r.desc})]})},l))})]})}),C?e.jsxs(U,{children:[e.jsx(F,{size:56,className:"icon"}),e.jsx("h2",{children:"YOUR BESPOKE REQUEST HAS BEEN RECEIVED"}),e.jsxs("div",{className:"ref-no",children:["REFERENCE ID: ",C]}),e.jsx("p",{children:"Thank you for entrusting AethelCarats with your custom creation. Our master gemologist will review your specifications and contact you on WhatsApp / Email within 24 hours with your initial 3D design concept."}),e.jsx("button",{onClick:()=>{h(null),a({name:"",email:"",whatsapp:"",jewelleryType:"Rings",metal:"18K Yellow Gold",budget:"$3,000 - $5,000",diamondPreference:"Natural GIA Certified",deadline:"Within 4 Weeks",description:""})},style:{padding:"14px 32px",backgroundColor:"#C9A96E",color:"#0B0B0B",border:"none",borderRadius:"4px",fontSize:"0.85rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",cursor:"pointer"},children:"SUBMIT ANOTHER REQUEST"})]}):e.jsxs(z,{id:"commission-form",children:[e.jsx("h2",{children:"COMMISSION YOUR BESPOKE PIECE"}),e.jsx("div",{className:"form-sub",children:"Provide your initial specifications below for a complimentary 3D CAD design proposal."}),e.jsxs("form",{onSubmit:D,children:[e.jsxs(W,{children:[e.jsxs(n,{children:[e.jsxs("label",{children:["Full Name ",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("input",{type:"text",placeholder:"e.g. Eleanor Vance",value:t.name,onChange:r=>a({...t,name:r.target.value})}),s.name&&e.jsx(g,{children:s.name})]}),e.jsxs(n,{children:[e.jsxs("label",{children:["Email Address ",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("input",{type:"email",placeholder:"e.g. eleanor@auroradiamonds.com",value:t.email,onChange:r=>a({...t,email:r.target.value})}),s.email&&e.jsx(g,{children:s.email})]}),e.jsxs(n,{children:[e.jsxs("label",{children:["WhatsApp Number ",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("input",{type:"tel",placeholder:"e.g. +91 79902 78892",value:t.whatsapp,onChange:r=>a({...t,whatsapp:r.target.value})}),s.whatsapp&&e.jsx(g,{children:s.whatsapp})]}),e.jsx(n,{children:e.jsx(u,{label:"Jewellery Type",options:[{label:"Engagement Ring",value:"Engagement Rings"},{label:"Wedding Band",value:"Wedding Bands"},{label:"Fine Ring",value:"Fine Rings"},{label:"Earrings",value:"Earrings"},{label:"Necklace / Pendant",value:"Necklaces & Pendants"},{label:"Bracelet",value:"Bracelets"},{label:"Loose Diamond Setting",value:"Bespoke Loose Diamond Setting"}],value:t.jewelleryType,onChange:r=>a({...t,jewelleryType:r})})}),e.jsx(n,{children:e.jsx(u,{label:"Gold Metal Preference",options:[{label:"18K Yellow Gold",value:"18K Yellow Gold"},{label:"18K White Gold",value:"18K White Gold"},{label:"18K Rose Gold",value:"18K Rose Gold"},{label:"Platinum 950",value:"Platinum"}],value:t.metal,onChange:r=>a({...t,metal:r})})}),e.jsx(n,{children:e.jsx(u,{label:"Estimated Budget",options:[{label:"Under $2,000",value:"Under $2,000"},{label:"$2,000 - $5,000",value:"$2,000 - $5,000"},{label:"$5,000 - $10,000",value:"$5,000 - $10,000"},{label:"$10,000+",value:"$10,000+"}],value:t.budget,onChange:r=>a({...t,budget:r})})}),e.jsx(n,{children:e.jsx(u,{label:"Diamond Preference",options:[{label:"Natural GIA Certified",value:"Natural GIA Certified"},{label:"Lab-Grown IGI Certified",value:"Lab-Grown IGI Certified"},{label:"Precious Gemstone (Sapphire, Emerald, Ruby)",value:"Colored Gemstone"},{label:"Providing My Own Stone",value:"Customer-Provided Stone"}],value:t.diamondPreference,onChange:r=>a({...t,diamondPreference:r})})}),e.jsx(n,{children:e.jsx(u,{label:"Desired Deadline",options:[{label:"Flexible Timeline",value:"Flexible"},{label:"Within 2 Weeks",value:"Within 2 Weeks"},{label:"Within 4 Weeks",value:"Within 4 Weeks"},{label:"Specific Date",value:"Specific Date"}],value:t.deadline,onChange:r=>a({...t,deadline:r})})}),e.jsxs(n,{$fullWidth:!0,children:[e.jsxs("label",{children:["Design Details & Inspiration Notes ",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("textarea",{rows:4,placeholder:"Describe your design ideas, ring size, preferred center stone shape (e.g. Oval 1.5ct), setting style (solitaire, halo, bezel), or custom engraving...",value:t.description,onChange:r=>a({...t,description:r.target.value})}),s.description&&e.jsx(g,{children:s.description})]}),e.jsxs(n,{$fullWidth:!0,children:[e.jsx("label",{children:"Reference Image / Inspiration CAD Upload"}),e.jsx("input",{type:"file",ref:y,onChange:I,accept:"image/*,.pdf,.zip",style:{display:"none"}}),e.jsxs($,{onClick:()=>{var r;return(r=y.current)==null?void 0:r.click()},children:[e.jsx(P,{size:24,className:"upload-icon"}),e.jsx("p",{children:x?`Selected File: ${x}`:"Click to Upload Inspiration Images or Sketches"}),e.jsx("span",{children:"Supports JPG, PNG, PDF or ZIP files up to 15MB"})]})]})]}),e.jsx(M,{type:"submit",disabled:b,children:b?"SUBMITTING COMMISSIONS...":"SUBMIT BESPOKE REQUEST"})]})]})]})};export{V as CustomJewelleryPage};
