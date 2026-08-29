import{r as f,j as e,bc as L,o as T,aO as H,aV as F,aW as Y}from"./react-vendor-DGxe0tSH.js";import{g as p}from"./ui-vendor-nkfD3MFj.js";import{b as P}from"./businessApi-BMOTp80l.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-DeFvLM5D.js";import"./admin-tools-vendor-CKN5doRT.js";const O=p.div`
  position: relative;
  display: inline-block;
`,B=p.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.84rem;
  font-weight: 600;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

  &:hover {
    border-color: #0d1319;
    background: #f8fafc;
  }
`,V=p.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 310px;
  background: #1f1f21;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(0, 0, 0, 0.3);
  padding: 16px;
  z-index: 9999;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

  @media (max-width: 480px) {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    width: 295px;
  }
`,_=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  .top-date {
    font-size: 0.95rem;
    font-weight: 600;
    color: #f4f4f5;
  }

  .chevron-box {
    width: 28px;
    height: 28px;
    background: #2b2b2f;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #a1a1aa;
    transition: background 0.15s ease;

    &:hover {
      background: #38383e;
      color: #ffffff;
    }
  }
`,J=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;

  .month-title {
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
  }

  .nav-arrows {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .arrow-btn {
    background: transparent;
    border: none;
    color: #a1a1aa;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    border-radius: 4px;
    transition: color 0.15s ease;

    &:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
    }
  }
`,U=p.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;

  span {
    font-size: 0.78rem;
    font-weight: 600;
    color: #a1a1aa;
  }
`,q=p.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 4px;
  margin-bottom: 16px;
`,G=p.div`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.84rem;
  font-weight: ${({$isSelected:s})=>s?"800":"500"};
  color: ${({$isCurrentMonth:s,$isSelected:m})=>m?"#09090b":s?"#f4f4f5":"#52525b"};
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.12s ease;
  position: relative;
  margin: 1px;

  ${({$isSelected:s})=>s?`
    background: #d8b4e2;
    box-shadow: 0 0 12px rgba(216, 180, 226, 0.35);
  `:`
    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  `}
`,K=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  .stepper {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #2b2b2f;
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 0.76rem;
    font-weight: 600;
    color: #e4e4e7;
  }

  .step-btn {
    background: transparent;
    border: none;
    color: #a1a1aa;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 700;
    padding: 0 2px;

    &:hover {
      color: #ffffff;
    }
  }

  .focus-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #2b2b2f;
    border: none;
    color: #f4f4f5;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: #38383e;
    }
  }
`,X=({selectedMonth:s,onMonthChange:m})=>{const[k,D]=f.useState(!1),M=f.useRef(null),[$,z]=(s||new Date().toISOString().slice(0,7)).split("-"),[d,j]=f.useState(Number($)||new Date().getFullYear()),[o,b]=f.useState(Number(z)||new Date().getMonth()+1),[C,A]=f.useState(()=>{const t=new Date;return t.getFullYear()===d&&t.getMonth()+1===o?t.getDate():1});f.useEffect(()=>{if(s){const[t,a]=s.split("-").map(Number);t&&a&&(j(t),b(a))}},[s]),f.useEffect(()=>{const t=a=>{M.current&&!M.current.contains(a.target)&&D(!1)};return k&&document.addEventListener("mousedown",t),()=>{document.removeEventListener("mousedown",t)}},[k]);const w=["January","February","March","April","May","June","July","August","September","October","November","December"],E=["Su","Mo","Tu","We","Th","Fr","Sa"],n=()=>{let t=o-1,a=d;t<1&&(t=12,a--),b(t),j(a);const g=`${a}-${String(t).padStart(2,"0")}`;m(g)},i=()=>{let t=o+1,a=d;t>12&&(t=1,a++),b(t),j(a);const g=`${a}-${String(t).padStart(2,"0")}`;m(g)},l=()=>{const t=new Date,a=t.getFullYear(),g=t.getMonth()+1,N=t.getDate();j(a),b(g),A(N);const S=`${a}-${String(g).padStart(2,"0")}`;m(S)},y=(t,a,g)=>{let N=d,S=o+g;S<1?(S=12,N--):S>12&&(S=1,N++),j(N),b(S),A(t);const I=`${N}-${String(S).padStart(2,"0")}`;m(I)},h=new Date(d,o,0).getDate(),c=new Date(d,o-1,1).getDay(),r=new Date(d,o-1,0).getDate(),u=[];for(let t=c-1;t>=0;t--)u.push({day:r-t,isCurrentMonth:!1,offsetMonth:-1});for(let t=1;t<=h;t++)u.push({day:t,isCurrentMonth:!0,offsetMonth:0});const v=(u.length>35?42:35)-u.length;for(let t=1;t<=v;t++)u.push({day:t,isCurrentMonth:!1,offsetMonth:1});const W=()=>{try{const t=new Date(d,o-1,C||1);return`${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][t.getDay()]}, ${C} ${w[o-1]}`}catch{return`${w[o-1]} ${d}`}},R=`${w[o-1]}, ${d}`;return e.jsxs(O,{ref:M,children:[e.jsxs(B,{type:"button",onClick:()=>D(t=>!t),children:[e.jsx(L,{size:15,color:"#0d1319"}),e.jsx("span",{children:R}),e.jsx(T,{size:14,color:"#64748b",style:{transform:k?"rotate(180deg)":"none",transition:"transform 0.15s"}})]}),k&&e.jsxs(V,{children:[e.jsxs(_,{children:[e.jsx("div",{className:"top-date",children:W()}),e.jsx("div",{className:"chevron-box",onClick:()=>D(!1),title:"Close Calendar",children:e.jsx(T,{size:16})})]}),e.jsxs(J,{children:[e.jsxs("div",{className:"month-title",children:[w[o-1],", ",d]}),e.jsxs("div",{className:"nav-arrows",children:[e.jsx("button",{type:"button",className:"arrow-btn",onClick:n,title:"Previous Month",children:e.jsx(H,{size:16})}),e.jsx("button",{type:"button",className:"arrow-btn",onClick:i,title:"Next Month",children:e.jsx(T,{size:16})})]})]}),e.jsx(U,{children:E.map(t=>e.jsx("span",{children:t},t))}),e.jsx(q,{children:u.map((t,a)=>{const g=t.isCurrentMonth&&t.day===C;return e.jsx(G,{$isCurrentMonth:t.isCurrentMonth,$isSelected:g,onClick:()=>y(t.day,t.isCurrentMonth,t.offsetMonth),children:t.day},a)})}),e.jsxs(K,{children:[e.jsxs("div",{className:"stepper",children:[e.jsx("button",{type:"button",className:"step-btn",onClick:n,title:"Step back 1 month",children:"-"}),e.jsx("span",{children:w[o-1].slice(0,3)}),e.jsx("button",{type:"button",className:"step-btn",onClick:i,title:"Step forward 1 month",children:"+"})]}),e.jsxs("button",{type:"button",className:"focus-btn",onClick:l,children:[e.jsx(F,{size:10,fill:"#ffffff"})," Today"]})]})]})]})},Q=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
`,Z=p.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`,ee=p.table`
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
`,ie=()=>{const[s,m]=f.useState(new Date().toISOString().slice(0,7)),[k,D]=f.useState([]),[M,$]=f.useState(31),[z,d]=f.useState(!0),[j,o]=f.useState(!1),b=async()=>{d(!0);try{const n=await P.getMonthlyAttendanceReport(s);D(n.report||[]),$(n.daysInMonth||31)}catch(n){console.error(n)}finally{d(!1)}};f.useEffect(()=>{b()},[s]);const C=async()=>{var n,i;if(window.confirm(`Mark all employees as PRESENT for the entire month (${s})?`)){o(!0);try{await P.markAllEmployeesPresentForMonth(s),await b(),alert(`✅ All employees successfully marked PRESENT for ${s}`)}catch(l){alert(((i=(n=l==null?void 0:l.response)==null?void 0:n.data)==null?void 0:i.message)||"Failed to mark attendance")}finally{o(!1)}}},A=async(n,i,l)=>{const h={PRESENT:"ABSENT",ABSENT:"HALF_DAY",HALF_DAY:"LEAVE",LEAVE:"PRESENT","-":"PRESENT"}[l||"-"]||"PRESENT",[c,r]=s.split("-"),u=`${c}-${r.padStart(2,"0")}-${String(i).padStart(2,"0")}`;try{await P.manualAttendanceEntry({employeeId:n,date:u,status:h,workingHours:h==="PRESENT"?8:h==="HALF_DAY"?4:0,lateStatus:!1}),b()}catch(x){console.error(x)}},w=n=>{const[i,l]=s.split("-").map(Number),y=new Date(i,l-1,n),h=["Su","Mo","Tu","We","Th","Fr","Sa"],c=y.getDay();return{dayName:h[c],isSunday:c===0,isWeekend:c===0||c===6}},E=Array.from({length:M},(n,i)=>i+1);return e.jsxs("div",{children:[e.jsxs(Q,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Monthly Attendance Matrix"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Comprehensive month-view attendance ledger with day-of-week calendar mapping"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[e.jsxs("button",{onClick:C,disabled:j,style:{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontSize:"0.8rem",fontWeight:600,cursor:"pointer"},children:["⚡ ",j?"Marking...":`Mark All Present (${s})`]}),e.jsx(X,{selectedMonth:s,onMonthChange:n=>m(n)}),e.jsxs("button",{onClick:()=>window.print(),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6,fontSize:"0.8rem",fontWeight:600,cursor:"pointer"},children:[e.jsx(Y,{size:14})," Print"]})]})]}),e.jsxs("div",{style:{display:"flex",gap:16,marginBottom:16,fontSize:"0.75rem",fontWeight:600,flexWrap:"wrap"},children:[e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:12,height:12,background:"#ebfbee",border:"1px solid #b2f2bb",display:"inline-block"}})," P = Present"]}),e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:12,height:12,background:"#fff5f5",border:"1px solid #ffc9c9",display:"inline-block"}})," A = Absent"]}),e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:12,height:12,background:"#fff9db",border:"1px solid #ffe066",display:"inline-block"}})," HD = Half Day"]}),e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{width:12,height:12,background:"#f3f0ff",border:"1px solid #d0bfff",display:"inline-block"}})," L = Leave"]}),e.jsx("span",{style:{color:"#64748b",fontSize:"0.72rem",marginLeft:"auto"},children:"💡 Click any day cell to quickly toggle attendance status"})]}),e.jsx(Z,{children:e.jsxs(ee,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"emp-col",children:"Staff Member"}),E.map(n=>{const{dayName:i,isSunday:l,isWeekend:y}=w(n);return e.jsxs("th",{style:{background:l?"#fee2e2":y?"#f1f5f9":"#f8fafc",color:l?"#dc2626":"#475569",padding:"4px 2px"},children:[e.jsx("div",{style:{fontSize:"0.62rem",fontWeight:600,opacity:.9},children:i}),e.jsx("div",{style:{fontSize:"0.76rem",fontWeight:800},children:n})]},n)}),e.jsx("th",{style:{background:"#f1f5f9"},children:"Pres"}),e.jsx("th",{style:{background:"#f1f5f9"},children:"Abs"}),e.jsx("th",{style:{background:"#f1f5f9"},children:"Late"}),e.jsx("th",{style:{background:"#f1f5f9"},children:"Total Hrs"})]})}),e.jsxs("tbody",{children:[k.map(n=>{var i,l,y,h;return e.jsxs("tr",{children:[e.jsxs("td",{className:"emp-col",children:[e.jsx("div",{children:n.employee.fullName||n.employee.name}),e.jsx("div",{style:{fontSize:"0.64rem",color:"#64748b"},children:n.employee.employeeCode})]}),E.map(c=>{const r=n.days[c],{isSunday:u}=w(c);let x="",v="-";return r&&(r.status==="PRESENT"?(x="status-p",v=r.lateStatus?"P*":"P"):r.status==="ABSENT"?(x="status-a",v="A"):r.status==="LEAVE"?(x="status-l",v="L"):r.status==="HALF_DAY"&&(x="status-hd",v="HD")),e.jsx("td",{className:x,onClick:()=>A(n.employee.id,c,r==null?void 0:r.status),style:{cursor:"pointer",background:!x&&u?"#fff1f2":void 0,color:!x&&u?"#f43f5e":void 0},title:`Click to change: ${(r==null?void 0:r.status)||"UNMARKED"} (${(r==null?void 0:r.workingHours)||0} hrs)`,children:v},c)}),e.jsx("td",{style:{fontWeight:700,color:"#16a34a"},children:((i=n.summary)==null?void 0:i.present)||0}),e.jsx("td",{style:{fontWeight:700,color:"#dc2626"},children:((l=n.summary)==null?void 0:l.absent)||0}),e.jsx("td",{style:{fontWeight:700,color:"#d97706"},children:((y=n.summary)==null?void 0:y.late)||0}),e.jsx("td",{style:{fontWeight:800},children:((h=n.summary)==null?void 0:h.totalHours)||0})]},n.employee.id)}),k.length===0&&!z&&e.jsx("tr",{children:e.jsxs("td",{colSpan:M+5,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:["No records found for ",s,"."]})})]})]})})]})};export{ie as BusinessAttendanceReportPage};
