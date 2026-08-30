import{ap as N,r as d,j as e,f as k,aq as E}from"./react-vendor-Jc2qAOIG.js";import{g as o}from"./ui-vendor-Bp1vOpov.js";import{P as D}from"./admin-pages-C2SByVUX.js";import{b as I}from"./businessApi-PvRXzZ5E.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const W=o.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`,O=o.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
`,c=o.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;

  .stat-label {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 4px;
  }
  .stat-val {
    font-size: 1.3rem;
    font-weight: 700;
    color: #0f172a;
  }
`,R=o.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 20px;
`,x=o.button`
  padding: 10px 18px;
  background: none;
  border: none;
  border-bottom: 2px solid ${({$active:n})=>n?"#0d1319":"transparent"};
  color: ${({$active:n})=>n?"#0d1319":"#64748b"};
  font-weight: ${({$active:n})=>n?"700":"500"};
  font-size: 0.85rem;
  cursor: pointer;
  margin-bottom: -2px;
`,h=o.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;

  th {
    text-align: left;
    padding: 10px 14px;
    background: #f8fafc;
    color: #475569;
    font-weight: 600;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 10px 14px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
  }
`,q=()=>{var p,m,f,j,g,u,y,b,v,S,w,A;const{id:n}=N(),[i,T]=d.useState(null),[s,$]=d.useState(null),[r,a]=d.useState("overview"),[P,z]=d.useState(!0);return d.useEffect(()=>{n&&I.getEmployeeById(n).then(t=>{T(t.employee),$(t.stats)}).finally(()=>z(!1))},[n]),P?e.jsx("div",{style:{padding:40,textAlign:"center"},children:"Loading Employee Profile..."}):i?e.jsxs("div",{children:[e.jsxs(k,{to:`${D}/employees`,style:{display:"inline-flex",alignItems:"center",gap:6,fontSize:"0.8rem",color:"#64748b",textDecoration:"none",marginBottom:16},children:[e.jsx(E,{size:14})," Back to Employees Directory"]}),e.jsx(W,{children:e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:i.fullName||i.name||"Employee Profile"}),e.jsx("span",{style:{fontSize:"0.72rem",padding:"2px 8px",background:"#f1f5f9",borderRadius:4,fontWeight:700},children:i.employeeCode})]}),e.jsxs("div",{style:{display:"flex",gap:16,marginTop:8,fontSize:"0.8rem",color:"#64748b",flexWrap:"wrap"},children:[e.jsxs("span",{children:["🏢 ",i.department||"Sales"]}),e.jsxs("span",{children:["💼 ",i.designation||"Sales Executive"]}),e.jsxs("span",{children:["📧 ",i.email]}),e.jsxs("span",{children:["📞 ",i.phone||"No phone"]})]})]})}),e.jsxs(O,{children:[e.jsxs(c,{children:[e.jsx("div",{className:"stat-label",children:"Total Invoiced Orders"}),e.jsx("div",{className:"stat-val",children:(s==null?void 0:s.totalOrders)||0})]}),e.jsxs(c,{children:[e.jsx("div",{className:"stat-label",children:"Total Sales Volume"}),e.jsxs("div",{className:"stat-val",style:{color:"#0d1319"},children:["$",((s==null?void 0:s.totalSalesAmount)||0).toLocaleString()]})]}),e.jsxs(c,{children:[e.jsx("div",{className:"stat-label",children:"Net Profit Generated"}),e.jsxs("div",{className:"stat-val",style:{color:"#16a34a"},children:["$",((s==null?void 0:s.netProfit)||0).toLocaleString()]})]}),e.jsxs(c,{children:[e.jsx("div",{className:"stat-label",children:"Earned Commission"}),e.jsxs("div",{className:"stat-val",style:{color:"#d97706"},children:["$",((s==null?void 0:s.totalCommission)||0).toLocaleString()]})]})]}),e.jsxs(R,{children:[e.jsx(x,{$active:r==="overview",onClick:()=>a("overview"),children:"Overview & KPIs"}),e.jsxs(x,{$active:r==="sales",onClick:()=>a("sales"),children:["Sales History (",((p=i.sales)==null?void 0:p.length)||0,")"]}),e.jsxs(x,{$active:r==="attendance",onClick:()=>a("attendance"),children:["Recent Attendance (",((m=i.attendances)==null?void 0:m.length)||0,")"]}),e.jsxs(x,{$active:r==="commissions",onClick:()=>a("commissions"),children:["Commissions Ledger (",((f=i.commissions)==null?void 0:f.length)||0,")"]})]}),r==="overview"&&e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20},children:[e.jsxs("div",{style:{background:"#fff",border:"1px solid #e2e8f0",borderRadius:8,padding:20},children:[e.jsx("h3",{style:{fontSize:"0.9rem",fontWeight:700,margin:"0 0 14px 0"},children:"Product Sales Distribution"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.84rem"},children:[e.jsx("span",{children:"Loose Diamonds"}),e.jsxs("strong",{children:[(s==null?void 0:s.diamondSalesCount)||0," Deals"]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.84rem"},children:[e.jsx("span",{children:"Finished Jewelry"}),e.jsxs("strong",{children:[(s==null?void 0:s.jewelrySalesCount)||0," Deals"]})]})]})]}),e.jsxs("div",{style:{background:"#fff",border:"1px solid #e2e8f0",borderRadius:8,padding:20},children:[e.jsx("h3",{style:{fontSize:"0.9rem",fontWeight:700,margin:"0 0 14px 0"},children:"Commission Status Breakdown"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.84rem"},children:[e.jsx("span",{children:"Pending Approvals:"}),e.jsxs("strong",{style:{color:"#d97706"},children:["$",((g=(j=s==null?void 0:s.commissionSummary)==null?void 0:j.pending)==null?void 0:g.toLocaleString())||0]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.84rem"},children:[e.jsx("span",{children:"Approved (Awaiting Payout):"}),e.jsxs("strong",{style:{color:"#2563eb"},children:["$",((y=(u=s==null?void 0:s.commissionSummary)==null?void 0:u.approved)==null?void 0:y.toLocaleString())||0]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.84rem"},children:[e.jsx("span",{children:"Paid Out:"}),e.jsxs("strong",{style:{color:"#16a34a"},children:["$",((v=(b=s==null?void 0:s.commissionSummary)==null?void 0:b.paid)==null?void 0:v.toLocaleString())||0]})]})]})]})]}),r==="sales"&&e.jsxs(h,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Invoice"}),e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Customer"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Sale Amount"}),e.jsx("th",{children:"Net Profit"}),e.jsx("th",{children:"Commission"}),e.jsx("th",{children:"Status"})]})}),e.jsx("tbody",{children:(S=i.sales)==null?void 0:S.map(t=>{var l,L,C;return e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:700},children:e.jsx(k,{to:`${D}/sales/${t.id}`,style:{color:"#0f172a"},children:t.invoiceNo})}),e.jsx("td",{children:new Date(t.saleDate).toLocaleDateString()}),e.jsx("td",{children:t.customerName}),e.jsx("td",{children:t.productType}),e.jsxs("td",{style:{fontWeight:600},children:["$",(l=t.finalSaleAmount)==null?void 0:l.toLocaleString()]}),e.jsxs("td",{style:{color:"#16a34a"},children:["$",(L=t.netProfit)==null?void 0:L.toLocaleString()]}),e.jsxs("td",{style:{color:"#d97706"},children:["$",(C=t.commissionAmount)==null?void 0:C.toLocaleString()]}),e.jsx("td",{children:t.orderStatus})]},t.id)})})]}),r==="attendance"&&e.jsxs(h,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Check In"}),e.jsx("th",{children:"Check Out"}),e.jsx("th",{children:"Hours"}),e.jsx("th",{children:"Late"})]})}),e.jsx("tbody",{children:(w=i.attendances)==null?void 0:w.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:new Date(t.date).toLocaleDateString()}),e.jsx("td",{style:{fontWeight:600},children:t.status}),e.jsx("td",{children:t.checkInTime?new Date(t.checkInTime).toLocaleTimeString():"-"}),e.jsx("td",{children:t.checkOutTime?new Date(t.checkOutTime).toLocaleTimeString():"-"}),e.jsxs("td",{children:[t.workingHours||0," hrs"]}),e.jsx("td",{children:t.lateStatus?"⚠️ Late":"On Time"})]},t.id))})]}),r==="commissions"&&e.jsxs(h,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Sale Invoice"}),e.jsx("th",{children:"Rate %"}),e.jsx("th",{children:"Amount"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Approved At"}),e.jsx("th",{children:"Paid At"})]})}),e.jsx("tbody",{children:(A=i.commissions)==null?void 0:A.map(t=>{var l;return e.jsxs("tr",{children:[e.jsx("td",{children:t.saleId}),e.jsxs("td",{children:[((t.commissionRate||0)*100).toFixed(1),"%"]}),e.jsxs("td",{style:{fontWeight:700,color:"#d97706"},children:["$",(l=t.commissionAmount)==null?void 0:l.toLocaleString()]}),e.jsx("td",{children:t.status}),e.jsx("td",{children:t.approvedAt?new Date(t.approvedAt).toLocaleDateString():"-"}),e.jsx("td",{children:t.paidAt?new Date(t.paidAt).toLocaleDateString():"-"})]},t.id)})})]})]}):e.jsx("div",{style:{padding:40,textAlign:"center"},children:"Employee not found."})};export{q as BusinessEmployeeDetailPage};
