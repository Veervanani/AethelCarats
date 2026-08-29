import{r as l,j as e,f as g,Q as k}from"./react-vendor-BXyx942q.js";import{g as d}from"./ui-vendor-VHkRGmvp.js";import{P as b}from"./admin-pages-BTB8K7Fd.js";import{b as f}from"./businessApi-k95MMcEU.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const E=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,w=d.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
`,x=d.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid ${({$color:n})=>n||"#0d1319"};
  border-radius: 8px;
  padding: 16px;

  .label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
  }
  .val {
    font-size: 1.4rem;
    font-weight: 800;
    color: #0f172a;
    margin-top: 4px;
  }
  .sub {
    font-size: 0.72rem;
    color: #64748b;
    margin-top: 4px;
  }
`,D=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 12px 18px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`,I=d.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;

  th {
    text-align: left;
    padding: 12px 16px;
    background: #f8fafc;
    color: #475569;
    font-weight: 600;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
    vertical-align: middle;
  }

  tr:hover td {
    background: #f8fafc;
  }
`,z=d.span`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-block;

  ${({$status:n})=>{switch(n){case"PAID":return"background: #ebfbee; color: #2b8a3e; border: 1px solid #b2f2bb;";case"APPROVED":return"background: #e7f5ff; color: #1c7ed6; border: 1px solid #a5d8ff;";case"PENDING":return"background: #fff9db; color: #f59f00; border: 1px solid #ffe066;";case"CANCELLED":return"background: #fff5f5; color: #e03131; border: 1px solid #ffc9c9;";default:return"background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1;"}}}
`,G=()=>{const[n,j]=l.useState([]),[o,y]=l.useState(null),[v,S]=l.useState([]),[c,A]=l.useState("ALL"),[p,P]=l.useState("ALL"),[C,h]=l.useState(!0),m=async()=>{h(!0);try{const[s,i]=await Promise.all([f.getCommissions({status:c!=="ALL"?c:void 0,employeeId:p!=="ALL"?p:void 0}),f.getEmployees({status:"ACTIVE"})]);j(s.commissions||[]),y(s.stats),S(i.employees||[])}catch(s){console.error(s)}finally{h(!1)}};l.useEffect(()=>{m()},[c,p]);const N=async s=>{var i,t;try{await f.approveCommission(s),m()}catch(r){alert(((t=(i=r==null?void 0:r.response)==null?void 0:i.data)==null?void 0:t.message)||"Approval failed")}},L=async s=>{var t,r;const i=prompt("Enter payment reference (e.g. Bank Transfer / Check #):","Bank Wire");if(i)try{await f.payCommission(s,i),m()}catch(a){alert(((r=(t=a==null?void 0:a.response)==null?void 0:t.data)==null?void 0:r.message)||"Payout failed")}};return e.jsxs("div",{children:[e.jsxs(E,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Sales Commissions & Payouts"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Commission calculations ledger, approval queues, and payout disbursement tracking"})]}),e.jsxs(g,{to:`${b}/commission-plans`,style:{display:"flex",alignItems:"center",gap:8,padding:"8px 16px",background:"#0d1319",color:"#ffffff",borderRadius:6,fontSize:"0.82rem",fontWeight:600,textDecoration:"none"},children:[e.jsx(k,{size:15})," Commission Plans & Rules"]})]}),e.jsxs(w,{children:[e.jsxs(x,{$color:"#f59f00",children:[e.jsx("div",{className:"label",children:"Pending Approval"}),e.jsxs("div",{className:"val",style:{color:"#d97706"},children:["$",((o==null?void 0:o.pendingAmount)||0).toLocaleString()]}),e.jsxs("div",{className:"sub",children:[(o==null?void 0:o.pendingCount)||0," Transactions"]})]}),e.jsxs(x,{$color:"#1c7ed6",children:[e.jsx("div",{className:"label",children:"Approved (Awaiting Payout)"}),e.jsxs("div",{className:"val",style:{color:"#2563eb"},children:["$",((o==null?void 0:o.approvedAmount)||0).toLocaleString()]}),e.jsxs("div",{className:"sub",children:[(o==null?void 0:o.approvedCount)||0," Transactions"]})]}),e.jsxs(x,{$color:"#2b8a3e",children:[e.jsx("div",{className:"label",children:"Paid Out"}),e.jsxs("div",{className:"val",style:{color:"#16a34a"},children:["$",((o==null?void 0:o.paidAmount)||0).toLocaleString()]}),e.jsxs("div",{className:"sub",children:[(o==null?void 0:o.paidCount)||0," Transactions"]})]}),e.jsxs(x,{$color:"#0d1319",children:[e.jsx("div",{className:"label",children:"Total Commissions"}),e.jsxs("div",{className:"val",children:["$",((o==null?void 0:o.totalCommission)||0).toLocaleString()]}),e.jsx("div",{className:"sub",children:"All statuses combined"})]})]}),e.jsxs(D,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("select",{value:c,onChange:s=>A(s.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Statuses"}),e.jsx("option",{value:"PENDING",children:"PENDING"}),e.jsx("option",{value:"APPROVED",children:"APPROVED"}),e.jsx("option",{value:"PAID",children:"PAID"})]}),e.jsxs("select",{value:p,onChange:s=>P(s.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Staff Members"}),v.map(s=>e.jsxs("option",{value:s.id,children:[s.fullName," (",s.employeeCode,")"]},s.id))]})]}),e.jsxs("div",{style:{fontSize:"0.8rem",color:"#64748b"},children:["Showing ",n.length," records"]})]}),e.jsxs(I,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Employee"}),e.jsx("th",{children:"Sale Invoice"}),e.jsx("th",{children:"Client"}),e.jsx("th",{children:"Sale Date"}),e.jsx("th",{children:"Basis"}),e.jsx("th",{children:"Rate"}),e.jsx("th",{children:"Commission Amount"}),e.jsx("th",{children:"Status"}),e.jsx("th",{style:{textAlign:"right"},children:"Actions"})]})}),e.jsxs("tbody",{children:[n.map(s=>{var i,t,r,a,u;return e.jsxs("tr",{children:[e.jsxs("td",{style:{fontWeight:600},children:[e.jsx("div",{children:(i=s.employee)==null?void 0:i.fullName}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:(t=s.employee)==null?void 0:t.employeeCode})]}),e.jsx("td",{style:{fontWeight:700},children:e.jsx(g,{to:`${b}/sales/${s.saleId}`,style:{color:"#0d1319"},children:((r=s.sale)==null?void 0:r.invoiceNo)||"INV"})}),e.jsx("td",{children:((a=s.sale)==null?void 0:a.customerName)||"-"}),e.jsx("td",{children:(u=s.sale)!=null&&u.saleDate?new Date(s.sale.saleDate).toLocaleDateString():"-"}),e.jsx("td",{children:s.commissionBasis}),e.jsxs("td",{children:[(s.commissionRate*100).toFixed(1),"%"]}),e.jsxs("td",{style:{fontWeight:800,color:"#d97706",fontSize:"0.9rem"},children:["$",s.commissionAmount.toLocaleString()]}),e.jsx("td",{children:e.jsx(z,{$status:s.status,children:s.status})}),e.jsx("td",{style:{textAlign:"right"},children:e.jsxs("div",{style:{display:"inline-flex",gap:6},children:[s.status==="PENDING"&&e.jsx("button",{onClick:()=>N(s.id),style:{padding:"4px 10px",background:"#2563eb",color:"#fff",border:"none",borderRadius:4,fontSize:"0.75rem",fontWeight:600,cursor:"pointer"},children:"Approve"}),s.status==="APPROVED"&&e.jsx("button",{onClick:()=>L(s.id),style:{padding:"4px 10px",background:"#16a34a",color:"#fff",border:"none",borderRadius:4,fontSize:"0.75rem",fontWeight:600,cursor:"pointer"},children:"Mark Paid"})]})})]},s.id)}),n.length===0&&!C&&e.jsx("tr",{children:e.jsx("td",{colSpan:9,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No commissions found for selected filters."})})]})]})]})};export{G as BusinessCommissionPage};
