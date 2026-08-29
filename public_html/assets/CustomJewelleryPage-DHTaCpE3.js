import{r as l,j as e,A as S,a as C,a2 as I}from"./react-vendor-DGxe0tSH.js";import{g as r}from"./ui-vendor-nkfD3MFj.js";import{R as f,a as N}from"./admin-pages-DeFvLM5D.js";import{L as d}from"./LuxuryDropdown-Cw86vtfJ.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const P=r.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 16px 60px;
  }
`,R=r.div`
  text-align: center;
  margin-bottom: 60px;
  padding: 48px 24px;
  background-color: #faf5eb;
  border: 1px solid #d9d3c7;

  .subtitle {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #c9a45c;
    margin-bottom: 12px;
  }

  h1 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 3.2rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  p {
    font-size: 1.05rem;
    color: #6b6b6b;
    max-width: 700px;
    margin: 0 auto 32px;
    line-height: 1.7;
  }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    background-color: #1f1f1f;
    color: #ffffff;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.25s ease;
    text-decoration: none;

    &:hover {
      background-color: #b8944d;
    }
  }
`,k=r.div`
  margin-bottom: 72px;

  .section-title {
    text-align: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 40px;
  }
`,O=r.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,G=r.div`
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  padding: 28px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  .num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #c9a45c;
    margin-bottom: 12px;
  }

  .title {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 8px;
  }

  .desc {
    font-size: 0.82rem;
    color: #6b6b6b;
    line-height: 1.5;
  }
`,D=r.div`
  max-width: 850px;
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  padding: 48px;

  @media (max-width: 768px) {
    padding: 28px 20px;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 8px;
    text-align: center;
  }

  .form-sub {
    font-size: 0.9rem;
    color: #6b6b6b;
    text-align: center;
    margin-bottom: 36px;
  }
`,T=r.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,o=r.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${({$fullWidth:i})=>i?"1 / -1":"span 1"};

  label {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;

    span.req {
      color: #c9a45c;
      margin-left: 2px;
    }
  }

  input, select, textarea {
    padding: 12px 14px;
    font-size: 0.9rem;
    color: #1f1f1f;
    background-color: #faf5eb;
    border: 1px solid #d9d3c7;
    border-radius: 2px;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: #c9a45c;
      background-color: #ffffff;
    }
  }
`,m=r.span`
  font-size: 0.75rem;
  color: #d32f2f;
  margin-top: 2px;
`,z=r.div`
  border: 1px dashed #c9a45c;
  background-color: #faf5eb;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #ffffff;
  }

  .upload-icon {
    color: #c9a45c;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.85rem;
    color: #1f1f1f;
    margin-bottom: 4px;
    font-weight: 600;
  }

  span {
    font-size: 0.75rem;
    color: #6b6b6b;
  }
`,A=r.button`
  width: 100%;
  padding: 16px;
  margin-top: 28px;
  background-color: #1f1f1f;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: 1px solid #1f1f1f;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #b8944d;
    border-color: #b8944d;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,W=r.div`
  max-width: 650px;
  margin: 40px auto;
  text-align: center;
  padding: 56px 36px;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;

  .icon {
    color: #c9a45c;
    margin-bottom: 20px;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  .ref-no {
    display: inline-block;
    padding: 8px 20px;
    background-color: #faf5eb;
    border: 1px solid #c9a45c;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #b8944d;
    margin-bottom: 20px;
  }

  p {
    font-size: 0.95rem;
    color: #6b6b6b;
    line-height: 1.6;
    margin-bottom: 32px;
  }
`,L=()=>{const[i,t]=l.useState({name:"",email:"",whatsapp:"",jewelleryType:"Rings",metal:"18K Yellow Gold",budget:"$3,000 - $5,000",diamondPreference:"Natural GIA Certified",deadline:"Within 4 Weeks",description:""}),[n,b]=l.useState({}),[c,j]=l.useState(""),[u,g]=l.useState(!1),[x,p]=l.useState(null),h=l.useRef(null),v=()=>{const a={};return i.name.trim()||(a.name="Full name is required."),i.email.trim()?/\S+@\S+\.\S+/.test(i.email)||(a.email="Please enter a valid email address."):a.email="Email address is required.",i.whatsapp.trim()||(a.whatsapp="WhatsApp number is required for CAD coordination."),i.description.trim()||(a.description="Please describe your custom design details."),b(a),Object.keys(a).length===0},y=async a=>{if(a.preventDefault(),!!v()){g(!0);try{const s={name:i.name,email:i.email,whatsapp:i.whatsapp,jewelleryType:i.jewelleryType,metalPreference:i.metal,budget:i.budget,diamondPreference:i.diamondPreference,desiredDeadline:i.deadline,description:i.description,fileUrl:c?`/uploads/${c}`:void 0},w=await N.submitCustomRequest(s);p(w.requestNumber||`FJ-CUSTOM-${Math.floor(1e4+Math.random()*9e4)}`)}catch{p(`FJ-CUSTOM-${Math.floor(1e4+Math.random()*9e4)}`)}finally{g(!1)}}},E=a=>{a.target.files&&a.target.files[0]&&j(a.target.files[0].name)};return e.jsxs(P,{children:[e.jsx(f,{yOffset:35,children:e.jsxs(R,{children:[e.jsx("div",{className:"subtitle",children:"BESPOKE FINE JEWELLERY ATELIER"}),e.jsx("h1",{children:"CUSTOM JEWELLERY & BESPOKE COMMISSIONS"}),e.jsx("p",{children:"Collaborate directly with Floksy Jewel master gemologists and goldsmiths to craft one-of-a-kind engagement rings, wedding bands, and high jewellery tailored exclusively to your personal vision."}),e.jsxs("a",{href:"#commission-form",className:"cta-btn",children:["START YOUR CUSTOM DESIGN ",e.jsx(S,{size:16})]})]})}),e.jsx(f,{yOffset:35,children:e.jsxs(k,{children:[e.jsx("div",{className:"section-title",children:"THE FLOKSY BESPOKE CREATION PROCESS"}),e.jsx(O,{children:[{num:"01",title:"CONSULTATION",desc:"Discuss your vision, metal preference, and stone specifications with our gemologists."},{num:"02",title:"BESPOKE 3D CAD",desc:"Our atelier renders photorealistic 3D CAD models of your design from every angle."},{num:"03",title:"CAD APPROVAL",desc:"Refine specifications and approve 3D proportions before physical crafting starts."},{num:"04",title:"MASTER CRAFTING",desc:"Hand-set by goldsmiths with GIA/IGI certified loose diamonds or gemstones."},{num:"05",title:"WHITE-GLOVE DELIVERY",desc:"Complimentary insured transit in Floksy signature velvet presentation cases."}].map((a,s)=>e.jsx(f,{staggerIndex:s,yOffset:25,children:e.jsxs(G,{children:[e.jsx("div",{className:"num",children:a.num}),e.jsx("div",{className:"title",children:a.title}),e.jsx("div",{className:"desc",children:a.desc})]})},s))})]})}),x?e.jsxs(W,{children:[e.jsx(C,{size:56,className:"icon"}),e.jsx("h2",{children:"YOUR BESPOKE REQUEST HAS BEEN RECEIVED"}),e.jsxs("div",{className:"ref-no",children:["REFERENCE ID: ",x]}),e.jsx("p",{children:"Thank you for entrusting Floksy Jewel with your custom creation. Our master gemologist will review your specifications and contact you on WhatsApp / Email within 24 hours with your initial 3D design concept."}),e.jsx("button",{onClick:()=>{p(null),t({name:"",email:"",whatsapp:"",jewelleryType:"Rings",metal:"18K Yellow Gold",budget:"$3,000 - $5,000",diamondPreference:"Natural GIA Certified",deadline:"Within 4 Weeks",description:""})},style:{padding:"12px 28px",backgroundColor:"#1f1f1f",color:"#ffffff",border:"none",fontSize:"0.8rem",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",cursor:"pointer"},children:"SUBMIT ANOTHER REQUEST"})]}):e.jsxs(D,{id:"commission-form",children:[e.jsx("h2",{children:"COMMISSION YOUR BESPOKE PIECE"}),e.jsx("div",{className:"form-sub",children:"Provide your initial specifications below for a complimentary 3D CAD design proposal."}),e.jsxs("form",{onSubmit:y,children:[e.jsxs(T,{children:[e.jsxs(o,{children:[e.jsxs("label",{children:["Full Name ",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("input",{type:"text",placeholder:"e.g. Eleanor Vance",value:i.name,onChange:a=>t({...i,name:a.target.value})}),n.name&&e.jsx(m,{children:n.name})]}),e.jsxs(o,{children:[e.jsxs("label",{children:["Email Address ",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("input",{type:"email",placeholder:"e.g. eleanor@floksyjewel.com",value:i.email,onChange:a=>t({...i,email:a.target.value})}),n.email&&e.jsx(m,{children:n.email})]}),e.jsxs(o,{children:[e.jsxs("label",{children:["WhatsApp Number ",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("input",{type:"tel",placeholder:"e.g. +44 7900 123456",value:i.whatsapp,onChange:a=>t({...i,whatsapp:a.target.value})}),n.whatsapp&&e.jsx(m,{children:n.whatsapp})]}),e.jsx(o,{children:e.jsx(d,{label:"Jewellery Type",options:[{label:"Engagement Ring",value:"Engagement Rings"},{label:"Wedding Band",value:"Wedding Bands"},{label:"Fine Ring",value:"Fine Rings"},{label:"Earrings",value:"Earrings"},{label:"Necklace / Pendant",value:"Necklaces & Pendants"},{label:"Bracelet",value:"Bracelets"},{label:"Loose Diamond Setting",value:"Bespoke Loose Diamond Setting"}],value:i.jewelleryType,onChange:a=>t({...i,jewelleryType:a})})}),e.jsx(o,{children:e.jsx(d,{label:"Gold Metal Preference",options:[{label:"18K Yellow Gold",value:"18K Yellow Gold"},{label:"18K White Gold",value:"18K White Gold"},{label:"18K Rose Gold",value:"18K Rose Gold"},{label:"Platinum 950",value:"Platinum"}],value:i.metal,onChange:a=>t({...i,metal:a})})}),e.jsx(o,{children:e.jsx(d,{label:"Estimated Budget",options:[{label:"Under $2,000",value:"Under $2,000"},{label:"$2,000 - $5,000",value:"$2,000 - $5,000"},{label:"$5,000 - $10,000",value:"$5,000 - $10,000"},{label:"$10,000+",value:"$10,000+"}],value:i.budget,onChange:a=>t({...i,budget:a})})}),e.jsx(o,{children:e.jsx(d,{label:"Diamond Preference",options:[{label:"Natural GIA Certified",value:"Natural GIA Certified"},{label:"Lab-Grown IGI Certified",value:"Lab-Grown IGI Certified"},{label:"Precious Gemstone (Sapphire, Emerald, Ruby)",value:"Colored Gemstone"},{label:"Providing My Own Stone",value:"Customer-Provided Stone"}],value:i.diamondPreference,onChange:a=>t({...i,diamondPreference:a})})}),e.jsx(o,{children:e.jsx(d,{label:"Desired Deadline",options:[{label:"Flexible Timeline",value:"Flexible"},{label:"Within 2 Weeks",value:"Within 2 Weeks"},{label:"Within 4 Weeks",value:"Within 4 Weeks"},{label:"Specific Date",value:"Specific Date"}],value:i.deadline,onChange:a=>t({...i,deadline:a})})}),e.jsxs(o,{$fullWidth:!0,children:[e.jsxs("label",{children:["Design Details & Inspiration Notes ",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("textarea",{rows:4,placeholder:"Describe your design ideas, ring size, preferred center stone shape (e.g. Oval 1.5ct), setting style (solitaire, halo, bezel), or custom engraving...",value:i.description,onChange:a=>t({...i,description:a.target.value})}),n.description&&e.jsx(m,{children:n.description})]}),e.jsxs(o,{$fullWidth:!0,children:[e.jsx("label",{children:"Reference Image / Inspiration CAD Upload"}),e.jsx("input",{type:"file",ref:h,onChange:E,accept:"image/*,.pdf,.zip",style:{display:"none"}}),e.jsxs(z,{onClick:()=>{var a;return(a=h.current)==null?void 0:a.click()},children:[e.jsx(I,{size:24,className:"upload-icon"}),e.jsx("p",{children:c?`Selected File: ${c}`:"Click to Upload Inspiration Images or Sketches"}),e.jsx("span",{children:"Supports JPG, PNG, PDF or ZIP files up to 15MB"})]})]})]}),e.jsx(A,{type:"submit",disabled:u,children:u?"SUBMITTING COMMISSIONS...":"SUBMIT BESPOKE REQUEST"})]})]})]})};export{L as CustomJewelleryPage};
