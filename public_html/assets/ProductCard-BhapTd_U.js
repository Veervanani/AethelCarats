import{r as w,j as i,H as C,h as S,f as B}from"./react-vendor-BQZO0c5l.js";import{g as t}from"./ui-vendor-Bs2yixgz.js";import{b as P,d as W,S as u}from"./admin-pages-DCWy8I_r.js";const l=t(B)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.2);
  border-radius: 4px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
  position: relative;
  will-change: transform;

  &:hover {
    transform: translateY(-5px);
    border-color: #C9A96E;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.8), 0 0 20px rgba(201, 169, 110, 0.15);
  }
`,D=t.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background-color: #0B0B0B;
  user-select: none;
`,F=t.div`
  position: absolute;
  inset: 0;
  opacity: ${({$activeIdx:e,$isHovered:n})=>e===1||n?0:1};
  transform: scale(${({$isHovered:e})=>e?1.04:1});
  transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`,H=t.div`
  position: absolute;
  inset: 0;
  opacity: ${({$activeIdx:e,$isHovered:n})=>e===1||n?1:0};
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
  background-color: rgba(11, 11, 11, 0.88);
  color: #C9A96E;
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 4px 9px;
  font-weight: 600;
  border: 1px solid rgba(140, 116, 75, 0.3);
  border-radius: 2px;
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

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
  background-color: rgba(21, 21, 21, 0.88);
  border: 1px solid rgba(140, 116, 75, 0.3);
  color: ${({$isLiked:e})=>e?"#E53E3E":"#F5F1E8"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

  &:hover {
    background-color: #0B0B0B;
    color: #C9A96E;
    border-color: #C9A96E;
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
  background-color: #C9A96E;
  color: #0B0B0B;
  border: none;
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
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;

  ${l}:hover & {
    transform: translate(-50%, 0);
    opacity: 1;
  }

  &:hover {
    background-color: #DFCA9B;
    box-shadow: 0 10px 28px rgba(201, 169, 110, 0.4);
  }

  @media (max-width: 1024px) {
    opacity: ${({$isHovered:e})=>e?.96:0};
    transform: ${({$isHovered:e})=>e?"translate(-50%, 0)":"translate(-50%, 12px)"};
    pointer-events: ${({$isHovered:e})=>e?"auto":"none"};
    width: 88%;
    padding: 7px 10px;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    bottom: 8px;

    ${l}:active &, ${l}:focus & {
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
  background-color: ${({$active:e})=>e?"#C9A96E":"rgba(255, 255, 255, 0.4)"};
  border: 1px solid rgba(0, 0, 0, 0.3);
  transition: background-color 0.2s ease;
`,Q=t.div`
  padding: 16px 14px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  justify-content: space-between;
  background: #151515;

  @media (max-width: 576px) {
    padding: 10px 8px 12px;
  }
`,V=t.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.15rem;
  font-weight: 500;
  color: #F5F1E8;
  margin-bottom: 6px;
  line-height: 1.3;
  letter-spacing: 0.02em;
  min-height: 2.6em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.25s ease;

  ${l}:hover & {
    color: #C9A96E;
  }

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
  color: #A8A8A8;
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
    font-family: 'Inter', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: #C9A96E;
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
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    color: #777777;
    text-decoration: line-through;
    white-space: nowrap;

    @media (max-width: 576px) {
      font-size: 0.75rem;
    }

    @media (max-width: 360px) {
      font-size: 0.7rem;
    }
  }
`,K=({product:e})=>{const{toggleWishlist:n,isInWishlist:j}=P(),{openQuickView:k}=W(),[x,c]=w.useState(!1),[m,z]=w.useState(0),f=j(e.id),s=[];Array.isArray(e.images)&&e.images.length>0&&[...e.images].sort((o,r)=>((o==null?void 0:o.position)??0)-((r==null?void 0:r.position)??0)).forEach(o=>{const r=typeof o=="string"?o:o==null?void 0:o.url;r&&typeof r=="string"&&r.trim()!==""&&s.push(r.trim())}),e.primaryImage&&typeof e.primaryImage=="string"&&s.push(e.primaryImage.trim()),e.mainImage&&typeof e.mainImage=="string"&&s.push(e.mainImage.trim()),e.secondaryImage&&typeof e.secondaryImage=="string"&&s.push(e.secondaryImage.trim());const I=s.filter(a=>a&&!a.includes("gem_rings_cat.png")&&!a.includes("gem_rings_cat_2.png")),b=Array.from(new Set(I)),d=Array.from(new Set(s.filter(Boolean))),g=b[0]||d[0]||"/assets/gem_rings_cat.png",h=b[1]||(d[1]&&d[1]!==g?d[1]:null)||null,p=!!(h&&h!==g),$=a=>{a.preventDefault(),a.stopPropagation(),n(e)},E=a=>{p&&z(o=>o===0?1:0)},A=`/product/${e.slug||e.id}`;return i.jsxs(l,{to:A,"data-testid":"product-card",onMouseEnter:()=>c(!0),onMouseLeave:()=>c(!1),onTouchStart:()=>c(!0),onTouchEnd:()=>c(!1),children:[i.jsxs(D,{onClick:E,children:[i.jsx(F,{$isHovered:x&&p,$activeIdx:m,children:i.jsx(u,{src:g,alt:e.name,loading:"lazy",width:"400",height:"400"})}),p&&i.jsx(H,{$isHovered:x,$activeIdx:m,children:i.jsx(u,{src:h,alt:`${e.name} alternate view`,loading:"lazy",width:"400",height:"400"})}),i.jsxs(L,{children:[!!(e.onSale||e.salePrice)&&i.jsx(y,{style:{backgroundColor:"#d93838",color:"#ffffff",borderColor:"#d93838",fontWeight:700},children:"🏷️ ON SALE"}),e.metal&&i.jsx(y,{children:e.metal})]}),i.jsx(T,{$isLiked:f,onClick:$,title:"Add to Wishlist","aria-label":"Add to Wishlist",children:i.jsx(C,{size:16,fill:f?"#d93838":"none"})}),i.jsxs(_,{$isHovered:x,onClick:a=>k(e,a),title:"Quick View Product Details","aria-label":"Quick View Product Details",children:[i.jsx(S,{size:14})," QUICK VIEW"]}),p&&i.jsxs(N,{children:[i.jsx(v,{$active:m===0}),i.jsx(v,{$active:m===1})]})]}),i.jsxs(Q,{children:[i.jsx(V,{children:e.name}),(e.carat||e.shape)&&i.jsxs(U,{children:[e.carat?`${e.carat}ct `:"",e.shape||"Brilliant",e.color?` • ${e.color}`:"",e.clarity?` / ${e.clarity}`:""]}),i.jsxs(M,{children:[i.jsxs("span",{className:"price",style:{color:e.onSale&&e.salePrice?"#E53E3E":"#C9A96E",fontWeight:700},children:["$",(e.salePrice&&e.onSale?e.salePrice:e.price||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})]}),!!(e.onSale&&e.comparePrice&&Number(e.comparePrice)>Number(e.salePrice||e.price||0))&&i.jsxs("span",{className:"compare",children:["$",Number(e.comparePrice).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})]})]})]})]})};export{K as P};
