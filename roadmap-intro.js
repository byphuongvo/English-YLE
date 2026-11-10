/* roadmap-intro.js
   Khám phá cụm từ mới cho Unit 1 (Nice to see you again), thay cho danh sách 12 thẻ.
   Ba hoạt động: (1) hoạt hình 4 cảnh, xem 2 lần; (2) kéo mặt trời và đồng hồ; (3) tìm điểm khác nhau.
   Dùng chung các hàm có sẵn của roadmap.html: kid, nest, sceneWrap, skyAt không có sẵn nên tự định nghĩa ở đây. */
(function(){
"use strict";
if(window.__intro){return;}window.__intro=1;

var CSS=[
".in-cloud{animation:in-drift 14s ease-in-out infinite alternate}@keyframes in-drift{from{transform:translateX(-14px)}to{transform:translateX(18px)}}",
".in-talk{animation:in-bob .5s ease-in-out infinite alternate}@keyframes in-bob{from{transform:translateY(0)}to{transform:translateY(-4px)}}",
".in-mouth{transform-box:fill-box;transform-origin:center;animation:in-mo .28s ease-in-out infinite alternate}@keyframes in-mo{from{transform:scaleY(.35)}to{transform:scaleY(1.1)}}",
".in-bird{animation:in-fly 9s linear infinite}@keyframes in-fly{from{transform:translateX(-40px)}to{transform:translateX(520px)}}",
".in-pop{animation:in-pop .25s ease-out}@keyframes in-pop{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}",
".in-twk{animation:in-tw 2s ease-in-out infinite alternate}@keyframes in-tw{from{opacity:.3}to{opacity:1}}",
".in-hide{display:none!important}",
".in-card{border-left:5px solid var(--lvl,#C75A1B)}",
".in-tabs{display:flex;gap:6px;flex-wrap:wrap}",
".in-tab{border:2px solid var(--line);background:var(--surface);border-radius:10px;padding:8px 14px;font-weight:700;color:var(--muted)}",
".in-tab[aria-selected=true]{border-color:var(--accent);background:var(--accent-soft);color:var(--accent)}",
".in-panel{display:grid;gap:12px}",
".in-tag{font-weight:700;color:var(--lvl)}",
".in-cap{display:grid;gap:8px;padding:12px 14px;border-radius:12px;background:var(--accent-soft);min-height:92px;align-content:start}",
".in-who{font-weight:700;color:var(--lvl)}",
".in-en{font-size:1.15rem;font-weight:700;overflow-wrap:anywhere}",
".in-vi{color:var(--muted)}",
".in-ph{border:0;border-bottom:3px solid var(--accent);background:var(--surface);color:var(--accent);font:inherit;font-weight:700;padding:1px 6px;border-radius:6px;cursor:pointer}",
".in-ph.got{background:var(--good-bg);color:var(--good);border-color:var(--good)}",
".in-pc{display:flex;gap:10px;align-items:center;padding:10px 12px;border:2px dashed var(--line);border-radius:12px;min-height:60px}",
".in-ic{display:inline-flex;line-height:0}.in-chip{display:inline-flex;align-items:center;gap:6px}.in-chip svg{width:22px;height:22px}",
".in-book{display:flex;flex-wrap:wrap;gap:6px}",
".in-chip{padding:5px 12px;border-radius:999px;border:2px solid var(--line);background:var(--bg);color:var(--muted);font-weight:700}",
".in-chip.on{border-color:var(--good);background:var(--good-bg);color:var(--good)}",
".in-slider{width:100%;accent-color:var(--accent);height:32px}",
".in-time{font-family:var(--font-display);font-size:1.6rem;font-weight:600}",
".in-pill{display:inline-block;padding:6px 14px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:700;font-size:1.1rem}",
".in-pair{display:grid;grid-template-columns:1fr 1fr;gap:10px}",
"@media (max-width:560px){.in-pair{grid-template-columns:1fr}}",
".in-pic{display:grid;gap:6px;min-width:0}",
".in-hs rect{fill:transparent;stroke:none;cursor:pointer}",
".in-ring{fill:none;stroke:#2F6FDE;stroke-width:4;pointer-events:none}",
".in-flash{fill:none;stroke:#C75A1B;stroke-width:4;stroke-dasharray:8 5;pointer-events:none}",
".in-found{display:grid;gap:6px;margin:0;padding:0;list-style:none}",
".in-found li{padding:8px 12px;border-radius:10px;background:var(--good-bg);color:var(--good);font-weight:700}",
".in-fb{font-weight:700}.in-fb.ok{color:var(--good)}.in-fb.bad{color:var(--bad)}",
".in-dots{display:flex;gap:6px}",
".in-dots i{width:10px;height:10px;border-radius:50%;background:var(--line)}.in-dots i.on{background:var(--accent)}"
].join("");
var stl=document.createElement("style");stl.textContent=CSS;document.head.appendChild(stl);

/* ---------- tiện ích ---------- */
var cur=null,uid=0,run=0;
function mk(t,c,x){var e=document.createElement(t);if(c){e.className=c;}if(x!=null){e.textContent=x;}return e;}
var UI={play:"<svg viewBox=\"0 0 20 20\" width=\"14\" height=\"14\"><path d=\"M5 3l12 7-12 7z\" fill=\"currentColor\"/></svg>",stop:"<svg viewBox=\"0 0 20 20\" width=\"14\" height=\"14\"><rect x=\"4\" y=\"4\" width=\"12\" height=\"12\" rx=\"2\" fill=\"currentColor\"/></svg>",spk:"<svg viewBox=\"0 0 20 20\" width=\"15\" height=\"15\"><path d=\"M3 8h3l5-4v12l-5-4H3z\" fill=\"currentColor\"/><path d=\"M14 7q3 3 0 6M16 5q5 5 0 10\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\"/></svg>",star:"<svg viewBox=\"0 0 20 20\" width=\"14\" height=\"14\"><path d=\"M10 1l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L10 14.8 4.4 18l1.3-6.2L1 7.5l6.3-.7z\" fill=\"#ffb300\"/></svg>"};
var IC={"Good morning":"<svg viewBox=\"0 0 40 40\" width=\"30\" height=\"30\" aria-hidden=\"true\"><rect width=\"40\" height=\"40\" rx=\"10\" fill=\"#bfe6ff\"/><circle cx=\"20\" cy=\"27\" r=\"9\" fill=\"#ffc83d\"/><rect y=\"27\" width=\"40\" height=\"13\" fill=\"#7cc576\"/></svg>","Good afternoon":"<svg viewBox=\"0 0 40 40\" width=\"30\" height=\"30\" aria-hidden=\"true\"><rect width=\"40\" height=\"40\" rx=\"10\" fill=\"#8fd3ff\"/><circle cx=\"20\" cy=\"18\" r=\"8\" fill=\"#ffd84d\"/><path d=\"M20 3v4M20 29v4M5 18h4M31 18h4\" stroke=\"#ffb300\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></svg>","Good evening":"<svg viewBox=\"0 0 40 40\" width=\"30\" height=\"30\" aria-hidden=\"true\"><rect width=\"40\" height=\"40\" rx=\"10\" fill=\"#f7a35c\"/><circle cx=\"20\" cy=\"29\" r=\"8\" fill=\"#ffe08a\"/><rect y=\"29\" width=\"40\" height=\"11\" fill=\"#5b4b8a\"/></svg>","Good night":"<svg viewBox=\"0 0 40 40\" width=\"30\" height=\"30\" aria-hidden=\"true\"><rect width=\"40\" height=\"40\" rx=\"10\" fill=\"#27346b\"/><path d=\"M26 9a11 11 0 1 0 6 18A9 9 0 0 1 26 9z\" fill=\"#ffe27a\"/><circle cx=\"10\" cy=\"10\" r=\"1.6\" fill=\"#fff\"/><circle cx=\"14\" cy=\"28\" r=\"1.2\" fill=\"#fff\"/></svg>","Goodbye":"<svg viewBox=\"0 0 40 40\" width=\"30\" height=\"30\" aria-hidden=\"true\"><rect width=\"40\" height=\"40\" rx=\"10\" fill=\"#ffd9c2\"/><path d=\"M12 28c0-8 2-14 4-14s1 6 1 6 0-9 2-9 1 9 1 9 1-8 3-7-1 8-1 8 3-4 4-2-4 12-8 12-6-1-6-3z\" fill=\"#f4b183\" stroke=\"#c97b4a\" stroke-width=\"1.4\"/></svg>","See you tomorrow":"<svg viewBox=\"0 0 40 40\" width=\"30\" height=\"30\" aria-hidden=\"true\"><rect width=\"40\" height=\"40\" rx=\"10\" fill=\"#e9f1ff\"/><rect x=\"7\" y=\"9\" width=\"26\" height=\"24\" rx=\"4\" fill=\"#fff\" stroke=\"#4a78d6\" stroke-width=\"2\"/><rect x=\"7\" y=\"9\" width=\"26\" height=\"7\" rx=\"3\" fill=\"#4a78d6\"/><path d=\"M15 25h10m-4-4 4 4-4 4\" stroke=\"#4a78d6\" stroke-width=\"2.4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>","See you later":"<svg viewBox=\"0 0 40 40\" width=\"30\" height=\"30\" aria-hidden=\"true\"><rect width=\"40\" height=\"40\" rx=\"10\" fill=\"#e8f7ee\"/><circle cx=\"20\" cy=\"20\" r=\"12\" fill=\"#fff\" stroke=\"#2f9e63\" stroke-width=\"2.4\"/><path d=\"M20 12v8l6 3\" stroke=\"#2f9e63\" stroke-width=\"2.4\" fill=\"none\" stroke-linecap=\"round\"/></svg>","See you soon":"<svg viewBox=\"0 0 40 40\" width=\"30\" height=\"30\" aria-hidden=\"true\"><rect width=\"40\" height=\"40\" rx=\"10\" fill=\"#fff1d6\"/><path d=\"M8 20h20m-6-7 7 7-7 7\" stroke=\"#e08a00\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>","Nice to see you again":"<svg viewBox=\"0 0 40 40\" width=\"30\" height=\"30\" aria-hidden=\"true\"><rect width=\"40\" height=\"40\" rx=\"10\" fill=\"#ffe3ef\"/><circle cx=\"14\" cy=\"16\" r=\"6\" fill=\"#f4b183\"/><circle cx=\"26\" cy=\"16\" r=\"6\" fill=\"#f4b183\"/><path d=\"M8 32c0-6 4-8 6-8s4 1 6 1 4-1 6-1 6 2 6 8z\" fill=\"#e85d8a\"/></svg>","How are you?":"<svg viewBox=\"0 0 40 40\" width=\"30\" height=\"30\" aria-hidden=\"true\"><rect width=\"40\" height=\"40\" rx=\"10\" fill=\"#e5e9ff\"/><path d=\"M8 10h24a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H19l-7 6v-6H8a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3z\" fill=\"#fff\" stroke=\"#5560d6\" stroke-width=\"2\"/><circle cx=\"14\" cy=\"19\" r=\"1.8\" fill=\"#5560d6\"/><circle cx=\"20\" cy=\"19\" r=\"1.8\" fill=\"#5560d6\"/><circle cx=\"26\" cy=\"19\" r=\"1.8\" fill=\"#5560d6\"/></svg>","I'm fine, thank you":"<svg viewBox=\"0 0 40 40\" width=\"30\" height=\"30\" aria-hidden=\"true\"><rect width=\"40\" height=\"40\" rx=\"10\" fill=\"#fff6c9\"/><circle cx=\"20\" cy=\"20\" r=\"13\" fill=\"#ffd84d\" stroke=\"#e0a800\" stroke-width=\"1.6\"/><circle cx=\"15\" cy=\"17\" r=\"1.8\" fill=\"#6b4a00\"/><circle cx=\"25\" cy=\"17\" r=\"1.8\" fill=\"#6b4a00\"/><path d=\"M13 24q7 7 14 0\" stroke=\"#6b4a00\" stroke-width=\"2.2\" fill=\"none\" stroke-linecap=\"round\"/></svg>","And you?":"<svg viewBox=\"0 0 40 40\" width=\"30\" height=\"30\" aria-hidden=\"true\"><rect width=\"40\" height=\"40\" rx=\"10\" fill=\"#e3f4f4\"/><circle cx=\"20\" cy=\"14\" r=\"6\" fill=\"#f4b183\"/><path d=\"M8 34c0-8 5-11 12-11s12 3 12 11z\" fill=\"#2a9d9d\"/></svg>"};
function btn(txt,cls,fn){var b=mk("button",cls||"btn sm");b.innerHTML=String(txt).replace(/^\{(\w+)\}\s*/,function(m,k){return (UI[k]||"")+" ";});b.type="button";if(fn){b.addEventListener("click",fn);}return b;}
function shuf(a){var b=a.slice(),j,t;for(var k=b.length-1;k>0;k--){j=Math.floor(Math.random()*(k+1));t=b[k];b[k]=b[j];b[j]=t;}return b;}
function sleep(ms){return new Promise(function(r){setTimeout(r,ms);});}
function stopSpeech(){try{if(window.speechSynthesis){window.speechSynthesis.cancel();}if(cur){cur.pause();cur=null;}}catch(e){}}
function speak(t){
  try{var s=window.speechSynthesis;if(!s||typeof SpeechSynthesisUtterance==="undefined"){return;}
    s.cancel();var u=new SpeechSynthesisUtterance(t);u.lang="en-GB";u.rate=.85;
    var v=s.getVoices().filter(function(x){return /^en[-_]GB/i.test(x.lang);})[0];if(v){u.voice=v;}
    s.speak(u);}catch(e){}
}
function say(t){
  stopSpeech();
  var used=false;function fb(){if(!used){used=true;speak(t);}}
  try{
    if(typeof window.aid!=="function"||typeof window.A!=="function"){fb();return;}
    var a=new Audio("audio/"+window.aid(window.A(t))+".mp3");cur=a;
    a.addEventListener("error",fb);
    var p=a.play();if(p&&p.catch){p.catch(fb);}
  }catch(e){fb();}
}
function stop(){run++;stopSpeech();}
function plain(t){return t.replace(/\[\[|\]\]/g,"");}
function wc(t){return plain(t).split(/\s+/).length;}
function parts(t){
  var out=[],re=/\[\[(.+?)\]\]/g,i=0,m;
  while((m=re.exec(t))){if(m.index>i){out.push({t:t.slice(i,m.index)});}out.push({t:m[1],p:m[1]});i=re.lastIndex;}
  if(i<t.length){out.push({t:t.slice(i)});}
  return out;
}

/* ---------- 12 cụm từ của Unit 1 ---------- */
var PH={
 "Good morning":["","chào buổi sáng"],
 "Good afternoon":["","chào buổi chiều"],
 "Good evening":["","chào buổi tối"],
 "Good night":["","chúc ngủ ngon"],
 "Goodbye":["","tạm biệt"],
 "See you tomorrow":["","hẹn gặp ngày mai"],
 "See you later":["","hẹn gặp lại sau"],
 "See you soon":["","hẹn sớm gặp lại"],
 "Nice to see you again":["","rất vui được gặp lại"],
 "How are you?":["","bạn khỏe không?"],
 "I'm fine, thank you":["","mình khỏe, cảm ơn"],
 "And you?":["","còn bạn thì sao?"]
};
var KEYS=Object.keys(PH);
var ZONES=["Good morning","Good afternoon","Good evening","Good night"];
function zoneOf(h){return h>=5&&h<12?ZONES[0]:(h>=12&&h<18?ZONES[1]:(h>=18&&h<21?ZONES[2]:ZONES[3]));}
function timeStr(h){return (h%12||12)+":00 "+(h<12?"a.m.":"p.m.");}

var LOOK={
 hoa:{n:"Cô Hoa",hair:"bun",hc:"#5B3A24",top:"#F0A04B",bt:"dress",skin:"b"},
 nam:{n:"Nam",hair:"short",hc:"#2B1B12",top:"#2F6FDE",bot:"#1B2A4A"},
 tom:{n:"Tom",hair:"curly",hc:"#8A4B22",top:"#E0523C",bot:"#1B2A4A",skin:"c"},
 mai:{n:"Mai",hair:"pigtails",hc:"#5B3A24",top:"#F2A0B8",bt:"dress"},
 gran:{n:"Bà",hair:"bun",hc:"#CFCFCF",top:"#7A5BD6",bt:"dress",skin:"b"},
 mum:{n:"Mẹ",hair:"long",hc:"#2B1B12",top:"#4CA76B",bt:"dress"}
};
var PJ={top:"#7A5BD6",bt:"long",bot:"#7A5BD6"};

/* 4 cảnh trong một ngày của Nam. [[...]] đánh dấu cụm từ mới. */
var SC=[
 {tag:"Buổi sáng",h:7,place:"school",
  cast:[{k:"hoa",x:25,s:1.3},{k:"nam",x:185,s:1.3}],
  lines:[
   {who:"hoa",t:"[[Good morning]], Nam. [[Nice to see you again]].",vi:"Chào buổi sáng, Nam. Cô rất vui được gặp lại em."},
   {who:"nam",t:"Good morning, Miss Hoa. Nice to see you, too.",vi:"Chào cô Hoa. Em cũng rất vui được gặp cô."},
   {who:"hoa",t:"[[How are you?]]",vi:"Em khỏe không?"},
   {who:"nam",t:"[[I'm fine, thank you]]. [[And you?]]",vi:"Em khỏe, cảm ơn cô. Còn cô ạ?"}]},
 {tag:"Buổi chiều",h:15,place:"school",
  cast:[{k:"tom",x:5,s:1.12},{k:"nam",x:120,s:1.12},{k:"mai",x:235,s:1.12}],
  lines:[
   {who:"tom",t:"[[Good afternoon]], Nam.",vi:"Chào buổi chiều, Nam."},
   {who:"nam",t:"Good afternoon, Tom.",vi:"Chào buổi chiều, Tom."},
   {who:"tom",t:"[[Goodbye]], Nam. [[See you tomorrow]].",vi:"Tạm biệt Nam. Mai gặp lại nhé."},
   {who:"mai",t:"Bye, Nam. [[See you later]]!",vi:"Tạm biệt Nam. Lát nữa gặp lại nhé!"}]},
 {tag:"Buổi tối",h:19,place:"room",
  cast:[{k:"gran",x:60,s:1.3},{k:"nam",x:270,s:1.3,o:{}}],
  lines:[
   {who:"nam",t:"[[Good evening]], Grandma.",vi:"Con chào bà buổi tối."},
   {who:"gran",t:"Good evening, Nam. Goodbye. [[See you soon]]!",vi:"Chào buổi tối, Nam. Tạm biệt. Sớm gặp lại nhé!"}]},
 {tag:"Đi ngủ",h:21,place:"room",
  cast:[{k:"mum",x:60,s:1.3},{k:"nam",x:270,s:1.3,o:PJ}],
  lines:[
   {who:"mum",t:"[[Good night]], Nam.",vi:"Chúc con ngủ ngon, Nam."},
   {who:"nam",t:"Good night, Mum.",vi:"Chúc mẹ ngủ ngon."}]}
];

/* ---------- vẽ bầu trời, đồng hồ, cảnh ---------- */
function skyAt(h){
  var T={5:["#3B4A7A","#F2A27A"],6:["#6C8FD0","#F8C98B"],7:["#8CC4F2","#FFE9B8"],8:["#7EC0F5","#D8F0FF"],9:["#7EC0F5","#D8F0FF"],10:["#7EC0F5","#D8F0FF"],
    11:["#5FB0F2","#CBE9FF"],12:["#5FB0F2","#CBE9FF"],13:["#5FB0F2","#CBE9FF"],14:["#6DB6F2","#D6EEFF"],15:["#6DB6F2","#D6EEFF"],16:["#6DB6F2","#D6EEFF"],
    17:["#7FA8E0","#FFD9A0"],18:["#5B5FA8","#F29A74"],19:["#2A2F66","#6A4F8C"],20:["#151B45","#2C2F6B"]};
  return T[h]||["#0F1538","#1E2457"];
}
function cel(h){
  var sun=h>=6&&h<18,t=sun?(h-6)/12:((h>=18?h-18:h+6)/12);
  return {sun:sun,x:40+t*400,y:215-Math.sin(Math.PI*t)*150};
}
var STARS_FULL=[[60,40],[130,80],[200,30],[270,70],[340,35],[400,90],[450,40],[160,130],[300,120],[90,120]];
var STARS_REG=[[185,45],[220,80],[255,40],[290,75],[210,55],[300,50]];
function skyBits(h,pos,reg){
  var c=pos||cel(h),s="",i;
  if(h>=19||h<5){(reg?STARS_REG:STARS_FULL).forEach(function(p){s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="2.4" fill="#fff" stroke="none"/>';});}
  if(c.sun){
    s+='<circle cx="'+c.x+'" cy="'+c.y+'" r="36" fill="#FFF3B0" fill-opacity=".45" stroke="none"/><circle cx="'+c.x+'" cy="'+c.y+'" r="24" fill="#F2C14E" stroke="none"/>';
  }else{
    var r=22;
    s+='<path d="M'+c.x+' '+(c.y-r)+' A'+r+' '+r+' 0 0 0 '+c.x+' '+(c.y+r)+' A'+(r*1.3)+' '+(r*1.3)+' 0 0 1 '+c.x+' '+(c.y-r)+'Z" fill="#FFF3C4" stroke="none"/>';
  }
  if(h>=7&&h<=17){
    var cl=reg?[[200,55],[262,72]]:[[110,50],[250,66],[390,36]];
    for(i=0;i<cl.length;i++){s+='<g class="in-cloud" fill="#fff" stroke="none" opacity=".92"><ellipse cx="'+cl[i][0]+'" cy="'+cl[i][1]+'" rx="30" ry="12"/><ellipse cx="'+(cl[i][0]+16)+'" cy="'+(cl[i][1]-8)+'" rx="18" ry="11"/><ellipse cx="'+(cl[i][0]-14)+'" cy="'+(cl[i][1]-5)+'" rx="15" ry="9"/></g>';}
  }
  return s;
}
function clock(cx,cy,r,h,m){
  m=m||0;
  var ha=((h%12)+m/60)*30*Math.PI/180,ma=m*6*Math.PI/180;
  function pt(a,l){return (cx+l*Math.sin(a)).toFixed(1)+" "+(cy-l*Math.cos(a)).toFixed(1);}
  return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#fff"/>'
   +'<path d="M'+cx+' '+(cy-r+2)+' v3 M'+cx+' '+(cy+r-2)+' v-3 M'+(cx-r+2)+' '+cy+' h3 M'+(cx+r-2)+' '+cy+' h-3" fill="none" stroke-width="1.6"/>'
   +'<path d="M'+cx+' '+cy+' L'+pt(ha,r*.55)+'" fill="none" stroke-width="3"/>'
   +'<path d="M'+cx+' '+cy+' L'+pt(ma,r*.8)+'" fill="none" stroke-width="2"/>'
   +'<circle cx="'+cx+'" cy="'+cy+'" r="2" fill="#1B2A4A"/>';
}
function building(place,h,dark){
  var win=dark?"#FFE08A":"#9ED0F5",s="";
  if(place==="school"){
    s+='<rect x="330" y="100" width="140" height="132" fill="#F2D6A0"/><rect x="378" y="52" width="44" height="50" fill="#E8B86D"/><path d="M372 52 L400 30 L428 52Z" fill="#C75A1B"/>';
    s+=clock(400,80,16,h,0);
    s+='<rect x="345" y="130" width="30" height="34" rx="3" fill="'+win+'"/><rect x="425" y="130" width="30" height="34" rx="3" fill="'+win+'"/><rect x="385" y="170" width="30" height="62" rx="3" fill="#A9744A"/>';
  }else{
    s+='<path d="M318 112 L400 48 L482 112Z" fill="#C75A1B"/><rect x="330" y="110" width="140" height="122" fill="#F6C9A0"/>';
    s+=clock(400,90,16,h,0);
    s+='<rect x="345" y="140" width="36" height="36" rx="3" fill="'+win+'"/><rect x="425" y="165" width="32" height="67" rx="3" fill="#A9744A"/>';
  }
  return s;
}
function wrapText(t){
  var w=t.split(" "),L=[],cur="";
  w.forEach(function(x){if((cur+" "+x).trim().length>24&&cur){L.push(cur);cur=x;}else{cur=(cur+" "+x).trim();}});
  if(cur){L.push(cur);}
  return L;
}
function esc(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;");}
function bubble(c,text){
  var P=window.POSE&&window.POSE[c.pose||"stand"],gy=(P&&P.gy)||132,s0=c.s||.95;
  var cx=c.x+50*s0,headTop=262-gy*s0,L=wrapText(text),mx=0;
  L.forEach(function(l){if(l.length>mx){mx=l.length;}});
  var w=Math.min(300,mx*8.6+28),h=L.length*21+16,x=Math.max(6,Math.min(474-w,cx-w/2)),y=Math.max(6,headTop-h-22);
  var tx=Math.max(x+16,Math.min(x+w-16,cx));
  var s='<g class="in-pop"><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="14" fill="#fff" stroke="#1B2A4A" stroke-width="2.5"/>'
   +'<path d="M'+(tx-8)+' '+(y+h-1)+' L'+(tx+2)+' '+(y+h+15)+' L'+(tx+9)+' '+(y+h-1)+'Z" fill="#fff" stroke="#1B2A4A" stroke-width="2.5" stroke-linejoin="round"/>'
   +'<rect x="'+(tx-6)+'" y="'+(y+h-4)+'" width="14" height="6" fill="#fff" stroke="none"/>';
  L.forEach(function(l,i){s+='<text x="'+(x+w/2)+'" y="'+(y+21+i*21)+'" text-anchor="middle" font-size="16" font-weight="700" font-family="Inter,Arial,sans-serif" fill="#1B2A4A" stroke="none">'+esc(l)+'</text>';});
  return s+'</g>';
}
function mouth(c){
  var P=window.POSE&&window.POSE[c.pose||"stand"],gy=(P&&P.gy)||132,s0=c.s||.95;
  return '<ellipse class="in-mouth" cx="'+(c.x+50*s0)+'" cy="'+(262-gy*s0+30*s0)+'" rx="'+(5*s0)+'" ry="'+(4.2*s0)+'" fill="#8A2B2B" stroke="none"/>';
}
function tree(x,y,sc,dark){
  return '<g transform="translate('+x+' '+y+') scale('+sc+')"><rect x="-5" y="-4" width="10" height="40" rx="3" fill="#8A5A36"/><circle cx="0" cy="-14" r="26" fill="'+(dark?"#2F6B49":"#5DBB6F")+'"/><circle cx="-16" cy="2" r="17" fill="'+(dark?"#2F6B49":"#5DBB6F")+'"/><circle cx="16" cy="2" r="17" fill="'+(dark?"#2F6B49":"#5DBB6F")+'"/></g>';
}
function flowers(dark){
  var s="",F=[[20,250,"#F26B8A"],[62,262,"#FFD84D"],[110,252,"#fff"],[300,252,"#F26B8A"],[352,262,"#FFD84D"],[420,250,"#fff"],[455,262,"#F26B8A"]];
  F.forEach(function(f){s+='<path d="M'+f[0]+' '+f[1]+' v12" stroke="#3E8E57" stroke-width="2" fill="none"/><circle cx="'+f[0]+'" cy="'+f[1]+'" r="4.5" fill="'+f[2]+'" stroke="none"/><circle cx="'+f[0]+'" cy="'+f[1]+'" r="1.8" fill="#F2A400" stroke="none"/>';});
  return s;
}
function outdoorDeco(h,dark){
  var s="";
  s+=tree(290,176,1.0,dark)+tree(24,190,.8,dark);
  s+='<path d="M0 238 H300" stroke="#fff" stroke-width="3" fill="none" stroke-opacity=".9"/><path d="M0 228 V246 M30 228 V246 M60 228 V246 M90 228 V246 M120 228 V246 M150 228 V246 M180 228 V246 M210 228 V246 M240 228 V246 M270 228 V246" stroke="#fff" stroke-width="4" fill="none" stroke-opacity=".9"/>';
  s+='<path d="M380 232 Q400 262 360 300 L440 300 Q420 262 420 232Z" fill="#E6CFA0" stroke="none"/>';
  s+=flowers(dark);
  if(!dark){s+='<g class="in-bird"><path d="M30 40 q8 -9 16 0 q8 -9 16 0" fill="none" stroke="#1B2A4A" stroke-width="2.2" stroke-linecap="round"/></g>';}
  return s;
}
/* phòng trong nhà: cửa sổ nhìn ra bầu trời, đèn, ghế sofa hoặc giường */
function room(h,sceneIdx){
  var night=h>=20||h<5,sk=skyAt(h),id="rw"+(++uid),lamp=h>=18||h<6,bed=night,s="";
  s+='<rect width="480" height="232" fill="'+(lamp?"#F3D9B5":"#FBE8C8")+'" stroke="none"/>';
  s+='<rect x="0" y="206" width="480" height="94" fill="#C4905C" stroke="none"/><path d="M0 206 H480" stroke="#8A5A36" stroke-width="3" fill="none"/>';
  s+='<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+sk[0]+'"/><stop offset="1" stop-color="'+sk[1]+'"/></linearGradient></defs>';
  s+='<rect x="322" y="34" width="128" height="116" rx="8" fill="url(#'+id+')" stroke="#8A5A36" stroke-width="7"/>';
  if(night||h>=19){s+='<g class="in-twk"><circle cx="350" cy="62" r="2.2" fill="#fff" stroke="none"/><circle cx="410" cy="56" r="1.8" fill="#fff" stroke="none"/><circle cx="388" cy="84" r="2" fill="#fff" stroke="none"/></g><path d="M424 56 A16 16 0 1 0 424 90 A12 12 0 0 1 424 56Z" fill="#FFF3C4" stroke="none"/>';}
  else{s+='<circle cx="428" cy="62" r="14" fill="#F2C14E" stroke="none"/>';}
  s+='<path d="M386 34 V150 M322 92 H450" stroke="#8A5A36" stroke-width="5" fill="none"/>';
  s+='<path d="M310 28 Q330 90 316 156 L336 156 Q346 90 334 28Z" fill="#E86B6B" stroke="none"/><path d="M462 28 Q442 90 456 156 L436 156 Q426 90 438 28Z" fill="#E86B6B" stroke="none"/>';
  s+='<rect x="26" y="40" width="64" height="48" rx="4" fill="#fff" stroke="#8A5A36" stroke-width="5"/><path d="M34 78 L50 58 L62 70 L72 60 L84 78Z" fill="#7FC58B" stroke="none"/><circle cx="72" cy="50" r="5" fill="#F2C14E" stroke="none"/>';
  s+=clock(250,66,22,h,0);
  if(bed){
    s+='<rect x="190" y="186" width="190" height="62" rx="10" fill="#7A5BD6"/><rect x="190" y="168" width="190" height="26" rx="10" fill="#9A7EE8"/><rect x="196" y="156" width="52" height="24" rx="10" fill="#fff"/>';
  }else{
    s+='<rect x="170" y="176" width="210" height="72" rx="14" fill="#6AA5E8"/><rect x="170" y="154" width="210" height="36" rx="14" fill="#8CBBF0"/><rect x="186" y="170" width="42" height="30" rx="9" fill="#FFD84D"/>';
  }
  s+='<rect x="414" y="168" width="8" height="80" fill="#8A5A36" stroke="none"/><path d="M400 168 L416 140 L440 168Z" fill="'+(lamp?"#FFE08A":"#E8D7A8")+'"/>';
  if(lamp){s+='<ellipse cx="418" cy="170" rx="46" ry="30" fill="#FFE08A" fill-opacity=".28" stroke="none"/>';}
  s+='<ellipse cx="240" cy="274" rx="120" ry="16" fill="#E86B6B" fill-opacity=".75" stroke="none"/>';
  return s;
}
function drawScene(o){
  var h=o.h,id="ig"+(++uid),sk=skyAt(h),dark=(h>=18||h<6),s="",place=o.place||(dark?"home":"school");
  if(place==="room"){s+=room(h);}
  else{
    s+='<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+sk[0]+'"/><stop offset="1" stop-color="'+sk[1]+'"/></linearGradient></defs>';
    s+='<rect width="480" height="300" fill="url(#'+id+')" stroke="none"/>';
    s+=skyBits(h);
    s+='<rect y="232" width="480" height="68" fill="'+(dark?"#4C8B63":"#8FD19E")+'" stroke="none"/>';
    s+=building(place,h,dark);
    if(o.deco!==false){s+=outdoorDeco(h,dark);}
  }
  var said="";
  (o.cast||[]).forEach(function(c){
    var opt={x:c.x,ground:262,s:c.s||.95,pose:c.pose||"stand"},L=LOOK[c.k],k;
    for(k in L){opt[k]=L[k];}
    if(c.o){for(k in c.o){opt[k]=c.o[k];}}
    var talk=o.speaker===c.k,g="";
    if(typeof window.kid==="function"){g+=window.kid(opt);}
    if(talk){g+=mouth(opt);said=bubble(opt,o.say||"");}
    s+=talk?'<g class="in-talk">'+g+'</g>':g;
  });
  if(o.speaker&&o.say){s+=said;}
  return window.sceneWrap(480,300,s,o.label||"Cảnh trong ngày của Nam");
}
/* tranh đường phố cho trò tìm điểm khác nhau: A là buổi sáng, B là buổi tối */
function street(night){
  var h=night?20:7,id="ig"+(++uid),sk=skyAt(h),s="";
  s+='<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+sk[0]+'"/><stop offset="1" stop-color="'+sk[1]+'"/></linearGradient></defs>';
  s+='<rect width="480" height="300" fill="url(#'+id+')" stroke="none"/>';
  s+=skyBits(h,{sun:!night,x:70,y:75},true);
  s+='<rect y="232" width="480" height="68" fill="#8FD19E" stroke="none"/>';
  s+='<path d="M108 132 L175 80 L242 132Z" fill="#C75A1B"/><rect x="120" y="130" width="110" height="102" fill="#F6C9A0"/>';
  s+=clock(175,108,14,h,0);
  s+='<rect x="135" y="158" width="34" height="34" rx="3" fill="'+(night?"#FFE08A":"#9ED0F5")+'"/><rect x="190" y="175" width="28" height="57" rx="3" fill="#A9744A"/>';
  s+='<path d="M285 232 V132" fill="none" stroke-width="5"/>';
  if(night){s+='<circle cx="285" cy="124" r="42" fill="#FFE08A" fill-opacity=".38" stroke="none"/>';}
  s+='<rect x="270" y="116" width="30" height="14" rx="5" fill="'+(night?"#FFE08A":"#CFCFCF")+'"/>';
  var o={x:340,ground:262,s:.9,pose:"stand"},k,L=LOOK.nam;
  for(k in L){o[k]=L[k];}
  if(night){for(k in PJ){o[k]=PJ[k];}}else{o.top="#FFFFFF";o.item={n:"bag",x:62,y:38,s:34,c:"red"};}
  if(typeof window.kid==="function"){s+=window.kid(o);}
  return window.sceneWrap(480,300,s,night?"Tranh B: đường phố buổi tối":"Tranh A: đường phố buổi sáng");
}

/* ---------- khung chính ---------- */
function build(main){
  var grid=main.querySelector(".vgrid"),anchor=grid&&grid.closest("section.blk");
  if(!anchor||anchor.parentNode!==main){return;}
  anchor.classList.add("in-hide");
  var disc={};
  var card=mk("section","blk in-card"),h3=mk("h3",null,"Khám phá lời chào"),
      intro=mk("p","muted","Em xem Nam và các bạn trong một ngày, rồi tự khám phá 12 cụm từ nhé. Cụm từ em tìm được sẽ vào Sổ cụm từ."),
      tabs=mk("div","in-tabs"),panel=mk("div","in-panel"),
      cnt=mk("b",null,""),book=mk("div","in-book");
  function renderBook(){
    var n=0;book.innerHTML="";
    KEYS.forEach(function(k){
      var f=disc[k];if(f){n++;}
      var b=mk("button","in-chip"+(f?" on":""),"");b.innerHTML=f?(IC[k]||"")+"<span>"+k+"</span>":"?";b.type="button";b.disabled=!f;
      if(f){b.addEventListener("click",function(){say(k);});}
      book.appendChild(b);
    });
    cnt.textContent="Sổ cụm từ: "+n+"/"+KEYS.length+(n===KEYS.length?" ":"");
  }
  function learn(k){if(PH[k]&&!disc[k]){disc[k]=1;renderBook();}}
  function phraseCard(el,k){
    el.innerHTML="";
    var ic=mk("span","in-ic");ic.innerHTML=IC[k]||"";var d=mk("div"),b=mk("b",null,k),vi=mk("div","in-vi",PH[k][1]);
    d.appendChild(b);d.appendChild(vi);el.appendChild(ic);el.appendChild(d);
    el.appendChild(btn("{spk}","btn ghost sm",function(){say(k);}));
  }

  /* ---- 1. hoạt hình ---- */
  function tabStory(p){
    var d1=false,tag=mk("div","in-tag","Lần 1: em chỉ xem và nghe. Lần 2: em bấm vào từng cụm từ màu xanh."),
        box=mk("div","scenebox"),cap=mk("div","in-cap"),pc=mk("div","in-pc"),dots=mk("div","in-dots"),ctl=mk("div","actions"),
        b1=btn("{play} Xem lần 1","btn"),b2=btn("Xem lần 2: bấm vào cụm từ","btn ghost"),bs=btn("{stop} Dừng","btn ghost sm");
    b2.disabled=true;b2.title="Em xem xong lần 1 trước nhé";bs.hidden=true;
    SC.forEach(function(){dots.appendChild(mk("i"));});
    function scene(i,j){
      box.innerHTML=drawScene({h:SC[i].h,place:SC[i].place,cast:SC[i].cast,speaker:j>=0?SC[i].lines[j].who:null,say:j>=0?plain(SC[i].lines[j].t):"",label:SC[i].tag});
      [].forEach.call(dots.children,function(d,k){d.className=(k===i)?"on":"";});
    }
    scene(0,-1);
    cap.textContent="Bấm “Xem lần 1” để bắt đầu.";
    pc.textContent="Cụm từ em bấm ở lần 2 sẽ hiện ở đây.";
    function busy(f){b1.disabled=f;b2.disabled=f||!d1;bs.hidden=!f;}
    function line1(ln){
      cap.innerHTML="";
      cap.appendChild(mk("div","in-who",LOOK[ln.who].n+":"));
      cap.appendChild(mk("div","in-en",plain(ln.t)));
    }
    function line2(ln,last,tok){
      return new Promise(function(res){
        cap.innerHTML="";
        var who=mk("div","in-who",LOOK[ln.who].n+":"),en=mk("div","in-en"),vi=mk("div","in-vi",ln.vi),row=mk("div","actions"),
            need=0,got=0,nb=btn(last?"Xong ":"Tiếp →","btn sm");
        parts(ln.t).forEach(function(x){if(x.p){need++;}});
        vi.hidden=need>0;nb.disabled=need>0;
        parts(ln.t).forEach(function(x){
          if(!x.p){en.appendChild(document.createTextNode(x.t));return;}
          var b=mk("button","in-ph",x.t);b.type="button";
          b.addEventListener("click",function(){
            say(x.p);learn(x.p);phraseCard(pc,x.p);
            if(!b.classList.contains("got")){b.classList.add("got");got++;}
            if(got>=need){nb.disabled=false;vi.hidden=false;}
          });
          en.appendChild(b);
        });
        row.appendChild(btn("{spk} Nghe lại","btn ghost sm",function(){say(plain(ln.t));}));
        row.appendChild(nb);
        nb.addEventListener("click",function(){res(tok===run);});
        cap.appendChild(who);cap.appendChild(en);cap.appendChild(vi);cap.appendChild(row);
        if(need>0){cap.appendChild(mk("div","in-vi","Bấm vào các cụm từ màu xanh để nghe và xem nghĩa."));}
      });
    }
    async function play(pass){
      var tok=++run,i,j;
      busy(true);
      for(i=0;i<SC.length;i++){
        scene(i,-1);tag.textContent=SC[i].tag+" · "+timeStr(SC[i].h);
        await sleep(pass===1?1000:500);if(tok!==run){return;}
        for(j=0;j<SC[i].lines.length;j++){
          var ln=SC[i].lines[j];
          scene(i,j);
          if(pass===1){
            line1(ln);say(plain(ln.t));
            await sleep(Math.max(1700,wc(ln.t)*430+800));if(tok!==run){return;}
          }else{
            say(plain(ln.t));
            var last=(i===SC.length-1&&j===SC[i].lines.length-1);
            var ok=await line2(ln,last,tok);if(!ok){return;}
          }
        }
      }
      scene(0,-1);
      if(pass===1){
        d1=true;busy(false);b2.disabled=false;
        cap.textContent="Em xem xong lần 1 rồi! Bây giờ bấm “Xem lần 2” và tự bấm vào từng cụm từ nhé.";
        tag.textContent="Lần 2: bấm vào cụm từ màu xanh để nghe và xem nghĩa.";
      }else{
        busy(false);
        var n=KEYS.filter(function(k){return disc[k];}).length;
        cap.textContent="Giỏi lắm! Em đã khám phá "+n+"/"+KEYS.length+" cụm từ. Em thử hai trò chơi tiếp theo nhé.";
      }
    }
    b1.addEventListener("click",function(){play(1);});
    b2.addEventListener("click",function(){play(2);});
    bs.addEventListener("click",function(){stop();busy(false);cap.textContent="Em đã dừng. Bấm lại để xem tiếp.";});
    ctl.appendChild(b1);ctl.appendChild(b2);ctl.appendChild(bs);
    p.appendChild(tag);p.appendChild(box);p.appendChild(dots);p.appendChild(cap);p.appendChild(pc);p.appendChild(ctl);
  }

  /* ---- 2. mặt trời và đồng hồ ---- */
  function tabSun(p){
    var h=7,mode="explore",qs=[],qi=0,first=0,tried=false,okNow=false;
    var box=mk("div","scenebox"),time=mk("div","in-time"),sl=document.createElement("input"),info=mk("div","in-cap"),ctl=mk("div","actions");
    sl.type="range";sl.min=5;sl.max=23;sl.step=1;sl.value=h;sl.className="in-slider";sl.setAttribute("aria-label","Giờ trong ngày");
    function draw(){
      var dark=h>=18||h<6;
      box.innerHTML=drawScene({h:h,cast:[{k:"nam",x:150,s:1,pose:"wave",o:dark?PJ:{}}],label:"Nam lúc "+timeStr(h)});
      time.textContent=""+timeStr(h);
    }
    function explore(){
      mode="explore";ctl.innerHTML="";info.innerHTML="";
      var z=zoneOf(h);
      info.appendChild(mk("div","in-vi","Kéo thanh bên dưới và nhìn mặt trời, mặt trăng, đồng hồ. Nam sẽ nói gì?"));
      var row=mk("div","actions"),pill=mk("span","in-pill",z);
      row.appendChild(pill);row.appendChild(btn("{spk}","btn ghost sm",function(){say(z);}));
      info.appendChild(row);
      if(z==="Good night"){info.appendChild(mk("div","in-vi","Good night dùng khi chúc ngủ ngon hoặc đi ngủ, không dùng để chào khi mới gặp."));}
      ctl.appendChild(btn("Thử thách 5 câu","btn",startQuiz));
    }
    function pick(z){
      var ok=[];for(var x=5;x<=23;x++){if(zoneOf(x)!==z){ok.push(x);}}
      return ok[Math.floor(Math.random()*ok.length)];
    }
    function startQuiz(){
      mode="quiz";qs=shuf(ZONES).concat([ZONES[Math.floor(Math.random()*4)]]);qi=0;first=0;nextQ();
    }
    function nextQ(){
      var t=qs[qi];tried=false;okNow=false;
      h=pick(t);sl.value=h;draw();
      info.innerHTML="";ctl.innerHTML="";
      var row=mk("div","actions");
      row.appendChild(mk("b",null,"Câu "+(qi+1)+"/"+qs.length+": Nam nói “"+t+"”."));
      row.appendChild(btn("{spk}","btn ghost sm",function(){say(t);}));
      info.appendChild(row);
      info.appendChild(mk("div","in-vi","Kéo thanh để chọn giờ đúng, rồi bấm Kiểm tra."));
      var fb=mk("div","in-fb");info.appendChild(fb);
      var chk=btn("Kiểm tra","btn",function(){
        if(okNow){return;}
        if(zoneOf(h)===t){
          okNow=true;if(!tried){first++;}learn(t);say(t);
          fb.className="in-fb ok";fb.textContent="Đúng rồi! "+timeStr(h)+" là lúc Nam nói “"+t+"”.";
          chk.hidden=true;
          ctl.appendChild(btn(qi<qs.length-1?"Câu tiếp →":"Xem kết quả","btn",function(){
            qi++;if(qi<qs.length){nextQ();}else{finish();}
          }));
        }else{
          tried=true;fb.className="in-fb bad";fb.textContent="Chưa đúng. Em nhìn mặt trời, mặt trăng và đồng hồ rồi thử lại nhé.";
        }
      });
      ctl.appendChild(chk);
    }
    function finish(){
      info.innerHTML="";ctl.innerHTML="";
      info.appendChild(mk("b",null,"Giỏi lắm! Em đúng "+first+"/"+qs.length+" câu ngay từ lần đầu."));
      ctl.appendChild(btn("Chơi lại","btn ghost sm",startQuiz));
      ctl.appendChild(btn("Quay lại khám phá","btn ghost sm",function(){h=7;sl.value=h;draw();explore();}));
    }
    sl.addEventListener("input",function(){h=+sl.value;draw();if(mode==="explore"){explore();}});
    sl.addEventListener("change",function(){if(mode==="explore"){var z=zoneOf(h);learn(z);say(z);}});
    draw();explore();
    p.appendChild(box);p.appendChild(time);p.appendChild(sl);p.appendChild(info);p.appendChild(ctl);
  }

  /* ---- 3. tìm điểm khác nhau ---- */
  var DIFFS=[
   {r:[0,0,480,26],say:"Good morning. Good evening.",learn:["Good morning","Good evening"],t:"Bầu trời: sáng ở tranh A (Good morning), tối ở tranh B (Good evening)."},
   {r:[38,38,64,64],t:"Mặt trời ở tranh A, mặt trăng ở tranh B."},
   {r:[170,30,140,70],t:"Ban ngày có mây, ban đêm có sao."},
   {r:[158,92,34,34],t:"Đồng hồ: 7 giờ sáng (7:00 a.m.) và 8 giờ tối (8:00 p.m.)."},
   {r:[130,153,44,44],t:"Buổi tối trong nhà bật đèn nên cửa sổ sáng."},
   {r:[252,96,66,66],t:"Đèn đường chỉ sáng khi trời tối."},
   {r:[335,140,100,125],t:"Nam đi học buổi sáng (có cặp), buổi tối Nam mặc đồ ngủ."}
  ];
  function tabDiff(p){
    var found=[],NS="http://www.w3.org/2000/svg",svgs=[];
    var head=mk("div","in-cap"),msg=mk("b",null,""),list=mk("ul","in-found"),pair=mk("div","in-pair"),ctl=mk("div","actions");
    head.appendChild(mk("div","in-vi","Hai bức tranh cùng một nơi: một buổi sáng, một buổi tối. Em bấm vào chỗ khác nhau nhé."));
    head.appendChild(msg);
    function upd(){
      var n=found.filter(Boolean).length;
      msg.textContent="Em đã tìm được "+n+"/"+DIFFS.length+" điểm khác nhau"+(n===DIFFS.length?" ":"");
      if(n===DIFFS.length){
        list.appendChild(mk("li",null,"Tranh A là buổi sáng: Good morning. Tranh B là buổi tối: Good evening."));
        learn("Good morning");learn("Good evening");
      }
    }
    function addRect(g,r,cls){
      var e=document.createElementNS(NS,"rect");
      e.setAttribute("x",r[0]);e.setAttribute("y",r[1]);e.setAttribute("width",r[2]);e.setAttribute("height",r[3]);e.setAttribute("rx",8);
      if(cls){e.setAttribute("class",cls);}
      g.appendChild(e);return e;
    }
    function make(night,label){
      var w=mk("div","in-pic"),b=mk("b",null,label),bx=mk("div","scenebox");
      bx.innerHTML=street(night);
      var svg=bx.querySelector("svg"),g=document.createElementNS(NS,"g"),rings=document.createElementNS(NS,"g");
      g.setAttribute("class","in-hs");
      DIFFS.forEach(function(d,i){
        var e=addRect(g,d.r);e.setAttribute("data-i",i);e.setAttribute("tabindex","0");e.setAttribute("role","button");e.setAttribute("aria-label","Điểm khác nhau");
      });
      svg.appendChild(g);svg.appendChild(rings);
      svgs.push({g:g,rings:rings});
      function act(e){
        var t=e.target.closest&&e.target.closest("rect");if(!t||t.getAttribute("data-i")==null){return;}
        pick(+t.getAttribute("data-i"));
      }
      g.addEventListener("click",act);
      g.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();act(e);}});
      w.appendChild(b);w.appendChild(bx);
      return w;
    }
    function pick(i){
      if(found[i]){return;}
      found[i]=true;
      svgs.forEach(function(s){addRect(s.rings,DIFFS[i].r,"in-ring");});
      list.appendChild(mk("li",null,""+DIFFS[i].t));
      if(DIFFS[i].say){say(DIFFS[i].say);}
      (DIFFS[i].learn||[]).forEach(learn);
      upd();
    }
    pair.appendChild(make(false,"Tranh A"));pair.appendChild(make(true,"Tranh B"));
    ctl.appendChild(btn("Gợi ý","btn ghost sm",function(){
      var i=0;while(i<DIFFS.length&&found[i]){i++;}
      if(i>=DIFFS.length){return;}
      var fl=[];
      svgs.forEach(function(s){fl.push(addRect(s.rings,DIFFS[i].r,"in-flash"));});
      setTimeout(function(){fl.forEach(function(e){if(e.parentNode){e.parentNode.removeChild(e);}});},1600);
    }));
    upd();
    p.appendChild(head);p.appendChild(pair);p.appendChild(ctl);p.appendChild(list);
  }

  /* ---- ghép lại ---- */
  var TABS=[["Xem hoạt hình",tabStory],["Mặt trời và đồng hồ",tabSun],["Tìm điểm khác nhau",tabDiff]],tbs=[];
  function show(i){
    stop();panel.innerHTML="";
    tbs.forEach(function(t,k){t.setAttribute("aria-selected",k===i?"true":"false");});
    TABS[i][1](panel);
  }
  TABS.forEach(function(t,i){
    var b=mk("button","in-tab",t[0]);b.type="button";b.setAttribute("role","tab");
    b.addEventListener("click",function(){show(i);});
    tbs.push(b);tabs.appendChild(b);
  });
  tabs.setAttribute("role","tablist");
  card.appendChild(h3);card.appendChild(intro);card.appendChild(tabs);card.appendChild(panel);
  card.appendChild(cnt);card.appendChild(book);
  main.insertBefore(card,anchor);
  renderBook();show(0);
}

/* ---------- chạy khi trang vẽ Ngày 1 của tuần 2 ---------- */
function isTeacher(){
  var b=document.querySelector('.seg button[data-mode="t"]');
  return !!(b&&b.getAttribute("aria-pressed")==="true");
}
function enhance(){
  var main=document.querySelector("main.stack");
  if(!main||main.getAttribute("data-intro")||!main.querySelector(".sechead")||isTeacher()){return;}
  if(location.hash!=="#w2-d1"){return;}
  if(typeof window.kid!=="function"||typeof window.sceneWrap!=="function"){return;}
  main.setAttribute("data-intro","1");
  build(main);
}
var app=document.getElementById("app"),timer=null;
if(app){new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(enhance,80);}).observe(app,{childList:true,subtree:true});}
window.addEventListener("hashchange",function(){stop();});
enhance();
})();
