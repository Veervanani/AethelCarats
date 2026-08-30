import{r as c,j as e,b as pe,Z as ue,al as me,aP as ge,a4 as je,a1 as be,bb as ve}from"./react-vendor-Cp-UByyT.js";import{g as x}from"./ui-vendor-9EZLEUQ9.js";import{b as R}from"./businessApi-_RYJ9Y1i.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-DSpWNRiZ.js";import"./admin-tools-vendor-CKN5doRT.js";const ye=x.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,Ne=x.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  background: #ffffff;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`,C=x.select`
  padding: 6px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.82rem;
  background: #ffffff;
  color: #0f172a;
  outline: none;
`,Se=x.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`,y=x.div`
  background: ${({$highlight:r})=>r?"linear-gradient(135deg, #0d1319 0%, #1a2530 100%)":"#ffffff"};
  color: ${({$highlight:r})=>r?"#ffffff":"#0f172a"};
  border: 1px solid ${({$highlight:r})=>r?"#0d1319":"#e2e8f0"};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;

  .kpi-title {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({$highlight:r})=>r?"#e2b96f":"#64748b"};
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .kpi-value {
    font-size: 1.6rem;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
  }
  .kpi-sub {
    font-size: 0.75rem;
    color: ${({$highlight:r})=>r?"#9bb0bf":"#64748b"};
    margin-top: 6px;
  }
`,le=x.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,j=x.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f1f5f9;
  }
  .card-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
  }
`,D=x.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;

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
  }

  tr:hover td {
    background: #f8fafc;
  }
`,ze=()=>{var z,A,M,T,I,U,W,_,O,F,L,B,Y,E,G,J,K,q,H,X,Z,Q,V,ee,re,te,se,ie,ne,oe;const[r,de]=c.useState(null),[Re,$]=c.useState(!0),[f,N]=c.useState("all"),[p,b]=c.useState("2026"),[u,v]=c.useState("All Months"),[o,k]=c.useState("USD"),[d,P]=c.useState(()=>{const t=localStorage.getItem("fj_biz_fx_rate");return t&&!isNaN(Number(t))&&Number(t)>0?Number(t):94.55});c.useEffect(()=>{R.getSettings().then(t=>{var n;if((n=t==null?void 0:t.settings)!=null&&n.dollarRate){const l=Number(t.settings.dollarRate);!isNaN(l)&&l>0&&(P(l),localStorage.setItem("fj_biz_fx_rate",String(l)))}}).catch(t=>console.error("Failed to fetch settings from DB:",t))},[]);const w=async()=>{var t;$(!0);try{const n=await R.getDashboardMetrics({period:f,year:p!=="All Years"?p:void 0,month:u!=="All Months"?u:void 0,dollarRate:d});if(de(n),(t=n==null?void 0:n.metrics)!=null&&t.dollarRate){const l=Number(n.metrics.dollarRate);!isNaN(l)&&l>0&&localStorage.setItem("fj_biz_fx_rate",String(l))}}catch(n){console.error(n)}finally{$(!1)}};c.useEffect(()=>{w()},[f,p,u,d]);const ae=t=>{P(t),!isNaN(t)&&t>0&&(localStorage.setItem("fj_biz_fx_rate",String(t)),R.updateSettings({dollarRate:t,defaultFxRate:t}).catch(n=>{console.error("Failed to sync dollar rate to database:",n)}))},s=r==null?void 0:r.metrics,i=t=>(Number(t)||0).toLocaleString(),ce=t=>{N(t),t==="all"?(b("All Years"),v("All Months")):t==="month"?(b("2026"),v("August")):t==="year"&&(b("2026"),v("All Months"))},he=t=>{b(t),f!=="all"&&f!=="month"&&N("all")},xe=t=>{v(t),f!=="all"&&f!=="month"&&N("all")};return e.jsxs("div",{children:[e.jsxs(ye,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Executive Business Dashboard"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Real-time Sales, Profits, Commissions, and Employee Operations Overview"})]}),e.jsxs(Ne,{children:[e.jsxs(C,{value:f,onChange:t=>ce(t.target.value),children:[e.jsx("option",{value:"all",children:"All Time"}),e.jsx("option",{value:"today",children:"Today"}),e.jsx("option",{value:"month",children:"This Month"}),e.jsx("option",{value:"year",children:"This Year"})]}),e.jsxs(C,{value:p,onChange:t=>he(t.target.value),children:[e.jsx("option",{value:"All Years",children:"All Years"}),e.jsx("option",{value:"2026",children:"2026"}),e.jsx("option",{value:"2025",children:"2025"})]}),e.jsxs(C,{value:u,onChange:t=>xe(t.target.value),children:[e.jsx("option",{value:"All Months",children:"All Months"}),["January","February","March","April","May","June","July","August","September","October","November","December"].map(t=>e.jsx("option",{value:t,children:t},t))]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,borderLeft:"1px solid #e2e8f0",paddingLeft:10},children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"#475569"},children:"Currency:"}),e.jsx("button",{onClick:()=>k("USD"),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:o==="USD"?"#0d1319":"#f1f5f9",color:o==="USD"?"#fff":"#475569",border:"none",borderRadius:4,cursor:"pointer"},children:"USD ($)"}),e.jsx("button",{onClick:()=>k("INR"),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:o==="INR"?"#0d1319":"#f1f5f9",color:o==="INR"?"#fff":"#475569",border:"none",borderRadius:4,cursor:"pointer"},children:"INR (₹)"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{fontSize:"0.72rem",color:"#64748b"},children:"Rate:"}),e.jsx("input",{type:"number",step:"0.01",value:d,onChange:t=>ae(Number(t.target.value)),style:{width:65,padding:"4px 6px",fontSize:"0.75rem",border:"1px solid #cbd5e1",borderRadius:4}})]}),e.jsx("button",{onClick:w,style:{background:"none",border:"none",cursor:"pointer",color:"#64748b",display:"flex",alignItems:"center"},title:"Refresh Metrics",children:e.jsx(pe,{size:16})})]})]}),e.jsxs(Se,{children:[e.jsxs(y,{$highlight:!0,children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Total Revenue"}),e.jsx(ue,{size:16})]}),e.jsx("div",{className:"kpi-value",children:o==="USD"?`$${i(s==null?void 0:s.totalRevenue)}`:`₹${i((Number(s==null?void 0:s.totalRevenue)||0)*d)}`}),e.jsxs("div",{className:"kpi-sub",children:[(s==null?void 0:s.totalOrders)||0," Invoiced Orders"]})]}),e.jsxs(y,{children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Net Profit"}),e.jsx(me,{size:16,color:"#16a34a"})]}),e.jsx("div",{className:"kpi-value",style:{color:"#16a34a"},children:o==="USD"?`$${i(s==null?void 0:s.totalNetProfit)}`:`₹${i((s==null?void 0:s.totalNetProfitINR)||(Number(s==null?void 0:s.totalNetProfit)||0)*d)}`}),e.jsxs("div",{className:"kpi-sub",children:["Avg Markup: ",Number((s==null?void 0:s.averageMarkupPercent)||0)>1?Number(s==null?void 0:s.averageMarkupPercent).toFixed(1):((Number(s==null?void 0:s.averageMarkupPercent)||0)*100).toFixed(1),"%"]})]}),e.jsxs(y,{children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Commission Paid/Due"}),e.jsx(ge,{size:16,color:"#d97706"})]}),e.jsx("div",{className:"kpi-value",style:{color:"#d97706"},children:o==="USD"?`$${i(s==null?void 0:s.totalCommission)}`:`₹${i((s==null?void 0:s.totalCommissionINR)||(Number(s==null?void 0:s.totalCommission)||0)*d)}`}),e.jsxs("div",{className:"kpi-sub",children:["Retained Profit: ",o==="USD"?`$${i(s==null?void 0:s.totalProfitAfterCommission)}`:`₹${i((s==null?void 0:s.profitAfterCommissionINR)||(Number(s==null?void 0:s.totalProfitAfterCommission)||0)*d)}`]})]}),e.jsxs(y,{children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Attendance Today"}),e.jsx(je,{size:16,color:"#2563eb"})]}),e.jsxs("div",{className:"kpi-value",style:{color:"#2563eb"},children:[((z=r==null?void 0:r.attendanceToday)==null?void 0:z.present)||((A=r==null?void 0:r.attendance)==null?void 0:A.present)||0," / ",((M=r==null?void 0:r.attendanceToday)==null?void 0:M.total)||((T=r==null?void 0:r.attendance)==null?void 0:T.totalEmployees)||0]}),e.jsxs("div",{className:"kpi-sub",children:[((I=r==null?void 0:r.attendanceToday)==null?void 0:I.late)||((U=r==null?void 0:r.attendance)==null?void 0:U.late)||0," Late | ",((W=r==null?void 0:r.attendanceToday)==null?void 0:W.absent)||((_=r==null?void 0:r.attendance)==null?void 0:_.absent)||0," Absent | ",((O=r==null?void 0:r.attendanceToday)==null?void 0:O.onLeave)||((F=r==null?void 0:r.attendance)==null?void 0:F.onLeave)||0," Leave"]})]})]}),e.jsxs(le,{children:[e.jsxs(j,{children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"card-title",children:"Sales Person Performance & Commission"}),e.jsxs("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"#64748b"},children:["Showing ",((L=r==null?void 0:r.salesPersonPerformance)==null?void 0:L.length)||0," Staff Members"]})]}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs(D,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Sales Person"}),e.jsx("th",{children:"Orders"}),e.jsx("th",{children:"Revenue"}),e.jsxs("th",{children:["Net Profit (",o,")"]}),e.jsxs("th",{children:["Commission (",o,")"]}),e.jsxs("th",{children:["Profit Retained (",o,")"]})]})}),e.jsxs("tbody",{children:[(B=r==null?void 0:r.salesPersonPerformance)==null?void 0:B.map((t,n)=>{const l=Number(t.revenue)||0,a=Number(t.netProfitUSD)||0,m=Number(t.netProfitINR)||a*d,h=Number(t.commissionUSD)||0,S=Number(t.commissionINR)||h*d,g=Number(t.profitAfterCommission)||a-h,fe=g*d;return e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:t.name||"Unassigned"}),e.jsx("td",{children:t.orders||0}),e.jsxs("td",{children:["$",i(l)]}),e.jsx("td",{style:{color:"#16a34a",fontWeight:600},children:o==="USD"?`$${i(a)}`:`₹${i(m)}`}),e.jsx("td",{style:{color:"#d97706",fontWeight:600},children:o==="USD"?`$${i(h)}`:`₹${i(S)}`}),e.jsx("td",{style:{fontWeight:600},children:o==="USD"?`$${i(g)}`:`₹${i(fe)}`})]},n)}),(!(r!=null&&r.salesPersonPerformance)||r.salesPersonPerformance.length===0)&&e.jsx("tr",{children:e.jsx("td",{colSpan:6,style:{textAlign:"center",padding:"24px",color:"#94a3b8"},children:"No sales data recorded for this period."})})]})]})})]}),e.jsxs("div",{children:[e.jsxs(j,{style:{marginBottom:20},children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"card-title",children:"Product Distribution"}),e.jsx(be,{size:16,color:"#e2b96f"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.8rem",fontWeight:600,marginBottom:4},children:[e.jsx("span",{children:"Loose Diamonds"}),e.jsxs("span",{children:["$",i((E=(Y=r==null?void 0:r.productDistribution)==null?void 0:Y.diamond)==null?void 0:E.revenue)]})]}),e.jsx("div",{style:{height:8,background:"#f1f5f9",borderRadius:4,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",background:"#e2b96f",width:`${(Number(s==null?void 0:s.totalRevenue)||0)>0?Math.min(100,(Number((J=(G=r==null?void 0:r.productDistribution)==null?void 0:G.diamond)==null?void 0:J.revenue)||0)/(Number(s==null?void 0:s.totalRevenue)||1)*100):0}%`}})}),e.jsxs("div",{style:{fontSize:"0.7rem",color:"#64748b",marginTop:2},children:[((q=(K=r==null?void 0:r.productDistribution)==null?void 0:K.diamond)==null?void 0:q.orders)||0," Orders | Net: $",i((X=(H=r==null?void 0:r.productDistribution)==null?void 0:H.diamond)==null?void 0:X.netProfit)]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.8rem",fontWeight:600,marginBottom:4},children:[e.jsx("span",{children:"Finished Jewelry"}),e.jsxs("span",{children:["$",i((Q=(Z=r==null?void 0:r.productDistribution)==null?void 0:Z.jewelry)==null?void 0:Q.revenue)]})]}),e.jsx("div",{style:{height:8,background:"#f1f5f9",borderRadius:4,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",background:"#0d1319",width:`${(Number(s==null?void 0:s.totalRevenue)||0)>0?Math.min(100,(Number((ee=(V=r==null?void 0:r.productDistribution)==null?void 0:V.jewelry)==null?void 0:ee.revenue)||0)/(Number(s==null?void 0:s.totalRevenue)||1)*100):0}%`}})}),e.jsxs("div",{style:{fontSize:"0.7rem",color:"#64748b",marginTop:2},children:[((te=(re=r==null?void 0:r.productDistribution)==null?void 0:re.jewelry)==null?void 0:te.orders)||0," Orders | Net: $",i((ie=(se=r==null?void 0:r.productDistribution)==null?void 0:se.jewelry)==null?void 0:ie.netProfit)]})]})]})]}),e.jsx(j,{children:(()=>{const t=(r==null?void 0:r.salesTargetOverall)||(r==null?void 0:r.targets)||{},n=t.monthName||u!=="All Months"?u:"August",l=t.year||p!=="All Years"?p:"2026",a=Number(t.target??t.totalTarget??0),m=Number(t.actual??t.actualSales??0),h=a>0?Math.min(100,Math.round(m/a*100)):0,S=Math.max(0,a-m),g=t.orderCount??0;return e.jsxs("div",{children:[e.jsxs("div",{className:"card-header",style:{marginBottom:12},children:[e.jsxs("div",{children:[e.jsx("div",{className:"card-title",children:"Company Monthly Target"}),e.jsxs("div",{style:{fontSize:"0.72rem",color:"#64748b",marginTop:2},children:["Target for ",e.jsxs("strong",{children:[n," ",l]})," (",g," orders)"]})]}),e.jsx(ve,{size:16,color:"#2563eb"})]}),a>0?e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.82rem",fontWeight:700},children:[e.jsxs("span",{style:{color:"#0f172a"},children:["Achieved: $",i(m)]}),e.jsxs("span",{style:{color:"#64748b"},children:["Target: $",i(a)]})]}),e.jsx("div",{style:{height:10,background:"#f1f5f9",borderRadius:5,overflow:"hidden",margin:"8px 0"},children:e.jsx("div",{style:{height:"100%",background:h>=100?"#16a34a":"#2563eb",width:`${h}%`}})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",color:"#64748b"},children:[e.jsxs("span",{children:["Achievement: ",e.jsxs("strong",{style:{color:h>=100?"#16a34a":"#0f172a"},children:[h,"%"]})]}),e.jsxs("span",{children:["Remaining: ",e.jsxs("strong",{children:["$",i(S)]})]})]})]}):e.jsxs("div",{style:{padding:"8px 0",fontSize:"0.78rem",color:"#64748b"},children:[e.jsxs("div",{children:["No target quota configured for ",e.jsxs("strong",{children:[n," ",l]}),"."]}),e.jsxs("div",{style:{marginTop:6,fontWeight:700,color:"#0f172a"},children:["Closed Sales: $",i(m)," (",g," orders)"]})]})]})})()})]})]}),e.jsxs(le,{children:[e.jsxs(j,{children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"card-title",children:"Top Clients by Revenue"})}),e.jsxs(D,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Client Name"}),e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Orders"}),e.jsx("th",{children:"Total Revenue"})]})}),e.jsxs("tbody",{children:[(ne=r==null?void 0:r.topCustomers)==null?void 0:ne.map((t,n)=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:t.name}),e.jsx("td",{children:t.country||"-"}),e.jsx("td",{children:t.orders}),e.jsxs("td",{style:{fontWeight:700},children:["$",i(t.revenue)]})]},n)),(!(r!=null&&r.topCustomers)||r.topCustomers.length===0)&&e.jsx("tr",{children:e.jsx("td",{colSpan:4,style:{textAlign:"center",padding:"16px",color:"#94a3b8"},children:"No client revenue records yet."})})]})]})]}),e.jsxs(j,{children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"card-title",children:"Geographic Sales"})}),e.jsxs(D,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Orders"}),e.jsx("th",{children:"Revenue"})]})}),e.jsxs("tbody",{children:[(oe=r==null?void 0:r.countryDistribution)==null?void 0:oe.map((t,n)=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:t.country}),e.jsx("td",{children:t.orders}),e.jsxs("td",{style:{fontWeight:700},children:["$",i(t.revenue)]})]},n)),(!(r!=null&&r.countryDistribution)||r.countryDistribution.length===0)&&e.jsx("tr",{children:e.jsx("td",{colSpan:3,style:{textAlign:"center",padding:"16px",color:"#94a3b8"},children:"No geographic distribution data yet."})})]})]})]})]})]})};export{ze as BusinessDashboardPage};
