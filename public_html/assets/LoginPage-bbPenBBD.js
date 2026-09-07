import{r as n,u as I,g as _,j as e,A as B,K as z}from"./react-vendor-I9PV_paW.js";import{g as s}from"./ui-vendor-D75S3wy_.js";import{a as C}from"./admin-pages-DeXXMrNX.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const N=s.div`
  max-width: 1400px;
  min-height: 80vh;
  margin: 0 auto;
  padding: 56px 24px 80px;
  background-color: #0B0B0B;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 32px 16px 60px;
  }
`,P=s.div`
  width: 100%;
  max-width: 480px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.35);
  padding: 40px 36px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7), 0 0 30px rgba(201, 169, 110, 0.1);
  border-radius: 4px;

  @media (max-width: 576px) {
    padding: 28px 20px;
  }
`,G=s.div`
  display: flex;
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);
  margin-bottom: 32px;
`,A=s.button`
  flex: 1;
  padding: 12px 0;
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 1.3rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({$active:r})=>r?"#C9A96E":"#A8A8A8"};
  border-bottom: 2px solid ${({$active:r})=>r?"#C9A96E":"transparent"};
  background: transparent;
  cursor: pointer;
  transition: all 0.25s ease;
`,T=s.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,h=s.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
  }

  input {
    padding: 12px 16px;
    font-size: 0.95rem;
    color: #F5F1E8;
    background-color: #111111;
    border: 1px solid rgba(140, 116, 75, 0.25);
    border-radius: 2px;
    outline: none;
    font-family: 'Inter', sans-serif;
    transition: border-color 0.2s ease, background-color 0.2s ease;

    &::placeholder {
      color: #666666;
    }

    &:focus {
      border-color: #C9A96E;
      background-color: #0B0B0B;
      box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.2);
    }
  }
`,L=s.a`
  font-size: 0.8rem;
  color: #A8A8A8;
  text-align: right;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #C9A96E;
  }
`,O=s.button`
  width: 100%;
  padding: 15px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background-color: #C9A96E;
  color: #0B0B0B;
  border: 1px solid #C9A96E;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #DFBA73;
    border-color: #DFBA73;
    box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,M=s.div`
  padding: 12px 16px;
  font-size: 0.85rem;
  color: #FC8181;
  background-color: rgba(229, 62, 62, 0.15);
  border: 1px solid rgba(229, 62, 62, 0.4);
  border-radius: 2px;
  margin-bottom: 16px;
`,W=()=>{const[r,m]=n.useState(!1),[i,k]=n.useState(""),[f,S]=n.useState(""),[x,b]=n.useState(!1),[w,v]=n.useState(""),[y,a]=n.useState(""),[j,d]=n.useState(!1),p=I(),E=async t=>{var l,c;t.preventDefault(),a(""),d(!0);try{if(r)localStorage.setItem("app_user_profile",JSON.stringify({email:i,name:w||"Valued Client"})),p("/account");else try{const o=await C.loginAdmin({email:i,password:f});if(o.token){localStorage.setItem("admin_session_token",o.token),p("/vault-mgmt-k8m3x9q2v7");return}}catch{localStorage.setItem("app_user_profile",JSON.stringify({email:i,name:i.split("@")[0]})),p("/account")}}catch(o){a(((c=(l=o.response)==null?void 0:l.data)==null?void 0:c.message)||"Unable to sign in. Please check your credentials.")}finally{d(!1)}},F=_({onSuccess:async t=>{var l,c;d(!0),a("");try{let o=null;try{const g=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${t.access_token}`}});g.ok&&(o=await g.json())}catch(g){console.warn("Google profile fetch warning:",g)}const u=await C.googleAuth({token:t.access_token,accessToken:t.access_token,credential:t.credential||t.id_token,userInfo:o});u.token?(localStorage.setItem("app_auth_token",u.token),localStorage.setItem("app_user_profile",JSON.stringify(u.user)),p("/account")):a("Google Sign-In failed. Please try again.")}catch(o){console.error("Google OAuth error:",o),a(((c=(l=o==null?void 0:o.response)==null?void 0:l.data)==null?void 0:c.message)||(o==null?void 0:o.message)||"Google authentication failed.")}finally{d(!1)}},onError:t=>{console.warn("Google login error:",t),(t==null?void 0:t.error)!=="popup_closed_by_user"&&a((t==null?void 0:t.error_description)||"Google Sign-In failed or was canceled.")}});return e.jsx(N,{children:e.jsxs(P,{children:[e.jsxs(G,{children:[e.jsx(A,{$active:!r,onClick:()=>{m(!1),a("")},children:"SIGN IN"}),e.jsx(A,{$active:r,onClick:()=>{m(!0),a("")},children:"CREATE ACCOUNT"})]}),y&&e.jsx(M,{children:y}),e.jsxs(T,{onSubmit:E,children:[r&&e.jsxs(h,{children:[e.jsx("label",{children:"Full Name"}),e.jsx("input",{type:"text",placeholder:"e.g. Eleanor Vance",value:w,onChange:t=>v(t.target.value),required:!0})]}),e.jsxs(h,{children:[e.jsx("label",{children:"Email Address"}),e.jsx("input",{type:"email",placeholder:"e.g. eleanor@aethelcarats.com",value:i,onChange:t=>k(t.target.value),required:!0})]}),e.jsxs(h,{children:[e.jsx("label",{children:"Password"}),e.jsx("input",{type:x?"text":"password",placeholder:"••••••••",value:f,onChange:t=>S(t.target.value),required:!0}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginTop:6,cursor:"pointer",userSelect:"none"},onClick:t=>{t.target.tagName!=="INPUT"&&b(!x)},children:[e.jsx("input",{type:"checkbox",id:"showStorefrontPasswordCheck",checked:x,onChange:t=>b(t.target.checked),style:{width:"auto",cursor:"pointer",accentColor:"#C9A96E"}}),e.jsx("label",{htmlFor:"showStorefrontPasswordCheck",style:{fontSize:"0.8rem",color:"#A8A8A8",cursor:"pointer",fontWeight:500,textTransform:"none",letterSpacing:"normal"},children:"Show password"})]})]}),!r&&e.jsx(L,{onClick:()=>alert("Password reset instructions sent to your email."),children:"Forgot password?"}),e.jsx(O,{type:"submit",disabled:j,children:j?"PLEASE WAIT...":r?e.jsxs(e.Fragment,{children:["CREATE ACCOUNT ",e.jsx(B,{size:14})]}):e.jsxs(e.Fragment,{children:["SIGN IN ",e.jsx(z,{size:14})]})})]}),e.jsx("div",{style:{marginTop:"20px"},children:e.jsxs("button",{type:"button",onClick:()=>{a(""),F()},style:{width:"100%",padding:"12px",backgroundColor:"#111111",color:"#F5F1E8",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:"2px",fontSize:"0.85rem",fontWeight:500,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",cursor:"pointer",transition:"all 0.25s ease"},children:[e.jsxs("svg",{viewBox:"0 0 24 24",style:{width:18,height:18},children:[e.jsx("path",{fill:"#4285F4",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),e.jsx("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),e.jsx("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"}),e.jsx("path",{fill:"#EA4335",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"})]}),"Sign in with Google"]})})]})})};export{W as LoginPage};
