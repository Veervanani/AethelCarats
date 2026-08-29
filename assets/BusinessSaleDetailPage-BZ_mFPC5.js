import{ap as D,u as I,r as p,j as e,f as W,aq as E,aW as R,ad as F,x as $,aj as B,a1 as G,aP as O}from"./react-vendor-BXyx942q.js";import{g as a}from"./ui-vendor-VHkRGmvp.js";import{P}from"./admin-pages-CpQOasEv.js";import{b as o}from"./businessApi-DCLK4cxV.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const H=a.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,M=a.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
`,q=a.div`
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
`,J=a.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`,A=a.div`
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
`,_=a.table`
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
`,Z=()=>{var h,g,f,j,u,b,y,S,v,N;const{id:c}=D(),C=I(),[s,k]=p.useState(null),[w,m]=p.useState(!0),d=async()=>{if(c){m(!0);try{const t=await o.getSaleById(c);k(t)}catch(t){console.error(t)}finally{m(!1)}}};p.useEffect(()=>{d()},[c]);const z=async()=>{var t,n;if(!(!s||!window.confirm(`Delete invoice ${s.invoiceNo}?`)))try{await o.deleteSale(s.id),alert("Sale deleted"),C(`${P}/sales`)}catch(r){alert(((n=(t=r==null?void 0:r.response)==null?void 0:t.data)==null?void 0:n.message)||"Delete failed")}},L=async()=>{var t,n,r;if((t=s==null?void 0:s.commission)!=null&&t.id)try{await o.approveCommission(s.commission.id),alert("✅ Commission approved!"),d()}catch(l){alert(((r=(n=l==null?void 0:l.response)==null?void 0:n.data)==null?void 0:r.message)||"Approval failed")}},T=async()=>{var n,r,l;if(!((n=s==null?void 0:s.commission)!=null&&n.id))return;const t=prompt("Enter payment reference (e.g. Wire Ref # / Check #):","Bank Transfer");if(t)try{await o.payCommission(s.commission.id,t),alert("✅ Commission marked as paid!"),d()}catch(x){alert(((l=(r=x==null?void 0:x.response)==null?void 0:r.data)==null?void 0:l.message)||"Payout update failed")}};return w?e.jsx("div",{style:{padding:40,textAlign:"center"},children:"Loading Invoice Record..."}):s?e.jsxs("div",{children:[e.jsxs(H,{children:[e.jsxs(W,{to:`${P}/sales`,style:{display:"inline-flex",alignItems:"center",gap:6,fontSize:"0.8rem",color:"#64748b",textDecoration:"none"},children:[e.jsx(E,{size:14})," Back to Sales Tracker"]}),e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsxs("button",{onClick:()=>window.print(),style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6,fontSize:"0.82rem",fontWeight:600,cursor:"pointer"},children:[e.jsx(R,{size:14})," Print Invoice"]}),e.jsxs("button",{onClick:z,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",border:"1px solid #fee2e2",background:"#fff5f5",color:"#dc2626",borderRadius:6,fontSize:"0.82rem",fontWeight:600,cursor:"pointer"},children:[e.jsx(F,{size:14})," Delete"]})]})]}),e.jsxs(M,{children:[e.jsxs(q,{children:[e.jsxs("div",{children:[e.jsx("div",{className:"brand",children:"FLOKSY JEWEL"}),e.jsx("div",{className:"sub",children:"FINE JEWELLERY & HIGH ATELIER OPERATIONS"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"inv-title",children:s.invoiceNo}),e.jsxs("div",{style:{fontSize:"0.8rem",color:"#64748b",textAlign:"right"},children:["Date: ",new Date(s.saleDate).toLocaleDateString()]}),e.jsx("div",{style:{marginTop:6,textAlign:"right"},children:e.jsx("span",{style:{fontSize:"0.75rem",padding:"3px 8px",background:"#0d1319",color:"#fff",borderRadius:4,fontWeight:700},children:s.orderStatus})})]})]}),e.jsxs(J,{children:[e.jsxs(A,{children:[e.jsxs("div",{className:"box-title",children:[e.jsx($,{size:14,color:"#0d1319"})," Customer & Shipping"]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Customer:"}),e.jsx("span",{className:"val",children:s.customerName})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Country:"}),e.jsx("span",{className:"val",children:s.customerCountry||"-"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Sales Person:"}),e.jsx("span",{className:"val",children:s.salesPersonName||"-"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Payment Status:"}),e.jsx("span",{className:"val",style:{color:s.paymentStatus==="Paid"?"#16a34a":"#d97706"},children:s.paymentStatus})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Payment Method:"}),e.jsx("span",{className:"val",children:s.paymentMethod||"Bank Wire"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Tracking:"}),e.jsx("span",{className:"val",children:s.trackingNumber?s.trackingLink?e.jsxs("a",{href:s.trackingLink,target:"_blank",rel:"noreferrer",style:{color:"#2563eb"},children:[s.trackingNumber," ",e.jsx(B,{size:10})]}):s.trackingNumber:"-"})]})]}),e.jsxs(A,{children:[e.jsxs("div",{className:"box-title",children:[e.jsx(G,{size:14,color:"#e2b96f"})," Item Specifications (",s.productType,")"]}),s.productType==="Diamond"?e.jsxs(e.Fragment,{children:[e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Type / Shape:"}),e.jsxs("span",{className:"val",children:[s.stoneType||"Natural"," ",s.shape]})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Carat Weight:"}),e.jsx("span",{className:"val",children:s.caratWeight?`${s.caratWeight} ct`:"-"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Color / Clarity:"}),e.jsxs("span",{className:"val",children:[s.diamondColor," / ",s.clarity]})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Cut / Polish / Symm:"}),e.jsxs("span",{className:"val",children:[s.cut," / ",s.polish," / ",s.symmetry]})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Fluorescence:"}),e.jsx("span",{className:"val",children:s.fluorescence||"None"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Certificate:"}),e.jsxs("span",{className:"val",children:[s.certificate," ",s.certificateNo?`#${s.certificateNo}`:""]})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Measurements:"}),e.jsx("span",{className:"val",children:s.measurement||"-"})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Description:"}),e.jsx("span",{className:"val",children:s.productDescription||"-"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Quantity:"}),e.jsx("span",{className:"val",children:s.quantity||1})]})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Supplier:"}),e.jsx("span",{className:"val",children:s.supplierName||"None"})]})]})]}),e.jsx("h3",{style:{fontSize:"0.95rem",fontWeight:700,margin:"24px 0 10px 0"},children:"Authoritative Financial Ledger"}),e.jsxs(_,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Financial Component"}),e.jsx("th",{children:"Calculation Rule"}),e.jsx("th",{style:{textAlign:"right"},children:"Amount (USD)"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Gross Selling Price"}),e.jsx("td",{style:{color:"#64748b"},children:"Original quoted catalog price"}),e.jsxs("td",{style:{textAlign:"right",fontWeight:600},children:["$",(h=s.sellingPrice)==null?void 0:h.toLocaleString()]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Discount Applied"}),e.jsx("td",{style:{color:"#64748b"},children:"Customer negotiated reduction"}),e.jsxs("td",{style:{textAlign:"right",color:"#dc2626"},children:["-$",(g=s.discount)==null?void 0:g.toLocaleString()]})]}),e.jsxs("tr",{className:"total-row",children:[e.jsx("td",{children:"Final Sale Amount (Net Billed)"}),e.jsx("td",{children:"Selling Price - Discount"}),e.jsxs("td",{style:{textAlign:"right"},children:["$",(f=s.finalSaleAmount)==null?void 0:f.toLocaleString()]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Base Purchase Cost"}),e.jsx("td",{style:{color:"#64748b"},children:"Atelier / Supplier procurement cost"}),e.jsxs("td",{style:{textAlign:"right"},children:["$",(j=s.purchasePrice)==null?void 0:j.toLocaleString()]})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:["GST (",(s.gstPercent*100).toFixed(2),"%)"]}),e.jsx("td",{style:{color:"#64748b"},children:"Purchase Price × GST %"}),e.jsxs("td",{style:{textAlign:"right"},children:["+$",(u=s.gstAmount)==null?void 0:u.toLocaleString()]})]}),e.jsxs("tr",{className:"total-row",children:[e.jsx("td",{children:"Final Purchase Cost (COGS)"}),e.jsx("td",{children:"Purchase Price + GST Amount"}),e.jsxs("td",{style:{textAlign:"right"},children:["$",(b=s.finalPurchasePrice)==null?void 0:b.toLocaleString()]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Shipping / Logistics Cost"}),e.jsx("td",{style:{color:"#64748b"},children:"Courier, Armored Freight & Insurance"}),e.jsxs("td",{style:{textAlign:"right",color:"#dc2626"},children:["-$",(y=s.shippingCost)==null?void 0:y.toLocaleString()]})]}),e.jsxs("tr",{className:"profit-row",children:[e.jsx("td",{children:"Net Profit Generated"}),e.jsx("td",{children:"Final Sale - Final Purchase - Shipping"}),e.jsxs("td",{style:{textAlign:"right"},children:["$",(S=s.netProfit)==null?void 0:S.toLocaleString()]})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:["Sales Commission (",(s.commissionPercent*100).toFixed(1),"%)"]}),e.jsx("td",{style:{color:"#64748b"},children:"Net Profit × Commission %"}),e.jsxs("td",{style:{textAlign:"right",color:"#d97706",fontWeight:700},children:["-$",(v=s.commissionAmount)==null?void 0:v.toLocaleString()]})]}),e.jsxs("tr",{style:{background:"#f8fafc",fontWeight:800},children:[e.jsx("td",{children:"Profit Retained by Floksy Jewel"}),e.jsx("td",{children:"Net Profit - Commission Amount"}),e.jsxs("td",{style:{textAlign:"right",color:"#0d1319",fontSize:"1rem"},children:["$",(N=s.profitAfterCommission)==null?void 0:N.toLocaleString()]})]})]})]}),s.commission&&e.jsxs("div",{style:{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,padding:16,marginTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.75rem",fontWeight:700,color:"#64748b",textTransform:"uppercase"},children:"Commission Workflow Status"}),e.jsxs("div",{style:{fontSize:"1rem",fontWeight:800,color:"#0f172a",display:"flex",alignItems:"center",gap:6,marginTop:2},children:[e.jsx(O,{size:16,color:"#d97706"}),"$",s.commission.commissionAmount.toLocaleString()," (",s.commission.status,")"]}),s.commission.approvedBy&&e.jsxs("div",{style:{fontSize:"0.72rem",color:"#64748b",marginTop:2},children:["Approved by ",s.commission.approvedBy," on ",new Date(s.commission.approvedAt).toLocaleDateString()]})]}),e.jsxs("div",{style:{display:"flex",gap:10},children:[s.commission.status==="PENDING"&&e.jsx("button",{onClick:L,style:{padding:"8px 16px",background:"#2563eb",color:"#fff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.8rem",cursor:"pointer"},children:"Approve Commission"}),s.commission.status==="APPROVED"&&e.jsx("button",{onClick:T,style:{padding:"8px 16px",background:"#16a34a",color:"#fff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.8rem",cursor:"pointer"},children:"Mark as Paid"})]})]})]})]}):e.jsx("div",{style:{padding:40,textAlign:"center"},children:"Invoice not found."})};export{Z as BusinessSaleDetailPage};
