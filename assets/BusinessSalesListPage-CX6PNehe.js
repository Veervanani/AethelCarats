import{r as n,j as e,f as g,b8 as F,_,ae as E,P as O,k as G,aj as M,i as U,ad as B,l as J,m as V}from"./react-vendor-BXyx942q.js";import{g as d}from"./ui-vendor-VHkRGmvp.js";import{u as b,w as H}from"./admin-tools-vendor-CKN5doRT.js";import{P as m}from"./admin-pages-DwNSPdti.js";import{b as C}from"./businessApi--A-SxsaW.js";import"./swiper-vendor-B7SuwHD8.js";const q=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
`,Q=d.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
`,c=d.div`
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
`,K=d.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`,X=d.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  scrollbar-width: thin;
`,Y=d.table`
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

  .sticky-col {
    position: sticky;
    left: 0;
    background: #ffffff;
    z-index: 5;
    font-weight: 700;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.04);
  }

  tr:hover .sticky-col {
    background: #f8fafc;
  }
`,S=d.span`
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;

  ${({$type:a})=>{switch(a){case"Paid":return"background: #ebfbee; color: #2b8a3e;";case"Partial":return"background: #fff9db; color: #f59f00;";case"Pending":case"Unpaid":return"background: #fff5f5; color: #e03131;";case"Delivered":return"background: #e7f5ff; color: #1c7ed6;";case"Diamond":return"background: #fff3bf; color: #d97706;";case"Jewelry":return"background: #f3f0ff; color: #7950f2;";default:return"background: #f1f5f9; color: #64748b;"}}}
`,ne=()=>{const[a,N]=n.useState([]),[o,A]=n.useState(null),[w,y]=n.useState(!0),[j,L]=n.useState(""),[x,D]=n.useState("ALL"),[f,T]=n.useState("ALL"),[u,$]=n.useState("ALL"),[P,v]=n.useState(1),[s,z]=n.useState(null),k=async()=>{y(!0);try{const t=await C.getSales({search:j||void 0,productType:x!=="ALL"?x:void 0,paymentStatus:f!=="ALL"?f:void 0,orderStatus:u!=="ALL"?u:void 0,page:P,limit:25});N(t.sales||[]),A(t.summary),z(t.pagination)}catch(t){console.error(t)}finally{y(!1)}};n.useEffect(()=>{k()},[j,x,f,u,P]);const R=async(t,h)=>{var p,l;if(window.confirm(`Are you sure you want to delete invoice ${h}?`))try{await C.deleteSale(t),k()}catch(r){alert(((l=(p=r==null?void 0:r.response)==null?void 0:p.data)==null?void 0:l.message)||"Delete failed")}},I=()=>{if(!a||a.length===0)return;const t=["Invoice No","Sale Date","Customer Name","Country","Product Type","Description","Shape","Carat","Color","Clarity","Cut","Cert No","Supplier","Purchase Price","Selling Price","Discount","Final Sale Amount","Shipping Cost","GST %","GST Amount","Final Purchase Price","Gross Profit","Net Profit","Sales Person","Commission %","Commission Amount","Profit After Commission","Payment Status","Order Status","Tracking Number"],h=a.map(i=>[i.invoiceNo,new Date(i.saleDate).toISOString().split("T")[0],`"${i.customerName}"`,i.customerCountry||"",i.productType,`"${i.productDescription||""}"`,i.shape||"",i.caratWeight||"",i.diamondColor||"",i.clarity||"",i.cut||"",i.certificateNo||"",`"${i.supplierName||""}"`,i.purchasePrice,i.sellingPrice,i.discount,i.finalSaleAmount,i.shippingCost,i.gstPercent,i.gstAmount,i.finalPurchasePrice,i.grossProfit,i.netProfit,`"${i.salesPersonName||""}"`,i.commissionPercent,i.commissionAmount,i.profitAfterCommission,i.paymentStatus,i.orderStatus,i.trackingNumber||""]),p="data:text/csv;charset=utf-8,"+[t.join(","),...h.map(i=>i.join(","))].join(`
`),l=encodeURI(p),r=document.createElement("a");r.setAttribute("href",l),r.setAttribute("download",`floksy_sales_tracker_${Date.now()}.csv`),document.body.appendChild(r),r.click(),document.body.removeChild(r)},W=()=>{if(a.length===0){alert("No sales to export");return}const t=["Invoice No","Sale Date","Customer Name","Customer Country","Product Type","Product Description","Stone Type","Shape","Diamond Color","Clarity","Cut","Polish","Symmetry","Fluorescence","Measurement","Price per Carat ","Carat / Weight","Quantity","Certificate","Certificate No","Supplier ","Purchase Price ","Selling Price ","Discount ","Final Sale Amount ","Shipping Cost ","GST %","GST Amount","Final Purchase Price","Payment Status","Payment Method","Amount Received ","Pending Amount","Gross Profit","Net Profit","Sales Person","Commission %","Commission Amount","Profit After Commission","Profit % (Markup)","Final Profit %","Order Status","Tracking Number","Tracking Link","Dollar Rate","Sale Month"],h=a.map(r=>[r.invoiceNo,r.saleDate?new Date(r.saleDate).toISOString().split("T")[0]:"",r.customerName||"",r.customerCountry||"",r.productType||"",r.productDescription||"",r.stoneType||"",r.shape||"",r.diamondColor||"",r.clarity||"",r.cut||"",r.polish||"",r.symmetry||"",r.fluorescence||"",r.measurement||"",r.pricePerCarat??"",r.caratWeight??"",r.quantity??1,r.certificate||"",r.certificateNo||"",r.supplierName||"",r.purchasePrice??0,r.sellingPrice??0,r.discount??0,r.finalSaleAmount??0,r.shippingCost??0,r.gstPercent??0,r.gstAmount??0,r.finalPurchasePrice??0,r.paymentStatus||"",r.paymentMethod||"",r.amountReceived??0,r.pendingAmount??0,r.grossProfit??0,r.netProfit??0,r.salesPersonName||"",r.commissionPercent??0,r.commissionAmount??0,r.profitAfterCommission??0,r.markupPercent??0,r.finalProfitPercent??0,r.orderStatus||"",r.trackingNumber||"",r.trackingLink||"",r.dollarRate??"",r.saleMonth||""]),p=b.aoa_to_sheet([t,...h]),l=b.book_new();b.book_append_sheet(l,p,"Sales Tracking"),H(l,`Sales_Tracker_Final_${new Date().toISOString().split("T")[0]}.xlsx`)};return e.jsxs("div",{children:[e.jsxs(q,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Sales Management Tracker"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Authoritative financial tracking, 46-column spreadsheet ledger, commissions & margins"})]}),e.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"},children:[e.jsxs(g,{to:`${m}/import`,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#ffffff",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.82rem",fontWeight:600,color:"#0f172a",textDecoration:"none",cursor:"pointer"},children:[e.jsx(F,{size:14,color:"#2563eb"})," Import Excel / File"]}),e.jsxs("button",{onClick:W,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#ffffff",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.82rem",fontWeight:600,color:"#15803d",cursor:"pointer"},children:[e.jsx(_,{size:14,color:"#15803d"})," Export Excel (.xlsx)"]}),e.jsxs("button",{onClick:I,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#ffffff",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.82rem",fontWeight:600,color:"#475569",cursor:"pointer"},children:[e.jsx(E,{size:14})," Export CSV"]}),e.jsxs(g,{to:`${m}/sales/new`,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 18px",background:"#0d1319",color:"#ffffff",borderRadius:6,textDecoration:"none",fontSize:"0.82rem",fontWeight:600},children:[e.jsx(O,{size:16})," New Sale Invoice"]})]})]}),e.jsxs(Q,{children:[e.jsxs(c,{children:[e.jsx("div",{className:"label",children:"Total Orders"}),e.jsx("div",{className:"val",children:(o==null?void 0:o.totalOrders)||0})]}),e.jsxs(c,{children:[e.jsx("div",{className:"label",children:"Total Revenue"}),e.jsxs("div",{className:"val",children:["$",((o==null?void 0:o.totalRevenue)||0).toLocaleString()]})]}),e.jsxs(c,{children:[e.jsx("div",{className:"label",children:"Purchase Costs"}),e.jsxs("div",{className:"val",style:{color:"#475569"},children:["$",((o==null?void 0:o.totalPurchaseCost)||0).toLocaleString()]})]}),e.jsxs(c,{children:[e.jsx("div",{className:"label",children:"Gross Profit"}),e.jsxs("div",{className:"val",children:["$",((o==null?void 0:o.totalGrossProfit)||0).toLocaleString()]})]}),e.jsxs(c,{children:[e.jsx("div",{className:"label",children:"Net Profit"}),e.jsxs("div",{className:"val",style:{color:"#16a34a"},children:["$",((o==null?void 0:o.totalNetProfit)||0).toLocaleString()]})]}),e.jsxs(c,{children:[e.jsx("div",{className:"label",children:"Commission Due"}),e.jsxs("div",{className:"val",style:{color:"#d97706"},children:["$",((o==null?void 0:o.totalCommission)||0).toLocaleString()]})]}),e.jsxs(c,{children:[e.jsx("div",{className:"label",children:"Retained Profit"}),e.jsxs("div",{className:"val",style:{color:"#2563eb"},children:["$",((o==null?void 0:o.totalProfitAfterCommission)||0).toLocaleString()]})]})]}),e.jsxs(K,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,background:"#f8fafc",padding:"6px 10px",borderRadius:6,border:"1px solid #cbd5e1",flex:1,minWidth:200},children:[e.jsx(G,{size:14,color:"#64748b"}),e.jsx("input",{type:"text",placeholder:"Search invoice, client, stone, certificate...",value:j,onChange:t=>L(t.target.value),style:{border:"none",background:"transparent",outline:"none",fontSize:"0.82rem",width:"100%"}})]}),e.jsxs("select",{value:x,onChange:t=>D(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Product Types"}),e.jsx("option",{value:"Diamond",children:"Diamond Only"}),e.jsx("option",{value:"Jewelry",children:"Jewelry Only"})]}),e.jsxs("select",{value:f,onChange:t=>T(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Payment Statuses"}),e.jsx("option",{value:"Paid",children:"Paid"}),e.jsx("option",{value:"Partial",children:"Partial"}),e.jsx("option",{value:"Pending",children:"Pending"})]}),e.jsxs("select",{value:u,onChange:t=>$(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Order Statuses"}),e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"})]})]}),e.jsx(X,{children:e.jsxs(Y,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"sticky-col",children:"Invoice No"}),e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Customer"}),e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Description / Shape"}),e.jsx("th",{children:"Carat"}),e.jsx("th",{children:"Color/Clarity"}),e.jsx("th",{children:"Cert #"}),e.jsx("th",{children:"Supplier"}),e.jsx("th",{children:"Selling Price"}),e.jsx("th",{children:"Final Sale"}),e.jsx("th",{children:"Purchase Price"}),e.jsx("th",{children:"GST"}),e.jsx("th",{children:"Final Purchase"}),e.jsx("th",{children:"Gross Profit"}),e.jsx("th",{children:"Net Profit"}),e.jsx("th",{children:"Sales Person"}),e.jsx("th",{children:"Comm %"}),e.jsx("th",{children:"Comm ($)"}),e.jsx("th",{children:"Retained Profit"}),e.jsx("th",{children:"Markup %"}),e.jsx("th",{children:"Payment"}),e.jsx("th",{children:"Order Status"}),e.jsx("th",{children:"Tracking"}),e.jsx("th",{style:{textAlign:"right"},children:"Actions"})]})}),e.jsxs("tbody",{children:[a.map(t=>e.jsxs("tr",{children:[e.jsx("td",{className:"sticky-col",children:e.jsx(g,{to:`${m}/sales/${t.id}`,style:{color:"#0d1319",textDecoration:"none"},children:t.invoiceNo})}),e.jsx("td",{children:new Date(t.saleDate).toLocaleDateString()}),e.jsx("td",{style:{fontWeight:600},children:t.customerName}),e.jsx("td",{children:t.customerCountry||"-"}),e.jsx("td",{children:e.jsx(S,{$type:t.productType,children:t.productType})}),e.jsx("td",{children:t.productDescription||t.shape||"-"}),e.jsx("td",{children:t.caratWeight?`${t.caratWeight} ct`:"-"}),e.jsx("td",{children:t.diamondColor?`${t.diamondColor} / ${t.clarity||""}`:"-"}),e.jsx("td",{children:t.certificateNo||"-"}),e.jsx("td",{children:t.supplierName||"None"}),e.jsxs("td",{children:["$",t.sellingPrice.toLocaleString()]}),e.jsxs("td",{style:{fontWeight:700},children:["$",t.finalSaleAmount.toLocaleString()]}),e.jsxs("td",{children:["$",t.purchasePrice.toLocaleString()]}),e.jsxs("td",{children:["$",t.gstAmount.toLocaleString()]}),e.jsxs("td",{children:["$",t.finalPurchasePrice.toLocaleString()]}),e.jsxs("td",{children:["$",t.grossProfit.toLocaleString()]}),e.jsxs("td",{style:{fontWeight:700,color:t.netProfit>=0?"#16a34a":"#dc2626"},children:["$",t.netProfit.toLocaleString()]}),e.jsx("td",{children:t.salesPersonName||"-"}),e.jsxs("td",{children:[(t.commissionPercent*100).toFixed(1),"%"]}),e.jsxs("td",{style:{color:"#d97706",fontWeight:600},children:["$",t.commissionAmount.toLocaleString()]}),e.jsxs("td",{style:{fontWeight:700},children:["$",t.profitAfterCommission.toLocaleString()]}),e.jsxs("td",{children:[((t.markupPercent||0)*100).toFixed(1),"%"]}),e.jsx("td",{children:e.jsx(S,{$type:t.paymentStatus,children:t.paymentStatus})}),e.jsx("td",{children:e.jsx(S,{$type:t.orderStatus,children:t.orderStatus})}),e.jsx("td",{children:t.trackingNumber?t.trackingLink?e.jsxs("a",{href:t.trackingLink,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:2,color:"#2563eb"},children:[t.trackingNumber," ",e.jsx(M,{size:10})]}):t.trackingNumber:"-"}),e.jsx("td",{style:{textAlign:"right"},children:e.jsxs("div",{style:{display:"inline-flex",gap:6},children:[e.jsx(g,{to:`${m}/sales/${t.id}`,children:e.jsx("button",{style:{background:"none",border:"1px solid #e2e8f0",padding:"4px 8px",borderRadius:4,cursor:"pointer"},children:e.jsx(U,{size:12})})}),e.jsx("button",{onClick:()=>R(t.id,t.invoiceNo),style:{background:"none",border:"1px solid #fee2e2",color:"#dc2626",padding:"4px 8px",borderRadius:4,cursor:"pointer"},children:e.jsx(B,{size:12})})]})})]},t.id)),a.length===0&&!w&&e.jsx("tr",{children:e.jsx("td",{colSpan:26,style:{textAlign:"center",padding:"40px",color:"#94a3b8"},children:'No sales found. Click "New Sale Invoice" to record transactions.'})})]})]})}),s&&s.totalPages>1&&e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:10,marginTop:16},children:[e.jsxs("span",{style:{fontSize:"0.8rem",color:"#64748b"},children:["Page ",s.page," of ",s.totalPages," (",s.total," total)"]}),e.jsx("button",{onClick:()=>v(t=>Math.max(1,t-1)),disabled:s.page===1,style:{padding:"6px 12px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6,cursor:"pointer"},children:e.jsx(J,{size:14})}),e.jsx("button",{onClick:()=>v(t=>Math.min(s.totalPages,t+1)),disabled:s.page===s.totalPages,style:{padding:"6px 12px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6,cursor:"pointer"},children:e.jsx(V,{size:14})})]})]})};export{ne as BusinessSalesListPage};
