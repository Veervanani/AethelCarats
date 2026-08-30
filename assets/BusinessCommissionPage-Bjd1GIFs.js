import{r as l,j as e,f as g,Q as k}from"./react-vendor-BRIbQ1pk.js";import{g as a}from"./ui-vendor-B_xwrEci.js";import{P as b}from"./admin-pages-CcwK00Co.js";import{b as x}from"./businessApi-M3o-idrU.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const L=a.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,E=a.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
`,f=a.div`
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
`,D=a.div`
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
`,I=a.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  margin-bottom: 20px;
  scrollbar-width: thin;
`,z=a.table`
  width: 100%;
  min-width: 820px;
  border-collapse: collapse;
  font-size: 0.82rem;
  white-space: nowrap;

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
`,R=a.span`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-block;

  ${({$status:n})=>{switch(n){case"PAID":return"background: #ebfbee; color: #2b8a3e; border: 1px solid #b2f2bb;";case"APPROVED":return"background: #e7f5ff; color: #1c7ed6; border: 1px solid #a5d8ff;";case"PENDING":return"background: #fff9db; color: #f59f00; border: 1px solid #ffe066;";case"CANCELLED":return"background: #fff5f5; color: #e03131; border: 1px solid #ffc9c9;";default:return"background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1;"}}}
`,O=()=>{const[n,j]=l.useState([]),[o,y]=l.useState(null),[v,S]=l.useState([]),[c,A]=l.useState("ALL"),[p,C]=l.useState("ALL"),[P,h]=l.useState(!0),m=async()=>{h(!0);try{const[s,i]=await Promise.all([x.getCommissions({status:c!=="ALL"?c:void 0,employeeId:p!=="ALL"?p:void 0}),x.getEmployees({status:"ACTIVE"})]);j(s.commissions||[]),y(s.stats),S(i.employees||[])}catch(s){console.error(s)}finally{h(!1)}};l.useEffect(()=>{m()},[c,p]);const w=async s=>{var i,r;try{await x.approveCommission(s),m()}catch(t){alert(((r=(i=t==null?void 0:t.response)==null?void 0:i.data)==null?void 0:r.message)||"Approval failed")}},N=async s=>{var r,t;const i=prompt("Enter payment reference (e.g. Bank Transfer / Check #):","Bank Wire");if(i)try{await x.payCommission(s,i),m()}catch(d){alert(((t=(r=d==null?void 0:d.response)==null?void 0:r.data)==null?void 0:t.message)||"Payout failed")}};return e.jsxs("div",{children:[e.jsxs(L,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Sales Commissions & Payouts"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Commission calculations ledger, approval queues, and payout disbursement tracking"})]}),e.jsxs(g,{to:`${b}/commission-plans`,style:{display:"flex",alignItems:"center",gap:8,padding:"8px 16px",background:"#0d1319",color:"#ffffff",borderRadius:6,fontSize:"0.82rem",fontWeight:600,textDecoration:"none"},children:[e.jsx(k,{size:15})," Commission Plans & Rules"]})]}),e.jsxs(E,{children:[e.jsxs(f,{$color:"#f59f00",children:[e.jsx("div",{className:"label",children:"Pending Approval"}),e.jsxs("div",{className:"val",style:{color:"#d97706"},children:["$",((o==null?void 0:o.pendingAmount)||0).toLocaleString()]}),e.jsxs("div",{className:"sub",children:[(o==null?void 0:o.pendingCount)||0," Transactions"]})]}),e.jsxs(f,{$color:"#1c7ed6",children:[e.jsx("div",{className:"label",children:"Approved (Awaiting Payout)"}),e.jsxs("div",{className:"val",style:{color:"#2563eb"},children:["$",((o==null?void 0:o.approvedAmount)||0).toLocaleString()]}),e.jsxs("div",{className:"sub",children:[(o==null?void 0:o.approvedCount)||0," Transactions"]})]}),e.jsxs(f,{$color:"#2b8a3e",children:[e.jsx("div",{className:"label",children:"Paid Out"}),e.jsxs("div",{className:"val",style:{color:"#16a34a"},children:["$",((o==null?void 0:o.paidAmount)||0).toLocaleString()]}),e.jsxs("div",{className:"sub",children:[(o==null?void 0:o.paidCount)||0," Transactions"]})]}),e.jsxs(f,{$color:"#0d1319",children:[e.jsx("div",{className:"label",children:"Total Commissions"}),e.jsxs("div",{className:"val",children:["$",((o==null?void 0:o.totalCommission)||0).toLocaleString()]}),e.jsx("div",{className:"sub",children:"All statuses combined"})]})]}),e.jsxs(D,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("select",{value:c,onChange:s=>A(s.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Statuses"}),e.jsx("option",{value:"PENDING",children:"PENDING"}),e.jsx("option",{value:"APPROVED",children:"APPROVED"}),e.jsx("option",{value:"PAID",children:"PAID"})]}),e.jsxs("select",{value:p,onChange:s=>C(s.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Staff Members"}),v.map(s=>e.jsxs("option",{value:s.id,children:[s.fullName," (",s.employeeCode,")"]},s.id))]})]}),e.jsxs("div",{style:{fontSize:"0.8rem",color:"#64748b"},children:["Showing ",n.length," records"]})]}),e.jsx(I,{children:e.jsxs(z,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Employee"}),e.jsx("th",{children:"Sale Invoice"}),e.jsx("th",{children:"Client"}),e.jsx("th",{children:"Sale Date"}),e.jsx("th",{children:"Basis"}),e.jsx("th",{children:"Rate"}),e.jsx("th",{children:"Commission Amount"}),e.jsx("th",{children:"Status"}),e.jsx("th",{style:{textAlign:"right"},children:"Actions"})]})}),e.jsxs("tbody",{children:[n.map(s=>{var i,r,t,d,u;return e.jsxs("tr",{children:[e.jsxs("td",{style:{fontWeight:600},children:[e.jsx("div",{children:(i=s.employee)==null?void 0:i.fullName}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:(r=s.employee)==null?void 0:r.employeeCode})]}),e.jsx("td",{style:{fontWeight:700},children:e.jsx(g,{to:`${b}/sales/${s.saleId}`,style:{color:"#0d1319"},children:((t=s.sale)==null?void 0:t.invoiceNo)||"INV"})}),e.jsx("td",{children:((d=s.sale)==null?void 0:d.customerName)||"-"}),e.jsx("td",{children:(u=s.sale)!=null&&u.saleDate?new Date(s.sale.saleDate).toLocaleDateString():"-"}),e.jsx("td",{children:s.commissionBasis}),e.jsxs("td",{children:[(s.commissionRate*100).toFixed(1),"%"]}),e.jsxs("td",{style:{fontWeight:800,color:"#d97706",fontSize:"0.9rem"},children:["$",s.commissionAmount.toLocaleString()]}),e.jsx("td",{children:e.jsx(R,{$status:s.status,children:s.status})}),e.jsx("td",{style:{textAlign:"right"},children:e.jsxs("div",{style:{display:"inline-flex",gap:6},children:[s.status==="PENDING"&&e.jsx("button",{onClick:()=>w(s.id),style:{padding:"4px 10px",background:"#2563eb",color:"#fff",border:"none",borderRadius:4,fontSize:"0.75rem",fontWeight:600,cursor:"pointer"},children:"Approve"}),s.status==="APPROVED"&&e.jsx("button",{onClick:()=>N(s.id),style:{padding:"4px 10px",background:"#16a34a",color:"#fff",border:"none",borderRadius:4,fontSize:"0.75rem",fontWeight:600,cursor:"pointer"},children:"Mark Paid"})]})})]},s.id)}),n.length===0&&!P&&e.jsx("tr",{children:e.jsx("td",{colSpan:9,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No commissions found for selected filters."})})]})]})})]})};export{O as BusinessCommissionPage};
