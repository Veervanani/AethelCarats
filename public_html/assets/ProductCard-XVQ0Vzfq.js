import{r as w,j as i,H as C,i as A,f as W}from"./react-vendor-BXyx942q.js";import{g as t}from"./ui-vendor-VHkRGmvp.js";import{b as B,d as D,S as u}from"./admin-pages-DwNSPdti.js";const p=t(W)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 4px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
  position: relative;
  will-change: transform;

  &:hover {
    transform: translateY(-5px);
    border-color: #c9a45c;
    box-shadow: 0 16px 36px rgba(201, 164, 92, 0.12), 0 6px 16px rgba(0, 0, 0, 0.04);
  }
`,E=t.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background-color: #FAF9F6;
  user-select: none;
`,H=t.div`
  position: absolute;
  inset: 0;
  opacity: ${({$isHovered:e,$activeIdx:n})=>n===1||e?0:1};
  transform: scale(${({$isHovered:e})=>e?1.04:1});
  transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`,F=t.div`
  position: absolute;
  inset: 0;
  opacity: ${({$isHovered:e,$activeIdx:n})=>n===1||e?1:0};
  transform: scale(${({$isHovered:e})=>e?1.04:1});
  transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`,L=t.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 3;

  @media (max-width: 576px) {
    top: 6px;
    left: 6px;
  }
`,y=t.span`
  background-color: rgba(255, 253, 249, 0.94);
  color: #1f1f1f;
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 4px 9px;
  font-weight: 600;
  border: 1px solid #e6e1d7;
  border-radius: 2px;
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  @media (max-width: 576px) {
    font-size: 0.58rem;
    padding: 3px 6px;
    letter-spacing: 0.1em;
  }
`,T=t.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: rgba(255, 253, 249, 0.94);
  border: 1px solid #e6e1d7;
  color: ${({$isLiked:e})=>e?"#d93838":"#1f1f1f"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    background-color: #1f1f1f;
    color: #c9a45c;
    border-color: #1f1f1f;
    transform: scale(1.08);
  }

  @media (max-width: 576px) {
    top: 6px;
    right: 6px;
    width: 28px;
    height: 28px;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`,_=t.button`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translate(-50%, 14px);
  width: 84%;
  padding: 9px 14px;
  background-color: rgba(28, 27, 25, 0.9);
  backdrop-filter: blur(8px);
  color: #ffffff;
  border: 1px solid rgba(201, 164, 92, 0.45);
  border-radius: 30px;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  z-index: 6;
  opacity: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;

  ${p}:hover & {
    transform: translate(-50%, 0);
    opacity: 1;
  }

  &:hover {
    background-color: #c9a45c;
    border-color: #c9a45c;
    color: #1f1f1f;
    box-shadow: 0 10px 28px rgba(201, 164, 92, 0.4);
  }

  @media (max-width: 1024px) {
    /* Hidden by default on mobile so product photos stay 100% clean */
    opacity: ${({$isHovered:e})=>e?.96:0};
    transform: ${({$isHovered:e})=>e?"translate(-50%, 0)":"translate(-50%, 12px)"};
    pointer-events: ${({$isHovered:e})=>e?"auto":"none"};
    width: 88%;
    padding: 7px 10px;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    bottom: 8px;
    background-color: rgba(28, 27, 25, 0.92);

    ${p}:active &, ${p}:focus & {
      opacity: 0.96;
      transform: translate(-50%, 0);
      pointer-events: auto;
    }
  }
`,N=t.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  z-index: 4;

  @media (min-width: 1025px) {
    display: none;
  }
`,v=t.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${({$active:e})=>e?"#C9A45C":"rgba(255, 255, 255, 0.7)"};
  border: 1px solid rgba(0, 0, 0, 0.15);
  transition: background-color 0.2s ease;
`,Q=t.div`
  padding: 16px 14px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  justify-content: space-between;
  background: #ffffff;

  @media (max-width: 576px) {
    padding: 10px 8px 12px;
  }
`,V=t.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.15rem;
  font-weight: 500;
  color: #1f1f1f;
  margin-bottom: 6px;
  line-height: 1.3;
  letter-spacing: 0.01em;
  min-height: 2.6em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 576px) {
    font-size: 0.95rem;
    line-height: 1.25;
    min-height: 2.5em;
    margin-bottom: 4px;
  }

  @media (max-width: 360px) {
    font-size: 0.88rem;
  }
`,U=t.p`
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  color: #77736c;
  margin-bottom: 10px;

  @media (max-width: 576px) {
    font-size: 0.7rem;
    margin-bottom: 6px;
  }
`,M=t.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  width: 100%;

  .price {
    font-size: 1.05rem;
    font-weight: 700;
    color: #1f1f1f;
    letter-spacing: 0.01em;
    white-space: nowrap;

    @media (max-width: 576px) {
      font-size: 0.92rem;
    }

    @media (max-width: 360px) {
      font-size: 0.85rem;
    }
  }

  .compare {
    font-size: 0.82rem;
    color: #999388;
    text-decoration: line-through;
    white-space: nowrap;

    @media (max-width: 576px) {
      font-size: 0.75rem;
    }

    @media (max-width: 360px) {
      font-size: 0.7rem;
    }
  }
`,K=({product:e})=>{const{toggleWishlist:n,isInWishlist:k}=B(),{openQuickView:j}=D(),[x,l]=w.useState(!1),[c,z]=w.useState(0),h=k(e.id),s=[];Array.isArray(e.images)&&e.images.length>0&&[...e.images].sort((o,r)=>((o==null?void 0:o.position)??0)-((r==null?void 0:r.position)??0)).forEach(o=>{const r=typeof o=="string"?o:o==null?void 0:o.url;r&&typeof r=="string"&&r.trim()!==""&&s.push(r.trim())}),e.primaryImage&&typeof e.primaryImage=="string"&&s.push(e.primaryImage.trim()),e.mainImage&&typeof e.mainImage=="string"&&s.push(e.mainImage.trim()),e.secondaryImage&&typeof e.secondaryImage=="string"&&s.push(e.secondaryImage.trim());const I=s.filter(a=>a&&!a.includes("floksy_rings_cat.png")&&!a.includes("floksy_rings_cat_2.png")),b=Array.from(new Set(I)),d=Array.from(new Set(s.filter(Boolean))),f=b[0]||d[0]||"/assets/floksy_rings_cat.png",g=b[1]||(d[1]&&d[1]!==f?d[1]:null)||null,m=!!(g&&g!==f),$=a=>{a.preventDefault(),a.stopPropagation(),n(e)},S=a=>{m&&z(o=>o===0?1:0)},P=`/product/${e.slug||e.id}`;return i.jsxs(p,{to:P,"data-testid":"product-card",onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),onTouchStart:()=>l(!0),onTouchEnd:()=>l(!1),children:[i.jsxs(E,{onClick:S,children:[i.jsx(H,{$isHovered:x&&m,$activeIdx:c,children:i.jsx(u,{src:f,alt:e.name,loading:"lazy",width:"400",height:"400"})}),m&&i.jsx(F,{$isHovered:x,$activeIdx:c,children:i.jsx(u,{src:g,alt:`${e.name} alternate view`,loading:"lazy",width:"400",height:"400"})}),i.jsxs(L,{children:[!!(e.onSale||e.salePrice)&&i.jsx(y,{style:{backgroundColor:"#d93838",color:"#ffffff",borderColor:"#d93838",fontWeight:700},children:"🏷️ ON SALE"}),e.metal&&i.jsx(y,{children:e.metal})]}),i.jsx(T,{$isLiked:h,onClick:$,title:"Add to Wishlist","aria-label":"Add to Wishlist",children:i.jsx(C,{size:16,fill:h?"#d93838":"none"})}),i.jsxs(_,{$isHovered:x,onClick:a=>j(e,a),title:"Quick View Product Details","aria-label":"Quick View Product Details",children:[i.jsx(A,{size:14})," QUICK VIEW"]}),m&&i.jsxs(N,{children:[i.jsx(v,{$active:c===0}),i.jsx(v,{$active:c===1})]})]}),i.jsxs(Q,{children:[i.jsx(V,{children:e.name}),(e.carat||e.shape)&&i.jsxs(U,{children:[e.carat?`${e.carat}ct `:"",e.shape||"Brilliant",e.color?` • ${e.color}`:"",e.clarity?` / ${e.clarity}`:""]}),i.jsxs(M,{children:[i.jsxs("span",{className:"price",style:{color:e.onSale&&e.salePrice?"#d93838":"#1f1f1f",fontWeight:700},children:["$",(e.salePrice&&e.onSale?e.salePrice:e.price||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})]}),!!(e.onSale&&e.comparePrice&&Number(e.comparePrice)>Number(e.salePrice||e.price||0))&&i.jsxs("span",{className:"compare",children:["$",Number(e.comparePrice).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})]})]})]})]})};export{K as P};
