import{r as a,j as e,P as F}from"./react-vendor-Jc2qAOIG.js";import{g as d}from"./ui-vendor-Bp1vOpov.js";import{b as c}from"./businessApi-CwJGiGWz.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-CjFKfWsB.js";import"./admin-tools-vendor-CKN5doRT.js";const B=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;

  h1 {
    font-size: 1.35rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;

    @media (max-width: 640px) {
      font-size: 1.15rem;
    }
  }

  p {
    font-size: 0.78rem;
    color: #64748b;
    margin: 3px 0 0 0;

    @media (max-width: 640px) {
      font-size: 0.72rem;
    }
  }
`,V=d.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`,p=d.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid ${({$color:n})=>n||"#0d1319"};
  border-radius: 8px;
  padding: 12px 14px;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 10px 12px;
  }

  .card-label {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
  }
  .card-val {
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f172a;
    margin-top: 3px;
  }
`,Y=d.div`
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

  @media (max-width: 640px) {
    padding: 10px 12px;
    flex-direction: column;
    align-items: stretch;
  }
`,_=d.div`
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
`,q=d.table`
  width: 100%;
  min-width: 780px;
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
`,Q=d.span`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  ${({$status:n})=>{switch(n){case"PRESENT":return"background: #ebfbee; color: #2b8a3e; border: 1px solid #b2f2bb;";case"ABSENT":return"background: #fff5f5; color: #e03131; border: 1px solid #ffc9c9;";case"HALF_DAY":return"background: #fff9db; color: #f59f00; border: 1px solid #ffe066;";case"LEAVE":return"background: #f3f0ff; color: #7950f2; border: 1px solid #d0bfff;";default:return"background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1;"}}}
`,ee=()=>{const[n,A]=a.useState(null),[C,z]=a.useState([]),[h,R]=a.useState([]),[r,N]=a.useState(new Date().toISOString().split("T")[0]),[L,m]=a.useState(!0),[D,o]=a.useState(!1),[u,j]=a.useState(""),[y,I]=a.useState("PRESENT"),[v,M]=a.useState("09:00"),[S,W]=a.useState("18:00"),[k,P]=a.useState("9"),[w,O]=a.useState(!1),[E,H]=a.useState(""),g=async()=>{m(!0);try{const[t,i,s]=await Promise.all([c.getTodayAttendanceSummary(),c.getAttendance({date:r}),c.getEmployees({status:"ACTIVE"})]);A(t),z(i.records||i.attendance||[]),R(s.employees||[]),s.employees&&s.employees.length>0&&!u&&j(s.employees[0].id)}catch(t){console.error(t)}finally{m(!1)}};a.useEffect(()=>{g()},[r]);const $=async t=>{var i,s;t.preventDefault();try{const l=new Date(`${r}T${v}:00Z`),f=new Date(`${r}T${S}:00Z`);await c.manualAttendanceEntry({employeeId:u,date:r,checkInTime:l,checkOutTime:f,workingHours:Number(k),status:y,lateStatus:w,notes:E}),o(!1),g(),alert("✅ Manual entry saved")}catch(l){alert(((s=(i=l==null?void 0:l.response)==null?void 0:i.data)==null?void 0:s.message)||"Failed to save")}},x=async(t,i,s=!1)=>{var l,f;try{await c.manualAttendanceEntry({employeeId:t,date:r,workingHours:i==="PRESENT"?8:i==="HALF_DAY"?4:0,status:i,lateStatus:s,notes:`Quick-Marked as ${i}`}),await g()}catch(b){alert(((f=(l=b==null?void 0:b.response)==null?void 0:l.data)==null?void 0:f.message)||"Failed to mark attendance")}},T=h.map(t=>{const i=C.find(s=>{var l;return s.employeeId===t.id||((l=s.employee)==null?void 0:l.id)===t.id});return{employee:t,record:i}});return e.jsxs("div",{children:[e.jsxs(B,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Attendance Roster"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Daily check-in logs, punctuality tracking, and 1-click attendance marking"})]}),e.jsxs("button",{onClick:()=>o(!0),style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(F,{size:16})," Record Custom Time"]})]}),e.jsxs(V,{children:[e.jsxs(p,{$color:"#2563eb",children:[e.jsx("div",{className:"card-label",children:"Active Staff"}),e.jsx("div",{className:"card-val",children:(n==null?void 0:n.totalEmployees)||h.length||3})]}),e.jsxs(p,{$color:"#16a34a",children:[e.jsx("div",{className:"card-label",children:"Present Today"}),e.jsx("div",{className:"card-val",style:{color:"#16a34a"},children:(n==null?void 0:n.present)||0})]}),e.jsxs(p,{$color:"#d97706",children:[e.jsx("div",{className:"card-label",children:"Late Arrivals"}),e.jsx("div",{className:"card-val",style:{color:"#d97706"},children:(n==null?void 0:n.late)||0})]}),e.jsxs(p,{$color:"#dc2626",children:[e.jsx("div",{className:"card-label",children:"Absent"}),e.jsx("div",{className:"card-val",style:{color:"#dc2626"},children:(n==null?void 0:n.absent)||0})]}),e.jsxs(p,{$color:"#7c3aed",children:[e.jsx("div",{className:"card-label",children:"On Leave"}),e.jsx("div",{className:"card-val",style:{color:"#7c3aed"},children:(n==null?void 0:n.onLeave)||(n==null?void 0:n.leave)||0})]})]}),e.jsxs(Y,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{style:{fontSize:"0.82rem",fontWeight:600,color:"#334155"},children:"Select Date:"}),e.jsx("input",{type:"date",value:r,onChange:t=>N(t.target.value),style:{padding:"6px 10px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"}})]}),e.jsxs("div",{style:{fontSize:"0.8rem",color:"#64748b"},children:["Viewing roster for ",e.jsx("strong",{children:new Date(r).toDateString()})]})]}),e.jsx(_,{children:e.jsxs(q,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Employee"}),e.jsx("th",{children:"Role / Designation"}),e.jsx("th",{children:"Check In"}),e.jsx("th",{children:"Check Out"}),e.jsx("th",{children:"Hours"}),e.jsx("th",{children:"Current Status"}),e.jsx("th",{children:"Quick Actions"})]})}),e.jsxs("tbody",{children:[T.map(({employee:t,record:i})=>e.jsxs("tr",{children:[e.jsxs("td",{style:{fontWeight:600},children:[e.jsx("div",{children:t.name||t.fullName||"Staff Member"}),e.jsxs("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:[t.employeeCode," • ",t.email]})]}),e.jsxs("td",{children:[e.jsx("div",{style:{fontWeight:600,fontSize:"0.78rem"},children:t.designation||"Sales Executive"}),e.jsx("div",{style:{fontSize:"0.7rem",color:"#64748b"},children:t.role||"SALES_EMPLOYEE"})]}),e.jsx("td",{children:i!=null&&i.checkInTime?new Date(i.checkInTime).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):i!=null&&i.checkIn?new Date(i.checkIn).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"-"}),e.jsx("td",{children:i!=null&&i.checkOutTime?new Date(i.checkOutTime).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):i!=null&&i.checkOut?new Date(i.checkOut).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"-"}),e.jsxs("td",{style:{fontWeight:600},children:[(i==null?void 0:i.workingHours)||(i==null?void 0:i.hoursWorked)||0," hrs"]}),e.jsx("td",{children:i?e.jsx(Q,{$status:i.status,children:i.status}):e.jsx("span",{style:{fontSize:"0.72rem",color:"#94a3b8",background:"#f1f5f9",padding:"2px 6px",borderRadius:4},children:"Not Marked"})}),e.jsx("td",{children:e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("button",{onClick:()=>x(t.id,"PRESENT",!1),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:"#ebfbee",color:"#2b8a3e",border:"1px solid #b2f2bb",borderRadius:4,cursor:"pointer"},title:"Mark Present (On Time)",children:"✓ Present"}),e.jsx("button",{onClick:()=>x(t.id,"PRESENT",!0),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:"#fff9db",color:"#f59f00",border:"1px solid #ffe066",borderRadius:4,cursor:"pointer"},title:"Mark Late",children:"Late"}),e.jsx("button",{onClick:()=>x(t.id,"ABSENT",!1),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:"#fff5f5",color:"#e03131",border:"1px solid #ffc9c9",borderRadius:4,cursor:"pointer"},title:"Mark Absent",children:"Absent"}),e.jsx("button",{onClick:()=>x(t.id,"LEAVE",!1),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:"#f3f0ff",color:"#7950f2",border:"1px solid #d0bfff",borderRadius:4,cursor:"pointer"},title:"Mark Leave",children:"Leave"})]})})]},t.id)),T.length===0&&!L&&e.jsx("tr",{children:e.jsx("td",{colSpan:7,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No active staff found. Add employees in the Employee Directory."})})]})]})}),D&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15, 23, 42, 0.7)",backdropFilter:"blur(3px)",zIndex:1e4,display:"flex",justifyContent:"center",alignItems:"center",padding:10,boxSizing:"border-box"},onClick:()=>o(!1),children:e.jsxs("div",{style:{background:"#fff",borderRadius:12,width:"100%",maxWidth:500,maxHeight:"92vh",overflowY:"auto",overflowX:"hidden",padding:20,boxSizing:"border-box"},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"nowrap",gap:10,width:"100%",boxSizing:"border-box"},children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:800,color:"#0f172a",margin:0,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:"Manual Attendance Adjustment"}),e.jsx("button",{type:"button",onClick:()=>o(!1),style:{background:"#f1f5f9",border:"none",borderRadius:6,width:32,height:32,minWidth:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"1rem",color:"#64748b",flexShrink:0},children:"✕"})]}),e.jsxs("form",{onSubmit:$,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Select Employee"}),e.jsx("select",{value:u,onChange:t=>j(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},required:!0,children:h.map(t=>e.jsxs("option",{value:t.id,children:[t.fullName||t.name," (",t.employeeCode,")"]},t.id))})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Status"}),e.jsxs("select",{value:y,onChange:t=>I(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},children:[e.jsx("option",{value:"PRESENT",children:"PRESENT"}),e.jsx("option",{value:"ABSENT",children:"ABSENT"}),e.jsx("option",{value:"HALF_DAY",children:"HALF DAY"}),e.jsx("option",{value:"LEAVE",children:"ON LEAVE"})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Working Hours"}),e.jsx("input",{type:"number",step:"0.5",value:k,onChange:t=>P(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Check In"}),e.jsx("input",{type:"time",value:v,onChange:t=>M(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Check Out"}),e.jsx("input",{type:"time",value:S,onChange:t=>W(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("input",{type:"checkbox",id:"manualLateCheck",checked:w,onChange:t=>O(t.target.checked)}),e.jsx("label",{htmlFor:"manualLateCheck",style:{fontSize:"0.8rem",cursor:"pointer"},children:"Mark as Late Arrival"})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Reason / Audit Notes"}),e.jsx("input",{type:"text",value:E,onChange:t=>H(t.target.value),placeholder:"e.g. Approved leave / Fingerprint sensor offline",style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20},children:[e.jsx("button",{type:"button",onClick:()=>o(!1),style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6},children:"Cancel"}),e.jsx("button",{type:"submit",style:{padding:"8px 20px",background:"#0d1319",color:"#fff",border:"none",borderRadius:6},children:"Save Entry"})]})]})]})})]})};export{ee as BusinessAttendancePage};
