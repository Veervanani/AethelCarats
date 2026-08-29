import{r as s,j as e}from"./react-vendor-DxLkccZ0.js";import{g as d}from"./ui-vendor-BuBsKREC.js";import{b as c}from"./businessApi-CEPea6U7.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-CJSUgSee.js";import"./admin-tools-vendor-CKN5doRT.js";const f=d.div`
  margin-bottom: 24px;
`,h=d.table`
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
`,b=()=>{const[i,n]=s.useState([]),[l,a]=s.useState(!0);return s.useEffect(()=>{c.getAuditLogs().then(t=>n(t.logs||[])).finally(()=>a(!1))},[]),e.jsxs("div",{children:[e.jsxs(f,{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Business Activity Audit Trail"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Immutable logs tracking employee modifications, attendance adjustments, sales creations, and payouts"})]}),e.jsxs(h,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Timestamp"}),e.jsx("th",{children:"Authorized User"}),e.jsx("th",{children:"Module"}),e.jsx("th",{children:"Action"}),e.jsx("th",{children:"Details / Payload"})]})}),e.jsxs("tbody",{children:[i.map(t=>{var r,o;return e.jsxs("tr",{children:[e.jsx("td",{style:{color:"#64748b",fontSize:"0.75rem"},children:new Date(t.createdAt).toLocaleString()}),e.jsx("td",{style:{fontWeight:600},children:((r=t.user)==null?void 0:r.name)||((o=t.user)==null?void 0:o.email)||"SYSTEM"}),e.jsx("td",{children:t.object||"Business Hub"}),e.jsx("td",{children:e.jsx("span",{style:{fontSize:"0.72rem",padding:"2px 6px",background:"#f1f5f9",borderRadius:4,fontWeight:700},children:t.action})}),e.jsx("td",{style:{maxWidth:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:t.newValue||t.oldValue||"-"})]},t.id)}),i.length===0&&!l&&e.jsx("tr",{children:e.jsx("td",{colSpan:5,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No audit logs recorded yet."})})]})]})]})};export{b as BusinessAuditLogsPage};
