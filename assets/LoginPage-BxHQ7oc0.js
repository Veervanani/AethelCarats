import{r as n,u as A,g as E,j as e,A as N,aG as P}from"./react-vendor-Jc2qAOIG.js";import{g as s}from"./ui-vendor-Bp1vOpov.js";import{a as k}from"./admin-pages-C8mf4vRY.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const G=s.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 56px 24px 80px;
  background-color: #f9f7f2;
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 32px 16px 60px;
  }
`,T=s.div`
  width: 100%;
  max-width: 480px;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  padding: 40px 36px;
  box-shadow: 0 10px 30px rgba(31, 31, 31, 0.04);
  border-radius: 2px;

  @media (max-width: 576px) {
    padding: 28px 20px;
  }
`,F=s.div`
  display: flex;
  border-bottom: 1px solid #d9d3c7;
  margin-bottom: 32px;
`,S=s.button`
  flex: 1;
  padding: 12px 0;
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 1.3rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({$active:r})=>r?"#1f1f1f":"#6b6b6b"};
  border-bottom: 2px solid ${({$active:r})=>r?"#c9a45c":"transparent"};
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
`,L=s.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,x=s.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
  }

  input {
    padding: 12px 16px;
    font-size: 0.95rem;
    color: #1f1f1f;
    background-color: #faf5eb;
    border: 1px solid #d9d3c7;
    border-radius: 2px;
    outline: none;
    transition: border-color 0.2s ease, background-color 0.2s ease;

    &::placeholder {
      color: #6b6b6b;
    }

    &:focus {
      border-color: #c9a45c;
      background-color: #ffffff;
    }
  }
`,B=s.a`
  font-size: 0.8rem;
  color: #6b6b6b;
  text-align: right;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #c9a45c;
  }
`,O=s.button`
  width: 100%;
  padding: 14px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background-color: #1f1f1f;
  color: #ffffff;
  border: 1px solid #1f1f1f;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #b8944d;
    border-color: #b8944d;
  }
`,M=s.div`
  padding: 12px 16px;
  font-size: 0.85rem;
  color: #d32f2f;
  background-color: #fdf2f2;
  border: 1px solid #f8b4b4;
`,J=()=>{const[r,h]=n.useState(!1),[i,v]=n.useState(""),[m,C]=n.useState(""),[g,b]=n.useState(!1),[w,I]=n.useState(""),[j,a]=n.useState(""),[y,d]=n.useState(!1),f=A(),_=async t=>{var l,c;t.preventDefault(),a(""),d(!0);try{if(r)localStorage.setItem("fj_customer_user",JSON.stringify({email:i,name:w||"Valued Customer"})),f("/account");else try{const o=await k.loginAdmin({email:i,password:m});if(o.token){localStorage.setItem("fj_admin_token",o.token),f("/atelier-vault-7Kx9Qm4R2Lp8Nw6T");return}}catch{localStorage.setItem("fj_customer_user",JSON.stringify({email:i,name:i.split("@")[0]})),f("/account")}}catch(o){a(((c=(l=o.response)==null?void 0:l.data)==null?void 0:c.message)||"Unable to sign in. Please check your credentials.")}finally{d(!1)}},z=E({onSuccess:async t=>{var l,c;d(!0),a("");try{let o=null;try{const p=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${t.access_token}`}});p.ok&&(o=await p.json())}catch(p){console.warn("Google profile fetch warning:",p)}const u=await k.googleAuth({token:t.access_token,accessToken:t.access_token,credential:t.credential||t.id_token,userInfo:o});u.token?(localStorage.setItem("floksy_token",u.token),localStorage.setItem("fj_customer_user",JSON.stringify(u.user)),f("/account")):a("Google Sign-In failed. Please try again.")}catch(o){console.error("Google OAuth error:",o),a(((c=(l=o==null?void 0:o.response)==null?void 0:l.data)==null?void 0:c.message)||(o==null?void 0:o.message)||"Google authentication failed.")}finally{d(!1)}},onError:t=>{console.warn("Google login error:",t),(t==null?void 0:t.error)!=="popup_closed_by_user"&&a((t==null?void 0:t.error_description)||"Google Sign-In failed or was canceled.")}});return e.jsx(G,{children:e.jsxs(T,{children:[e.jsxs(F,{children:[e.jsx(S,{$active:!r,onClick:()=>{h(!1),a("")},children:"SIGN IN"}),e.jsx(S,{$active:r,onClick:()=>{h(!0),a("")},children:"CREATE ACCOUNT"})]}),j&&e.jsx(M,{children:j}),e.jsxs(L,{onSubmit:_,children:[r&&e.jsxs(x,{children:[e.jsx("label",{children:"Full Name"}),e.jsx("input",{type:"text",placeholder:"e.g. Eleanor Vance",value:w,onChange:t=>I(t.target.value),required:!0})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Email Address"}),e.jsx("input",{type:"email",placeholder:"e.g. contact@floksyjewel.com",value:i,onChange:t=>v(t.target.value),required:!0})]}),e.jsxs(x,{children:[e.jsx("label",{children:"Password"}),e.jsx("input",{type:g?"text":"password",placeholder:"••••••••",value:m,onChange:t=>C(t.target.value),required:!0}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginTop:6,cursor:"pointer",userSelect:"none"},onClick:t=>{t.target.tagName!=="INPUT"&&b(!g)},children:[e.jsx("input",{type:"checkbox",id:"showStorefrontPasswordCheck",checked:g,onChange:t=>b(t.target.checked),style:{width:"auto",cursor:"pointer",accentColor:"#1a1918"}}),e.jsx("label",{htmlFor:"showStorefrontPasswordCheck",style:{fontSize:"0.8rem",color:"#555",cursor:"pointer",fontWeight:500,textTransform:"none",letterSpacing:"normal"},children:"Show password"})]})]}),!r&&e.jsx(B,{onClick:()=>alert("Password reset instructions sent to your email."),children:"Forgot password?"}),e.jsx(O,{type:"submit",disabled:y,children:y?"PLEASE WAIT...":r?e.jsxs(e.Fragment,{children:["CREATE ACCOUNT ",e.jsx(N,{size:14})]}):e.jsxs(e.Fragment,{children:["SIGN IN ",e.jsx(P,{size:14})]})})]}),e.jsx("div",{style:{marginTop:"20px"},children:e.jsxs("button",{type:"button",onClick:()=>{a(""),z()},style:{width:"100%",padding:"12px",backgroundColor:"#ffffff",color:"#1f1f1f",border:"1px solid #d9d3c7",fontSize:"0.85rem",fontWeight:500,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",cursor:"pointer"},children:[e.jsxs("svg",{viewBox:"0 0 24 24",style:{width:18,height:18},children:[e.jsx("path",{fill:"#4285F4",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),e.jsx("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),e.jsx("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"}),e.jsx("path",{fill:"#EA4335",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"})]}),"Sign in with Google"]})})]})})};export{J as LoginPage};
