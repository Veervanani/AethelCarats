import{as as S,u as v,r as x,j as e,f as A,at as P,aX as C,ag as k,w,am as D,G as z,y as L}from"./react-vendor-I9PV_paW.js";import{g as a}from"./ui-vendor-D75S3wy_.js";import{P as h}from"./admin-pages-DeXXMrNX.js";import{b as o}from"./businessApi-KDpAhwmS.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const I=a.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,T=a.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
`,R=a.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 2px solid #0d1319;
  margin-bottom: 24px;

  .brand {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #0d1319;
  }
  .sub {
    font-size: 0.75rem;
    color: #64748b;
    letter-spacing: 0.05em;
  }

  .inv-title {
    font-size: 1.4rem;
    font-weight: 800;
    color: #0f172a;
    text-align: right;
  }
`,W=a.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`,g=a.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;

  .box-title {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #475569;
    letter-spacing: 0.06em;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`,i=a.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  padding: 4px 0;

  .label {
    color: #64748b;
  }
  .val {
    color: #0f172a;
    font-weight: 600;
  }
`,E=a.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;
  margin-top: 10px;

  th {
    background: #0d1319;
    color: #ffffff;
    padding: 10px 14px;
    text-align: left;
  }

  td {
    padding: 10px 14px;
    border-bottom: 1px solid #e2e8f0;
  }

  .total-row {
    background: #f1f5f9;
    font-weight: 700;
    font-size: 0.9rem;
  }

  .profit-row {
    background: #ebfbee;
    color: #2b8a3e;
    font-weight: 800;
    font-size: 0.95rem;
  }
`,H=()=>{const{id:c}=S(),f=v(),[s,j]=x.useState(null),[u,p]=x.useState(!0),d=async()=>{if(c){p(!0);try{const t=await o.getSaleById(c),r=(t==null?void 0:t.sale)||t;j(r)}catch(t){console.error(t)}finally{p(!1)}}};x.useEffect(()=>{d()},[c]);const b=async()=>{var t,r;if(!(!s||!window.confirm(`Delete invoice ${s.invoiceNo}?`)))try{await o.deleteSale(s.id),alert("Sale deleted"),f(`${h}/sales`)}catch(n){alert(((r=(t=n==null?void 0:n.response)==null?void 0:t.data)==null?void 0:r.message)||"Delete failed")}},y=async()=>{var t,r,n;if((t=s==null?void 0:s.commission)!=null&&t.id)try{await o.approveCommission(s.commission.id),alert("✅ Commission approved!"),d()}catch(l){alert(((n=(r=l==null?void 0:l.response)==null?void 0:r.data)==null?void 0:n.message)||"Approval failed")}},N=async()=>{var r,n,l;if(!((r=s==null?void 0:s.commission)!=null&&r.id))return;const t=prompt("Enter payment reference (e.g. Wire Ref # / Check #):","Bank Transfer");if(t)try{await o.payCommission(s.commission.id,t),alert("✅ Commission marked as paid!"),d()}catch(m){alert(((l=(n=m==null?void 0:m.response)==null?void 0:n.data)==null?void 0:l.message)||"Payout update failed")}};return u?e.jsx("div",{style:{padding:40,textAlign:"center"},children:"Loading Invoice Record..."}):s?e.jsxs("div",{children:[e.jsxs(I,{children:[e.jsxs(A,{to:`${h}/sales`,style:{display:"inline-flex",alignItems:"center",gap:6,fontSize:"0.8rem",color:"#64748b",textDecoration:"none"},children:[e.jsx(P,{size:14})," Back to Sales Tracker"]}),e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsxs("button",{onClick:()=>window.print(),style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6,fontSize:"0.82rem",fontWeight:600,cursor:"pointer"},children:[e.jsx(C,{size:14})," Print Invoice"]}),e.jsxs("button",{onClick:b,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",border:"1px solid #fee2e2",background:"#fff5f5",color:"#dc2626",borderRadius:6,fontSize:"0.82rem",fontWeight:600,cursor:"pointer"},children:[e.jsx(k,{size:14})," Delete"]})]})]}),e.jsxs(T,{children:[e.jsxs(R,{children:[e.jsxs("div",{children:[e.jsx("div",{className:"brand",children:"AURA DIAMOND ATELIER"}),e.jsx("div",{className:"sub",children:"FINE JEWELLERY & HIGH ATELIER OPERATIONS"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"inv-title",children:s.invoiceNo||"INV-####"}),e.jsxs("div",{style:{fontSize:"0.8rem",color:"#64748b",textAlign:"right"},children:["Date: ",s.saleDate?isNaN(new Date(s.saleDate).getTime())?s.saleDate:new Date(s.saleDate).toLocaleDateString():"-"]}),s.orderStatus&&e.jsx("div",{style:{marginTop:6,textAlign:"right"},children:e.jsx("span",{style:{fontSize:"0.75rem",padding:"3px 8px",background:"#0d1319",color:"#fff",borderRadius:4,fontWeight:700},children:s.orderStatus})})]})]}),e.jsxs(W,{children:[e.jsxs(g,{children:[e.jsxs("div",{className:"box-title",children:[e.jsx(w,{size:14,color:"#0d1319"})," Customer & Shipping"]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Customer:"}),e.jsx("span",{className:"val",children:s.customerName||"-"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Country:"}),e.jsx("span",{className:"val",children:s.customerCountry||"-"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Sales Person:"}),e.jsx("span",{className:"val",children:s.salesPersonName||"-"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Payment Status:"}),e.jsx("span",{className:"val",style:{color:s.paymentStatus==="Paid"?"#16a34a":"#d97706"},children:s.paymentStatus||"Pending"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Payment Method:"}),e.jsx("span",{className:"val",children:s.paymentMethod||"Bank Wire"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Tracking:"}),e.jsx("span",{className:"val",children:s.trackingNumber?s.trackingLink?e.jsxs("a",{href:s.trackingLink,target:"_blank",rel:"noreferrer",style:{color:"#2563eb"},children:[s.trackingNumber," ",e.jsx(D,{size:10})]}):s.trackingNumber:"-"})]})]}),e.jsxs(g,{children:[e.jsxs("div",{className:"box-title",children:[e.jsx(z,{size:14,color:"#e2b96f"})," Item Specifications (",s.productType||"Item",")"]}),s.productType==="Diamond"?e.jsxs(e.Fragment,{children:[e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Type / Shape:"}),e.jsxs("span",{className:"val",children:[s.stoneType||"Natural"," ",s.shape||"-"]})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Carat Weight:"}),e.jsx("span",{className:"val",children:s.caratWeight?`${s.caratWeight} ct`:"-"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Color / Clarity:"}),e.jsxs("span",{className:"val",children:[s.diamondColor||"-"," / ",s.clarity||"-"]})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Cut / Polish / Symm:"}),e.jsxs("span",{className:"val",children:[s.cut||"-"," / ",s.polish||"-"," / ",s.symmetry||"-"]})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Fluorescence:"}),e.jsx("span",{className:"val",children:s.fluorescence||"None"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Certificate:"}),e.jsxs("span",{className:"val",children:[s.certificate||"-"," ",s.certificateNo?`#${s.certificateNo}`:""]})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Measurements:"}),e.jsx("span",{className:"val",children:s.measurement||"-"})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Description:"}),e.jsx("span",{className:"val",children:s.productDescription||"-"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Quantity:"}),e.jsx("span",{className:"val",children:s.quantity||1})]})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Supplier:"}),e.jsx("span",{className:"val",children:s.supplierName||"None"})]})]})]}),e.jsx("h3",{style:{fontSize:"0.95rem",fontWeight:700,margin:"24px 0 10px 0"},children:"Authoritative Financial Ledger"}),e.jsxs(E,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Financial Component"}),e.jsx("th",{children:"Calculation Rule"}),e.jsx("th",{style:{textAlign:"right"},children:"Amount (USD)"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Gross Selling Price"}),e.jsx("td",{style:{color:"#64748b"},children:"Original quoted catalog price"}),e.jsxs("td",{style:{textAlign:"right",fontWeight:600},children:["$",(Number(s.sellingPrice)||0).toLocaleString()]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Discount Applied"}),e.jsx("td",{style:{color:"#64748b"},children:"Customer negotiated reduction"}),e.jsxs("td",{style:{textAlign:"right",color:"#dc2626"},children:["-$",(Number(s.discount)||0).toLocaleString()]})]}),e.jsxs("tr",{className:"total-row",children:[e.jsx("td",{children:"Final Sale Amount (Net Billed)"}),e.jsx("td",{children:"Selling Price - Discount"}),e.jsxs("td",{style:{textAlign:"right"},children:["$",(Number(s.finalSaleAmount)||0).toLocaleString()]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Base Purchase Cost"}),e.jsx("td",{style:{color:"#64748b"},children:"Atelier / Supplier procurement cost"}),e.jsxs("td",{style:{textAlign:"right"},children:["$",(Number(s.purchasePrice)||0).toLocaleString()]})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:["GST (",((Number(s.gstPercent)||0)*100).toFixed(2),"%)"]}),e.jsx("td",{style:{color:"#64748b"},children:"Purchase Price × GST %"}),e.jsxs("td",{style:{textAlign:"right"},children:["+$",(Number(s.gstAmount)||0).toLocaleString()]})]}),e.jsxs("tr",{className:"total-row",children:[e.jsx("td",{children:"Final Purchase Cost (COGS)"}),e.jsx("td",{children:"Purchase Price + GST Amount"}),e.jsxs("td",{style:{textAlign:"right"},children:["$",(Number(s.finalPurchasePrice)||0).toLocaleString()]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Shipping / Logistics Cost"}),e.jsx("td",{style:{color:"#64748b"},children:"Courier, Armored Freight & Insurance"}),e.jsxs("td",{style:{textAlign:"right",color:"#dc2626"},children:["-$",(Number(s.shippingCost)||0).toLocaleString()]})]}),e.jsxs("tr",{className:"profit-row",children:[e.jsx("td",{children:"Net Profit Generated"}),e.jsx("td",{children:"Final Sale - Final Purchase - Shipping"}),e.jsxs("td",{style:{textAlign:"right"},children:["$",(Number(s.netProfit)||0).toLocaleString()]})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:["Sales Commission (",((Number(s.commissionPercent)||0)*100).toFixed(1),"%)"]}),e.jsx("td",{style:{color:"#64748b"},children:"Net Profit × Commission %"}),e.jsxs("td",{style:{textAlign:"right",color:"#d97706",fontWeight:700},children:["-$",(Number(s.commissionAmount)||0).toLocaleString()]})]}),e.jsxs("tr",{style:{background:"#f8fafc",fontWeight:800},children:[e.jsx("td",{children:"Profit Retained by Aura Diamond Atelier"}),e.jsx("td",{children:"Net Profit - Commission Amount"}),e.jsxs("td",{style:{textAlign:"right",color:"#0d1319",fontSize:"1rem"},children:["$",(Number(s.profitAfterCommission)||0).toLocaleString()]})]})]})]}),s.commission&&e.jsxs("div",{style:{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,padding:16,marginTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.75rem",fontWeight:700,color:"#64748b",textTransform:"uppercase"},children:"Commission Workflow Status"}),e.jsxs("div",{style:{fontSize:"1rem",fontWeight:800,color:"#0f172a",display:"flex",alignItems:"center",gap:6,marginTop:2},children:[e.jsx(L,{size:16,color:"#d97706"}),"$",s.commission.commissionAmount.toLocaleString()," (",s.commission.status,")"]}),s.commission.approvedBy&&e.jsxs("div",{style:{fontSize:"0.72rem",color:"#64748b",marginTop:2},children:["Approved by ",s.commission.approvedBy," on ",new Date(s.commission.approvedAt).toLocaleDateString()]})]}),e.jsxs("div",{style:{display:"flex",gap:10},children:[s.commission.status==="PENDING"&&e.jsx("button",{onClick:y,style:{padding:"8px 16px",background:"#2563eb",color:"#fff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.8rem",cursor:"pointer"},children:"Approve Commission"}),s.commission.status==="APPROVED"&&e.jsx("button",{onClick:N,style:{padding:"8px 16px",background:"#16a34a",color:"#fff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.8rem",cursor:"pointer"},children:"Mark as Paid"})]})]})]})]}):e.jsx("div",{style:{padding:40,textAlign:"center"},children:"Invoice not found."})};export{H as BusinessSaleDetailPage};
