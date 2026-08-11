const PROGRAM={
 evelin:{
  A:[['Traka za trčanje',0,0,7],['Leg Press',2,'12–15'],['Seated Row',3,'12–15'],['Lat Pulldown',2,'12–15'],['Leg Curl',2,'12–15'],['Reverse Pec Deck / Rear Delt',2,'15'],['Traka za trčanje',0,0,5]],
  B:[['Traka za trčanje / orbitrek',0,0,7],['Leg Press',2,'12–15'],['Chest Press',2,'12'],['Seated Row',3,'12–15'],['Leg Extension',2,'12–15'],['Cable Face Pull',2,'15'],['Traka za trčanje',0,0,5]],
  C:[['Traka za trčanje / orbitrek',0,0,7],['Leg Press',2,'12–15'],['Lat Pulldown',2,'12–15'],['Seated Row',3,'12–15'],['Leg Curl',2,'12–15'],['Chest Press',2,'12'],['Reverse Pec Deck',2,'15'],['Traka za trčanje',0,0,5]]
 },
 silvio:{
  A:[['Traka za trčanje',0,0,7],['Leg Press',3,'10–12'],['Seated Row',3,'10–12'],['Lat Pulldown',3,'10–12'],['Leg Curl',3,'10–12'],['Reverse Pec Deck / Rear Delt',3,'12'],['Cable Face Pull',3,'12–15'],['Traka za trčanje',0,0,5],['Pec Deck',3,'10–12'],['Shoulder Press',3,'10–12'],['Calf Raise Machine',3,'12–15']],
  B:[['Traka za trčanje / orbitrek',0,0,7],['Leg Press',3,'10–12'],['Chest Press',3,'10–12'],['Seated Row',3,'10–12'],['Leg Extension',3,'10–12'],['Reverse Pec Deck',3,'12'],['Cable Face Pull',3,'12–15'],['Traka za trčanje',0,0,5],['Incline Chest Press',3,'10–12'],['Lateral Raise Machine',3,'12–15'],['Hip Abductor Machine',3,'12–15']],
  C:[['Traka za trčanje / orbitrek',0,0,7],['Leg Press',3,'10–12'],['Lat Pulldown',3,'10–12'],['Seated Row',3,'10–12'],['Leg Curl',3,'10–12'],['Chest Press',3,'10–12'],['Reverse Pec Deck',3,'12'],['Cable Face Pull',3,'12–15'],['Pec Deck',3,'10–12'],['Shoulder Press',3,'10–12'],['Abdominal Crunch Machine',3,'12–15']]
 }
};

const EXERCISE_INFO={
 'Traka za trčanje':{title:'Traka za trčanje',setup:'Stani na bočne rubove trake prije pokretanja. Pokreni je malom brzinom, zatim zakorači na pokretnu površinu i postupno ubrzaj.',form:'Hodaj uspravno i opušteno, pogled ravno. Ramena drži spuštena, korak prirodan i nemoj se oslanjati na rukohvate osim radi kratkog pridržavanja.',tip:'Za zagrijavanje kreni lagano pa postupno dođi do ugodnog tempa. Za završnih 5 minuta postupno usporavaj.'},
 'Traka za trčanje / orbitrek':{title:'Traka za trčanje / orbitrek',setup:'Na traci kreni malom brzinom. Na orbitreku prvo sigurno stani na pedale i uhvati ručke, pa tek tada počni okretati.',form:'Drži trup uspravno, ramena opuštena i pokrete ravnomjernima. Ne pogrbljuj se i ne prebacuj većinu težine na ručke.',tip:'Cilj je lagano zagrijavanje, ne umaranje prije vježbi snage.'},
 'Leg Press':{title:'Leg Press',setup:'Namjesti sjedalo tako da u donjem položaju možeš saviti koljena bez podizanja kukova s naslona. Stopala postavi otprilike u širini kukova.',form:'Spusti platformu kontrolirano, zatim je odgurni kroz cijelo stopalo. Koljena neka prate smjer stopala i nemoj ih zaključati na vrhu.',tip:'Leđa i kukovi ostaju na naslonu tijekom cijelog ponavljanja.'},
 'Seated Row':{title:'Seated Row',setup:'Namjesti sjedalo i oslonac tako da možeš dohvatiti ručke bez pogrbljivanja. Stopala čvrsto osloni.',form:'Prsa drži podignuta, kralježnicu neutralno. Povuci ručke prema donjim rebrima i lagano približi lopatice, bez pretjeranog zabacivanja ramena unatrag. Vrati polako.',tip:'Ne ljuljaj trup i ne povlači ramenima prema ušima.'},
 'Lat Pulldown':{title:'Lat Pulldown',setup:'Namjesti jastučiće iznad bedara tako da te čvrsto drže. Uhvat neka bude malo širi od ramena.',form:'Povuci šipku prema gornjem dijelu prsa. Laktove vodi prema dolje, prsa ostaju podignuta, a trup miran.',tip:'Ne povlači šipku iza vrata i ne zabacuj tijelo unatrag.'},
 'Leg Curl':{title:'Leg Curl',setup:'Poravnaj os koljena s osi rotacije sprave. Valjak treba pravilno sjediti na donjem dijelu nogu, ovisno o tipu sprave.',form:'Savij noge kontrolirano, kratko zadrži u završnom položaju i polako vrati uteg.',tip:'Kukove drži mirno na osloncu i izbjegavaj trzaj.'},
 'Reverse Pec Deck / Rear Delt':{title:'Reverse Pec Deck / Rear Delt',setup:'Sjedni licem prema naslonu i namjesti ručke tako da ih možeš dohvatiti s lagano savijenim laktovima.',form:'Prsa osloni na naslon. Otvori ruke unatrag približno do linije tijela i kontrolirano približi lopatice.',tip:'Pokret vodi iz ramena i lopatica; ramena ne podiži prema ušima.'},
 'Reverse Pec Deck':{title:'Reverse Pec Deck',setup:'Sjedni licem prema naslonu i namjesti ručke tako da ih možeš dohvatiti bez istezanja ramena prema naprijed.',form:'Prsa drži na naslonu, laktove blago savijene. Otvori ruke unatrag do linije tijela i polako se vrati.',tip:'Ne zamahuj i ne podiži ramena prema ušima.'},
 'Cable Face Pull':{title:'Cable Face Pull',setup:'Postavi sajlu približno u visinu lica i koristi uže. Odmakni se toliko da je sajla napeta u početnom položaju.',form:'Povuci uže prema očima/sljepoočnicama, laktove vodi široko. Završetak pokreta je s rukama sa strane glave.',tip:'Ne izvijaj donji dio leđa i ne guraj glavu prema naprijed.'},
 'Chest Press':{title:'Chest Press',setup:'Namjesti sjedalo tako da ručke budu približno u visini sredine prsa. Leđa i glava ostaju na naslonu.',form:'Potisni ručke naprijed bez podizanja ramena. Ne zaključavaj laktove naglo i vrati težinu kontrolirano.',tip:'Ako ramena idu prema ušima ili naprijed, smanji težinu.'},
 'Leg Extension':{title:'Leg Extension',setup:'Poravnaj koljeno s osi rotacije sprave. Valjak postavi iznad gležnjeva, a leđa čvrsto osloni.',form:'Ispruži noge bez trzaja i zatim ih polako spusti u početni položaj.',tip:'Ne udaraj utegom o ostatak bloka i ne koristi zamah.'},
 'Pec Deck':{title:'Pec Deck',setup:'Namjesti sjedalo tako da su nadlaktice/ručke približno u visini prsa i ramena ostaju opuštena.',form:'Spoji ruke ispred prsa bez podizanja ramena. Kratko stisni prsa pa polako otvori ruke natrag.',tip:'Ne idi preduboko unatrag ako osjetiš neugodno istezanje u prednjem dijelu ramena.'},
 'Shoulder Press':{title:'Shoulder Press',setup:'Namjesti sjedalo tako da ručke počinju približno u visini ramena. Leđa osloni na naslon.',form:'Potisni ručke iznad glave bez izvijanja donjeg dijela leđa. Spusti ih kontrolirano.',tip:'Rebra ne guraj prema naprijed; ako moraš izvijati leđa, težina je prevelika.'},
 'Calf Raise Machine':{title:'Calf Raise Machine',setup:'Stopala postavi stabilno prema uputama sprave tako da pete imaju prostor za puni pokret.',form:'Podigni pete što više, kratko zadrži na vrhu i zatim ih polako spusti kroz kontrolirani opseg.',tip:'Ne poskakuj i ne koristi zamah.'},
 'Incline Chest Press':{title:'Incline Chest Press',setup:'Namjesti sjedalo tako da su ručke u sigurnom položaju uz gornji dio prsa i ramena ostanu na naslonu.',form:'Potisni ručke naprijed i blago gore. Ramena drži spuštena, a leđa na naslonu.',tip:'Kontroliraj povratak; nemoj dopustiti da uteg naglo povuče ruke unatrag.'},
 'Lateral Raise Machine':{title:'Lateral Raise Machine',setup:'Namjesti sjedalo tako da se os ramena dobro poklapa sa spravom, a jastučići pravilno naliježu na nadlaktice/laktove.',form:'Podigni laktove u stranu do približno visine ramena, bez zamaha, pa ih polako spusti.',tip:'Ramena drži dalje od ušiju i koristi manju težinu ako moraš trzati.'},
 'Hip Abductor Machine':{title:'Hip Abductor Machine',setup:'Sjedni duboko u sjedalo, leđa osloni, a vanjske strane nogu postavi uz jastučiće.',form:'Otvori koljena kontrolirano, kratko zadrži i polako ih vrati.',tip:'Trup drži mirno; nemoj odgurivati težinu zamahom cijelog tijela.'},
 'Abdominal Crunch Machine':{title:'Abdominal Crunch Machine',setup:'Namjesti sjedalo i oslonce tako da je početni položaj udoban i da ne moraš povlačiti rukama.',form:'Savij trup povlačeći rebra prema zdjelici. Kratko stisni trbuh i vrati se polako.',tip:'Ne povlači vrat niti ručke rukama; pokret treba dolaziti iz trupa.'}
};

const KEY='evelinSilvioTraining.v1';
const DRAFTS_KEY='evelinSilvioTraining.drafts.v1';
let person=localStorage.getItem('training.person')||'evelin';
let workout=localStorage.getItem('training.workout')||'A';
let db=(()=>{try{return JSON.parse(localStorage.getItem(KEY))||{sessions:[]}}catch{return{sessions:[]}}})();
let drafts=(()=>{try{return JSON.parse(localStorage.getItem(DRAFTS_KEY))||{}}catch{return{}}})();
const currentDraftKey=()=>`${person}:${workout}`;
let draft=drafts[currentDraftKey()]||{};
const saveDraft=()=>{drafts[currentDraftKey()]=draft;localStorage.setItem(DRAFTS_KEY,JSON.stringify(drafts))};
const clearDraft=()=>{delete drafts[currentDraftKey()];localStorage.setItem(DRAFTS_KEY,JSON.stringify(drafts));draft={}};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const today=()=>{const d=new Date();return new Date(d-d.getTimezoneOffset()*60000).toISOString().slice(0,10)};
const saveDb=()=>localStorage.setItem(KEY,JSON.stringify(db));
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),1800)};
const dayName={A:'Ponedjeljak',B:'Srijeda',C:'Petak'};
const current=()=>PROGRAM[person][workout];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function infoButton(name){return `<button class="info-btn" type="button" data-info="${esc(name)}" aria-label="Upute za ${esc(name)}">i</button>`}
function showInfo(name){
 const info=EXERCISE_INFO[name]||{title:name,setup:'Namjesti spravu tako da je početni položaj udoban i siguran.',form:'Pokret izvodi polako i kontrolirano, bez trzaja.',tip:'Ako nisi siguran u postavke sprave, pitaj trenera u teretani.'};
 let modal=$('#exerciseInfoModal');
 if(!modal){modal=document.createElement('div');modal.id='exerciseInfoModal';modal.className='info-modal';document.body.appendChild(modal)}
 modal.innerHTML=`<div class="info-backdrop" data-close-info></div><section class="info-sheet" role="dialog" aria-modal="true" aria-label="Upute za vježbu"><div class="info-sheet-head"><div><p class="eyebrow">KAKO IZVESTI</p><h2>${esc(info.title)}</h2></div><button class="info-close" type="button" data-close-info aria-label="Zatvori">×</button></div><div class="info-block"><strong>1. Namjesti spravu</strong><p>${esc(info.setup)}</p></div><div class="info-block"><strong>2. Izvedba</strong><p>${esc(info.form)}</p></div><div class="info-tip"><strong>Zapamti</strong><p>${esc(info.tip)}</p></div></section>`;
 modal.classList.add('open');
 modal.querySelectorAll('[data-close-info]').forEach(x=>x.onclick=()=>modal.classList.remove('open'));
}

function render(){
 $$('.person-btn').forEach(b=>b.classList.toggle('active',b.dataset.person===person));
 $$('.workout-chip').forEach(b=>b.classList.toggle('active',b.dataset.workout===workout));
 $('#todayTitle').textContent=`Trening ${workout} · ${person==='evelin'?'Evelin':'Silvio'}`;
 $('#todaySubtitle').textContent=`${dayName[workout]} · ${current().filter(x=>x[1]).length} vježbi snage`;
 const list=$('#exerciseList');
 list.innerHTML=current().map((e,i)=>{
  const [name,sets,reps,duration]=e;
  if(!sets){const k=`${i}-cardio`,v=draft[k]||{};return `<article class="exercise-card cardio-card ${v.d?'exercise-complete':''}"><div class="exercise-head"><div class="exercise-index">${i+1}</div><div class="exercise-title"><div class="exercise-name-row"><h3>${name}</h3>${infoButton(name)}</div><p class="muted">Zagrijavanje / smirivanje</p></div><div class="duration-badge">${duration} min</div></div><label class="cardio-done"><input class="cardio-check" data-k="${k}" type="checkbox" ${v.d?'checked':''}><span>${v.d?'Završeno ✓':'Označi kada završiš'}</span></label></article>`}
  let rows='';for(let s=0;s<sets;s++){const k=`${i}-${s}`,v=draft[k]||{};rows+=`<div class="set-number">${s+1}</div><input class="set-weight" data-k="${k}" type="number" step="0.5" min="0" inputmode="decimal" placeholder="kg" value="${v.w??''}"><input class="set-reps" data-k="${k}" type="number" step="1" min="0" inputmode="numeric" placeholder="${reps}" value="${v.r??''}"><input class="set-done" data-k="${k}" type="checkbox" ${v.d?'checked':''}>`}
  return `<article class="exercise-card"><div class="exercise-head"><div class="exercise-index">${i+1}</div><div class="exercise-title"><div class="exercise-name-row"><h3>${name}</h3>${infoButton(name)}</div><p class="muted">Cilj: ${sets} × ${reps}</p></div></div><div class="sets-grid"><div></div><small class="muted">kg</small><small class="muted">pon.</small><small class="muted">✓</small>${rows}</div></article>`;
 }).join('');
 $$('.set-weight,.set-reps,.set-done,.cardio-check').forEach(el=>el.addEventListener('input',()=>{const k=el.dataset.k;draft[k]=draft[k]||{};if(el.classList.contains('set-weight'))draft[k].w=el.value;if(el.classList.contains('set-reps'))draft[k].r=el.value;if(el.classList.contains('set-done')||el.classList.contains('cardio-check'))draft[k].d=el.checked;saveDraft();if(el.classList.contains('cardio-check')){const card=el.closest('.cardio-card'),label=el.nextElementSibling;if(card)card.classList.toggle('exercise-complete',el.checked);if(label)label.textContent=el.checked?'Završeno ✓':'Označi kada završiš'}completion()}));
 $$('.info-btn').forEach(b=>b.onclick=()=>showInfo(b.dataset.info));
 completion();weekCount();
}
function completion(){const total=current().reduce((n,e)=>n+(e[1]||1),0),done=Object.values(draft).filter(v=>v.d).length;$('#completionText').textContent=`${done} / ${total} stavki`;$('#completionBar').style.width=`${total?done/total*100:0}%`}
function saveWorkout(){const date=$('#sessionDate').value||today();const exercises=current().map((e,i)=>{const [name,sets,reps,duration]=e;if(!sets){const v=draft[`${i}-cardio`]||{};return{name,duration:duration||null,target:null,done:!!v.d,sets:[]}}return{name,duration:null,target:reps||null,sets:Array.from({length:sets},(_,s)=>{const v=draft[`${i}-${s}`]||{};return{weight:+v.w||0,reps:+v.r||0,done:!!v.d}})}});db.sessions.push({id:String(Date.now()),person,workout,date,createdAt:new Date().toISOString(),exercises});saveDb();clearDraft();render();renderHistory();toast('Trening spremljen.')}
function previous(){const p=db.sessions.filter(s=>s.person===person&&s.workout===workout).sort((a,b)=>(b.date+b.createdAt).localeCompare(a.date+a.createdAt))[0];if(!p)return toast('Nema prethodnog treninga.');clearDraft();p.exercises.forEach((e,i)=>{if(e.sets?.length)e.sets.forEach((s,j)=>draft[`${i}-${j}`]={w:s.weight||'',r:'',d:false})});saveDraft();render();toast('Prethodne težine učitane.')}
function fmt(d){return new Intl.DateTimeFormat('hr-HR').format(new Date(d+'T12:00:00'))}
function renderHistory(){const h=$('#historyList');const arr=db.sessions.filter(s=>s.person===person).sort((a,b)=>(b.date+b.createdAt).localeCompare(a.date+a.createdAt));h.innerHTML=arr.length?arr.map(s=>`<article class="history-card"><div class="history-meta"><div><strong>Trening ${s.workout}</strong><div class="muted">${fmt(s.date)}</div></div><button class="text-btn danger del" data-id="${s.id}">Obriši</button></div>${s.exercises.filter(e=>e.sets.length).map(e=>{const done=e.sets.filter(x=>x.done);return `<div class="history-exercise"><span>${e.name}</span><strong>${done.length?done.map(x=>`${x.weight} kg × ${x.reps}`).join(' · '):'—'}</strong></div>`}).join('')}</article>`).join(''):'<div class="card muted">Još nema spremljenih treninga.</div>';$$('.del').forEach(b=>b.onclick=()=>{db.sessions=db.sessions.filter(s=>s.id!==b.dataset.id);saveDb();renderHistory();weekCount()})}
function weekCount(){const now=new Date(),day=(now.getDay()+6)%7,start=new Date(now);start.setHours(0,0,0,0);start.setDate(start.getDate()-day);const end=new Date(start);end.setDate(end.getDate()+7);$('#weekCount').textContent=db.sessions.filter(s=>s.person===person).filter(s=>{const d=new Date(s.date+'T12:00:00');return d>=start&&d<end}).length}
function exportData(){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(db,null,2)],{type:'application/json'}));a.download=`trening-backup-${today()}.json`;a.click()}
function importData(file){const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);if(!Array.isArray(x.sessions))throw 0;db=x;saveDb();render();renderHistory();toast('Podaci uvezeni.')}catch{toast('Neispravna JSON datoteka.')}};r.readAsText(file)}
$$('.person-btn').forEach(b=>b.onclick=()=>{person=b.dataset.person;localStorage.setItem('training.person',person);draft=drafts[currentDraftKey()]||{};render();renderHistory()});
$$('.workout-chip').forEach(b=>b.onclick=()=>{workout=b.dataset.workout;localStorage.setItem('training.workout',workout);draft=drafts[currentDraftKey()]||{};render()});
$$('.tab').forEach(b=>b.onclick=()=>{$$('.tab,.tab-panel').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#'+b.dataset.tab).classList.add('active');if(b.dataset.tab==='history')renderHistory()});
$('#saveWorkoutBtn').onclick=saveWorkout;$('#loadPreviousBtn').onclick=previous;$('#clearHistoryBtn').onclick=()=>{if(confirm('Obrisati svu povijest za odabranu osobu?')){db.sessions=db.sessions.filter(s=>s.person!==person);saveDb();renderHistory();weekCount()}};$('#exportBtn').onclick=exportData;$('#importInput').onchange=e=>e.target.files[0]&&importData(e.target.files[0]);
$('#themeBtn').onclick=()=>{const n=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=n;localStorage.setItem('training.theme',n);$('#themeBtn').textContent=n==='dark'?'☀':'☾'};
document.documentElement.dataset.theme=localStorage.getItem('training.theme')||'light';$('#themeBtn').textContent=document.documentElement.dataset.theme==='dark'?'☀':'☾';$('#sessionDate').value=today();render();renderHistory();
