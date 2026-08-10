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
const KEY='evelinSilvioTraining.v1';
let person=localStorage.getItem('training.person')||'evelin';
let workout=localStorage.getItem('training.workout')||'A';
let db=(()=>{try{return JSON.parse(localStorage.getItem(KEY))||{sessions:[]}}catch{return{sessions:[]}}})();
let draft={};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const today=()=>{const d=new Date();return new Date(d-d.getTimezoneOffset()*60000).toISOString().slice(0,10)};
const saveDb=()=>localStorage.setItem(KEY,JSON.stringify(db));
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),1800)};
const dayName={A:'Ponedjeljak',B:'Srijeda',C:'Petak'};
const current=()=>PROGRAM[person][workout];
function render(){
 $$('.person-btn').forEach(b=>b.classList.toggle('active',b.dataset.person===person));
 $$('.workout-chip').forEach(b=>b.classList.toggle('active',b.dataset.workout===workout));
 $('#todayTitle').textContent=`Trening ${workout} · ${person==='evelin'?'Evelin':'Silvio'}`;
 $('#todaySubtitle').textContent=`${dayName[workout]} · ${current().filter(x=>x[1]).length} vježbi snage`;
 const list=$('#exerciseList');
 list.innerHTML=current().map((e,i)=>{
  const [name,sets,reps,duration]=e;
  if(!sets)return `<article class="exercise-card"><div class="exercise-head"><div class="exercise-index">${i+1}</div><div class="exercise-title"><h3>${name}</h3><p class="muted">Zagrijavanje / smirivanje</p></div><div class="duration-badge">${duration} min</div></div></article>`;
  let rows='';for(let s=0;s<sets;s++){const k=`${i}-${s}`,v=draft[k]||{};rows+=`<div class="set-number">${s+1}</div><input class="set-weight" data-k="${k}" type="number" step="0.5" min="0" inputmode="decimal" placeholder="kg" value="${v.w??''}"><input class="set-reps" data-k="${k}" type="number" step="1" min="0" inputmode="numeric" placeholder="${reps}" value="${v.r??''}"><input class="set-done" data-k="${k}" type="checkbox" ${v.d?'checked':''}>`}
  return `<article class="exercise-card"><div class="exercise-head"><div class="exercise-index">${i+1}</div><div class="exercise-title"><h3>${name}</h3><p class="muted">Cilj: ${sets} × ${reps}</p></div></div><div class="sets-grid"><div></div><small class="muted">kg</small><small class="muted">pon.</small><small class="muted">✓</small>${rows}</div></article>`;
 }).join('');
 $$('.set-weight,.set-reps,.set-done').forEach(el=>el.addEventListener('input',()=>{const k=el.dataset.k;draft[k]=draft[k]||{};if(el.classList.contains('set-weight'))draft[k].w=el.value;if(el.classList.contains('set-reps'))draft[k].r=el.value;if(el.classList.contains('set-done'))draft[k].d=el.checked;completion()}));
 completion();weekCount();
}
function completion(){const total=current().reduce((n,e)=>n+(e[1]||0),0),done=Object.values(draft).filter(v=>v.d).length;$('#completionText').textContent=`${done} / ${total} serija`;$('#completionBar').style.width=`${total?done/total*100:0}%`}
function saveWorkout(){const date=$('#sessionDate').value||today();const exercises=current().map((e,i)=>{const [name,sets,reps,duration]=e;return{name,duration:duration||null,target:reps||null,sets:sets?Array.from({length:sets},(_,s)=>{const v=draft[`${i}-${s}`]||{};return{weight:+v.w||0,reps:+v.r||0,done:!!v.d}}):[]}});db.sessions.push({id:String(Date.now()),person,workout,date,createdAt:new Date().toISOString(),exercises});saveDb();draft={};render();renderHistory();toast('Trening spremljen.')}
function previous(){const p=db.sessions.filter(s=>s.person===person&&s.workout===workout).sort((a,b)=>(b.date+b.createdAt).localeCompare(a.date+a.createdAt))[0];if(!p)return toast('Nema prethodnog treninga.');draft={};p.exercises.forEach((e,i)=>e.sets.forEach((s,j)=>draft[`${i}-${j}`]={w:s.weight||'',r:'',d:false}));render();toast('Prethodne težine učitane.')}
function fmt(d){return new Intl.DateTimeFormat('hr-HR').format(new Date(d+'T12:00:00'))}
function renderHistory(){const h=$('#historyList');const arr=db.sessions.filter(s=>s.person===person).sort((a,b)=>(b.date+b.createdAt).localeCompare(a.date+a.createdAt));h.innerHTML=arr.length?arr.map(s=>`<article class="history-card"><div class="history-meta"><div><strong>Trening ${s.workout}</strong><div class="muted">${fmt(s.date)}</div></div><button class="text-btn danger del" data-id="${s.id}">Obriši</button></div>${s.exercises.filter(e=>e.sets.length).map(e=>{const done=e.sets.filter(x=>x.done);return `<div class="history-exercise"><span>${e.name}</span><strong>${done.length?done.map(x=>`${x.weight} kg × ${x.reps}`).join(' · '):'—'}</strong></div>`}).join('')}</article>`).join(''):'<div class="card muted">Još nema spremljenih treninga.</div>';$$('.del').forEach(b=>b.onclick=()=>{db.sessions=db.sessions.filter(s=>s.id!==b.dataset.id);saveDb();renderHistory();weekCount()})}
function weekCount(){const now=new Date(),day=(now.getDay()+6)%7,start=new Date(now);start.setHours(0,0,0,0);start.setDate(start.getDate()-day);const end=new Date(start);end.setDate(end.getDate()+7);$('#weekCount').textContent=db.sessions.filter(s=>s.person===person).filter(s=>{const d=new Date(s.date+'T12:00:00');return d>=start&&d<end}).length}
function exportData(){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(db,null,2)],{type:'application/json'}));a.download=`trening-backup-${today()}.json`;a.click()}
function importData(file){const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);if(!Array.isArray(x.sessions))throw 0;db=x;saveDb();render();renderHistory();toast('Podaci uvezeni.')}catch{toast('Neispravna JSON datoteka.')}};r.readAsText(file)}
$$('.person-btn').forEach(b=>b.onclick=()=>{person=b.dataset.person;localStorage.setItem('training.person',person);draft={};render();renderHistory()});
$$('.workout-chip').forEach(b=>b.onclick=()=>{workout=b.dataset.workout;localStorage.setItem('training.workout',workout);draft={};render()});
$$('.tab').forEach(b=>b.onclick=()=>{$$('.tab,.tab-panel').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#'+b.dataset.tab).classList.add('active');if(b.dataset.tab==='history')renderHistory()});
$('#saveWorkoutBtn').onclick=saveWorkout;$('#loadPreviousBtn').onclick=previous;$('#clearHistoryBtn').onclick=()=>{if(confirm('Obrisati svu povijest za odabranu osobu?')){db.sessions=db.sessions.filter(s=>s.person!==person);saveDb();renderHistory();weekCount()}};$('#exportBtn').onclick=exportData;$('#importInput').onchange=e=>e.target.files[0]&&importData(e.target.files[0]);
$('#themeBtn').onclick=()=>{const n=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=n;localStorage.setItem('training.theme',n);$('#themeBtn').textContent=n==='dark'?'☀':'☾'};
document.documentElement.dataset.theme=localStorage.getItem('training.theme')||'light';$('#themeBtn').textContent=document.documentElement.dataset.theme==='dark'?'☀':'☾';$('#sessionDate').value=today();render();renderHistory();