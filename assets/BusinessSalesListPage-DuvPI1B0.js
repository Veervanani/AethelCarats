import{r as o,j as e,X as ve,ak as Pe,ad as X,f as O,b8 as Ce,_ as ke,ae as Ne,P as we,k as De,aj as Ae,i as ze,af as Re,l as Te,m as $e}from"./react-vendor-BXyx942q.js";import{g as x}from"./ui-vendor-VHkRGmvp.js";import{u as K,w as Ie}from"./admin-tools-vendor-CKN5doRT.js";import{P as G}from"./admin-pages-BUIlelD1.js";import{b as m}from"./businessApi-CihQzVoq.js";import"./swiper-vendor-B7SuwHD8.js";const Le=x.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`,We=x.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`,Ee=x.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
`,Fe=x.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`,Me=x.div`
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: #f8fafc;
`,Oe=x.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,c=x.div`
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
`,Ge=({sale:n,onClose:k,onSuccess:l})=>{const[z,_]=o.useState([]),[R,N]=o.useState([]),[T,b]=o.useState(!1),[w,v]=o.useState(n.invoiceNo||""),[$,P]=o.useState(n.saleDate?new Date(n.saleDate).toISOString().split("T")[0]:""),[I,L]=o.useState(n.customerName||""),[D,h]=o.useState(n.customerCountry||""),[W,f]=o.useState(n.productType||"Diamond"),[g,E]=o.useState(n.productDescription||""),[C,j]=o.useState(n.shape||"Round"),[A,B]=o.useState(n.caratWeight||""),[F,U]=o.useState(n.diamondColor||"F"),[M,V]=o.useState(n.clarity||"VS1"),[q,t]=o.useState(n.cut||"3EX"),[d,s]=o.useState(n.certificateNo||""),[p,i]=o.useState(n.supplierName||""),[a,se]=o.useState(n.purchasePrice||0),[J,le]=o.useState(n.sellingPrice||0),[Y,ce]=o.useState(n.discount||0),[Z,de]=o.useState(n.gstPercent??.015),[ue,Je]=o.useState(n.shippingCost||0),[ee,pe]=o.useState(n.dollarRate||94.55),[H,xe]=o.useState(n.employeeId||""),[te,he]=o.useState(n.commissionPercent??.05),[re,fe]=o.useState(n.paymentStatus||"Paid"),[ge,He]=o.useState(n.paymentMethod||"Bank Wire"),[me,Xe]=o.useState(n.amountReceived||""),[ie,be]=o.useState(n.orderStatus||"Delivered"),[ne,je]=o.useState(n.trackingNumber||"");o.useEffect(()=>{m.getEmployees({status:"ACTIVE"}).then(r=>{_(Array.isArray(r)?r:(r==null?void 0:r.employees)||[])}),m.getSuppliers().then(r=>{N(Array.isArray(r)?r:(r==null?void 0:r.suppliers)||[])})},[]);const ye=async r=>{var oe,ae;r.preventDefault(),b(!0);try{const y=z.find(Se=>Se.id===H);await m.updateSale(n.id,{invoiceNo:w,saleDate:$,customerName:I,customerCountry:D,productType:W,productDescription:g,shape:C,caratWeight:A?Number(A):void 0,diamondColor:F,clarity:M,cut:q,certificateNo:d,supplierName:p,purchasePrice:Number(a)||0,sellingPrice:Number(J)||0,discount:Number(Y)||0,gstPercent:Number(Z)||0,shippingCost:Number(ue)||0,dollarRate:Number(ee)||94.55,employeeId:H||void 0,salesPersonName:(y==null?void 0:y.fullName)||n.salesPersonName||void 0,commissionPercent:Number(te)||0,paymentStatus:re,paymentMethod:ge,amountReceived:Number(me)||Number(J)||0,orderStatus:ie,trackingNumber:ne}),alert(`✅ Invoice ${w} updated successfully!`),l()}catch(y){alert(((ae=(oe=y==null?void 0:y.response)==null?void 0:oe.data)==null?void 0:ae.message)||"Failed to update sale")}finally{b(!1)}};return e.jsx(Le,{onClick:k,children:e.jsxs(We,{onClick:r=>r.stopPropagation(),children:[e.jsxs(Ee,{children:[e.jsxs("div",{children:[e.jsxs("h2",{style:{fontSize:"1.15rem",fontWeight:800,color:"#0f172a",margin:0},children:["Edit Sale Invoice — ",n.invoiceNo]}),e.jsx("p",{style:{fontSize:"0.75rem",color:"#64748b",margin:"2px 0 0 0"},children:"Modify commercial details, client information, pricing ledger, and exchange rates"})]}),e.jsx("button",{onClick:k,style:{background:"none",border:"none",cursor:"pointer",color:"#64748b"},children:e.jsx(ve,{size:20})})]}),e.jsxs("form",{onSubmit:ye,style:{display:"flex",flexDirection:"column",flex:1,overflow:"hidden"},children:[e.jsx(Fe,{children:e.jsxs(Oe,{children:[e.jsxs(c,{children:[e.jsx("label",{children:"Invoice Number *"}),e.jsx("input",{type:"text",value:w,onChange:r=>v(r.target.value),required:!0})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Sale Date *"}),e.jsx("input",{type:"date",value:$,onChange:r=>P(r.target.value),required:!0})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Customer Name *"}),e.jsx("input",{type:"text",value:I,onChange:r=>L(r.target.value),required:!0})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Customer Country"}),e.jsx("input",{type:"text",value:D,onChange:r=>h(r.target.value)})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Product Type"}),e.jsxs("select",{value:W,onChange:r=>f(r.target.value),children:[e.jsx("option",{value:"Diamond",children:"Diamond"}),e.jsx("option",{value:"Jewelry",children:"Jewelry"})]})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Shape / Model"}),e.jsx("input",{type:"text",value:C,onChange:r=>j(r.target.value)})]}),e.jsxs(c,{$full:!0,children:[e.jsx("label",{children:"Product Description / Diamond Specs"}),e.jsx("input",{type:"text",value:g,onChange:r=>E(r.target.value)})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Carat Weight (ct)"}),e.jsx("input",{type:"number",step:"0.01",value:A,onChange:r=>B(r.target.value)})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Color / Clarity"}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("input",{type:"text",placeholder:"Color",value:F,onChange:r=>U(r.target.value)}),e.jsx("input",{type:"text",placeholder:"Clarity",value:M,onChange:r=>V(r.target.value)})]})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Certificate No"}),e.jsx("input",{type:"text",value:d,onChange:r=>s(r.target.value)})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Supplier / Vendor"}),e.jsx("input",{type:"text",value:p,onChange:r=>i(r.target.value),list:"edit-supp-list"}),e.jsx("datalist",{id:"edit-supp-list",children:R.map(r=>e.jsx("option",{value:r.name},r.id))})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Purchase Price ($)"}),e.jsx("input",{type:"number",step:"0.01",value:a,onChange:r=>se(Number(r.target.value)),required:!0})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Selling Price ($)"}),e.jsx("input",{type:"number",step:"0.01",value:J,onChange:r=>le(Number(r.target.value)),required:!0})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Discount ($)"}),e.jsx("input",{type:"number",step:"0.01",value:Y,onChange:r=>ce(Number(r.target.value))})]}),e.jsxs(c,{children:[e.jsx("label",{children:"GST % (e.g. 0.015 for 1.5%)"}),e.jsx("input",{type:"number",step:"0.001",value:Z,onChange:r=>de(Number(r.target.value))})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Dollar Rate ($ / ₹)"}),e.jsx("input",{type:"number",step:"0.01",value:ee,onChange:r=>pe(Number(r.target.value)),required:!0})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Sales Person"}),e.jsxs("select",{value:H,onChange:r=>xe(r.target.value),children:[e.jsx("option",{value:"",children:"Unassigned"}),z.map(r=>e.jsxs("option",{value:r.id,children:[r.fullName||r.name," (",r.employeeCode,")"]},r.id))]})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Commission Rate (e.g. 0.05 for 5%)"}),e.jsx("input",{type:"number",step:"0.005",value:te,onChange:r=>he(Number(r.target.value))})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Payment Status"}),e.jsxs("select",{value:re,onChange:r=>fe(r.target.value),children:[e.jsx("option",{value:"Paid",children:"Paid"}),e.jsx("option",{value:"Partial",children:"Partial"}),e.jsx("option",{value:"Pending",children:"Pending"}),e.jsx("option",{value:"Unpaid",children:"Unpaid"})]})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Order Status"}),e.jsxs("select",{value:ie,onChange:r=>be(r.target.value),children:[e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"}),e.jsx("option",{value:"Cancelled",children:"Cancelled"})]})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Tracking Number"}),e.jsx("input",{type:"text",value:ne,onChange:r=>je(r.target.value)})]})]})}),e.jsxs(Me,{children:[e.jsx("button",{type:"button",onClick:k,style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#ffffff",borderRadius:6,fontSize:"0.82rem",fontWeight:600,cursor:"pointer"},children:"Cancel"}),e.jsxs("button",{type:"submit",disabled:T,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 20px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontSize:"0.82rem",fontWeight:700,cursor:"pointer"},children:[e.jsx(Pe,{size:14})," ",T?"Saving Changes...":"Save Invoice"]})]})]})]})})},_e=x.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
`,Be=x.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
`,S=x.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 14px;

  .label {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
  }
  .val {
    font-size: 1.15rem;
    font-weight: 800;
    color: #0f172a;
    margin-top: 2px;
  }
`,Ue=x.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`,Ve=x.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  scrollbar-width: thin;
`,qe=x.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
  white-space: nowrap;

  th {
    background: #0d1319;
    color: #f1f4f8;
    padding: 10px 12px;
    font-weight: 600;
    text-align: left;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  td {
    padding: 9px 12px;
    border-bottom: 1px solid #f1f5f9;
    border-right: 1px solid #f1f5f9;
    color: #1e293b;
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
    min-width: 115px;
    background: #0d1319 !important;
    color: #f1f4f8 !important;
    z-index: 30;
    font-weight: 700;
    box-shadow: 3px 0 6px rgba(0, 0, 0, 0.15);
  }

  td.sticky-col-inv {
    position: sticky;
    left: 44px;
    min-width: 115px;
    background: #ffffff;
    z-index: 20;
    font-weight: 700;
    box-shadow: 3px 0 6px rgba(0, 0, 0, 0.05);
  }

  tr:hover td.sticky-col-chk,
  tr:hover td.sticky-col-inv {
    background: #f8fafc;
  }
`,Q=x.span`
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;

  ${({$type:n})=>{switch(n){case"Paid":return"background: #ebfbee; color: #2b8a3e;";case"Partial":return"background: #fff9db; color: #f59f00;";case"Pending":case"Unpaid":return"background: #fff5f5; color: #e03131;";case"Delivered":return"background: #e7f5ff; color: #1c7ed6;";case"Diamond":return"background: #fff3bf; color: #d97706;";case"Jewelry":return"background: #f3f0ff; color: #7950f2;";default:return"background: #f1f5f9; color: #64748b;"}}}
`,u=n=>(Number(n)||0).toLocaleString(),rt=()=>{const[n,k]=o.useState([]),[l,z]=o.useState(null),[_,R]=o.useState(!0),[N,T]=o.useState(""),[b,w]=o.useState("ALL"),[v,$]=o.useState("ALL"),[P,I]=o.useState("ALL"),[L,D]=o.useState(1),[h,W]=o.useState(null),[f,g]=o.useState(new Set),[E,C]=o.useState(null),j=async()=>{R(!0);try{const t=await m.getSales({search:N||void 0,productType:b!=="ALL"?b:void 0,paymentStatus:v!=="ALL"?v:void 0,orderStatus:P!=="ALL"?P:void 0,page:L,limit:50});k(t.sales||[]),z(t.summary),W(t.pagination)}catch(t){console.error(t)}finally{R(!1)}};o.useEffect(()=>{j()},[N,b,v,P,L]);const A=()=>{f.size===n.length&&n.length>0?g(new Set):g(new Set(n.map(t=>t.id)))},B=t=>{g(d=>{const s=new Set(d);return s.has(t)?s.delete(t):s.add(t),s})},F=async(t,d)=>{var s,p;if(window.confirm(`⚠️ Are you sure you want to delete invoice ${d}?`))try{await m.deleteSale(t),g(i=>{const a=new Set(i);return a.delete(t),a}),await j()}catch(i){alert(((p=(s=i==null?void 0:i.response)==null?void 0:s.data)==null?void 0:p.message)||"Delete failed")}},U=async()=>{var t,d;if(f.size!==0&&window.confirm(`⚠️ Are you sure you want to permanently delete the ${f.size} selected sales?`))try{await m.deleteSalesBatch(Array.from(f)),g(new Set),await j(),alert("✅ Selected sales deleted successfully.")}catch(s){alert(((d=(t=s==null?void 0:s.response)==null?void 0:t.data)==null?void 0:d.message)||"Delete batch failed")}},M=async()=>{var t,d;if(window.confirm("⚠️ WARNING: Are you sure you want to permanently delete ALL sales records from the database? This action cannot be undone."))try{await m.deleteAllSales(),g(new Set),await j(),alert("✅ All sales have been deleted successfully from the database.")}catch(s){alert(((d=(t=s==null?void 0:s.response)==null?void 0:t.data)==null?void 0:d.message)||"Delete all failed")}},V=()=>{if(!n||n.length===0)return;const t=["Invoice No","Sale Date","Customer Name","Country","Product Type","Description","Shape","Carat","Color","Clarity","Cut","Cert No","Supplier","Purchase Price","Selling Price","Discount","Final Sale Amount","Shipping Cost","GST %","GST Amount","Final Purchase Price","Gross Profit","Net Profit","Sales Person","Commission %","Commission Amount","Profit After Commission","Payment Status","Order Status","Tracking Number"],d=n.map(a=>[a.invoiceNo,a.saleDate?new Date(a.saleDate).toISOString().split("T")[0]:"",`"${a.customerName}"`,a.customerCountry||"",a.productType,`"${a.productDescription||""}"`,a.shape||"",a.caratWeight||"",a.diamondColor||"",a.clarity||"",a.cut||"",a.certificateNo||"",`"${a.supplierName||""}"`,a.purchasePrice,a.sellingPrice,a.discount,a.finalSaleAmount,a.shippingCost,a.gstPercent,a.gstAmount,a.finalPurchasePrice,a.grossProfit,a.netProfit,`"${a.salesPersonName||""}"`,a.commissionPercent,a.commissionAmount,a.profitAfterCommission,a.paymentStatus,a.orderStatus,a.trackingNumber||""]),s="data:text/csv;charset=utf-8,"+[t.join(","),...d.map(a=>a.join(","))].join(`
`),p=encodeURI(s),i=document.createElement("a");i.setAttribute("href",p),i.setAttribute("download",`sales_tracker_${new Date().toISOString().split("T")[0]}.csv`),document.body.appendChild(i),i.click(),document.body.removeChild(i)},q=()=>{if(!n||n.length===0)return;const t=["Invoice No","Sale Date","Customer Name","Customer Country","Product Type","Product Description","Stone Type","Shape","Diamond Color","Clarity","Cut","Polish","Symmetry","Fluorescence","Measurement","Price per Carat","Carat / Weight","Quantity","Certificate","Certificate No","Supplier","Purchase Price","Selling Price","Discount","Final Sale Amount","Shipping Cost","GST %","GST Amount","Final Purchase Price","Payment Status","Payment Method","Amount Received","Pending Amount","Gross Profit","Net Profit","Sales Person","Commission %","Commission Amount","Profit After Commission","Profit % (Markup)","Final Profit %","Order Status","Tracking Number","Tracking Link","Dollar Rate","Sale Month"],d=n.map(i=>[i.invoiceNo,i.saleDate?new Date(i.saleDate).toISOString().split("T")[0]:"",i.customerName||"",i.customerCountry||"",i.productType||"",i.productDescription||"",i.stoneType||"",i.shape||"",i.diamondColor||"",i.clarity||"",i.cut||"",i.polish||"",i.symmetry||"",i.fluorescence||"",i.measurement||"",i.pricePerCarat??"",i.caratWeight??"",i.quantity??1,i.certificate||"",i.certificateNo||"",i.supplierName||"",i.purchasePrice??0,i.sellingPrice??0,i.discount??0,i.finalSaleAmount??0,i.shippingCost??0,i.gstPercent??0,i.gstAmount??0,i.finalPurchasePrice??0,i.paymentStatus||"",i.paymentMethod||"",i.amountReceived??0,i.pendingAmount??0,i.grossProfit??0,i.netProfit??0,i.salesPersonName||"",i.commissionPercent??0,i.commissionAmount??0,i.profitAfterCommission??0,i.markupPercent??0,i.finalProfitPercent??0,i.orderStatus||"",i.trackingNumber||"",i.trackingLink||"",i.dollarRate??"",i.saleMonth||""]),s=K.aoa_to_sheet([t,...d]),p=K.book_new();K.book_append_sheet(p,s,"Sales Tracking"),Ie(p,`Sales_Tracker_Final_${new Date().toISOString().split("T")[0]}.xlsx`)};return e.jsxs("div",{children:[e.jsxs(_e,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Sales Management Tracker"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Authoritative financial tracking, 46-column spreadsheet ledger, commissions & margins"})]}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"},children:[f.size>0&&e.jsxs("button",{onClick:U,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#dc2626",color:"#ffffff",border:"none",borderRadius:6,fontSize:"0.82rem",fontWeight:700,cursor:"pointer"},children:[e.jsx(X,{size:14})," Delete Selected (",f.size,")"]}),e.jsxs("button",{onClick:M,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 12px",background:"#fff5f5",border:"1px solid #fca5a5",color:"#991b1b",borderRadius:6,fontSize:"0.82rem",fontWeight:600,cursor:"pointer"},title:"Purge all sales data from database",children:[e.jsx(X,{size:13,color:"#991b1b"})," Delete All Sales"]}),e.jsxs(O,{to:`${G}/import`,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#ffffff",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.82rem",fontWeight:600,color:"#0f172a",textDecoration:"none",cursor:"pointer"},children:[e.jsx(Ce,{size:14,color:"#2563eb"})," Import Excel / File"]}),e.jsxs("button",{onClick:q,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#ffffff",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.82rem",fontWeight:600,color:"#15803d",cursor:"pointer"},children:[e.jsx(ke,{size:14,color:"#15803d"})," Export Excel (.xlsx)"]}),e.jsxs("button",{onClick:V,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#ffffff",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.82rem",fontWeight:600,color:"#475569",cursor:"pointer"},children:[e.jsx(Ne,{size:14})," Export CSV"]}),e.jsxs(O,{to:`${G}/sales/new`,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 18px",background:"#0d1319",color:"#ffffff",borderRadius:6,textDecoration:"none",fontSize:"0.82rem",fontWeight:600},children:[e.jsx(we,{size:16})," New Sale Invoice"]})]})]}),e.jsxs(Be,{children:[e.jsxs(S,{children:[e.jsx("div",{className:"label",children:"Total Orders"}),e.jsx("div",{className:"val",children:(l==null?void 0:l.totalOrders)||0})]}),e.jsxs(S,{children:[e.jsx("div",{className:"label",children:"Total Revenue"}),e.jsxs("div",{className:"val",children:["$",u(l==null?void 0:l.totalRevenue)]})]}),e.jsxs(S,{children:[e.jsx("div",{className:"label",children:"Purchase Costs"}),e.jsxs("div",{className:"val",style:{color:"#475569"},children:["$",u(l==null?void 0:l.totalPurchaseCost)]})]}),e.jsxs(S,{children:[e.jsx("div",{className:"label",children:"Gross Profit"}),e.jsxs("div",{className:"val",children:["$",u(l==null?void 0:l.totalGrossProfit)]})]}),e.jsxs(S,{children:[e.jsx("div",{className:"label",children:"Net Profit"}),e.jsxs("div",{className:"val",style:{color:"#16a34a"},children:["$",u(l==null?void 0:l.totalNetProfit)]})]}),e.jsxs(S,{children:[e.jsx("div",{className:"label",children:"Commission Due"}),e.jsxs("div",{className:"val",style:{color:"#d97706"},children:["$",u(l==null?void 0:l.totalCommission)]})]}),e.jsxs(S,{children:[e.jsx("div",{className:"label",children:"Retained Profit"}),e.jsxs("div",{className:"val",style:{color:"#2563eb"},children:["$",u(l==null?void 0:l.totalProfitAfterCommission)]})]})]}),e.jsxs(Ue,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,background:"#f8fafc",padding:"6px 10px",borderRadius:6,border:"1px solid #cbd5e1",flex:1,minWidth:200},children:[e.jsx(De,{size:14,color:"#64748b"}),e.jsx("input",{type:"text",placeholder:"Search invoice, client, stone, certificate...",value:N,onChange:t=>T(t.target.value),style:{border:"none",background:"transparent",outline:"none",fontSize:"0.82rem",width:"100%"}})]}),e.jsxs("select",{value:b,onChange:t=>w(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Product Types"}),e.jsx("option",{value:"Diamond",children:"Diamond Only"}),e.jsx("option",{value:"Jewelry",children:"Jewelry Only"})]}),e.jsxs("select",{value:v,onChange:t=>$(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Payment Statuses"}),e.jsx("option",{value:"Paid",children:"Paid"}),e.jsx("option",{value:"Partial",children:"Partial"}),e.jsx("option",{value:"Pending",children:"Pending"})]}),e.jsxs("select",{value:P,onChange:t=>I(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Order Statuses"}),e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"})]})]}),e.jsx(Ve,{children:e.jsxs(qe,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"sticky-col-chk",children:e.jsx("input",{type:"checkbox",checked:n.length>0&&f.size===n.length,onChange:A,style:{cursor:"pointer"}})}),e.jsx("th",{className:"sticky-col-inv",children:"Invoice No"}),e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Customer"}),e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Description / Shape"}),e.jsx("th",{children:"Carat"}),e.jsx("th",{children:"Color/Clarity"}),e.jsx("th",{children:"Cert #"}),e.jsx("th",{children:"Supplier"}),e.jsx("th",{children:"Selling Price"}),e.jsx("th",{children:"Final Sale"}),e.jsx("th",{children:"Purchase Price"}),e.jsx("th",{children:"GST"}),e.jsx("th",{children:"Final Purchase"}),e.jsx("th",{children:"Gross Profit"}),e.jsx("th",{children:"Net Profit"}),e.jsx("th",{children:"Sales Person"}),e.jsx("th",{children:"Comm %"}),e.jsx("th",{children:"Comm ($)"}),e.jsx("th",{children:"Retained Profit"}),e.jsx("th",{children:"Markup %"}),e.jsx("th",{children:"Payment"}),e.jsx("th",{children:"Order Status"}),e.jsx("th",{children:"Tracking"}),e.jsx("th",{children:"Dollar Rate"}),e.jsx("th",{style:{textAlign:"right"},children:"Actions"})]})}),e.jsxs("tbody",{children:[n.map(t=>{const d=f.has(t.id);return e.jsxs("tr",{style:{background:d?"#f0fdf4":void 0},children:[e.jsx("td",{className:"sticky-col-chk",children:e.jsx("input",{type:"checkbox",checked:d,onChange:()=>B(t.id),style:{cursor:"pointer"}})}),e.jsx("td",{className:"sticky-col-inv",children:e.jsx(O,{to:`${G}/sales/${t.id}`,style:{color:"#0d1319",textDecoration:"none"},children:t.invoiceNo})}),e.jsx("td",{children:t.saleDate?new Date(t.saleDate).toLocaleDateString():"-"}),e.jsx("td",{style:{fontWeight:600},children:t.customerName}),e.jsx("td",{children:t.customerCountry||"-"}),e.jsx("td",{children:e.jsx(Q,{$type:t.productType,children:t.productType})}),e.jsx("td",{children:t.productDescription||t.shape||"-"}),e.jsx("td",{children:t.caratWeight?`${t.caratWeight} ct`:"-"}),e.jsx("td",{children:t.diamondColor?`${t.diamondColor} / ${t.clarity||""}`:"-"}),e.jsx("td",{children:t.certificateNo||"-"}),e.jsx("td",{children:t.supplierName||"None"}),e.jsxs("td",{children:["$",u(t.sellingPrice)]}),e.jsxs("td",{style:{fontWeight:700},children:["$",u(t.finalSaleAmount)]}),e.jsxs("td",{children:["$",u(t.purchasePrice)]}),e.jsxs("td",{children:["$",u(t.gstAmount)]}),e.jsxs("td",{children:["$",u(t.finalPurchasePrice)]}),e.jsxs("td",{children:["$",u(t.grossProfit)]}),e.jsxs("td",{style:{fontWeight:700,color:(Number(t.netProfit)||0)>=0?"#16a34a":"#dc2626"},children:["$",u(t.netProfit)]}),e.jsx("td",{children:t.salesPersonName||"-"}),e.jsxs("td",{children:[((Number(t.commissionPercent)||0)*100).toFixed(1),"%"]}),e.jsxs("td",{style:{color:"#d97706",fontWeight:600},children:["$",u(t.commissionAmount)]}),e.jsxs("td",{style:{fontWeight:700},children:["$",u(t.profitAfterCommission)]}),e.jsxs("td",{children:[((Number(t.markupPercent)||0)*100).toFixed(1),"%"]}),e.jsx("td",{children:e.jsx(Q,{$type:t.paymentStatus,children:t.paymentStatus})}),e.jsx("td",{children:e.jsx(Q,{$type:t.orderStatus,children:t.orderStatus})}),e.jsx("td",{children:t.trackingNumber?t.trackingLink?e.jsxs("a",{href:t.trackingLink,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:2,color:"#2563eb"},children:[t.trackingNumber," ",e.jsx(Ae,{size:10})]}):t.trackingNumber:"-"}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("input",{type:"number",step:"0.01",defaultValue:t.dollarRate?Number(t.dollarRate).toFixed(2):"94.55",onBlur:async s=>{const p=Number(s.target.value);if(p&&p!==Number(t.dollarRate))try{await m.updateDollarRate(t.id,p)}catch(i){console.error("Failed to update dollar rate",i)}},onKeyDown:s=>{s.key==="Enter"&&s.target.blur()},style:{width:72,padding:"3px 6px",border:"1px solid #cbd5e1",borderRadius:4,fontSize:"0.78rem",background:"#ffffff",textAlign:"center",fontWeight:600,color:"#0f172a"}})}),e.jsx("td",{style:{textAlign:"right"},children:e.jsxs("div",{style:{display:"inline-flex",gap:6},children:[e.jsx(O,{to:`${G}/sales/${t.id}`,children:e.jsx("button",{style:{background:"none",border:"1px solid #e2e8f0",padding:"4px 8px",borderRadius:4,cursor:"pointer"},title:"View Sale Detail",children:e.jsx(ze,{size:12})})}),e.jsx("button",{onClick:()=>C(t),style:{background:"none",border:"1px solid #e2e8f0",padding:"4px 8px",borderRadius:4,cursor:"pointer",color:"#0f172a"},title:"Edit Sale Invoice",children:e.jsx(Re,{size:12})}),e.jsx("button",{onClick:()=>F(t.id,t.invoiceNo),style:{background:"none",border:"1px solid #fee2e2",color:"#dc2626",padding:"4px 8px",borderRadius:4,cursor:"pointer"},title:"Delete Sale Invoice",children:e.jsx(X,{size:12})})]})})]},t.id)}),n.length===0&&!_&&e.jsx("tr",{children:e.jsx("td",{colSpan:28,style:{textAlign:"center",padding:"40px",color:"#94a3b8"},children:'No sales found in the database. Click "Import Excel / File" or "New Sale Invoice" to add records.'})})]})]})}),h&&h.totalPages>1&&e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:10,marginTop:16},children:[e.jsxs("span",{style:{fontSize:"0.8rem",color:"#64748b"},children:["Page ",h.page," of ",h.totalPages," (",h.total," total)"]}),e.jsx("button",{onClick:()=>D(t=>Math.max(1,t-1)),disabled:h.page===1,style:{padding:"6px 12px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6,cursor:"pointer"},children:e.jsx(Te,{size:14})}),e.jsx("button",{onClick:()=>D(t=>Math.min(h.totalPages,t+1)),disabled:h.page===h.totalPages,style:{padding:"6px 12px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6,cursor:"pointer"},children:e.jsx($e,{size:14})})]}),E&&e.jsx(Ge,{sale:E,onClose:()=>C(null),onSuccess:()=>{C(null),j()}})]})};export{rt as BusinessSalesListPage};
