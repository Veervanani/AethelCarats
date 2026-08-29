import{r as c,j as e,b as xe,Z as pe,al as fe,aP as ue,a4 as me,a1 as je,bb as be}from"./react-vendor-Bcx5ivmQ.js";import{g as a}from"./ui-vendor-CRtaqJ-f.js";import{b as ge}from"./businessApi-DCU64_kQ.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-DQ_O-GPO.js";import"./admin-tools-vendor-CKN5doRT.js";const ve=a.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,ye=a.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  background: #ffffff;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`,w=a.select`
  padding: 6px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.82rem;
  background: #ffffff;
  color: #0f172a;
  outline: none;
`,Ne=a.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`,v=a.div`
  background: ${({$highlight:s})=>s?"linear-gradient(135deg, #0d1319 0%, #1a2530 100%)":"#ffffff"};
  color: ${({$highlight:s})=>s?"#ffffff":"#0f172a"};
  border: 1px solid ${({$highlight:s})=>s?"#0d1319":"#e2e8f0"};
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
    color: ${({$highlight:s})=>s?"#e2b96f":"#64748b"};
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
    color: ${({$highlight:s})=>s?"#9bb0bf":"#64748b"};
    margin-top: 6px;
  }
`,ie=a.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,f=a.div`
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
`,C=a.table`
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
`,Pe=()=>{var k,P,A,z,M,T,U,I,W,O,L,B,Y,E,F,G,J,V,K,H,X,Z,q,Q,_,ee,se,re,te,ne;const[s,oe]=c.useState(null),[Se,$]=c.useState(!0),[h,y]=c.useState("all"),[u,m]=c.useState("2026"),[j,b]=c.useState("All Months"),[i,D]=c.useState("USD"),[o,le]=c.useState(94.55),R=async()=>{$(!0);try{const t=await ge.getDashboardMetrics({period:h,year:u!=="All Years"?u:void 0,month:j!=="All Months"?j:void 0,dollarRate:o});oe(t)}catch(t){console.error(t)}finally{$(!1)}};c.useEffect(()=>{R()},[h,u,j,o]);const r=s==null?void 0:s.metrics,n=t=>(Number(t)||0).toLocaleString(),de=t=>{y(t),t==="all"?(m("All Years"),b("All Months")):t==="month"?(m("2026"),b("August")):t==="year"&&(m("2026"),b("All Months"))},ce=t=>{m(t),h!=="all"&&h!=="month"&&y("all")},ae=t=>{b(t),h!=="all"&&h!=="month"&&y("all")};return e.jsxs("div",{children:[e.jsxs(ve,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Executive Business Dashboard"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Real-time Sales, Profits, Commissions, and Employee Operations Overview"})]}),e.jsxs(ye,{children:[e.jsxs(w,{value:h,onChange:t=>de(t.target.value),children:[e.jsx("option",{value:"all",children:"All Time"}),e.jsx("option",{value:"today",children:"Today"}),e.jsx("option",{value:"month",children:"This Month"}),e.jsx("option",{value:"year",children:"This Year"})]}),e.jsxs(w,{value:u,onChange:t=>ce(t.target.value),children:[e.jsx("option",{value:"All Years",children:"All Years"}),e.jsx("option",{value:"2026",children:"2026"}),e.jsx("option",{value:"2025",children:"2025"})]}),e.jsxs(w,{value:j,onChange:t=>ae(t.target.value),children:[e.jsx("option",{value:"All Months",children:"All Months"}),["January","February","March","April","May","June","July","August","September","October","November","December"].map(t=>e.jsx("option",{value:t,children:t},t))]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,borderLeft:"1px solid #e2e8f0",paddingLeft:10},children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"#475569"},children:"Currency:"}),e.jsx("button",{onClick:()=>D("USD"),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:i==="USD"?"#0d1319":"#f1f5f9",color:i==="USD"?"#fff":"#475569",border:"none",borderRadius:4,cursor:"pointer"},children:"USD ($)"}),e.jsx("button",{onClick:()=>D("INR"),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:i==="INR"?"#0d1319":"#f1f5f9",color:i==="INR"?"#fff":"#475569",border:"none",borderRadius:4,cursor:"pointer"},children:"INR (₹)"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{fontSize:"0.72rem",color:"#64748b"},children:"Rate:"}),e.jsx("input",{type:"number",value:o,onChange:t=>le(Number(t.target.value)),style:{width:60,padding:"4px 6px",fontSize:"0.75rem",border:"1px solid #cbd5e1",borderRadius:4}})]}),e.jsx("button",{onClick:R,style:{background:"none",border:"none",cursor:"pointer",color:"#64748b",display:"flex",alignItems:"center"},title:"Refresh Metrics",children:e.jsx(xe,{size:16})})]})]}),e.jsxs(Ne,{children:[e.jsxs(v,{$highlight:!0,children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Total Revenue"}),e.jsx(pe,{size:16})]}),e.jsx("div",{className:"kpi-value",children:i==="USD"?`$${n(r==null?void 0:r.totalRevenue)}`:`₹${n((Number(r==null?void 0:r.totalRevenue)||0)*o)}`}),e.jsxs("div",{className:"kpi-sub",children:[(r==null?void 0:r.totalOrders)||0," Invoiced Orders"]})]}),e.jsxs(v,{children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Net Profit"}),e.jsx(fe,{size:16,color:"#16a34a"})]}),e.jsx("div",{className:"kpi-value",style:{color:"#16a34a"},children:i==="USD"?`$${n(r==null?void 0:r.totalNetProfit)}`:`₹${n((r==null?void 0:r.totalNetProfitINR)||(Number(r==null?void 0:r.totalNetProfit)||0)*o)}`}),e.jsxs("div",{className:"kpi-sub",children:["Avg Markup: ",Number((r==null?void 0:r.averageMarkupPercent)||0)>1?Number(r==null?void 0:r.averageMarkupPercent).toFixed(1):((Number(r==null?void 0:r.averageMarkupPercent)||0)*100).toFixed(1),"%"]})]}),e.jsxs(v,{children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Commission Paid/Due"}),e.jsx(ue,{size:16,color:"#d97706"})]}),e.jsx("div",{className:"kpi-value",style:{color:"#d97706"},children:i==="USD"?`$${n(r==null?void 0:r.totalCommission)}`:`₹${n((r==null?void 0:r.totalCommissionINR)||(Number(r==null?void 0:r.totalCommission)||0)*o)}`}),e.jsxs("div",{className:"kpi-sub",children:["Retained Profit: ",i==="USD"?`$${n(r==null?void 0:r.totalProfitAfterCommission)}`:`₹${n((r==null?void 0:r.profitAfterCommissionINR)||(Number(r==null?void 0:r.totalProfitAfterCommission)||0)*o)}`]})]}),e.jsxs(v,{children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Attendance Today"}),e.jsx(me,{size:16,color:"#2563eb"})]}),e.jsxs("div",{className:"kpi-value",style:{color:"#2563eb"},children:[((k=s==null?void 0:s.attendanceToday)==null?void 0:k.present)||((P=s==null?void 0:s.attendance)==null?void 0:P.present)||0," / ",((A=s==null?void 0:s.attendanceToday)==null?void 0:A.total)||((z=s==null?void 0:s.attendance)==null?void 0:z.totalEmployees)||0]}),e.jsxs("div",{className:"kpi-sub",children:[((M=s==null?void 0:s.attendanceToday)==null?void 0:M.late)||((T=s==null?void 0:s.attendance)==null?void 0:T.late)||0," Late | ",((U=s==null?void 0:s.attendanceToday)==null?void 0:U.absent)||((I=s==null?void 0:s.attendance)==null?void 0:I.absent)||0," Absent | ",((W=s==null?void 0:s.attendanceToday)==null?void 0:W.onLeave)||((O=s==null?void 0:s.attendance)==null?void 0:O.onLeave)||0," Leave"]})]})]}),e.jsxs(ie,{children:[e.jsxs(f,{children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"card-title",children:"Sales Person Performance & Commission"}),e.jsxs("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"#64748b"},children:["Showing ",((L=s==null?void 0:s.salesPersonPerformance)==null?void 0:L.length)||0," Staff Members"]})]}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs(C,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Sales Person"}),e.jsx("th",{children:"Orders"}),e.jsx("th",{children:"Revenue"}),e.jsxs("th",{children:["Net Profit (",i,")"]}),e.jsxs("th",{children:["Commission (",i,")"]}),e.jsxs("th",{children:["Profit Retained (",i,")"]})]})}),e.jsxs("tbody",{children:[(B=s==null?void 0:s.salesPersonPerformance)==null?void 0:B.map((t,x)=>{const N=Number(t.revenue)||0,l=Number(t.netProfitUSD)||0,p=Number(t.netProfitINR)||l*o,d=Number(t.commissionUSD)||0,S=Number(t.commissionINR)||d*o,g=Number(t.profitAfterCommission)||l-d,he=g*o;return e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:t.name||"Unassigned"}),e.jsx("td",{children:t.orders||0}),e.jsxs("td",{children:["$",n(N)]}),e.jsx("td",{style:{color:"#16a34a",fontWeight:600},children:i==="USD"?`$${n(l)}`:`₹${n(p)}`}),e.jsx("td",{style:{color:"#d97706",fontWeight:600},children:i==="USD"?`$${n(d)}`:`₹${n(S)}`}),e.jsx("td",{style:{fontWeight:600},children:i==="USD"?`$${n(g)}`:`₹${n(he)}`})]},x)}),(!(s!=null&&s.salesPersonPerformance)||s.salesPersonPerformance.length===0)&&e.jsx("tr",{children:e.jsx("td",{colSpan:6,style:{textAlign:"center",padding:"24px",color:"#94a3b8"},children:"No sales data recorded for this period."})})]})]})})]}),e.jsxs("div",{children:[e.jsxs(f,{style:{marginBottom:20},children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"card-title",children:"Product Distribution"}),e.jsx(je,{size:16,color:"#e2b96f"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.8rem",fontWeight:600,marginBottom:4},children:[e.jsx("span",{children:"Loose Diamonds"}),e.jsxs("span",{children:["$",n((E=(Y=s==null?void 0:s.productDistribution)==null?void 0:Y.diamond)==null?void 0:E.revenue)]})]}),e.jsx("div",{style:{height:8,background:"#f1f5f9",borderRadius:4,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",background:"#e2b96f",width:`${(Number(r==null?void 0:r.totalRevenue)||0)>0?Math.min(100,(Number((G=(F=s==null?void 0:s.productDistribution)==null?void 0:F.diamond)==null?void 0:G.revenue)||0)/(Number(r==null?void 0:r.totalRevenue)||1)*100):0}%`}})}),e.jsxs("div",{style:{fontSize:"0.7rem",color:"#64748b",marginTop:2},children:[((V=(J=s==null?void 0:s.productDistribution)==null?void 0:J.diamond)==null?void 0:V.orders)||0," Orders | Net: $",n((H=(K=s==null?void 0:s.productDistribution)==null?void 0:K.diamond)==null?void 0:H.netProfit)]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.8rem",fontWeight:600,marginBottom:4},children:[e.jsx("span",{children:"Finished Jewelry"}),e.jsxs("span",{children:["$",n((Z=(X=s==null?void 0:s.productDistribution)==null?void 0:X.jewelry)==null?void 0:Z.revenue)]})]}),e.jsx("div",{style:{height:8,background:"#f1f5f9",borderRadius:4,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",background:"#0d1319",width:`${(Number(r==null?void 0:r.totalRevenue)||0)>0?Math.min(100,(Number((Q=(q=s==null?void 0:s.productDistribution)==null?void 0:q.jewelry)==null?void 0:Q.revenue)||0)/(Number(r==null?void 0:r.totalRevenue)||1)*100):0}%`}})}),e.jsxs("div",{style:{fontSize:"0.7rem",color:"#64748b",marginTop:2},children:[((ee=(_=s==null?void 0:s.productDistribution)==null?void 0:_.jewelry)==null?void 0:ee.orders)||0," Orders | Net: $",n((re=(se=s==null?void 0:s.productDistribution)==null?void 0:se.jewelry)==null?void 0:re.netProfit)]})]})]})]}),e.jsx(f,{children:(()=>{const t=(s==null?void 0:s.salesTargetOverall)||(s==null?void 0:s.targets)||{},x=t.monthName||"August",N=t.year||"2026",l=Number(t.target||t.totalTarget||3e4)||3e4,p=Number(t.actual??t.actualSales??0),d=l>0?Math.min(100,Math.round(p/l*100)):0,S=Math.max(0,l-p),g=t.orderCount??0;return e.jsxs("div",{children:[e.jsxs("div",{className:"card-header",style:{marginBottom:12},children:[e.jsxs("div",{children:[e.jsx("div",{className:"card-title",children:"Company Monthly Target"}),e.jsxs("div",{style:{fontSize:"0.72rem",color:"#64748b",marginTop:2},children:["Target for ",e.jsxs("strong",{children:[x," ",N]})," (",g," orders)"]})]}),e.jsx(be,{size:16,color:"#2563eb"})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.82rem",fontWeight:700},children:[e.jsxs("span",{style:{color:"#0f172a"},children:["Achieved: $",n(p)]}),e.jsxs("span",{style:{color:"#64748b"},children:["Target: $",n(l)]})]}),e.jsx("div",{style:{height:10,background:"#f1f5f9",borderRadius:5,overflow:"hidden",margin:"8px 0"},children:e.jsx("div",{style:{height:"100%",background:d>=100?"#16a34a":"#2563eb",width:`${d}%`}})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",color:"#64748b"},children:[e.jsxs("span",{children:["Achievement: ",e.jsxs("strong",{style:{color:d>=100?"#16a34a":"#0f172a"},children:[d,"%"]})]}),e.jsxs("span",{children:["Remaining: ",e.jsxs("strong",{children:["$",n(S)]})]})]})]})})()})]})]}),e.jsxs(ie,{children:[e.jsxs(f,{children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"card-title",children:"Top Clients by Revenue"})}),e.jsxs(C,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Client Name"}),e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Orders"}),e.jsx("th",{children:"Total Revenue"})]})}),e.jsxs("tbody",{children:[(te=s==null?void 0:s.topCustomers)==null?void 0:te.map((t,x)=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:t.name}),e.jsx("td",{children:t.country||"-"}),e.jsx("td",{children:t.orders}),e.jsxs("td",{style:{fontWeight:700},children:["$",n(t.revenue)]})]},x)),(!(s!=null&&s.topCustomers)||s.topCustomers.length===0)&&e.jsx("tr",{children:e.jsx("td",{colSpan:4,style:{textAlign:"center",padding:"16px",color:"#94a3b8"},children:"No client revenue records yet."})})]})]})]}),e.jsxs(f,{children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"card-title",children:"Geographic Sales"})}),e.jsxs(C,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Orders"}),e.jsx("th",{children:"Revenue"})]})}),e.jsxs("tbody",{children:[(ne=s==null?void 0:s.countryDistribution)==null?void 0:ne.map((t,x)=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:t.country}),e.jsx("td",{children:t.orders}),e.jsxs("td",{style:{fontWeight:700},children:["$",n(t.revenue)]})]},x)),(!(s!=null&&s.countryDistribution)||s.countryDistribution.length===0)&&e.jsx("tr",{children:e.jsx("td",{colSpan:3,style:{textAlign:"center",padding:"16px",color:"#94a3b8"},children:"No geographic distribution data yet."})})]})]})]})]})]})};export{Pe as BusinessDashboardPage};
