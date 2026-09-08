import{r as s,j as e,A as w,a as S,Y as A}from"./react-vendor-DkoiUa74.js";import{g as i}from"./ui-vendor-jqUk2w8-.js";import{R as x,a as D}from"./admin-pages-DH-znLWL.js";import{L as d}from"./LuxuryDropdown-DIoyrThf.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const I=i.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  box-sizing: border-box;
  color: #F5F1E8;

  @media (max-width: 768px) {
    padding: 24px 16px 60px;
  }
`,R=i.div`
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
`,F=i.div`
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
`,N=i.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,P=i.div`
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
`,G=i.div`
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
`,O=i.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,o=i.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${({$fullWidth:a})=>a?"1 / -1":"span 1"};

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
`,p=i.span`
  font-size: 0.75rem;
  color: #ff6b6b;
  margin-top: 2px;
`,T=i.div`
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
`,k=i.button`
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
`,B=i.div`
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
`,K=()=>{const[a,t]=s.useState({name:"",email:"",whatsapp:"",jewelleryType:"Rings",metal:"18K Yellow Gold",budget:"$3,000 - $5,000",diamondPreference:"Natural GIA Certified",deadline:"Within 4 Weeks",description:""}),[n,b]=s.useState({}),[c,E]=s.useState(""),[u,g]=s.useState(!1),[h,m]=s.useState(null),f=s.useRef(null),C=()=>{const r={};return a.name.trim()||(r.name="Full name is required."),a.email.trim()?/\S+@\S+\.\S+/.test(a.email)||(r.email="Please enter a valid email address."):r.email="Email address is required.",a.whatsapp.trim()||(r.whatsapp="WhatsApp number is required for CAD coordination."),a.description.trim()||(r.description="Please describe your custom design details."),b(r),Object.keys(r).length===0},j=async r=>{if(r.preventDefault(),!!C()){g(!0);try{const l={name:a.name,email:a.email,whatsapp:a.whatsapp,jewelleryType:a.jewelleryType,metalPreference:a.metal,budget:a.budget,diamondPreference:a.diamondPreference,desiredDeadline:a.deadline,description:a.description,fileUrl:c?`/uploads/${c}`:void 0},y=await D.submitCustomRequest(l);m(y.requestNumber||`FJ-CUSTOM-${Math.floor(1e4+Math.random()*9e4)}`)}catch{m(`FJ-CUSTOM-${Math.floor(1e4+Math.random()*9e4)}`)}finally{g(!1)}}},v=r=>{r.target.files&&r.target.files[0]&&E(r.target.files[0].name)};return e.jsxs(I,{children:[e.jsx(x,{yOffset:35,children:e.jsxs(R,{children:[e.jsx("div",{className:"subtitle",children:"BESPOKE FINE JEWELLERY ATELIER"}),e.jsx("h1",{children:"CUSTOM JEWELLERY & BESPOKE COMMISSIONS"}),e.jsx("p",{children:"Collaborate directly with AethelCarats master gemologists and goldsmiths to craft one-of-a-kind engagement rings, wedding bands, and high jewellery tailored exclusively to your personal vision."}),e.jsxs("a",{href:"#commission-form",className:"cta-btn",children:["START YOUR CUSTOM DESIGN ",e.jsx(w,{size:16})]})]})}),e.jsx(x,{yOffset:35,children:e.jsxs(F,{children:[e.jsx("div",{className:"section-title",children:"THE AETHELCARATS BESPOKE CREATION PROCESS"}),e.jsx(N,{children:[{num:"01",title:"CONSULTATION",desc:"Discuss your vision, metal preference, and stone specifications with our gemologists."},{num:"02",title:"BESPOKE 3D CAD",desc:"Our atelier renders photorealistic 3D CAD models of your design from every angle."},{num:"03",title:"CAD APPROVAL",desc:"Refine specifications and approve 3D proportions before physical crafting starts."},{num:"04",title:"MASTER CRAFTING",desc:"Hand-set by goldsmiths with GIA/IGI certified loose diamonds or gemstones."},{num:"05",title:"WHITE-GLOVE DELIVERY",desc:"Complimentary insured transit in AethelCarats signature presentation cases."}].map((r,l)=>e.jsx(x,{staggerIndex:l,yOffset:25,children:e.jsxs(P,{children:[e.jsx("div",{className:"num",children:r.num}),e.jsx("div",{className:"title",children:r.title}),e.jsx("div",{className:"desc",children:r.desc})]})},l))})]})}),h?e.jsxs(B,{children:[e.jsx(S,{size:56,className:"icon"}),e.jsx("h2",{children:"YOUR BESPOKE REQUEST HAS BEEN RECEIVED"}),e.jsxs("div",{className:"ref-no",children:["REFERENCE ID: ",h]}),e.jsx("p",{children:"Thank you for entrusting AethelCarats with your custom creation. Our master gemologist will review your specifications and contact you on WhatsApp / Email within 24 hours with your initial 3D design concept."}),e.jsx("button",{onClick:()=>{m(null),t({name:"",email:"",whatsapp:"",jewelleryType:"Rings",metal:"18K Yellow Gold",budget:"$3,000 - $5,000",diamondPreference:"Natural GIA Certified",deadline:"Within 4 Weeks",description:""})},style:{padding:"14px 32px",backgroundColor:"#C9A96E",color:"#0B0B0B",border:"none",borderRadius:"4px",fontSize:"0.85rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",cursor:"pointer"},children:"SUBMIT ANOTHER REQUEST"})]}):e.jsxs(G,{id:"commission-form",children:[e.jsx("h2",{children:"COMMISSION YOUR BESPOKE PIECE"}),e.jsx("div",{className:"form-sub",children:"Provide your initial specifications below for a complimentary 3D CAD design proposal."}),e.jsxs("form",{onSubmit:j,children:[e.jsxs(O,{children:[e.jsxs(o,{children:[e.jsxs("label",{children:["Full Name ",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("input",{type:"text",placeholder:"e.g. Eleanor Vance",value:a.name,onChange:r=>t({...a,name:r.target.value})}),n.name&&e.jsx(p,{children:n.name})]}),e.jsxs(o,{children:[e.jsxs("label",{children:["Email Address ",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("input",{type:"email",placeholder:"e.g. eleanor@auroradiamonds.com",value:a.email,onChange:r=>t({...a,email:r.target.value})}),n.email&&e.jsx(p,{children:n.email})]}),e.jsxs(o,{children:[e.jsxs("label",{children:["WhatsApp Number ",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("input",{type:"tel",placeholder:"e.g. +44 7900 123456",value:a.whatsapp,onChange:r=>t({...a,whatsapp:r.target.value})}),n.whatsapp&&e.jsx(p,{children:n.whatsapp})]}),e.jsx(o,{children:e.jsx(d,{label:"Jewellery Type",options:[{label:"Engagement Ring",value:"Engagement Rings"},{label:"Wedding Band",value:"Wedding Bands"},{label:"Fine Ring",value:"Fine Rings"},{label:"Earrings",value:"Earrings"},{label:"Necklace / Pendant",value:"Necklaces & Pendants"},{label:"Bracelet",value:"Bracelets"},{label:"Loose Diamond Setting",value:"Bespoke Loose Diamond Setting"}],value:a.jewelleryType,onChange:r=>t({...a,jewelleryType:r})})}),e.jsx(o,{children:e.jsx(d,{label:"Gold Metal Preference",options:[{label:"18K Yellow Gold",value:"18K Yellow Gold"},{label:"18K White Gold",value:"18K White Gold"},{label:"18K Rose Gold",value:"18K Rose Gold"},{label:"Platinum 950",value:"Platinum"}],value:a.metal,onChange:r=>t({...a,metal:r})})}),e.jsx(o,{children:e.jsx(d,{label:"Estimated Budget",options:[{label:"Under $2,000",value:"Under $2,000"},{label:"$2,000 - $5,000",value:"$2,000 - $5,000"},{label:"$5,000 - $10,000",value:"$5,000 - $10,000"},{label:"$10,000+",value:"$10,000+"}],value:a.budget,onChange:r=>t({...a,budget:r})})}),e.jsx(o,{children:e.jsx(d,{label:"Diamond Preference",options:[{label:"Natural GIA Certified",value:"Natural GIA Certified"},{label:"Lab-Grown IGI Certified",value:"Lab-Grown IGI Certified"},{label:"Precious Gemstone (Sapphire, Emerald, Ruby)",value:"Colored Gemstone"},{label:"Providing My Own Stone",value:"Customer-Provided Stone"}],value:a.diamondPreference,onChange:r=>t({...a,diamondPreference:r})})}),e.jsx(o,{children:e.jsx(d,{label:"Desired Deadline",options:[{label:"Flexible Timeline",value:"Flexible"},{label:"Within 2 Weeks",value:"Within 2 Weeks"},{label:"Within 4 Weeks",value:"Within 4 Weeks"},{label:"Specific Date",value:"Specific Date"}],value:a.deadline,onChange:r=>t({...a,deadline:r})})}),e.jsxs(o,{$fullWidth:!0,children:[e.jsxs("label",{children:["Design Details & Inspiration Notes ",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("textarea",{rows:4,placeholder:"Describe your design ideas, ring size, preferred center stone shape (e.g. Oval 1.5ct), setting style (solitaire, halo, bezel), or custom engraving...",value:a.description,onChange:r=>t({...a,description:r.target.value})}),n.description&&e.jsx(p,{children:n.description})]}),e.jsxs(o,{$fullWidth:!0,children:[e.jsx("label",{children:"Reference Image / Inspiration CAD Upload"}),e.jsx("input",{type:"file",ref:f,onChange:v,accept:"image/*,.pdf,.zip",style:{display:"none"}}),e.jsxs(T,{onClick:()=>{var r;return(r=f.current)==null?void 0:r.click()},children:[e.jsx(A,{size:24,className:"upload-icon"}),e.jsx("p",{children:c?`Selected File: ${c}`:"Click to Upload Inspiration Images or Sketches"}),e.jsx("span",{children:"Supports JPG, PNG, PDF or ZIP files up to 15MB"})]})]})]}),e.jsx(k,{type:"submit",disabled:u,children:u?"SUBMITTING COMMISSIONS...":"SUBMIT BESPOKE REQUEST"})]})]})]})};export{K as CustomJewelleryPage};
