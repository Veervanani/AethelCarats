import{r as c,j as e,aW as v}from"./react-vendor-BXyx942q.js";import{g}from"./ui-vendor-VHkRGmvp.js";import{b as x}from"./businessApi-Bdm5aIM4.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-BBG06x5T.js";import"./admin-tools-vendor-CKN5doRT.js";const R=g.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
`,W=g.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`,T=g.table`
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
`,$=()=>{const[o,w]=c.useState(new Date().toISOString().slice(0,7)),[y,A]=c.useState([]),[u,E]=c.useState(31),[N,m]=c.useState(!0),[b,j]=c.useState(!1),h=async()=>{m(!0);try{const t=await x.getMonthlyAttendanceReport(o);A(t.report||[]),E(t.daysInMonth||31)}catch(t){console.error(t)}finally{m(!1)}};c.useEffect(()=>{h()},[o]);const M=async()=>{var t,n;if(window.confirm(`Mark all employees as PRESENT for the entire month (${o})?`)){j(!0);try{await x.markAllEmployeesPresentForMonth(o),await h(),alert(`✅ All employees successfully marked PRESENT for ${o}`)}catch(a){alert(((n=(t=a==null?void 0:a.response)==null?void 0:t.data)==null?void 0:n.message)||"Failed to mark attendance")}finally{j(!1)}}},P=async(t,n,a)=>{const i={PRESENT:"ABSENT",ABSENT:"HALF_DAY",HALF_DAY:"LEAVE",LEAVE:"PRESENT","-":"PRESENT"}[a||"-"]||"PRESENT",[r,s]=o.split("-"),p=`${r}-${s.padStart(2,"0")}-${String(n).padStart(2,"0")}`;try{await x.manualAttendanceEntry({employeeId:t,date:p,status:i,workingHours:i==="PRESENT"?8:i==="HALF_DAY"?4:0,lateStatus:!1}),h()}catch(l){console.error(l)}},k=t=>{const[n,a]=o.split("-").map(Number),d=new Date(n,a-1,t),i=["Su","Mo","Tu","We","Th","Fr","Sa"],r=d.getDay();return{dayName:i[r],isSunday:r===0,isWeekend:r===0||r===6}},S=Array.from({length:u},(t,n)=>n+1);return e.jsxs("div",{children:[e.jsxs(R,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Monthly Attendance Matrix"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Comprehensive month-view attendance ledger with day-of-week calendar mapping"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsxs("button",{onClick:M,disabled:b,style:{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontSize:"0.8rem",fontWeight:600,cursor:"pointer"},children:["⚡ ",b?"Marking...":`Mark All Present (${o})`]}),e.jsx("input",{type:"month",value:o,onChange:t=>w(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.84rem"}}),e.jsxs("button",{onClick:()=>window.print(),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6,fontSize:"0.8rem",fontWeight:600,cursor:"pointer"},children:[e.jsx(v,{size:14})," Print"]})]})]}),e.jsxs("div",{style:{display:"flex",gap:16,marginBottom:16,fontSize:"0.75rem",fontWeight:600,flexWrap:"wrap"},children:[e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:12,height:12,background:"#ebfbee",border:"1px solid #b2f2bb",display:"inline-block"}})," P = Present"]}),e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:12,height:12,background:"#fff5f5",border:"1px solid #ffc9c9",display:"inline-block"}})," A = Absent"]}),e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:12,height:12,background:"#fff9db",border:"1px solid #ffe066",display:"inline-block"}})," HD = Half Day"]}),e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:12,height:12,background:"#f3f0ff",border:"1px solid #d0bfff",display:"inline-block"}})," L = Leave"]}),e.jsx("span",{style:{color:"#64748b",fontSize:"0.72rem",marginLeft:"auto"},children:"💡 Click any day cell to quickly toggle attendance status"})]}),e.jsx(W,{children:e.jsxs(T,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"emp-col",children:"Staff Member"}),S.map(t=>{const{dayName:n,isSunday:a,isWeekend:d}=k(t);return e.jsxs("th",{style:{background:a?"#fee2e2":d?"#f1f5f9":"#f8fafc",color:a?"#dc2626":"#475569",padding:"4px 2px"},children:[e.jsx("div",{style:{fontSize:"0.62rem",fontWeight:600,opacity:.9},children:n}),e.jsx("div",{style:{fontSize:"0.76rem",fontWeight:800},children:t})]},t)}),e.jsx("th",{style:{background:"#f1f5f9"},children:"Pres"}),e.jsx("th",{style:{background:"#f1f5f9"},children:"Abs"}),e.jsx("th",{style:{background:"#f1f5f9"},children:"Late"}),e.jsx("th",{style:{background:"#f1f5f9"},children:"Total Hrs"})]})}),e.jsxs("tbody",{children:[y.map(t=>{var n,a,d,i;return e.jsxs("tr",{children:[e.jsxs("td",{className:"emp-col",children:[e.jsx("div",{children:t.employee.fullName||t.employee.name}),e.jsx("div",{style:{fontSize:"0.64rem",color:"#64748b"},children:t.employee.employeeCode})]}),S.map(r=>{const s=t.days[r],{isSunday:p}=k(r);let l="",f="-";return s&&(s.status==="PRESENT"?(l="status-p",f=s.lateStatus?"P*":"P"):s.status==="ABSENT"?(l="status-a",f="A"):s.status==="LEAVE"?(l="status-l",f="L"):s.status==="HALF_DAY"&&(l="status-hd",f="HD")),e.jsx("td",{className:l,onClick:()=>P(t.employee.id,r,s==null?void 0:s.status),style:{cursor:"pointer",background:!l&&p?"#fff1f2":void 0,color:!l&&p?"#f43f5e":void 0},title:`Click to change: ${(s==null?void 0:s.status)||"UNMARKED"} (${(s==null?void 0:s.workingHours)||0} hrs)`,children:f},r)}),e.jsx("td",{style:{fontWeight:700,color:"#16a34a"},children:((n=t.summary)==null?void 0:n.present)||0}),e.jsx("td",{style:{fontWeight:700,color:"#dc2626"},children:((a=t.summary)==null?void 0:a.absent)||0}),e.jsx("td",{style:{fontWeight:700,color:"#d97706"},children:((d=t.summary)==null?void 0:d.late)||0}),e.jsx("td",{style:{fontWeight:800},children:((i=t.summary)==null?void 0:i.totalHours)||0})]},t.employee.id)}),y.length===0&&!N&&e.jsx("tr",{children:e.jsxs("td",{colSpan:u+5,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:["No records found for ",o,"."]})})]})]})})]})};export{$ as BusinessAttendanceReportPage};
