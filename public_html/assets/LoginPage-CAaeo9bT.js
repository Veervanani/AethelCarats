import{r as a,u as S,j as e,A as v,y as E}from"./react-vendor-BQZO0c5l.js";import{g as t}from"./ui-vendor-Bs2yixgz.js";import{a as F}from"./admin-pages-wJt5vK3f.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const B=t.div`
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
`,N=t.div`
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
`,P=t.div`
  display: flex;
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);
  margin-bottom: 32px;
`,y=t.button`
  flex: 1;
  padding: 12px 0;
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 1.3rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({$active:o})=>o?"#C9A96E":"#A8A8A8"};
  border-bottom: 2px solid ${({$active:o})=>o?"#C9A96E":"transparent"};
  background: transparent;
  cursor: pointer;
  transition: all 0.25s ease;
`,I=t.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,d=t.div`
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
`,z=t.a`
  font-size: 0.8rem;
  color: #A8A8A8;
  text-align: right;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #C9A96E;
  }
`,T=t.button`
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
`,R=t.div`
  padding: 12px 16px;
  font-size: 0.85rem;
  color: #FC8181;
  background-color: rgba(229, 62, 62, 0.15);
  border: 1px solid rgba(229, 62, 62, 0.4);
  border-radius: 2px;
  margin-bottom: 16px;
`,O=()=>{const[o,p]=a.useState(!1),[s,j]=a.useState(""),[x,A]=a.useState(""),[l,g]=a.useState(!1),[u,C]=a.useState(""),[m,i]=a.useState(""),[h,b]=a.useState(!1),c=S(),k=async r=>{var f,w;r.preventDefault(),i(""),b(!0);try{if(o)localStorage.setItem("app_user_profile",JSON.stringify({email:s,name:u||"Valued Client"})),c("/account");else try{const n=await F.loginAdmin({email:s,password:x});if(n.token){localStorage.setItem("admin_session_token",n.token),c("/vault-mgmt-k8m3x9q2v7");return}}catch{localStorage.setItem("app_user_profile",JSON.stringify({email:s,name:s.split("@")[0]})),c("/account")}}catch(n){i(((w=(f=n.response)==null?void 0:f.data)==null?void 0:w.message)||"Unable to sign in. Please check your credentials.")}finally{b(!1)}};return e.jsx(B,{children:e.jsxs(N,{children:[e.jsxs(P,{children:[e.jsx(y,{$active:!o,onClick:()=>{p(!1),i("")},children:"SIGN IN"}),e.jsx(y,{$active:o,onClick:()=>{p(!0),i("")},children:"CREATE ACCOUNT"})]}),m&&e.jsx(R,{children:m}),e.jsxs(I,{onSubmit:k,children:[o&&e.jsxs(d,{children:[e.jsx("label",{children:"Full Name"}),e.jsx("input",{type:"text",placeholder:"e.g. Eleanor Vance",value:u,onChange:r=>C(r.target.value),required:!0})]}),e.jsxs(d,{children:[e.jsx("label",{children:"Email Address"}),e.jsx("input",{type:"email",placeholder:"e.g. eleanor@aethelcarats.com",value:s,onChange:r=>j(r.target.value),required:!0})]}),e.jsxs(d,{children:[e.jsx("label",{children:"Password"}),e.jsx("input",{type:l?"text":"password",placeholder:"••••••••",value:x,onChange:r=>A(r.target.value),required:!0}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginTop:6,cursor:"pointer",userSelect:"none"},onClick:r=>{r.target.tagName!=="INPUT"&&g(!l)},children:[e.jsx("input",{type:"checkbox",id:"showStorefrontPasswordCheck",checked:l,onChange:r=>g(r.target.checked),style:{width:"auto",cursor:"pointer",accentColor:"#C9A96E"}}),e.jsx("label",{htmlFor:"showStorefrontPasswordCheck",style:{fontSize:"0.8rem",color:"#A8A8A8",cursor:"pointer",fontWeight:500,textTransform:"none",letterSpacing:"normal"},children:"Show password"})]})]}),!o&&e.jsx(z,{onClick:()=>alert("Password reset instructions sent to your email."),children:"Forgot password?"}),e.jsx(T,{type:"submit",disabled:h,children:h?"PLEASE WAIT...":o?e.jsxs(e.Fragment,{children:["CREATE ACCOUNT ",e.jsx(v,{size:14})]}):e.jsxs(e.Fragment,{children:["SIGN IN ",e.jsx(E,{size:14})]})})]})]})})};export{O as LoginPage};
