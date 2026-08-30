import{u as C,e as z,r as d,j as e,X as N,J as E,a4 as A,b3 as I,b4 as O,a8 as j,_ as L,b5 as M,Z as R,Q as T,al as B,b6 as D,b7 as P,O as U,b8 as F,b9 as _,a9 as W,L as H,m as J,l as G,n as K,ba as Q,ab as V,f as X}from"./react-vendor-Jc2qAOIG.js";import{g as r}from"./ui-vendor-Bp1vOpov.js";import{e as Y,P as t}from"./admin-pages-DS6Ww9wg.js";import{b as $}from"./businessApi-CFuaw7XS.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const Z=r.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #f7f9fc;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
`,q=r.aside`
  width: ${({$collapsed:s})=>s?"76px":"264px"};
  height: 100vh;
  background-color: #0d1319;
  color: #f1f4f8;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  z-index: 100;
  transition: width 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  border-right: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 264px;
    z-index: 10000;
    transform: ${({$mobileOpen:s})=>s?"translateX(0)":"translateX(-100%)"};
    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 6px 0 28px rgba(0, 0, 0, 0.5);
  }
`,ee=r.div`
  display: none;
  @media (max-width: 767px) {
    display: ${({$mobileOpen:s})=>s?"block":"none"};
    position: fixed;
    inset: 0;
    background: rgba(10, 15, 20, 0.75);
    backdrop-filter: blur(4px);
    z-index: 9999;
  }
`,se=r.div`
  padding: ${({$collapsed:s})=>s?"20px 12px":"22px 20px"};
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .brand-badge {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    color: #0d1319;
    background: #e2b96f;
    padding: 2px 6px;
    border-radius: 3px;
    text-transform: uppercase;
    display: inline-block;
    margin-bottom: 4px;
  }
  .brand-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .brand-sub {
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #8c9ba5;
  }
`,te=r.nav`
  flex: 1;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #232e3b #0d1319;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #232e3b;
    border-radius: 2px;
  }
`,x=r.div`
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #e2b96f;
  padding: 16px 20px 6px;
  white-space: nowrap;
  display: ${({$collapsed:s})=>s?"none":"block"};
`,o=r(X)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: ${({$collapsed:s})=>s?"11px 0":"9px 20px"};
  justify-content: ${({$collapsed:s})=>s?"center":"flex-start"};
  font-size: 0.84rem;
  font-weight: 500;
  color: ${({$active:s})=>s?"#ffffff":"#9bb0bf"};
  background-color: ${({$active:s})=>s?"rgba(226, 185, 111, 0.16)":"transparent"};
  border-left: 3px solid ${({$active:s})=>s?"#e2b96f":"transparent"};
  transition: all 0.15s ease;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.05);
  }

  .nav-text {
    display: ${({$collapsed:s})=>s?"none":"inline"};
  }
`,ie=r.div`
  padding: 14px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: ${({$collapsed:s})=>s?"center":"space-between"};

  .signout-btn {
    background: none;
    border: none;
    color: #9bb0bf;
    font-size: 0.8rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-radius: 4px;
    transition: all 0.15s ease;

    &:hover {
      color: #ff6b6b;
      background: rgba(255, 107, 107, 0.1);
    }
  }

  .collapse-toggle {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #e2b96f;
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`,ne=r.main`
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f7f9fc;
`,ae=r.header`
  position: sticky;
  top: 0;
  z-index: 90;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 12px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

  @media (max-width: 768px) {
    padding: 10px 14px;
  }
`,oe=r.button`
  display: none;
  background: none;
  border: 1px solid #e2e8f0;
  padding: 6px;
  border-radius: 6px;
  color: #0f172a;
  cursor: pointer;

  @media (max-width: 767px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`,le=r.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .user-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 10px;
    background: #f1f5f9;
    border-radius: 6px;

    @media (max-width: 480px) {
      display: none;
    }
  }
`,re=r.div`
  padding: 24px 28px;
  flex: 1;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 14px 12px;
  }
`,ce=r.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: ${({$isCheckedIn:s})=>s?"#ebfbee":"#f0f7ff"};
  color: ${({$isCheckedIn:s})=>s?"#2b8a3e":"#1971c2"};
  border: 1px solid ${({$isCheckedIn:s})=>s?"#b2f2bb":"#a5d8ff"};
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    filter: brightness(0.96);
  }
`,be=()=>{C();const s=z(),{user:l,logout:v}=Y(),[f,p]=d.useState(!1),[n,y]=d.useState(()=>localStorage.getItem("fj_biz_sidebar_collapsed")==="true"),[u,b]=d.useState(!1),[h,g]=d.useState(!1),S=()=>{y(i=>{const c=!i;return localStorage.setItem("fj_biz_sidebar_collapsed",String(c)),c})};d.useEffect(()=>{p(!1)},[s.pathname]);const a=i=>s.pathname===i,k=async()=>{var i,c;g(!0);try{u?(await $.checkOut({notes:"Self Clock-Out"}),b(!1),alert("✅ Checked out successfully!")):(await $.checkIn({notes:"Self Clock-In"}),b(!0),alert("✅ Checked in successfully!"))}catch(m){alert(((c=(i=m==null?void 0:m.response)==null?void 0:i.data)==null?void 0:c.message)||"Attendance action failed")}finally{g(!1)}},w=()=>{const i=s.pathname;return i.includes("/dashboard")?"Executive Dashboard":i.includes("/employees/new")?"Register New Employee":i.includes("/employees/")&&i.includes("/edit")?"Edit Employee":i.includes("/employees/")?"Employee Profile & KPI":i.includes("/employees")?"Employee Directory":i.includes("/attendance/report")?"Monthly Attendance Matrix":i.includes("/attendance")?"Daily Attendance Roster":i.includes("/sales/new")?"Create Internal Sale":i.includes("/sales/")&&i.includes("/edit")?"Edit Sale Invoice":i.includes("/sales/")?"Sale Invoice Details":i.includes("/sales")?"Sales Management Tracker":i.includes("/commissions")?"Commission Approvals & Ledger":i.includes("/commission-plans")?"Commission Plans & Rules":i.includes("/targets")?"Sales Quota & Target Tracking":i.includes("/customers")?"Private Customer CRM":i.includes("/suppliers")?"Supplier & Vendor Directory":i.includes("/import")?"Historical Excel Migration":i.includes("/reports")?"Business & Profit Reports":i.includes("/audit-logs")?"Activity Audit Trail":i.includes("/settings")?"Business & Currency Settings":"Floksy Jewel Business System"};return e.jsxs(Z,{children:[e.jsx(ee,{$mobileOpen:f,onClick:()=>p(!1)}),e.jsxs(q,{$mobileOpen:f,$collapsed:n,children:[e.jsxs(se,{$collapsed:n,children:[e.jsxs("div",{children:[e.jsx("span",{className:"brand-badge",children:"INTERNAL ERP"}),e.jsx("div",{className:"brand-title",children:n?"FJ":"FLOKSY JEWEL"}),!n&&e.jsx("span",{className:"brand-sub",children:"BUSINESS OPERATIONS"})]}),e.jsx("button",{type:"button",onClick:()=>p(!1),style:{display:f?"block":"none",background:"none",border:"none",color:"#fff"},children:e.jsx(N,{size:18})})]}),e.jsxs(te,{children:[e.jsxs(o,{to:`${t}/dashboard`,$active:a(`${t}/dashboard`),$collapsed:n,title:"Executive Dashboard",children:[e.jsx(E,{size:18})," ",e.jsx("span",{className:"nav-text",children:"Executive Dashboard"})]}),e.jsx(x,{$collapsed:n,children:"HUMAN RESOURCES"}),e.jsxs(o,{to:`${t}/employees`,$active:a(`${t}/employees`),$collapsed:n,title:"Employees Directory",children:[e.jsx(A,{size:18})," ",e.jsx("span",{className:"nav-text",children:"Employees Directory"})]}),e.jsxs(o,{to:`${t}/employees/new`,$active:a(`${t}/employees/new`),$collapsed:n,title:"Add Employee",children:[e.jsx(I,{size:18})," ",e.jsx("span",{className:"nav-text",children:"Add Employee"})]}),e.jsxs(o,{to:`${t}/attendance`,$active:a(`${t}/attendance`),$collapsed:n,title:"Attendance Roster",children:[e.jsx(O,{size:18})," ",e.jsx("span",{className:"nav-text",children:"Attendance Roster"})]}),e.jsxs(o,{to:`${t}/attendance/report`,$active:a(`${t}/attendance/report`),$collapsed:n,title:"Monthly Attendance Report",children:[e.jsx(j,{size:18})," ",e.jsx("span",{className:"nav-text",children:"Monthly Attendance"})]}),e.jsx(x,{$collapsed:n,children:"SALES & COMMISSIONS"}),e.jsxs(o,{to:`${t}/sales`,$active:a(`${t}/sales`)||s.pathname.startsWith(`${t}/sales/`),$collapsed:n,title:"Sales Tracker",children:[e.jsx(L,{size:18})," ",e.jsx("span",{className:"nav-text",children:"Sales Tracker"})]}),e.jsxs(o,{to:`${t}/sales/new`,$active:a(`${t}/sales/new`),$collapsed:n,title:"New Sale Invoice",children:[e.jsx(M,{size:18})," ",e.jsx("span",{className:"nav-text",children:"New Sale Invoice"})]}),e.jsxs(o,{to:`${t}/commissions`,$active:a(`${t}/commissions`),$collapsed:n,title:"Commission Approvals",children:[e.jsx(R,{size:18})," ",e.jsx("span",{className:"nav-text",children:"Commission Approvals"})]}),e.jsxs(o,{to:`${t}/commission-plans`,$active:a(`${t}/commission-plans`),$collapsed:n,title:"Commission Plans",children:[e.jsx(T,{size:18})," ",e.jsx("span",{className:"nav-text",children:"Commission Plans"})]}),e.jsxs(o,{to:`${t}/targets`,$active:a(`${t}/targets`),$collapsed:n,title:"Sales Targets & Quotas",children:[e.jsx(B,{size:18})," ",e.jsx("span",{className:"nav-text",children:"Sales Targets"})]}),e.jsx(x,{$collapsed:n,children:"CRM & VENDORS"}),e.jsxs(o,{to:`${t}/customers`,$active:a(`${t}/customers`),$collapsed:n,title:"Customers",children:[e.jsx(D,{size:18})," ",e.jsx("span",{className:"nav-text",children:"Customers"})]}),e.jsxs(o,{to:`${t}/suppliers`,$active:a(`${t}/suppliers`),$collapsed:n,title:"Suppliers",children:[e.jsx(P,{size:18})," ",e.jsx("span",{className:"nav-text",children:"Suppliers"})]}),e.jsx(x,{$collapsed:n,children:"ANALYTICS & TOOLS"}),e.jsxs(o,{to:`${t}/reports`,$active:a(`${t}/reports`),$collapsed:n,title:"Business Reports",children:[e.jsx(U,{size:18})," ",e.jsx("span",{className:"nav-text",children:"Business Reports"})]}),e.jsxs(o,{to:`${t}/import`,$active:a(`${t}/import`),$collapsed:n,title:"Excel Migration Tool",children:[e.jsx(F,{size:18})," ",e.jsx("span",{className:"nav-text",children:"Excel Sales Migration"})]}),((l==null?void 0:l.role)==="ADMIN"||(l==null?void 0:l.role)==="SUPER_ADMIN")&&e.jsxs(e.Fragment,{children:[e.jsxs(o,{to:`${t}/audit-logs`,$active:a(`${t}/audit-logs`),$collapsed:n,title:"Activity Audit Logs",children:[e.jsx(_,{size:18})," ",e.jsx("span",{className:"nav-text",children:"Activity Audit Logs"})]}),e.jsxs(o,{to:`${t}/settings`,$active:a(`${t}/settings`),$collapsed:n,title:"Settings",children:[e.jsx(W,{size:18})," ",e.jsx("span",{className:"nav-text",children:"Business Settings"})]})]})]}),e.jsxs(ie,{$collapsed:n,children:[!n&&e.jsxs("button",{className:"signout-btn",onClick:()=>v("Logged out from Business Operations"),title:"Sign Out",children:[e.jsx(H,{size:16})," Sign Out"]}),e.jsx("button",{className:"collapse-toggle",onClick:S,title:n?"Expand Sidebar":"Collapse Sidebar",children:n?e.jsx(J,{size:16}):e.jsx(G,{size:16})})]})]}),e.jsxs(ne,{children:[e.jsxs(ae,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx(oe,{type:"button",onClick:()=>p(!0),title:"Open Navigation Menu",children:e.jsx(K,{size:20})}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b",fontWeight:600,letterSpacing:"0.04em"},children:"FLOKSY JEWEL BUSINESS HUB"}),e.jsx("div",{style:{fontSize:"1.05rem",fontWeight:700,color:"#0f172a"},children:w()})]})]}),e.jsxs(le,{children:[e.jsxs(ce,{$isCheckedIn:u,onClick:k,disabled:h,children:[e.jsx(j,{size:14}),e.jsx("span",{children:h?"...":u?"Clock Out":"Clock In"})]}),e.jsxs("div",{className:"user-badge",children:[e.jsx(Q,{size:14,color:"#0f172a"}),e.jsx("span",{style:{fontSize:"0.8rem",fontWeight:600,color:"#0f172a"},children:(l==null?void 0:l.name)||(l==null?void 0:l.email)||"Authorized User"}),e.jsx("span",{style:{fontSize:"0.68rem",padding:"2px 6px",background:"#e2b96f",color:"#0d1319",fontWeight:700,borderRadius:4},children:(l==null?void 0:l.role)||"STAFF"})]})]})]}),e.jsx(re,{children:e.jsx(V,{})})]})]})};export{be as BusinessLayout};
