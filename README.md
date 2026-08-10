# Evelin + Silvio — Trening na spravama

Mobilno prilagođena statička web aplikacija za praćenje treninga Evelin i Silvija.

## Funkcije
- odvojeni programi za Evelin i Silvija
- trening A / B / C
- unos težine i ponavljanja po seriji
- označavanje završenih serija
- učitavanje težina s prethodnog istog treninga
- povijest treninga po osobi
- graf napretka po vježbi
- broj treninga u tekućem tjednu
- izvoz i uvoz sigurnosne kopije u JSON-u
- svijetla i tamna tema
- podaci se čuvaju lokalno u pregledniku (localStorage)

## Pokretanje
Nije potreban build niti backend. Otvori `index.html` ili posluži direktorij bilo kojim statičkim web serverom.

Primjer:

```bash
python -m http.server 8080
```

Zatim otvori `http://localhost:8080`.

## Objavljivanje
Projekt je pogodan za GitHub Pages jer je potpuno statičan.
