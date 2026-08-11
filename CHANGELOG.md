# Changelog

## v1.2.3 — 2026-08-11

### Ispravljeno
- Oštećeni i nedekodirajući WebP atlas zamijenjen je sa 17 zasebnih WebP ilustracija sprava
- Info prozor sada koristi običan `<img src="assets/machines/...">` bez sprite izrezivanja i apsolutnog pomicanja
- Slike su provjerene dekoderom i dostupne preko GitHub Pages putanje
- Sve kartice sprava uključene su u novi v1.2.3 offline PWA cache
- Zadržan je redoslijed sadržaja: ilustracija, prepoznavanje sprave, alternativni nazivi, podešavanje, pravilno izvođenje i upozorenje

## v1.2.2 — 2026-08-11

### Poboljšano
- Jednostavne SVG skice zamijenjene su originalnim ilustriranim karticama sprava iz prvih generiranih kolaža
- Kartice su optimizirane u jedan WebP atlas i prikazuju se preko običnog `<img>` elementa radi pouzdanosti na Androidu
- Zadržani su rubrika „Što tražiti u teretani”, alternativni nazivi i postojeće upute za pravilno izvođenje
- Dodana je ilustrirana kartica za Abdominal Crunch Machine u istom vizualnom stilu
- Novi vizuali uključeni su u offline PWA cache

## v1.2.1 — 2026-08-11

### Ispravljeno
- Skice sprava sada se pouzdano prikazuju na Androidu i u instaliranoj PWA aplikaciji
- Uklonjen problem s praznim bijelim poljem kod WebP sprite atlasa
- Skice su prebačene na zaseban SVG sustav koji radi oštro na svim gustoćama zaslona i offline
- Ispravljena metadata datoteka verzije koja je još prikazivala staru verziju

## v1.2.0 — 2026-08-11

### Dodano
- Vizualne skice sprava u info prozoru za sve vježbe u programu
- Rubrika „Što tražiti u teretani” uz svaku spravu
- Alternativni nazivi sprava na hrvatskom i engleskom radi lakšeg prepoznavanja
- Dvostruki vizual za kombiniranu cardio stavku traka za trčanje / orbitrek

### Poboljšano
- Info prozor sada prvo pomaže prepoznati spravu, a zatim prikazuje podešavanje, izvedbu i upozorenja
- Skice su spojene u optimizirani WebP atlas radi bržeg učitavanja i manjeg zauzeća
- Atlas sprava uključen je u offline PWA cache

## v1.1.1 — 2026-08-11

### Ispravljeno
- Zagrijavanje je uvijek prva stavka treninga
- Smirivanje je uvijek posljednja stavka treninga, neovisno o dodavanju ili uklanjanju vježbi
- Ako završno smirivanje nedostaje, aplikacija ga automatski dodaje

## v1.1.0 — 2026-08-11

### Dodano
- PWA instalacijski tijek za Android
- Nova E+S ikona aplikacije
- Gumb „Instaliraj aplikaciju” u tabu Podaci
- Vidljiv broj verzije u aplikaciji
- Sekcija „O aplikaciji” sa statusom verzije i načina rada
- Ručna provjera nove verzije
- Obavijest kada je dostupna nova verzija i gumb za osvježavanje
- Dodatne PWA manifest postavke: id, scope, orientation i kategorije

### Poboljšano
- Offline cache i update flow
- Automatsko preuzimanje nove verzije bez brisanja podataka treninga
- Mobilni prikaz postavki aplikacije

## v1.0.1 — 2026-08-10
- dodan info gumb uz svaku vježbu s uputama za podešavanje sprave i pravilno izvođenje
- dodano označavanje završetka za treadmill/orbitrek
- napredak treninga sada uključuje i cardio stavke
- ispravljen PWA cache kako bi nove verzije pouzdanije stizale na Android
- dodan prikaz verzije u aplikaciji

## v1.0.0 — 2026-08-10
- početna stabilna verzija aplikacije
