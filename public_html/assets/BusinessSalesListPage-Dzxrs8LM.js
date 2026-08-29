import{r as c,j as e,ad as k,f as y,b8 as V,_ as J,ae as H,P as q,k as Q,aj as K,i as X,l as Y,m as Z}from"./react-vendor-BXyx942q.js";import{g as u}from"./ui-vendor-VHkRGmvp.js";import{u as C,w as ee}from"./admin-tools-vendor-CKN5doRT.js";import{P as S}from"./admin-pages-D2xlvE0Q.js";import{b as P}from"./businessApi-CXfCerOf.js";import"./swiper-vendor-B7SuwHD8.js";const te=u.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
`,re=u.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
`,x=u.div`
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
`,ie=u.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`,oe=u.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  scrollbar-width: thin;
`,ne=u.table`
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
`,w=u.span`
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;

  ${({$type:a})=>{switch(a){case"Paid":return"background: #ebfbee; color: #2b8a3e;";case"Partial":return"background: #fff9db; color: #f59f00;";case"Pending":case"Unpaid":return"background: #fff5f5; color: #e03131;";case"Delivered":return"background: #e7f5ff; color: #1c7ed6;";case"Diamond":return"background: #fff3bf; color: #d97706;";case"Jewelry":return"background: #f3f0ff; color: #7950f2;";default:return"background: #f1f5f9; color: #64748b;"}}}
`,l=a=>(Number(a)||0).toLocaleString(),he=()=>{const[a,T]=c.useState([]),[o,z]=c.useState(null),[$,N]=c.useState(!0),[v,L]=c.useState(""),[g,R]=c.useState("ALL"),[m,I]=c.useState("ALL"),[b,W]=c.useState("ALL"),[A,D]=c.useState(1),[d,F]=c.useState(null),[p,f]=c.useState(new Set),j=async()=>{N(!0);try{const t=await P.getSales({search:v||void 0,productType:g!=="ALL"?g:void 0,paymentStatus:m!=="ALL"?m:void 0,orderStatus:b!=="ALL"?b:void 0,page:A,limit:50});T(t.sales||[]),z(t.summary),F(t.pagination)}catch(t){console.error(t)}finally{N(!1)}};c.useEffect(()=>{j()},[v,g,m,b,A]);const E=()=>{p.size===a.length&&a.length>0?f(new Set):f(new Set(a.map(t=>t.id)))},_=t=>{f(s=>{const n=new Set(s);return n.has(t)?n.delete(t):n.add(t),n})},O=async(t,s)=>{var n,h;if(window.confirm(`⚠️ Are you sure you want to delete invoice ${s}?`))try{await P.deleteSale(t),f(r=>{const i=new Set(r);return i.delete(t),i}),await j()}catch(r){alert(((h=(n=r==null?void 0:r.response)==null?void 0:n.data)==null?void 0:h.message)||"Delete failed")}},G=async()=>{var t,s;if(p.size!==0&&window.confirm(`⚠️ Are you sure you want to permanently delete the ${p.size} selected sales?`))try{await P.deleteSalesBatch(Array.from(p)),f(new Set),await j(),alert("✅ Selected sales deleted successfully.")}catch(n){alert(((s=(t=n==null?void 0:n.response)==null?void 0:t.data)==null?void 0:s.message)||"Delete batch failed")}},M=async()=>{var t,s;if(window.confirm("⚠️ WARNING: Are you sure you want to permanently delete ALL sales records from the database? This action cannot be undone."))try{await P.deleteAllSales(),f(new Set),await j(),alert("✅ All sales have been deleted successfully from the database.")}catch(n){alert(((s=(t=n==null?void 0:n.response)==null?void 0:t.data)==null?void 0:s.message)||"Delete all failed")}},U=()=>{if(!a||a.length===0)return;const t=["Invoice No","Sale Date","Customer Name","Country","Product Type","Description","Shape","Carat","Color","Clarity","Cut","Cert No","Supplier","Purchase Price","Selling Price","Discount","Final Sale Amount","Shipping Cost","GST %","GST Amount","Final Purchase Price","Gross Profit","Net Profit","Sales Person","Commission %","Commission Amount","Profit After Commission","Payment Status","Order Status","Tracking Number"],s=a.map(i=>[i.invoiceNo,i.saleDate?new Date(i.saleDate).toISOString().split("T")[0]:"",`"${i.customerName}"`,i.customerCountry||"",i.productType,`"${i.productDescription||""}"`,i.shape||"",i.caratWeight||"",i.diamondColor||"",i.clarity||"",i.cut||"",i.certificateNo||"",`"${i.supplierName||""}"`,i.purchasePrice,i.sellingPrice,i.discount,i.finalSaleAmount,i.shippingCost,i.gstPercent,i.gstAmount,i.finalPurchasePrice,i.grossProfit,i.netProfit,`"${i.salesPersonName||""}"`,i.commissionPercent,i.commissionAmount,i.profitAfterCommission,i.paymentStatus,i.orderStatus,i.trackingNumber||""]),n="data:text/csv;charset=utf-8,"+[t.join(","),...s.map(i=>i.join(","))].join(`
`),h=encodeURI(n),r=document.createElement("a");r.setAttribute("href",h),r.setAttribute("download",`sales_tracker_${new Date().toISOString().split("T")[0]}.csv`),document.body.appendChild(r),r.click(),document.body.removeChild(r)},B=()=>{if(!a||a.length===0)return;const t=["Invoice No","Sale Date","Customer Name","Customer Country","Product Type","Product Description","Stone Type","Shape","Diamond Color","Clarity","Cut","Polish","Symmetry","Fluorescence","Measurement","Price per Carat","Carat / Weight","Quantity","Certificate","Certificate No","Supplier","Purchase Price","Selling Price","Discount","Final Sale Amount","Shipping Cost","GST %","GST Amount","Final Purchase Price","Payment Status","Payment Method","Amount Received","Pending Amount","Gross Profit","Net Profit","Sales Person","Commission %","Commission Amount","Profit After Commission","Profit % (Markup)","Final Profit %","Order Status","Tracking Number","Tracking Link","Dollar Rate","Sale Month"],s=a.map(r=>[r.invoiceNo,r.saleDate?new Date(r.saleDate).toISOString().split("T")[0]:"",r.customerName||"",r.customerCountry||"",r.productType||"",r.productDescription||"",r.stoneType||"",r.shape||"",r.diamondColor||"",r.clarity||"",r.cut||"",r.polish||"",r.symmetry||"",r.fluorescence||"",r.measurement||"",r.pricePerCarat??"",r.caratWeight??"",r.quantity??1,r.certificate||"",r.certificateNo||"",r.supplierName||"",r.purchasePrice??0,r.sellingPrice??0,r.discount??0,r.finalSaleAmount??0,r.shippingCost??0,r.gstPercent??0,r.gstAmount??0,r.finalPurchasePrice??0,r.paymentStatus||"",r.paymentMethod||"",r.amountReceived??0,r.pendingAmount??0,r.grossProfit??0,r.netProfit??0,r.salesPersonName||"",r.commissionPercent??0,r.commissionAmount??0,r.profitAfterCommission??0,r.markupPercent??0,r.finalProfitPercent??0,r.orderStatus||"",r.trackingNumber||"",r.trackingLink||"",r.dollarRate??"",r.saleMonth||""]),n=C.aoa_to_sheet([t,...s]),h=C.book_new();C.book_append_sheet(h,n,"Sales Tracking"),ee(h,`Sales_Tracker_Final_${new Date().toISOString().split("T")[0]}.xlsx`)};return e.jsxs("div",{children:[e.jsxs(te,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Sales Management Tracker"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Authoritative financial tracking, 46-column spreadsheet ledger, commissions & margins"})]}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"},children:[p.size>0&&e.jsxs("button",{onClick:G,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#dc2626",color:"#ffffff",border:"none",borderRadius:6,fontSize:"0.82rem",fontWeight:700,cursor:"pointer"},children:[e.jsx(k,{size:14})," Delete Selected (",p.size,")"]}),e.jsxs("button",{onClick:M,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 12px",background:"#fff5f5",border:"1px solid #fca5a5",color:"#991b1b",borderRadius:6,fontSize:"0.82rem",fontWeight:600,cursor:"pointer"},title:"Purge all sales data from database",children:[e.jsx(k,{size:13,color:"#991b1b"})," Delete All Sales"]}),e.jsxs(y,{to:`${S}/import`,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#ffffff",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.82rem",fontWeight:600,color:"#0f172a",textDecoration:"none",cursor:"pointer"},children:[e.jsx(V,{size:14,color:"#2563eb"})," Import Excel / File"]}),e.jsxs("button",{onClick:B,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#ffffff",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.82rem",fontWeight:600,color:"#15803d",cursor:"pointer"},children:[e.jsx(J,{size:14,color:"#15803d"})," Export Excel (.xlsx)"]}),e.jsxs("button",{onClick:U,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#ffffff",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.82rem",fontWeight:600,color:"#475569",cursor:"pointer"},children:[e.jsx(H,{size:14})," Export CSV"]}),e.jsxs(y,{to:`${S}/sales/new`,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 18px",background:"#0d1319",color:"#ffffff",borderRadius:6,textDecoration:"none",fontSize:"0.82rem",fontWeight:600},children:[e.jsx(q,{size:16})," New Sale Invoice"]})]})]}),e.jsxs(re,{children:[e.jsxs(x,{children:[e.jsx("div",{className:"label",children:"Total Orders"}),e.jsx("div",{className:"val",children:(o==null?void 0:o.totalOrders)||0})]}),e.jsxs(x,{children:[e.jsx("div",{className:"label",children:"Total Revenue"}),e.jsxs("div",{className:"val",children:["$",l(o==null?void 0:o.totalRevenue)]})]}),e.jsxs(x,{children:[e.jsx("div",{className:"label",children:"Purchase Costs"}),e.jsxs("div",{className:"val",style:{color:"#475569"},children:["$",l(o==null?void 0:o.totalPurchaseCost)]})]}),e.jsxs(x,{children:[e.jsx("div",{className:"label",children:"Gross Profit"}),e.jsxs("div",{className:"val",children:["$",l(o==null?void 0:o.totalGrossProfit)]})]}),e.jsxs(x,{children:[e.jsx("div",{className:"label",children:"Net Profit"}),e.jsxs("div",{className:"val",style:{color:"#16a34a"},children:["$",l(o==null?void 0:o.totalNetProfit)]})]}),e.jsxs(x,{children:[e.jsx("div",{className:"label",children:"Commission Due"}),e.jsxs("div",{className:"val",style:{color:"#d97706"},children:["$",l(o==null?void 0:o.totalCommission)]})]}),e.jsxs(x,{children:[e.jsx("div",{className:"label",children:"Retained Profit"}),e.jsxs("div",{className:"val",style:{color:"#2563eb"},children:["$",l(o==null?void 0:o.totalProfitAfterCommission)]})]})]}),e.jsxs(ie,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,background:"#f8fafc",padding:"6px 10px",borderRadius:6,border:"1px solid #cbd5e1",flex:1,minWidth:200},children:[e.jsx(Q,{size:14,color:"#64748b"}),e.jsx("input",{type:"text",placeholder:"Search invoice, client, stone, certificate...",value:v,onChange:t=>L(t.target.value),style:{border:"none",background:"transparent",outline:"none",fontSize:"0.82rem",width:"100%"}})]}),e.jsxs("select",{value:g,onChange:t=>R(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Product Types"}),e.jsx("option",{value:"Diamond",children:"Diamond Only"}),e.jsx("option",{value:"Jewelry",children:"Jewelry Only"})]}),e.jsxs("select",{value:m,onChange:t=>I(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Payment Statuses"}),e.jsx("option",{value:"Paid",children:"Paid"}),e.jsx("option",{value:"Partial",children:"Partial"}),e.jsx("option",{value:"Pending",children:"Pending"})]}),e.jsxs("select",{value:b,onChange:t=>W(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Order Statuses"}),e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"})]})]}),e.jsx(oe,{children:e.jsxs(ne,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:40,textAlign:"center"},children:e.jsx("input",{type:"checkbox",checked:a.length>0&&p.size===a.length,onChange:E,style:{cursor:"pointer"}})}),e.jsx("th",{className:"sticky-col",children:"Invoice No"}),e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Customer"}),e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Description / Shape"}),e.jsx("th",{children:"Carat"}),e.jsx("th",{children:"Color/Clarity"}),e.jsx("th",{children:"Cert #"}),e.jsx("th",{children:"Supplier"}),e.jsx("th",{children:"Selling Price"}),e.jsx("th",{children:"Final Sale"}),e.jsx("th",{children:"Purchase Price"}),e.jsx("th",{children:"GST"}),e.jsx("th",{children:"Final Purchase"}),e.jsx("th",{children:"Gross Profit"}),e.jsx("th",{children:"Net Profit"}),e.jsx("th",{children:"Sales Person"}),e.jsx("th",{children:"Comm %"}),e.jsx("th",{children:"Comm ($)"}),e.jsx("th",{children:"Retained Profit"}),e.jsx("th",{children:"Markup %"}),e.jsx("th",{children:"Payment"}),e.jsx("th",{children:"Order Status"}),e.jsx("th",{children:"Tracking"}),e.jsx("th",{style:{textAlign:"right"},children:"Actions"})]})}),e.jsxs("tbody",{children:[a.map(t=>{const s=p.has(t.id);return e.jsxs("tr",{style:{background:s?"#f0fdf4":void 0},children:[e.jsx("td",{style:{textAlign:"center"},children:e.jsx("input",{type:"checkbox",checked:s,onChange:()=>_(t.id),style:{cursor:"pointer"}})}),e.jsx("td",{className:"sticky-col",children:e.jsx(y,{to:`${S}/sales/${t.id}`,style:{color:"#0d1319",textDecoration:"none"},children:t.invoiceNo})}),e.jsx("td",{children:t.saleDate?new Date(t.saleDate).toLocaleDateString():"-"}),e.jsx("td",{style:{fontWeight:600},children:t.customerName}),e.jsx("td",{children:t.customerCountry||"-"}),e.jsx("td",{children:e.jsx(w,{$type:t.productType,children:t.productType})}),e.jsx("td",{children:t.productDescription||t.shape||"-"}),e.jsx("td",{children:t.caratWeight?`${t.caratWeight} ct`:"-"}),e.jsx("td",{children:t.diamondColor?`${t.diamondColor} / ${t.clarity||""}`:"-"}),e.jsx("td",{children:t.certificateNo||"-"}),e.jsx("td",{children:t.supplierName||"None"}),e.jsxs("td",{children:["$",l(t.sellingPrice)]}),e.jsxs("td",{style:{fontWeight:700},children:["$",l(t.finalSaleAmount)]}),e.jsxs("td",{children:["$",l(t.purchasePrice)]}),e.jsxs("td",{children:["$",l(t.gstAmount)]}),e.jsxs("td",{children:["$",l(t.finalPurchasePrice)]}),e.jsxs("td",{children:["$",l(t.grossProfit)]}),e.jsxs("td",{style:{fontWeight:700,color:(Number(t.netProfit)||0)>=0?"#16a34a":"#dc2626"},children:["$",l(t.netProfit)]}),e.jsx("td",{children:t.salesPersonName||"-"}),e.jsxs("td",{children:[((Number(t.commissionPercent)||0)*100).toFixed(1),"%"]}),e.jsxs("td",{style:{color:"#d97706",fontWeight:600},children:["$",l(t.commissionAmount)]}),e.jsxs("td",{style:{fontWeight:700},children:["$",l(t.profitAfterCommission)]}),e.jsxs("td",{children:[((Number(t.markupPercent)||0)*100).toFixed(1),"%"]}),e.jsx("td",{children:e.jsx(w,{$type:t.paymentStatus,children:t.paymentStatus})}),e.jsx("td",{children:e.jsx(w,{$type:t.orderStatus,children:t.orderStatus})}),e.jsx("td",{children:t.trackingNumber?t.trackingLink?e.jsxs("a",{href:t.trackingLink,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:2,color:"#2563eb"},children:[t.trackingNumber," ",e.jsx(K,{size:10})]}):t.trackingNumber:"-"}),e.jsx("td",{style:{textAlign:"right"},children:e.jsxs("div",{style:{display:"inline-flex",gap:6},children:[e.jsx(y,{to:`${S}/sales/${t.id}`,children:e.jsx("button",{style:{background:"none",border:"1px solid #e2e8f0",padding:"4px 8px",borderRadius:4,cursor:"pointer"},title:"View Sale Detail",children:e.jsx(X,{size:12})})}),e.jsx("button",{onClick:()=>O(t.id,t.invoiceNo),style:{background:"none",border:"1px solid #fee2e2",color:"#dc2626",padding:"4px 8px",borderRadius:4,cursor:"pointer"},title:"Delete Sale Invoice",children:e.jsx(k,{size:12})})]})})]},t.id)}),a.length===0&&!$&&e.jsx("tr",{children:e.jsx("td",{colSpan:27,style:{textAlign:"center",padding:"40px",color:"#94a3b8"},children:'No sales found in the database. Click "Import Excel / File" or "New Sale Invoice" to add records.'})})]})]})}),d&&d.totalPages>1&&e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:10,marginTop:16},children:[e.jsxs("span",{style:{fontSize:"0.8rem",color:"#64748b"},children:["Page ",d.page," of ",d.totalPages," (",d.total," total)"]}),e.jsx("button",{onClick:()=>D(t=>Math.max(1,t-1)),disabled:d.page===1,style:{padding:"6px 12px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6,cursor:"pointer"},children:e.jsx(Y,{size:14})}),e.jsx("button",{onClick:()=>D(t=>Math.min(d.totalPages,t+1)),disabled:d.page===d.totalPages,style:{padding:"6px 12px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6,cursor:"pointer"},children:e.jsx(Z,{size:14})})]})]})};export{he as BusinessSalesListPage};
