import{r as i,j as e}from"./react-vendor-BRIbQ1pk.js";import{g as o}from"./ui-vendor-B_xwrEci.js";import{b as c}from"./businessApi-M3o-idrU.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-CcwK00Co.js";import"./admin-tools-vendor-CKN5doRT.js";const h=o.div`
  margin-bottom: 24px;
`,x=o.div`
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
`,p=o.table`
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
`,w=()=>{const[r,d]=i.useState([]),[a,l]=i.useState(!0);return i.useEffect(()=>{c.getAuditLogs().then(t=>d(t.logs||[])).finally(()=>l(!1))},[]),e.jsxs("div",{children:[e.jsxs(h,{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Business Activity Audit Trail"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Immutable logs tracking employee modifications, attendance adjustments, sales creations, and payouts"})]}),e.jsx(x,{children:e.jsxs(p,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Timestamp"}),e.jsx("th",{children:"Authorized User"}),e.jsx("th",{children:"Module"}),e.jsx("th",{children:"Action"}),e.jsx("th",{children:"Details / Payload"})]})}),e.jsxs("tbody",{children:[r.map(t=>{var s,n;return e.jsxs("tr",{children:[e.jsx("td",{style:{color:"#64748b",fontSize:"0.75rem"},children:new Date(t.createdAt).toLocaleString()}),e.jsx("td",{style:{fontWeight:600},children:((s=t.user)==null?void 0:s.name)||((n=t.user)==null?void 0:n.email)||"SYSTEM"}),e.jsx("td",{children:t.object||"Business Hub"}),e.jsx("td",{children:e.jsx("span",{style:{fontSize:"0.72rem",padding:"2px 6px",background:"#f1f5f9",borderRadius:4,fontWeight:700},children:t.action})}),e.jsx("td",{style:{maxWidth:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:t.newValue||t.oldValue||"-"})]},t.id)}),r.length===0&&!a&&e.jsx("tr",{children:e.jsx("td",{colSpan:5,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No audit logs recorded yet."})})]})]})})]})};export{w as BusinessAuditLogsPage};
