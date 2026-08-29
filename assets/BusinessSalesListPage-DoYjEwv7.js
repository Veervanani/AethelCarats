import{r as o,j as e,ae as I,f as j,P as W,k as E,aj as O,i as F,ad as G,l as _,m as M}from"./react-vendor-BXyx942q.js";import{g as d}from"./ui-vendor-VHkRGmvp.js";import{P as m}from"./admin-pages-BTB8K7Fd.js";import{b as k}from"./businessApi-k95MMcEU.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const U=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
`,B=d.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
`,l=d.div`
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
`,J=d.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`,V=d.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  scrollbar-width: thin;
`,H=d.table`
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
`,b=d.span`
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;

  ${({$type:a})=>{switch(a){case"Paid":return"background: #ebfbee; color: #2b8a3e;";case"Partial":return"background: #fff9db; color: #f59f00;";case"Pending":case"Unpaid":return"background: #fff5f5; color: #e03131;";case"Delivered":return"background: #e7f5ff; color: #1c7ed6;";case"Diamond":return"background: #fff3bf; color: #d97706;";case"Jewelry":return"background: #f3f0ff; color: #7950f2;";default:return"background: #f1f5f9; color: #64748b;"}}}
`,ee=()=>{const[a,C]=o.useState([]),[i,N]=o.useState(null),[L,S]=o.useState(!0),[u,w]=o.useState(""),[c,A]=o.useState("ALL"),[x,$]=o.useState("ALL"),[h,D]=o.useState("ALL"),[y,v]=o.useState(1),[n,T]=o.useState(null),P=async()=>{S(!0);try{const t=await k.getSales({search:u||void 0,productType:c!=="ALL"?c:void 0,paymentStatus:x!=="ALL"?x:void 0,orderStatus:h!=="ALL"?h:void 0,page:y,limit:25});C(t.sales||[]),N(t.summary),T(t.pagination)}catch(t){console.error(t)}finally{S(!1)}};o.useEffect(()=>{P()},[u,c,x,h,y]);const z=async(t,g)=>{var p,f;if(window.confirm(`Are you sure you want to delete invoice ${g}?`))try{await k.deleteSale(t),P()}catch(s){alert(((f=(p=s==null?void 0:s.response)==null?void 0:p.data)==null?void 0:f.message)||"Delete failed")}},R=()=>{if(!a||a.length===0)return;const t=["Invoice No","Sale Date","Customer Name","Country","Product Type","Description","Shape","Carat","Color","Clarity","Cut","Cert No","Supplier","Purchase Price","Selling Price","Discount","Final Sale Amount","Shipping Cost","GST %","GST Amount","Final Purchase Price","Gross Profit","Net Profit","Sales Person","Commission %","Commission Amount","Profit After Commission","Payment Status","Order Status","Tracking Number"],g=a.map(r=>[r.invoiceNo,new Date(r.saleDate).toISOString().split("T")[0],`"${r.customerName}"`,r.customerCountry||"",r.productType,`"${r.productDescription||""}"`,r.shape||"",r.caratWeight||"",r.diamondColor||"",r.clarity||"",r.cut||"",r.certificateNo||"",`"${r.supplierName||""}"`,r.purchasePrice,r.sellingPrice,r.discount,r.finalSaleAmount,r.shippingCost,r.gstPercent,r.gstAmount,r.finalPurchasePrice,r.grossProfit,r.netProfit,`"${r.salesPersonName||""}"`,r.commissionPercent,r.commissionAmount,r.profitAfterCommission,r.paymentStatus,r.orderStatus,r.trackingNumber||""]),p="data:text/csv;charset=utf-8,"+[t.join(","),...g.map(r=>r.join(","))].join(`
`),f=encodeURI(p),s=document.createElement("a");s.setAttribute("href",f),s.setAttribute("download",`floksy_sales_tracker_${Date.now()}.csv`),document.body.appendChild(s),s.click(),document.body.removeChild(s)};return e.jsxs("div",{children:[e.jsxs(U,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Sales Management Tracker"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Authoritative financial tracking, 46-column spreadsheet ledger, commissions & margins"})]}),e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsxs("button",{onClick:R,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#ffffff",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.82rem",fontWeight:600,cursor:"pointer"},children:[e.jsx(I,{size:14})," Export CSV"]}),e.jsxs(j,{to:`${m}/sales/new`,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 18px",background:"#0d1319",color:"#ffffff",borderRadius:6,textDecoration:"none",fontSize:"0.82rem",fontWeight:600},children:[e.jsx(W,{size:16})," New Sale Invoice"]})]})]}),e.jsxs(B,{children:[e.jsxs(l,{children:[e.jsx("div",{className:"label",children:"Total Orders"}),e.jsx("div",{className:"val",children:(i==null?void 0:i.totalOrders)||0})]}),e.jsxs(l,{children:[e.jsx("div",{className:"label",children:"Total Revenue"}),e.jsxs("div",{className:"val",children:["$",((i==null?void 0:i.totalRevenue)||0).toLocaleString()]})]}),e.jsxs(l,{children:[e.jsx("div",{className:"label",children:"Purchase Costs"}),e.jsxs("div",{className:"val",style:{color:"#475569"},children:["$",((i==null?void 0:i.totalPurchaseCost)||0).toLocaleString()]})]}),e.jsxs(l,{children:[e.jsx("div",{className:"label",children:"Gross Profit"}),e.jsxs("div",{className:"val",children:["$",((i==null?void 0:i.totalGrossProfit)||0).toLocaleString()]})]}),e.jsxs(l,{children:[e.jsx("div",{className:"label",children:"Net Profit"}),e.jsxs("div",{className:"val",style:{color:"#16a34a"},children:["$",((i==null?void 0:i.totalNetProfit)||0).toLocaleString()]})]}),e.jsxs(l,{children:[e.jsx("div",{className:"label",children:"Commission Due"}),e.jsxs("div",{className:"val",style:{color:"#d97706"},children:["$",((i==null?void 0:i.totalCommission)||0).toLocaleString()]})]}),e.jsxs(l,{children:[e.jsx("div",{className:"label",children:"Retained Profit"}),e.jsxs("div",{className:"val",style:{color:"#2563eb"},children:["$",((i==null?void 0:i.totalProfitAfterCommission)||0).toLocaleString()]})]})]}),e.jsxs(J,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,background:"#f8fafc",padding:"6px 10px",borderRadius:6,border:"1px solid #cbd5e1",flex:1,minWidth:200},children:[e.jsx(E,{size:14,color:"#64748b"}),e.jsx("input",{type:"text",placeholder:"Search invoice, client, stone, certificate...",value:u,onChange:t=>w(t.target.value),style:{border:"none",background:"transparent",outline:"none",fontSize:"0.82rem",width:"100%"}})]}),e.jsxs("select",{value:c,onChange:t=>A(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Product Types"}),e.jsx("option",{value:"Diamond",children:"Diamond Only"}),e.jsx("option",{value:"Jewelry",children:"Jewelry Only"})]}),e.jsxs("select",{value:x,onChange:t=>$(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Payment Statuses"}),e.jsx("option",{value:"Paid",children:"Paid"}),e.jsx("option",{value:"Partial",children:"Partial"}),e.jsx("option",{value:"Pending",children:"Pending"})]}),e.jsxs("select",{value:h,onChange:t=>D(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Order Statuses"}),e.jsx("option",{value:"Delivered",children:"Delivered"}),e.jsx("option",{value:"Shipped",children:"Shipped"}),e.jsx("option",{value:"Processing",children:"Processing"})]})]}),e.jsx(V,{children:e.jsxs(H,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"sticky-col",children:"Invoice No"}),e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Customer"}),e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Description / Shape"}),e.jsx("th",{children:"Carat"}),e.jsx("th",{children:"Color/Clarity"}),e.jsx("th",{children:"Cert #"}),e.jsx("th",{children:"Supplier"}),e.jsx("th",{children:"Selling Price"}),e.jsx("th",{children:"Final Sale"}),e.jsx("th",{children:"Purchase Price"}),e.jsx("th",{children:"GST"}),e.jsx("th",{children:"Final Purchase"}),e.jsx("th",{children:"Gross Profit"}),e.jsx("th",{children:"Net Profit"}),e.jsx("th",{children:"Sales Person"}),e.jsx("th",{children:"Comm %"}),e.jsx("th",{children:"Comm ($)"}),e.jsx("th",{children:"Retained Profit"}),e.jsx("th",{children:"Markup %"}),e.jsx("th",{children:"Payment"}),e.jsx("th",{children:"Order Status"}),e.jsx("th",{children:"Tracking"}),e.jsx("th",{style:{textAlign:"right"},children:"Actions"})]})}),e.jsxs("tbody",{children:[a.map(t=>e.jsxs("tr",{children:[e.jsx("td",{className:"sticky-col",children:e.jsx(j,{to:`${m}/sales/${t.id}`,style:{color:"#0d1319",textDecoration:"none"},children:t.invoiceNo})}),e.jsx("td",{children:new Date(t.saleDate).toLocaleDateString()}),e.jsx("td",{style:{fontWeight:600},children:t.customerName}),e.jsx("td",{children:t.customerCountry||"-"}),e.jsx("td",{children:e.jsx(b,{$type:t.productType,children:t.productType})}),e.jsx("td",{children:t.productDescription||t.shape||"-"}),e.jsx("td",{children:t.caratWeight?`${t.caratWeight} ct`:"-"}),e.jsx("td",{children:t.diamondColor?`${t.diamondColor} / ${t.clarity||""}`:"-"}),e.jsx("td",{children:t.certificateNo||"-"}),e.jsx("td",{children:t.supplierName||"None"}),e.jsxs("td",{children:["$",t.sellingPrice.toLocaleString()]}),e.jsxs("td",{style:{fontWeight:700},children:["$",t.finalSaleAmount.toLocaleString()]}),e.jsxs("td",{children:["$",t.purchasePrice.toLocaleString()]}),e.jsxs("td",{children:["$",t.gstAmount.toLocaleString()]}),e.jsxs("td",{children:["$",t.finalPurchasePrice.toLocaleString()]}),e.jsxs("td",{children:["$",t.grossProfit.toLocaleString()]}),e.jsxs("td",{style:{fontWeight:700,color:t.netProfit>=0?"#16a34a":"#dc2626"},children:["$",t.netProfit.toLocaleString()]}),e.jsx("td",{children:t.salesPersonName||"-"}),e.jsxs("td",{children:[(t.commissionPercent*100).toFixed(1),"%"]}),e.jsxs("td",{style:{color:"#d97706",fontWeight:600},children:["$",t.commissionAmount.toLocaleString()]}),e.jsxs("td",{style:{fontWeight:700},children:["$",t.profitAfterCommission.toLocaleString()]}),e.jsxs("td",{children:[((t.markupPercent||0)*100).toFixed(1),"%"]}),e.jsx("td",{children:e.jsx(b,{$type:t.paymentStatus,children:t.paymentStatus})}),e.jsx("td",{children:e.jsx(b,{$type:t.orderStatus,children:t.orderStatus})}),e.jsx("td",{children:t.trackingNumber?t.trackingLink?e.jsxs("a",{href:t.trackingLink,target:"_blank",rel:"noreferrer",style:{display:"inline-flex",alignItems:"center",gap:2,color:"#2563eb"},children:[t.trackingNumber," ",e.jsx(O,{size:10})]}):t.trackingNumber:"-"}),e.jsx("td",{style:{textAlign:"right"},children:e.jsxs("div",{style:{display:"inline-flex",gap:6},children:[e.jsx(j,{to:`${m}/sales/${t.id}`,children:e.jsx("button",{style:{background:"none",border:"1px solid #e2e8f0",padding:"4px 8px",borderRadius:4,cursor:"pointer"},children:e.jsx(F,{size:12})})}),e.jsx("button",{onClick:()=>z(t.id,t.invoiceNo),style:{background:"none",border:"1px solid #fee2e2",color:"#dc2626",padding:"4px 8px",borderRadius:4,cursor:"pointer"},children:e.jsx(G,{size:12})})]})})]},t.id)),a.length===0&&!L&&e.jsx("tr",{children:e.jsx("td",{colSpan:26,style:{textAlign:"center",padding:"40px",color:"#94a3b8"},children:'No sales found. Click "New Sale Invoice" to record transactions.'})})]})]})}),n&&n.totalPages>1&&e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:10,marginTop:16},children:[e.jsxs("span",{style:{fontSize:"0.8rem",color:"#64748b"},children:["Page ",n.page," of ",n.totalPages," (",n.total," total)"]}),e.jsx("button",{onClick:()=>v(t=>Math.max(1,t-1)),disabled:n.page===1,style:{padding:"6px 12px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6,cursor:"pointer"},children:e.jsx(_,{size:14})}),e.jsx("button",{onClick:()=>v(t=>Math.min(n.totalPages,t+1)),disabled:n.page===n.totalPages,style:{padding:"6px 12px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6,cursor:"pointer"},children:e.jsx(M,{size:14})})]})]})};export{ee as BusinessSalesListPage};
