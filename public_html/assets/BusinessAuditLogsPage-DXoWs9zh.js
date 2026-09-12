import{r,j as e,S as h}from"./react-vendor-BQZO0c5l.js";import{g as s}from"./ui-vendor-Bs2yixgz.js";import{b as f}from"./businessApi-BUo1KojG.js";import{e as p}from"./admin-pages-DCWy8I_r.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const g=s.div`
  margin-bottom: 24px;
`,m=s.div`
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
`,u=s.table`
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  font-size: 0.82rem;
  white-space: nowrap;

  th {
    text-align: left;
    padding: 12px 16px;
    background: #0d1319;
    color: #ffffff;
    font-weight: 600;
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
`,v=()=>{const{user:t}=p(),o=(t==null?void 0:t.role)==="ADMIN"||(t==null?void 0:t.role)==="SUPER_ADMIN",[n,l]=r.useState([]),[c,x]=r.useState(!0);return r.useEffect(()=>{o&&f.getAuditLogs().then(i=>l(i.logs||[])).catch(i=>console.error(i)).finally(()=>x(!1))},[o]),o?e.jsxs("div",{children:[e.jsxs(g,{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Business Activity Audit Trail"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Immutable logs tracking employee modifications, attendance adjustments, sales creations, and payouts"})]}),e.jsx(m,{children:e.jsxs(u,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Timestamp"}),e.jsx("th",{children:"Authorized User"}),e.jsx("th",{children:"Module"}),e.jsx("th",{children:"Action"}),e.jsx("th",{children:"Details / Payload"})]})}),e.jsxs("tbody",{children:[n.map(i=>{var d,a;return e.jsxs("tr",{children:[e.jsx("td",{style:{color:"#64748b",fontSize:"0.75rem"},children:new Date(i.createdAt).toLocaleString()}),e.jsx("td",{style:{fontWeight:600},children:((d=i.user)==null?void 0:d.name)||((a=i.user)==null?void 0:a.email)||"SYSTEM"}),e.jsx("td",{children:i.object||"Business Hub"}),e.jsx("td",{children:e.jsx("span",{style:{fontSize:"0.72rem",padding:"2px 6px",background:"#f1f5f9",borderRadius:4,fontWeight:700},children:i.action})}),e.jsx("td",{style:{maxWidth:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:i.newValue||i.oldValue||"-"})]},i.id)}),n.length===0&&!c&&e.jsx("tr",{children:e.jsx("td",{colSpan:5,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No audit logs recorded yet."})})]})]})})]}):e.jsxs("div",{style:{maxWidth:"540px",margin:"40px auto",padding:"36px",background:"#fff",border:"1px solid #e2e8f0",borderRadius:"12px",textAlign:"center",boxShadow:"0 8px 24px rgba(15,23,42,0.06)"},children:[e.jsx(h,{size:42,color:"#dc2626",style:{marginBottom:12}}),e.jsx("h2",{style:{fontSize:"1.35rem",fontWeight:800,color:"#0f172a",margin:"0 0 8px 0"},children:"403 — Restricted Area"}),e.jsxs("p",{style:{color:"#64748b",fontSize:"0.86rem",lineHeight:"1.5",margin:0},children:["Activity Audit Trail inspection is reserved for Administrators. Your account (",t==null?void 0:t.email,") with role ",e.jsx("strong",{children:t==null?void 0:t.role})," is not authorized to view system logs."]})]})};export{v as BusinessAuditLogsPage};
