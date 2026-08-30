import{r as s,j as e,X as me,ak as Oe,ax as Re,h as Se,ad as fe,b8 as we,_ as Ce,ae as Ge,P as ke,be as Me,Z as Be,bf as _e,al as He,aP as Ue,x as Ve,k as qe,b as Ne,af as Pe,bg as Je,aq as Ke,A as Ye,c as Ae,f as ae,bh as Qe,aj as Xe,i as Ze,l as et,m as tt}from"./react-vendor-Jc2qAOIG.js";import{g as l,E as rt}from"./ui-vendor-Bp1vOpov.js";import{u as he,w as it}from"./admin-tools-vendor-CKN5doRT.js";import{P as V}from"./admin-pages-DtNyvjPo.js";import{b as R}from"./businessApi-C1KDOZil.js";import"./swiper-vendor-B7SuwHD8.js";const nt=l.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
`,st=l.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  box-sizing: border-box;
`,at=l.div`
  padding: 14px 18px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  flex-wrap: nowrap;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;

  .header-info {
    min-width: 0;
    flex: 1;
    overflow: hidden;

    h2 {
      font-size: 1.1rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    p {
      font-size: 0.72rem;
      color: #64748b;
      margin: 2px 0 0 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .close-btn {
    background: #f1f5f9;
    border: none;
    border-radius: 6px;
    width: 32px;
    height: 32px;
    min-width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #64748b;
    flex-shrink: 0;
  }
`,ot=l.div`
  padding: 18px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;

  @media (max-width: 480px) {
    padding: 14px;
  }
`,lt=l.div`
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: #f8fafc;
`,ct=l.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,x=l.div`
  grid-column: ${({$full:n})=>n?"1 / -1":"auto"};
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
`,dt=({sale:n,onClose:P,onSuccess:q})=>{const[T,I]=s.useState([]),[E,A]=s.useState([]),[C,j]=s.useState(!1),[k,D]=s.useState(n.invoiceNo||""),[z,L]=s.useState(n.saleDate?new Date(n.saleDate).toISOString().split("T")[0]:""),[$,y]=s.useState(n.customerName||""),[F,w]=s.useState(n.customerCountry||""),[W,f]=s.useState(n.productType||"Diamond"),[h,b]=s.useState(n.productDescription||""),[O,d]=s.useState(n.shape||"Round"),[v,K]=s.useState(n.caratWeight||""),[G,oe]=s.useState(n.diamondColor||"F"),[U,Y]=s.useState(n.clarity||"VS1"),[Q,X]=s.useState(n.cut||"3EX"),[Z,le]=s.useState(n.certificateNo||""),[N,ce]=s.useState(n.supplierName||""),[ee,p]=s.useState(n.purchasePrice||0),[te,u]=s.useState(n.sellingPrice||0),[re,de]=s.useState(n.discount||0),[ie,pe]=s.useState(n.gstPercent??.015),[ue,M]=s.useState(n.shippingCost||0),[ne,xe]=s.useState(n.dollarRate||94.55),[B,se]=s.useState(n.employeeId||""),[t,a]=s.useState(n.commissionPercent??.05),[c,g]=s.useState(n.paymentStatus||"Paid"),[i,o]=s.useState(n.paymentMethod||"Bank Wire"),[Te,Dt]=s.useState(n.amountReceived||""),[be,Ee]=s.useState(n.orderStatus||"Delivered"),[je,Fe]=s.useState(n.trackingNumber||"");s.useEffect(()=>{R.getEmployees({status:"ACTIVE"}).then(r=>{I(Array.isArray(r)?r:(r==null?void 0:r.employees)||[])}),R.getSuppliers().then(r=>{A(Array.isArray(r)?r:(r==null?void 0:r.suppliers)||[])})},[]);const Ie=async r=>{var ye,ve;r.preventDefault(),j(!0);try{const _=T.find(We=>We.id===B);await R.updateSale(n.id,{invoiceNo:k,saleDate:z,customerName:$,customerCountry:F,productType:W,productDescription:h,shape:O,caratWeight:v?Number(v):void 0,diamondColor:G,clarity:U,cut:Q,certificateNo:Z,supplierName:N,purchasePrice:Number(ee)||0,sellingPrice:Number(te)||0,discount:Number(re)||0,gstPercent:Number(ie)||0,shippingCost:Number(ue)||0,dollarRate:Number(ne)||94.55,employeeId:B||void 0,salesPersonName:(_==null?void 0:_.fullName)||n.salesPersonName||void 0,commissionPercent:Number(t)||0,paymentStatus:c,paymentMethod:i,amountReceived:Number(Te)||Number(te)||0,orderStatus:be,trackingNumber:je}),alert(`✅ Invoice ${k} updated successfully!`),q()}catch(_){alert(((ve=(ye=_==null?void 0:_.response)==null?void 0:ye.data)==null?void 0:ve.message)||"Failed to update sale")}finally{j(!1)}};return e.jsx(nt,{onClick:P,children:e.jsxs(st,{onClick:r=>r.stopPropagation(),children:[e.jsxs(at,{children:[e.jsxs("div",{className:"header-info",children:[e.jsxs("h2",{children:["Edit Sale Invoice — ",n.invoiceNo]}),e.jsx("p",{children:"Modify commercial details, client information, pricing ledger, and exchange rates"})]}),e.jsx("button",{type:"button",onClick:P,className:"close-btn",title:"Close",children:e.jsx(me,{size:18})})]}),e.jsxs("form",{onSubmit:Ie,style:{display:"flex",flexDirection:"column",flex:1,overflow:"hidden"},children:[e.jsx(ot,{children:e.jsxs(ct,{children:[e.jsxs(x,{children:[e.jsx("label",{children:"Invoice Number *"}),e.jsx("input",{type:"text",value:k,onChange:r=>D(r.target.value),required:!0})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Sale Date *"}),e.jsx("input",{type:"date",value:z,onChange:r=>L(r.target.value),required:!0})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Customer Name *"}),e.jsx("input",{type:"text",value:$,onChange:r=>y(r.target.value),required:!0})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Customer Country"}),e.jsx("input",{type:"text",value:F,onChange:r=>w(r.target.value)})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Product Type"}),e.jsxs("select",{value:W,onChange:r=>f(r.target.value),children:[e.jsx("option",{value:"Diamond",children:"Diamond"}),e.jsx("option",{value:"Jewelry",children:"Jewelry"})]})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Shape / Model"}),e.jsx("input",{type:"text",value:O,onChange:r=>d(r.target.value)})]}),e.jsxs(x,{$full:!0,children:[e.jsx("label",{children:"Product Description / Diamond Specs"}),e.jsx("input",{type:"text",value:h,onChange:r=>b(r.target.value)})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Carat Weight (ct)"}),e.jsx("input",{type:"number",step:"0.01",value:v,onChange:r=>K(r.target.value)})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Color / Clarity"}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("input",{type:"text",placeholder:"Color",value:G,onChange:r=>oe(r.target.value)}),e.jsx("input",{type:"text",placeholder:"Clarity",value:U,onChange:r=>Y(r.target.value)})]})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Certificate No"}),e.jsx("input",{type:"text",value:Z,onChange:r=>le(r.target.value)})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Supplier / Vendor"}),e.jsx("input",{type:"text",value:N,onChange:r=>ce(r.target.value),list:"edit-supp-list"}),e.jsx("datalist",{id:"edit-supp-list",children:E.map(r=>e.jsx("option",{value:r.name},r.id))})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Purchase Price ($)"}),e.jsx("input",{type:"number",step:"0.01",value:ee,onChange:r=>p(Number(r.target.value)),required:!0})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Selling Price ($)"}),e.jsx("input",{type:"number",step:"0.01",value:te,onChange:r=>u(Number(r.target.value)),required:!0})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Discount ($)"}),e.jsx("input",{type:"number",step:"0.01",value:re,onChange:r=>de(Number(r.target.value))})]}),e.jsxs(x,{children:[e.jsx("label",{children:"GST % (e.g. 0.015 for 1.5%)"}),e.jsx("input",{type:"number",step:"0.001",value:ie,onChange:r=>pe(Number(r.target.value))})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Dollar Rate ($ / ₹)"}),e.jsx("input",{type:"number",step:"0.01",value:ne,onChange:r=>xe(Number(r.target.value)),required:!0})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Sales Person"}),e.jsxs("select",{value:B,onChange:r=>se(r.target.value),children:[e.jsx("option",{value:"",children:"Unassigned"}),T.map(r=>e.jsxs("option",{value:r.id,children:[r.fullName||r.name," (",r.employeeCode,")"]},r.id))]})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Commission Rate (e.g. 0.05 for 5%)"}),e.jsx("input",{type:"number",step:"0.005",value:t,onChange:r=>a(Number(r.target.value))})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Payment Status"}),e.jsxs("select",{value:c,onChange:r=>g(r.target.value),children:[e.jsx("option",{value:"Paid",children:"Paid"}),e.jsx("option",{value:"Partial",children:"Partial"}),e.jsx("option",{value:"Pending",children:"Pending"}),e.jsx("option",{value:"Unpaid",children:"Unpaid"})]})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Order Status"}),e.jsxs("select",{value:be,onChange:r=>Ee(r.target.value),children:[e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"}),e.jsx("option",{value:"Cancelled",children:"Cancelled"})]})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Tracking Number"}),e.jsx("input",{type:"text",value:je,onChange:r=>Fe(r.target.value)})]})]})}),e.jsxs(lt,{children:[e.jsx("button",{type:"button",onClick:P,style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#ffffff",borderRadius:6,fontSize:"0.82rem",fontWeight:600,cursor:"pointer"},children:"Cancel"}),e.jsxs("button",{type:"submit",disabled:C,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 20px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontSize:"0.82rem",fontWeight:700,cursor:"pointer"},children:[e.jsx(Oe,{size:14})," ",C?"Saving Changes...":"Save Invoice"]})]})]})]})})},pt=l.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
`,ut=l.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 92vh;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
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
`,xt=l.div`
  padding: 14px 16px;
  background: #0d1319;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;

  h2 {
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`,ft=l.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 6px;
  flex-shrink: 0;
  min-width: 32px;
  height: 32px;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
  }
`,ht=l.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 75vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
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
`,gt=l.div`
  padding: 14px 20px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`,De=l.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;

  ${({$variant:n})=>n==="primary"?`
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
`,mt=({selectedIds:n,onClose:P,onSuccess:q})=>{const[T,I]=s.useState("NO_CHANGE"),[E,A]=s.useState("NO_CHANGE"),[C,j]=s.useState("NO_CHANGE"),[k,D]=s.useState(""),[z,L]=s.useState("NO_CHANGE"),[$,y]=s.useState(!1),[F,w]=s.useState(null),W=async f=>{var b,O;f.preventDefault(),w(null);const h={};if(T!=="NO_CHANGE"&&(h.paymentStatus=T),E!=="NO_CHANGE"&&(h.orderStatus=E),C!=="NO_CHANGE"&&(h.salesPersonName=C),z!=="NO_CHANGE"&&(h.paymentMethod=z),k.trim()!==""){const d=Number(k);!isNaN(d)&&d>0&&(h.dollarRate=d)}if(Object.keys(h).length===0){w("Please choose at least one field to update.");return}y(!0);try{await R.bulkUpdateSales(n,h),alert(`✅ Successfully bulk updated ${n.length} sales records in the database.`),q()}catch(d){console.error(d),w(((O=(b=d==null?void 0:d.response)==null?void 0:b.data)==null?void 0:O.message)||"Bulk update failed. Please try again.")}finally{y(!1)}};return e.jsx(pt,{onClick:P,children:e.jsxs(ut,{onClick:f=>f.stopPropagation(),children:[e.jsxs(xt,{children:[e.jsxs("h2",{children:[e.jsx(Re,{size:17})," Bulk Edit Sales (",n.length," records)"]}),e.jsx(ft,{onClick:P,children:e.jsx(me,{size:18})})]}),e.jsxs("form",{onSubmit:W,children:[e.jsxs(ht,{children:[e.jsxs("div",{style:{background:"#f0fdf4",border:"1px solid #bbf7d0",padding:"10px 14px",borderRadius:8,fontSize:"0.78rem",color:"#166534"},children:["💡 Changes will be applied to all ",e.jsx("strong",{children:n.length}),` selected invoices simultaneously. Leave any field as "Do Not Change" to keep each invoice's current value.`]}),F&&e.jsxs("div",{style:{background:"#fff5f5",border:"1px solid #fecaca",padding:"10px 14px",borderRadius:8,fontSize:"0.78rem",color:"#b91c1c"},children:["⚠️ ",F]}),e.jsxs(J,{children:[e.jsx("label",{children:"Payment Status"}),e.jsxs("select",{value:T,onChange:f=>I(f.target.value),children:[e.jsx("option",{value:"NO_CHANGE",children:"-- Do Not Change --"}),e.jsx("option",{value:"Paid",children:"Paid (Full)"}),e.jsx("option",{value:"Partial",children:"Partial Payment"}),e.jsx("option",{value:"Pending",children:"Pending / Unpaid"})]})]}),e.jsxs(J,{children:[e.jsx("label",{children:"Order / Delivery Status"}),e.jsxs("select",{value:E,onChange:f=>A(f.target.value),children:[e.jsx("option",{value:"NO_CHANGE",children:"-- Do Not Change --"}),e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"}),e.jsx("option",{value:"Cancelled",children:"Cancelled"})]})]}),e.jsxs(J,{children:[e.jsx("label",{children:"Assigned Sales Representative"}),e.jsxs("select",{value:C,onChange:f=>j(f.target.value),children:[e.jsx("option",{value:"NO_CHANGE",children:"-- Do Not Change --"}),e.jsx("option",{value:"Rutu",children:"Rutu (Sales Manager)"}),e.jsx("option",{value:"Jyoti",children:"Jyoti (Sales Executive)"}),e.jsx("option",{value:"Twinkle",children:"Twinkle (Sales Executive)"}),e.jsx("option",{value:"Veer",children:"Veer (Director)"})]})]}),e.jsxs(J,{children:[e.jsx("label",{children:"Payment Method"}),e.jsxs("select",{value:z,onChange:f=>L(f.target.value),children:[e.jsx("option",{value:"NO_CHANGE",children:"-- Do Not Change --"}),e.jsx("option",{value:"Bank Wire",children:"Bank Wire / Transfer"}),e.jsx("option",{value:"Credit Card",children:"Credit Card / Stripe"}),e.jsx("option",{value:"Cash",children:"Cash"}),e.jsx("option",{value:"Cheque",children:"Cheque"})]})]}),e.jsxs(J,{children:[e.jsx("label",{children:"Dollar Rate ($ / ₹)"}),e.jsx("input",{type:"number",step:"0.01",placeholder:"Leave blank to keep existing rates",value:k,onChange:f=>D(f.target.value)}),e.jsx("span",{className:"hint",children:"Example: 94.55"})]})]}),e.jsxs(gt,{children:[e.jsx(De,{type:"button",$variant:"secondary",onClick:P,disabled:$,children:"Cancel"}),e.jsx(De,{type:"submit",$variant:"primary",disabled:$,children:$?"Updating...":`Apply Bulk Changes (${n.length})`})]})]})]})})},bt=rt`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`,jt=l.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 100%;
  font-family: inherit;
`,yt=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  background: #ffffff;
  padding: 20px 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);

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
      flex-wrap: wrap;

      .badge-tag {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        background: #f1f5f9;
        color: #475569;
        padding: 3px 10px;
        border-radius: 20px;
        border: 1px solid #e2e8f0;
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
    }

    p {
      font-size: 0.82rem;
      color: #64748b;
      margin: 6px 0 0 0;
    }
  }

  .action-toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
`,ze=l(ae)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  background: #0d1319;
  color: #ffffff;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(13, 19, 25, 0.18);
  transition: all 0.15s ease;
  white-space: nowrap;
  border: 1px solid #0d1319;

  &:hover {
    background: #1e293b;
    box-shadow: 0 4px 10px rgba(13, 19, 25, 0.25);
    transform: translateY(-1px);
    color: #ffffff;
  }

  &:active {
    transform: translateY(0);
  }
`,S=l.button`
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

  ${({$variant:n})=>{switch(n){case"danger":return`
          border: 1px solid #fecdd3;
          color: #e11d48;
          background: #fff1f2;
          &:hover {
            background: #ffe4e6;
            border-color: #fda4af;
          }
        `;case"success":return`
          border: 1px solid #bbf7d0;
          color: #15803d;
          background: #f0fdf4;
          &:hover {
            background: #dcfce7;
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
`,Le=l(ae)`
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
`,vt=l.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`,H=l.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.15s ease;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    transform: translateY(-1px);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    .label {
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #64748b;
    }

    .icon-wrap {
      width: 26px;
      height: 26px;
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
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
    color: ${({$theme:n})=>{switch(n){case"revenue":return"#0f172a";case"cost":return"#475569";case"gross":return"#0284c7";case"net":return"#16a34a";case"commission":return"#d97706";case"retained":return"#2563eb";default:return"#0f172a"}}};
  }

  .subtitle {
    font-size: 0.68rem;
    color: #94a3b8;
    margin-top: 4px;
  }
`,St=l.div`
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  height: 92px;
  animation: ${bt} 1.5s infinite;
`,wt=l.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

  .search-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 7px 12px;
    flex: 1;
    min-width: 260px;
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
    padding: 8px 12px;
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
    padding: 6px 12px;
    background: #f8fafc;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    margin-left: auto;
  }
`,Ct=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 0.78rem;
  color: #475569;
  flex-wrap: wrap;
  gap: 8px;

  .hint-text {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: #334155;
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
    padding: 5px 12px;
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
`,kt=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #166534;
  flex-wrap: wrap;
  gap: 12px;
  box-shadow: 0 2px 6px rgba(22, 101, 52, 0.08);

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
`,$e=l.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  border-radius: 4px;
  border: 1.5px solid ${({$checked:n})=>n?"#0d1319":"#cbd5e1"};
  background: ${({$checked:n})=>n?"#0d1319":"#ffffff"};
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
`,Pt=l.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
  white-space: nowrap;

  th {
    background: #0d1319;
    color: #f8fafc;
    padding: 12px 14px;
    font-weight: 700;
    text-align: left;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    position: sticky;
    top: 0;
    z-index: 10;
    letter-spacing: 0.02em;
    font-size: 0.74rem;
    text-transform: uppercase;
  }

  td {
    padding: 11px 14px;
    border-bottom: 1px solid #f1f5f9;
    border-right: 1px solid #f8fafc;
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
    min-width: 135px;
    background: #0d1319 !important;
    color: #f1f4f8 !important;
    z-index: 30;
    font-weight: 800;
    box-shadow: 3px 0 6px rgba(0, 0, 0, 0.12);
  }

  td.sticky-col-inv {
    position: sticky;
    left: 44px;
    min-width: 135px;
    background: #ffffff;
    z-index: 20;
    font-weight: 700;
    box-shadow: 3px 0 6px rgba(0, 0, 0, 0.04);
  }

  tr:hover td.sticky-col-chk,
  tr:hover td.sticky-col-inv {
    background: #f8fafc;
  }
`,ge=l.span`
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  letter-spacing: 0.02em;

  ${({$type:n})=>{switch(n){case"Paid":return"background: #ebfbee; color: #2b8a3e; border: 1px solid #b2f2bb;";case"Partial":return"background: #fff9db; color: #f59f00; border: 1px solid #ffe066;";case"Pending":case"Unpaid":return"background: #fff5f5; color: #e03131; border: 1px solid #ffc9c9;";case"Delivered":return"background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe;";case"Shipped":return"background: #f3f0ff; color: #7950f2; border: 1px solid #d0bfff;";case"Processing":return"background: #fff4e6; color: #d9480f; border: 1px solid #ffd8a8;";case"Diamond":return"background: #fef3c7; color: #b45309; border: 1px solid #fde68a;";case"Jewelry":return"background: #ede9fe; color: #6d28d9; border: 1px solid #ddd6fe;";default:return"background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0;"}}}
`,At=l.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;

  .icon-circle {
    width: 60px;
    height: 60px;
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
    font-size: 1.15rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 6px 0;
  }

  p {
    font-size: 0.84rem;
    color: #64748b;
    max-width: 440px;
    margin: 0 0 24px 0;
    line-height: 1.5;
  }

  .cta-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
`,m=n=>(Number(n)||0).toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:2}),Ft=()=>{const[n,P]=s.useState([]),[q,T]=s.useState(null),[I,E]=s.useState(!0),[A,C]=s.useState(""),[j,k]=s.useState("ALL"),[D,z]=s.useState("ALL"),[L,$]=s.useState("ALL"),[y,F]=s.useState("ALL"),[w,W]=s.useState("ALL"),[f,h]=s.useState(1),[b,O]=s.useState(null),[d,v]=s.useState(new Set),[K,G]=s.useState(null),[oe,U]=s.useState(!1),[Y,Q]=s.useState(null),X=s.useRef(null),Z=()=>{var t;(t=X.current)==null||t.scrollBy({left:-450,behavior:"smooth"})},le=()=>{var t;(t=X.current)==null||t.scrollBy({left:450,behavior:"smooth"})},N=async()=>{E(!0),Q(null);try{const t=await R.getSales({search:A||void 0,productType:j!=="ALL"?j:void 0,paymentStatus:D!=="ALL"?D:void 0,orderStatus:L!=="ALL"?L:void 0,page:f,limit:100});P(t.sales||[]),T(t.summary),O(t.pagination)}catch(t){console.error(t),Q("Unable to load sales data. Please check your connection and retry.")}finally{E(!1)}};s.useEffect(()=>{N()},[A,j,D,L,f]);const ce=Array.from(new Set(n.map(t=>t.customerName).filter(t=>!!(t&&t.trim())))).sort(),ee=Array.from(new Set(n.map(t=>{if(t.saleMonth)return t.saleMonth;if(t.saleDate){const a=new Date(t.saleDate);return isNaN(a.getTime())?String(t.saleDate):a.toLocaleDateString()}return""}).filter(Boolean))).sort(),p=n.filter(t=>{if(y!=="ALL"){const a=t.saleDate?new Date(t.saleDate).toLocaleDateString():"",c=t.saleMonth||"";if(!a.includes(y)&&!c.includes(y)&&t.saleDate!==y)return!1}return!(w!=="ALL"&&t.customerName!==w||j!=="ALL"&&t.productType!==j)}),u=y!=="ALL"||w!=="ALL"||j!=="ALL"?{totalOrders:p.length,totalRevenue:p.reduce((t,a)=>t+(Number(a.finalSaleAmount)||0),0),totalPurchaseCost:p.reduce((t,a)=>t+(Number(a.finalPurchasePrice)||0),0),totalGrossProfit:p.reduce((t,a)=>t+(Number(a.grossProfit)||0),0),totalNetProfit:p.reduce((t,a)=>t+(Number(a.netProfit)||0),0),totalCommission:p.reduce((t,a)=>t+(Number(a.commissionAmount)||0),0),totalProfitAfterCommission:p.reduce((t,a)=>t+(Number(a.profitAfterCommission)||0),0)}:q,re=()=>{d.size===p.length&&p.length>0?v(new Set):v(new Set(p.map(t=>t.id)))},de=t=>{v(a=>{const c=new Set(a);return c.has(t)?c.delete(t):c.add(t),c})},ie=async(t,a)=>{var c,g;if(window.confirm(`⚠️ Are you sure you want to delete invoice ${a}?`))try{await R.deleteSale(t),v(i=>{const o=new Set(i);return o.delete(t),o}),await N()}catch(i){alert(((g=(c=i==null?void 0:i.response)==null?void 0:c.data)==null?void 0:g.message)||"Delete failed")}},pe=async()=>{var t,a;if(d.size!==0&&window.confirm(`⚠️ Are you sure you want to permanently delete the ${d.size} selected sales?`))try{await R.deleteSalesBatch(Array.from(d)),v(new Set),await N(),alert("✅ Selected sales deleted successfully.")}catch(c){alert(((a=(t=c==null?void 0:c.response)==null?void 0:t.data)==null?void 0:a.message)||"Delete batch failed")}},ue=async()=>{var t,a;if(window.confirm("⚠️ WARNING: Are you sure you want to permanently delete ALL sales records from the database? This action cannot be undone."))try{await R.deleteAllSales(),v(new Set),await N(),alert("✅ All sales have been deleted successfully from the database.")}catch(c){alert(((a=(t=c==null?void 0:c.response)==null?void 0:t.data)==null?void 0:a.message)||"Delete all failed")}},M=d.size===1?p.find(t=>d.has(t.id)):null,ne=()=>{if(!p||p.length===0)return;const t=["Invoice No","Sale Date","Customer Name","Country","Product Type","Description","Shape","Carat","Color","Clarity","Cut","Cert No","Supplier","Purchase Price","Selling Price","Discount","Final Sale Amount","Shipping Cost","GST %","GST Amount","Final Purchase Price","Gross Profit","Net Profit","Sales Person","Commission %","Commission Amount","Profit After Commission","Payment Status","Order Status","Tracking Number"],a=p.map(o=>[o.invoiceNo,o.saleDate?new Date(o.saleDate).toISOString().split("T")[0]:"",`"${o.customerName}"`,o.customerCountry||"",o.productType,`"${o.productDescription||""}"`,o.shape||"",o.caratWeight||"",o.diamondColor||"",o.clarity||"",o.cut||"",o.certificateNo||"",`"${o.supplierName||""}"`,o.purchasePrice,o.sellingPrice,o.discount,o.finalSaleAmount,o.shippingCost,o.gstPercent,o.gstAmount,o.finalPurchasePrice,o.grossProfit,o.netProfit,`"${o.salesPersonName||""}"`,o.commissionPercent,o.commissionAmount,o.profitAfterCommission,o.paymentStatus,o.orderStatus,o.trackingNumber||""]),c="data:text/csv;charset=utf-8,"+[t.join(","),...a.map(o=>o.join(","))].join(`
`),g=encodeURI(c),i=document.createElement("a");i.setAttribute("href",g),i.setAttribute("download",`sales_tracker_${new Date().toISOString().split("T")[0]}.csv`),document.body.appendChild(i),i.click(),document.body.removeChild(i)},xe=()=>{if(!p||p.length===0)return;const t=["Invoice No","Sale Date","Customer Name","Customer Country","Product Type","Product Description","Stone Type","Shape","Diamond Color","Clarity","Cut","Polish","Symmetry","Fluorescence","Measurement","Price per Carat","Carat / Weight","Quantity","Certificate","Certificate No","Supplier","Purchase Price","Selling Price","Discount","Final Sale Amount","Shipping Cost","GST %","GST Amount","Final Purchase Price","Payment Status","Payment Method","Amount Received","Pending Amount","Gross Profit","Net Profit","Sales Person","Commission %","Commission Amount","Profit After Commission","Profit % (Markup)","Final Profit %","Order Status","Tracking Number","Tracking Link","Dollar Rate","Sale Month"],a=p.map(i=>[i.invoiceNo,i.saleDate?new Date(i.saleDate).toISOString().split("T")[0]:"",i.customerName||"",i.customerCountry||"",i.productType||"",i.productDescription||"",i.stoneType||"",i.shape||"",i.diamondColor||"",i.clarity||"",i.cut||"",i.polish||"",i.symmetry||"",i.fluorescence||"",i.measurement||"",i.pricePerCarat??"",i.caratWeight??"",i.quantity??1,i.certificate||"",i.certificateNo||"",i.supplierName||"",i.purchasePrice??0,i.sellingPrice??0,i.discount??0,i.finalSaleAmount??0,i.shippingCost??0,i.gstPercent??0,i.gstAmount??0,i.finalPurchasePrice??0,i.paymentStatus||"",i.paymentMethod||"",i.amountReceived??0,i.pendingAmount??0,i.grossProfit??0,i.netProfit??0,i.salesPersonName||"",i.commissionPercent??0,i.commissionAmount??0,i.profitAfterCommission??0,i.markupPercent??0,i.finalProfitPercent??0,i.orderStatus||"",i.trackingNumber||"",i.trackingLink||"",i.dollarRate??94.55,i.saleMonth||""]),c=he.aoa_to_sheet([t,...a]),g=he.book_new();he.book_append_sheet(g,c,"Sales Ledger"),it(g,`sales_ledger_${new Date().toISOString().split("T")[0]}.xlsx`)},B=A||j!=="ALL"||D!=="ALL"||L!=="ALL"||y!=="ALL"||w!=="ALL",se=()=>{C(""),k("ALL"),z("ALL"),$("ALL"),F("ALL"),W("ALL"),h(1)};return e.jsxs(jt,{children:[e.jsxs(yt,{children:[e.jsxs("div",{className:"title-group",children:[e.jsxs("h1",{children:["Sales Management Tracker",e.jsxs("span",{className:"badge-tag",children:[e.jsx(Se,{size:11,color:"#0f172a"}),"46-Column Financial Ledger"]})]}),e.jsx("p",{children:"Authoritative financial tracking, sales performance, commissions & margins"})]}),e.jsxs("div",{className:"action-toolbar",children:[e.jsxs(S,{type:"button",$variant:"danger",onClick:ue,title:"Purge all sales data from database",children:[e.jsx(fe,{size:13})," Delete All Sales"]}),e.jsxs(Le,{to:`${V}/import`,title:"Import batch sales via Excel or CSV",children:[e.jsx(we,{size:14,color:"#2563eb"})," Import Excel / File"]}),e.jsxs(S,{type:"button",$variant:"success",onClick:xe,title:"Export ledger to Excel workbook",children:[e.jsx(Ce,{size:14,color:"#15803d"})," Export Excel (.xlsx)"]}),e.jsxs(S,{type:"button",onClick:ne,title:"Export CSV spreadsheet",children:[e.jsx(Ge,{size:14})," Export CSV"]}),e.jsxs(ze,{to:`${V}/sales/new`,title:"Create a new commercial invoice",children:[e.jsx(ke,{size:16})," New Sale Invoice"]})]})]}),e.jsx(vt,{children:I&&!u?Array.from({length:7}).map((t,a)=>e.jsx(St,{},a)):e.jsxs(e.Fragment,{children:[e.jsxs(H,{$theme:"default",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Total Orders"}),e.jsx("span",{className:"icon-wrap",children:e.jsx(Me,{size:14})})]}),e.jsx("div",{className:"val",children:(u==null?void 0:u.totalOrders)||0}),e.jsx("div",{className:"subtitle",children:"Processed deals"})]}),e.jsxs(H,{$theme:"revenue",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Total Revenue"}),e.jsx("span",{className:"icon-wrap",style:{background:"#f1f5f9"},children:e.jsx(Be,{size:14,color:"#0f172a"})})]}),e.jsxs("div",{className:"val",children:["$",m(u==null?void 0:u.totalRevenue)]}),e.jsx("div",{className:"subtitle",children:"Gross billed volume"})]}),e.jsxs(H,{$theme:"cost",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Purchase Costs"}),e.jsx("span",{className:"icon-wrap",children:e.jsx(_e,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",m(u==null?void 0:u.totalPurchaseCost)]}),e.jsx("div",{className:"subtitle",children:"Inventory & vendor COGS"})]}),e.jsxs(H,{$theme:"gross",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Gross Profit"}),e.jsx("span",{className:"icon-wrap",style:{background:"#f0f9ff",color:"#0284c7"},children:e.jsx(He,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",m(u==null?void 0:u.totalGrossProfit)]}),e.jsx("div",{className:"subtitle",children:"Revenue minus COGS"})]}),e.jsxs(H,{$theme:"net",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Net Profit"}),e.jsx("span",{className:"icon-wrap",style:{background:"#f0fdf4",color:"#16a34a"},children:e.jsx(Se,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",m(u==null?void 0:u.totalNetProfit)]}),e.jsx("div",{className:"subtitle",children:"Post-shipping & GST"})]}),e.jsxs(H,{$theme:"commission",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Commission Due"}),e.jsx("span",{className:"icon-wrap",style:{background:"#fffbeb",color:"#d97706"},children:e.jsx(Ue,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",m(u==null?void 0:u.totalCommission)]}),e.jsx("div",{className:"subtitle",children:"Staff commission liability"})]}),e.jsxs(H,{$theme:"retained",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Retained Profit"}),e.jsx("span",{className:"icon-wrap",style:{background:"#eff6ff",color:"#2563eb"},children:e.jsx(Ve,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",m(u==null?void 0:u.totalProfitAfterCommission)]}),e.jsx("div",{className:"subtitle",children:"Retained business equity"})]})]})}),e.jsxs(wt,{children:[e.jsxs("div",{className:"search-wrapper",children:[e.jsx(qe,{size:14,color:"#64748b"}),e.jsx("input",{type:"text",placeholder:"Search invoice, client, stone, certificate...",value:A,onChange:t=>{C(t.target.value),h(1)}}),A&&e.jsx("button",{className:"clear-btn",onClick:()=>C(""),title:"Clear search",children:e.jsx(me,{size:13})})]}),e.jsxs("select",{className:"filter-select",value:D,onChange:t=>{z(t.target.value),h(1)},children:[e.jsx("option",{value:"ALL",children:"All Payment Statuses"}),e.jsx("option",{value:"Paid",children:"Paid (Full)"}),e.jsx("option",{value:"Partial",children:"Partial Payment"}),e.jsx("option",{value:"Pending",children:"Pending / Unpaid"})]}),e.jsxs("select",{className:"filter-select",value:L,onChange:t=>{$(t.target.value),h(1)},children:[e.jsx("option",{value:"ALL",children:"All Order Statuses"}),e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"})]}),B&&e.jsxs(S,{type:"button",onClick:se,style:{padding:"6px 12px",fontSize:"0.78rem"},children:[e.jsx(Ne,{size:12})," Reset Filters"]}),e.jsx("div",{className:"results-pill",children:I?"Loading...":`Showing ${p.length} of ${n.length} sales`})]}),d.size>0&&e.jsxs(kt,{children:[e.jsxs("div",{children:["✨ ",e.jsx("strong",{children:d.size})," ",d.size===1?"sale selected":"sales selected",M&&e.jsxs("span",{children:[" (",M.invoiceNo," • ",M.customerName,")"]})]}),e.jsxs("div",{className:"actions",children:[d.size===1&&M&&e.jsxs(S,{type:"button",$variant:"primary",onClick:()=>G(M),style:{padding:"5px 12px",fontSize:"0.78rem"},title:"Edit full sale details",children:[e.jsx(Pe,{size:13})," Edit Sale (",M.invoiceNo,")"]}),d.size>1&&e.jsxs(S,{type:"button",$variant:"primary",onClick:()=>U(!0),style:{padding:"5px 14px",fontSize:"0.78rem"},title:"Bulk edit all selected invoices",children:[e.jsx(Re,{size:13})," Bulk Edit Selected (",d.size,")"]}),e.jsx(S,{type:"button",onClick:()=>v(new Set),style:{padding:"5px 10px",fontSize:"0.76rem"},children:"Deselect All"}),e.jsxs(S,{type:"button",$variant:"danger",onClick:pe,style:{padding:"5px 12px",fontSize:"0.76rem"},children:[e.jsx(fe,{size:12})," Delete Selected (",d.size,")"]})]})]}),Y&&e.jsxs("div",{style:{background:"#fff5f5",border:"1px solid #fecaca",borderRadius:8,padding:"12px 16px",color:"#b91c1c",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{children:["⚠️ ",Y]}),e.jsx(S,{type:"button",onClick:N,style:{padding:"4px 10px",fontSize:"0.76rem"},children:"Try Again"})]}),e.jsxs(Ct,{children:[e.jsxs("div",{className:"hint-text",children:[e.jsx(Je,{size:14,color:"#0f172a"}),e.jsx("span",{children:"46-Column Financial Ledger • Scroll horizontally or swipe on touch screens"})]}),e.jsxs("div",{className:"scroll-btn-group",children:[e.jsxs("button",{type:"button",className:"nav-btn",onClick:Z,title:"Scroll ledger left",children:[e.jsx(Ke,{size:12})," Scroll Left"]}),e.jsxs("button",{type:"button",className:"nav-btn",onClick:le,title:"Scroll ledger right",children:["Scroll Right ",e.jsx(Ye,{size:12})]})]})]}),e.jsx(Nt,{ref:X,children:e.jsxs(Pt,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"sticky-col-chk",children:e.jsxs($e,{$checked:p.length>0&&d.size===p.length,onClick:t=>{t.preventDefault(),re()},title:"Select / Deselect All Sales",children:[e.jsx("input",{type:"checkbox",checked:p.length>0&&d.size===p.length,readOnly:!0}),p.length>0&&d.size===p.length&&e.jsx(Ae,{size:11,strokeWidth:3})]})}),e.jsx("th",{className:"sticky-col-inv",children:"Invoice No"}),e.jsx("th",{style:{minWidth:130},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("span",{children:"Date"}),e.jsxs("select",{value:y,onChange:t=>F(t.target.value),style:{background:"#1e293b",color:"#ffffff",border:"1px solid #475569",borderRadius:4,fontSize:"0.72rem",padding:"2px 4px",outline:"none",cursor:"pointer",maxWidth:120},title:"Filter by Date / Month",children:[e.jsx("option",{value:"ALL",children:"All Dates"}),ee.map(t=>e.jsx("option",{value:t,children:t},t))]})]})}),e.jsx("th",{style:{minWidth:150},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("span",{children:"Customer"}),e.jsxs("select",{value:w,onChange:t=>W(t.target.value),style:{background:"#1e293b",color:"#ffffff",border:"1px solid #475569",borderRadius:4,fontSize:"0.72rem",padding:"2px 4px",outline:"none",cursor:"pointer",maxWidth:140},title:"Filter by Customer",children:[e.jsx("option",{value:"ALL",children:"All Clients"}),ce.map(t=>e.jsx("option",{value:t,children:t},t))]})]})}),e.jsx("th",{children:"Country"}),e.jsx("th",{style:{minWidth:120},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("span",{children:"Type"}),e.jsxs("select",{value:j,onChange:t=>k(t.target.value),style:{background:"#1e293b",color:"#ffffff",border:"1px solid #475569",borderRadius:4,fontSize:"0.72rem",padding:"2px 4px",outline:"none",cursor:"pointer",maxWidth:110},title:"Filter by Product Type",children:[e.jsx("option",{value:"ALL",children:"All Types"}),e.jsx("option",{value:"Diamond",children:"💎 Diamond"}),e.jsx("option",{value:"Jewelry",children:"✨ Jewelry"})]})]})}),e.jsx("th",{children:"Description / Shape"}),e.jsx("th",{children:"Carat / Weight"}),e.jsx("th",{children:"Color / Clarity"}),e.jsx("th",{children:"Cert #"}),e.jsx("th",{children:"Supplier"}),e.jsx("th",{children:"Selling Price"}),e.jsx("th",{children:"Final Sale"}),e.jsx("th",{children:"Purchase Price"}),e.jsx("th",{children:"GST"}),e.jsx("th",{children:"Final Purchase"}),e.jsx("th",{children:"Gross Profit"}),e.jsx("th",{children:"Net Profit"}),e.jsx("th",{children:"Sales Person"}),e.jsx("th",{children:"Comm %"}),e.jsx("th",{children:"Comm ($)"}),e.jsx("th",{children:"Retained Profit"}),e.jsx("th",{children:"Markup %"}),e.jsx("th",{children:"Payment"}),e.jsx("th",{children:"Order Status"}),e.jsx("th",{children:"Tracking"}),e.jsx("th",{children:"Dollar Rate"}),e.jsx("th",{style:{textAlign:"center",minWidth:120},children:"Actions"})]})}),e.jsxs("tbody",{children:[p.map(t=>{const a=d.has(t.id),c=t.productType==="Diamond";return e.jsxs("tr",{style:{background:a?"#f0fdf4":void 0},children:[e.jsx("td",{className:"sticky-col-chk",children:e.jsxs($e,{$checked:a,onClick:g=>{g.preventDefault(),de(t.id)},title:`Select invoice ${t.invoiceNo}`,children:[e.jsx("input",{type:"checkbox",checked:a,readOnly:!0}),a&&e.jsx(Ae,{size:11,strokeWidth:3})]})}),e.jsx("td",{className:"sticky-col-inv",children:e.jsxs(ae,{to:`${V}/sales/${t.id}`,style:{color:"#0d1319",textDecoration:"none",fontWeight:800,display:"inline-flex",alignItems:"center",gap:4},children:[t.invoiceNo," ",e.jsx(Qe,{size:11,color:"#64748b"})]})}),e.jsx("td",{children:t.saleDate?new Date(t.saleDate).toLocaleDateString():"-"}),e.jsx("td",{style:{fontWeight:600,color:"#0f172a"},children:t.customerName}),e.jsx("td",{children:t.customerCountry||"-"}),e.jsx("td",{children:e.jsx(ge,{$type:t.productType,children:t.productType==="Diamond"?"💎 Diamond":"✨ Jewelry"})}),e.jsx("td",{style:{maxWidth:220,overflow:"hidden",textOverflow:"ellipsis"},children:c?t.shape||t.productDescription||"-":t.productDescription||"-"}),e.jsx("td",{style:{fontWeight:600},children:c&&t.caratWeight?`${t.caratWeight} ct`:c?"-":`Qty: ${t.quantity||1}`}),e.jsx("td",{children:c&&t.diamondColor?`${t.diamondColor} / ${t.clarity||""}`:"-"}),e.jsx("td",{children:c&&t.certificateNo||"-"}),e.jsx("td",{children:t.supplierName||"None"}),e.jsxs("td",{children:["$",m(t.sellingPrice)]}),e.jsxs("td",{style:{fontWeight:800,color:"#0f172a"},children:["$",m(t.finalSaleAmount)]}),e.jsxs("td",{children:["$",m(t.purchasePrice)]}),e.jsxs("td",{children:["$",m(t.gstAmount)]}),e.jsxs("td",{children:["$",m(t.finalPurchasePrice)]}),e.jsxs("td",{children:["$",m(t.grossProfit)]}),e.jsxs("td",{style:{fontWeight:800,color:(Number(t.netProfit)||0)>=0?"#16a34a":"#dc2626"},children:["$",m(t.netProfit)]}),e.jsx("td",{children:t.salesPersonName||"-"}),e.jsxs("td",{children:[((Number(t.commissionPercent)||0)*100).toFixed(1),"%"]}),e.jsxs("td",{style:{color:"#d97706",fontWeight:600},children:["$",m(t.commissionAmount)]}),e.jsxs("td",{style:{fontWeight:800,color:"#2563eb"},children:["$",m(t.profitAfterCommission)]}),e.jsxs("td",{children:[((Number(t.markupPercent)||0)*100).toFixed(1),"%"]}),e.jsx("td",{children:e.jsx(ge,{$type:t.paymentStatus,children:t.paymentStatus})}),e.jsx("td",{children:e.jsx(ge,{$type:t.orderStatus,children:t.orderStatus})}),e.jsx("td",{children:t.trackingNumber?t.trackingLink?e.jsxs("a",{href:t.trackingLink,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:3,color:"#2563eb",textDecoration:"none"},children:[t.trackingNumber," ",e.jsx(Xe,{size:10})]}):t.trackingNumber:"-"}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("input",{type:"number",step:"0.01",defaultValue:t.dollarRate?Number(t.dollarRate).toFixed(2):"94.55",onBlur:async g=>{const i=Number(g.target.value);if(i&&i!==Number(t.dollarRate))try{await R.updateDollarRate(t.id,i)}catch(o){console.error("Failed to update dollar rate",o)}},onKeyDown:g=>{g.key==="Enter"&&g.target.blur()},style:{width:72,padding:"4px 6px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.78rem",background:"#ffffff",textAlign:"center",fontWeight:600,color:"#0f172a"}})}),e.jsx("td",{style:{textAlign:"center"},children:e.jsxs("div",{style:{display:"inline-flex",gap:6,alignItems:"center",justifyContent:"center"},children:[e.jsx(ae,{to:`${V}/sales/${t.id}`,title:"View Sale Detail",style:{textDecoration:"none"},children:e.jsx("button",{type:"button",style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:32,height:32,minWidth:32,background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,cursor:"pointer",transition:"all 0.15s ease",flexShrink:0},title:"View Invoice Detail",children:e.jsx(Ze,{size:15,color:"#ffffff"})})}),e.jsx("button",{type:"button",onClick:()=>G(t),style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:32,height:32,minWidth:32,background:"#eff6ff",color:"#1d4ed8",border:"1px solid #bfdbfe",borderRadius:6,cursor:"pointer",transition:"all 0.15s ease",flexShrink:0},title:"Edit Sale Invoice",children:e.jsx(Pe,{size:15,color:"#1d4ed8"})}),e.jsx("button",{type:"button",onClick:()=>ie(t.id,t.invoiceNo),style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:32,height:32,minWidth:32,background:"#fff1f2",color:"#e11d48",border:"1px solid #fecdd3",borderRadius:6,cursor:"pointer",transition:"all 0.15s ease",flexShrink:0},title:"Delete Sale Invoice",children:e.jsx(fe,{size:15,color:"#e11d48"})})]})})]},t.id)}),p.length===0&&!I&&e.jsx("tr",{children:e.jsx("td",{colSpan:28,style:{padding:0},children:e.jsxs(At,{children:[e.jsx("div",{className:"icon-circle",children:e.jsx(Ce,{size:28})}),e.jsx("h3",{children:"No sales records found"}),e.jsx("p",{children:B?"No transactions matched your current search and column filters. Try resetting the filters.":"Get started by creating your first commercial invoice or importing your existing spreadsheet ledger."}),e.jsx("div",{className:"cta-group",children:B?e.jsxs(S,{type:"button",onClick:se,children:[e.jsx(Ne,{size:13})," Reset Filters"]}):e.jsxs(e.Fragment,{children:[e.jsxs(ze,{to:`${V}/sales/new`,children:[e.jsx(ke,{size:15})," Create Invoice"]}),e.jsxs(Le,{to:`${V}/import`,children:[e.jsx(we,{size:15,color:"#2563eb"})," Import Excel / CSV"]})]})})]})})})]})]})}),b&&b.totalPages>1&&e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,marginTop:4,flexWrap:"wrap"},children:[e.jsxs("span",{style:{fontSize:"0.8rem",color:"#64748b"},children:["Showing page ",e.jsx("strong",{children:b.page})," of ",e.jsx("strong",{children:b.totalPages})," (",b.total," total transactions)"]}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsxs(S,{type:"button",onClick:()=>h(t=>Math.max(1,t-1)),disabled:b.page===1,style:{padding:"6px 12px"},children:[e.jsx(et,{size:14})," Previous"]}),e.jsxs(S,{type:"button",onClick:()=>h(t=>Math.min(b.totalPages,t+1)),disabled:b.page===b.totalPages,style:{padding:"6px 12px"},children:["Next ",e.jsx(tt,{size:14})]})]})]}),K&&e.jsx(dt,{sale:K,onClose:()=>G(null),onSuccess:()=>{G(null),N()}}),oe&&e.jsx(mt,{selectedIds:Array.from(d),onClose:()=>U(!1),onSuccess:()=>{U(!1),v(new Set),N()}})]})};export{Ft as BusinessSalesListPage};
