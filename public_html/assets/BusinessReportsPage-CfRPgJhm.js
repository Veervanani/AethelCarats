import{r as s,j as r,ae as fe}from"./react-vendor-BXyx942q.js";import{g as n}from"./ui-vendor-VHkRGmvp.js";import{b as he}from"./businessApi-DVdz7WMn.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-Bt6HuqhS.js";import"./admin-tools-vendor-CKN5doRT.js";const xe=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,me=n.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 18px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
`,c=n.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  border: 1px solid ${({$active:t})=>t?"#0d1319":"#cbd5e1"};
  background: ${({$active:t})=>t?"#0d1319":"#ffffff"};
  color: ${({$active:t})=>t?"#ffffff":"#334155"};
  cursor: pointer;
`,d=n.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;

  th {
    text-align: left;
    padding: 12px 16px;
    background: #0d1319;
    color: #ffffff;
    font-weight: 600;
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
  }

  tr:hover td {
    background: #f8fafc;
  }
`,Se=()=>{var h,x,m,u,p,j,g,b,a,y,S,N,P,R,v,D,W,C,w,$,L,k,I,U,T,z,A,B,E,F,M,O,V,G,H,J,q,K,Q,X,Y,Z,_,ee;const[t,l]=s.useState("sales"),[e,ie]=s.useState(null),[ue,f]=s.useState(!0);s.useEffect(()=>{f(!0),he.getDashboardMetrics({period:"all"}).then(i=>ie(i)).finally(()=>f(!1))},[]);const oe=()=>{alert("Report downloaded in CSV format.")};return r.jsxs("div",{children:[r.jsxs(xe,{children:[r.jsxs("div",{children:[r.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Business & Profit Intelligence Reports"}),r.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Consolidated financial auditing, salesperson profitability analysis, and margins"})]}),r.jsxs("button",{onClick:oe,style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[r.jsx(fe,{size:15})," Export Audit Report"]})]}),r.jsx(me,{children:r.jsxs("div",{style:{display:"flex",gap:8},children:[r.jsx(c,{$active:t==="sales",onClick:()=>l("sales"),children:"Sales Breakdown"}),r.jsx(c,{$active:t==="staff",onClick:()=>l("staff"),children:"Staff Performance"}),r.jsx(c,{$active:t==="profit",onClick:()=>l("profit"),children:"Margin & Retained Profit"})]})}),t==="sales"&&r.jsxs(d,{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Category"}),r.jsx("th",{children:"Orders"}),r.jsx("th",{children:"Total Revenue"}),r.jsx("th",{children:"Net Profit"}),r.jsx("th",{children:"Profit Margin"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{style:{fontWeight:600},children:"Loose Diamonds"}),r.jsx("td",{children:((x=(h=e==null?void 0:e.productDistribution)==null?void 0:h.diamond)==null?void 0:x.orders)||0}),r.jsxs("td",{style:{fontWeight:700},children:["$",(((u=(m=e==null?void 0:e.productDistribution)==null?void 0:m.diamond)==null?void 0:u.revenue)||0).toLocaleString()]}),r.jsxs("td",{style:{color:"#16a34a",fontWeight:600},children:["$",(((j=(p=e==null?void 0:e.productDistribution)==null?void 0:p.diamond)==null?void 0:j.netProfit)||0).toLocaleString()]}),r.jsxs("td",{children:[(((b=(g=e==null?void 0:e.productDistribution)==null?void 0:g.diamond)==null?void 0:b.revenue)||0)>0?((((y=(a=e==null?void 0:e.productDistribution)==null?void 0:a.diamond)==null?void 0:y.netProfit)||0)/(((N=(S=e==null?void 0:e.productDistribution)==null?void 0:S.diamond)==null?void 0:N.revenue)||1)*100).toFixed(1):0,"%"]})]}),r.jsxs("tr",{children:[r.jsx("td",{style:{fontWeight:600},children:"Finished Jewelry"}),r.jsx("td",{children:((R=(P=e==null?void 0:e.productDistribution)==null?void 0:P.jewelry)==null?void 0:R.orders)||0}),r.jsxs("td",{style:{fontWeight:700},children:["$",(((D=(v=e==null?void 0:e.productDistribution)==null?void 0:v.jewelry)==null?void 0:D.revenue)||0).toLocaleString()]}),r.jsxs("td",{style:{color:"#16a34a",fontWeight:600},children:["$",(((C=(W=e==null?void 0:e.productDistribution)==null?void 0:W.jewelry)==null?void 0:C.netProfit)||0).toLocaleString()]}),r.jsxs("td",{children:[((($=(w=e==null?void 0:e.productDistribution)==null?void 0:w.jewelry)==null?void 0:$.revenue)||0)>0?((((k=(L=e==null?void 0:e.productDistribution)==null?void 0:L.jewelry)==null?void 0:k.netProfit)||0)/(((U=(I=e==null?void 0:e.productDistribution)==null?void 0:I.jewelry)==null?void 0:U.revenue)||1)*100).toFixed(1):0,"%"]})]})]})]}),t==="staff"&&r.jsxs(d,{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Sales Representative"}),r.jsx("th",{children:"Total Orders"}),r.jsx("th",{children:"Sales Volume (USD)"}),r.jsx("th",{children:"Net Profit (USD)"}),r.jsx("th",{children:"Commission (USD)"}),r.jsx("th",{children:"Net Profit (INR)"})]})}),r.jsxs("tbody",{children:[(T=e==null?void 0:e.salesPersonPerformance)==null?void 0:T.map((i,se)=>{var te;const ne=Number(i.revenue)||0,re=Number(i.netProfitUSD)||0,le=Number(i.netProfitINR)||re*(((te=e==null?void 0:e.metrics)==null?void 0:te.dollarRate)||94.55),ce=Number(i.commissionUSD)||0,o=de=>(Number(de)||0).toLocaleString();return r.jsxs("tr",{children:[r.jsx("td",{style:{fontWeight:600},children:i.name||"Unassigned"}),r.jsx("td",{children:i.orders||0}),r.jsxs("td",{style:{fontWeight:700},children:["$",o(ne)]}),r.jsxs("td",{style:{color:"#16a34a",fontWeight:600},children:["$",o(re)]}),r.jsxs("td",{style:{color:"#d97706"},children:["$",o(ce)]}),r.jsxs("td",{children:["₹",o(le)]})]},se)}),(!(e!=null&&e.salesPersonPerformance)||e.salesPersonPerformance.length===0)&&r.jsx("tr",{children:r.jsx("td",{colSpan:6,style:{textAlign:"center",padding:"24px",color:"#94a3b8"},children:"No staff performance records available."})})]})]}),t==="profit"&&r.jsxs(d,{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Financial Metric"}),r.jsx("th",{children:"Value (USD)"}),r.jsxs("th",{children:["Value (INR @ ",((z=e==null?void 0:e.metrics)==null?void 0:z.dollarRate)||94.55,")"]})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{style:{fontWeight:600},children:"Total Billed Revenue"}),r.jsxs("td",{style:{fontWeight:700},children:["$",(Number((A=e==null?void 0:e.metrics)==null?void 0:A.totalRevenue)||0).toLocaleString()]}),r.jsxs("td",{children:["₹",((Number((B=e==null?void 0:e.metrics)==null?void 0:B.totalRevenue)||0)*(((E=e==null?void 0:e.metrics)==null?void 0:E.dollarRate)||94.55)).toLocaleString()]})]}),r.jsxs("tr",{children:[r.jsx("td",{style:{fontWeight:600},children:"Procurement Cost (COGS)"}),r.jsxs("td",{children:["$",(Number((F=e==null?void 0:e.metrics)==null?void 0:F.totalPurchaseCost)||0).toLocaleString()]}),r.jsxs("td",{children:["₹",((Number((M=e==null?void 0:e.metrics)==null?void 0:M.totalPurchaseCost)||0)*(((O=e==null?void 0:e.metrics)==null?void 0:O.dollarRate)||94.55)).toLocaleString()]})]}),r.jsxs("tr",{children:[r.jsx("td",{style:{fontWeight:600},children:"Net Operational Profit"}),r.jsxs("td",{style:{color:"#16a34a",fontWeight:700},children:["$",(Number((V=e==null?void 0:e.metrics)==null?void 0:V.totalNetProfit)||0).toLocaleString()]}),r.jsxs("td",{style:{color:"#16a34a",fontWeight:700},children:["₹",(Number((G=e==null?void 0:e.metrics)==null?void 0:G.totalNetProfitINR)||(Number((H=e==null?void 0:e.metrics)==null?void 0:H.totalNetProfit)||0)*(((J=e==null?void 0:e.metrics)==null?void 0:J.dollarRate)||94.55)).toLocaleString()]})]}),r.jsxs("tr",{children:[r.jsx("td",{style:{fontWeight:600},children:"Total Sales Commission"}),r.jsxs("td",{style:{color:"#d97706",fontWeight:700},children:["$",(Number((q=e==null?void 0:e.metrics)==null?void 0:q.totalCommission)||0).toLocaleString()]}),r.jsxs("td",{style:{color:"#d97706",fontWeight:700},children:["₹",(Number((K=e==null?void 0:e.metrics)==null?void 0:K.totalCommissionINR)||(Number((Q=e==null?void 0:e.metrics)==null?void 0:Q.totalCommission)||0)*(((X=e==null?void 0:e.metrics)==null?void 0:X.dollarRate)||94.55)).toLocaleString()]})]}),r.jsxs("tr",{style:{background:"#f8fafc"},children:[r.jsx("td",{style:{fontWeight:800},children:"Retained Company Profit"}),r.jsxs("td",{style:{color:"#0d1319",fontWeight:800},children:["$",(Number((Y=e==null?void 0:e.metrics)==null?void 0:Y.totalProfitAfterCommission)||0).toLocaleString()]}),r.jsxs("td",{style:{color:"#0d1319",fontWeight:800},children:["₹",(Number((Z=e==null?void 0:e.metrics)==null?void 0:Z.profitAfterCommissionINR)||(Number((_=e==null?void 0:e.metrics)==null?void 0:_.totalProfitAfterCommission)||0)*(((ee=e==null?void 0:e.metrics)==null?void 0:ee.dollarRate)||94.55)).toLocaleString()]})]})]})]})]})};export{Se as BusinessReportsPage};
