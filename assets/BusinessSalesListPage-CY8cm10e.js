import{r as a,j as e,X as ce,ak as Ge,ax as Pe,ad as ae,b8 as me,_ as be,ae as Fe,P as je,bc as We,Z as Be,bd as Me,al as _e,h as He,aP as Ue,x as Ve,k as qe,b as ye,af as ve,be as Je,aq as Ke,A as Qe,c as Se,f as Z,aj as Xe,i as Ye,l as Ze,m as et}from"./react-vendor-DSaFutMS.js";import{g as l,E as tt}from"./ui-vendor-DguFyjS7.js";import{u as se,w as rt}from"./admin-tools-vendor-CKN5doRT.js";import{P as M}from"./admin-pages-C6uUGKYS.js";import{b as R}from"./businessApi-mCmidBmn.js";import"./swiper-vendor-B7SuwHD8.js";const nt=l.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`,it=l.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`,at=l.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
`,st=l.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`,ot=l.div`
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: #f8fafc;
`,lt=l.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,u=l.div`
  grid-column: ${({$full:r})=>r?"1 / -1":"auto"};
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

    &:focus {
      border-color: #0d1319;
    }
  }
`,ct=({sale:r,onClose:C,onSuccess:d})=>{const[E,T]=a.useState([]),[L,N]=a.useState([]),[y,v]=a.useState(!1),[S,w]=a.useState(r.invoiceNo||""),[P,z]=a.useState(r.saleDate?new Date(r.saleDate).toISOString().split("T")[0]:""),[A,O]=a.useState(r.customerName||""),[m,h]=a.useState(r.customerCountry||""),[B,o]=a.useState(r.productType||"Diamond"),[x,I]=a.useState(r.productDescription||""),[k,b]=a.useState(r.shape||"Round"),[G,K]=a.useState(r.caratWeight||""),[_,H]=a.useState(r.diamondColor||"F"),[Q,ee]=a.useState(r.clarity||"VS1"),[D,de]=a.useState(r.cut||"3EX"),[X,te]=a.useState(r.certificateNo||""),[Y,re]=a.useState(r.supplierName||""),[$,ne]=a.useState(r.purchasePrice||0),[U,V]=a.useState(r.sellingPrice||0),[q,t]=a.useState(r.discount||0),[p,c]=a.useState(r.gstPercent??.015),[f,i]=a.useState(r.shippingCost||0),[s,ze]=a.useState(r.dollarRate||94.55),[ie,Ae]=a.useState(r.employeeId||""),[pe,De]=a.useState(r.commissionPercent??.05),[ue,$e]=a.useState(r.paymentStatus||"Paid"),[Re,zt]=a.useState(r.paymentMethod||"Bank Wire"),[Ee,At]=a.useState(r.amountReceived||""),[xe,Le]=a.useState(r.orderStatus||"Delivered"),[fe,Te]=a.useState(r.trackingNumber||"");a.useEffect(()=>{R.getEmployees({status:"ACTIVE"}).then(n=>{T(Array.isArray(n)?n:(n==null?void 0:n.employees)||[])}),R.getSuppliers().then(n=>{N(Array.isArray(n)?n:(n==null?void 0:n.suppliers)||[])})},[]);const Oe=async n=>{var he,ge;n.preventDefault(),v(!0);try{const F=E.find(Ie=>Ie.id===ie);await R.updateSale(r.id,{invoiceNo:S,saleDate:P,customerName:A,customerCountry:m,productType:B,productDescription:x,shape:k,caratWeight:G?Number(G):void 0,diamondColor:_,clarity:Q,cut:D,certificateNo:X,supplierName:Y,purchasePrice:Number($)||0,sellingPrice:Number(U)||0,discount:Number(q)||0,gstPercent:Number(p)||0,shippingCost:Number(f)||0,dollarRate:Number(s)||94.55,employeeId:ie||void 0,salesPersonName:(F==null?void 0:F.fullName)||r.salesPersonName||void 0,commissionPercent:Number(pe)||0,paymentStatus:ue,paymentMethod:Re,amountReceived:Number(Ee)||Number(U)||0,orderStatus:xe,trackingNumber:fe}),alert(`✅ Invoice ${S} updated successfully!`),d()}catch(F){alert(((ge=(he=F==null?void 0:F.response)==null?void 0:he.data)==null?void 0:ge.message)||"Failed to update sale")}finally{v(!1)}};return e.jsx(nt,{onClick:C,children:e.jsxs(it,{onClick:n=>n.stopPropagation(),children:[e.jsxs(at,{children:[e.jsxs("div",{children:[e.jsxs("h2",{style:{fontSize:"1.15rem",fontWeight:800,color:"#0f172a",margin:0},children:["Edit Sale Invoice — ",r.invoiceNo]}),e.jsx("p",{style:{fontSize:"0.75rem",color:"#64748b",margin:"2px 0 0 0"},children:"Modify commercial details, client information, pricing ledger, and exchange rates"})]}),e.jsx("button",{onClick:C,style:{background:"none",border:"none",cursor:"pointer",color:"#64748b"},children:e.jsx(ce,{size:20})})]}),e.jsxs("form",{onSubmit:Oe,style:{display:"flex",flexDirection:"column",flex:1,overflow:"hidden"},children:[e.jsx(st,{children:e.jsxs(lt,{children:[e.jsxs(u,{children:[e.jsx("label",{children:"Invoice Number *"}),e.jsx("input",{type:"text",value:S,onChange:n=>w(n.target.value),required:!0})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Sale Date *"}),e.jsx("input",{type:"date",value:P,onChange:n=>z(n.target.value),required:!0})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Customer Name *"}),e.jsx("input",{type:"text",value:A,onChange:n=>O(n.target.value),required:!0})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Customer Country"}),e.jsx("input",{type:"text",value:m,onChange:n=>h(n.target.value)})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Product Type"}),e.jsxs("select",{value:B,onChange:n=>o(n.target.value),children:[e.jsx("option",{value:"Diamond",children:"Diamond"}),e.jsx("option",{value:"Jewelry",children:"Jewelry"})]})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Shape / Model"}),e.jsx("input",{type:"text",value:k,onChange:n=>b(n.target.value)})]}),e.jsxs(u,{$full:!0,children:[e.jsx("label",{children:"Product Description / Diamond Specs"}),e.jsx("input",{type:"text",value:x,onChange:n=>I(n.target.value)})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Carat Weight (ct)"}),e.jsx("input",{type:"number",step:"0.01",value:G,onChange:n=>K(n.target.value)})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Color / Clarity"}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("input",{type:"text",placeholder:"Color",value:_,onChange:n=>H(n.target.value)}),e.jsx("input",{type:"text",placeholder:"Clarity",value:Q,onChange:n=>ee(n.target.value)})]})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Certificate No"}),e.jsx("input",{type:"text",value:X,onChange:n=>te(n.target.value)})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Supplier / Vendor"}),e.jsx("input",{type:"text",value:Y,onChange:n=>re(n.target.value),list:"edit-supp-list"}),e.jsx("datalist",{id:"edit-supp-list",children:L.map(n=>e.jsx("option",{value:n.name},n.id))})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Purchase Price ($)"}),e.jsx("input",{type:"number",step:"0.01",value:$,onChange:n=>ne(Number(n.target.value)),required:!0})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Selling Price ($)"}),e.jsx("input",{type:"number",step:"0.01",value:U,onChange:n=>V(Number(n.target.value)),required:!0})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Discount ($)"}),e.jsx("input",{type:"number",step:"0.01",value:q,onChange:n=>t(Number(n.target.value))})]}),e.jsxs(u,{children:[e.jsx("label",{children:"GST % (e.g. 0.015 for 1.5%)"}),e.jsx("input",{type:"number",step:"0.001",value:p,onChange:n=>c(Number(n.target.value))})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Dollar Rate ($ / ₹)"}),e.jsx("input",{type:"number",step:"0.01",value:s,onChange:n=>ze(Number(n.target.value)),required:!0})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Sales Person"}),e.jsxs("select",{value:ie,onChange:n=>Ae(n.target.value),children:[e.jsx("option",{value:"",children:"Unassigned"}),E.map(n=>e.jsxs("option",{value:n.id,children:[n.fullName||n.name," (",n.employeeCode,")"]},n.id))]})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Commission Rate (e.g. 0.05 for 5%)"}),e.jsx("input",{type:"number",step:"0.005",value:pe,onChange:n=>De(Number(n.target.value))})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Payment Status"}),e.jsxs("select",{value:ue,onChange:n=>$e(n.target.value),children:[e.jsx("option",{value:"Paid",children:"Paid"}),e.jsx("option",{value:"Partial",children:"Partial"}),e.jsx("option",{value:"Pending",children:"Pending"}),e.jsx("option",{value:"Unpaid",children:"Unpaid"})]})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Order Status"}),e.jsxs("select",{value:xe,onChange:n=>Le(n.target.value),children:[e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"}),e.jsx("option",{value:"Cancelled",children:"Cancelled"})]})]}),e.jsxs(u,{children:[e.jsx("label",{children:"Tracking Number"}),e.jsx("input",{type:"text",value:fe,onChange:n=>Te(n.target.value)})]})]})}),e.jsxs(ot,{children:[e.jsx("button",{type:"button",onClick:C,style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#ffffff",borderRadius:6,fontSize:"0.82rem",fontWeight:600,cursor:"pointer"},children:"Cancel"}),e.jsxs("button",{type:"submit",disabled:y,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 20px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontSize:"0.82rem",fontWeight:700,cursor:"pointer"},children:[e.jsx(Ge,{size:14})," ",y?"Saving Changes...":"Save Invoice"]})]})]})]})})},dt=l.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`,pt=l.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: scaleUp 0.15s ease-out;

  @keyframes scaleUp {
    from {
      transform: scale(0.96);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`,ut=l.div`
  padding: 16px 20px;
  background: #0d1319;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`,xt=l.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 6px;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
  }
`,ft=l.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 75vh;
  overflow-y: auto;
`,J=l.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 0.78rem;
    font-weight: 700;
    color: #334155;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  select,
  input {
    padding: 8px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.84rem;
    outline: none;
    color: #0f172a;
    background: #ffffff;

    &:focus {
      border-color: #0d1319;
      box-shadow: 0 0 0 2px rgba(13, 19, 25, 0.1);
    }
  }

  .hint {
    font-size: 0.72rem;
    color: #64748b;
  }
`,ht=l.div`
  padding: 14px 20px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`,ke=l.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;

  ${({$variant:r})=>r==="primary"?`
    background: #0d1319;
    color: #ffffff;
    border: 1px solid #0d1319;
    &:hover {
      background: #1e293b;
    }
  `:`
    background: #ffffff;
    color: #475569;
    border: 1px solid #cbd5e1;
    &:hover {
      background: #f1f5f9;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,gt=({selectedIds:r,onClose:C,onSuccess:d})=>{const[E,T]=a.useState("NO_CHANGE"),[L,N]=a.useState("NO_CHANGE"),[y,v]=a.useState("NO_CHANGE"),[S,w]=a.useState(""),[P,z]=a.useState("NO_CHANGE"),[A,O]=a.useState(!1),[m,h]=a.useState(null),B=async o=>{var I,k;o.preventDefault(),h(null);const x={};if(E!=="NO_CHANGE"&&(x.paymentStatus=E),L!=="NO_CHANGE"&&(x.orderStatus=L),y!=="NO_CHANGE"&&(x.salesPersonName=y),P!=="NO_CHANGE"&&(x.paymentMethod=P),S.trim()!==""){const b=Number(S);!isNaN(b)&&b>0&&(x.dollarRate=b)}if(Object.keys(x).length===0){h("Please choose at least one field to update.");return}O(!0);try{await R.bulkUpdateSales(r,x),alert(`✅ Successfully bulk updated ${r.length} sales records in the database.`),d()}catch(b){console.error(b),h(((k=(I=b==null?void 0:b.response)==null?void 0:I.data)==null?void 0:k.message)||"Bulk update failed. Please try again.")}finally{O(!1)}};return e.jsx(dt,{onClick:C,children:e.jsxs(pt,{onClick:o=>o.stopPropagation(),children:[e.jsxs(ut,{children:[e.jsxs("h2",{children:[e.jsx(Pe,{size:17})," Bulk Edit Sales (",r.length," records)"]}),e.jsx(xt,{onClick:C,children:e.jsx(ce,{size:18})})]}),e.jsxs("form",{onSubmit:B,children:[e.jsxs(ft,{children:[e.jsxs("div",{style:{background:"#f0fdf4",border:"1px solid #bbf7d0",padding:"10px 14px",borderRadius:8,fontSize:"0.78rem",color:"#166534"},children:["💡 Changes will be applied to all ",e.jsx("strong",{children:r.length}),` selected invoices simultaneously. Leave any field as "Do Not Change" to keep each invoice's current value.`]}),m&&e.jsxs("div",{style:{background:"#fff5f5",border:"1px solid #fecaca",padding:"10px 14px",borderRadius:8,fontSize:"0.78rem",color:"#b91c1c"},children:["⚠️ ",m]}),e.jsxs(J,{children:[e.jsx("label",{children:"Payment Status"}),e.jsxs("select",{value:E,onChange:o=>T(o.target.value),children:[e.jsx("option",{value:"NO_CHANGE",children:"-- Do Not Change --"}),e.jsx("option",{value:"Paid",children:"Paid (Full)"}),e.jsx("option",{value:"Partial",children:"Partial Payment"}),e.jsx("option",{value:"Pending",children:"Pending / Unpaid"})]})]}),e.jsxs(J,{children:[e.jsx("label",{children:"Order / Delivery Status"}),e.jsxs("select",{value:L,onChange:o=>N(o.target.value),children:[e.jsx("option",{value:"NO_CHANGE",children:"-- Do Not Change --"}),e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"}),e.jsx("option",{value:"Cancelled",children:"Cancelled"})]})]}),e.jsxs(J,{children:[e.jsx("label",{children:"Assigned Sales Representative"}),e.jsxs("select",{value:y,onChange:o=>v(o.target.value),children:[e.jsx("option",{value:"NO_CHANGE",children:"-- Do Not Change --"}),e.jsx("option",{value:"Rutu",children:"Rutu (Sales Manager)"}),e.jsx("option",{value:"Jyoti",children:"Jyoti (Sales Executive)"}),e.jsx("option",{value:"Twinkle",children:"Twinkle (Sales Executive)"}),e.jsx("option",{value:"Veer",children:"Veer (Director)"})]})]}),e.jsxs(J,{children:[e.jsx("label",{children:"Payment Method"}),e.jsxs("select",{value:P,onChange:o=>z(o.target.value),children:[e.jsx("option",{value:"NO_CHANGE",children:"-- Do Not Change --"}),e.jsx("option",{value:"Bank Wire",children:"Bank Wire / Transfer"}),e.jsx("option",{value:"Credit Card",children:"Credit Card / Stripe"}),e.jsx("option",{value:"Cash",children:"Cash"}),e.jsx("option",{value:"Cheque",children:"Cheque"})]})]}),e.jsxs(J,{children:[e.jsx("label",{children:"Dollar Rate ($ / ₹)"}),e.jsx("input",{type:"number",step:"0.01",placeholder:"Leave blank to keep existing rates",value:S,onChange:o=>w(o.target.value)}),e.jsx("span",{className:"hint",children:"Example: 94.55"})]})]}),e.jsxs(ht,{children:[e.jsx(ke,{type:"button",$variant:"secondary",onClick:C,disabled:A,children:"Cancel"}),e.jsx(ke,{type:"submit",$variant:"primary",disabled:A,children:A?"Updating...":`Apply Bulk Changes (${r.length})`})]})]})]})})},mt=tt`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`,bt=l.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 100%;
`,jt=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  .title-group {
    h1 {
      font-size: 1.45rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 10px;

      .badge-tag {
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        background: #f1f5f9;
        color: #475569;
        padding: 3px 8px;
        border-radius: 20px;
        border: 1px solid #e2e8f0;
      }
    }

    p {
      font-size: 0.82rem;
      color: #64748b;
      margin: 4px 0 0 0;
    }
  }

  .action-toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
`,Ce=l(Z)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  background: #0d1319;
  color: #ffffff;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(13, 19, 25, 0.15);
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    background: #1e293b;
    box-shadow: 0 4px 8px rgba(13, 19, 25, 0.2);
    transform: translateY(-1px);
  }
`,j=l.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  background: #ffffff;

  ${({$variant:r})=>{switch(r){case"danger":return`
          border: 1px solid #fecaca;
          color: #b91c1c;
          background: #fff5f5;
          &:hover {
            background: #fee2e2;
            border-color: #f87171;
          }
        `;case"success":return`
          border: 1px solid #bbf7d0;
          color: #15803d;
          &:hover {
            background: #f0fdf4;
            border-color: #86efac;
          }
        `;case"primary":return`
          border: 1px solid #0d1319;
          color: #ffffff;
          background: #0d1319;
          &:hover {
            background: #1e293b;
          }
        `;default:return`
          border: 1px solid #cbd5e1;
          color: #334155;
          &:hover {
            background: #f8fafc;
            border-color: #94a3b8;
          }
        `}}}
`,Ne=l(Z)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #334155;
  text-decoration: none;

  &:hover {
    background: #f8fafc;
    border-color: #94a3b8;
  }
`,yt=l.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
`,W=l.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.15s ease;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;

    .label {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      color: #64748b;
    }

    .icon-wrap {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      color: #64748b;
    }
  }

  .val {
    font-size: 1.25rem;
    font-weight: 800;
    color: ${({$highlight:r})=>r==="profit"?"#16a34a":r==="warning"?"#d97706":r==="retained"?"#2563eb":"#0f172a"};
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }

  .subtitle {
    font-size: 0.68rem;
    color: #94a3b8;
    margin-top: 4px;
  }
`,vt=l.div`
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  height: 86px;
  animation: ${mt} 1.5s infinite;
`,St=l.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);

  .search-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 6px 12px;
    flex: 1;
    min-width: 240px;
    transition: all 0.15s ease;

    &:focus-within {
      border-color: #0d1319;
      background: #ffffff;
      box-shadow: 0 0 0 2px rgba(13, 19, 25, 0.08);
    }

    input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 0.82rem;
      color: #0f172a;
      width: 100%;

      &::placeholder {
        color: #94a3b8;
      }
    }

    .clear-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #94a3b8;
      padding: 0;
      display: flex;
      align-items: center;

      &:hover {
        color: #475569;
      }
    }
  }

  .filter-select {
    padding: 7px 12px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    font-size: 0.82rem;
    font-weight: 500;
    color: #334155;
    background: #ffffff;
    cursor: pointer;
    outline: none;
    transition: border-color 0.15s ease;

    &:focus {
      border-color: #0d1319;
    }
  }

  .results-pill {
    font-size: 0.76rem;
    font-weight: 600;
    color: #64748b;
    padding: 4px 10px;
    background: #f8fafc;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    margin-left: auto;
  }
`,kt=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.78rem;
  color: #475569;

  .hint-text {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
  }

  .scroll-btn-group {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .nav-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    color: #0f172a;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.74rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: #0d1319;
      color: #ffffff;
      border-color: #0d1319;
    }
  }
`,Ct=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #166534;
  flex-wrap: wrap;
  gap: 10px;

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
`,we=l.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  border-radius: 4px;
  border: 1.5px solid ${({$checked:r})=>r?"#0d1319":"#cbd5e1"};
  background: ${({$checked:r})=>r?"#0d1319":"#ffffff"};
  color: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  vertical-align: middle;

  &:hover {
    border-color: #0d1319;
    box-shadow: 0 0 0 2px rgba(13, 19, 25, 0.12);
  }

  input {
    display: none;
  }
`,Nt=l.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow-x: auto;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  scrollbar-width: thin;
  position: relative;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
`,wt=l.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
  white-space: nowrap;

  th {
    background: #0d1319;
    color: #f8fafc;
    padding: 11px 12px;
    font-weight: 600;
    text-align: left;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    position: sticky;
    top: 0;
    z-index: 10;
    letter-spacing: 0.01em;
  }

  td {
    padding: 9px 12px;
    border-bottom: 1px solid #f1f5f9;
    border-right: 1px solid #f1f5f9;
    color: #1e293b;
    font-variant-numeric: tabular-nums;
  }

  tr:hover td {
    background: #f8fafc;
  }

  th.sticky-col-chk {
    position: sticky;
    left: 0;
    width: 44px;
    min-width: 44px;
    max-width: 44px;
    background: #0d1319 !important;
    color: #f1f4f8 !important;
    z-index: 30;
    text-align: center;
  }

  td.sticky-col-chk {
    position: sticky;
    left: 0;
    width: 44px;
    min-width: 44px;
    max-width: 44px;
    background: #ffffff;
    z-index: 20;
    text-align: center;
  }

  th.sticky-col-inv {
    position: sticky;
    left: 44px;
    min-width: 125px;
    background: #0d1319 !important;
    color: #f1f4f8 !important;
    z-index: 30;
    font-weight: 700;
    box-shadow: 3px 0 6px rgba(0, 0, 0, 0.12);
  }

  td.sticky-col-inv {
    position: sticky;
    left: 44px;
    min-width: 125px;
    background: #ffffff;
    z-index: 20;
    font-weight: 700;
    box-shadow: 3px 0 6px rgba(0, 0, 0, 0.04);
  }

  tr:hover td.sticky-col-chk,
  tr:hover td.sticky-col-inv {
    background: #f8fafc;
  }
`,oe=l.span`
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 4px;
  display: inline-block;
  letter-spacing: 0.02em;

  ${({$type:r})=>{switch(r){case"Paid":return"background: #ebfbee; color: #2b8a3e; border: 1px solid #b2f2bb;";case"Partial":return"background: #fff9db; color: #f59f00; border: 1px solid #ffe066;";case"Pending":case"Unpaid":return"background: #fff5f5; color: #e03131; border: 1px solid #ffc9c9;";case"Delivered":return"background: #e7f5ff; color: #1c7ed6; border: 1px solid #a5d8ff;";case"Shipped":return"background: #f3f0ff; color: #7950f2; border: 1px solid #d0bfff;";case"Processing":return"background: #fff4e6; color: #d9480f; border: 1px solid #ffd8a8;";case"Diamond":return"background: #fff3bf; color: #b45309; border: 1px solid #fde68a;";case"Jewelry":return"background: #ede9fe; color: #6d28d9; border: 1px solid #ddd6fe;";default:return"background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0;"}}}
`,le=l.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 9px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1.5px solid transparent;

  ${({$variant:r})=>{switch(r){case"view":return`
          background: #f1f5f9;
          border-color: #94a3b8;
          color: #0f172a;
          &:hover {
            background: #0d1319;
            color: #ffffff;
            border-color: #0d1319;
          }
        `;case"edit":return`
          background: #eff6ff;
          border-color: #60a5fa;
          color: #1d4ed8;
          &:hover {
            background: #2563eb;
            color: #ffffff;
            border-color: #2563eb;
          }
        `;case"delete":return`
          background: #fff1f2;
          border-color: #f87171;
          color: #be123c;
          &:hover {
            background: #e11d48;
            color: #ffffff;
            border-color: #e11d48;
          }
        `;default:return`
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #334155;
        `}}}
`,Pt=l.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;

  .icon-circle {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 6px 0;
  }

  p {
    font-size: 0.84rem;
    color: #64748b;
    max-width: 420px;
    margin: 0 0 20px 0;
    line-height: 1.4;
  }

  .cta-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
`,g=r=>(Number(r)||0).toLocaleString(),Ot=()=>{const[r,C]=a.useState([]),[d,E]=a.useState(null),[T,L]=a.useState(!0),[N,y]=a.useState(""),[v,S]=a.useState("ALL"),[w,P]=a.useState("ALL"),[z,A]=a.useState("ALL"),[O,m]=a.useState(1),[h,B]=a.useState(null),[o,x]=a.useState(new Set),[I,k]=a.useState(null),[b,G]=a.useState(!1),[K,_]=a.useState(null),H=a.useRef(null),Q=()=>{var t;(t=H.current)==null||t.scrollBy({left:-450,behavior:"smooth"})},ee=()=>{var t;(t=H.current)==null||t.scrollBy({left:450,behavior:"smooth"})},D=async()=>{L(!0),_(null);try{const t=await R.getSales({search:N||void 0,productType:v!=="ALL"?v:void 0,paymentStatus:w!=="ALL"?w:void 0,orderStatus:z!=="ALL"?z:void 0,page:O,limit:50});C(t.sales||[]),E(t.summary),B(t.pagination)}catch(t){console.error(t),_("Unable to load sales data. Please check your connection and retry.")}finally{L(!1)}};a.useEffect(()=>{D()},[N,v,w,z,O]);const de=()=>{o.size===r.length&&r.length>0?x(new Set):x(new Set(r.map(t=>t.id)))},X=t=>{x(p=>{const c=new Set(p);return c.has(t)?c.delete(t):c.add(t),c})},te=async(t,p)=>{var c,f;if(window.confirm(`⚠️ Are you sure you want to delete invoice ${p}?`))try{await R.deleteSale(t),x(i=>{const s=new Set(i);return s.delete(t),s}),await D()}catch(i){alert(((f=(c=i==null?void 0:i.response)==null?void 0:c.data)==null?void 0:f.message)||"Delete failed")}},Y=async()=>{var t,p;if(o.size!==0&&window.confirm(`⚠️ Are you sure you want to permanently delete the ${o.size} selected sales?`))try{await R.deleteSalesBatch(Array.from(o)),x(new Set),await D(),alert("✅ Selected sales deleted successfully.")}catch(c){alert(((p=(t=c==null?void 0:c.response)==null?void 0:t.data)==null?void 0:p.message)||"Delete batch failed")}},re=async()=>{var t,p;if(window.confirm("⚠️ WARNING: Are you sure you want to permanently delete ALL sales records from the database? This action cannot be undone."))try{await R.deleteAllSales(),x(new Set),await D(),alert("✅ All sales have been deleted successfully from the database.")}catch(c){alert(((p=(t=c==null?void 0:c.response)==null?void 0:t.data)==null?void 0:p.message)||"Delete all failed")}},$=o.size===1?r.find(t=>o.has(t.id)):null,ne=()=>{if(!r||r.length===0)return;const t=["Invoice No","Sale Date","Customer Name","Country","Product Type","Description","Shape","Carat","Color","Clarity","Cut","Cert No","Supplier","Purchase Price","Selling Price","Discount","Final Sale Amount","Shipping Cost","GST %","GST Amount","Final Purchase Price","Gross Profit","Net Profit","Sales Person","Commission %","Commission Amount","Profit After Commission","Payment Status","Order Status","Tracking Number"],p=r.map(s=>[s.invoiceNo,s.saleDate?new Date(s.saleDate).toISOString().split("T")[0]:"",`"${s.customerName}"`,s.customerCountry||"",s.productType,`"${s.productDescription||""}"`,s.shape||"",s.caratWeight||"",s.diamondColor||"",s.clarity||"",s.cut||"",s.certificateNo||"",`"${s.supplierName||""}"`,s.purchasePrice,s.sellingPrice,s.discount,s.finalSaleAmount,s.shippingCost,s.gstPercent,s.gstAmount,s.finalPurchasePrice,s.grossProfit,s.netProfit,`"${s.salesPersonName||""}"`,s.commissionPercent,s.commissionAmount,s.profitAfterCommission,s.paymentStatus,s.orderStatus,s.trackingNumber||""]),c="data:text/csv;charset=utf-8,"+[t.join(","),...p.map(s=>s.join(","))].join(`
`),f=encodeURI(c),i=document.createElement("a");i.setAttribute("href",f),i.setAttribute("download",`sales_tracker_${new Date().toISOString().split("T")[0]}.csv`),document.body.appendChild(i),i.click(),document.body.removeChild(i)},U=()=>{if(!r||r.length===0)return;const t=["Invoice No","Sale Date","Customer Name","Customer Country","Product Type","Product Description","Stone Type","Shape","Diamond Color","Clarity","Cut","Polish","Symmetry","Fluorescence","Measurement","Price per Carat","Carat / Weight","Quantity","Certificate","Certificate No","Supplier","Purchase Price","Selling Price","Discount","Final Sale Amount","Shipping Cost","GST %","GST Amount","Final Purchase Price","Payment Status","Payment Method","Amount Received","Pending Amount","Gross Profit","Net Profit","Sales Person","Commission %","Commission Amount","Profit After Commission","Profit % (Markup)","Final Profit %","Order Status","Tracking Number","Tracking Link","Dollar Rate","Sale Month"],p=r.map(i=>[i.invoiceNo,i.saleDate?new Date(i.saleDate).toISOString().split("T")[0]:"",i.customerName||"",i.customerCountry||"",i.productType||"",i.productDescription||"",i.stoneType||"",i.shape||"",i.diamondColor||"",i.clarity||"",i.cut||"",i.polish||"",i.symmetry||"",i.fluorescence||"",i.measurement||"",i.pricePerCarat??"",i.caratWeight??"",i.quantity??1,i.certificate||"",i.certificateNo||"",i.supplierName||"",i.purchasePrice??0,i.sellingPrice??0,i.discount??0,i.finalSaleAmount??0,i.shippingCost??0,i.gstPercent??0,i.gstAmount??0,i.finalPurchasePrice??0,i.paymentStatus||"",i.paymentMethod||"",i.amountReceived??0,i.pendingAmount??0,i.grossProfit??0,i.netProfit??0,i.salesPersonName||"",i.commissionPercent??0,i.commissionAmount??0,i.profitAfterCommission??0,i.markupPercent??0,i.finalProfitPercent??0,i.orderStatus||"",i.trackingNumber||"",i.trackingLink||"",i.dollarRate??94.55,i.saleMonth||""]),c=se.aoa_to_sheet([t,...p]),f=se.book_new();se.book_append_sheet(f,c,"Sales Ledger"),rt(f,`sales_ledger_${new Date().toISOString().split("T")[0]}.xlsx`)},V=N||v!=="ALL"||w!=="ALL"||z!=="ALL",q=()=>{y(""),S("ALL"),P("ALL"),A("ALL"),m(1)};return e.jsxs(bt,{children:[e.jsxs(jt,{children:[e.jsxs("div",{className:"title-group",children:[e.jsxs("h1",{children:["Sales Management Tracker",e.jsx("span",{className:"badge-tag",children:"46-Column Ledger"})]}),e.jsx("p",{children:"Authoritative financial tracking, sales performance, commissions & margins"})]}),e.jsxs("div",{className:"action-toolbar",children:[e.jsxs(j,{type:"button",$variant:"danger",onClick:re,title:"Purge all sales data from database",children:[e.jsx(ae,{size:13})," Delete All Sales"]}),e.jsxs(Ne,{to:`${M}/import`,title:"Import batch sales via Excel or CSV",children:[e.jsx(me,{size:14,color:"#2563eb"})," Import Excel / File"]}),e.jsxs(j,{type:"button",$variant:"success",onClick:U,title:"Export ledger to Excel workbook",children:[e.jsx(be,{size:14,color:"#15803d"})," Export Excel (.xlsx)"]}),e.jsxs(j,{type:"button",onClick:ne,title:"Export CSV spreadsheet",children:[e.jsx(Fe,{size:14})," Export CSV"]}),e.jsxs(Ce,{to:`${M}/sales/new`,title:"Create a new commercial invoice",children:[e.jsx(je,{size:16})," New Sale Invoice"]})]})]}),e.jsx(yt,{children:T&&!d?Array.from({length:7}).map((t,p)=>e.jsx(vt,{},p)):e.jsxs(e.Fragment,{children:[e.jsxs(W,{children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Total Orders"}),e.jsx("span",{className:"icon-wrap",children:e.jsx(We,{size:14})})]}),e.jsx("div",{className:"val",children:(d==null?void 0:d.totalOrders)||0}),e.jsx("div",{className:"subtitle",children:"Processed deals"})]}),e.jsxs(W,{$highlight:"revenue",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Total Revenue"}),e.jsx("span",{className:"icon-wrap",children:e.jsx(Be,{size:14,color:"#0f172a"})})]}),e.jsxs("div",{className:"val",children:["$",g(d==null?void 0:d.totalRevenue)]}),e.jsx("div",{className:"subtitle",children:"Gross billed volume"})]}),e.jsxs(W,{children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Purchase Costs"}),e.jsx("span",{className:"icon-wrap",children:e.jsx(Me,{size:14})})]}),e.jsxs("div",{className:"val",style:{color:"#475569"},children:["$",g(d==null?void 0:d.totalPurchaseCost)]}),e.jsx("div",{className:"subtitle",children:"Inventory & vendor COGS"})]}),e.jsxs(W,{children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Gross Profit"}),e.jsx("span",{className:"icon-wrap",children:e.jsx(_e,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",g(d==null?void 0:d.totalGrossProfit)]}),e.jsx("div",{className:"subtitle",children:"Revenue minus COGS"})]}),e.jsxs(W,{$highlight:"profit",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Net Profit"}),e.jsx("span",{className:"icon-wrap",style:{background:"#f0fdf4",color:"#16a34a"},children:e.jsx(He,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",g(d==null?void 0:d.totalNetProfit)]}),e.jsx("div",{className:"subtitle",children:"Post-shipping & GST"})]}),e.jsxs(W,{$highlight:"warning",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Commission Due"}),e.jsx("span",{className:"icon-wrap",style:{background:"#fffbeb",color:"#d97706"},children:e.jsx(Ue,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",g(d==null?void 0:d.totalCommission)]}),e.jsx("div",{className:"subtitle",children:"Staff commission liability"})]}),e.jsxs(W,{$highlight:"retained",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Retained Profit"}),e.jsx("span",{className:"icon-wrap",style:{background:"#eff6ff",color:"#2563eb"},children:e.jsx(Ve,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",g(d==null?void 0:d.totalProfitAfterCommission)]}),e.jsx("div",{className:"subtitle",children:"Retained business equity"})]})]})}),e.jsxs(St,{children:[e.jsxs("div",{className:"search-wrapper",children:[e.jsx(qe,{size:14,color:"#64748b"}),e.jsx("input",{type:"text",placeholder:"Search invoice, client, stone, certificate...",value:N,onChange:t=>{y(t.target.value),m(1)}}),N&&e.jsx("button",{className:"clear-btn",onClick:()=>y(""),title:"Clear search",children:e.jsx(ce,{size:13})})]}),e.jsxs("select",{className:"filter-select",value:v,onChange:t=>{S(t.target.value),m(1)},children:[e.jsx("option",{value:"ALL",children:"All Product Types"}),e.jsx("option",{value:"Diamond",children:"💎 Diamonds Only"}),e.jsx("option",{value:"Jewelry",children:"✨ Jewelry Only"})]}),e.jsxs("select",{className:"filter-select",value:w,onChange:t=>{P(t.target.value),m(1)},children:[e.jsx("option",{value:"ALL",children:"All Payment Statuses"}),e.jsx("option",{value:"Paid",children:"Paid (Full)"}),e.jsx("option",{value:"Partial",children:"Partial Payment"}),e.jsx("option",{value:"Pending",children:"Pending / Unpaid"})]}),e.jsxs("select",{className:"filter-select",value:z,onChange:t=>{A(t.target.value),m(1)},children:[e.jsx("option",{value:"ALL",children:"All Order Statuses"}),e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"})]}),V&&e.jsxs(j,{type:"button",onClick:q,style:{padding:"6px 12px",fontSize:"0.78rem"},children:[e.jsx(ye,{size:12})," Reset Filters"]}),e.jsx("div",{className:"results-pill",children:T?"Loading...":`Showing ${r.length} ${r.length===1?"sale":"sales"}`})]}),o.size>0&&e.jsxs(Ct,{children:[e.jsxs("div",{children:["✨ ",e.jsx("strong",{children:o.size})," ",o.size===1?"sale selected":"sales selected",$&&e.jsxs("span",{children:[" (",$.invoiceNo," • ",$.customerName,")"]})]}),e.jsxs("div",{className:"actions",children:[o.size===1&&$&&e.jsxs(j,{type:"button",$variant:"primary",onClick:()=>k($),style:{padding:"5px 12px",fontSize:"0.78rem"},title:"Edit full sale details",children:[e.jsx(ve,{size:13})," Edit Sale (",$.invoiceNo,")"]}),o.size>1&&e.jsxs(j,{type:"button",$variant:"primary",onClick:()=>G(!0),style:{padding:"5px 14px",fontSize:"0.78rem"},title:"Bulk edit all selected invoices",children:[e.jsx(Pe,{size:13})," Bulk Edit Selected (",o.size,")"]}),e.jsx(j,{type:"button",onClick:()=>x(new Set),style:{padding:"5px 10px",fontSize:"0.76rem"},children:"Deselect All"}),e.jsxs(j,{type:"button",$variant:"danger",onClick:Y,style:{padding:"5px 12px",fontSize:"0.76rem"},children:[e.jsx(ae,{size:12})," Delete Selected (",o.size,")"]})]})]}),K&&e.jsxs("div",{style:{background:"#fff5f5",border:"1px solid #fecaca",borderRadius:8,padding:"12px 16px",color:"#b91c1c",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{children:["⚠️ ",K]}),e.jsx(j,{type:"button",onClick:D,style:{padding:"4px 10px",fontSize:"0.76rem"},children:"Try Again"})]}),e.jsxs(kt,{children:[e.jsxs("div",{className:"hint-text",children:[e.jsx(Je,{size:14,color:"#0f172a"}),e.jsx("span",{children:"46-Column Financial Ledger • Scroll horizontally or swipe on touch screens"})]}),e.jsxs("div",{className:"scroll-btn-group",children:[e.jsxs("button",{type:"button",className:"nav-btn",onClick:Q,title:"Scroll ledger left",children:[e.jsx(Ke,{size:12})," Scroll Left"]}),e.jsxs("button",{type:"button",className:"nav-btn",onClick:ee,title:"Scroll ledger right",children:["Scroll Right ",e.jsx(Qe,{size:12})]})]})]}),e.jsx(Nt,{ref:H,children:e.jsxs(wt,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"sticky-col-chk",children:e.jsxs(we,{$checked:r.length>0&&o.size===r.length,onClick:t=>{t.preventDefault(),de()},title:"Select / Deselect All Sales",children:[e.jsx("input",{type:"checkbox",checked:r.length>0&&o.size===r.length,readOnly:!0}),r.length>0&&o.size===r.length&&e.jsx(Se,{size:11,strokeWidth:3})]})}),e.jsx("th",{className:"sticky-col-inv",children:"Invoice No"}),e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Customer"}),e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Description / Shape"}),e.jsx("th",{children:"Carat"}),e.jsx("th",{children:"Color/Clarity"}),e.jsx("th",{children:"Cert #"}),e.jsx("th",{children:"Supplier"}),e.jsx("th",{children:"Selling Price"}),e.jsx("th",{children:"Final Sale"}),e.jsx("th",{children:"Purchase Price"}),e.jsx("th",{children:"GST"}),e.jsx("th",{children:"Final Purchase"}),e.jsx("th",{children:"Gross Profit"}),e.jsx("th",{children:"Net Profit"}),e.jsx("th",{children:"Sales Person"}),e.jsx("th",{children:"Comm %"}),e.jsx("th",{children:"Comm ($)"}),e.jsx("th",{children:"Retained Profit"}),e.jsx("th",{children:"Markup %"}),e.jsx("th",{children:"Payment"}),e.jsx("th",{children:"Order Status"}),e.jsx("th",{children:"Tracking"}),e.jsx("th",{children:"Dollar Rate"}),e.jsx("th",{style:{textAlign:"center",minWidth:110},children:"Actions"})]})}),e.jsxs("tbody",{children:[r.map(t=>{const p=o.has(t.id),c=t.productType==="Diamond";return e.jsxs("tr",{style:{background:p?"#f0fdf4":void 0},children:[e.jsx("td",{className:"sticky-col-chk",children:e.jsxs(we,{$checked:p,onClick:f=>{f.preventDefault(),X(t.id)},title:`Select invoice ${t.invoiceNo}`,children:[e.jsx("input",{type:"checkbox",checked:p,readOnly:!0}),p&&e.jsx(Se,{size:11,strokeWidth:3})]})}),e.jsx("td",{className:"sticky-col-inv",children:e.jsx(Z,{to:`${M}/sales/${t.id}`,style:{color:"#0d1319",textDecoration:"none",fontWeight:700},children:t.invoiceNo})}),e.jsx("td",{children:t.saleDate?new Date(t.saleDate).toLocaleDateString():"-"}),e.jsx("td",{style:{fontWeight:600,color:"#0f172a"},children:t.customerName}),e.jsx("td",{children:t.customerCountry||"-"}),e.jsx("td",{children:e.jsx(oe,{$type:t.productType,children:t.productType==="Diamond"?"💎 Diamond":"✨ Jewelry"})}),e.jsx("td",{style:{maxWidth:220,overflow:"hidden",textOverflow:"ellipsis"},children:c?t.shape||t.productDescription||"-":t.productDescription||"-"}),e.jsx("td",{children:c&&t.caratWeight?`${t.caratWeight} ct`:c?"-":`Qty: ${t.quantity||1}`}),e.jsx("td",{children:c&&t.diamondColor?`${t.diamondColor} / ${t.clarity||""}`:"-"}),e.jsx("td",{children:c&&t.certificateNo||"-"}),e.jsx("td",{children:t.supplierName||"None"}),e.jsxs("td",{children:["$",g(t.sellingPrice)]}),e.jsxs("td",{style:{fontWeight:700,color:"#0f172a"},children:["$",g(t.finalSaleAmount)]}),e.jsxs("td",{children:["$",g(t.purchasePrice)]}),e.jsxs("td",{children:["$",g(t.gstAmount)]}),e.jsxs("td",{children:["$",g(t.finalPurchasePrice)]}),e.jsxs("td",{children:["$",g(t.grossProfit)]}),e.jsxs("td",{style:{fontWeight:700,color:(Number(t.netProfit)||0)>=0?"#16a34a":"#dc2626"},children:["$",g(t.netProfit)]}),e.jsx("td",{children:t.salesPersonName||"-"}),e.jsxs("td",{children:[((Number(t.commissionPercent)||0)*100).toFixed(1),"%"]}),e.jsxs("td",{style:{color:"#d97706",fontWeight:600},children:["$",g(t.commissionAmount)]}),e.jsxs("td",{style:{fontWeight:700,color:"#2563eb"},children:["$",g(t.profitAfterCommission)]}),e.jsxs("td",{children:[((Number(t.markupPercent)||0)*100).toFixed(1),"%"]}),e.jsx("td",{children:e.jsx(oe,{$type:t.paymentStatus,children:t.paymentStatus})}),e.jsx("td",{children:e.jsx(oe,{$type:t.orderStatus,children:t.orderStatus})}),e.jsx("td",{children:t.trackingNumber?t.trackingLink?e.jsxs("a",{href:t.trackingLink,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:3,color:"#2563eb",textDecoration:"none"},children:[t.trackingNumber," ",e.jsx(Xe,{size:10})]}):t.trackingNumber:"-"}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("input",{type:"number",step:"0.01",defaultValue:t.dollarRate?Number(t.dollarRate).toFixed(2):"94.55",onBlur:async f=>{const i=Number(f.target.value);if(i&&i!==Number(t.dollarRate))try{await R.updateDollarRate(t.id,i)}catch(s){console.error("Failed to update dollar rate",s)}},onKeyDown:f=>{f.key==="Enter"&&f.target.blur()},style:{width:70,padding:"4px 6px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.78rem",background:"#ffffff",textAlign:"center",fontWeight:600,color:"#0f172a"}})}),e.jsx("td",{style:{textAlign:"center"},children:e.jsxs("div",{style:{display:"inline-flex",gap:6,alignItems:"center",justifyContent:"center"},children:[e.jsx(Z,{to:`${M}/sales/${t.id}`,children:e.jsx(le,{type:"button",$variant:"view",title:"View Sale Detail",children:e.jsx(Ye,{size:13,strokeWidth:2.2})})}),e.jsx(le,{type:"button",$variant:"edit",onClick:()=>k(t),title:"Edit Sale Invoice",children:e.jsx(ve,{size:13,strokeWidth:2.2})}),e.jsx(le,{type:"button",$variant:"delete",onClick:()=>te(t.id,t.invoiceNo),title:"Delete Sale Invoice",children:e.jsx(ae,{size:13,strokeWidth:2.2})})]})})]},t.id)}),r.length===0&&!T&&e.jsx("tr",{children:e.jsx("td",{colSpan:28,style:{padding:0},children:e.jsxs(Pt,{children:[e.jsx("div",{className:"icon-circle",children:e.jsx(be,{size:26})}),e.jsx("h3",{children:"No sales records found"}),e.jsx("p",{children:V?"No transactions matched your current search filters. Try clearing or broadening your search.":"Get started by creating your first commercial invoice or importing your existing spreadsheet ledger."}),e.jsx("div",{className:"cta-group",children:V?e.jsxs(j,{type:"button",onClick:q,children:[e.jsx(ye,{size:13})," Reset Filters"]}):e.jsxs(e.Fragment,{children:[e.jsxs(Ce,{to:`${M}/sales/new`,children:[e.jsx(je,{size:15})," Create Invoice"]}),e.jsxs(Ne,{to:`${M}/import`,children:[e.jsx(me,{size:15,color:"#2563eb"})," Import Excel / CSV"]})]})})]})})})]})]})}),h&&h.totalPages>1&&e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,marginTop:4,flexWrap:"wrap"},children:[e.jsxs("span",{style:{fontSize:"0.8rem",color:"#64748b"},children:["Showing page ",e.jsx("strong",{children:h.page})," of ",e.jsx("strong",{children:h.totalPages})," (",h.total," total transactions)"]}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsxs(j,{type:"button",onClick:()=>m(t=>Math.max(1,t-1)),disabled:h.page===1,style:{padding:"6px 12px"},children:[e.jsx(Ze,{size:14})," Previous"]}),e.jsxs(j,{type:"button",onClick:()=>m(t=>Math.min(h.totalPages,t+1)),disabled:h.page===h.totalPages,style:{padding:"6px 12px"},children:["Next ",e.jsx(et,{size:14})]})]})]}),I&&e.jsx(ct,{sale:I,onClose:()=>k(null),onSuccess:()=>{k(null),D()}}),b&&e.jsx(gt,{selectedIds:Array.from(o),onClose:()=>G(!1),onSuccess:()=>{G(!1),x(new Set),D()}})]})};export{Ot as BusinessSalesListPage};
