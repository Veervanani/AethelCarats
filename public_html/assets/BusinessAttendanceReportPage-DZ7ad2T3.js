import{r as m,j as e,o as F,aO as Y,aV as B,aW as I}from"./react-vendor-DxLkccZ0.js";import{g as f}from"./ui-vendor-BuBsKREC.js";import{b as H}from"./businessApi-BWAxUnp6.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-xxlLG4Rh.js";import"./admin-tools-vendor-CKN5doRT.js";const V=f.div`
  width: 320px;
  background: #1f1f21;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.2);
  padding: 16px 14px 12px 14px;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 480px) {
    width: 100%;
    max-width: 320px;
  }
`,_=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  .top-date {
    font-size: 0.95rem;
    font-weight: 600;
    color: #f4f4f5;
    letter-spacing: -0.01em;
  }

  .chevron-box {
    width: 26px;
    height: 26px;
    background: #2b2b2f;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #a1a1aa;
    transition: all 0.15s ease;

    &:hover {
      background: #38383e;
      color: #ffffff;
    }
  }
`,O=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  .month-title {
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.01em;
  }

  .nav-arrows {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .arrow-btn {
    background: transparent;
    border: none;
    color: #a1a1aa;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
    border-radius: 4px;
    transition: all 0.15s ease;

    &:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }
  }
`,J=f.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 6px;

  span {
    font-size: 0.76rem;
    font-weight: 600;
    color: #a1a1aa;
  }
`,U=f.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 3px;
  column-gap: 2px;
  margin-bottom: 14px;
`,K=f.div`
  min-height: 42px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.12s ease;
  position: relative;
  padding: 2px 0;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .day-number {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.82rem;
    font-weight: ${({$isSelected:i})=>i?"800":"500"};
    color: ${({$isCurrentMonth:i,$isSelected:N})=>N?"#09090b":i?"#f4f4f5":"#52525b"};

    ${({$isSelected:i})=>i&&`
      background: #d8b4e2;
      box-shadow: 0 0 12px rgba(216, 180, 226, 0.4);
    `}
  }

  .attendance-pills {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    margin-top: 1px;
    height: 9px;
  }

  .att-dot {
    font-size: 0.6rem;
    line-height: 1;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 1px;

    &.present {
      color: #4ade80;
    }
    &.absent {
      color: #f87171;
    }
    &.half {
      color: #facc15;
    }
    &.leave {
      color: #c084fc;
    }
  }
`,G=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  .stepper {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #2b2b2f;
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 0.74rem;
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
    gap: 5px;
    background: #2b2b2f;
    border: none;
    color: #f4f4f5;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.76rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: #38383e;
    }
  }
`,q=({selectedMonth:i,selectedDay:N,onMonthChange:d,onDaySelect:k,report:u=[]})=>{const[$,E]=(i||new Date().toISOString().slice(0,7)).split("-"),[x,j]=m.useState(Number($)||new Date().getFullYear()),[p,w]=m.useState(Number(E)||new Date().getMonth()+1);m.useEffect(()=>{if(i){const[t,r]=i.split("-").map(Number);t&&r&&(j(t),w(r))}},[i]);const v=["January","February","March","April","May","June","July","August","September","October","November","December"],S=["Su","Mo","Tu","We","Th","Fr","Sa"],M=()=>{let t=p-1,r=x;t<1&&(t=12,r--),w(t),j(r);const l=`${r}-${String(t).padStart(2,"0")}`;d(l)},g=()=>{let t=p+1,r=x;t>12&&(t=1,r++),w(t),j(r);const l=`${r}-${String(t).padStart(2,"0")}`;d(l)},z=()=>{const t=new Date,r=t.getFullYear(),l=t.getMonth()+1,s=t.getDate();j(r),w(l);const o=`${r}-${String(l).padStart(2,"0")}`;d(o),k(s)},D=(t,r,l)=>{if(r)k(t);else{let s=x,o=p+l;o<1?(o=12,s--):o>12&&(o=1,s++),j(s),w(o);const c=`${s}-${String(o).padStart(2,"0")}`;d(c),k(t)}},C=t=>{if(!u||u.length===0)return null;let r=0,l=0,s=0,o=0;u.forEach(y=>{var R;const h=(R=y.days)==null?void 0:R[t];h&&(h.status==="PRESENT"?r++:h.status==="ABSENT"?l++:h.status==="HALF_DAY"?s++:h.status==="LEAVE"&&o++)});const c=r+l+s+o;return c===0?null:{present:r,absent:l,halfDay:s,leave:o,total:c}},A=new Date(x,p,0).getDate(),T=new Date(x,p-1,1).getDay(),P=new Date(x,p-1,0).getDate(),b=[];for(let t=T-1;t>=0;t--)b.push({day:P-t,isCurrentMonth:!1,offsetMonth:-1});for(let t=1;t<=A;t++)b.push({day:t,isCurrentMonth:!0,offsetMonth:0});const a=(b.length>35?42:35)-b.length;for(let t=1;t<=a;t++)b.push({day:t,isCurrentMonth:!1,offsetMonth:1});const n=()=>{try{const t=new Date(x,p-1,N||1);return`${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][t.getDay()]}, ${N||1} ${v[p-1]}`}catch{return`${v[p-1]} ${x}`}};return e.jsxs(V,{children:[e.jsxs(_,{children:[e.jsx("div",{className:"top-date",children:n()}),e.jsx("div",{className:"chevron-box",onClick:g,title:"Next month",children:e.jsx(F,{size:15})})]}),e.jsxs(O,{children:[e.jsxs("div",{className:"month-title",children:[v[p-1],", ",x]}),e.jsxs("div",{className:"nav-arrows",children:[e.jsx("button",{type:"button",className:"arrow-btn",onClick:M,title:"Previous month",children:e.jsx(Y,{size:16})}),e.jsx("button",{type:"button",className:"arrow-btn",onClick:g,title:"Next month",children:e.jsx(F,{size:16})})]})]}),e.jsx(J,{children:S.map(t=>e.jsx("span",{children:t},t))}),e.jsx(U,{children:b.map((t,r)=>{const l=t.isCurrentMonth&&t.day===N,s=t.isCurrentMonth?C(t.day):null;return e.jsxs(K,{$isCurrentMonth:t.isCurrentMonth,$isSelected:l,onClick:()=>D(t.day,t.isCurrentMonth,t.offsetMonth),title:t.isCurrentMonth&&s?`Day ${t.day}: ${s.present} Present, ${s.absent} Absent, ${s.halfDay} Half Day, ${s.leave} Leave`:void 0,children:[e.jsx("div",{className:"day-number",children:t.day}),e.jsx("div",{className:"attendance-pills",children:s&&e.jsxs(e.Fragment,{children:[s.present>0&&e.jsxs("span",{className:"att-dot present",children:["●",s.present]}),s.absent>0&&e.jsxs("span",{className:"att-dot absent",children:["●",s.absent]}),s.halfDay>0&&e.jsxs("span",{className:"att-dot half",children:["●",s.halfDay]}),s.leave>0&&e.jsxs("span",{className:"att-dot leave",children:["●",s.leave]})]})})]},r)})}),e.jsxs(G,{children:[e.jsxs("div",{className:"stepper",children:[e.jsx("button",{type:"button",className:"step-btn",onClick:M,title:"Previous Month",children:"-"}),e.jsx("span",{children:v[p-1].slice(0,3)}),e.jsx("button",{type:"button",className:"step-btn",onClick:g,title:"Next Month",children:"+"})]}),e.jsxs("button",{type:"button",className:"focus-btn",onClick:z,children:[e.jsx(B,{size:10,fill:"#ffffff"})," Today"]})]})]})},Q=f.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`,X=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  .title-group {
    h1 {
      font-size: 1.45rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin: 0;
    }
    p {
      font-size: 0.82rem;
      color: #64748b;
      margin: 4px 0 0 0;
    }
  }

  .action-toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
`,W=f.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  ${({$variant:i})=>{switch(i){case"primary":return`
          background: #0d1319;
          color: #ffffff;
          border: 1px solid #0d1319;
          &:hover {
            background: #1e293b;
          }
        `;case"accent":return`
          background: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
          &:hover {
            background: #dcfce7;
          }
        `;default:return`
          background: #ffffff;
          color: #334155;
          border: 1px solid #cbd5e1;
          &:hover {
            background: #f8fafc;
            border-color: #94a3b8;
          }
        `}}}
`,Z=f.div`
  display: flex;
  gap: 20px;
  align-items: stretch;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`,ee=f.div`
  flex: 1;
  min-width: 320px;
  background: #1f1f21;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.2);
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    .date-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #f4f4f5;
    }

    .date-badge {
      font-size: 0.72rem;
      font-weight: 700;
      background: #2b2b2f;
      color: #d8b4e2;
      padding: 4px 10px;
      border-radius: 20px;
      border: 1px solid rgba(216, 180, 226, 0.25);
    }
  }

  .employee-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 14px 0;
    max-height: 220px;
    overflow-y: auto;
    scrollbar-width: thin;
    padding-right: 4px;
  }

  .employee-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: #27272a;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);

    .emp-info {
      display: flex;
      flex-direction: column;

      .name {
        font-size: 0.84rem;
        font-weight: 600;
        color: #f4f4f5;
      }
      .code {
        font-size: 0.68rem;
        color: #a1a1aa;
      }
    }

    .status-group {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .status-badge {
      font-size: 0.74rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;

      &.present {
        background: #14532d;
        color: #86efac;
      }
      &.absent {
        background: #7f1d1d;
        color: #fca5a5;
      }
      &.half {
        background: #713f12;
        color: #fde047;
      }
      &.leave {
        background: #581c87;
        color: #d8b4e2;
      }
      &.unmarked {
        background: #3f3f46;
        color: #a1a1aa;
      }
    }

    .switcher-btn {
      background: #38383e;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #f4f4f5;
      width: 22px;
      height: 22px;
      border-radius: 4px;
      font-size: 0.68rem;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.12s ease;

      &:hover {
        background: #52525b;
        color: #ffffff;
      }
    }
  }

  .detail-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    flex-wrap: wrap;
    gap: 8px;

    .stat-chip {
      font-size: 0.76rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: #e4e4e7;

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      .dot.green { background: #4ade80; }
      .dot.red { background: #f87171; }
      .dot.yellow { background: #facc15; }
      .dot.purple { background: #c084fc; }
    }
  }
`,te=f.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 12px;

  .matrix-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;

    h3 {
      font-size: 1.05rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }

    .legend {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.74rem;
      font-weight: 600;
      flex-wrap: wrap;

      .legend-item {
        display: inline-flex;
        align-items: center;
        gap: 4px;

        span.box {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          display: inline-block;
        }
      }
    }
  }
`,ae=f.div`
  overflow-x: auto;
  scrollbar-width: thin;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
`,se=f.table`
  border-collapse: collapse;
  font-size: 0.74rem;
  width: 100%;
  white-space: nowrap;

  th, td {
    border: 1px solid #e2e8f0;
    padding: 6px 5px;
    text-align: center;
    min-width: 26px;
    font-variant-numeric: tabular-nums;
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
`,ce=()=>{const[i,N]=m.useState(new Date().toISOString().slice(0,7)),[d,k]=m.useState(new Date().getDate()),[u,$]=m.useState([]),[E,x]=m.useState(31),[j,p]=m.useState(!0),[w,v]=m.useState(!1),S=async()=>{p(!0);try{const a=await H.getMonthlyAttendanceReport(i);$(a.report||[]),x(a.daysInMonth||31)}catch(a){console.error(a)}finally{p(!1)}};m.useEffect(()=>{S()},[i]);const M=async()=>{var a,n;if(window.confirm(`Mark all employees as PRESENT for the entire month (${i})?`)){v(!0);try{await H.markAllEmployeesPresentForMonth(i),await S(),alert(`✅ All employees successfully marked PRESENT for ${i}`)}catch(t){alert(((n=(a=t==null?void 0:t.response)==null?void 0:a.data)==null?void 0:n.message)||"Failed to mark attendance")}finally{v(!1)}}},g=async(a,n,t)=>{const[r,l]=i.split("-"),s=`${r}-${l.padStart(2,"0")}-${String(n).padStart(2,"0")}`,o=t==="PRESENT"?8:t==="HALF_DAY"?4:0;try{await H.manualAttendanceEntry({employeeId:a,date:s,status:t,workingHours:o,lateStatus:!1}),await S()}catch(c){console.error(c)}},z=async(a,n,t)=>{const l={PRESENT:"ABSENT",ABSENT:"HALF_DAY",HALF_DAY:"LEAVE",LEAVE:"PRESENT","-":"PRESENT"}[t||"-"]||"PRESENT";await g(a,n,l)},D=a=>{const[n,t]=i.split("-").map(Number),r=new Date(n,t-1,a),l=["Su","Mo","Tu","We","Th","Fr","Sa"],s=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],o=["January","February","March","April","May","June","July","August","September","October","November","December"],c=r.getDay();return{dayName:l[c],fullDayName:s[c],monthName:o[t-1],year:n,isSunday:c===0,isWeekend:c===0||c===6}},C=Array.from({length:E},(a,n)=>n+1),A=D(d);let T=0,P=0,b=0,L=0;return u.forEach(a=>{var t;const n=(t=a.days)==null?void 0:t[d];(n==null?void 0:n.status)==="PRESENT"?T++:(n==null?void 0:n.status)==="ABSENT"?P++:(n==null?void 0:n.status)==="HALF_DAY"?b++:(n==null?void 0:n.status)==="LEAVE"&&L++}),e.jsxs(Q,{children:[e.jsxs(X,{children:[e.jsxs("div",{className:"title-group",children:[e.jsx("h1",{children:"Monthly Attendance & Workforce Calendar"}),e.jsx("p",{children:"Interactive calendar navigation, daily roster inspection & 31-day ledger matrix"})]}),e.jsxs("div",{className:"action-toolbar",children:[e.jsxs(W,{type:"button",$variant:"accent",onClick:M,disabled:w,title:"Bulk mark present for all staff members",children:["⚡ ",w?"Marking...":`Mark All Present (${i})`]}),e.jsxs(W,{type:"button",onClick:()=>window.print(),title:"Print attendance report",children:[e.jsx(I,{size:14})," Print Report"]})]})]}),e.jsxs(Z,{children:[e.jsx(q,{selectedMonth:i,selectedDay:d,onMonthChange:a=>N(a),onDaySelect:a=>k(a),report:u}),e.jsxs(ee,{children:[e.jsxs("div",{className:"detail-header",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"date-title",children:[A.fullDayName,", ",d," ",A.monthName," ",A.year]}),e.jsx("div",{style:{fontSize:"0.74rem",color:"#a1a1aa",marginTop:2},children:"Daily staff presence & status toggle"})]}),e.jsxs("span",{className:"date-badge",children:["Day ",d]})]}),e.jsxs("div",{className:"employee-list",children:[u.map(a=>{var r;const n=(r=a.days)==null?void 0:r[d],t=(n==null?void 0:n.status)||"UNMARKED";return e.jsxs("div",{className:"employee-row",children:[e.jsxs("div",{className:"emp-info",children:[e.jsx("span",{className:"name",children:a.employee.fullName||a.employee.name}),e.jsx("span",{className:"code",children:a.employee.employeeCode||a.employee.department})]}),e.jsxs("div",{className:"status-group",children:[e.jsx("span",{className:`status-badge ${t==="PRESENT"?"present":t==="ABSENT"?"absent":t==="HALF_DAY"?"half":t==="LEAVE"?"leave":"unmarked"}`,children:t==="PRESENT"?"✓ Present":t==="ABSENT"?"✕ Absent":t==="HALF_DAY"?"½ Half Day":t==="LEAVE"?"🟣 Leave":"Unmarked"}),e.jsx("button",{type:"button",className:"switcher-btn",onClick:()=>g(a.employee.id,d,"PRESENT"),title:"Set Present",children:"P"}),e.jsx("button",{type:"button",className:"switcher-btn",onClick:()=>g(a.employee.id,d,"ABSENT"),title:"Set Absent",children:"A"}),e.jsx("button",{type:"button",className:"switcher-btn",onClick:()=>g(a.employee.id,d,"HALF_DAY"),title:"Set Half Day",children:"HD"}),e.jsx("button",{type:"button",className:"switcher-btn",onClick:()=>g(a.employee.id,d,"LEAVE"),title:"Set Leave",children:"L"})]})]},a.employee.id)}),u.length===0&&!j&&e.jsx("div",{style:{textAlign:"center",padding:"24px",color:"#71717a",fontSize:"0.84rem"},children:"No employees found for this period."})]}),e.jsxs("div",{className:"detail-footer",children:[e.jsxs("span",{className:"stat-chip",children:[e.jsx("span",{className:"dot green"})," Present: ",e.jsx("strong",{children:T})]}),e.jsxs("span",{className:"stat-chip",children:[e.jsx("span",{className:"dot red"})," Absent: ",e.jsx("strong",{children:P})]}),e.jsxs("span",{className:"stat-chip",children:[e.jsx("span",{className:"dot yellow"})," Half Day: ",e.jsx("strong",{children:b})]}),e.jsxs("span",{className:"stat-chip",children:[e.jsx("span",{className:"dot purple"})," Leave: ",e.jsx("strong",{children:L})]})]})]})]}),e.jsxs(te,{children:[e.jsxs("div",{className:"matrix-header",children:[e.jsxs("h3",{children:["Full Monthly Attendance Matrix (",i,")"]}),e.jsxs("div",{className:"legend",children:[e.jsxs("span",{className:"legend-item",children:[e.jsx("span",{className:"box",style:{background:"#ebfbee",border:"1px solid #b2f2bb"}})," P = Present"]}),e.jsxs("span",{className:"legend-item",children:[e.jsx("span",{className:"box",style:{background:"#fff5f5",border:"1px solid #ffc9c9"}})," A = Absent"]}),e.jsxs("span",{className:"legend-item",children:[e.jsx("span",{className:"box",style:{background:"#fff9db",border:"1px solid #ffe066"}})," HD = Half Day"]}),e.jsxs("span",{className:"legend-item",children:[e.jsx("span",{className:"box",style:{background:"#f3f0ff",border:"1px solid #d0bfff"}})," L = Leave"]})]})]}),e.jsx(ae,{children:e.jsxs(se,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"emp-col",children:"Staff Member"}),C.map(a=>{const{dayName:n,isSunday:t,isWeekend:r}=D(a),l=a===d;return e.jsxs("th",{onClick:()=>k(a),style:{background:l?"#0d1319":t?"#fee2e2":r?"#f1f5f9":"#f8fafc",color:l?"#ffffff":t?"#dc2626":"#475569",padding:"4px 2px",cursor:"pointer"},title:`Click to view day ${a} breakdown`,children:[e.jsx("div",{style:{fontSize:"0.62rem",fontWeight:600,opacity:.9},children:n}),e.jsx("div",{style:{fontSize:"0.76rem",fontWeight:800},children:a})]},a)}),e.jsx("th",{style:{background:"#f1f5f9"},children:"Pres"}),e.jsx("th",{style:{background:"#f1f5f9"},children:"Abs"}),e.jsx("th",{style:{background:"#f1f5f9"},children:"Late"}),e.jsx("th",{style:{background:"#f1f5f9"},children:"Total Hrs"})]})}),e.jsxs("tbody",{children:[u.map(a=>{var n,t,r,l;return e.jsxs("tr",{children:[e.jsxs("td",{className:"emp-col",children:[e.jsx("div",{children:a.employee.fullName||a.employee.name}),e.jsx("div",{style:{fontSize:"0.64rem",color:"#64748b"},children:a.employee.employeeCode})]}),C.map(s=>{const o=a.days[s],{isSunday:c}=D(s);let y="",h="-";return o&&(o.status==="PRESENT"?(y="status-p",h=o.lateStatus?"P*":"P"):o.status==="ABSENT"?(y="status-a",h="A"):o.status==="LEAVE"?(y="status-l",h="L"):o.status==="HALF_DAY"&&(y="status-hd",h="HD")),e.jsx("td",{className:y,onClick:()=>{k(s),z(a.employee.id,s,o==null?void 0:o.status)},style:{cursor:"pointer",background:!y&&c?"#fff1f2":void 0,color:!y&&c?"#f43f5e":void 0},title:`Day ${s}: Click to cycle status (${(o==null?void 0:o.status)||"UNMARKED"})`,children:h},s)}),e.jsx("td",{style:{fontWeight:700,color:"#16a34a"},children:((n=a.summary)==null?void 0:n.present)||0}),e.jsx("td",{style:{fontWeight:700,color:"#dc2626"},children:((t=a.summary)==null?void 0:t.absent)||0}),e.jsx("td",{style:{fontWeight:700,color:"#d97706"},children:((r=a.summary)==null?void 0:r.late)||0}),e.jsx("td",{style:{fontWeight:800},children:((l=a.summary)==null?void 0:l.totalHours)||0})]},a.employee.id)}),u.length===0&&!j&&e.jsx("tr",{children:e.jsxs("td",{colSpan:E+5,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:["No records found for ",i,"."]})})]})]})})]})]})};export{ce as BusinessAttendanceReportPage};
