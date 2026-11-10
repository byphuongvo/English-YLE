(function(){
"use strict";
if(window.__lk){return;}window.__lk=1;

var CSS=[
".lk-hide{display:none!important}",
".lk-card{border-left:5px solid var(--lvl,#C75A1B)}",
".lk-body{display:grid;gap:12px}",
".lk-head{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}",
".lk-card mark,.lk-cap mark{background:var(--note-bg,#FCEFD3);color:var(--note,#8A4F00);border-radius:4px;padding:0 1px;font-weight:700}",
".lk-ex{display:grid;gap:8px}",
".lk-exb{display:flex;gap:10px;align-items:center;text-align:left;padding:10px 12px;border:2px solid var(--line);border-radius:12px;background:var(--bg);font-size:1.05rem;font-weight:700;color:var(--ink)}",
".lk-exb:hover{border-color:var(--accent)}",
".lk-q{display:grid;gap:10px}",
".lk-os{display:flex;flex-wrap:wrap;gap:8px}",
".lk-o{padding:9px 16px;border-radius:12px;border:2px solid var(--accent);background:var(--accent-soft);color:var(--accent);font-weight:700;text-align:left}",
".lk-o.ok{border-color:var(--good);background:var(--good-bg);color:var(--good)}",
".lk-o.bad{border-color:var(--bad);background:var(--bad-bg);color:var(--bad);opacity:.8}",
".lk-o.lk-tile{display:grid;place-items:center;min-width:110px;min-height:96px;padding:8px}",
".lk-fb{font-weight:700}.lk-fb:empty{display:none}.lk-fb.ok{color:var(--good)}.lk-fb.bad{color:var(--bad)}",
".lk-rp{display:flex;flex-wrap:wrap;gap:10px;align-items:center}",
".lk-pic{display:inline-grid;place-items:center;min-height:64px;min-width:64px}",
".lk-pic .ico{width:64px;height:64px}",
".lk-pic .emo{font-size:46px;line-height:1.1}",
".lk-pic img{width:72px;height:72px;object-fit:contain;border-radius:8px}",
".lk-cap{display:grid;gap:6px;padding:10px 14px;border-radius:10px;background:var(--accent-soft)}",
".lk-line{font-weight:700;font-size:1.1rem;min-height:1.4em}",
".lk-hs rect{fill:transparent;stroke:none;cursor:pointer;outline:none}",
".lk-hs rect:hover,.lk-hs rect:focus-visible,.lk-hs rect.on{fill:rgba(47,111,222,.2);stroke:#2F6FDE;stroke-width:2.5;stroke-dasharray:6 4}",
".lk-hs rect.seen:not(.on){fill:rgba(76,167,107,.12)}",
".lk-dot{fill:#2F6FDE;stroke:#fff;stroke-width:2;pointer-events:none}",
"@media (prefers-reduced-motion:no-preference){.lk-dot{animation:lkp 1.4s infinite}@keyframes lkp{50%{opacity:.3}}}",
".lk-ans{min-height:58px;display:flex;flex-wrap:wrap;gap:8px;padding:10px;border:2px dashed var(--line);border-radius:12px;background:var(--bg)}",
".lk-ans:empty::before{content:'Bấm các ô bên dưới theo đúng thứ tự...';color:var(--muted)}",
".lk-ans.ok{border:2px solid var(--good);background:var(--good-bg)}",
".lk-ans.bad{border:2px solid var(--bad);background:var(--bad-bg)}",
".lk-bank{display:flex;flex-wrap:wrap;gap:8px}",
".lk-w{padding:8px 14px;border-radius:10px;border:2px solid var(--accent);background:var(--accent-soft);color:var(--accent);font-weight:700;font-size:1.05rem}",
".lk-w.in{background:var(--surface);color:var(--ink);border-color:var(--line)}",
".lk-w:disabled{cursor:default;opacity:.8}",
".lk-mem{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:10px}",
".lk-c{min-height:88px;border:2px solid var(--accent);border-radius:12px;background:var(--accent);color:var(--accent-ink);font-weight:700;font-size:1.15rem;padding:6px;display:grid;place-items:center}",
".lk-c.up{background:var(--surface);color:var(--ink)}",
".lk-c.done{background:var(--good-bg);border-color:var(--good);color:var(--good)}",
".lk-ln{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px 10px;border:1px solid var(--line);border-radius:12px}",
".lk-ln.mine{background:var(--accent-soft);border-color:var(--accent)}",
".lk-t{flex:1 1 220px;font-weight:700;overflow-wrap:anywhere}",
".lk-who{color:var(--lvl)}"
].join("");
var stl=document.createElement("style");stl.textContent=CSS;document.head.appendChild(stl);

/* ---------- tiện ích ---------- */
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
function shuf(a){var b=a.slice(),j,t;for(var k=b.length-1;k>0;k--){j=Math.floor(Math.random()*(k+1));t=b[k];b[k]=b[j];b[j]=t}return b}
function sample(a,n){return shuf(a).slice(0,n)}
function wd(t){return String(t||"").toLowerCase().replace(/[\u2018\u2019]/g,"'").replace(/[^a-z0-9' ]+/g," ").split(" ").filter(Boolean)}
function lcs(a,b){var m=a.length,n=b.length,d=[],i,j;for(i=0;i<=m;i++){d.push(new Array(n+1).fill(0))}
  for(i=1;i<=m;i++){for(j=1;j<=n;j++){d[i][j]=a[i-1]===b[j-1]?d[i-1][j-1]+1:Math.max(d[i-1][j],d[i][j-1])}}return d[m][n]}
function sim(t,h){var a=wd(t),b=wd(h);return a.length?Math.round(lcs(a,b)/a.length*100):0}
function slug(s){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}

/* hình cho từ vựng: hiện biểu tượng, nếu có ảnh images/vocab-xxx.jpg thì thay bằng ảnh */
function pic(it){
  var s=mk("span","lk-pic");
  if(typeof window.iconSvg==="function"){s.innerHTML=window.iconSvg(it.icon,it.c,"ico")}else{s.textContent=String(it.icon)}
  var img=new Image();img.alt="";
  img.onload=function(){s.innerHTML="";s.appendChild(img)};
  img.src="images/vocab-"+slug(it.w)+".jpg";
  return s;
}

/* ---------- khung trò chơi dùng chung ---------- */
function summary(fin,first,n,again){
  fin.hidden=false;fin.innerHTML="";
  fin.appendChild(mk("p","lk-line","⭐ Giỏi lắm! Em làm đúng "+first+"/"+n+" câu ngay từ lần đầu."));
  var b=mk("button","btn ghost sm","Chơi lại");b.type="button";b.addEventListener("click",again);fin.appendChild(b);
}

/* bấm các ô để xếp theo thứ tự (câu, chữ cái) */
function chips(body,rounds){
  var i=0,first=0,tried=false,ok=false,r=null,order=[],sel=[];
  body.innerHTML='<p class="muted lk-prog"></p><div class="lk-rp"></div><div class="lk-ans" aria-live="polite"></div><div class="lk-bank"></div><div class="lk-fb" aria-live="polite"></div><div class="actions"><button type="button" class="btn sm lk-chk">Kiểm tra</button><button type="button" class="btn ghost sm lk-rs">Làm lại</button><button type="button" class="btn sm lk-nx" hidden>Tiếp →</button></div><div class="lk-fin" hidden></div>';
  function q(s){return body.querySelector(s)}
  var prog=q(".lk-prog"),rp=q(".lk-rp"),ans=q(".lk-ans"),bank=q(".lk-bank"),fb=q(".lk-fb"),
      chk=q(".lk-chk"),rs=q(".lk-rs"),nx=q(".lk-nx"),fin=q(".lk-fin"),acts=q(".actions");
  var parts=[prog,rp,ans,bank,fb,acts];
  function clr(){fb.className="lk-fb";fb.textContent=""}
  function draw(){
    ans.className="lk-ans"+(ok?" ok":"");ans.innerHTML="";bank.innerHTML="";
    sel.forEach(function(k,pos){
      var b=mk("button","lk-w in",r.tokens[k]);b.type="button";b.disabled=ok;
      b.addEventListener("click",function(){sel.splice(pos,1);clr();draw()});ans.appendChild(b);
    });
    order.forEach(function(k){
      if(sel.indexOf(k)>-1){return}
      var b=mk("button","lk-w",r.tokens[k]);b.type="button";
      b.addEventListener("click",function(){sel.push(k);clr();draw()});bank.appendChild(b);
    });
  }
  function load(){
    r=rounds[i];sel=[];tried=false;ok=false;
    var n=r.tokens.length,tries=0,k;order=[];for(k=0;k<n;k++){order.push(k)}
    do{order=shuf(order);tries++}while(tries<10&&n>1&&order.every(function(v,x){return v===x}));
    prog.textContent="Câu "+(i+1)+"/"+rounds.length;
    rp.innerHTML="";
    if(r.pic){rp.appendChild(r.pic())}
    if(r.label){rp.appendChild(mk("div","lk-line",r.label))}
    if(r.audio){
      var au=r.audio,pb=mk("button","btn ghost sm","🔊 Nghe");pb.type="button";
      pb.addEventListener("click",function(){say(au)});rp.appendChild(pb);
      if(i>0){say(au)}
    }
    clr();chk.hidden=false;rs.hidden=false;nx.hidden=true;draw();
  }
  chk.addEventListener("click",function(){
    if(sel.length<r.tokens.length){fb.className="lk-fb bad";fb.textContent="Em xếp đủ tất cả các ô rồi bấm Kiểm tra nhé.";return}
    var s=sel.map(function(k){return r.tokens[k]}).join(r.sep);
    if(s===r.target){
      ok=true;if(!tried){first++}
      fb.className="lk-fb ok";fb.textContent="Đúng rồi!";
      chk.hidden=true;rs.hidden=true;nx.hidden=false;
      nx.textContent=(i<rounds.length-1)?"Tiếp →":"Xem kết quả";
      draw();if(r.sayOk){say(r.sayOk)}
    }else{
      tried=true;ans.classList.add("bad");fb.className="lk-fb bad";fb.textContent="Chưa đúng, em thử sắp xếp lại nhé.";
    }
  });
  rs.addEventListener("click",function(){sel=[];clr();draw()});
  nx.addEventListener("click",function(){
    i++;
    if(i<rounds.length){load();return}
    parts.forEach(function(e){e.hidden=true});
    summary(fin,first,rounds.length,function(){i=0;first=0;fin.hidden=true;parts.forEach(function(e){e.hidden=false});load()});
  });
  load();
}

/* chọn một đáp án: đáp án là chữ hoặc hình */
function choice(body,qs){
  var i=0,first=0,tried=false,done=false;
  body.innerHTML='<p class="muted lk-prog"></p><div class="lk-rp"></div><div class="lk-os"></div><div class="lk-fb" aria-live="polite"></div><div class="actions"><button type="button" class="btn sm lk-nx" hidden>Tiếp →</button></div><div class="lk-fin" hidden></div>';
  function q(s){return body.querySelector(s)}
  var prog=q(".lk-prog"),rp=q(".lk-rp"),os=q(".lk-os"),fb=q(".lk-fb"),nx=q(".lk-nx"),fin=q(".lk-fin"),acts=q(".actions");
  var parts=[prog,rp,os,fb,acts];
  function load(){
    var x=qs[i];done=false;tried=false;
    prog.textContent="Câu "+(i+1)+"/"+qs.length;
    rp.innerHTML="";rp.appendChild(mk("div","lk-line",x.q));
    if(x.audio){
      var au=x.audio,pb=mk("button","btn ghost sm","🔊 Nghe");pb.type="button";
      pb.addEventListener("click",function(){say(au)});rp.appendChild(pb);
      if(i>0){say(au)}
    }
    fb.className="lk-fb";fb.textContent="";nx.hidden=true;os.innerHTML="";
    x.opts.forEach(function(o,k){
      var b=mk("button","lk-o");b.type="button";
      if(typeof o==="function"){b.className="lk-o lk-tile";b.appendChild(o())}else{b.textContent=o}
      b.addEventListener("click",function(){
        if(done){return}
        if(k===x.a){
          done=true;b.classList.add("ok");if(!tried){first++}
          fb.className="lk-fb ok";fb.textContent="Đúng rồi!";
          nx.hidden=false;nx.textContent=(i<qs.length-1)?"Tiếp →":"Xem kết quả";
          if(x.say){say(x.say)}
        }else{
          tried=true;b.classList.add("bad");b.disabled=true;
          fb.className="lk-fb bad";fb.textContent="Chưa đúng, em thử lại nhé.";
        }
      });
      os.appendChild(b);
    });
  }
  nx.addEventListener("click",function(){
    i++;
    if(i<qs.length){load();return}
    parts.forEach(function(e){e.hidden=true});
    summary(fin,first,qs.length,function(){i=0;first=0;fin.hidden=true;parts.forEach(function(e){e.hidden=false});load()});
  });
  load();
}

/* thẻ hoạt động có nút đổi trò chơi */
function activity(main,before,after,modes,start){
  if(!modes.length){return}
  var card=mk("section","blk lk-card"),head=mk("div","lk-head"),h=mk("h3"),body=mk("div","lk-body");
  head.appendChild(h);
  var idx=start%modes.length;
  function show(){h.textContent=modes[idx].t;body.innerHTML="";modes[idx].run(body)}
  if(modes.length>1){
    var sw=mk("button","btn ghost sm","Đổi trò chơi ↻");sw.type="button";
    sw.addEventListener("click",function(){idx=(idx+1)%modes.length;show()});
    head.appendChild(sw);
  }
  card.appendChild(head);card.appendChild(body);
  if(before){before.parentNode.insertBefore(card,before)}
  else if(after){after.parentNode.insertBefore(card,after.nextSibling)}
  else{main.appendChild(card)}
  show();
}

/* ---------- bài đang mở ---------- */
function ctx(){
  var m=/^#w(\d+)-([a-z0-9]+)$/.exec(location.hash||"");
  if(!m||!window.WEEKS){return null}
  var wid=+m[1],n=0,found=-1,S=null;
  window.WEEKS.forEach(function(w){w.sections.forEach(function(s){if(w.id===wid&&s.id===m[2]){found=n;S=s}n++})});
  return S?{s:S,n:found}:null;
}

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
  var kids=[].slice.call(main.children);   /* chụp danh sách trước khi chèn, tránh lặp thẻ */
  kids.forEach(function(sec){
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

/* ---------- 3. TỪ VỰNG: nghe chạm hình, lật thẻ, đánh vần ---------- */
function vocabItems(c){
  var out=[],seen={};
  c.s.blocks.forEach(function(b){
    if(b.t==="vocab"){b.items.forEach(function(it){if(it.icon&&!seen[it.w]){seen[it.w]=1;out.push(it)}})}
  });
  return out;
}
function listenTap(body,items){
  var pickd=sample(items,Math.min(6,items.length));
  var qs=pickd.map(function(it){
    var d=sample(items.filter(function(x){return x.w!==it.w}),3);
    var opts=shuf([it].concat(d));
    return {q:"Nghe rồi chạm vào hình đúng.",audio:it.w,say:it.w,
            opts:opts.map(function(o){return function(){return pic(o)}}),a:opts.indexOf(it)};
  });
  choice(body,qs);
}
function spell(body,items){
  var cand=items.filter(function(x){return /^[A-Za-z]{3,9}$/.test(x.w)});
  var rounds=sample(cand,5).map(function(it){
    var w=it.w.toLowerCase();
    return {tokens:w.split(""),sep:"",target:w,audio:it.w,label:it.vi,sayOk:it.w,pic:function(){return pic(it)}};
  });
  chips(body,rounds);
}
function memory(body,items){
  var set=sample(items,Math.min(6,items.length)),cards=[];
  set.forEach(function(it,k){cards.push({k:k,t:"w"});cards.push({k:k,t:"p"})});
  cards=shuf(cards);
  body.innerHTML='<p class="muted">Lật 2 thẻ: một thẻ chữ và một thẻ hình giống nhau. <b class="lk-mv">Lượt: 0</b></p><div class="lk-mem"></div><div class="lk-fin" hidden></div>';
  var grid=body.querySelector(".lk-mem"),mv=body.querySelector(".lk-mv"),fin=body.querySelector(".lk-fin");
  var open=[],moves=0,matched=0,lock=false;
  cards.forEach(function(cd){
    var b=mk("button","lk-c","?");b.type="button";cd.b=b;
    cd.face=function(){
      b.innerHTML="";
      if(cd.up||cd.done){if(cd.t==="w"){b.textContent=set[cd.k].w}else{b.appendChild(pic(set[cd.k]))}}
      else{b.textContent="?"}
    };
    b.addEventListener("click",function(){
      if(lock||cd.up||cd.done){return}
      cd.up=true;b.classList.add("up");cd.face();open.push(cd);
      if(cd.t==="w"){say(set[cd.k].w)}
      if(open.length===2){
        moves++;mv.textContent="Lượt: "+moves;
        var a=open[0],c2=open[1];
        if(a.k===c2.k&&a.t!==c2.t){
          a.done=true;c2.done=true;a.b.classList.add("done");c2.b.classList.add("done");open=[];matched++;
          if(matched===set.length){
            fin.hidden=false;fin.innerHTML="";
            fin.appendChild(mk("p","lk-line","⭐ Giỏi lắm! Em ghép xong sau "+moves+" lượt."));
            var again=mk("button","btn ghost sm","Chơi lại");again.type="button";
            again.addEventListener("click",function(){memory(body,items)});fin.appendChild(again);
          }
        }else{
          lock=true;
          setTimeout(function(){
            open.forEach(function(x){x.up=false;x.b.classList.remove("up");x.face()});
            open=[];lock=false;
          },900);
        }
      }
    });
    grid.appendChild(b);
  });
}
function vocabCard(main,c){
  var items=vocabItems(c),grids=main.querySelectorAll(".vgrid");
  if(!grids.length||items.length<4){return}
  var after=grids[grids.length-1].closest("section.blk");if(!after||after.parentNode!==main){return}
  var modes=[{t:"🔊 Nghe và chạm vào hình",run:function(b){listenTap(b,items)}}];
  if(items.length>=5){modes.push({t:"🃏 Lật thẻ ghép chữ với hình",run:function(b){memory(b,items)}})}
  if(items.filter(function(x){return /^[A-Za-z]{3,9}$/.test(x.w)}).length>=3){modes.push({t:"🔤 Đánh vần từ",run:function(b){spell(b,items)}})}
  activity(main,null,after,modes,c.n);
}

/* ---------- 4. CÂU: xếp câu, nghe xếp câu, điền từ, nghe chọn câu ---------- */
function pool(main){
  var raw=[];
  [].forEach.call(main.querySelectorAll(".tblwrap tbody td:nth-child(3) .row, .story .ln .en"),function(el){
    raw.push(el.textContent.replace(/\s+/g," ").trim());
  });
  var seen={},c=[];
  raw.forEach(function(s){
    var w=s.split(" ");
    if(w.length>=3&&w.length<=9&&/^[A-Za-z][A-Za-z' ,.!?]*[.!?]$/.test(s)&&!seen[s]){seen[s]=1;c.push(s)}
  });
  return c;
}
var RX=/^([^A-Za-z']*)([A-Za-z']+)([^A-Za-z']*)$/;
function clozeQs(pl){
  var all=[];
  pl.forEach(function(s){s.split(" ").forEach(function(w){
    var m=/[A-Za-z']+/.exec(w);
    if(m&&m[0].length>1&&all.indexOf(m[0].toLowerCase())<0){all.push(m[0].toLowerCase())}
  })});
  return sample(pl,5).map(function(s){
    var ws=s.split(" "),idx=[];
    ws.forEach(function(w,k){var m=RX.exec(w);if(k>0&&m&&m[2].length>1){idx.push(k)}});
    var k=idx.length?idx[Math.floor(Math.random()*idx.length)]:1;
    var m=RX.exec(ws[k])||[ws[k],"",ws[k],""];
    var core=m[2],low=core.toLowerCase();
    var shown=ws.slice();shown[k]=m[1]+"_____"+m[3];
    var d=sample(all.filter(function(x){return x!==low}),2);
    var opts=shuf([core].concat(d));
    return {q:shown.join(" "),say:s,opts:opts,a:opts.indexOf(core)};
  });
}
function pickQs(pl){
  return sample(pl,5).map(function(s){
    var d=sample(pl.filter(function(x){return x!==s}),2);
    var opts=shuf([s].concat(d));
    return {q:"Em nghe thấy câu nào?",audio:s,opts:opts,a:opts.indexOf(s)};
  });
}
function sentenceCard(main,c){
  var pl=pool(main);if(pl.length<3){return}
  var done=main.querySelector("#doneBtn"),before=done&&done.closest(".blk");
  if(!before||before.parentNode!==main){return}
  var modes=[
   {t:"🧩 Sắp xếp từ thành câu",run:function(b){chips(b,sample(pl,5).map(function(s){return {tokens:s.split(" "),sep:" ",target:s,sayOk:s}}))}},
   {t:"🎧 Nghe và xếp câu",run:function(b){chips(b,sample(pl,5).map(function(s){return {tokens:s.split(" "),sep:" ",target:s,audio:s,label:"Nghe rồi bấm các từ theo đúng thứ tự."}}))}},
   {t:"✏️ Điền từ còn thiếu",run:function(b){choice(b,clozeQs(pl))}},
   {t:"👂 Nghe và chọn câu đúng",run:function(b){choice(b,pickQs(pl))}}
  ];
  activity(main,before,null,modes,c?c.n+1:0);
}

/* ---------- 5. ĐÓNG VAI HỘI THOẠI ---------- */
function listenOnce(target,done){
  var R=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!R){done(-3,"");return}
  try{if(window.speechSynthesis){window.speechSynthesis.cancel()}if(cur){cur.pause()}}catch(e){}
  var r=new R(),got=false;
  r.lang="en-GB";r.interimResults=false;r.maxAlternatives=3;r.continuous=false;
  r.onresult=function(ev){
    got=true;var best=-1,heard="",l=ev.results[0];
    for(var j=0;j<l.length;j++){var sc=sim(target,l[j].transcript);if(sc>best){best=sc;heard=l[j].transcript}}
    done(best,heard);
  };
  r.onerror=function(){if(!got){got=true;done(-1,"")}};
  r.onend=function(){if(!got){got=true;done(-2,"")}};
  try{r.start()}catch(e){got=true;done(-1,"")}
}
function roleplay(main){
  [].forEach.call(main.querySelectorAll(".story"),function(st){
    var lines=[].map.call(st.querySelectorAll(".ln .en"),function(e){return e.textContent.trim()});
    if(lines.length<2){return}
    var card=mk("section","blk lk-card"),head=mk("div","lk-head"),h=mk("h3",null,"🎭 Đóng vai hội thoại");
    var sw=mk("button","btn ghost sm","Đổi vai ↻");sw.type="button";
    head.appendChild(h);head.appendChild(sw);
    var intro=mk("p","muted","Em đóng vai có nút 🎤, cô đọc lời của bạn kia. Bấm 🎤 rồi nói câu của em, máy sẽ chấm từng câu."),list=mk("div","lk-body");
    card.appendChild(head);card.appendChild(intro);card.appendChild(list);
    st.parentNode.insertBefore(card,st.nextSibling);
    var par=1;
    function draw(){
      list.innerHTML="";
      lines.forEach(function(t,i){
        var mine=(i%2===par),row=mk("div","lk-ln"+(mine?" mine":""));
        row.appendChild(mk("b","lk-who",mine?"Em":"Bạn"));
        row.appendChild(mk("span","lk-t",t));
        var pl=mk("button","btn ghost sm","🔊");pl.type="button";pl.setAttribute("aria-label","Nghe");
        pl.addEventListener("click",function(){say(t)});row.appendChild(pl);
        if(mine){
          var res=mk("span","lk-res"),mic=mk("button","btn sm","🎤 Nói");mic.type="button";
          mic.addEventListener("click",function(){
            mic.disabled=true;mic.textContent="Đang nghe...";res.textContent="";
            listenOnce(t,function(p,heard){
              mic.disabled=false;mic.textContent="🎤 Nói";res.innerHTML="";
              if(p===-3){res.textContent="Trình duyệt này chưa chấm được tiếng nói. Hãy mở bằng Chrome hoặc Safari mới.";return}
              if(p===-2){res.textContent="Cô chưa nghe thấy giọng em. Hãy thử lại.";return}
              if(p<0){res.textContent="Chưa ghi âm được. Em cho phép micro rồi thử lại nhé.";return}
              var tag=mk("span","shp "+(p>=80?"g":(p>=50?"m":"l")),p+"%");
              res.appendChild(tag);res.appendChild(mk("span","muted",' Máy nghe được: "'+heard+'"'));
            });
          });
          row.appendChild(mic);row.appendChild(res);
        }
        list.appendChild(row);
      });
    }
    sw.addEventListener("click",function(){par=par?0:1;draw()});
    draw();
  });
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
  var c=ctx();
  [].forEach.call(main.querySelectorAll("svg.scene"),hotspots);
  discover(main);
  if(c){vocabCard(main,c)}
  roleplay(main);
  sentenceCard(main,c);
}
var app=document.getElementById("app"),timer=null;
if(app){
  new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(enhance,60)}).observe(app,{childList:true,subtree:true});
}
enhance();
})();
