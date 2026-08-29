import{r as s,j as e,X as be,ak as Te,ad as Y,b8 as de,_ as pe,ae as Le,P as ue,bc as Re,Z as Ie,bd as Ee,al as Fe,h as We,aP as Oe,x as Ge,k as Me,b as xe,c as he,f as J,aj as _e,i as Be,af as Ue,l as Ve,m as qe}from"./react-vendor-Cn6hbYeM.js";import{g as d,E as Je}from"./ui-vendor-DAsf-CE1.js";import{u as Z,w as He}from"./admin-tools-vendor-CKN5doRT.js";import{P as $}from"./admin-pages-CX7hgNJm.js";import{b as v}from"./businessApi-Ct70MbEo.js";import"./swiper-vendor-B7SuwHD8.js";const Ke=d.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`,Qe=d.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`,Xe=d.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
`,Ye=d.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`,Ze=d.div`
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: #f8fafc;
`,et=d.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,p=d.div`
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
`,tt=({sale:i,onClose:T,onSuccess:l})=>{const[W,L]=s.useState([]),[O,S]=s.useState([]),[N,j]=s.useState(!1),[D,P]=s.useState(i.invoiceNo||""),[R,C]=s.useState(i.saleDate?new Date(i.saleDate).toISOString().split("T")[0]:""),[I,G]=s.useState(i.customerName||""),[g,f]=s.useState(i.customerCountry||""),[M,h]=s.useState(i.productType||"Diamond"),[m,_]=s.useState(i.productDescription||""),[A,B]=s.useState(i.shape||"Round"),[z,y]=s.useState(i.caratWeight||""),[U,H]=s.useState(i.diamondColor||"F"),[V,K]=s.useState(i.clarity||"VS1"),[Q,te]=s.useState(i.cut||"3EX"),[q,E]=s.useState(i.certificateNo||""),[F,t]=s.useState(i.supplierName||""),[c,o]=s.useState(i.purchasePrice||0),[u,n]=s.useState(i.sellingPrice||0),[a,je]=s.useState(i.discount||0),[re,ye]=s.useState(i.gstPercent??.015),[ve,ut]=s.useState(i.shippingCost||0),[ie,Se]=s.useState(i.dollarRate||94.55),[X,Pe]=s.useState(i.employeeId||""),[ne,Ce]=s.useState(i.commissionPercent??.05),[se,ke]=s.useState(i.paymentStatus||"Paid"),[we,xt]=s.useState(i.paymentMethod||"Bank Wire"),[Ne,ht]=s.useState(i.amountReceived||""),[ae,De]=s.useState(i.orderStatus||"Delivered"),[oe,Ae]=s.useState(i.trackingNumber||"");s.useEffect(()=>{v.getEmployees({status:"ACTIVE"}).then(r=>{L(Array.isArray(r)?r:(r==null?void 0:r.employees)||[])}),v.getSuppliers().then(r=>{S(Array.isArray(r)?r:(r==null?void 0:r.suppliers)||[])})},[]);const ze=async r=>{var le,ce;r.preventDefault(),j(!0);try{const k=W.find($e=>$e.id===X);await v.updateSale(i.id,{invoiceNo:D,saleDate:R,customerName:I,customerCountry:g,productType:M,productDescription:m,shape:A,caratWeight:z?Number(z):void 0,diamondColor:U,clarity:V,cut:Q,certificateNo:q,supplierName:F,purchasePrice:Number(c)||0,sellingPrice:Number(u)||0,discount:Number(a)||0,gstPercent:Number(re)||0,shippingCost:Number(ve)||0,dollarRate:Number(ie)||94.55,employeeId:X||void 0,salesPersonName:(k==null?void 0:k.fullName)||i.salesPersonName||void 0,commissionPercent:Number(ne)||0,paymentStatus:se,paymentMethod:we,amountReceived:Number(Ne)||Number(u)||0,orderStatus:ae,trackingNumber:oe}),alert(`✅ Invoice ${D} updated successfully!`),l()}catch(k){alert(((ce=(le=k==null?void 0:k.response)==null?void 0:le.data)==null?void 0:ce.message)||"Failed to update sale")}finally{j(!1)}};return e.jsx(Ke,{onClick:T,children:e.jsxs(Qe,{onClick:r=>r.stopPropagation(),children:[e.jsxs(Xe,{children:[e.jsxs("div",{children:[e.jsxs("h2",{style:{fontSize:"1.15rem",fontWeight:800,color:"#0f172a",margin:0},children:["Edit Sale Invoice — ",i.invoiceNo]}),e.jsx("p",{style:{fontSize:"0.75rem",color:"#64748b",margin:"2px 0 0 0"},children:"Modify commercial details, client information, pricing ledger, and exchange rates"})]}),e.jsx("button",{onClick:T,style:{background:"none",border:"none",cursor:"pointer",color:"#64748b"},children:e.jsx(be,{size:20})})]}),e.jsxs("form",{onSubmit:ze,style:{display:"flex",flexDirection:"column",flex:1,overflow:"hidden"},children:[e.jsx(Ye,{children:e.jsxs(et,{children:[e.jsxs(p,{children:[e.jsx("label",{children:"Invoice Number *"}),e.jsx("input",{type:"text",value:D,onChange:r=>P(r.target.value),required:!0})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Sale Date *"}),e.jsx("input",{type:"date",value:R,onChange:r=>C(r.target.value),required:!0})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Customer Name *"}),e.jsx("input",{type:"text",value:I,onChange:r=>G(r.target.value),required:!0})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Customer Country"}),e.jsx("input",{type:"text",value:g,onChange:r=>f(r.target.value)})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Product Type"}),e.jsxs("select",{value:M,onChange:r=>h(r.target.value),children:[e.jsx("option",{value:"Diamond",children:"Diamond"}),e.jsx("option",{value:"Jewelry",children:"Jewelry"})]})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Shape / Model"}),e.jsx("input",{type:"text",value:A,onChange:r=>B(r.target.value)})]}),e.jsxs(p,{$full:!0,children:[e.jsx("label",{children:"Product Description / Diamond Specs"}),e.jsx("input",{type:"text",value:m,onChange:r=>_(r.target.value)})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Carat Weight (ct)"}),e.jsx("input",{type:"number",step:"0.01",value:z,onChange:r=>y(r.target.value)})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Color / Clarity"}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("input",{type:"text",placeholder:"Color",value:U,onChange:r=>H(r.target.value)}),e.jsx("input",{type:"text",placeholder:"Clarity",value:V,onChange:r=>K(r.target.value)})]})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Certificate No"}),e.jsx("input",{type:"text",value:q,onChange:r=>E(r.target.value)})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Supplier / Vendor"}),e.jsx("input",{type:"text",value:F,onChange:r=>t(r.target.value),list:"edit-supp-list"}),e.jsx("datalist",{id:"edit-supp-list",children:O.map(r=>e.jsx("option",{value:r.name},r.id))})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Purchase Price ($)"}),e.jsx("input",{type:"number",step:"0.01",value:c,onChange:r=>o(Number(r.target.value)),required:!0})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Selling Price ($)"}),e.jsx("input",{type:"number",step:"0.01",value:u,onChange:r=>n(Number(r.target.value)),required:!0})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Discount ($)"}),e.jsx("input",{type:"number",step:"0.01",value:a,onChange:r=>je(Number(r.target.value))})]}),e.jsxs(p,{children:[e.jsx("label",{children:"GST % (e.g. 0.015 for 1.5%)"}),e.jsx("input",{type:"number",step:"0.001",value:re,onChange:r=>ye(Number(r.target.value))})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Dollar Rate ($ / ₹)"}),e.jsx("input",{type:"number",step:"0.01",value:ie,onChange:r=>Se(Number(r.target.value)),required:!0})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Sales Person"}),e.jsxs("select",{value:X,onChange:r=>Pe(r.target.value),children:[e.jsx("option",{value:"",children:"Unassigned"}),W.map(r=>e.jsxs("option",{value:r.id,children:[r.fullName||r.name," (",r.employeeCode,")"]},r.id))]})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Commission Rate (e.g. 0.05 for 5%)"}),e.jsx("input",{type:"number",step:"0.005",value:ne,onChange:r=>Ce(Number(r.target.value))})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Payment Status"}),e.jsxs("select",{value:se,onChange:r=>ke(r.target.value),children:[e.jsx("option",{value:"Paid",children:"Paid"}),e.jsx("option",{value:"Partial",children:"Partial"}),e.jsx("option",{value:"Pending",children:"Pending"}),e.jsx("option",{value:"Unpaid",children:"Unpaid"})]})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Order Status"}),e.jsxs("select",{value:ae,onChange:r=>De(r.target.value),children:[e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"}),e.jsx("option",{value:"Cancelled",children:"Cancelled"})]})]}),e.jsxs(p,{children:[e.jsx("label",{children:"Tracking Number"}),e.jsx("input",{type:"text",value:oe,onChange:r=>Ae(r.target.value)})]})]})}),e.jsxs(Ze,{children:[e.jsx("button",{type:"button",onClick:T,style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#ffffff",borderRadius:6,fontSize:"0.82rem",fontWeight:600,cursor:"pointer"},children:"Cancel"}),e.jsxs("button",{type:"submit",disabled:N,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 20px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontSize:"0.82rem",fontWeight:700,cursor:"pointer"},children:[e.jsx(Te,{size:14})," ",N?"Saving Changes...":"Save Invoice"]})]})]})]})})},rt=Je`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`,it=d.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 100%;
`,nt=d.div`
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
`,fe=d(J)`
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
`,b=d.button`
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
        `;default:return`
          border: 1px solid #cbd5e1;
          color: #334155;
          &:hover {
            background: #f8fafc;
            border-color: #94a3b8;
          }
        `}}}
`,ge=d(J)`
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
`,st=d.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
`,w=d.div`
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
`,at=d.div`
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  height: 86px;
  animation: ${rt} 1.5s infinite;
`,ot=d.div`
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
`,lt=d.div`
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
  animation: fadeIn 0.2s ease;

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`,me=d.label`
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
`,ct=d.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow-x: auto;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  scrollbar-width: thin;
  position: relative;
`,dt=d.table`
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
`,ee=d.span`
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 4px;
  display: inline-block;
  letter-spacing: 0.02em;

  ${({$type:i})=>{switch(i){case"Paid":return"background: #ebfbee; color: #2b8a3e; border: 1px solid #b2f2bb;";case"Partial":return"background: #fff9db; color: #f59f00; border: 1px solid #ffe066;";case"Pending":case"Unpaid":return"background: #fff5f5; color: #e03131; border: 1px solid #ffc9c9;";case"Delivered":return"background: #e7f5ff; color: #1c7ed6; border: 1px solid #a5d8ff;";case"Shipped":return"background: #f3f0ff; color: #7950f2; border: 1px solid #d0bfff;";case"Processing":return"background: #fff4e6; color: #d9480f; border: 1px solid #ffd8a8;";case"Diamond":return"background: #fff3bf; color: #b45309; border: 1px solid #fde68a;";case"Jewelry":return"background: #ede9fe; color: #6d28d9; border: 1px solid #ddd6fe;";default:return"background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0;"}}}
`,pt=d.div`
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
`,x=i=>(Number(i)||0).toLocaleString(),vt=()=>{const[i,T]=s.useState([]),[l,W]=s.useState(null),[L,O]=s.useState(!0),[S,N]=s.useState(""),[j,D]=s.useState("ALL"),[P,R]=s.useState("ALL"),[C,I]=s.useState("ALL"),[G,g]=s.useState(1),[f,M]=s.useState(null),[h,m]=s.useState(new Set),[_,A]=s.useState(null),[B,z]=s.useState(null),y=async()=>{O(!0),z(null);try{const t=await v.getSales({search:S||void 0,productType:j!=="ALL"?j:void 0,paymentStatus:P!=="ALL"?P:void 0,orderStatus:C!=="ALL"?C:void 0,page:G,limit:50});T(t.sales||[]),W(t.summary),M(t.pagination)}catch(t){console.error(t),z("Unable to load sales data. Please check your connection and retry.")}finally{O(!1)}};s.useEffect(()=>{y()},[S,j,P,C,G]);const U=()=>{h.size===i.length&&i.length>0?m(new Set):m(new Set(i.map(t=>t.id)))},H=t=>{m(c=>{const o=new Set(c);return o.has(t)?o.delete(t):o.add(t),o})},V=async(t,c)=>{var o,u;if(window.confirm(`⚠️ Are you sure you want to delete invoice ${c}?`))try{await v.deleteSale(t),m(n=>{const a=new Set(n);return a.delete(t),a}),await y()}catch(n){alert(((u=(o=n==null?void 0:n.response)==null?void 0:o.data)==null?void 0:u.message)||"Delete failed")}},K=async()=>{var t,c;if(h.size!==0&&window.confirm(`⚠️ Are you sure you want to permanently delete the ${h.size} selected sales?`))try{await v.deleteSalesBatch(Array.from(h)),m(new Set),await y(),alert("✅ Selected sales deleted successfully.")}catch(o){alert(((c=(t=o==null?void 0:o.response)==null?void 0:t.data)==null?void 0:c.message)||"Delete batch failed")}},Q=async()=>{var t,c;if(window.confirm("⚠️ WARNING: Are you sure you want to permanently delete ALL sales records from the database? This action cannot be undone."))try{await v.deleteAllSales(),m(new Set),await y(),alert("✅ All sales have been deleted successfully from the database.")}catch(o){alert(((c=(t=o==null?void 0:o.response)==null?void 0:t.data)==null?void 0:c.message)||"Delete all failed")}},te=()=>{if(!i||i.length===0)return;const t=["Invoice No","Sale Date","Customer Name","Country","Product Type","Description","Shape","Carat","Color","Clarity","Cut","Cert No","Supplier","Purchase Price","Selling Price","Discount","Final Sale Amount","Shipping Cost","GST %","GST Amount","Final Purchase Price","Gross Profit","Net Profit","Sales Person","Commission %","Commission Amount","Profit After Commission","Payment Status","Order Status","Tracking Number"],c=i.map(a=>[a.invoiceNo,a.saleDate?new Date(a.saleDate).toISOString().split("T")[0]:"",`"${a.customerName}"`,a.customerCountry||"",a.productType,`"${a.productDescription||""}"`,a.shape||"",a.caratWeight||"",a.diamondColor||"",a.clarity||"",a.cut||"",a.certificateNo||"",`"${a.supplierName||""}"`,a.purchasePrice,a.sellingPrice,a.discount,a.finalSaleAmount,a.shippingCost,a.gstPercent,a.gstAmount,a.finalPurchasePrice,a.grossProfit,a.netProfit,`"${a.salesPersonName||""}"`,a.commissionPercent,a.commissionAmount,a.profitAfterCommission,a.paymentStatus,a.orderStatus,a.trackingNumber||""]),o="data:text/csv;charset=utf-8,"+[t.join(","),...c.map(a=>a.join(","))].join(`
`),u=encodeURI(o),n=document.createElement("a");n.setAttribute("href",u),n.setAttribute("download",`sales_tracker_${new Date().toISOString().split("T")[0]}.csv`),document.body.appendChild(n),n.click(),document.body.removeChild(n)},q=()=>{if(!i||i.length===0)return;const t=["Invoice No","Sale Date","Customer Name","Customer Country","Product Type","Product Description","Stone Type","Shape","Diamond Color","Clarity","Cut","Polish","Symmetry","Fluorescence","Measurement","Price per Carat","Carat / Weight","Quantity","Certificate","Certificate No","Supplier","Purchase Price","Selling Price","Discount","Final Sale Amount","Shipping Cost","GST %","GST Amount","Final Purchase Price","Payment Status","Payment Method","Amount Received","Pending Amount","Gross Profit","Net Profit","Sales Person","Commission %","Commission Amount","Profit After Commission","Profit % (Markup)","Final Profit %","Order Status","Tracking Number","Tracking Link","Dollar Rate","Sale Month"],c=i.map(n=>[n.invoiceNo,n.saleDate?new Date(n.saleDate).toISOString().split("T")[0]:"",n.customerName||"",n.customerCountry||"",n.productType||"",n.productDescription||"",n.stoneType||"",n.shape||"",n.diamondColor||"",n.clarity||"",n.cut||"",n.polish||"",n.symmetry||"",n.fluorescence||"",n.measurement||"",n.pricePerCarat??"",n.caratWeight??"",n.quantity??1,n.certificate||"",n.certificateNo||"",n.supplierName||"",n.purchasePrice??0,n.sellingPrice??0,n.discount??0,n.finalSaleAmount??0,n.shippingCost??0,n.gstPercent??0,n.gstAmount??0,n.finalPurchasePrice??0,n.paymentStatus||"",n.paymentMethod||"",n.amountReceived??0,n.pendingAmount??0,n.grossProfit??0,n.netProfit??0,n.salesPersonName||"",n.commissionPercent??0,n.commissionAmount??0,n.profitAfterCommission??0,n.markupPercent??0,n.finalProfitPercent??0,n.orderStatus||"",n.trackingNumber||"",n.trackingLink||"",n.dollarRate??94.55,n.saleMonth||""]),o=Z.aoa_to_sheet([t,...c]),u=Z.book_new();Z.book_append_sheet(u,o,"Sales Ledger"),He(u,`sales_ledger_${new Date().toISOString().split("T")[0]}.xlsx`)},E=S||j!=="ALL"||P!=="ALL"||C!=="ALL",F=()=>{N(""),D("ALL"),R("ALL"),I("ALL"),g(1)};return e.jsxs(it,{children:[e.jsxs(nt,{children:[e.jsxs("div",{className:"title-group",children:[e.jsxs("h1",{children:["Sales Management Tracker",e.jsx("span",{className:"badge-tag",children:"46-Column Ledger"})]}),e.jsx("p",{children:"Authoritative financial tracking, sales performance, commissions & margins"})]}),e.jsxs("div",{className:"action-toolbar",children:[e.jsxs(b,{type:"button",$variant:"danger",onClick:Q,title:"Purge all sales data from database",children:[e.jsx(Y,{size:13})," Delete All Sales"]}),e.jsxs(ge,{to:`${$}/import`,title:"Import batch sales via Excel or CSV",children:[e.jsx(de,{size:14,color:"#2563eb"})," Import Excel / File"]}),e.jsxs(b,{type:"button",$variant:"success",onClick:q,title:"Export ledger to Excel workbook",children:[e.jsx(pe,{size:14,color:"#15803d"})," Export Excel (.xlsx)"]}),e.jsxs(b,{type:"button",onClick:te,title:"Export CSV spreadsheet",children:[e.jsx(Le,{size:14})," Export CSV"]}),e.jsxs(fe,{to:`${$}/sales/new`,title:"Create a new commercial invoice",children:[e.jsx(ue,{size:16})," New Sale Invoice"]})]})]}),e.jsx(st,{children:L&&!l?Array.from({length:7}).map((t,c)=>e.jsx(at,{},c)):e.jsxs(e.Fragment,{children:[e.jsxs(w,{children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Total Orders"}),e.jsx("span",{className:"icon-wrap",children:e.jsx(Re,{size:14})})]}),e.jsx("div",{className:"val",children:(l==null?void 0:l.totalOrders)||0}),e.jsx("div",{className:"subtitle",children:"Processed deals"})]}),e.jsxs(w,{$highlight:"revenue",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Total Revenue"}),e.jsx("span",{className:"icon-wrap",children:e.jsx(Ie,{size:14,color:"#0f172a"})})]}),e.jsxs("div",{className:"val",children:["$",x(l==null?void 0:l.totalRevenue)]}),e.jsx("div",{className:"subtitle",children:"Gross billed volume"})]}),e.jsxs(w,{children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Purchase Costs"}),e.jsx("span",{className:"icon-wrap",children:e.jsx(Ee,{size:14})})]}),e.jsxs("div",{className:"val",style:{color:"#475569"},children:["$",x(l==null?void 0:l.totalPurchaseCost)]}),e.jsx("div",{className:"subtitle",children:"Inventory & vendor COGS"})]}),e.jsxs(w,{children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Gross Profit"}),e.jsx("span",{className:"icon-wrap",children:e.jsx(Fe,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",x(l==null?void 0:l.totalGrossProfit)]}),e.jsx("div",{className:"subtitle",children:"Revenue minus COGS"})]}),e.jsxs(w,{$highlight:"profit",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Net Profit"}),e.jsx("span",{className:"icon-wrap",style:{background:"#f0fdf4",color:"#16a34a"},children:e.jsx(We,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",x(l==null?void 0:l.totalNetProfit)]}),e.jsx("div",{className:"subtitle",children:"Post-shipping & GST"})]}),e.jsxs(w,{$highlight:"warning",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Commission Due"}),e.jsx("span",{className:"icon-wrap",style:{background:"#fffbeb",color:"#d97706"},children:e.jsx(Oe,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",x(l==null?void 0:l.totalCommission)]}),e.jsx("div",{className:"subtitle",children:"Staff commission liability"})]}),e.jsxs(w,{$highlight:"retained",children:[e.jsxs("div",{className:"card-top",children:[e.jsx("span",{className:"label",children:"Retained Profit"}),e.jsx("span",{className:"icon-wrap",style:{background:"#eff6ff",color:"#2563eb"},children:e.jsx(Ge,{size:14})})]}),e.jsxs("div",{className:"val",children:["$",x(l==null?void 0:l.totalProfitAfterCommission)]}),e.jsx("div",{className:"subtitle",children:"Retained business equity"})]})]})}),e.jsxs(ot,{children:[e.jsxs("div",{className:"search-wrapper",children:[e.jsx(Me,{size:14,color:"#64748b"}),e.jsx("input",{type:"text",placeholder:"Search invoice, client, stone, certificate...",value:S,onChange:t=>{N(t.target.value),g(1)}}),S&&e.jsx("button",{className:"clear-btn",onClick:()=>N(""),title:"Clear search",children:e.jsx(be,{size:13})})]}),e.jsxs("select",{className:"filter-select",value:j,onChange:t=>{D(t.target.value),g(1)},children:[e.jsx("option",{value:"ALL",children:"All Product Types"}),e.jsx("option",{value:"Diamond",children:"💎 Diamonds Only"}),e.jsx("option",{value:"Jewelry",children:"✨ Jewelry Only"})]}),e.jsxs("select",{className:"filter-select",value:P,onChange:t=>{R(t.target.value),g(1)},children:[e.jsx("option",{value:"ALL",children:"All Payment Statuses"}),e.jsx("option",{value:"Paid",children:"Paid (Full)"}),e.jsx("option",{value:"Partial",children:"Partial Payment"}),e.jsx("option",{value:"Pending",children:"Pending / Unpaid"})]}),e.jsxs("select",{className:"filter-select",value:C,onChange:t=>{I(t.target.value),g(1)},children:[e.jsx("option",{value:"ALL",children:"All Order Statuses"}),e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"})]}),E&&e.jsxs(b,{type:"button",onClick:F,style:{padding:"6px 12px",fontSize:"0.78rem"},children:[e.jsx(xe,{size:12})," Reset Filters"]}),e.jsx("div",{className:"results-pill",children:L?"Loading...":`Showing ${i.length} ${i.length===1?"sale":"sales"}`})]}),h.size>0&&e.jsxs(lt,{children:[e.jsxs("div",{children:["✨ ",e.jsx("strong",{children:h.size})," ",h.size===1?"record":"records"," selected"]}),e.jsxs("div",{className:"actions",children:[e.jsx(b,{type:"button",onClick:()=>m(new Set),style:{padding:"4px 10px",fontSize:"0.76rem"},children:"Deselect All"}),e.jsxs(b,{type:"button",$variant:"danger",onClick:K,style:{padding:"4px 12px",fontSize:"0.76rem"},children:[e.jsx(Y,{size:12})," Delete Selected (",h.size,")"]})]})]}),B&&e.jsxs("div",{style:{background:"#fff5f5",border:"1px solid #fecaca",borderRadius:8,padding:"12px 16px",color:"#b91c1c",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{children:["⚠️ ",B]}),e.jsx(b,{type:"button",onClick:y,style:{padding:"4px 10px",fontSize:"0.76rem"},children:"Try Again"})]}),e.jsx(ct,{children:e.jsxs(dt,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"sticky-col-chk",children:e.jsxs(me,{$checked:i.length>0&&h.size===i.length,onClick:t=>{t.preventDefault(),U()},title:"Select / Deselect All Sales",children:[e.jsx("input",{type:"checkbox",checked:i.length>0&&h.size===i.length,readOnly:!0}),i.length>0&&h.size===i.length&&e.jsx(he,{size:11,strokeWidth:3})]})}),e.jsx("th",{className:"sticky-col-inv",children:"Invoice No"}),e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Customer"}),e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Description / Shape"}),e.jsx("th",{children:"Carat"}),e.jsx("th",{children:"Color/Clarity"}),e.jsx("th",{children:"Cert #"}),e.jsx("th",{children:"Supplier"}),e.jsx("th",{children:"Selling Price"}),e.jsx("th",{children:"Final Sale"}),e.jsx("th",{children:"Purchase Price"}),e.jsx("th",{children:"GST"}),e.jsx("th",{children:"Final Purchase"}),e.jsx("th",{children:"Gross Profit"}),e.jsx("th",{children:"Net Profit"}),e.jsx("th",{children:"Sales Person"}),e.jsx("th",{children:"Comm %"}),e.jsx("th",{children:"Comm ($)"}),e.jsx("th",{children:"Retained Profit"}),e.jsx("th",{children:"Markup %"}),e.jsx("th",{children:"Payment"}),e.jsx("th",{children:"Order Status"}),e.jsx("th",{children:"Tracking"}),e.jsx("th",{children:"Dollar Rate"}),e.jsx("th",{style:{textAlign:"right"},children:"Actions"})]})}),e.jsxs("tbody",{children:[i.map(t=>{const c=h.has(t.id),o=t.productType==="Diamond";return e.jsxs("tr",{style:{background:c?"#f0fdf4":void 0},children:[e.jsx("td",{className:"sticky-col-chk",children:e.jsxs(me,{$checked:c,onClick:u=>{u.preventDefault(),H(t.id)},title:`Select invoice ${t.invoiceNo}`,children:[e.jsx("input",{type:"checkbox",checked:c,readOnly:!0}),c&&e.jsx(he,{size:11,strokeWidth:3})]})}),e.jsx("td",{className:"sticky-col-inv",children:e.jsx(J,{to:`${$}/sales/${t.id}`,style:{color:"#0d1319",textDecoration:"none",fontWeight:700},children:t.invoiceNo})}),e.jsx("td",{children:t.saleDate?new Date(t.saleDate).toLocaleDateString():"-"}),e.jsx("td",{style:{fontWeight:600,color:"#0f172a"},children:t.customerName}),e.jsx("td",{children:t.customerCountry||"-"}),e.jsx("td",{children:e.jsx(ee,{$type:t.productType,children:t.productType==="Diamond"?"💎 Diamond":"✨ Jewelry"})}),e.jsx("td",{style:{maxWidth:220,overflow:"hidden",textOverflow:"ellipsis"},children:o?t.shape||t.productDescription||"-":t.productDescription||"-"}),e.jsx("td",{children:o&&t.caratWeight?`${t.caratWeight} ct`:o?"-":`Qty: ${t.quantity||1}`}),e.jsx("td",{children:o&&t.diamondColor?`${t.diamondColor} / ${t.clarity||""}`:"-"}),e.jsx("td",{children:o&&t.certificateNo||"-"}),e.jsx("td",{children:t.supplierName||"None"}),e.jsxs("td",{children:["$",x(t.sellingPrice)]}),e.jsxs("td",{style:{fontWeight:700,color:"#0f172a"},children:["$",x(t.finalSaleAmount)]}),e.jsxs("td",{children:["$",x(t.purchasePrice)]}),e.jsxs("td",{children:["$",x(t.gstAmount)]}),e.jsxs("td",{children:["$",x(t.finalPurchasePrice)]}),e.jsxs("td",{children:["$",x(t.grossProfit)]}),e.jsxs("td",{style:{fontWeight:700,color:(Number(t.netProfit)||0)>=0?"#16a34a":"#dc2626"},children:["$",x(t.netProfit)]}),e.jsx("td",{children:t.salesPersonName||"-"}),e.jsxs("td",{children:[((Number(t.commissionPercent)||0)*100).toFixed(1),"%"]}),e.jsxs("td",{style:{color:"#d97706",fontWeight:600},children:["$",x(t.commissionAmount)]}),e.jsxs("td",{style:{fontWeight:700,color:"#2563eb"},children:["$",x(t.profitAfterCommission)]}),e.jsxs("td",{children:[((Number(t.markupPercent)||0)*100).toFixed(1),"%"]}),e.jsx("td",{children:e.jsx(ee,{$type:t.paymentStatus,children:t.paymentStatus})}),e.jsx("td",{children:e.jsx(ee,{$type:t.orderStatus,children:t.orderStatus})}),e.jsx("td",{children:t.trackingNumber?t.trackingLink?e.jsxs("a",{href:t.trackingLink,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:3,color:"#2563eb",textDecoration:"none"},children:[t.trackingNumber," ",e.jsx(_e,{size:10})]}):t.trackingNumber:"-"}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("input",{type:"number",step:"0.01",defaultValue:t.dollarRate?Number(t.dollarRate).toFixed(2):"94.55",onBlur:async u=>{const n=Number(u.target.value);if(n&&n!==Number(t.dollarRate))try{await v.updateDollarRate(t.id,n)}catch(a){console.error("Failed to update dollar rate",a)}},onKeyDown:u=>{u.key==="Enter"&&u.target.blur()},style:{width:70,padding:"4px 6px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.78rem",background:"#ffffff",textAlign:"center",fontWeight:600,color:"#0f172a"}})}),e.jsx("td",{style:{textAlign:"right"},children:e.jsxs("div",{style:{display:"inline-flex",gap:6},children:[e.jsx(J,{to:`${$}/sales/${t.id}`,children:e.jsx("button",{style:{background:"#f8fafc",border:"1px solid #e2e8f0",padding:"4px 8px",borderRadius:6,cursor:"pointer",color:"#334155"},title:"View Sale Detail",children:e.jsx(Be,{size:13})})}),e.jsx("button",{onClick:()=>A(t),style:{background:"#f8fafc",border:"1px solid #e2e8f0",padding:"4px 8px",borderRadius:6,cursor:"pointer",color:"#0f172a"},title:"Edit Sale Invoice",children:e.jsx(Ue,{size:13})}),e.jsx("button",{onClick:()=>V(t.id,t.invoiceNo),style:{background:"#fff5f5",border:"1px solid #fee2e2",color:"#dc2626",padding:"4px 8px",borderRadius:6,cursor:"pointer"},title:"Delete Sale Invoice",children:e.jsx(Y,{size:13})})]})})]},t.id)}),i.length===0&&!L&&e.jsx("tr",{children:e.jsx("td",{colSpan:28,style:{padding:0},children:e.jsxs(pt,{children:[e.jsx("div",{className:"icon-circle",children:e.jsx(pe,{size:26})}),e.jsx("h3",{children:"No sales records found"}),e.jsx("p",{children:E?"No transactions matched your current search filters. Try clearing or broadening your search.":"Get started by creating your first commercial invoice or importing your existing spreadsheet ledger."}),e.jsx("div",{className:"cta-group",children:E?e.jsxs(b,{type:"button",onClick:F,children:[e.jsx(xe,{size:13})," Reset Filters"]}):e.jsxs(e.Fragment,{children:[e.jsxs(fe,{to:`${$}/sales/new`,children:[e.jsx(ue,{size:15})," Create Invoice"]}),e.jsxs(ge,{to:`${$}/import`,children:[e.jsx(de,{size:15,color:"#2563eb"})," Import Excel / CSV"]})]})})]})})})]})]})}),f&&f.totalPages>1&&e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,marginTop:4,flexWrap:"wrap"},children:[e.jsxs("span",{style:{fontSize:"0.8rem",color:"#64748b"},children:["Showing page ",e.jsx("strong",{children:f.page})," of ",e.jsx("strong",{children:f.totalPages})," (",f.total," total transactions)"]}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsxs(b,{type:"button",onClick:()=>g(t=>Math.max(1,t-1)),disabled:f.page===1,style:{padding:"6px 12px"},children:[e.jsx(Ve,{size:14})," Previous"]}),e.jsxs(b,{type:"button",onClick:()=>g(t=>Math.min(f.totalPages,t+1)),disabled:f.page===f.totalPages,style:{padding:"6px 12px"},children:["Next ",e.jsx(qe,{size:14})]})]})]}),_&&e.jsx(tt,{sale:_,onClose:()=>A(null),onSuccess:()=>{A(null),y()}})]})};export{vt as BusinessSalesListPage};
