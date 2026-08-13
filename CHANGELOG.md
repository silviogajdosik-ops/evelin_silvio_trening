# Changelog

## v1.4.1 — 2026-08-13

### Ispravljeno
- Odabrani trening A, B ili C ponovno se jasno označava nakon promjene
- Otvaranje fokus ekrana koristi stabilan click handler na popisu i radi nakon svakog ponovnog iscrtavanja kartica
- PWA cache i cache-busting podignuti su na v1.4.1

## v1.4.0 — 2026-08-13

### Dodano
- Zajednički Duo trening s popisom sprava i fokus ekranom pojedine vježbe
- Silvio je uvijek prvi, a Evelin je prikazana ispod njega na fokus ekranu
- Dodatne serije za obje osobe, s kopiranjem zadnje težine i ponavljanja te brisanjem samo dodatnih serija
- Privremeno dodavanje Evelin na Silviove vježbe i mogućnost trajnog dodavanja iz sažetka
- Odvojene spremljene sesije i odvojeni blokovi sažetka za Silvija i Evelin

### Poboljšano
- Cardio ostaje brz checkbox izravno na popisu
- Završene serije jasno su označene bez ponovnog renderiranja liste tijekom unosa
- "Prošli put" prikazuje samo težinu i ponavljanja po seriji
- Zadržana je schema v2, postojeći localStorage podaci, draftovi te kompatibilan izvoz i uvoz
- PWA cache i cache-busting podignuti su na v1.4.0

## v1.3.2 — 2026-08-11

### Ispravljeno
- Prethodni rezultat ponovno se prikazuje uz svaku pojedinu seriju
- Serija se određuje iz postojećeg `data-k` ključa inputa umjesto krhkog DOM/CSS selektora
- Nije mijenjana logika unosa ni event listeneri, pa se zadržava zaštita od zatvaranja Android tipkovnice
- PWA cache podignut je na v1.3.2

## v1.3.1 — 2026-08-11

### Ispravljeno
- Prethodni rezultat sada se prikazuje zasebno uz svaku seriju, a ne samo uz prvu seriju vježbe
- Zadržan je v1.2.4 način unosa bez ponovnog renderiranja liste tijekom tipkanja, kako se Android tipkovnica ne bi zatvarala
- PWA cache i cache-busting podignuti su na v1.3.1

## v1.3.0 — 2026-08-11

### Dodano
- Prikaz rezultata iste serije iz prethodnog treninga iste osobe, treninga i vježbe
- Sažetak nakon spremanja: završene serije, volumen, usporedba, napredak, rekordi i motivacijska poruka
- Novi glavni tab **Napredak** s osobnim statistikama, grafom radne težine/volumena i treninzima po tjednu
- Informativne double-progression preporuke s različitim najmanjim korakom po vježbi
- 14 osobnih milestones/achievements odvojeno za Evelin i Silvija, s datumom prvog otključavanja
- Podatkovna schema v2 u JSON izvozu uz kompatibilan uvoz v1.2.4 backupa

### Poboljšano
- Volumen se računa isključivo iz označenih završenih serija; cardio je isključen
- Plate-loaded sprave i dalje bilježe samo masu dodanih ploča
- Grafovi su responzivni i ne zahtijevaju horizontalno pomicanje stranice
- Zadržano automatsko spremanje drafta i unos bez ponovnog renderiranja liste tijekom tipkanja
- Offline cache, cache-busting i update flow podignuti na v1.3.0

## v1.2.4 — 2026-08-11
- Ispravljen unos višeznamenkastih brojeva na Androidu bez zatvaranja tipkovnice
- Automatsko lokalno spremanje nedovršenog treninga zasebno po osobi i treningu
- Zadržavanje drafta nakon zatvaranja i ponovnog otvaranja aplikacije

## v1.2.3 — 2026-08-11
- 17 zasebnih WebP ilustracija sprava i pouzdan prikaz u info prozoru/offline cacheu

## v1.2.2 — 2026-08-11
- Ilustrirane kartice sprava i optimizirani vizuali

## v1.2.1 — 2026-08-11
- Ispravljen prikaz skica sprava na Androidu i metadata verzije

## v1.2.0 — 2026-08-11
- Vizualne skice, alternativni nazivi i vodič za prepoznavanje sprava

## v1.1.1 — 2026-08-11
- Stabiliziran redoslijed zagrijavanja, vježbi snage i smirivanja

## v1.1.0 — 2026-08-11
- PWA instalacija, ikona, verzija, ručna provjera nadogradnje i offline update flow

## v1.0.1 — 2026-08-10
- Info upute, cardio završetak, PWA cache i prikaz verzije

## v1.0.0 — 2026-08-10
- Početna stabilna verzija aplikacije
