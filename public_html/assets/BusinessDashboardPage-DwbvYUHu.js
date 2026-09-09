import{r as c,j as e,b as ue,K as me,ak as ge,aR as be,_ as je,W as ve,bd as ye}from"./react-vendor-BsBv4awM.js";import{g as h}from"./ui-vendor-C0FaE403.js";import{b as S}from"./businessApi-CH6bwKFG.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-pages-BKmjN2Kk.js";import"./admin-tools-vendor-CKN5doRT.js";const Ne=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 10px;

  h1 {
    font-size: 1.35rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;

    @media (max-width: 640px) {
      font-size: 1.05rem;
    }
  }

  p {
    font-size: 0.78rem;
    color: #64748b;
    margin: 2px 0 0 0;

    @media (max-width: 640px) {
      display: none;
    }
  }
`,we=h.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  background: #ffffff;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 10px;
    width: 100%;
  }
`,k=h.select`
  height: 38px;
  padding: 6px 32px 6px 12px;
  border: 1.5px solid #cbd5e1;
  border-radius: 7px;
  font-size: 0.86rem;
  font-weight: 600;
  background: #ffffff;
  color: #0f172a;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 14px;
  cursor: pointer;
  box-sizing: border-box;
  width: auto;

  @media (max-width: 768px) {
    width: 100%;
    height: 40px;
    font-size: 0.88rem;
  }

  &:focus {
    border-color: #0f172a;
    box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.08);
  }
`,Se=h.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
  margin-bottom: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`,y=h.div`
  background: ${({$highlight:t})=>t?"linear-gradient(135deg, #0d1319 0%, #1a2530 100%)":"#ffffff"};
  color: ${({$highlight:t})=>t?"#ffffff":"#0f172a"};
  border: 1px solid ${({$highlight:t})=>t?"#0d1319":"#e2e8f0"};
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 12px;
  }

  .kpi-title {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({$highlight:t})=>t?"#e2b96f":"#64748b"};
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .kpi-value {
    font-size: 1.35rem;
    font-weight: 800;
    font-family: 'Inter', sans-serif;
    word-break: break-word;

    @media (max-width: 640px) {
      font-size: 1.15rem;
    }
  }
  .kpi-sub {
    font-size: 0.72rem;
    color: ${({$highlight:t})=>t?"#9bb0bf":"#64748b"};
    margin-top: 4px;
  }
`,de=h.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`,b=h.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  overflow: hidden;

  @media (max-width: 640px) {
    padding: 14px 12px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f1f5f9;
  }
  .card-title {
    font-size: 0.92rem;
    font-weight: 700;
    color: #0f172a;
  }
`,R=h.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  scrollbar-width: thin;
  box-sizing: border-box;
  margin-top: 4px;
`,$=h.table`
  width: 100%;
  min-width: ${({$minWidth:t})=>t?`${t}px`:"540px"};
  border-collapse: collapse;
  font-size: 0.82rem;
  white-space: nowrap;

  th {
    text-align: left;
    padding: 10px 12px;
    background: #f8fafc;
    color: #475569;
    font-weight: 600;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 10px 12px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
    vertical-align: middle;
  }

  tr:hover td {
    background: #f8fafc;
  }
`,Ae=()=>{var A,T,M,I,U,W,O,F,B,_,Y,E,L,G,J,K,q,H,Q,X,Z,V,ee,te,re,se,ie,ne,oe,le;const[t,ae]=c.useState(null),[ke,C]=c.useState(!0),[p,N]=c.useState("all"),[f,j]=c.useState("2026"),[u,v]=c.useState("All Months"),[o,z]=c.useState("USD"),[d,D]=c.useState(()=>{const r=localStorage.getItem("biz_fx_rate");return r&&!isNaN(Number(r))&&Number(r)>0?Number(r):94.55});c.useEffect(()=>{S.getSettings().then(r=>{var n;if((n=r==null?void 0:r.settings)!=null&&n.dollarRate){const l=Number(r.settings.dollarRate);!isNaN(l)&&l>0&&(D(l),localStorage.setItem("biz_fx_rate",String(l)))}}).catch(r=>console.error("Failed to fetch settings from DB:",r))},[]);const P=async()=>{var r;C(!0);try{const n=await S.getDashboardMetrics({period:p,year:f!=="All Years"?f:void 0,month:u!=="All Months"?u:void 0,dollarRate:d});if(ae(n),(r=n==null?void 0:n.metrics)!=null&&r.dollarRate){const l=Number(n.metrics.dollarRate);!isNaN(l)&&l>0&&localStorage.setItem("biz_fx_rate",String(l))}}catch(n){console.error(n)}finally{C(!1)}};c.useEffect(()=>{P()},[p,f,u,d]);const ce=r=>{D(r),!isNaN(r)&&r>0&&(localStorage.setItem("biz_fx_rate",String(r)),S.updateSettings({dollarRate:r,defaultFxRate:r}).catch(n=>{console.error("Failed to sync dollar rate to database:",n)}))},s=t==null?void 0:t.metrics,i=r=>(Number(r)||0).toLocaleString(),he=r=>{N(r),r==="all"?(j("All Years"),v("All Months")):r==="month"?(j("2026"),v("August")):r==="year"&&(j("2026"),v("All Months"))},xe=r=>{j(r),p!=="all"&&p!=="month"&&N("all")},pe=r=>{v(r),p!=="all"&&p!=="month"&&N("all")};return e.jsxs("div",{children:[e.jsxs(Ne,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Executive Business Dashboard"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Real-time Sales, Profits, Commissions, and Employee Operations Overview"})]}),e.jsxs(we,{children:[e.jsxs(k,{value:p,onChange:r=>he(r.target.value),children:[e.jsx("option",{value:"all",children:"All Time"}),e.jsx("option",{value:"today",children:"Today"}),e.jsx("option",{value:"month",children:"This Month"}),e.jsx("option",{value:"year",children:"This Year"})]}),e.jsxs(k,{value:f,onChange:r=>xe(r.target.value),children:[e.jsx("option",{value:"All Years",children:"All Years"}),e.jsx("option",{value:"2026",children:"2026"}),e.jsx("option",{value:"2025",children:"2025"})]}),e.jsxs(k,{value:u,onChange:r=>pe(r.target.value),children:[e.jsx("option",{value:"All Months",children:"All Months"}),["January","February","March","April","May","June","July","August","September","October","November","December"].map(r=>e.jsx("option",{value:r,children:r},r))]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"},children:[e.jsx("button",{type:"button",onClick:()=>z("USD"),style:{padding:"5px 10px",fontSize:"0.74rem",fontWeight:700,background:o==="USD"?"#0d1319":"#f1f5f9",color:o==="USD"?"#fff":"#475569",border:"none",borderRadius:5,cursor:"pointer"},children:"USD ($)"}),e.jsx("button",{type:"button",onClick:()=>z("INR"),style:{padding:"5px 10px",fontSize:"0.74rem",fontWeight:700,background:o==="INR"?"#0d1319":"#f1f5f9",color:o==="INR"?"#fff":"#475569",border:"none",borderRadius:5,cursor:"pointer"},children:"INR (₹)"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,justifyContent:"flex-start"},children:[e.jsx("span",{style:{fontSize:"0.72rem",color:"#64748b",fontWeight:600},children:"Rate:"}),e.jsx("input",{type:"number",step:"0.01",value:d,onChange:r=>ce(Number(r.target.value)),style:{width:62,padding:"5px 6px",fontSize:"0.76rem",border:"1px solid #cbd5e1",borderRadius:5,textAlign:"center"}}),e.jsx("button",{type:"button",onClick:P,style:{background:"#f1f5f9",border:"1px solid #e2e8f0",borderRadius:5,padding:"5px 8px",cursor:"pointer",color:"#475569",display:"flex",alignItems:"center",justifyContent:"center"},title:"Refresh Metrics",children:e.jsx(ue,{size:14})})]})]})]}),e.jsxs(Se,{children:[e.jsxs(y,{$highlight:!0,children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Total Revenue"}),e.jsx(me,{size:16})]}),e.jsx("div",{className:"kpi-value",children:o==="USD"?`$${i(s==null?void 0:s.totalRevenue)}`:`₹${i((Number(s==null?void 0:s.totalRevenue)||0)*d)}`}),e.jsxs("div",{className:"kpi-sub",children:[(s==null?void 0:s.totalOrders)||0," Invoiced Orders"]})]}),e.jsxs(y,{children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Net Profit"}),e.jsx(ge,{size:16,color:"#16a34a"})]}),e.jsx("div",{className:"kpi-value",style:{color:"#16a34a"},children:o==="USD"?`$${i(s==null?void 0:s.totalNetProfit)}`:`₹${i((s==null?void 0:s.totalNetProfitINR)||(Number(s==null?void 0:s.totalNetProfit)||0)*d)}`}),e.jsxs("div",{className:"kpi-sub",children:["Avg Markup: ",Number((s==null?void 0:s.averageMarkupPercent)||0)>1?Number(s==null?void 0:s.averageMarkupPercent).toFixed(1):((Number(s==null?void 0:s.averageMarkupPercent)||0)*100).toFixed(1),"%"]})]}),e.jsxs(y,{children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Commission Paid/Due"}),e.jsx(be,{size:16,color:"#d97706"})]}),e.jsx("div",{className:"kpi-value",style:{color:"#d97706"},children:o==="USD"?`$${i(s==null?void 0:s.totalCommission)}`:`₹${i((s==null?void 0:s.totalCommissionINR)||(Number(s==null?void 0:s.totalCommission)||0)*d)}`}),e.jsxs("div",{className:"kpi-sub",children:["Retained Profit: ",o==="USD"?`$${i(s==null?void 0:s.totalProfitAfterCommission)}`:`₹${i((s==null?void 0:s.profitAfterCommissionINR)||(Number(s==null?void 0:s.totalProfitAfterCommission)||0)*d)}`]})]}),e.jsxs(y,{children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Attendance Today"}),e.jsx(je,{size:16,color:"#2563eb"})]}),e.jsxs("div",{className:"kpi-value",style:{color:"#2563eb"},children:[((A=t==null?void 0:t.attendanceToday)==null?void 0:A.present)||((T=t==null?void 0:t.attendance)==null?void 0:T.present)||0," / ",((M=t==null?void 0:t.attendanceToday)==null?void 0:M.total)||((I=t==null?void 0:t.attendance)==null?void 0:I.totalEmployees)||0]}),e.jsxs("div",{className:"kpi-sub",children:[((U=t==null?void 0:t.attendanceToday)==null?void 0:U.late)||((W=t==null?void 0:t.attendance)==null?void 0:W.late)||0," Late | ",((O=t==null?void 0:t.attendanceToday)==null?void 0:O.absent)||((F=t==null?void 0:t.attendance)==null?void 0:F.absent)||0," Absent | ",((B=t==null?void 0:t.attendanceToday)==null?void 0:B.onLeave)||((_=t==null?void 0:t.attendance)==null?void 0:_.onLeave)||0," Leave"]})]})]}),e.jsxs(de,{children:[e.jsxs(b,{children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"card-title",children:"Sales Person Performance & Commission"}),e.jsxs("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"#64748b"},children:["Showing ",((Y=t==null?void 0:t.salesPersonPerformance)==null?void 0:Y.length)||0," Staff Members"]})]}),e.jsx(R,{children:e.jsxs($,{$minWidth:580,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Sales Person"}),e.jsx("th",{children:"Orders"}),e.jsx("th",{children:"Revenue"}),e.jsxs("th",{children:["Net Profit (",o,")"]}),e.jsxs("th",{children:["Commission (",o,")"]}),e.jsxs("th",{children:["Profit Retained (",o,")"]})]})}),e.jsxs("tbody",{children:[(E=t==null?void 0:t.salesPersonPerformance)==null?void 0:E.map((r,n)=>{const l=Number(r.revenue)||0,a=Number(r.netProfitUSD)||0,m=Number(r.netProfitINR)||a*d,x=Number(r.commissionUSD)||0,w=Number(r.commissionINR)||x*d,g=Number(r.profitAfterCommission)||a-x,fe=g*d;return e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:r.name||"Unassigned"}),e.jsx("td",{children:r.orders||0}),e.jsxs("td",{children:["$",i(l)]}),e.jsx("td",{style:{color:"#16a34a",fontWeight:600},children:o==="USD"?`$${i(a)}`:`₹${i(m)}`}),e.jsx("td",{style:{color:"#d97706",fontWeight:600},children:o==="USD"?`$${i(x)}`:`₹${i(w)}`}),e.jsx("td",{style:{fontWeight:600},children:o==="USD"?`$${i(g)}`:`₹${i(fe)}`})]},n)}),(!(t!=null&&t.salesPersonPerformance)||t.salesPersonPerformance.length===0)&&e.jsx("tr",{children:e.jsx("td",{colSpan:6,style:{textAlign:"center",padding:"24px",color:"#94a3b8"},children:"No sales data recorded for this period."})})]})]})})]}),e.jsxs("div",{children:[e.jsxs(b,{style:{marginBottom:20},children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"card-title",children:"Product Distribution"}),e.jsx(ve,{size:16,color:"#e2b96f"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.8rem",fontWeight:600,marginBottom:4},children:[e.jsx("span",{children:"Loose Diamonds"}),e.jsxs("span",{children:["$",i((G=(L=t==null?void 0:t.productDistribution)==null?void 0:L.diamond)==null?void 0:G.revenue)]})]}),e.jsx("div",{style:{height:8,background:"#f1f5f9",borderRadius:4,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",background:"#e2b96f",width:`${(Number(s==null?void 0:s.totalRevenue)||0)>0?Math.min(100,(Number((K=(J=t==null?void 0:t.productDistribution)==null?void 0:J.diamond)==null?void 0:K.revenue)||0)/(Number(s==null?void 0:s.totalRevenue)||1)*100):0}%`}})}),e.jsxs("div",{style:{fontSize:"0.7rem",color:"#64748b",marginTop:2},children:[((H=(q=t==null?void 0:t.productDistribution)==null?void 0:q.diamond)==null?void 0:H.orders)||0," Orders | Net: $",i((X=(Q=t==null?void 0:t.productDistribution)==null?void 0:Q.diamond)==null?void 0:X.netProfit)]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.8rem",fontWeight:600,marginBottom:4},children:[e.jsx("span",{children:"Finished Jewelry"}),e.jsxs("span",{children:["$",i((V=(Z=t==null?void 0:t.productDistribution)==null?void 0:Z.jewelry)==null?void 0:V.revenue)]})]}),e.jsx("div",{style:{height:8,background:"#f1f5f9",borderRadius:4,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",background:"#0d1319",width:`${(Number(s==null?void 0:s.totalRevenue)||0)>0?Math.min(100,(Number((te=(ee=t==null?void 0:t.productDistribution)==null?void 0:ee.jewelry)==null?void 0:te.revenue)||0)/(Number(s==null?void 0:s.totalRevenue)||1)*100):0}%`}})}),e.jsxs("div",{style:{fontSize:"0.7rem",color:"#64748b",marginTop:2},children:[((se=(re=t==null?void 0:t.productDistribution)==null?void 0:re.jewelry)==null?void 0:se.orders)||0," Orders | Net: $",i((ne=(ie=t==null?void 0:t.productDistribution)==null?void 0:ie.jewelry)==null?void 0:ne.netProfit)]})]})]})]}),e.jsx(b,{children:(()=>{const r=(t==null?void 0:t.salesTargetOverall)||(t==null?void 0:t.targets)||{},n=r.monthName||u!=="All Months"?u:"August",l=r.year||f!=="All Years"?f:"2026",a=Number(r.target??r.totalTarget??0),m=Number(r.actual??r.actualSales??0),x=a>0?Math.min(100,Math.round(m/a*100)):0,w=Math.max(0,a-m),g=r.orderCount??0;return e.jsxs("div",{children:[e.jsxs("div",{className:"card-header",style:{marginBottom:12},children:[e.jsxs("div",{children:[e.jsx("div",{className:"card-title",children:"Company Monthly Target"}),e.jsxs("div",{style:{fontSize:"0.72rem",color:"#64748b",marginTop:2},children:["Target for ",e.jsxs("strong",{children:[n," ",l]})," (",g," orders)"]})]}),e.jsx(ye,{size:16,color:"#2563eb"})]}),a>0?e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.82rem",fontWeight:700},children:[e.jsxs("span",{style:{color:"#0f172a"},children:["Achieved: $",i(m)]}),e.jsxs("span",{style:{color:"#64748b"},children:["Target: $",i(a)]})]}),e.jsx("div",{style:{height:10,background:"#f1f5f9",borderRadius:5,overflow:"hidden",margin:"8px 0"},children:e.jsx("div",{style:{height:"100%",background:x>=100?"#16a34a":"#2563eb",width:`${x}%`}})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",color:"#64748b"},children:[e.jsxs("span",{children:["Achievement: ",e.jsxs("strong",{style:{color:x>=100?"#16a34a":"#0f172a"},children:[x,"%"]})]}),e.jsxs("span",{children:["Remaining: ",e.jsxs("strong",{children:["$",i(w)]})]})]})]}):e.jsxs("div",{style:{padding:"8px 0",fontSize:"0.78rem",color:"#64748b"},children:[e.jsxs("div",{children:["No target quota configured for ",e.jsxs("strong",{children:[n," ",l]}),"."]}),e.jsxs("div",{style:{marginTop:6,fontWeight:700,color:"#0f172a"},children:["Closed Sales: $",i(m)," (",g," orders)"]})]})]})})()})]})]}),e.jsxs(de,{children:[e.jsxs(b,{children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"card-title",children:"Top Clients by Revenue"})}),e.jsx(R,{children:e.jsxs($,{$minWidth:440,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Client Name"}),e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Orders"}),e.jsx("th",{children:"Total Revenue"})]})}),e.jsxs("tbody",{children:[(oe=t==null?void 0:t.topCustomers)==null?void 0:oe.map((r,n)=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:r.name}),e.jsx("td",{children:r.country||"-"}),e.jsx("td",{children:r.orders}),e.jsxs("td",{style:{fontWeight:700},children:["$",i(r.revenue)]})]},n)),(!(t!=null&&t.topCustomers)||t.topCustomers.length===0)&&e.jsx("tr",{children:e.jsx("td",{colSpan:4,style:{textAlign:"center",padding:"16px",color:"#94a3b8"},children:"No client revenue records yet."})})]})]})})]}),e.jsxs(b,{children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"card-title",children:"Geographic Sales"})}),e.jsx(R,{children:e.jsxs($,{$minWidth:360,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Orders"}),e.jsx("th",{children:"Revenue"})]})}),e.jsxs("tbody",{children:[(le=t==null?void 0:t.countryDistribution)==null?void 0:le.map((r,n)=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:r.country}),e.jsx("td",{children:r.orders}),e.jsxs("td",{style:{fontWeight:700},children:["$",i(r.revenue)]})]},n)),(!(t!=null&&t.countryDistribution)||t.countryDistribution.length===0)&&e.jsx("tr",{children:e.jsx("td",{colSpan:3,style:{textAlign:"center",padding:"16px",color:"#94a3b8"},children:"No geographic distribution data yet."})})]})]})})]})]})]})};export{Ae as BusinessDashboardPage};
