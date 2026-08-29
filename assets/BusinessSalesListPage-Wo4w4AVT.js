import{r as o,j as e,X as me,ak as Oe,ax as $e,ad as xe,b8 as Se,_ as Ce,ae as We,P as ke,bc as Ge,Z as Me,bd as Be,al as _e,h as He,aP as Ue,x as Ve,k as qe,b as Ne,af as we,be as Je,aq as Ke,A as Qe,c as Pe,f as se,aj as Xe,i as Ye,l as Ze,m as et}from"./react-vendor-Bcx5ivmQ.js";import{g as l,E as tt}from"./ui-vendor-CRtaqJ-f.js";import{u as he,w as rt}from"./admin-tools-vendor-CKN5doRT.js";import{P as V}from"./admin-pages-CQ7Nb2SE.js";import{b as R}from"./businessApi-tMJRYQyn.js";import"./swiper-vendor-B7SuwHD8.js";const nt=l.div`
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
`,ot=l.div`
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
`,at=l.div`
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
`,f=l.div`
  grid-column: ${({$full:i})=>i?"1 / -1":"auto"};
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
`,ct=({sale:i,onClose:P,onSuccess:q})=>{const[T,I]=o.useState([]),[E,A]=o.useState([]),[k,j]=o.useState(!1),[N,D]=o.useState(i.invoiceNo||""),[z,L]=o.useState(i.saleDate?new Date(i.saleDate).toISOString().split("T")[0]:""),[$,y]=o.useState(i.customerName||""),[F,C]=o.useState(i.customerCountry||""),[O,x]=o.useState(i.productType||"Diamond"),[h,b]=o.useState(i.productDescription||""),[W,d]=o.useState(i.shape||"Round"),[v,K]=o.useState(i.caratWeight||""),[G,ae]=o.useState(i.diamondColor||"F"),[U,Q]=o.useState(i.clarity||"VS1"),[X,Y]=o.useState(i.cut||"3EX"),[Z,le]=o.useState(i.certificateNo||""),[w,ce]=o.useState(i.supplierName||""),[ee,p]=o.useState(i.purchasePrice||0),[te,u]=o.useState(i.sellingPrice||0),[re,de]=o.useState(i.discount||0),[ne,pe]=o.useState(i.gstPercent??.015),[ue,M]=o.useState(i.shippingCost||0),[ie,fe]=o.useState(i.dollarRate||94.55),[B,oe]=o.useState(i.employeeId||""),[t,s]=o.useState(i.commissionPercent??.05),[c,g]=o.useState(i.paymentStatus||"Paid"),[n,a]=o.useState(i.paymentMethod||"Bank Wire"),[Re,At]=o.useState(i.amountReceived||""),[be,Te]=o.useState(i.orderStatus||"Delivered"),[je,Ee]=o.useState(i.trackingNumber||"");o.useEffect(()=>{R.getEmployees({status:"ACTIVE"}).then(r=>{I(Array.isArray(r)?r:(r==null?void 0:r.employees)||[])}),R.getSuppliers().then(r=>{A(Array.isArray(r)?r:(r==null?void 0:r.suppliers)||[])})},[]);const Fe=async r=>{var ye,ve;r.preventDefault(),j(!0);try{const _=T.find(Ie=>Ie.id===B);await R.updateSale(i.id,{invoiceNo:N,saleDate:z,customerName:$,customerCountry:F,productType:O,productDescription:h,shape:W,caratWeight:v?Number(v):void 0,diamondColor:G,clarity:U,cut:X,certificateNo:Z,supplierName:w,purchasePrice:Number(ee)||0,sellingPrice:Number(te)||0,discount:Number(re)||0,gstPercent:Number(ne)||0,shippingCost:Number(ue)||0,dollarRate:Number(ie)||94.55,employeeId:B||void 0,salesPersonName:(_==null?void 0:_.fullName)||i.salesPersonName||void 0,commissionPercent:Number(t)||0,paymentStatus:c,paymentMethod:n,amountReceived:Number(Re)||Number(te)||0,orderStatus:be,trackingNumber:je}),alert(`✅ Invoice ${N} updated successfully!`),q()}catch(_){alert(((ve=(ye=_==null?void 0:_.response)==null?void 0:ye.data)==null?void 0:ve.message)||"Failed to update sale")}finally{j(!1)}};return e.jsx(nt,{onClick:P,children:e.jsxs(it,{onClick:r=>r.stopPropagation(),children:[e.jsxs(ot,{children:[e.jsxs("div",{children:[e.jsxs("h2",{style:{fontSize:"1.15rem",fontWeight:800,color:"#0f172a",margin:0},children:["Edit Sale Invoice — ",i.invoiceNo]}),e.jsx("p",{style:{fontSize:"0.75rem",color:"#64748b",margin:"2px 0 0 0"},children:"Modify commercial details, client information, pricing ledger, and exchange rates"})]}),e.jsx("button",{onClick:P,style:{background:"none",border:"none",cursor:"pointer",color:"#64748b"},children:e.jsx(me,{size:20})})]}),e.jsxs("form",{onSubmit:Fe,style:{display:"flex",flexDirection:"column",flex:1,overflow:"hidden"},children:[e.jsx(st,{children:e.jsxs(lt,{children:[e.jsxs(f,{children:[e.jsx("label",{children:"Invoice Number *"}),e.jsx("input",{type:"text",value:N,onChange:r=>D(r.target.value),required:!0})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Sale Date *"}),e.jsx("input",{type:"date",value:z,onChange:r=>L(r.target.value),required:!0})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Customer Name *"}),e.jsx("input",{type:"text",value:$,onChange:r=>y(r.target.value),required:!0})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Customer Country"}),e.jsx("input",{type:"text",value:F,onChange:r=>C(r.target.value)})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Product Type"}),e.jsxs("select",{value:O,onChange:r=>x(r.target.value),children:[e.jsx("option",{value:"Diamond",children:"Diamond"}),e.jsx("option",{value:"Jewelry",children:"Jewelry"})]})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Shape / Model"}),e.jsx("input",{type:"text",value:W,onChange:r=>d(r.target.value)})]}),e.jsxs(f,{$full:!0,children:[e.jsx("label",{children:"Product Description / Diamond Specs"}),e.jsx("input",{type:"text",value:h,onChange:r=>b(r.target.value)})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Carat Weight (ct)"}),e.jsx("input",{type:"number",step:"0.01",value:v,onChange:r=>K(r.target.value)})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Color / Clarity"}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("input",{type:"text",placeholder:"Color",value:G,onChange:r=>ae(r.target.value)}),e.jsx("input",{type:"text",placeholder:"Clarity",value:U,onChange:r=>Q(r.target.value)})]})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Certificate No"}),e.jsx("input",{type:"text",value:Z,onChange:r=>le(r.target.value)})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Supplier / Vendor"}),e.jsx("input",{type:"text",value:w,onChange:r=>ce(r.target.value),list:"edit-supp-list"}),e.jsx("datalist",{id:"edit-supp-list",children:E.map(r=>e.jsx("option",{value:r.name},r.id))})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Purchase Price ($)"}),e.jsx("input",{type:"number",step:"0.01",value:ee,onChange:r=>p(Number(r.target.value)),required:!0})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Selling Price ($)"}),e.jsx("input",{type:"number",step:"0.01",value:te,onChange:r=>u(Number(r.target.value)),required:!0})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Discount ($)"}),e.jsx("input",{type:"number",step:"0.01",value:re,onChange:r=>de(Number(r.target.value))})]}),e.jsxs(f,{children:[e.jsx("label",{children:"GST % (e.g. 0.015 for 1.5%)"}),e.jsx("input",{type:"number",step:"0.001",value:ne,onChange:r=>pe(Number(r.target.value))})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Dollar Rate ($ / ₹)"}),e.jsx("input",{type:"number",step:"0.01",value:ie,onChange:r=>fe(Number(r.target.value)),required:!0})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Sales Person"}),e.jsxs("select",{value:B,onChange:r=>oe(r.target.value),children:[e.jsx("option",{value:"",children:"Unassigned"}),T.map(r=>e.jsxs("option",{value:r.id,children:[r.fullName||r.name," (",r.employeeCode,")"]},r.id))]})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Commission Rate (e.g. 0.05 for 5%)"}),e.jsx("input",{type:"number",step:"0.005",value:t,onChange:r=>s(Number(r.target.value))})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Payment Status"}),e.jsxs("select",{value:c,onChange:r=>g(r.target.value),children:[e.jsx("option",{value:"Paid",children:"Paid"}),e.jsx("option",{value:"Partial",children:"Partial"}),e.jsx("option",{value:"Pending",children:"Pending"}),e.jsx("option",{value:"Unpaid",children:"Unpaid"})]})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Order Status"}),e.jsxs("select",{value:be,onChange:r=>Te(r.target.value),children:[e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"}),e.jsx("option",{value:"Cancelled",children:"Cancelled"})]})]}),e.jsxs(f,{children:[e.jsx("label",{children:"Tracking Number"}),e.jsx("input",{type:"text",value:je,onChange:r=>Ee(r.target.value)})]})]})}),e.jsxs(at,{children:[e.jsx("button",{type:"button",onClick:P,style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#ffffff",borderRadius:6,fontSize:"0.82rem",fontWeight:600,cursor:"pointer"},children:"Cancel"}),e.jsxs("button",{type:"submit",disabled:k,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 20px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontSize:"0.82rem",fontWeight:700,cursor:"pointer"},children:[e.jsx(Oe,{size:14})," ",k?"Saving Changes...":"Save Invoice"]})]})]})]})})},dt=l.div`
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
`,ft=l.button`
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
`,xt=l.div`
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
`,Ae=l.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;

  ${({$variant:i})=>i==="primary"?`
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
`,gt=({selectedIds:i,onClose:P,onSuccess:q})=>{const[T,I]=o.useState("NO_CHANGE"),[E,A]=o.useState("NO_CHANGE"),[k,j]=o.useState("NO_CHANGE"),[N,D]=o.useState(""),[z,L]=o.useState("NO_CHANGE"),[$,y]=o.useState(!1),[F,C]=o.useState(null),O=async x=>{var b,W;x.preventDefault(),C(null);const h={};if(T!=="NO_CHANGE"&&(h.paymentStatus=T),E!=="NO_CHANGE"&&(h.orderStatus=E),k!=="NO_CHANGE"&&(h.salesPersonName=k),z!=="NO_CHANGE"&&(h.paymentMethod=z),N.trim()!==""){const d=Number(N);!isNaN(d)&&d>0&&(h.dollarRate=d)}if(Object.keys(h).length===0){C("Please choose at least one field to update.");return}y(!0);try{await R.bulkUpdateSales(i,h),alert(`✅ Successfully bulk updated ${i.length} sales records in the database.`),q()}catch(d){console.error(d),C(((W=(b=d==null?void 0:d.response)==null?void 0:b.data)==null?void 0:W.message)||"Bulk update failed. Please try again.")}finally{y(!1)}};return e.jsx(dt,{onClick:P,children:e.jsxs(pt,{onClick:x=>x.stopPropagation(),children:[e.jsxs(ut,{children:[e.jsxs("h2",{children:[e.jsx($e,{size:17})," Bulk Edit Sales (",i.length," records)"]}),e.jsx(ft,{onClick:P,children:e.jsx(me,{size:18})})]}),e.jsxs("form",{onSubmit:O,children:[e.jsxs(xt,{children:[e.jsxs("div",{style:{background:"#f0fdf4",border:"1px solid #bbf7d0",padding:"10px 14px",borderRadius:8,fontSize:"0.78rem",color:"#166534"},children:["💡 Changes will be applied to all ",e.jsx("strong",{children:i.length}),` selected invoices simultaneously. Leave any field as "Do Not Change" to keep each invoice's current value.`]}),F&&e.jsxs("div",{style:{background:"#fff5f5",border:"1px solid #fecaca",padding:"10px 14px",borderRadius:8,fontSize:"0.78rem",color:"#b91c1c"},children:["⚠️ ",F]}),e.jsxs(J,{children:[e.jsx("label",{children:"Payment Status"}),e.jsxs("select",{value:T,onChange:x=>I(x.target.value),children:[e.jsx("option",{value:"NO_CHANGE",children:"-- Do Not Change --"}),e.jsx("option",{value:"Paid",children:"Paid (Full)"}),e.jsx("option",{value:"Partial",children:"Partial Payment"}),e.jsx("option",{value:"Pending",children:"Pending / Unpaid"})]})]}),e.jsxs(J,{children:[e.jsx("label",{children:"Order / Delivery Status"}),e.jsxs("select",{value:E,onChange:x=>A(x.target.value),children:[e.jsx("option",{value:"NO_CHANGE",children:"-- Do Not Change --"}),e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"}),e.jsx("option",{value:"Cancelled",children:"Cancelled"})]})]}),e.jsxs(J,{children:[e.jsx("label",{children:"Assigned Sales Representative"}),e.jsxs("select",{value:k,onChange:x=>j(x.target.value),children:[e.jsx("option",{value:"NO_CHANGE",children:"-- Do Not Change --"}),e.jsx("option",{value:"Rutu",children:"Rutu (Sales Manager)"}),e.jsx("option",{value:"Jyoti",children:"Jyoti (Sales Executive)"}),e.jsx("option",{value:"Twinkle",children:"Twinkle (Sales Executive)"}),e.jsx("option",{value:"Veer",children:"Veer (Director)"})]})]}),e.jsxs(J,{children:[e.jsx("label",{children:"Payment Method"}),e.jsxs("select",{value:z,onChange:x=>L(x.target.value),children:[e.jsx("option",{value:"NO_CHANGE",children:"-- Do Not Change --"}),e.jsx("option",{value:"Bank Wire",children:"Bank Wire / Transfer"}),e.jsx("option",{value:"Credit Card",children:"Credit Card / Stripe"}),e.jsx("option",{value:"Cash",children:"Cash"}),e.jsx("option",{value:"Cheque",children:"Cheque"})]})]}),e.jsxs(J,{children:[e.jsx("label",{children:"Dollar Rate ($ / ₹)"}),e.jsx("input",{type:"number",step:"0.01",placeholder:"Leave blank to keep existing rates",value:N,onChange:x=>D(x.target.value)}),e.jsx("span",{className:"hint",children:"Example: 94.55"})]})]}),e.jsxs(ht,{children:[e.jsx(Ae,{type:"button",$variant:"secondary",onClick:P,disabled:$,children:"Cancel"}),e.jsx(Ae,{type:"submit",$variant:"primary",disabled:$,children:$?"Updating...":`Apply Bulk Changes (${i.length})`})]})]})]})})},mt=tt`
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
`,De=l(se)`
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

  ${({$variant:i})=>{switch(i){case"danger":return`
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
`,ze=l(se)`
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
`,H=l.div`
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
    color: ${({$highlight:i})=>i==="profit"?"#16a34a":i==="warning"?"#d97706":i==="retained"?"#2563eb":"#0f172a"};
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
`,Ct=l.div`
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
`,kt=l.div`
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
`,Le=l.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  border-radius: 4px;
  border: 1.5px solid ${({$checked:i})=>i?"#0d1319":"#cbd5e1"};
  background: ${({$checked:i})=>i?"#0d1319":"#ffffff"};
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
`,ge=l.span`
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 4px;
  display: inline-block;
  letter-spacing: 0.02em;

  ${({$type:i})=>{switch(i){case"Paid":return"background: #ebfbee; color: #2b8a3e; border: 1px solid #b2f2bb;";case"Partial":return"background: #fff9db; color: #f59f00; border: 1px solid #ffe066;";case"Pending":case"Unpaid":return"background: #fff5f5; color: #e03131; border: 1px solid #ffc9c9;";case"Delivered":return"background: #e7f5ff; color: #1c7ed6; border: 1px solid #a5d8ff;";case"Shipped":return"background: #f3f0ff; color: #7950f2; border: 1px solid #d0bfff;";case"Processing":return"background: #fff4e6; color: #d9480f; border: 1px solid #ffd8a8;";case"Diamond":return"background: #fff3bf; color: #b45309; border: 1px solid #fde68a;";case"Jewelry":return"background: #ede9fe; color: #6d28d9; border: 1px solid #ddd6fe;";default:return"background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0;"}}}
`;l.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 9px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1.5px solid transparent;

  ${({$variant:i})=>{switch(i){case"view":return`
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
`;const Pt=l.div`
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
`,m=i=>(Number(i)||0).toLocaleString(),Et=()=>{const[i,P]=o.useState([]),[q,T]=o.useState(null),[I,E]=o.useState(!0),[A,k]=o.useState(""),[j,N]=o.useState("ALL"),[D,z]=o.useState("ALL"),[L,$]=o.useState("ALL"),[y,F]=o.useState("ALL"),[C,O]=o.useState("ALL"),[x,h]=o.useState(1),[b,W]=o.useState(null),[d,v]=o.useState(new Set),[K,G]=o.useState(null),[ae,U]=o.useState(!1),[Q,X]=o.useState(null),Y=o.useRef(null),Z=()=>{var t;(t=Y.current)==null||t.scrollBy({left:-450,behavior:"smooth"})},le=()=>{var t;(t=Y.current)==null||t.scrollBy({left:450,behavior:"smooth"})},w=async()=>{E(!0),X(null);try{const t=await R.getSales({search:A||void 0,productType:j!=="ALL"?j:void 0,paymentStatus:D!=="ALL"?D:void 0,orderStatus:L!=="ALL"?L:void 0,page:x,limit:100});P(t.sales||[]),T(t.summary),W(t.pagination)}catch(t){console.error(t),X("Unable to load sales data. Please check your connection and retry.")}finally{E(!1)}};o.useEffect(()=>{w()},[A,j,D,L,x]);const ce=Array.from(new Set(i.map(t=>t.customerName).filter(t=>!!(t&&t.trim())))).sort(),ee=Array.from(new Set(i.map(t=>{if(t.saleMonth)return t.saleMonth;if(t.saleDate){const s=new Date(t.saleDate);return isNaN(s.getTime())?String(t.saleDate):s.toLocaleDateString()}return""}).filter(Boolean))).sort(),p=i.filter(t=>{if(y!=="ALL"){const s=t.saleDate?new Date(t.saleDate).toLocaleDateString():"",c=t.saleMonth||"";if(!s.includes(y)&&!c.includes(y)&&t.saleDate!==y)return!1}return!(C!=="ALL"&&t.customerName!==C||j!=="ALL"&&t.productType!==j)}),u=y!=="ALL"||C!=="ALL"||j!=="ALL"?{totalOrders:p.length,totalRevenue:p.reduce((t,s)=>t+(Number(s.finalSaleAmount)||0),0),totalPurchaseCost:p.reduce((t,s)=>t+(Number(s.finalPurchasePrice)||0),0),totalGrossProfit:p.reduce((t,s)=>t+(Number(s.grossProfit)||0),0),totalNetProfit:p.reduce((t,s)=>t+(Number(s.netProfit)||0),0),totalCommission:p.reduce((t,s)=>t+(Number(s.commissionAmount)||0),0),totalProfitAfterCommission:p.reduce((t,s)=>t+(Number(s.profitAfterCommission)||0),0)}:q,re=()=>{d.size===p.length&&p.length>0?v(new Set):v(new Set(p.map(t=>t.id)))},de=t=>{v(s=>{const c=new Set(s);return c.has(t)?c.delete(t):c.add(t),c})},ne=async(t,s)=>{var c,g;if(window.confirm(`⚠️ Are you sure you want to delete invoice ${s}?`))try{await R.deleteSale(t),v(n=>{const a=new Set(n);return a.delete(t),a}),await w()}catch(n){alert(((g=(c=n==null?void 0:n.response)==null?void 0:c.data)==null?void 0:g.message)||"Delete failed")}},pe=async()=>{var t,s;if(d.size!==0&&window.confirm(`⚠️ Are you sure you want to permanently delete the ${d.size} selected sales?`))try{await R.deleteSalesBatch(Array.from(d)),v(new Set),await w(),alert("✅ Selected sales deleted successfully.")}catch(c){alert(((s=(t=c==null?void 0:c.response)==null?void 0:t.data)==null?void 0:s.message)||"Delete batch failed")}},ue=async()=>{var t,s;if(window.confirm("⚠️ WARNING: Are you sure you want to permanently delete ALL sales records from the database? This action cannot be undone."))try{await R.deleteAllSales(),v(new Set),await w(),alert("✅ All sales have been deleted successfully from the database.")}catch(c){alert(((s=(t=c==null?void 0:c.response)==null?void 0:t.data)==null?void 0:s.message)||"Delete all failed")}},M=d.size===1?p.find(t=>d.has(t.id)):null,ie=()=>{if(!p||p.length===0)return;const t=["Invoice No","Sale Date","Customer Name","Country","Product Type","Description","Shape","Carat","Color","Clarity","Cut","Cert No","Supplier","Purchase Price","Selling Price","Discount","Final Sale Amount","Shipping Cost","GST %","GST Amount","Final Purchase Price","Gross Profit","Net Profit","Sales Person","Commission %","Commission Amount","Profit After Commission","Payment Status","Order Status","Tracking Number"],s=p.map(a=>[a.invoiceNo,a.saleDate?new Date(a.saleDate).toISOString().split("T")[0]:"",`"${a.customerName}"`,a.customerCountry||"",a.productType,`"${a.productDescription||""}"`,a.shape||"",a.caratWeight||"",a.diamondColor||"",a.clarity||"",a.cut||"",a.certificateNo||"",`"${a.supplierName||""}"`,a.purchasePrice,a.sellingPrice,a.discount,a.finalSaleAmount,a.shippingCost,a.gstPercent,a.gstAmount,a.finalPurchasePrice,a.grossProfit,a.netProfit,`"${a.salesPersonName||""}"`,a.commissionPercent,a.commissionAmount,a.profitAfterCommission,a.paymentStatus,a.orderStatus,a.trackingNumber||""]),c="data:text/csv;charset=utf-8,"+[t.join(","),...s.map(a=>a.join(","))].join(`
`),g=encodeURI(c),n=document.createElement("a");n.setAttribute("href",g),n.setAttribute("download",`sales_tracker_${new Date().toISOString().split("T")[0]}.csv`),document.body.appendChild(n),n.click(),document.body.removeChild(n)},fe=()=>{if(!p||p.length===0)return;const t=["Invoice No","Sale Date","Customer Name","Customer Country","Product Type","Product Description","Stone Type","Shape","Diamond Color","Clarity","Cut","Polish","Symmetry","Fluorescence","Measurement","Price per Carat","Carat / Weight","Quantity","Certificate","Certificate No","Supplier","Purchase Price","Selling Price","Discount","Final Sale Amount","Shipping Cost","GST %","GST Amount","Final Purchase Price","Payment Status","Payment Method","Amount Received","Pending Amount","Gross Profit","Net Profit","Sales Person","Commission %","Commission Amount","Profit After Commission","Profit % (Markup)","Final Profit %","Order Status","Tracking Number","Tracking Link","Dollar Rate","Sale Month"],s=p.map(n=>[n.invoiceNo,n.saleDate?new Date(n.saleDate).toISOString().split("T")[0]:"",n.customerName||"",n.customerCountry||"",n.productType||"",n.productDescription||"",n.stoneType||"",n.shape||"",n.diamondColor||"",n.clarity||"",n.cut||"",n.polish||"",n.symmetry||"",n.fluorescence||"",n.measurement||"",n.pricePerCarat??"",n.caratWeight??"",n.quantity??1,n.certificate||"",n.certificateNo||"",n.supplierName||"",n.purchasePrice??0,n.sellingPrice??0,n.discount??0,n.finalSaleAmount??0,n.shippingCost??0,n.gstPercent??0,n.gstAmount??0,n.finalPurchasePrice??0,n.paymentStatus||"",n.paymentMethod||"",n.amountReceived??0,n.pendingAmount??0,n.grossProfit??0,n.netProfit??0,n.salesPersonName||"",n.commissionPercent??0,n.commissionAmount??0,n.profitAfterCommission??0,n.markupPercent??0,n.finalProfitPercent??0,n.orderStatus||"",n.trackingNumber||"",n.trackingLink||"",n.dollarRate??94.55,n.saleMonth||""]),c=he.aoa_to_sheet([t,...s]),g=he.book_new();he.book_append_sheet(g,c,"Sales Ledger"),rt(g,`sales_ledger_${new Date().toISOString().split("T")[0]}.xlsx`)},B=A||j!=="ALL"||D!=="ALL"||L!=="ALL"||y!=="ALL"||C!=="ALL",oe=()=>{k(""),N("ALL"),z("ALL"),$("ALL"),F("ALL"),O("ALL"),h(1)};return e.jsxs(bt,{children:[e.jsxs(jt,{children:[e.jsxs("div",{className:"title-group",children:[e.jsxs("h1",{children:["Sales Management Tracker",e.jsx("span",{className:"badge-tag",children:"46-Column Ledger"})]}),e.jsx("p",{children:"Authoritative financial tracking, sales performance, commissions & margins"})]}),e.jsxs("div",{className:"action-toolbar",children:[e.jsxs(S,{type:"button",$variant:"danger",onClick:ue,title:"Purge all sales data from database",children:[e.jsx(xe,{size:13})," Delete All Sales"]}),e.jsxs(ze,{to:`${V}/import`,title:"Import batch sales via Excel or CSV",children:[e.jsx(Se,{size:14,color:"#2563eb"})," Import Excel / File"]}),e.jsxs(S,{type:"button",$variant:"success",onClick:fe,title:"Export ledger to Excel workbook",children:[e.jsx(Ce,{size:14,color:"#15803d"})," Export Excel (.xlsx)"]}),e.jsxs(S,{type:"button",onClick:ie,title:"Export CSV spreadsheet",children:[e.jsx(We,{size:14})," Export CSV"]}),e.jsxs(De,{to:`${V}/sales/new`,title:"Create a new commercial invoice",children:[e.jsx(ke,{size:16})," New Sale Invoice"]})]})]}),e.jsx(yt,{children:I&&!u?Array.from({length:7}).map((t,s)=>e.jsx(vt,{},s)):e.jsxs(e.Fragment,{children:[e.jsxs(H,{children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Total Orders"}),e.jsx("span",{className:"icon-wrap",children:e.jsx(Ge,{size:14})})]}),e.jsx("div",{className:"val",children:(u==null?void 0:u.totalOrders)||0}),e.jsx("div",{className:"subtitle",children:"Processed deals"})]}),e.jsxs(H,{$highlight:"revenue",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Total Revenue"}),e.jsx("span",{className:"icon-wrap",children:e.jsx(Me,{size:14,color:"#0f172a"})})]}),e.jsxs("div",{className:"val",children:["$",m(u==null?void 0:u.totalRevenue)]}),e.jsx("div",{className:"subtitle",children:"Gross billed volume"})]}),e.jsxs(H,{children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Purchase Costs"}),e.jsx("span",{className:"icon-wrap",children:e.jsx(Be,{size:14})})]}),e.jsxs("div",{className:"val",style:{color:"#475569"},children:["$",m(u==null?void 0:u.totalPurchaseCost)]}),e.jsx("div",{className:"subtitle",children:"Inventory & vendor COGS"})]}),e.jsxs(H,{children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Gross Profit"}),e.jsx("span",{className:"icon-wrap",children:e.jsx(_e,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",m(u==null?void 0:u.totalGrossProfit)]}),e.jsx("div",{className:"subtitle",children:"Revenue minus COGS"})]}),e.jsxs(H,{$highlight:"profit",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Net Profit"}),e.jsx("span",{className:"icon-wrap",style:{background:"#f0fdf4",color:"#16a34a"},children:e.jsx(He,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",m(u==null?void 0:u.totalNetProfit)]}),e.jsx("div",{className:"subtitle",children:"Post-shipping & GST"})]}),e.jsxs(H,{$highlight:"warning",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Commission Due"}),e.jsx("span",{className:"icon-wrap",style:{background:"#fffbeb",color:"#d97706"},children:e.jsx(Ue,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",m(u==null?void 0:u.totalCommission)]}),e.jsx("div",{className:"subtitle",children:"Staff commission liability"})]}),e.jsxs(H,{$highlight:"retained",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Retained Profit"}),e.jsx("span",{className:"icon-wrap",style:{background:"#eff6ff",color:"#2563eb"},children:e.jsx(Ve,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",m(u==null?void 0:u.totalProfitAfterCommission)]}),e.jsx("div",{className:"subtitle",children:"Retained business equity"})]})]})}),e.jsxs(St,{children:[e.jsxs("div",{className:"search-wrapper",children:[e.jsx(qe,{size:14,color:"#64748b"}),e.jsx("input",{type:"text",placeholder:"Search invoice, client, stone, certificate...",value:A,onChange:t=>{k(t.target.value),h(1)}}),A&&e.jsx("button",{className:"clear-btn",onClick:()=>k(""),title:"Clear search",children:e.jsx(me,{size:13})})]}),e.jsxs("select",{className:"filter-select",value:D,onChange:t=>{z(t.target.value),h(1)},children:[e.jsx("option",{value:"ALL",children:"All Payment Statuses"}),e.jsx("option",{value:"Paid",children:"Paid (Full)"}),e.jsx("option",{value:"Partial",children:"Partial Payment"}),e.jsx("option",{value:"Pending",children:"Pending / Unpaid"})]}),e.jsxs("select",{className:"filter-select",value:L,onChange:t=>{$(t.target.value),h(1)},children:[e.jsx("option",{value:"ALL",children:"All Order Statuses"}),e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"})]}),B&&e.jsxs(S,{type:"button",onClick:oe,style:{padding:"6px 12px",fontSize:"0.78rem"},children:[e.jsx(Ne,{size:12})," Reset Filters"]}),e.jsx("div",{className:"results-pill",children:I?"Loading...":`Showing ${p.length} of ${i.length} sales`})]}),d.size>0&&e.jsxs(kt,{children:[e.jsxs("div",{children:["✨ ",e.jsx("strong",{children:d.size})," ",d.size===1?"sale selected":"sales selected",M&&e.jsxs("span",{children:[" (",M.invoiceNo," • ",M.customerName,")"]})]}),e.jsxs("div",{className:"actions",children:[d.size===1&&M&&e.jsxs(S,{type:"button",$variant:"primary",onClick:()=>G(M),style:{padding:"5px 12px",fontSize:"0.78rem"},title:"Edit full sale details",children:[e.jsx(we,{size:13})," Edit Sale (",M.invoiceNo,")"]}),d.size>1&&e.jsxs(S,{type:"button",$variant:"primary",onClick:()=>U(!0),style:{padding:"5px 14px",fontSize:"0.78rem"},title:"Bulk edit all selected invoices",children:[e.jsx($e,{size:13})," Bulk Edit Selected (",d.size,")"]}),e.jsx(S,{type:"button",onClick:()=>v(new Set),style:{padding:"5px 10px",fontSize:"0.76rem"},children:"Deselect All"}),e.jsxs(S,{type:"button",$variant:"danger",onClick:pe,style:{padding:"5px 12px",fontSize:"0.76rem"},children:[e.jsx(xe,{size:12})," Delete Selected (",d.size,")"]})]})]}),Q&&e.jsxs("div",{style:{background:"#fff5f5",border:"1px solid #fecaca",borderRadius:8,padding:"12px 16px",color:"#b91c1c",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{children:["⚠️ ",Q]}),e.jsx(S,{type:"button",onClick:w,style:{padding:"4px 10px",fontSize:"0.76rem"},children:"Try Again"})]}),e.jsxs(Ct,{children:[e.jsxs("div",{className:"hint-text",children:[e.jsx(Je,{size:14,color:"#0f172a"}),e.jsx("span",{children:"46-Column Financial Ledger • Scroll horizontally or swipe on touch screens"})]}),e.jsxs("div",{className:"scroll-btn-group",children:[e.jsxs("button",{type:"button",className:"nav-btn",onClick:Z,title:"Scroll ledger left",children:[e.jsx(Ke,{size:12})," Scroll Left"]}),e.jsxs("button",{type:"button",className:"nav-btn",onClick:le,title:"Scroll ledger right",children:["Scroll Right ",e.jsx(Qe,{size:12})]})]})]}),e.jsx(Nt,{ref:Y,children:e.jsxs(wt,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"sticky-col-chk",children:e.jsxs(Le,{$checked:p.length>0&&d.size===p.length,onClick:t=>{t.preventDefault(),re()},title:"Select / Deselect All Sales",children:[e.jsx("input",{type:"checkbox",checked:p.length>0&&d.size===p.length,readOnly:!0}),p.length>0&&d.size===p.length&&e.jsx(Pe,{size:11,strokeWidth:3})]})}),e.jsx("th",{className:"sticky-col-inv",children:"Invoice No"}),e.jsx("th",{style:{minWidth:130},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("span",{children:"Date"}),e.jsxs("select",{value:y,onChange:t=>F(t.target.value),style:{background:"#1e293b",color:"#ffffff",border:"1px solid #475569",borderRadius:4,fontSize:"0.72rem",padding:"2px 4px",outline:"none",cursor:"pointer",maxWidth:120},title:"Filter by Date / Month",children:[e.jsx("option",{value:"ALL",children:"All Dates"}),ee.map(t=>e.jsx("option",{value:t,children:t},t))]})]})}),e.jsx("th",{style:{minWidth:150},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("span",{children:"Customer"}),e.jsxs("select",{value:C,onChange:t=>O(t.target.value),style:{background:"#1e293b",color:"#ffffff",border:"1px solid #475569",borderRadius:4,fontSize:"0.72rem",padding:"2px 4px",outline:"none",cursor:"pointer",maxWidth:140},title:"Filter by Customer",children:[e.jsx("option",{value:"ALL",children:"All Clients"}),ce.map(t=>e.jsx("option",{value:t,children:t},t))]})]})}),e.jsx("th",{children:"Country"}),e.jsx("th",{style:{minWidth:120},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("span",{children:"Type"}),e.jsxs("select",{value:j,onChange:t=>N(t.target.value),style:{background:"#1e293b",color:"#ffffff",border:"1px solid #475569",borderRadius:4,fontSize:"0.72rem",padding:"2px 4px",outline:"none",cursor:"pointer",maxWidth:110},title:"Filter by Product Type",children:[e.jsx("option",{value:"ALL",children:"All Types"}),e.jsx("option",{value:"Diamond",children:"💎 Diamond"}),e.jsx("option",{value:"Jewelry",children:"✨ Jewelry"})]})]})}),e.jsx("th",{children:"Description / Shape"}),e.jsx("th",{children:"Carat"}),e.jsx("th",{children:"Color/Clarity"}),e.jsx("th",{children:"Cert #"}),e.jsx("th",{children:"Supplier"}),e.jsx("th",{children:"Selling Price"}),e.jsx("th",{children:"Final Sale"}),e.jsx("th",{children:"Purchase Price"}),e.jsx("th",{children:"GST"}),e.jsx("th",{children:"Final Purchase"}),e.jsx("th",{children:"Gross Profit"}),e.jsx("th",{children:"Net Profit"}),e.jsx("th",{children:"Sales Person"}),e.jsx("th",{children:"Comm %"}),e.jsx("th",{children:"Comm ($)"}),e.jsx("th",{children:"Retained Profit"}),e.jsx("th",{children:"Markup %"}),e.jsx("th",{children:"Payment"}),e.jsx("th",{children:"Order Status"}),e.jsx("th",{children:"Tracking"}),e.jsx("th",{children:"Dollar Rate"}),e.jsx("th",{style:{textAlign:"center",minWidth:120},children:"Actions"})]})}),e.jsxs("tbody",{children:[p.map(t=>{const s=d.has(t.id),c=t.productType==="Diamond";return e.jsxs("tr",{style:{background:s?"#f0fdf4":void 0},children:[e.jsx("td",{className:"sticky-col-chk",children:e.jsxs(Le,{$checked:s,onClick:g=>{g.preventDefault(),de(t.id)},title:`Select invoice ${t.invoiceNo}`,children:[e.jsx("input",{type:"checkbox",checked:s,readOnly:!0}),s&&e.jsx(Pe,{size:11,strokeWidth:3})]})}),e.jsx("td",{className:"sticky-col-inv",children:e.jsx(se,{to:`${V}/sales/${t.id}`,style:{color:"#0d1319",textDecoration:"none",fontWeight:700},children:t.invoiceNo})}),e.jsx("td",{children:t.saleDate?new Date(t.saleDate).toLocaleDateString():"-"}),e.jsx("td",{style:{fontWeight:600,color:"#0f172a"},children:t.customerName}),e.jsx("td",{children:t.customerCountry||"-"}),e.jsx("td",{children:e.jsx(ge,{$type:t.productType,children:t.productType==="Diamond"?"💎 Diamond":"✨ Jewelry"})}),e.jsx("td",{style:{maxWidth:220,overflow:"hidden",textOverflow:"ellipsis"},children:c?t.shape||t.productDescription||"-":t.productDescription||"-"}),e.jsx("td",{children:c&&t.caratWeight?`${t.caratWeight} ct`:c?"-":`Qty: ${t.quantity||1}`}),e.jsx("td",{children:c&&t.diamondColor?`${t.diamondColor} / ${t.clarity||""}`:"-"}),e.jsx("td",{children:c&&t.certificateNo||"-"}),e.jsx("td",{children:t.supplierName||"None"}),e.jsxs("td",{children:["$",m(t.sellingPrice)]}),e.jsxs("td",{style:{fontWeight:700,color:"#0f172a"},children:["$",m(t.finalSaleAmount)]}),e.jsxs("td",{children:["$",m(t.purchasePrice)]}),e.jsxs("td",{children:["$",m(t.gstAmount)]}),e.jsxs("td",{children:["$",m(t.finalPurchasePrice)]}),e.jsxs("td",{children:["$",m(t.grossProfit)]}),e.jsxs("td",{style:{fontWeight:700,color:(Number(t.netProfit)||0)>=0?"#16a34a":"#dc2626"},children:["$",m(t.netProfit)]}),e.jsx("td",{children:t.salesPersonName||"-"}),e.jsxs("td",{children:[((Number(t.commissionPercent)||0)*100).toFixed(1),"%"]}),e.jsxs("td",{style:{color:"#d97706",fontWeight:600},children:["$",m(t.commissionAmount)]}),e.jsxs("td",{style:{fontWeight:700,color:"#2563eb"},children:["$",m(t.profitAfterCommission)]}),e.jsxs("td",{children:[((Number(t.markupPercent)||0)*100).toFixed(1),"%"]}),e.jsx("td",{children:e.jsx(ge,{$type:t.paymentStatus,children:t.paymentStatus})}),e.jsx("td",{children:e.jsx(ge,{$type:t.orderStatus,children:t.orderStatus})}),e.jsx("td",{children:t.trackingNumber?t.trackingLink?e.jsxs("a",{href:t.trackingLink,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:3,color:"#2563eb",textDecoration:"none"},children:[t.trackingNumber," ",e.jsx(Xe,{size:10})]}):t.trackingNumber:"-"}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("input",{type:"number",step:"0.01",defaultValue:t.dollarRate?Number(t.dollarRate).toFixed(2):"94.55",onBlur:async g=>{const n=Number(g.target.value);if(n&&n!==Number(t.dollarRate))try{await R.updateDollarRate(t.id,n)}catch(a){console.error("Failed to update dollar rate",a)}},onKeyDown:g=>{g.key==="Enter"&&g.target.blur()},style:{width:70,padding:"4px 6px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.78rem",background:"#ffffff",textAlign:"center",fontWeight:600,color:"#0f172a"}})}),e.jsx("td",{style:{textAlign:"center"},children:e.jsxs("div",{style:{display:"inline-flex",gap:5,alignItems:"center",justifyContent:"center"},children:[e.jsx(se,{to:`${V}/sales/${t.id}`,title:"View Sale Detail",children:e.jsx("button",{type:"button",style:{display:"inline-flex",alignItems:"center",justifyContent:"center",background:"#0d1319",color:"#ffffff",border:"1px solid #0d1319",borderRadius:5,padding:"5px 8px",cursor:"pointer",transition:"opacity 0.15s ease"},title:"View Invoice Detail",children:e.jsx(Ye,{size:13,color:"#ffffff",strokeWidth:2.5})})}),e.jsx("button",{type:"button",onClick:()=>G(t),style:{display:"inline-flex",alignItems:"center",justifyContent:"center",background:"#2563eb",color:"#ffffff",border:"1px solid #1d4ed8",borderRadius:5,padding:"5px 8px",cursor:"pointer",transition:"opacity 0.15s ease"},title:"Edit Sale Invoice",children:e.jsx(we,{size:13,color:"#ffffff",strokeWidth:2.5})}),e.jsx("button",{type:"button",onClick:()=>ne(t.id,t.invoiceNo),style:{display:"inline-flex",alignItems:"center",justifyContent:"center",background:"#dc2626",color:"#ffffff",border:"1px solid #b91c1c",borderRadius:5,padding:"5px 8px",cursor:"pointer",transition:"opacity 0.15s ease"},title:"Delete Sale Invoice",children:e.jsx(xe,{size:13,color:"#ffffff",strokeWidth:2.5})})]})})]},t.id)}),p.length===0&&!I&&e.jsx("tr",{children:e.jsx("td",{colSpan:28,style:{padding:0},children:e.jsxs(Pt,{children:[e.jsx("div",{className:"icon-circle",children:e.jsx(Ce,{size:26})}),e.jsx("h3",{children:"No sales records found"}),e.jsx("p",{children:B?"No transactions matched your current search and column filters. Try resetting the filters.":"Get started by creating your first commercial invoice or importing your existing spreadsheet ledger."}),e.jsx("div",{className:"cta-group",children:B?e.jsxs(S,{type:"button",onClick:oe,children:[e.jsx(Ne,{size:13})," Reset Filters"]}):e.jsxs(e.Fragment,{children:[e.jsxs(De,{to:`${V}/sales/new`,children:[e.jsx(ke,{size:15})," Create Invoice"]}),e.jsxs(ze,{to:`${V}/import`,children:[e.jsx(Se,{size:15,color:"#2563eb"})," Import Excel / CSV"]})]})})]})})})]})]})}),b&&b.totalPages>1&&e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,marginTop:4,flexWrap:"wrap"},children:[e.jsxs("span",{style:{fontSize:"0.8rem",color:"#64748b"},children:["Showing page ",e.jsx("strong",{children:b.page})," of ",e.jsx("strong",{children:b.totalPages})," (",b.total," total transactions)"]}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsxs(S,{type:"button",onClick:()=>h(t=>Math.max(1,t-1)),disabled:b.page===1,style:{padding:"6px 12px"},children:[e.jsx(Ze,{size:14})," Previous"]}),e.jsxs(S,{type:"button",onClick:()=>h(t=>Math.min(b.totalPages,t+1)),disabled:b.page===b.totalPages,style:{padding:"6px 12px"},children:["Next ",e.jsx(et,{size:14})]})]})]}),K&&e.jsx(ct,{sale:K,onClose:()=>G(null),onSuccess:()=>{G(null),w()}}),ae&&e.jsx(gt,{selectedIds:Array.from(d),onClose:()=>U(!1),onSuccess:()=>{U(!1),v(new Set),w()}})]})};export{Et as BusinessSalesListPage};
