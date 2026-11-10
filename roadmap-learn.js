(function(){
"use strict";
if(window.__lk){return;}window.__lk=1;

var CSS=[
".lk-hide{display:none!important}",
".lk-card{border-left:5px solid var(--lvl,#C75A1B)}",
".lk-card mark,.lk-cap mark{background:var(--note-bg,#FCEFD3);color:var(--note,#8A4F00);border-radius:4px;padding:0 4px;font-weight:700}",
".lk-ex{display:grid;gap:8px}",
".lk-exb{display:flex;gap:10px;align-items:center;text-align:left;padding:10px 12px;border:2px solid var(--line);border-radius:12px;background:var(--bg);font-size:1.05rem;font-weight:700;color:var(--ink)}",
".lk-exb:hover{border-color:var(--accent)}",
".lk-q{display:grid;gap:10px}",
".lk-os{display:flex;flex-wrap:wrap;gap:8px}",
".lk-o{padding:9px 16px;border-radius:12px;border:2px solid var(--accent);background:var(--accent-soft);color:var(--accent);font-weight:700}",
".lk-o.ok{border-color:var(--good);background:var(--good-bg);color:var(--good)}",
".lk-o.bad{border-color:var(--bad);background:var(--bad-bg);color:var(--bad);opacity:.8}",
".lk-fb{font-weight:700}.lk-fb:empty{display:none}.lk-fb.ok{color:var(--good)}.lk-fb.bad{color:var(--bad)}",
".lk-cap{display:grid;gap:6px;padding:10px 14px;border-radius:10px;background:var(--accent-soft)}",
".lk-line{font-weight:700;font-size:1.1rem;min-height:1.4em}",
".lk-hs rect{fill:transparent;stroke:none;cursor:pointer;outline:none}",
".lk-hs rect:hover,.lk-hs rect:focus-visible,.lk-hs rect.on{fill:rgba(47,111,222,.2);stroke:#2F6FDE;stroke-width:2.5;stroke-dasharray:6 4}",
".lk-hs rect.seen:not(.on){fill:rgba(76,167,107,.12)}",
".lk-dot{fill:#2F6FDE;stroke:#fff;stroke-width:2;pointer-events:none}",
"@media (prefers-reduced-motion:no-preference){.lk-dot{animation:lkp 1.4s infinite}@keyframes lkp{50%{opacity:.3}}}",
".lk-ans{min-height:58px;display:flex;flex-wrap:wrap;gap:8px;padding:10px;border:2px dashed var(--line);border-radius:12px;background:var(--bg)}",
".lk-ans:empty::before{content:'Bấm các từ bên dưới theo đúng thứ tự...';color:var(--muted)}",
".lk-ans.ok{border:2px solid var(--good);background:var(--good-bg)}",
".lk-ans.bad{border:2px solid var(--bad);background:var(--bad-bg)}",
".lk-bank{display:flex;flex-wrap:wrap;gap:8px}",
".lk-w{padding:8px 14px;border-radius:10px;border:2px solid var(--accent);background:var(--accent-soft);color:var(--accent);font-weight:700;font-size:1.05rem}",
".lk-w.in{background:var(--surface);color:var(--ink);border-color:var(--line)}",
".lk-w:disabled{cursor:default;opacity:.8}"
].join("");
var stl=document.createElement("style");stl.textContent=CSS;document.head.appendChild(stl);

/* ---------- âm thanh: dùng file mp3 của trang nếu có, không thì dùng giọng máy ---------- */
var cur=null;
function speak(t){
  try{var s=window.speechSynthesis;if(!s||typeof SpeechSynthesisUtterance==="undefined"){return}
    s.cancel();var u=new SpeechSynthesisUtterance(t);u.lang="en-GB";u.rate=.85;
    var v=s.getVoices().filter(function(x){return /^en[-_]GB/i.test(x.lang)})[0];if(v){u.voice=v}
    s.speak(u);}catch(e){}
}
function say(t){
  try{if(window.speechSynthesis){window.speechSynthesis.cancel()}if(cur){cur.pause();cur=null}}catch(e){}
  var used=false;function fb(){if(!used){used=true;speak(t)}}
  try{
    if(typeof window.aid!=="function"||typeof window.A!=="function"){fb();return}
    var a=new Audio("audio/"+window.aid(window.A(t))+".mp3");cur=a;
    a.addEventListener("error",fb);
    var p=a.play();if(p&&p.catch){p.catch(fb)}
  }catch(e){fb()}
}
function mk(tag,cls,txt){var e=document.createElement(tag);if(cls){e.className=cls}if(txt!=null){e.textContent=txt}return e}
function strip(h){return String(h).replace(/<[^>]+>/g,"")}

/* ---------- 1. KHÁM PHÁ QUY TẮC ---------- */
var DISC={
"Thì hiện tại đơn: thêm -s với he, she, it":{
  h:"Khi nào động từ thêm -s?",
  ex:[["I get up at six."],["We get up at six thirty."],["She get<mark>s</mark> up at seven."],["He play<mark>s</mark> badminton."],["They go to school."]],
  q:"Em nhìn các câu trên. Động từ có thêm -s khi chủ ngữ là ai?",
  o:["I, we, they","He, she, hoặc một người, một vật (it)","Chỉ khi nói về hôm qua"],a:1},
"Từ chỉ mức độ thường xuyên":{
  h:"always, usually, never đứng ở đâu?",
  ex:[["I <mark>always</mark> brush my teeth."],["She <mark>usually</mark> has noodles."],["He <mark>sometimes</mark> reads a comic."],["We <mark>often</mark> play badminton."]],
  q:"Với động từ thường (brush, has, reads, play), từ chỉ mức độ đứng ở đâu?",
  o:["Trước động từ","Sau động từ","Cuối câu"],a:0},
"Mẫu câu chào hỏi":{
  h:"Chào theo buổi trong ngày",
  ex:[["🌅 7:00 sáng → <mark>Good morning</mark>, Miss Hoa.","Good morning, Miss Hoa."],["☀️ 2:00 chiều → <mark>Good afternoon</mark>, class.","Good afternoon, class."],["🌆 8:00 tối → <mark>Good evening</mark>, Mum.","Good evening, Mum."]],
  q:"Lúc 10 giờ sáng, em chào cô giáo thế nào?",
  o:["Good morning","Good afternoon","Good evening"],a:0},
"Mẫu câu về quê hương và quốc tịch":{
  h:"from đi với từ nào?",
  ex:[["I'm from <mark>Japan</mark>. (nước)","I'm from Japan."],["I'm <mark>Japanese</mark>. (quốc tịch)","I'm Japanese."],["I'm from <mark>Viet Nam</mark>. (nước)","I'm from Viet Nam."],["I'm <mark>Vietnamese</mark>. (quốc tịch)","I'm Vietnamese."]],
  q:"Sau \"I'm from\", em dùng từ nào?",
  o:["Tên nước (Japan, Viet Nam)","Quốc tịch (Japanese, Vietnamese)"],a:0},
"Hai mẫu câu của Unit 3":{
  h:"Giới từ đi với thứ trong tuần",
  ex:[["I study at school <mark>on</mark> Mondays."],["I do housework <mark>on</mark> Saturdays."],["I listen to music <mark>on</mark> Sundays."]],
  q:"Trước thứ trong tuần, em dùng giới từ nào?",
  o:["in","on","at"],a:1},
"Mẫu câu của Unit 4":{
  h:"in, on, at",
  ex:[["My birthday is <mark>in</mark> May."],["The party is <mark>on</mark> Saturday."],["It starts <mark>at</mark> six o'clock."]],
  q:"Trước tháng (May), em dùng giới từ nào?",
  o:["at","on","in"],a:2},
"Mẫu câu mô tả con vật":{
  h:"can và can't",
  ex:[["A kangaroo <mark>can jump</mark>."],["A penguin <mark>can't fly</mark>."],["A parrot <mark>can talk</mark>."],["A giraffe is <mark>taller than</mark> a tiger."]],
  q:"Sau can, động từ ở dạng nào?",
  o:["Nguyên mẫu, không thêm -s (can jump)","Thêm -s (can jumps)","Thêm -ing (can jumping)"],a:0}
};

function discover(main){
  [].forEach.call(main.children,function(sec){
    if(sec.tagName!=="SECTION"||!sec.classList.contains("blk")){return}
    var h=sec.querySelector("h3"),d=h&&DISC[h.textContent.trim()];
    if(!d||!sec.querySelector(".tblwrap")){return}
    var sp=d.ex.map(function(e){return e[1]||strip(e[0])});
    var c=mk("section","blk lk-card");
    var html='<h3>🔎 Khám phá: '+d.h+'</h3><p class="muted">Bấm từng câu để nghe. Nhìn phần tô màu rồi trả lời. Bảng quy tắc sẽ hiện ra sau khi em trả lời.</p><div class="lk-ex">';
    d.ex.forEach(function(e,i){html+='<button type="button" class="lk-exb" data-i="'+i+'"><span aria-hidden="true">🔊</span><span>'+e[0]+'</span></button>'});
    html+='</div><div class="lk-q"><b>'+d.q+'</b><div class="lk-os">';
    d.o.forEach(function(o,i){html+='<button type="button" class="lk-o" data-i="'+i+'">'+o+'</button>'});
    html+='</div><div class="lk-fb" aria-live="polite"></div></div><div class="actions"><button type="button" class="btn ghost sm lk-skip">Bỏ qua, cho em xem quy tắc</button></div>';
    c.innerHTML=html;
    sec.classList.add("lk-hide");
    main.insertBefore(c,sec);
    var fb=c.querySelector(".lk-fb"),skip=c.querySelector(".lk-skip");
    function reveal(){
      sec.classList.remove("lk-hide");skip.hidden=true;
      [].forEach.call(c.querySelectorAll(".lk-o"),function(b){b.disabled=true});
    }
    c.addEventListener("click",function(e){
      var t=e.target.closest("button");if(!t){return}
      if(t.classList.contains("lk-exb")){say(sp[+t.getAttribute("data-i")]);return}
      if(t.classList.contains("lk-skip")){reveal();return}
      if(t.classList.contains("lk-o")){
        if(+t.getAttribute("data-i")===d.a){
          t.classList.add("ok");fb.className="lk-fb ok";fb.textContent="Đúng rồi! Em vừa tự tìm ra quy tắc. Bảng quy tắc ở ngay bên dưới.";
          reveal();
          try{sec.scrollIntoView({behavior:"smooth",block:"nearest"})}catch(x){}
        }else{
          t.classList.add("bad");t.disabled=true;fb.className="lk-fb bad";fb.textContent="Chưa đúng, em nhìn lại phần tô màu nhé.";
        }
      }
    });
  });
}

/* ---------- 2. TRANH CÓ ĐIỂM CHẠM ---------- */
/* mỗi điểm: [x, y, rộng, cao, câu nói] trong khung tranh 480x300 */
var HOT={
"Lớp học":[
 [130,36,220,96,"The board is green."],
 [28,28,72,76,"The window is on the left."],
 [379,25,42,42,"The clock is on the wall."],
 [18,146,80,72,"The girl with pigtails is reading a book."],
 [96,146,76,72,"The boy is writing with a pencil."],
 [308,146,70,72,"The girl with long hair is putting up her hand."],
 [386,146,76,72,"Jack is drawing and he is wearing glasses."],
 [205,136,72,130,"Lucy is standing in front of the board."],
 [112,242,30,38,"The red bag is under the table."]],
"Sở thú":[
 [366,30,98,110,"The tree is green and tall."],
 [30,158,92,82,"The elephant is big and grey."],
 [188,126,92,104,"The giraffe is very tall."],
 [346,222,58,46,"The monkey is under the tree."],
 [394,64,52,46,"The parrot is in the tree."],
 [116,250,52,44,"The penguin is on the grass."],
 [236,252,60,42,"The crocodile is on the grass."]],
"Tiệc sinh nhật":[
 [334,76,82,94,"There are three balloons: red, blue and yellow."],
 [130,140,58,72,"Kim is standing behind the table and waving."],
 [212,140,56,64,"There is a big cake with three candles."],
 [28,122,62,142,"Leo is jumping and he is wearing a party hat."],
 [304,150,62,116,"Ben is waving."],
 [396,156,66,112,"Zoe is holding a red present."],
 [172,244,44,46,"The dog is under the table."]],
"Bãi biển":[
 [410,14,52,52,"The sun is yellow."],
 [288,84,60,50,"The boat is on the sea."],
 [330,90,140,62,"The umbrella is red and white."],
 [22,112,62,96,"The boy with glasses is waving at the boat."],
 [78,142,80,124,"The boy is kicking the ball."],
 [148,202,30,30,"The ball is red."],
 [186,190,100,92,"The girl is sitting on the sand."],
 [262,212,48,52,"There is a sandcastle with a red flag."],
 [336,148,64,116,"The girl is eating an ice cream."],
 [412,232,46,48,"The dog is under the umbrella."]]
};

function hotspots(svg){
  var lab=svg.getAttribute("aria-label")||"",list=null;
  for(var k in HOT){if(lab.indexOf(k)===0){list=HOT[k]}}
  if(!list||svg.getAttribute("viewBox")!=="0 0 480 300"){return}
  var box=svg.closest(".scenebox");if(!box){return}
  var ns="http://www.w3.org/2000/svg",g=document.createElementNS(ns,"g");g.setAttribute("class","lk-hs");
  var dots=[],seen={},count=0;
  list.forEach(function(h,i){
    var r=document.createElementNS(ns,"rect");
    r.setAttribute("x",h[0]);r.setAttribute("y",h[1]);r.setAttribute("width",h[2]);r.setAttribute("height",h[3]);r.setAttribute("rx",10);
    r.setAttribute("data-i",i);r.setAttribute("tabindex","0");r.setAttribute("role","button");r.setAttribute("aria-label",h[4]);
    g.appendChild(r);
  });
  list.forEach(function(h){
    var d=document.createElementNS(ns,"circle");
    d.setAttribute("cx",h[0]+h[2]/2);d.setAttribute("cy",h[1]+Math.min(h[3]/2,30));d.setAttribute("r",7);d.setAttribute("class","lk-dot");
    g.appendChild(d);dots.push(d);
  });
  svg.appendChild(g);
  var cap=mk("div","lk-cap"),n=mk("b","lk-n"),line=mk("div","lk-line");
  line.setAttribute("aria-live","polite");
  cap.appendChild(mk("span",null,"👆 Bấm vào bạn nhỏ, con vật hay đồ vật trong tranh để nghe cô nói. "));
  cap.appendChild(n);cap.appendChild(line);
  box.parentNode.insertBefore(cap,box.nextSibling);
  function upd(){n.textContent="Đã khám phá "+count+"/"+list.length+(count===list.length?" ⭐":"")}
  upd();
  function act(r){
    var i=+r.getAttribute("data-i");
    [].forEach.call(g.querySelectorAll("rect.on"),function(x){x.classList.remove("on")});
    r.classList.add("on");
    if(!seen[i]){seen[i]=1;count++;r.classList.add("seen");dots[i].style.display="none";upd()}
    line.textContent=list[i][4];say(list[i][4]);
  }
  g.addEventListener("click",function(e){var r=e.target.closest("rect");if(r){act(r)}});
  g.addEventListener("keydown",function(e){
    if(e.key==="Enter"||e.key===" "){var r=e.target.closest&&e.target.closest("rect");if(r){e.preventDefault();act(r)}}
  });
}

/* ---------- 3. SẮP XẾP TỪ THÀNH CÂU ---------- */
function ordering(main){
  var raw=[];
  [].forEach.call(main.querySelectorAll(".tblwrap tbody td:nth-child(3) .row, .story .ln .en"),function(el){
    raw.push(el.textContent.replace(/\s+/g," ").trim());
  });
  var seen={},c=[];
  raw.forEach(function(s){
    var w=s.split(" ");
    if(w.length>=3&&w.length<=9&&/^[A-Za-z][A-Za-z' ,.!?]*[.!?]$/.test(s)&&!seen[s]){seen[s]=1;c.push(s)}
  });
  if(c.length<3){return}
  var pick=[];
  if(c.length<=5){pick=c}else{for(var q=0;q<5;q++){pick.push(c[Math.floor(q*c.length/5)])}}
  var done=main.querySelector("#doneBtn"),after=done&&done.closest(".blk");
  if(!after||after.parentNode!==main){return}

  var card=mk("section","blk lk-card lk-ord");
  card.innerHTML='<h3>🧩 Sắp xếp từ thành câu</h3><p class="muted">Bấm các từ theo đúng thứ tự để ghép thành câu. <b class="lk-prog"></b></p>'
   +'<div class="lk-ans" aria-live="polite"></div><div class="lk-bank"></div><div class="lk-fb" aria-live="polite"></div>'
   +'<div class="actions"><button type="button" class="btn sm lk-chk">Kiểm tra</button><button type="button" class="btn ghost sm lk-rs">Làm lại câu này</button><button type="button" class="btn sm lk-nx" hidden>Câu tiếp →</button></div>'
   +'<div class="lk-fin" hidden></div>';
  main.insertBefore(card,after);
  var ans=card.querySelector(".lk-ans"),bank=card.querySelector(".lk-bank"),fb=card.querySelector(".lk-fb"),
      chk=card.querySelector(".lk-chk"),rs=card.querySelector(".lk-rs"),nx=card.querySelector(".lk-nx"),
      prog=card.querySelector(".lk-prog"),fin=card.querySelector(".lk-fin"),acts=card.querySelector(".actions");
  var i=0,first=0,tried=false,ok=false,words=[],order=[],sel=[];

  function shuffle(n){
    var a=[],k,j,t,tries=0;for(k=0;k<n;k++){a.push(k)}
    do{for(k=n-1;k>0;k--){j=Math.floor(Math.random()*(k+1));t=a[k];a[k]=a[j];a[j]=t}tries++}
    while(tries<10&&a.every(function(v,x){return v===x}));
    return a;
  }
  function draw(){
    ans.className="lk-ans"+(ok?" ok":"");
    ans.innerHTML="";bank.innerHTML="";
    sel.forEach(function(k,pos){
      var b=mk("button","lk-w in",words[k]);b.type="button";b.disabled=ok;
      b.addEventListener("click",function(){sel.splice(pos,1);fb.className="lk-fb";fb.textContent="";draw()});
      ans.appendChild(b);
    });
    order.forEach(function(k){
      if(sel.indexOf(k)>-1){return}
      var b=mk("button","lk-w",words[k]);b.type="button";
      b.addEventListener("click",function(){sel.push(k);fb.className="lk-fb";fb.textContent="";draw()});
      bank.appendChild(b);
    });
  }
  function load(){
    var t=pick[i];words=t.split(" ");order=shuffle(words.length);sel=[];tried=false;ok=false;
    prog.textContent="Câu "+(i+1)+"/"+pick.length;
    fb.className="lk-fb";fb.textContent="";chk.hidden=false;rs.hidden=false;nx.hidden=true;draw();
  }
  chk.addEventListener("click",function(){
    if(sel.length<words.length){fb.className="lk-fb bad";fb.textContent="Em xếp đủ tất cả các từ rồi bấm Kiểm tra nhé.";return}
    var s=sel.map(function(k){return words[k]}).join(" ");
    if(s===pick[i]){
      ok=true;if(!tried){first++}
      fb.className="lk-fb ok";fb.textContent="Đúng rồi!";
      chk.hidden=true;rs.hidden=true;nx.hidden=false;
      nx.textContent=(i<pick.length-1)?"Câu tiếp →":"Xem kết quả";
      draw();say(pick[i]);
    }else{
      tried=true;ans.classList.add("bad");fb.className="lk-fb bad";fb.textContent="Chưa đúng, em thử sắp xếp lại nhé.";
    }
  });
  rs.addEventListener("click",function(){sel=[];fb.className="lk-fb";fb.textContent="";draw()});
  nx.addEventListener("click",function(){
    i++;
    if(i<pick.length){load();return}
    [ans,bank,fb,acts].forEach(function(e){e.hidden=true});
    prog.textContent="";fin.hidden=false;
    fin.innerHTML="";
    fin.appendChild(mk("p","lk-line","⭐ Giỏi lắm! Em xếp đúng "+first+"/"+pick.length+" câu ngay từ lần đầu."));
    var again=mk("button","btn ghost sm","Chơi lại");again.type="button";
    again.addEventListener("click",function(){
      i=0;first=0;fin.hidden=true;[ans,bank,fb,acts].forEach(function(e){e.hidden=false});load();
    });
    fin.appendChild(again);
  });
  load();
}

/* ---------- chạy mỗi khi trang vẽ ngày học ---------- */
function isTeacher(){
  var b=document.querySelector('.seg button[data-mode="t"]');
  return !!(b&&b.getAttribute("aria-pressed")==="true");
}
function enhance(){
  var main=document.querySelector("main.stack");
  if(!main||main.getAttribute("data-lk")||!main.querySelector(".sechead")||isTeacher()){return}
  main.setAttribute("data-lk","1");
  [].forEach.call(main.querySelectorAll("svg.scene"),hotspots);
  discover(main);
  ordering(main);
}
var app=document.getElementById("app"),timer=null;
if(app){
  new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(enhance,60)}).observe(app,{childList:true,subtree:true});
}
enhance();
})();
