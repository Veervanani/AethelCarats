import{u as st,r as s,j as e,f as at,aq as nt,a1 as oe,h as ce,x as it,bf as rt,w as lt}from"./react-vendor-DxLkccZ0.js";import{g as c}from"./ui-vendor-BuBsKREC.js";import{P as de}from"./admin-pages-6iAS44Fe.js";import{b as w}from"./businessApi-DGsCEnDz.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const ot=c.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,ct=c.form`
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
`,ue=c.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`,A=c.div`
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
`,dt=c.div`
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
`,ut=c.div`
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
`,bt=()=>{const k=st(),[E,pe]=s.useState([]),[he,xe]=s.useState([]),[n,L]=s.useState("Diamond"),[R,me]=s.useState(""),[V,ge]=s.useState(new Date().toISOString().split("T")[0]),[d,je]=s.useState(""),[z,ve]=s.useState(""),[b,M]=s.useState([]),[W,be]=s.useState("Natural"),[I,fe]=s.useState("Round"),[F,Se]=s.useState("F"),[$,ye]=s.useState("VS1"),[B,Ne]=s.useState("3EX"),[q,Ce]=s.useState("EX"),[X,Pe]=s.useState("EX"),[J,De]=s.useState("None"),[H,we]=s.useState(""),[u,ke]=s.useState(""),[o,Ie]=s.useState(""),[U,Fe]=s.useState("GIA"),[O,$e]=s.useState(""),[Q,Te]=s.useState(""),[K,Ge]=s.useState(1),[Y,Ae]=s.useState(""),[f,Ee]=s.useState(""),[h,Le]=s.useState(""),[x,Re]=s.useState(0),[m,Ve]=s.useState(0),[S,ze]=s.useState(.015),[T,Me]=s.useState(94.55),[y,Z]=s.useState(""),[g,We]=s.useState(.05),[p,Be]=s.useState("Paid"),[_,qe]=s.useState("Bank Wire"),[G,Xe]=s.useState(""),[ee,Je]=s.useState("Delivered"),[te,He]=s.useState(""),[se,Ue]=s.useState(""),[Oe,pt]=s.useState(""),[ae,ne]=s.useState(!1);s.useEffect(()=>{w.getEmployees({status:"ACTIVE"}).then(t=>{const i=Array.isArray(t)?t:(t==null?void 0:t.employees)||[];pe(i),i.length>0&&!y&&Z(i[0].id)}),w.getSuppliers().then(t=>{const i=Array.isArray(t)?t:(t==null?void 0:t.suppliers)||[];xe(i)})},[]),s.useEffect(()=>{if(!d||d.trim().length<2){M([]);return}const t=setTimeout(()=>{w.checkDuplicateCustomer({name:d}).then(i=>{M(Array.isArray(i)?i:(i==null?void 0:i.matches)||[])})},400);return()=>clearTimeout(t)},[d]);const r=s.useMemo(()=>{let t=Number(f)||0;n==="Diamond"&&u&&o&&!f&&(t=Number((Number(u)*Number(o)).toFixed(2)));const i=Number(h)||0,N=Number(x)||0,l=Math.max(0,i-N),C=Number(S)||0,P=Number((t*C).toFixed(2)),D=Number((t+P).toFixed(2)),Ke=Number(m)||0,ie=Number((l-D).toFixed(2)),j=Number((ie-Ke).toFixed(2)),Ye=Number(g)||0,re=Number((Math.max(0,j)*Ye).toFixed(2)),Ze=Number((j-re).toFixed(2)),_e=D>0?Number((j/D*100).toFixed(2)):0,et=l>0?Number((j/l*100).toFixed(2)):0,le=p==="Paid"?l:Number(G)||0,tt=p==="Paid"?0:Math.max(0,Number((l-le).toFixed(2)));return{effectivePurchase:t,finalSale:l,gstAmt:P,finalPurchase:D,grossProfit:ie,netProfit:j,commAmt:re,retainedProfit:Ze,markup:_e,profitMargin:et,recv:le,pending:tt}},[f,u,o,h,x,S,m,g,p,G,n]),Qe=async t=>{var i,N;if(t.preventDefault(),!d||h===""){alert("Please enter Customer Name and Selling Price.");return}ne(!0);try{const l=E.find(P=>P.id===y),C=await w.createSale({invoiceNo:R||void 0,saleDate:V,customerName:d,customerCountry:z,productType:n,productDescription:Q||(n==="Diamond"?`${o||""}ct ${I} ${F}/${$}`:void 0),stoneType:n==="Diamond"?W:void 0,shape:n==="Diamond"?I:void 0,diamondColor:n==="Diamond"?F:void 0,clarity:n==="Diamond"?$:void 0,cut:n==="Diamond"?B:void 0,polish:n==="Diamond"?q:void 0,symmetry:n==="Diamond"?X:void 0,fluorescence:n==="Diamond"?J:void 0,measurement:n==="Diamond"?H:void 0,pricePerCarat:u?Number(u):void 0,caratWeight:o?Number(o):void 0,quantity:Number(K)||1,certificate:n==="Diamond"?U:void 0,certificateNo:n==="Diamond"?O:void 0,supplierName:Y||void 0,purchasePrice:r.effectivePurchase,sellingPrice:Number(h),discount:Number(x)||0,shippingCost:Number(m)||0,gstPercent:Number(S)||0,employeeId:y||void 0,salesPersonName:(l==null?void 0:l.fullName)||void 0,commissionPercent:Number(g)||0,dollarRate:T?Number(T):94.55,paymentStatus:p,paymentMethod:_,amountReceived:Number(r.recv),orderStatus:ee,trackingNumber:te,trackingLink:se,notes:Oe});alert(`✅ Invoice ${C.invoiceNo} created successfully!`),k(`${de}/sales/${C.id}`)}catch(l){alert(((N=(i=l==null?void 0:l.response)==null?void 0:i.data)==null?void 0:N.message)||"Failed to create sale")}finally{ne(!1)}};return e.jsxs("div",{children:[e.jsx(ot,{children:e.jsxs("div",{children:[e.jsxs(at,{to:`${de}/sales`,style:{display:"inline-flex",alignItems:"center",gap:6,fontSize:"0.8rem",color:"#64748b",textDecoration:"none",marginBottom:6},children:[e.jsx(nt,{size:14})," Back to Sales Tracker"]}),e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Create Internal Sale Invoice"})]})}),e.jsxs(dt,{children:[e.jsxs("button",{type:"button",className:n==="Diamond"?"active":"",onClick:()=>L("Diamond"),children:[e.jsx(oe,{size:16})," Loose Diamond Sale"]}),e.jsxs("button",{type:"button",className:n==="Jewelry"?"active":"",onClick:()=>L("Jewelry"),children:[e.jsx(ce,{size:16})," Finished Jewelry Sale"]})]}),e.jsxs(ct,{onSubmit:Qe,children:[e.jsxs("div",{children:[e.jsxs(v,{children:[e.jsxs("div",{className:"section-title",children:[e.jsx(it,{size:16,color:"#0d1319"})," Invoice & Customer Details"]}),e.jsxs(ue,{children:[e.jsxs(a,{children:[e.jsx("label",{children:"Invoice Number (Leave blank to auto-generate)"}),e.jsx("input",{type:"text",placeholder:"e.g. INV-1054",value:R,onChange:t=>me(t.target.value)})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Sale Date *"}),e.jsx("input",{type:"date",value:V,onChange:t=>ge(t.target.value),required:!0})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Customer Name *"}),e.jsx("input",{type:"text",placeholder:"e.g. TG NZ or Mandy J.",value:d,onChange:t=>je(t.target.value),required:!0}),b.length>0&&e.jsxs("div",{style:{fontSize:"0.72rem",color:"#d97706",marginTop:4},children:["⚠️ ",b.length," existing client match: ",b[0].customer.name," (",b[0].reason,")"]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Customer Country"}),e.jsx("input",{type:"text",placeholder:"e.g. New Zealand, Thailand, USA",value:z,onChange:t=>ve(t.target.value)})]})]})]}),n==="Diamond"?e.jsxs(v,{children:[e.jsxs("div",{className:"section-title",children:[e.jsx(oe,{size:16,color:"#e2b96f"})," Diamond Grading & Specifications"]}),e.jsxs(A,{children:[e.jsxs(a,{children:[e.jsx("label",{children:"Stone Type"}),e.jsxs("select",{value:W,onChange:t=>be(t.target.value),children:[e.jsx("option",{value:"Natural",children:"Natural"}),e.jsx("option",{value:"CVD",children:"CVD / Lab Grown"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Shape"}),e.jsx("select",{value:I,onChange:t=>fe(t.target.value),children:["Round","Oval","Emerald","Pear","Radiant","Cushion","Princess","Marquise","Asscher","Heart"].map(t=>e.jsx("option",{value:t,children:t},t))})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Carat Weight (ct)"}),e.jsx("input",{type:"number",step:"0.01",placeholder:"e.g. 1.51",value:o,onChange:t=>Ie(t.target.value?Number(t.target.value):"")})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Diamond Color"}),e.jsx("select",{value:F,onChange:t=>Se(t.target.value),children:["D","E","F","G","H","I","J","K","Fancy Yellow","Fancy Pink","Fancy Blue"].map(t=>e.jsx("option",{value:t,children:t},t))})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Clarity"}),e.jsx("select",{value:$,onChange:t=>ye(t.target.value),children:["FL","IF","VVS1","VVS2","VS1","VS2","SI1","SI2","I1"].map(t=>e.jsx("option",{value:t,children:t},t))})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Cut Grade"}),e.jsxs("select",{value:B,onChange:t=>Ne(t.target.value),children:[e.jsx("option",{value:"3EX",children:"3EX (Triple Excellent)"}),e.jsx("option",{value:"EX",children:"Excellent"}),e.jsx("option",{value:"VG",children:"Very Good"}),e.jsx("option",{value:"GD",children:"Good"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Polish"}),e.jsxs("select",{value:q,onChange:t=>Ce(t.target.value),children:[e.jsx("option",{value:"EX",children:"Excellent"}),e.jsx("option",{value:"VG",children:"Very Good"}),e.jsx("option",{value:"GD",children:"Good"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Symmetry"}),e.jsxs("select",{value:X,onChange:t=>Pe(t.target.value),children:[e.jsx("option",{value:"EX",children:"Excellent"}),e.jsx("option",{value:"VG",children:"Very Good"}),e.jsx("option",{value:"GD",children:"Good"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Fluorescence"}),e.jsxs("select",{value:J,onChange:t=>De(t.target.value),children:[e.jsx("option",{value:"None",children:"None"}),e.jsx("option",{value:"Faint",children:"Faint"}),e.jsx("option",{value:"Medium",children:"Medium"}),e.jsx("option",{value:"Strong",children:"Strong"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Certificate Lab"}),e.jsxs("select",{value:U,onChange:t=>Fe(t.target.value),children:[e.jsx("option",{value:"GIA",children:"GIA"}),e.jsx("option",{value:"IGI",children:"IGI"}),e.jsx("option",{value:"HRD",children:"HRD"}),e.jsx("option",{value:"None",children:"None"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Certificate Number"}),e.jsx("input",{type:"text",placeholder:"e.g. 2487612984",value:O,onChange:t=>$e(t.target.value)})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Measurements (mm)"}),e.jsx("input",{type:"text",placeholder:"e.g. 7.42 x 7.45 x 4.58",value:H,onChange:t=>we(t.target.value)})]})]})]}):e.jsxs(v,{children:[e.jsxs("div",{className:"section-title",children:[e.jsx(ce,{size:16,color:"#7950f2"})," Jewelry Specifications"]}),e.jsxs(ue,{children:[e.jsxs(a,{$fullWidth:!0,children:[e.jsx("label",{children:"Product Description / Title *"}),e.jsx("input",{type:"text",placeholder:"e.g. 18K Yellow Gold Solitaire Engagement Ring with Pavé Band",value:Q,onChange:t=>Te(t.target.value),required:n==="Jewelry"})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Quantity"}),e.jsx("input",{type:"number",min:"1",value:K,onChange:t=>Ge(Number(t.target.value))})]})]})]}),e.jsxs(v,{children:[e.jsxs("div",{className:"section-title",children:[e.jsx(rt,{size:16,color:"#16a34a"})," Pricing & Financial Ledger Inputs"]}),e.jsxs(A,{children:[e.jsxs(a,{children:[e.jsx("label",{children:"Supplier / Vendor"}),e.jsx("input",{type:"text",placeholder:"e.g. UNIQUE DIAMAX PVT LTD",value:Y,onChange:t=>Ae(t.target.value),list:"suppliers-list"}),e.jsx("datalist",{id:"suppliers-list",children:(he||[]).map(t=>e.jsx("option",{value:t.name},t.id))})]}),n==="Diamond"&&e.jsxs(a,{children:[e.jsx("label",{children:"Price per Carat ($)"}),e.jsx("input",{type:"number",step:"0.01",placeholder:"e.g. 3500",value:u,onChange:t=>ke(t.target.value?Number(t.target.value):"")})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Purchase Price ($) *"}),e.jsx("input",{type:"number",step:"0.01",placeholder:u&&o?`Auto: $${r.effectivePurchase}`:"e.g. 5000",value:f,onChange:t=>Ee(t.target.value?Number(t.target.value):"")})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Selling Price ($) *"}),e.jsx("input",{type:"number",step:"0.01",placeholder:"e.g. 7500",value:h,onChange:t=>Le(t.target.value?Number(t.target.value):""),required:!0})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Discount ($)"}),e.jsx("input",{type:"number",step:"0.01",value:x,onChange:t=>Re(t.target.value?Number(t.target.value):"")})]}),e.jsxs(a,{children:[e.jsx("label",{children:"GST % (e.g. 0.015 for 1.5%)"}),e.jsx("input",{type:"number",step:"0.001",value:S,onChange:t=>ze(t.target.value?Number(t.target.value):"")})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Shipping Cost ($)"}),e.jsx("input",{type:"number",step:"0.01",value:m,onChange:t=>Ve(t.target.value?Number(t.target.value):"")})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Sales Person *"}),e.jsx("select",{value:y,onChange:t=>Z(t.target.value),required:!0,children:(E||[]).map(t=>e.jsxs("option",{value:t.id,children:[t.fullName||t.name," (",t.employeeCode,")"]},t.id))})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Commission Rate (e.g. 0.05 for 5%)"}),e.jsx("input",{type:"number",step:"0.005",value:g,onChange:t=>We(t.target.value?Number(t.target.value):"")})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Dollar Rate ($ / ₹)"}),e.jsx("input",{type:"number",step:"0.01",placeholder:"e.g. 94.55",value:T,onChange:t=>Me(t.target.value?Number(t.target.value):"")})]})]})]}),e.jsxs(v,{children:[e.jsxs("div",{className:"section-title",children:[e.jsx(lt,{size:16,color:"#2563eb"})," Payment & Shipment Status"]}),e.jsxs(A,{children:[e.jsxs(a,{children:[e.jsx("label",{children:"Payment Status"}),e.jsxs("select",{value:p,onChange:t=>Be(t.target.value),children:[e.jsx("option",{value:"Paid",children:"Paid (Full)"}),e.jsx("option",{value:"Partial",children:"Partial Payment"}),e.jsx("option",{value:"Pending",children:"Pending / Unpaid"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Payment Method"}),e.jsxs("select",{value:_,onChange:t=>qe(t.target.value),children:[e.jsx("option",{value:"Bank Wire",children:"Bank Wire"}),e.jsx("option",{value:"PayPal",children:"PayPal"}),e.jsx("option",{value:"Cash",children:"Cash"}),e.jsx("option",{value:"Credit Card",children:"Credit Card"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Amount Received ($)"}),e.jsx("input",{type:"number",step:"0.01",placeholder:p==="Paid"?`Full: $${r.finalSale}`:"Enter amount",value:G,onChange:t=>Xe(t.target.value?Number(t.target.value):""),disabled:p==="Paid"})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Order / Delivery Status"}),e.jsxs("select",{value:ee,onChange:t=>Je(t.target.value),children:[e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"}),e.jsx("option",{value:"Cancelled",children:"Cancelled"})]})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Tracking Number"}),e.jsx("input",{type:"text",placeholder:"e.g. 781290384912",value:te,onChange:t=>He(t.target.value)})]}),e.jsxs(a,{children:[e.jsx("label",{children:"Tracking URL"}),e.jsx("input",{type:"text",placeholder:"https://fedex.com/track/...",value:se,onChange:t=>Ue(t.target.value)})]})]})]})]}),e.jsx("div",{children:e.jsxs(ut,{children:[e.jsx("div",{className:"ledger-title",children:"Financial Recalculation Engine"}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"Selling Price:"}),e.jsxs("span",{children:["$",(Number(h)||0).toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"Discount:"}),e.jsxs("span",{children:["-$",(Number(x)||0).toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row highlight",children:[e.jsx("span",{children:"Final Sale Amount:"}),e.jsxs("span",{children:["$",r.finalSale.toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"Purchase Base:"}),e.jsxs("span",{children:["$",r.effectivePurchase.toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"GST Amount:"}),e.jsxs("span",{children:["+$",r.gstAmt.toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"Final Purchase:"}),e.jsxs("span",{children:["$",r.finalPurchase.toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"Shipping Cost:"}),e.jsxs("span",{children:["-$",(Number(m)||0).toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row highlight net-profit",children:[e.jsx("span",{children:"Net Profit:"}),e.jsxs("span",{children:["$",r.netProfit.toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsxs("span",{children:["Sales Commission (",(Number(g)*100).toFixed(1),"%):"]}),e.jsxs("span",{style:{color:"#ffd43b"},children:["-$",r.commAmt.toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",style:{fontWeight:700},children:[e.jsx("span",{children:"Profit Retained:"}),e.jsxs("span",{children:["$",r.retainedProfit.toLocaleString()]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"Markup %:"}),e.jsxs("span",{children:[r.markup,"%"]})]}),e.jsxs("div",{className:"ledger-row",children:[e.jsx("span",{children:"Pending Receivables:"}),e.jsxs("span",{style:{color:r.pending>0?"#ff6b6b":"#51cf66"},children:["$",r.pending.toLocaleString()]})]}),e.jsx("button",{type:"submit",disabled:ae,style:{width:"100%",padding:"12px",background:"#e2b96f",color:"#0d1319",border:"none",borderRadius:8,fontWeight:700,fontSize:"0.9rem",cursor:"pointer",marginTop:20},children:ae?"Saving Invoice...":"Save & Issue Invoice"})]})})]})]})};export{bt as BusinessNewSalePage};
