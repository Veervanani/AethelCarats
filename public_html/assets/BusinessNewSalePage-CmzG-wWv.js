import{u as et,r as s,j as e,f as tt,aq as st,a1 as le,h as oe,x as at,bc as nt,w as it}from"./react-vendor-BXyx942q.js";import{g as c}from"./ui-vendor-VHkRGmvp.js";import{P as ce}from"./admin-pages-BiFcv5zF.js";import{b as w}from"./businessApi-eQ7jB9eN.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const rt=c.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,lt=c.form`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,v=c.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);

  .section-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #f1f5f9;
  }
`,de=c.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`,G=c.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 840px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`,a=c.div`
  grid-column: ${({$fullWidth:k})=>k?"1 / -1":"auto"};
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #334155;
  }

  input, select, textarea {
    padding: 8px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.84rem;
    outline: none;
    background: #ffffff;

    &:focus {
      border-color: #0d1319;
      box-shadow: 0 0 0 2px rgba(13, 19, 25, 0.1);
    }
  }
`,ot=c.div`
  display: flex;
  gap: 10px;
  margin-bottom: 18px;

  button {
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    border: 2px solid #e2e8f0;
    background: #ffffff;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.15s ease;

    &.active {
      border-color: #0d1319;
      background: #0d1319;
      color: #ffffff;
    }
  }
`,ct=c.div`
  background: #0d1319;
  color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  position: sticky;
  top: 80px;

  @media (max-width: 1024px) {
    position: static;
    margin-top: 16px;
    padding: 16px;
  }

  .ledger-title {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #e2b96f;
    margin-bottom: 14px;
  }

  .ledger-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.82rem;
    padding: 6px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    &.highlight {
      font-size: 0.95rem;
      font-weight: 700;
      color: #e2b96f;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding: 10px 0;
      margin: 8px 0;
    }

    &.net-profit {
      color: #51cf66;
      font-weight: 700;
    }
  }
`,jt=()=>{const k=et(),[A,ue]=s.useState([]),[pe,he]=s.useState([]),[n,E]=s.useState("Diamond"),[L,xe]=s.useState(""),[R,me]=s.useState(new Date().toISOString().split("T")[0]),[d,ge]=s.useState(""),[V,je]=s.useState(""),[b,z]=s.useState([]),[M,ve]=s.useState("Natural"),[I,be]=s.useState("Round"),[F,fe]=s.useState("F"),[T,Se]=s.useState("VS1"),[W,ye]=s.useState("3EX"),[B,Ne]=s.useState("EX"),[q,Ce]=s.useState("EX"),[X,Pe]=s.useState("None"),[J,De]=s.useState(""),[u,we]=s.useState(""),[o,ke]=s.useState(""),[H,Ie]=s.useState("GIA"),[U,Fe]=s.useState(""),[O,Te]=s.useState(""),[Q,$e]=s.useState(1),[K,Ge]=s.useState(""),[f,Ae]=s.useState(""),[h,Ee]=s.useState(""),[x,Le]=s.useState(0),[m,Re]=s.useState(0),[S,Ve]=s.useState(.015),[y,Y]=s.useState(""),[g,ze]=s.useState(.05),[p,Me]=s.useState("Paid"),[Z,We]=s.useState("Bank Wire"),[$,Be]=s.useState(""),[_,qe]=s.useState("Delivered"),[ee,Xe]=s.useState(""),[te,Je]=s.useState(""),[He,dt]=s.useState(""),[se,ae]=s.useState(!1);s.useEffect(()=>{w.getEmployees({status:"ACTIVE"}).then(t=>{const i=Array.isArray(t)?t:(t==null?void 0:t.employees)||[];ue(i),i.length>0&&!y&&Y(i[0].id)}),w.getSuppliers().then(t=>{const i=Array.isArray(t)?t:(t==null?void 0:t.suppliers)||[];he(i)})},[]),s.useEffect(()=>{if(!d||d.trim().length<2){z([]);return}const t=setTimeout(()=>{w.checkDuplicateCustomer({name:d}).then(i=>{z(Array.isArray(i)?i:(i==null?void 0:i.matches)||[])})},400);return()=>clearTimeout(t)},[d]);const r=s.useMemo(()=>{let t=Number(f)||0;n==="Diamond"&&u&&o&&!f&&(t=Number((Number(u)*Number(o)).toFixed(2)));const i=Number(h)||0,N=Number(x)||0,l=Math.max(0,i-N),C=Number(S)||0,P=Number((t*C).toFixed(2)),D=Number((t+P).toFixed(2)),Oe=Number(m)||0,ne=Number((l-D).toFixed(2)),j=Number((ne-Oe).toFixed(2)),Qe=Number(g)||0,ie=Number((Math.max(0,j)*Qe).toFixed(2)),Ke=Number((j-ie).toFixed(2)),Ye=D>0?Number((j/D*100).toFixed(2)):0,Ze=l>0?Number((j/l*100).toFixed(2)):0,re=p==="Paid"?l:Number($)||0,_e=p==="Paid"?0:Math.max(0,Number((l-re).toFixed(2)));return{effectivePurchase:t,finalSale:l,gstAmt:P,finalPurchase:D,grossProfit:ne,netProfit:j,commAmt:ie,retainedProfit:Ke,markup:Ye,profitMargin:Ze,recv:re,pending:_e}},[f,u,o,h,x,S,m,g,p,$,n]),Ue=async t=>{var i,N;if(t.preventDefault(),!d||h===""){alert("Please enter Customer Name and Selling Price.");return}ae(!0);try{const l=A.find(P=>P.id===y),C=await w.createSale({invoiceNo:L||void 0,saleDate:R,customerName:d,customerCountry:V,productType:n,productDescription:O||(n==="Diamond"?`${o||""}ct ${I} ${F}/${T}`:void 0),stoneType:n==="Diamond"?M:void 0,shape:n==="Diamond"?I:void 0,diamondColor:n==="Diamond"?F:void 0,clarity:n==="Diamond"?T:void 0,cut:n==="Diamond"?W:void 0,polish:n==="Diamond"?B:void 0,symmetry:n==="Diamond"?q:void 0,fluorescence:n==="Diamond"?X:void 0,measurement:n==="Diamond"?J:void 0,pricePerCarat:u?Number(u):void 0,caratWeight:o?Number(o):void 0,quantity:Number(Q)||1,certificate:n==="Diamond"?H:void 0,certificateNo:n==="Diamond"?U:void 0,supplierName:K||void 0,purchasePrice:r.effectivePurchase,sellingPrice:Number(h),discount:Number(x)||0,shippingCost:Number(m)||0,gstPercent:Number(S)||0,employeeId:y||void 0,salesPersonName:(l==null?void 0:l.fullName)||void 0,commissionPercent:Number(g)||0,paymentStatus:p,paymentMethod:Z,amountReceived:Number(r.recv),orderStatus:_,trackingNumber:ee,trackingLink:te,notes:He});alert(`✅ Invoice ${C.invoiceNo} created successfully!`),k(`${ce}/sales/${C.id}`)}catch(l){alert(((N=(i=l==null?void 0:l.response)==null?void 0:i.data)==null?void 0:N.message)||"Failed to create sale")}finally{ae(!1)}};return e.jsxs("div",{children:[e.jsx(rt,{children:e.jsxs("div",{children:[e.jsxs(tt,{to:`${ce}/sales`,style:{display:"inline-flex",alignItems:"center",gap:6,fontSize:"0.8rem",color:"#64748b",textDecoration:"none",marginBottom:6},children:[e.jsx(st,{size:14})," Back to Sales Tracker"]}),e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Create Internal Sale Invoice"})]})}),e.jsxs(ot,{children:[e.jsxs("button",{type:"button",className:n==="Diamond"?"active":"",onClick:()=>E("Diamond"),children:[e.jsx(le,{size:16})," Loose Diamond Sale"]}),e.jsxs("button",{type:"button",className:n==="Jewelry"?"active":"",onClick:()=>E("Jewelry"),children:[e.jsx(oe,{size:16})," Finished Jewelry Sale"]})]}),e.jsxs(lt,{onSubmit:Ue,children:[e.jsxs("div",{children:[e.jsxs(v,{children:[e.jsxs("div",{className:"section-title",children:[e.jsx(at,{size:16,color:"#0d1319"})," Invoice & Customer Details"]}),e.jsxs(de,{children:[e.jsxs(a,{children:[e.jsx("label",{children:"Invoice Number (Leave blank to auto-generate)"}),e.jsx("input",{type:"text",placeholder:"e.g. INV-1054",value:L,onChange:t=>xe(t.target.value)})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Sale Date *"}),e.jsx("input",{type:"date",value:R,onChange:t=>me(t.target.value),required:!0})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Customer Name *"}),e.jsx("input",{type:"text",placeholder:"e.g. TG NZ or Mandy J.",value:d,onChange:t=>ge(t.target.value),required:!0}),b.length>0&&e.jsxs("div",{style:{fontSize:"0.72rem",color:"#d97706",marginTop:4},children:["⚠️ ",b.length," existing client match: ",b[0].customer.name," (",b[0].reason,")"]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Customer Country"}),e.jsx("input",{type:"text",placeholder:"e.g. New Zealand, Thailand, USA",value:V,onChange:t=>je(t.target.value)})]})]})]}),n==="Diamond"?e.jsxs(v,{children:[e.jsxs("div",{className:"section-title",children:[e.jsx(le,{size:16,color:"#e2b96f"})," Diamond Grading & Specifications"]}),e.jsxs(G,{children:[e.jsxs(a,{children:[e.jsx("label",{children:"Stone Type"}),e.jsxs("select",{value:M,onChange:t=>ve(t.target.value),children:[e.jsx("option",{value:"Natural",children:"Natural"}),e.jsx("option",{value:"CVD",children:"CVD / Lab Grown"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Shape"}),e.jsx("select",{value:I,onChange:t=>be(t.target.value),children:["Round","Oval","Emerald","Pear","Radiant","Cushion","Princess","Marquise","Asscher","Heart"].map(t=>e.jsx("option",{value:t,children:t},t))})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Carat Weight (ct)"}),e.jsx("input",{type:"number",step:"0.01",placeholder:"e.g. 1.51",value:o,onChange:t=>ke(t.target.value?Number(t.target.value):"")})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Diamond Color"}),e.jsx("select",{value:F,onChange:t=>fe(t.target.value),children:["D","E","F","G","H","I","J","K","Fancy Yellow","Fancy Pink","Fancy Blue"].map(t=>e.jsx("option",{value:t,children:t},t))})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Clarity"}),e.jsx("select",{value:T,onChange:t=>Se(t.target.value),children:["FL","IF","VVS1","VVS2","VS1","VS2","SI1","SI2","I1"].map(t=>e.jsx("option",{value:t,children:t},t))})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Cut Grade"}),e.jsxs("select",{value:W,onChange:t=>ye(t.target.value),children:[e.jsx("option",{value:"3EX",children:"3EX (Triple Excellent)"}),e.jsx("option",{value:"EX",children:"Excellent"}),e.jsx("option",{value:"VG",children:"Very Good"}),e.jsx("option",{value:"GD",children:"Good"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Polish"}),e.jsxs("select",{value:B,onChange:t=>Ne(t.target.value),children:[e.jsx("option",{value:"EX",children:"Excellent"}),e.jsx("option",{value:"VG",children:"Very Good"}),e.jsx("option",{value:"GD",children:"Good"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Symmetry"}),e.jsxs("select",{value:q,onChange:t=>Ce(t.target.value),children:[e.jsx("option",{value:"EX",children:"Excellent"}),e.jsx("option",{value:"VG",children:"Very Good"}),e.jsx("option",{value:"GD",children:"Good"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Fluorescence"}),e.jsxs("select",{value:X,onChange:t=>Pe(t.target.value),children:[e.jsx("option",{value:"None",children:"None"}),e.jsx("option",{value:"Faint",children:"Faint"}),e.jsx("option",{value:"Medium",children:"Medium"}),e.jsx("option",{value:"Strong",children:"Strong"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Certificate Lab"}),e.jsxs("select",{value:H,onChange:t=>Ie(t.target.value),children:[e.jsx("option",{value:"GIA",children:"GIA"}),e.jsx("option",{value:"IGI",children:"IGI"}),e.jsx("option",{value:"HRD",children:"HRD"}),e.jsx("option",{value:"None",children:"None"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Certificate Number"}),e.jsx("input",{type:"text",placeholder:"e.g. 2487612984",value:U,onChange:t=>Fe(t.target.value)})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Measurements (mm)"}),e.jsx("input",{type:"text",placeholder:"e.g. 7.42 x 7.45 x 4.58",value:J,onChange:t=>De(t.target.value)})]})]})]}):e.jsxs(v,{children:[e.jsxs("div",{className:"section-title",children:[e.jsx(oe,{size:16,color:"#7950f2"})," Jewelry Specifications"]}),e.jsxs(de,{children:[e.jsxs(a,{$fullWidth:!0,children:[e.jsx("label",{children:"Product Description / Title *"}),e.jsx("input",{type:"text",placeholder:"e.g. 18K Yellow Gold Solitaire Engagement Ring with Pavé Band",value:O,onChange:t=>Te(t.target.value),required:n==="Jewelry"})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Quantity"}),e.jsx("input",{type:"number",min:"1",value:Q,onChange:t=>$e(Number(t.target.value))})]})]})]}),e.jsxs(v,{children:[e.jsxs("div",{className:"section-title",children:[e.jsx(nt,{size:16,color:"#16a34a"})," Pricing & Financial Ledger Inputs"]}),e.jsxs(G,{children:[e.jsxs(a,{children:[e.jsx("label",{children:"Supplier / Vendor"}),e.jsx("input",{type:"text",placeholder:"e.g. UNIQUE DIAMAX PVT LTD",value:K,onChange:t=>Ge(t.target.value),list:"suppliers-list"}),e.jsx("datalist",{id:"suppliers-list",children:(pe||[]).map(t=>e.jsx("option",{value:t.name},t.id))})]}),n==="Diamond"&&e.jsxs(a,{children:[e.jsx("label",{children:"Price per Carat ($)"}),e.jsx("input",{type:"number",step:"0.01",placeholder:"e.g. 3500",value:u,onChange:t=>we(t.target.value?Number(t.target.value):"")})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Purchase Price ($) *"}),e.jsx("input",{type:"number",step:"0.01",placeholder:u&&o?`Auto: $${r.effectivePurchase}`:"e.g. 5000",value:f,onChange:t=>Ae(t.target.value?Number(t.target.value):"")})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Selling Price ($) *"}),e.jsx("input",{type:"number",step:"0.01",placeholder:"e.g. 7500",value:h,onChange:t=>Ee(t.target.value?Number(t.target.value):""),required:!0})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Discount ($)"}),e.jsx("input",{type:"number",step:"0.01",value:x,onChange:t=>Le(t.target.value?Number(t.target.value):"")})]}),e.jsxs(a,{children:[e.jsx("label",{children:"GST % (e.g. 0.015 for 1.5%)"}),e.jsx("input",{type:"number",step:"0.001",value:S,onChange:t=>Ve(t.target.value?Number(t.target.value):"")})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Shipping Cost ($)"}),e.jsx("input",{type:"number",step:"0.01",value:m,onChange:t=>Re(t.target.value?Number(t.target.value):"")})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Sales Person *"}),e.jsx("select",{value:y,onChange:t=>Y(t.target.value),required:!0,children:(A||[]).map(t=>e.jsxs("option",{value:t.id,children:[t.fullName||t.name," (",t.employeeCode,")"]},t.id))})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Commission Rate (e.g. 0.05 for 5%)"}),e.jsx("input",{type:"number",step:"0.005",value:g,onChange:t=>ze(t.target.value?Number(t.target.value):"")})]})]})]}),e.jsxs(v,{children:[e.jsxs("div",{className:"section-title",children:[e.jsx(it,{size:16,color:"#2563eb"})," Payment & Shipment Status"]}),e.jsxs(G,{children:[e.jsxs(a,{children:[e.jsx("label",{children:"Payment Status"}),e.jsxs("select",{value:p,onChange:t=>Me(t.target.value),children:[e.jsx("option",{value:"Paid",children:"Paid (Full)"}),e.jsx("option",{value:"Partial",children:"Partial Payment"}),e.jsx("option",{value:"Pending",children:"Pending / Unpaid"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Payment Method"}),e.jsxs("select",{value:Z,onChange:t=>We(t.target.value),children:[e.jsx("option",{value:"Bank Wire",children:"Bank Wire"}),e.jsx("option",{value:"PayPal",children:"PayPal"}),e.jsx("option",{value:"Cash",children:"Cash"}),e.jsx("option",{value:"Credit Card",children:"Credit Card"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Amount Received ($)"}),e.jsx("input",{type:"number",step:"0.01",placeholder:p==="Paid"?`Full: $${r.finalSale}`:"Enter amount",value:$,onChange:t=>Be(t.target.value?Number(t.target.value):""),disabled:p==="Paid"})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Order / Delivery Status"}),e.jsxs("select",{value:_,onChange:t=>qe(t.target.value),children:[e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"}),e.jsx("option",{value:"Cancelled",children:"Cancelled"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Tracking Number"}),e.jsx("input",{type:"text",placeholder:"e.g. 781290384912",value:ee,onChange:t=>Xe(t.target.value)})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Tracking URL"}),e.jsx("input",{type:"text",placeholder:"https://fedex.com/track/...",value:te,onChange:t=>Je(t.target.value)})]})]})]})]}),e.jsx("div",{children:e.jsxs(ct,{children:[e.jsx("div",{className:"ledger-title",children:"Financial Recalculation Engine"}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"Selling Price:"}),e.jsxs("span",{children:["$",(Number(h)||0).toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"Discount:"}),e.jsxs("span",{children:["-$",(Number(x)||0).toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row highlight",children:[e.jsx("span",{children:"Final Sale Amount:"}),e.jsxs("span",{children:["$",r.finalSale.toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"Purchase Base:"}),e.jsxs("span",{children:["$",r.effectivePurchase.toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"GST Amount:"}),e.jsxs("span",{children:["+$",r.gstAmt.toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"Final Purchase:"}),e.jsxs("span",{children:["$",r.finalPurchase.toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"Shipping Cost:"}),e.jsxs("span",{children:["-$",(Number(m)||0).toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row highlight net-profit",children:[e.jsx("span",{children:"Net Profit:"}),e.jsxs("span",{children:["$",r.netProfit.toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsxs("span",{children:["Sales Commission (",(Number(g)*100).toFixed(1),"%):"]}),e.jsxs("span",{style:{color:"#ffd43b"},children:["-$",r.commAmt.toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",style:{fontWeight:700},children:[e.jsx("span",{children:"Profit Retained:"}),e.jsxs("span",{children:["$",r.retainedProfit.toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"Markup %:"}),e.jsxs("span",{children:[r.markup,"%"]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"Pending Receivables:"}),e.jsxs("span",{style:{color:r.pending>0?"#ff6b6b":"#51cf66"},children:["$",r.pending.toLocaleString()]})]}),e.jsx("button",{type:"submit",disabled:se,style:{width:"100%",padding:"12px",background:"#e2b96f",color:"#0d1319",border:"none",borderRadius:8,fontWeight:700,fontSize:"0.9rem",cursor:"pointer",marginTop:20},children:se?"Saving Invoice...":"Save & Issue Invoice"})]})})]})]})};export{jt as BusinessNewSalePage};
