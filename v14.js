// v1.4 Duo/focus layer. Existing sessions, schema v2 and legacy drafts remain untouched.
const DUO_DRAFT_PREFIX='duo:';
let focusedExercise=null;

function additions(){
 db.programAdditions=db.programAdditions||{evelin:{}};
 db.programAdditions.evelin=db.programAdditions.evelin||{};
 db.programAdditions.evelin[workout]=db.programAdditions.evelin[workout]||[];
 return db.programAdditions.evelin[workout];
}
function personProgram(p){return [...PROGRAM[p][workout],...(p==='evelin'?additions():[])];}
function strengthDefinition(p,name){return personProgram(p).find(x=>x[0]===name&&x[1]);}
function duoKey(){return DUO_DRAFT_PREFIX+workout;}
function duoDraft(){
 const d=drafts[duoKey()]||(drafts[duoKey()]={cardio:{},strength:{},addedEvelin:{}});
 d.cardio=d.cardio||{};d.strength=d.strength||{};d.addedEvelin=d.addedEvelin||{};return d;
}
function saveDuo(){localStorage.setItem(DRAFTS_KEY,JSON.stringify(drafts));}
function plannedSets(p,name){return strengthDefinition(p,name)?.[1]||0;}
function ensureExercise(name){
 const d=duoDraft(),e=d.strength[name]||(d.strength[name]={});
 ['silvio','evelin'].forEach(p=>{
  const planned=plannedSets(p,name),temporary=p==='evelin'&&d.addedEvelin[name];
  if(!planned&&!temporary)return;
  e[p]=e[p]||{sets:[]};
  const wanted=planned||(temporary?1:0);
  while(e[p].sets.length<wanted)e[p].sets.push({w:'',r:'',d:false,extra:false});
  e[p].sets.forEach((s,i)=>{if(i<planned)s.extra=false});
 });
 return e;
}
function strengthNames(){return [...new Set([...personProgram('silvio'),...personProgram('evelin')].filter(x=>x[1]).map(x=>x[0]))];}
function cardioDefinitions(){
 const source=personProgram('silvio').filter(x=>!x[1]);
 return source.map((x,i)=>({name:x[0],duration:x[3]||null,index:i}));
}
function priorExercise(p,name){return pSessions(p).filter(s=>s.workout===workout).sort((a,b)=>sKey(b).localeCompare(sKey(a))).map(s=>s.exercises.find(e=>e.name===name)).find(Boolean);}
function previousText(p,name,i){const s=priorExercise(p,name)?.sets?.[i];return s?.done?`${s.weight} kg × ${s.reps}`:'—';}

function renderDuo(){
 const d=duoDraft(),list=$('#exerciseList');
 document.body.classList.add('duo-workout');
 $('#todayTitle').textContent=`Trening ${workout} · Silvio + Evelin`;
 $('#todaySubtitle').textContent=`${dayName[workout]} · zajednički trening`;
 $('#saveWorkoutBtn').textContent='Završi trening';
 const cardio=cardioDefinitions().map((c,i)=>{const v=d.cardio[i]||{};return `<article class="exercise-card cardio-card ${v.d?'exercise-complete':''}"><div class="exercise-head"><div class="exercise-index">${i+1}</div><div class="exercise-title"><h3>${esc(c.name)}</h3><p class="muted">Cardio · ${c.duration||'—'} min</p></div></div><label class="cardio-done"><input class="duo-cardio" data-index="${i}" type="checkbox" ${v.d?'checked':''}><span>${v.d?'Završeno ✓':'Označi kada završite'}</span></label></article>`}).join('');
 const offset=cardioDefinitions().length;
 const strength=strengthNames().map((name,i)=>{const e=ensureExercise(name),sd=e.silvio?.sets||[],ed=e.evelin?.sets||[],done=[...sd,...ed].filter(x=>x.d).length,total=sd.length+ed.length;return `<article class="exercise-card duo-machine-card" data-focus="${esc(name)}" role="button" tabindex="0"><span class="exercise-index">${offset+i+1}</span><span class="exercise-title"><span class="exercise-name-row"><strong>${esc(name)}</strong><button class="info-btn duo-info" type="button" data-info="${esc(name)}" aria-label="Upute za ${esc(name)}">i</button></span><small>${sd.length} Silvio · ${ed.length?ed.length+' Evelin':'Dodaj Evelin za danas'}</small></span><span class="machine-progress ${done===total&&total?'complete':''}">${done}/${total}</span></article>`}).join('');
 list.innerHTML=cardio+strength;
 $$('.duo-cardio').forEach(x=>x.oninput=()=>{const v=d.cardio[x.dataset.index]||(d.cardio[x.dataset.index]={});v.d=x.checked;saveDuo();const card=x.closest('.cardio-card');card.classList.toggle('exercise-complete',x.checked);x.nextElementSibling.textContent=x.checked?'Završeno ✓':'Označi kada završite';duoCompletion()});
 duoCompletion();weekCount();
}
function personFocus(name,p){
 const d=duoDraft(),def=strengthDefinition(p,name),temporary=p==='evelin'&&d.addedEvelin[name],exists=!!def||temporary;
 if(!exists&&p==='evelin')return `<section class="duo-person evelin"><div class="person-heading"><h3>Evelin</h3></div><button class="secondary-btn add-evelin" data-name="${esc(name)}">+ Dodaj Evelin za danas</button></section>`;
 if(!exists)return '';
 const sets=ensureExercise(name)[p].sets,target=def?.[2]||null;
 return `<section class="duo-person ${p}"><div class="person-heading"><div><h3>${p==='silvio'?'Silvio':'Evelin'}</h3><small>${target?'Cilj: '+sets.filter(x=>!x.extra).length+' × '+target:'Bez zadanog cilja'}</small></div></div><div class="focus-sets">${sets.map((s,i)=>`<div class="focus-set ${s.d?'set-complete':''}" data-row="${p}-${i}"><span class="set-label">${i+1}${s.extra?' +':''}</span><label>kg<input class="duo-input" data-p="${p}" data-i="${i}" data-f="w" type="number" step="0.5" min="0" inputmode="decimal" value="${s.w??''}"></label><label>pon.<input class="duo-input" data-p="${p}" data-i="${i}" data-f="r" type="number" step="1" min="0" inputmode="numeric" value="${s.r??''}"></label><label class="done-label"><input class="duo-done" data-p="${p}" data-i="${i}" type="checkbox" ${s.d?'checked':''}> ✓</label>${s.extra?`<button class="delete-set" data-p="${p}" data-i="${i}" aria-label="Obriši dodatnu seriju">×</button>`:'<span></span>'}<small class="previous-result">Prošli put: ${previousText(p,name,i)}</small></div>`).join('')}</div><button class="text-btn add-set" data-p="${p}">+ Dodaj seriju</button></section>`;
}
function openFocus(name){
 focusedExercise=name;let m=$('#duoFocus');if(!m){m=document.createElement('div');m.id='duoFocus';m.className='info-modal';document.body.appendChild(m)}
 m.innerHTML=`<div class="info-backdrop" data-close-focus></div><section class="info-sheet focus-sheet"><div class="info-sheet-head"><div><p class="eyebrow">SPRAVA</p><div class="focus-title-row"><h2>${esc(name)}</h2><button class="info-btn focus-info" type="button" data-info="${esc(name)}" aria-label="Upute za ${esc(name)}">i</button></div></div><button class="info-close" data-close-focus>×</button></div>${personFocus(name,'silvio')}${personFocus(name,'evelin')}</section>`;m.classList.add('open');
 m.querySelectorAll('[data-close-focus]').forEach(x=>x.onclick=()=>{m.classList.remove('open');renderDuo()});
 m.querySelector('.focus-info')?.addEventListener('click',e=>{e.stopPropagation();showInfo(name)});
 m.querySelector('.add-evelin')?.addEventListener('click',()=>{duoDraft().addedEvelin[name]=true;ensureExercise(name);saveDuo();openFocus(name)});
 m.querySelectorAll('.duo-input').forEach(x=>x.addEventListener('input',()=>{ensureExercise(name)[x.dataset.p].sets[+x.dataset.i][x.dataset.f]=x.value;saveDuo()}));
 m.querySelectorAll('.duo-done').forEach(x=>x.addEventListener('input',()=>{const s=ensureExercise(name)[x.dataset.p].sets[+x.dataset.i];s.d=x.checked;saveDuo();x.closest('.focus-set').classList.toggle('set-complete',x.checked);duoCompletion()}));
 m.querySelectorAll('.add-set').forEach(x=>x.onclick=()=>{const sets=ensureExercise(name)[x.dataset.p].sets,last=sets.at(-1)||{};sets.push({w:last.w??'',r:last.r??'',d:false,extra:true});saveDuo();openFocus(name)});
 m.querySelectorAll('.delete-set').forEach(x=>x.onclick=()=>{const sets=ensureExercise(name)[x.dataset.p].sets,i=+x.dataset.i;if(sets[i]?.extra){sets.splice(i,1);saveDuo();openFocus(name)}});
}
function duoCompletion(){const d=duoDraft(),sets=strengthNames().flatMap(n=>{const e=ensureExercise(n);return [...(e.silvio?.sets||[]),...(e.evelin?.sets||[])]}),cardio=cardioDefinitions().map((_,i)=>d.cardio[i]||{}),all=[...sets,...cardio],done=all.filter(x=>x.d).length;$('#completionText').textContent=`${done} / ${all.length} stavki`;$('#completionBar').style.width=`${all.length?done/all.length*100:0}%`}
function buildDuoSession(p,date){
 const d=duoDraft(),exercises=[];
 cardioDefinitions().forEach((c,i)=>exercises.push({name:c.name,duration:c.duration,target:null,done:!!d.cardio[i]?.d,sets:[]}));
 strengthNames().forEach(name=>{const def=strengthDefinition(p,name),temporary=p==='evelin'&&d.addedEvelin[name];if(!def&&!temporary)return;const sets=(ensureExercise(name)[p]?.sets||[]).map(s=>({weight:+s.w||0,reps:+s.r||0,done:!!s.d,extra:!!s.extra}));exercises.push({name,duration:null,target:def?.[2]||null,temporary:!!temporary,sets})});
 return{id:String(Date.now())+(p==='silvio'?'1':'2'),person:p,workout,date,createdAt:new Date().toISOString(),exercises};
}
function duoSummary(sessions){
 let m=$('#summaryModal');if(!m){m=document.createElement('div');m.id='summaryModal';m.className='info-modal';document.body.appendChild(m)}
 const blocks=sessions.map(s=>{const[d,t]=counts(s);return `<section class="duo-summary"><h3>${s.person==='silvio'?'Silvio':'Evelin'}</h3><div class="summary-stats"><div><strong>${d}/${t}</strong><small>serija</small></div><div><strong>${Math.round(volume(s))} kg</strong><small>volumen</small></div></div></section>`}).join('');
 const candidates=sessions.find(s=>s.person==='evelin').exercises.filter(e=>e.temporary&&e.sets.some(x=>x.done)&&!additions().some(x=>x[0]===e.name));
 m.innerHTML=`<div class="info-backdrop" data-close></div><section class="info-sheet"><div class="info-sheet-head"><div><p class="eyebrow">TRENING SPREMLJEN</p><h2>Sažetak treninga</h2></div><button class="info-close" data-close>×</button></div>${blocks}${candidates.length?`<h3>Za Evelinin program</h3>${candidates.map(e=>`<button class="secondary-btn permanent-add" data-name="${esc(e.name)}">Dodaj trajno: ${esc(e.name)}</button>`).join('')}`:''}</section>`;m.classList.add('open');m.querySelectorAll('[data-close]').forEach(x=>x.onclick=()=>m.classList.remove('open'));m.querySelectorAll('.permanent-add').forEach(x=>x.onclick=()=>{const e=candidates.find(e=>e.name===x.dataset.name),completed=e.sets.filter(s=>s.done).length||1;additions().push([e.name,completed,e.target||'']);saveDb();x.disabled=true;x.textContent='Dodano u Evelinin program ✓'});
}
function finishDuo(){const date=$('#sessionDate').value||today(),sessions=['silvio','evelin'].map(p=>buildDuoSession(p,date));db.sessions.push(...sessions);saveDb();sessions.forEach(s=>unlock(s.person,date));delete drafts[duoKey()];saveDuo();renderDuo();renderHistory();renderProgress();duoSummary(sessions)}

$('#exportBtn').onclick=()=>{const out={schemaVersion:SCHEMA_VERSION,exportedAt:new Date().toISOString(),sessions:db.sessions,achievements:db.achievements,programAdditions:db.programAdditions||{evelin:{}}};const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(out,null,2)],{type:'application/json'}));a.download=`trening-backup-${today()}.json`;a.click()};
$('#importInput').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);if(!Array.isArray(x.sessions))throw 0;db={...x,schemaVersion:SCHEMA_VERSION,achievements:x.achievements||{evelin:{},silvio:{}},programAdditions:x.programAdditions||{evelin:{}}};saveDb();renderDuo();renderHistory();renderProgress();toast('Podaci uvezeni.')}catch{toast('Neispravna JSON datoteka.')}};r.readAsText(f)};
$('#saveWorkoutBtn').onclick=finishDuo;
$('#exerciseList').addEventListener('click',event=>{const info=event.target.closest('.duo-info');if(info){event.stopPropagation();showInfo(info.dataset.info);return}const card=event.target.closest('[data-focus]');if(card)openFocus(card.dataset.focus)});
$('#exerciseList').addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&!event.target.closest('.duo-info')){const card=event.target.closest('[data-focus]');if(card){event.preventDefault();openFocus(card.dataset.focus)}}});
$$('.workout-chip').forEach(b=>b.onclick=()=>{workout=b.dataset.workout;localStorage.setItem('training.workout',workout);$$('.workout-chip').forEach(chip=>chip.classList.toggle('active',chip.dataset.workout===workout));renderDuo()});
$$('.tab').forEach(b=>{const old=b.onclick;b.onclick=()=>{old?.();document.body.classList.toggle('duo-workout',b.dataset.tab==='workout');if(b.dataset.tab==='workout')renderDuo()}});
renderDuo();
