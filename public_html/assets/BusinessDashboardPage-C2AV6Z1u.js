import{r as l,j as e,b as pe,Z as fe,al as ue,aP as je,a4 as be,a1 as me,bb as ge}from"./react-vendor-nSAQcn3x.js";import{g as d}from"./ui-vendor-DQM2YHtl.js";import{b as ve}from"./businessApi-DsxayZmq.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-BxQsYPSZ.js";import"./admin-tools-vendor-CKN5doRT.js";const ye=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,Ne=d.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  background: #ffffff;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`,b=d.select`
  padding: 6px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.82rem;
  background: #ffffff;
  color: #0f172a;
  outline: none;
`,Se=d.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`,p=d.div`
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
`,te=d.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,a=d.div`
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
`,m=d.table`
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
`,ze=()=>{var N,S,R,w,$,D,C,k,P,z,A,T,M,U,I,W,O,L,B,E,Y,F,G,J,K,V,H,Q,X,Z,q,_,ee,se;const[s,ie]=l.useState(null),[Re,g]=l.useState(!0),[f,ne]=l.useState("all"),[h,oe]=l.useState("2026"),[x,le]=l.useState("All Months"),[n,v]=l.useState("USD"),[o,de]=l.useState(94.55),y=async()=>{g(!0);try{const t=await ve.getDashboardMetrics({period:f,year:h!=="All Years"?h:void 0,month:x!=="All Months"?x:void 0,dollarRate:o});ie(t)}catch(t){console.error(t)}finally{g(!1)}};l.useEffect(()=>{y()},[f,h,x,o]);const r=s==null?void 0:s.metrics,i=t=>(Number(t)||0).toLocaleString();return e.jsxs("div",{children:[e.jsxs(ye,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Executive Business Dashboard"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Real-time Sales, Profits, Commissions, and Employee Operations Overview"})]}),e.jsxs(Ne,{children:[e.jsxs(b,{value:f,onChange:t=>ne(t.target.value),children:[e.jsx("option",{value:"all",children:"All Time"}),e.jsx("option",{value:"today",children:"Today"}),e.jsx("option",{value:"month",children:"This Month"}),e.jsx("option",{value:"year",children:"This Year"})]}),e.jsxs(b,{value:h,onChange:t=>oe(t.target.value),children:[e.jsx("option",{value:"All Years",children:"All Years"}),e.jsx("option",{value:"2026",children:"2026"}),e.jsx("option",{value:"2025",children:"2025"})]}),e.jsxs(b,{value:x,onChange:t=>le(t.target.value),children:[e.jsx("option",{value:"All Months",children:"All Months"}),["January","February","March","April","May","June","July","August","September","October","November","December"].map(t=>e.jsx("option",{value:t,children:t},t))]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,borderLeft:"1px solid #e2e8f0",paddingLeft:10},children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"#475569"},children:"Currency:"}),e.jsx("button",{onClick:()=>v("USD"),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:n==="USD"?"#0d1319":"#f1f5f9",color:n==="USD"?"#fff":"#475569",border:"none",borderRadius:4,cursor:"pointer"},children:"USD ($)"}),e.jsx("button",{onClick:()=>v("INR"),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:n==="INR"?"#0d1319":"#f1f5f9",color:n==="INR"?"#fff":"#475569",border:"none",borderRadius:4,cursor:"pointer"},children:"INR (₹)"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{fontSize:"0.72rem",color:"#64748b"},children:"Rate:"}),e.jsx("input",{type:"number",value:o,onChange:t=>de(Number(t.target.value)),style:{width:60,padding:"4px 6px",fontSize:"0.75rem",border:"1px solid #cbd5e1",borderRadius:4}})]}),e.jsx("button",{onClick:y,style:{background:"none",border:"none",cursor:"pointer",color:"#64748b",display:"flex",alignItems:"center"},title:"Refresh Metrics",children:e.jsx(pe,{size:16})})]})]}),e.jsxs(Se,{children:[e.jsxs(p,{$highlight:!0,children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Total Revenue"}),e.jsx(fe,{size:16})]}),e.jsx("div",{className:"kpi-value",children:n==="USD"?`$${i(r==null?void 0:r.totalRevenue)}`:`₹${i((Number(r==null?void 0:r.totalRevenue)||0)*o)}`}),e.jsxs("div",{className:"kpi-sub",children:[(r==null?void 0:r.totalOrders)||0," Invoiced Orders"]})]}),e.jsxs(p,{children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Net Profit"}),e.jsx(ue,{size:16,color:"#16a34a"})]}),e.jsx("div",{className:"kpi-value",style:{color:"#16a34a"},children:n==="USD"?`$${i(r==null?void 0:r.totalNetProfit)}`:`₹${i((r==null?void 0:r.totalNetProfitINR)||(Number(r==null?void 0:r.totalNetProfit)||0)*o)}`}),e.jsxs("div",{className:"kpi-sub",children:["Avg Markup: ",((Number(r==null?void 0:r.averageMarkupPercent)||0)*100).toFixed(1),"%"]})]}),e.jsxs(p,{children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Commission Paid/Due"}),e.jsx(je,{size:16,color:"#d97706"})]}),e.jsx("div",{className:"kpi-value",style:{color:"#d97706"},children:n==="USD"?`$${i(r==null?void 0:r.totalCommission)}`:`₹${i((r==null?void 0:r.totalCommissionINR)||(Number(r==null?void 0:r.totalCommission)||0)*o)}`}),e.jsxs("div",{className:"kpi-sub",children:["Retained Profit: ",n==="USD"?`$${i(r==null?void 0:r.totalProfitAfterCommission)}`:`₹${i((r==null?void 0:r.profitAfterCommissionINR)||(Number(r==null?void 0:r.totalProfitAfterCommission)||0)*o)}`]})]}),e.jsxs(p,{children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Attendance Today"}),e.jsx(be,{size:16,color:"#2563eb"})]}),e.jsxs("div",{className:"kpi-value",style:{color:"#2563eb"},children:[((N=s==null?void 0:s.attendanceToday)==null?void 0:N.present)||((S=s==null?void 0:s.attendance)==null?void 0:S.present)||0," / ",((R=s==null?void 0:s.attendanceToday)==null?void 0:R.total)||((w=s==null?void 0:s.attendance)==null?void 0:w.totalEmployees)||0]}),e.jsxs("div",{className:"kpi-sub",children:[(($=s==null?void 0:s.attendanceToday)==null?void 0:$.late)||((D=s==null?void 0:s.attendance)==null?void 0:D.late)||0," Late | ",((C=s==null?void 0:s.attendanceToday)==null?void 0:C.absent)||((k=s==null?void 0:s.attendance)==null?void 0:k.absent)||0," Absent | ",((P=s==null?void 0:s.attendanceToday)==null?void 0:P.onLeave)||((z=s==null?void 0:s.attendance)==null?void 0:z.onLeave)||0," Leave"]})]})]}),e.jsxs(te,{children:[e.jsxs(a,{children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"card-title",children:"Sales Person Performance & Commission"}),e.jsxs("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"#64748b"},children:["Showing ",((A=s==null?void 0:s.salesPersonPerformance)==null?void 0:A.length)||0," Staff Members"]})]}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs(m,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Sales Person"}),e.jsx("th",{children:"Orders"}),e.jsx("th",{children:"Revenue"}),e.jsxs("th",{children:["Net Profit (",n,")"]}),e.jsxs("th",{children:["Commission (",n,")"]}),e.jsxs("th",{children:["Profit Retained (",n,")"]})]})}),e.jsxs("tbody",{children:[(T=s==null?void 0:s.salesPersonPerformance)==null?void 0:T.map((t,c)=>{const ce=Number(t.revenue)||0,u=Number(t.netProfitUSD)||0,ae=Number(t.netProfitINR)||u*o,j=Number(t.commissionUSD)||0,he=Number(t.commissionINR)||j*o,re=Number(t.profitAfterCommission)||u-j,xe=re*o;return e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:t.name||"Unassigned"}),e.jsx("td",{children:t.orders||0}),e.jsxs("td",{children:["$",i(ce)]}),e.jsx("td",{style:{color:"#16a34a",fontWeight:600},children:n==="USD"?`$${i(u)}`:`₹${i(ae)}`}),e.jsx("td",{style:{color:"#d97706",fontWeight:600},children:n==="USD"?`$${i(j)}`:`₹${i(he)}`}),e.jsx("td",{style:{fontWeight:600},children:n==="USD"?`$${i(re)}`:`₹${i(xe)}`})]},c)}),(!(s!=null&&s.salesPersonPerformance)||s.salesPersonPerformance.length===0)&&e.jsx("tr",{children:e.jsx("td",{colSpan:6,style:{textAlign:"center",padding:"24px",color:"#94a3b8"},children:"No sales data recorded for this period."})})]})]})})]}),e.jsxs("div",{children:[e.jsxs(a,{style:{marginBottom:20},children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"card-title",children:"Product Distribution"}),e.jsx(me,{size:16,color:"#e2b96f"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.8rem",fontWeight:600,marginBottom:4},children:[e.jsx("span",{children:"Loose Diamonds"}),e.jsxs("span",{children:["$",i((U=(M=s==null?void 0:s.productDistribution)==null?void 0:M.diamond)==null?void 0:U.revenue)]})]}),e.jsx("div",{style:{height:8,background:"#f1f5f9",borderRadius:4,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",background:"#e2b96f",width:`${(Number(r==null?void 0:r.totalRevenue)||0)>0?Math.min(100,(Number((W=(I=s==null?void 0:s.productDistribution)==null?void 0:I.diamond)==null?void 0:W.revenue)||0)/(Number(r==null?void 0:r.totalRevenue)||1)*100):0}%`}})}),e.jsxs("div",{style:{fontSize:"0.7rem",color:"#64748b",marginTop:2},children:[((L=(O=s==null?void 0:s.productDistribution)==null?void 0:O.diamond)==null?void 0:L.orders)||0," Orders | Net: $",i((E=(B=s==null?void 0:s.productDistribution)==null?void 0:B.diamond)==null?void 0:E.netProfit)]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.8rem",fontWeight:600,marginBottom:4},children:[e.jsx("span",{children:"Finished Jewelry"}),e.jsxs("span",{children:["$",i((F=(Y=s==null?void 0:s.productDistribution)==null?void 0:Y.jewelry)==null?void 0:F.revenue)]})]}),e.jsx("div",{style:{height:8,background:"#f1f5f9",borderRadius:4,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",background:"#0d1319",width:`${(Number(r==null?void 0:r.totalRevenue)||0)>0?Math.min(100,(Number((J=(G=s==null?void 0:s.productDistribution)==null?void 0:G.jewelry)==null?void 0:J.revenue)||0)/(Number(r==null?void 0:r.totalRevenue)||1)*100):0}%`}})}),e.jsxs("div",{style:{fontSize:"0.7rem",color:"#64748b",marginTop:2},children:[((V=(K=s==null?void 0:s.productDistribution)==null?void 0:K.jewelry)==null?void 0:V.orders)||0," Orders | Net: $",i((Q=(H=s==null?void 0:s.productDistribution)==null?void 0:H.jewelry)==null?void 0:Q.netProfit)]})]})]})]}),e.jsxs(a,{children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"card-title",children:"Sales Target Quota"}),e.jsx(ge,{size:16,color:"#2563eb"})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.82rem",fontWeight:700},children:[e.jsxs("span",{children:["Achieved: $",i(((X=s==null?void 0:s.salesTargetOverall)==null?void 0:X.actual)||((Z=s==null?void 0:s.targets)==null?void 0:Z.actualSales)||(r==null?void 0:r.totalRevenue))]}),e.jsxs("span",{children:["Target: $",i(((q=s==null?void 0:s.salesTargetOverall)==null?void 0:q.target)||((_=s==null?void 0:s.targets)==null?void 0:_.totalTarget)||1e5)]})]}),e.jsx("div",{style:{height:10,background:"#f1f5f9",borderRadius:5,overflow:"hidden",margin:"8px 0"},children:e.jsx("div",{style:{height:"100%",background:"#2563eb",width:`${Math.min(100,Math.round((Number(r==null?void 0:r.totalRevenue)||0)/1e5*100))}%`}})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",color:"#64748b"},children:[e.jsxs("span",{children:["Achievement: ",Math.min(100,Math.round((Number(r==null?void 0:r.totalRevenue)||0)/1e5*100)),"%"]}),e.jsxs("span",{children:["Remaining: $",i(Math.max(0,1e5-(Number(r==null?void 0:r.totalRevenue)||0)))]})]})]})]})]})]}),e.jsxs(te,{children:[e.jsxs(a,{children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"card-title",children:"Top Clients by Revenue"})}),e.jsxs(m,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Client Name"}),e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Orders"}),e.jsx("th",{children:"Total Revenue"})]})}),e.jsxs("tbody",{children:[(ee=s==null?void 0:s.topCustomers)==null?void 0:ee.map((t,c)=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:t.name}),e.jsx("td",{children:t.country||"-"}),e.jsx("td",{children:t.orders}),e.jsxs("td",{style:{fontWeight:700},children:["$",i(t.revenue)]})]},c)),(!(s!=null&&s.topCustomers)||s.topCustomers.length===0)&&e.jsx("tr",{children:e.jsx("td",{colSpan:4,style:{textAlign:"center",padding:"16px",color:"#94a3b8"},children:"No client revenue records yet."})})]})]})]}),e.jsxs(a,{children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"card-title",children:"Geographic Sales"})}),e.jsxs(m,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Orders"}),e.jsx("th",{children:"Revenue"})]})}),e.jsxs("tbody",{children:[(se=s==null?void 0:s.countryDistribution)==null?void 0:se.map((t,c)=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:t.country}),e.jsx("td",{children:t.orders}),e.jsxs("td",{style:{fontWeight:700},children:["$",i(t.revenue)]})]},c)),(!(s!=null&&s.countryDistribution)||s.countryDistribution.length===0)&&e.jsx("tr",{children:e.jsx("td",{colSpan:3,style:{textAlign:"center",padding:"16px",color:"#94a3b8"},children:"No geographic distribution data yet."})})]})]})]})]})]})};export{ze as BusinessDashboardPage};
