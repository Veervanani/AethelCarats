import{r as a,j as e,aW as k}from"./react-vendor-BXyx942q.js";import{g as d}from"./ui-vendor-VHkRGmvp.js";import{b as S}from"./businessApi-DCLK4cxV.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-CpQOasEv.js";import"./admin-tools-vendor-CKN5doRT.js";const A=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
`,v=d.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`,I=d.table`
  border-collapse: collapse;
  font-size: 0.72rem;
  width: 100%;

  th, td {
    border: 1px solid #e2e8f0;
    padding: 6px 4px;
    text-align: center;
    min-width: 24px;
  }

  th {
    background: #f8fafc;
    color: #475569;
    font-weight: 700;
  }

  .emp-col {
    text-align: left;
    padding: 8px 12px;
    min-width: 180px;
    font-weight: 600;
    background: #f8fafc;
    position: sticky;
    left: 0;
    z-index: 10;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.04);
  }

  .status-p {
    background: #ebfbee;
    color: #2b8a3e;
    font-weight: 700;
  }

  .status-a {
    background: #fff5f5;
    color: #e03131;
    font-weight: 700;
  }

  .status-l {
    background: #f3f0ff;
    color: #7950f2;
    font-weight: 700;
  }

  .status-hd {
    background: #fff9db;
    color: #f59f00;
    font-weight: 700;
  }
`,R=()=>{const[o,u]=a.useState(new Date().toISOString().slice(0,7)),[c,y]=a.useState([]),[f,m]=a.useState(31),[j,p]=a.useState(!0),w=async()=>{p(!0);try{const t=await S.getMonthlyAttendanceReport(o);y(t.report||[]),m(t.daysInMonth||31)}catch(t){console.error(t)}finally{p(!1)}};a.useEffect(()=>{w()},[o]);const h=Array.from({length:f},(t,l)=>l+1);return e.jsxs("div",{children:[e.jsxs(A,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Monthly Attendance Matrix"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Comprehensive month-view attendance and hours log for all staff members"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("input",{type:"month",value:o,onChange:t=>u(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.84rem"}}),e.jsxs("button",{onClick:()=>window.print(),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6,fontSize:"0.8rem",fontWeight:600,cursor:"pointer"},children:[e.jsx(k,{size:14})," Print"]})]})]}),e.jsxs("div",{style:{display:"flex",gap:16,marginBottom:16,fontSize:"0.75rem",fontWeight:600,flexWrap:"wrap"},children:[e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:12,height:12,background:"#ebfbee",border:"1px solid #b2f2bb",display:"inline-block"}})," P = Present"]}),e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:12,height:12,background:"#fff5f5",border:"1px solid #ffc9c9",display:"inline-block"}})," A = Absent"]}),e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:12,height:12,background:"#fff9db",border:"1px solid #ffe066",display:"inline-block"}})," HD = Half Day"]}),e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:12,height:12,background:"#f3f0ff",border:"1px solid #d0bfff",display:"inline-block"}})," L = Leave"]})]}),e.jsx(v,{children:e.jsxs(I,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"emp-col",children:"Staff Member"}),h.map(t=>e.jsx("th",{children:t},t)),e.jsx("th",{style:{background:"#f1f5f9"},children:"Pres"}),e.jsx("th",{style:{background:"#f1f5f9"},children:"Abs"}),e.jsx("th",{style:{background:"#f1f5f9"},children:"Late"}),e.jsx("th",{style:{background:"#f1f5f9"},children:"Total Hrs"})]})}),e.jsxs("tbody",{children:[c.map(t=>{var l,x,g,b;return e.jsxs("tr",{children:[e.jsxs("td",{className:"emp-col",children:[e.jsx("div",{children:t.employee.fullName}),e.jsx("div",{style:{fontSize:"0.64rem",color:"#64748b"},children:t.employee.employeeCode})]}),h.map(i=>{const s=t.days[i];if(!s)return e.jsx("td",{children:"-"},i);let r="",n="-";return s.status==="PRESENT"?(r="status-p",n=s.lateStatus?"P*":"P"):s.status==="ABSENT"?(r="status-a",n="A"):s.status==="LEAVE"?(r="status-l",n="L"):s.status==="HALF_DAY"&&(r="status-hd",n="HD"),e.jsx("td",{className:r,title:`${s.status} (${s.workingHours||0} hrs)`,children:n},i)}),e.jsx("td",{style:{fontWeight:700,color:"#16a34a"},children:((l=t.summary)==null?void 0:l.present)||0}),e.jsx("td",{style:{fontWeight:700,color:"#dc2626"},children:((x=t.summary)==null?void 0:x.absent)||0}),e.jsx("td",{style:{fontWeight:700,color:"#d97706"},children:((g=t.summary)==null?void 0:g.late)||0}),e.jsx("td",{style:{fontWeight:800},children:((b=t.summary)==null?void 0:b.totalHours)||0})]},t.employee.id)}),c.length===0&&!j&&e.jsx("tr",{children:e.jsxs("td",{colSpan:f+5,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:["No records found for ",o,"."]})})]})]})})]})};export{R as BusinessAttendanceReportPage};
