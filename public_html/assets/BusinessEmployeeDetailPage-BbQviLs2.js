import{ao as T,r as d,j as e,f as w,ap as $}from"./react-vendor-BQZO0c5l.js";import{g as l}from"./ui-vendor-Bs2yixgz.js";import{P as k}from"./admin-pages-Ct4W_IMd.js";import{b as E}from"./businessApi-efhaDExd.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const I=l.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 12px 14px;
  }
`,W=l.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`,c=l.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 14px;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 10px 12px;
  }

  .stat-label {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 4px;
  }
  .stat-val {
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f172a;
    word-break: break-word;

    @media (max-width: 640px) {
      font-size: 1.1rem;
    }
  }
`,R=l.div`
  display: flex;
  gap: 6px;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 16px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`,x=l.button`
  padding: 8px 14px;
  background: none;
  border: none;
  border-bottom: 2px solid ${({$active:n})=>n?"#0d1319":"transparent"};
  color: ${({$active:n})=>n?"#0d1319":"#64748b"};
  font-weight: ${({$active:n})=>n?"700":"500"};
  font-size: 0.8rem;
  cursor: pointer;
  margin-bottom: -2px;
  white-space: nowrap;
  flex-shrink: 0;
`,h=l.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 20px;
`,p=l.table`
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  font-size: 0.82rem;
  background: #ffffff;
  white-space: nowrap;

  th {
    text-align: left;
    padding: 12px 16px;
    background: #f8fafc;
    color: #475569;
    font-weight: 700;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
  }
`,_=()=>{var m,f,j,g,u,b,y,v,S;const{id:n}=T(),[i,A]=d.useState(null),[s,D]=d.useState(null),[o,a]=d.useState("overview"),[N,P]=d.useState(!0);return d.useEffect(()=>{n&&E.getEmployeeById(n).then(t=>{const r=t.employee||{},C=r.sales||t.sales||t.recentOrders||[],L=r.attendances||t.attendances||[],z=r.commissions||t.commissions||[];r.sales=C,r.attendances=L,r.commissions=z,A(r),D(t.stats)}).finally(()=>P(!1))},[n]),N?e.jsx("div",{style:{padding:40,textAlign:"center"},children:"Loading Employee Profile..."}):i?e.jsxs("div",{children:[e.jsxs(w,{to:`${k}/employees`,style:{display:"inline-flex",alignItems:"center",gap:6,fontSize:"0.8rem",color:"#64748b",textDecoration:"none",marginBottom:16},children:[e.jsx($,{size:14})," Back to Employees Directory"]}),e.jsx(I,{children:e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:i.fullName||i.name||"Employee Profile"}),e.jsx("span",{style:{fontSize:"0.72rem",padding:"2px 8px",background:"#f1f5f9",borderRadius:4,fontWeight:700},children:i.employeeCode})]}),e.jsxs("div",{style:{display:"flex",gap:16,marginTop:8,fontSize:"0.8rem",color:"#64748b",flexWrap:"wrap"},children:[e.jsxs("span",{children:["🏢 ",i.department||"Sales"]}),e.jsxs("span",{children:["💼 ",i.designation||"Sales Executive"]}),e.jsxs("span",{children:["📧 ",i.email]}),e.jsxs("span",{children:["📞 ",i.phone||"No phone"]})]})]})}),e.jsxs(W,{children:[e.jsxs(c,{children:[e.jsx("div",{className:"stat-label",children:"Total Invoiced Orders"}),e.jsx("div",{className:"stat-val",children:(s==null?void 0:s.totalOrders)||0})]}),e.jsxs(c,{children:[e.jsx("div",{className:"stat-label",children:"Total Sales Volume"}),e.jsxs("div",{className:"stat-val",style:{color:"#0d1319"},children:["$",((s==null?void 0:s.totalSalesAmount)||0).toLocaleString()]})]}),e.jsxs(c,{children:[e.jsx("div",{className:"stat-label",children:"Net Profit Generated"}),e.jsxs("div",{className:"stat-val",style:{color:"#16a34a"},children:["$",((s==null?void 0:s.netProfit)||0).toLocaleString()]})]}),e.jsxs(c,{children:[e.jsx("div",{className:"stat-label",children:"Earned Commission"}),e.jsxs("div",{className:"stat-val",style:{color:"#d97706"},children:["$",((s==null?void 0:s.totalCommission)||0).toLocaleString()]})]})]}),e.jsxs(R,{children:[e.jsx(x,{$active:o==="overview",onClick:()=>a("overview"),children:"Overview & KPIs"}),e.jsxs(x,{$active:o==="sales",onClick:()=>a("sales"),children:["Sales History (",((m=i.sales)==null?void 0:m.length)||0,")"]}),e.jsxs(x,{$active:o==="attendance",onClick:()=>a("attendance"),children:["Recent Attendance (",((f=i.attendances)==null?void 0:f.length)||0,")"]}),e.jsxs(x,{$active:o==="commissions",onClick:()=>a("commissions"),children:["Commissions Ledger (",((j=i.commissions)==null?void 0:j.length)||0,")"]})]}),o==="overview"&&e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20},children:[e.jsxs("div",{style:{background:"#fff",border:"1px solid #e2e8f0",borderRadius:8,padding:20},children:[e.jsx("h3",{style:{fontSize:"0.9rem",fontWeight:700,margin:"0 0 14px 0"},children:"Product Sales Distribution"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.84rem"},children:[e.jsx("span",{children:"Loose Diamonds"}),e.jsxs("strong",{children:[(s==null?void 0:s.diamondSalesCount)||0," Deals"]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.84rem"},children:[e.jsx("span",{children:"Finished Jewelry"}),e.jsxs("strong",{children:[(s==null?void 0:s.jewelrySalesCount)||0," Deals"]})]})]})]}),e.jsxs("div",{style:{background:"#fff",border:"1px solid #e2e8f0",borderRadius:8,padding:20},children:[e.jsx("h3",{style:{fontSize:"0.9rem",fontWeight:700,margin:"0 0 14px 0"},children:"Commission Status Breakdown"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.84rem"},children:[e.jsx("span",{children:"Pending Approvals:"}),e.jsxs("strong",{style:{color:"#d97706"},children:["$",((u=(g=s==null?void 0:s.commissionSummary)==null?void 0:g.pending)==null?void 0:u.toLocaleString())||0]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.84rem"},children:[e.jsx("span",{children:"Approved (Awaiting Payout):"}),e.jsxs("strong",{style:{color:"#2563eb"},children:["$",((y=(b=s==null?void 0:s.commissionSummary)==null?void 0:b.approved)==null?void 0:y.toLocaleString())||0]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.84rem"},children:[e.jsx("span",{children:"Paid Out:"}),e.jsxs("strong",{style:{color:"#16a34a"},children:["$",((S=(v=s==null?void 0:s.commissionSummary)==null?void 0:v.paid)==null?void 0:S.toLocaleString())||0]})]})]})]})]}),o==="sales"&&e.jsx(h,{children:e.jsxs(p,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Invoice"}),e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Customer"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Sale Amount"}),e.jsx("th",{children:"Net Profit"}),e.jsx("th",{children:"Commission"}),e.jsx("th",{children:"Status"})]})}),e.jsx("tbody",{children:i.sales&&i.sales.length>0?i.sales.map(t=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:700},children:e.jsx(w,{to:`${k}/sales/${t.id}`,style:{color:"#0f172a"},children:t.invoiceNo})}),e.jsx("td",{children:new Date(t.saleDate).toLocaleDateString()}),e.jsx("td",{children:t.customerName}),e.jsx("td",{children:t.productType}),e.jsxs("td",{style:{fontWeight:600},children:["$",(Number(t.finalSaleAmount)||0).toLocaleString()]}),e.jsxs("td",{style:{color:"#16a34a",fontWeight:600},children:["$",(Number(t.netProfit)||0).toLocaleString()]}),e.jsxs("td",{style:{color:"#d97706",fontWeight:600},children:["$",(Number(t.commissionAmount)||0).toLocaleString()]}),e.jsx("td",{children:e.jsx("span",{style:{padding:"3px 8px",borderRadius:4,background:t.orderStatus==="Delivered"?"#f0fdf4":"#f8fafc",color:t.orderStatus==="Delivered"?"#16a34a":"#475569",fontWeight:600,fontSize:"0.75rem"},children:t.orderStatus||"Delivered"})})]},t.id)):e.jsx("tr",{children:e.jsx("td",{colSpan:8,style:{textAlign:"center",padding:"36px 16px",color:"#94a3b8"},children:"No recorded sales found for this employee yet."})})})]})}),o==="attendance"&&e.jsx(h,{children:e.jsxs(p,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Check In"}),e.jsx("th",{children:"Check Out"}),e.jsx("th",{children:"Hours"}),e.jsx("th",{children:"Late"})]})}),e.jsx("tbody",{children:i.attendances&&i.attendances.length>0?i.attendances.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:new Date(t.date).toLocaleDateString()}),e.jsx("td",{style:{fontWeight:600},children:t.status}),e.jsx("td",{children:t.checkInTime?new Date(t.checkInTime).toLocaleTimeString():"-"}),e.jsx("td",{children:t.checkOutTime?new Date(t.checkOutTime).toLocaleTimeString():"-"}),e.jsxs("td",{children:[t.workingHours||0," hrs"]}),e.jsx("td",{children:t.lateStatus?"⚠️ Late":"On Time"})]},t.id)):e.jsx("tr",{children:e.jsx("td",{colSpan:6,style:{textAlign:"center",padding:"36px 16px",color:"#94a3b8"},children:"No attendance records logged for this employee yet."})})})]})}),o==="commissions"&&e.jsx(h,{children:e.jsxs(p,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Sale Invoice"}),e.jsx("th",{children:"Rate %"}),e.jsx("th",{children:"Amount"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Approved At"}),e.jsx("th",{children:"Paid At"})]})}),e.jsx("tbody",{children:i.commissions&&i.commissions.length>0?i.commissions.map(t=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:700},children:t.saleInvoice||t.saleId}),e.jsxs("td",{children:[((Number(t.commissionRate)||0)*100).toFixed(1),"%"]}),e.jsxs("td",{style:{fontWeight:700,color:"#d97706"},children:["$",(Number(t.commissionAmount)||0).toLocaleString()]}),e.jsx("td",{children:e.jsx("span",{style:{padding:"3px 8px",borderRadius:4,background:t.status==="PAID"?"#f0fdf4":t.status==="APPROVED"?"#eff6ff":"#fefce8",color:t.status==="PAID"?"#16a34a":t.status==="APPROVED"?"#2563eb":"#d97706",fontWeight:600,fontSize:"0.75rem"},children:t.status||"PENDING"})}),e.jsx("td",{children:t.approvedAt?new Date(t.approvedAt).toLocaleDateString():"-"}),e.jsx("td",{children:t.paidAt?new Date(t.paidAt).toLocaleDateString():"-"})]},t.id)):e.jsx("tr",{children:e.jsx("td",{colSpan:6,style:{textAlign:"center",padding:"36px 16px",color:"#94a3b8"},children:"No commissions recorded for this employee yet."})})})]})})]}):e.jsx("div",{style:{padding:40,textAlign:"center"},children:"Employee not found."})};export{_ as BusinessEmployeeDetailPage};
