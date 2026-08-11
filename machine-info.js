// v1.2.3 — zasebne WebP kartice sprava za pouzdan prikaz na svim uređajima
const MACHINE_GUIDE={
 'Traka za trčanje':{figs:['treadmill'],find:'Traži traku za trčanje s pokretnom trakom, konzolom i bočnim rukohvatima.',aliases:['Treadmill','Running machine']},
 'Traka za trčanje / orbitrek':{figs:['treadmill','elliptical'],find:'Za zagrijavanje ili smirivanje koristi traku za trčanje ili orbitrek, ovisno što je slobodno.',aliases:['Treadmill','Orbitrek','Elliptical','Cross trainer']},
 'Leg Press':{figs:['leg-press'],find:'Traži spravu na kojoj sjediš ili ležiš i nogama odguruješ veliku platformu.',aliases:['Leg Press','Potisak nogama','45° Leg Press']},
 'Leg Curl':{figs:['leg-curl'],find:'Traži spravu s valjkom za potkoljenice na kojoj savijaš koljena protiv otpora.',aliases:['Leg Curl','Hamstring Curl','Pregib nogu']},
 'Seated Row':{figs:['seated-row'],find:'Traži sjedeću spravu za veslanje s ručkama koje povlačiš prema trupu.',aliases:['Seated Row','Row Machine','Low Row','Veslanje na spravi']},
 'Lat Pulldown':{figs:['lat-pulldown'],find:'Traži visoku sajlu sa širokom šipkom i sjedalom s osloncem za bedra.',aliases:['Lat Pulldown','Pulldown','Lat Machine','Povlačenje na prsa']},
 'Reverse Pec Deck / Rear Delt':{figs:['reverse-pec-deck'],find:'Traži pec-deck spravu koja se može koristiti okrenut prema naslonu za stražnje rame.',aliases:['Reverse Pec Deck','Rear Delt','Rear Delt Fly','Reverse Fly']},
 'Reverse Pec Deck':{figs:['reverse-pec-deck'],find:'Traži pec-deck spravu koja se može koristiti okrenut prema naslonu za stražnje rame.',aliases:['Reverse Pec Deck','Rear Delt','Rear Delt Fly','Reverse Fly']},
 'Cable Face Pull':{figs:['cable-face-pull'],find:'Traži podesivu kabelsku/sajla spravu i uže koje se može postaviti približno u visinu lica.',aliases:['Cable Station','Functional Trainer','Face Pull','Sajla s užetom']},
 'Chest Press':{figs:['chest-press'],find:'Traži sjedeću spravu s ručkama u visini prsa koje guraš ravno naprijed.',aliases:['Chest Press','Machine Press','Potisak za prsa']},
 'Incline Chest Press':{figs:['incline-chest-press'],find:'Traži sjedeću potisnu spravu s kosim naslonom i putanjom ručki naprijed-gore.',aliases:['Incline Chest Press','Incline Press','Kosi potisak na spravi']},
 'Pec Deck':{figs:['pec-deck'],find:'Traži sjedeću spravu s dvije pokretne ruke/jastučića koje spajaš ispred prsa.',aliases:['Pec Deck','Pec Fly','Butterfly','Leptir sprava']},
 'Shoulder Press':{figs:['shoulder-press'],find:'Traži sjedeću spravu s naslonom i ručkama koje iz visine ramena guraš iznad glave.',aliases:['Shoulder Press','Machine Shoulder Press','Potisak za ramena']},
 'Leg Extension':{figs:['leg-extension'],find:'Traži sjedeću spravu s valjkom ispred potkoljenica na kojoj ispružaš koljena.',aliases:['Leg Extension','Ekstenzija nogu','Quadriceps Machine']},
 'Calf Raise Machine':{figs:['calf-raise'],find:'Traži spravu za podizanje na prste; može imati oslonce za ramena ili sjedalo, ovisno o modelu.',aliases:['Calf Raise','Calf Machine','Podizanje na prste']},
 'Lateral Raise Machine':{figs:['lateral-raise'],find:'Traži sjedeću spravu s jastučićima uz nadlaktice/laktove koje podižeš u stranu.',aliases:['Lateral Raise Machine','Shoulder Raise','Lateral Delt Machine']},
 'Hip Abductor Machine':{figs:['hip-abductor'],find:'Traži sjedeću spravu s jastučićima s vanjske strane koljena koje guraš prema van.',aliases:['Hip Abductor','Abductor Machine','Odvođenje nogu']},
 'Abdominal Crunch Machine':{figs:['abdominal-crunch'],find:'Traži sjedeću spravu s gornjim osloncem/ručkama na kojoj savijaš trup prema naprijed.',aliases:['Abdominal Crunch','Ab Crunch Machine','Trbušnjaci na spravi']}
};

Object.entries(MACHINE_GUIDE).forEach(([name,guide])=>{
 if(EXERCISE_INFO[name])Object.assign(EXERCISE_INFO[name],guide);
});

function machineThumb(id,label){
 return `<div class="machine-thumb"><img class="machine-card-img" src="assets/machines/${id}.webp" alt="Ilustracija sprave: ${esc(label)}" width="960" height="960" loading="eager" decoding="async"></div>`;
}

showInfo=function(name){
 const info=EXERCISE_INFO[name]||{title:name,setup:'Namjesti spravu tako da je početni položaj udoban i siguran.',form:'Pokret izvodi polako i kontrolirano, bez trzaja.',tip:'Ako nisi siguran u postavke sprave, pitaj trenera u teretani.'};
 const guide=MACHINE_GUIDE[name];
 let modal=$('#exerciseInfoModal');
 if(!modal){modal=document.createElement('div');modal.id='exerciseInfoModal';modal.className='info-modal';document.body.appendChild(modal)}
 const visual=guide?`<div class="machine-guide"><div class="machine-figures">${guide.figs.map((id,i)=>machineThumb(id,guide.figs.length>1?(i===0?'Traka za trčanje':'Orbitrek'):info.title)).join('')}</div><div class="machine-find"><strong>Što tražiti u teretani</strong><p>${esc(guide.find)}</p><div class="machine-aliases">${guide.aliases.map(a=>`<span>${esc(a)}</span>`).join('')}</div><p class="machine-note">Ilustracija je orijentacijska — stvarna sprava može izgledati drukčije ovisno o proizvođaču.</p></div></div>`:'';
 modal.innerHTML=`<div class="info-backdrop" data-close-info></div><section class="info-sheet machine-info-sheet" role="dialog" aria-modal="true" aria-label="Upute za vježbu"><div class="info-sheet-head"><div><p class="eyebrow">KAKO IZVESTI</p><h2>${esc(info.title)}</h2></div><button class="info-close" type="button" data-close-info aria-label="Zatvori">×</button></div>${visual}<div class="info-block"><strong>1. Namjesti spravu</strong><p>${esc(info.setup)}</p></div><div class="info-block"><strong>2. Pravilno izvođenje</strong><p>${esc(info.form)}</p></div><div class="info-tip"><strong>Upozorenje</strong><p>${esc(info.tip)}</p></div></section>`;
 modal.classList.add('open');
 modal.querySelectorAll('[data-close-info]').forEach(x=>x.onclick=()=>modal.classList.remove('open'));
};
