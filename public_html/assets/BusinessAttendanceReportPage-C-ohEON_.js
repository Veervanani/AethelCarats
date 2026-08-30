import{r as g,j as e,bd as B,l as I,m as V,aV as J,aW as _}from"./react-vendor-Cp-UByyT.js";import{g as x}from"./ui-vendor-9EZLEUQ9.js";import{b as L}from"./businessApi-Bcr8_5rR.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-ENdFv1gV.js";import"./admin-tools-vendor-CKN5doRT.js";const U=x.div`
  flex: 1;
  width: 100%;
  min-width: 0;
  background: #1f1f21;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.2);
  padding: 20px;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 14px 10px;
  }
`,G=x.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  .top-date {
    font-size: 1.05rem;
    font-weight: 700;
    color: #f4f4f5;
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .today-pill {
    font-size: 0.68rem;
    font-weight: 700;
    background: rgba(216, 180, 226, 0.18);
    color: #d8b4e2;
    border: 1px solid rgba(216, 180, 226, 0.35);
    padding: 2px 8px;
    border-radius: 12px;
  }
`,K=x.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;

  .month-title {
    font-size: 1.12rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.02em;
  }

  .nav-arrows {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .arrow-btn {
    background: #2b2b2f;
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #d4d4d8;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    transition: all 0.15s ease;

    &:hover {
      color: #ffffff;
      background: #38383e;
      border-color: rgba(255, 255, 255, 0.18);
    }
  }
`,q=x.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  span {
    font-size: 0.78rem;
    font-weight: 700;
    color: #a1a1aa;
    text-transform: uppercase;
    letter-spacing: 0.04em;

    &.sun {
      color: #f87171;
    }
  }
`,Q=x.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 6px;
  column-gap: 4px;
  margin-bottom: 16px;
`,X=x.div`
  min-height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.12s ease;
  position: relative;
  padding: 3px 1px;
  background: ${({$isSelected:o})=>o?"transparent":"rgba(255, 255, 255, 0.02)"};
  border: 1px solid ${({$isSelected:o,$isToday:f})=>o?"transparent":f?"rgba(216, 180, 226, 0.4)":"transparent"};

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .day-number {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.88rem;
    font-weight: ${({$isSelected:o,$isToday:f})=>o||f?"800":"600"};
    color: ${({$isCurrentMonth:o,$isSelected:f,$isSunday:c})=>f?"#09090b":o?c?"#fca5a5":"#f4f4f5":"#52525b"};

    ${({$isSelected:o})=>o&&`
      background: #d8b4e2;
      box-shadow: 0 0 14px rgba(216, 180, 226, 0.5);
    `}

    ${({$isToday:o,$isSelected:f})=>o&&!f&&`
      border: 1.5px solid #d8b4e2;
      color: #ffffff;
    `}
  }

  .attendance-pills {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    margin-top: 2px;
    min-height: 12px;
    flex-wrap: wrap;
  }

  .att-dot {
    font-size: 0.64rem;
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
    &.empty {
      color: #52525b;
      font-size: 0.58rem;
    }
  }
`,Z=x.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
  gap: 8px;

  .stepper {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #2b2b2f;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 700;
    color: #e4e4e7;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .step-btn {
    background: transparent;
    border: none;
    color: #a1a1aa;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 800;
    padding: 0 4px;
    line-height: 1;

    &:hover {
      color: #ffffff;
    }
  }

  .focus-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #2b2b2f;
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #f4f4f5;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: #38383e;
      color: #d8b4e2;
      border-color: rgba(216, 180, 226, 0.3);
    }
  }
`,ee=({selectedMonth:o,selectedDay:f,onMonthChange:c,onDaySelect:D,report:m=[]})=>{const[$,R]=(o||new Date().toISOString().slice(0,7)).split("-"),[p,y]=g.useState(Number($)||new Date().getFullYear()),[d,h]=g.useState(Number(R)||new Date().getMonth()+1);g.useEffect(()=>{if(o){const[t,n]=o.split("-").map(Number);t&&n&&(y(t),h(n))}},[o]);const w=["January","February","March","April","May","June","July","August","September","October","November","December"],M=[{key:"Su",label:"Sun",isSun:!0},{key:"Mo",label:"Mon",isSun:!1},{key:"Tu",label:"Tue",isSun:!1},{key:"We",label:"Wed",isSun:!1},{key:"Th",label:"Thu",isSun:!1},{key:"Fr",label:"Fri",isSun:!1},{key:"Sa",label:"Sat",isSun:!1}],C=()=>{let t=d-1,n=p;t<1&&(t=12,n--),h(t),y(n);const l=`${n}-${String(t).padStart(2,"0")}`;c(l)},j=()=>{let t=d+1,n=p;t>12&&(t=1,n++),h(t),y(n);const l=`${n}-${String(t).padStart(2,"0")}`;c(l)},H=()=>{const t=new Date,n=t.getFullYear(),l=t.getMonth()+1,b=t.getDate();y(n),h(l);const r=`${n}-${String(l).padStart(2,"0")}`;c(r),D(b)},A=(t,n,l)=>{if(n)D(t);else{let b=p,r=d+l;r<1?(r=12,b--):r>12&&(r=1,b++),y(b),h(r);const S=`${b}-${String(r).padStart(2,"0")}`;c(S),D(t)}},T=t=>{if(!m||m.length===0)return null;let n=0,l=0,b=0,r=0;m.forEach(W=>{var Y;const E=(Y=W.days)==null?void 0:Y[t];E&&(E.status==="PRESENT"?n++:E.status==="ABSENT"?l++:E.status==="HALF_DAY"?b++:E.status==="LEAVE"&&r++)});const S=n+l+b+r;return S===0?null:{present:n,absent:l,halfDay:b,leave:r,total:S}},z=new Date(p,d,0).getDate(),P=new Date(p,d-1,1).getDay(),F=new Date(p,d-1,0).getDate(),a=[];for(let t=P-1;t>=0;t--){const n=F-t,l=new Date(p,d-2,n);a.push({day:n,isCurrentMonth:!1,offsetMonth:-1,dayOfWeek:l.getDay()})}for(let t=1;t<=z;t++){const n=new Date(p,d-1,t);a.push({day:t,isCurrentMonth:!0,offsetMonth:0,dayOfWeek:n.getDay()})}const s=(a.length>35?42:35)-a.length;for(let t=1;t<=s;t++){const n=new Date(p,d,t);a.push({day:t,isCurrentMonth:!1,offsetMonth:1,dayOfWeek:n.getDay()})}const u=new Date,v=u.getFullYear()===p&&u.getMonth()+1===d,N=u.getDate(),k=()=>{try{const t=new Date(p,d-1,f||1);return`${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][t.getDay()]}, ${f||1} ${w[d-1]} ${p}`}catch{return`${w[d-1]} ${p}`}};return e.jsxs(U,{children:[e.jsxs(G,{children:[e.jsxs("div",{className:"top-date",children:[e.jsx(B,{size:16,color:"#d8b4e2"}),k()]}),v&&f===N&&e.jsx("span",{className:"today-pill",children:"Today"})]}),e.jsxs(K,{children:[e.jsxs("div",{className:"month-title",children:[w[d-1]," ",p]}),e.jsxs("div",{className:"nav-arrows",children:[e.jsx("button",{type:"button",className:"arrow-btn",onClick:C,title:"Previous Month",children:e.jsx(I,{size:18})}),e.jsx("button",{type:"button",className:"arrow-btn",onClick:j,title:"Next Month",children:e.jsx(V,{size:18})})]})]}),e.jsx(q,{children:M.map(t=>e.jsx("span",{className:t.isSun?"sun":"",children:t.label},t.key))}),e.jsx(Q,{children:a.map((t,n)=>{const l=t.isCurrentMonth&&t.day===f,b=v&&t.isCurrentMonth&&t.day===N,r=t.isCurrentMonth?T(t.day):null,S=t.dayOfWeek===0;return e.jsxs(X,{$isCurrentMonth:t.isCurrentMonth,$isSelected:l,$isToday:b,$isSunday:S,onClick:()=>A(t.day,t.isCurrentMonth,t.offsetMonth),title:t.isCurrentMonth?r?`Day ${t.day}: ${r.present} Present, ${r.absent} Absent, ${r.halfDay} Half Day, ${r.leave} Leave`:`Day ${t.day}: No attendance recorded`:void 0,children:[e.jsx("div",{className:"day-number",children:t.day}),e.jsx("div",{className:"attendance-pills",children:t.isCurrentMonth&&r?e.jsxs(e.Fragment,{children:[r.present>0&&e.jsxs("span",{className:"att-dot present",children:["●",r.present]}),r.absent>0&&e.jsxs("span",{className:"att-dot absent",children:["●",r.absent]}),r.halfDay>0&&e.jsxs("span",{className:"att-dot half",children:["●",r.halfDay]}),r.leave>0&&e.jsxs("span",{className:"att-dot leave",children:["●",r.leave]})]}):t.isCurrentMonth?e.jsx("span",{className:"att-dot empty",children:"●0"}):null})]},n)})}),e.jsxs(Z,{children:[e.jsxs("div",{className:"stepper",children:[e.jsx("button",{type:"button",className:"step-btn",onClick:C,title:"Previous Month",children:"-"}),e.jsx("span",{children:w[d-1].slice(0,3)}),e.jsx("button",{type:"button",className:"step-btn",onClick:j,title:"Next Month",children:"+"})]}),e.jsxs("button",{type:"button",className:"focus-btn",onClick:H,children:[e.jsx(J,{size:11,fill:"#ffffff"})," Today"]})]})]})},te=x.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`,ae=x.div`
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
`,O=x.button`
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

  ${({$variant:o})=>{switch(o){case"primary":return`
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
`,ne=x.div`
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 24px;
  align-items: stretch;
  width: 100%;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`,se=x.div`
  background: #1f1f21;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 14px 12px;
  }

  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    .date-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f4f4f5;
    }

    .date-badge {
      font-size: 0.74rem;
      font-weight: 700;
      background: #2b2b2f;
      color: #d8b4e2;
      padding: 4px 12px;
      border-radius: 20px;
      border: 1px solid rgba(216, 180, 226, 0.25);
    }
  }

  .summary-chips {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    flex-wrap: wrap;

    .stat-chip {
      font-size: 0.78rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border-radius: 6px;
      background: #27272a;
      color: #e4e4e7;
      border: 1px solid rgba(255, 255, 255, 0.05);

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

  .employee-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 16px 0 0 0;
    flex: 1;
    overflow-y: auto;
    scrollbar-width: thin;
    max-height: 480px;
  }

  .employee-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 14px;
    background: #27272a;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    transition: all 0.15s ease;
    flex-wrap: wrap;
    gap: 10px;

    &:hover {
      background: #2e2e32;
      border-color: rgba(255, 255, 255, 0.12);
    }

    .emp-info {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .name {
        font-size: 0.9rem;
        font-weight: 700;
        color: #f4f4f5;
      }
      .code {
        font-size: 0.72rem;
        color: #a1a1aa;
      }
    }

    .status-group {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .status-badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      gap: 4px;

      &.present {
        background: #14532d;
        color: #86efac;
        border: 1px solid #166534;
      }
      &.absent {
        background: #7f1d1d;
        color: #fca5a5;
        border: 1px solid #991b1b;
      }
      &.half {
        background: #713f12;
        color: #fde047;
        border: 1px solid #854d0e;
      }
      &.leave {
        background: #581c87;
        color: #d8b4e2;
        border: 1px solid #6b21a8;
      }
      &.unmarked {
        background: #3f3f46;
        color: #d4d4d8;
        border: 1px solid #52525b;
      }
    }

    .action-controls {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .switcher-btn {
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s ease;
      min-width: 28px;

      &.btn-p {
        background: #2a2a30;
        color: #86efac;
        &.active {
          background: #15803d;
          color: #ffffff;
          border-color: #22c55e;
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.35);
        }
      }

      &.btn-a {
        background: #2a2a30;
        color: #fca5a5;
        &.active {
          background: #b91c1c;
          color: #ffffff;
          border-color: #ef4444;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.35);
        }
      }

      &.btn-hd {
        background: #2a2a30;
        color: #fde047;
        &.active {
          background: #b45309;
          color: #ffffff;
          border-color: #f59f00;
          box-shadow: 0 0 10px rgba(245, 159, 0, 0.35);
        }
      }

      &.btn-l {
        background: #2a2a30;
        color: #d8b4e2;
        &.active {
          background: #6d28d9;
          color: #ffffff;
          border-color: #a855f7;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.35);
        }
      }

      &:hover:not(.active) {
        background: #3f3f46;
        color: #ffffff;
      }
    }
  }
`,pe=()=>{const[o,f]=g.useState(new Date().toISOString().slice(0,7)),[c,D]=g.useState(new Date().getDate()),[m,$]=g.useState([]),[R,p]=g.useState(31),[y,d]=g.useState(!0),[h,w]=g.useState(!1),M=async()=>{d(!0);try{const a=await L.getMonthlyAttendanceReport(o);$(a.report||[]),p(a.daysInMonth||31)}catch(a){console.error(a)}finally{d(!1)}};g.useEffect(()=>{M()},[o]);const C=async()=>{var a,i;if(window.confirm(`Mark all employees as PRESENT for the entire month (${o})?`)){w(!0);try{await L.markAllEmployeesPresentForMonth(o),await M(),alert(`✅ All employees successfully marked PRESENT for ${o}`)}catch(s){alert(((i=(a=s==null?void 0:s.response)==null?void 0:a.data)==null?void 0:i.message)||"Failed to mark attendance")}finally{w(!1)}}},j=async(a,i,s)=>{const[u,v]=o.split("-"),N=`${u}-${v.padStart(2,"0")}-${String(i).padStart(2,"0")}`,k=s==="PRESENT"?8:s==="HALF_DAY"?4:0;$(t=>t.map(n=>{var l;if(n.employee.id===a){const b=(l=n.days)==null?void 0:l[i],r={...n.days,[i]:{...b||{},status:s,workingHours:k,lateStatus:!1}};return{...n,days:r}}return n}));try{await L.manualAttendanceEntry({employeeId:a,date:N,status:s,workingHours:k,lateStatus:!1})}catch(t){console.error("Failed to update attendance:",t),M()}},A=(a=>{const[i,s]=o.split("-").map(Number),u=new Date(i,s-1,a),v=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],N=["January","February","March","April","May","June","July","August","September","October","November","December"],k=u.getDay();return{fullDayName:v[k],monthName:N[s-1],year:i,isSunday:k===0}})(c);let T=0,z=0,P=0,F=0;return m.forEach(a=>{var s;const i=(s=a.days)==null?void 0:s[c];(i==null?void 0:i.status)==="PRESENT"?T++:(i==null?void 0:i.status)==="ABSENT"?z++:(i==null?void 0:i.status)==="HALF_DAY"?P++:(i==null?void 0:i.status)==="LEAVE"&&F++}),e.jsxs(te,{children:[e.jsxs(ae,{children:[e.jsxs("div",{className:"title-group",children:[e.jsx("h1",{children:"Monthly Attendance & Workforce Calendar"}),e.jsx("p",{children:"Interactive calendar navigation, daily staff presence & real-time attendance management"})]}),e.jsxs("div",{className:"action-toolbar",children:[e.jsxs(O,{type:"button",$variant:"accent",onClick:C,disabled:h,title:"Bulk mark present for all staff members",children:["⚡ ",h?"Marking...":`Mark All Present (${o})`]}),e.jsxs(O,{type:"button",onClick:()=>window.print(),title:"Print attendance report",children:[e.jsx(_,{size:14})," Print Report"]})]})]}),e.jsxs(ne,{children:[e.jsx(ee,{selectedMonth:o,selectedDay:c,onMonthChange:a=>f(a),onDaySelect:a=>D(a),report:m}),e.jsxs(se,{children:[e.jsxs("div",{className:"detail-header",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"date-title",children:[A.fullDayName,", ",c," ",A.monthName," ",A.year]}),e.jsx("div",{style:{fontSize:"0.76rem",color:"#a1a1aa",marginTop:3},children:"Daily staff presence & status controls"})]}),e.jsxs("span",{className:"date-badge",children:["Day ",c]})]}),e.jsxs("div",{className:"summary-chips",children:[e.jsxs("span",{className:"stat-chip",children:[e.jsx("span",{className:"dot green"})," Present: ",e.jsx("strong",{children:T})]}),e.jsxs("span",{className:"stat-chip",children:[e.jsx("span",{className:"dot red"})," Absent: ",e.jsx("strong",{children:z})]}),e.jsxs("span",{className:"stat-chip",children:[e.jsx("span",{className:"dot yellow"})," Half Day: ",e.jsx("strong",{children:P})]}),e.jsxs("span",{className:"stat-chip",children:[e.jsx("span",{className:"dot purple"})," Leave: ",e.jsx("strong",{children:F})]})]}),e.jsxs("div",{className:"employee-list",children:[m.map(a=>{var u;const i=(u=a.days)==null?void 0:u[c],s=(i==null?void 0:i.status)||"UNMARKED";return e.jsxs("div",{className:"employee-row",children:[e.jsxs("div",{className:"emp-info",children:[e.jsx("span",{className:"name",children:a.employee.fullName||a.employee.name}),e.jsx("span",{className:"code",children:a.employee.employeeCode||a.employee.department||"Staff"})]}),e.jsxs("div",{className:"status-group",children:[e.jsx("span",{className:`status-badge ${s==="PRESENT"?"present":s==="ABSENT"?"absent":s==="HALF_DAY"?"half":s==="LEAVE"?"leave":"unmarked"}`,children:s==="PRESENT"?"✓ Present":s==="ABSENT"?"✕ Absent":s==="HALF_DAY"?"½ Half Day":s==="LEAVE"?"🟣 Leave":"Unmarked"}),e.jsxs("div",{className:"action-controls",children:[e.jsx("button",{type:"button",className:`switcher-btn btn-p ${s==="PRESENT"?"active":""}`,onClick:()=>j(a.employee.id,c,"PRESENT"),title:"Mark Present",children:"P"}),e.jsx("button",{type:"button",className:`switcher-btn btn-a ${s==="ABSENT"?"active":""}`,onClick:()=>j(a.employee.id,c,"ABSENT"),title:"Mark Absent",children:"A"}),e.jsx("button",{type:"button",className:`switcher-btn btn-hd ${s==="HALF_DAY"?"active":""}`,onClick:()=>j(a.employee.id,c,"HALF_DAY"),title:"Mark Half Day",children:"HD"}),e.jsx("button",{type:"button",className:`switcher-btn btn-l ${s==="LEAVE"?"active":""}`,onClick:()=>j(a.employee.id,c,"LEAVE"),title:"Mark Leave",children:"L"})]})]})]},a.employee.id)}),m.length===0&&!y&&e.jsx("div",{style:{textAlign:"center",padding:"32px",color:"#71717a",fontSize:"0.84rem"},children:"No active staff members found for this month."})]})]})]})]})};export{pe as BusinessAttendanceReportPage};
