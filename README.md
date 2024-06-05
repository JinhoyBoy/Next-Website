# Next-Projekt
## Projekt starten

### Mit npm:
#### Starten
1. `npm install`
2. `npm run dev`
- Anwendung normalerweise unter http://localhost:3000 erreichbar

### Mit Docker
#### Starten
1. `docker build -t imagename .`
2. `docker run -p 3000:3000 imagename`
- imagename kann beliebig sein
- Anwendung unter http://localhost:3000 erreichbar
#### Beenden
1. `docker ps ` dann ID des laufenden Images nachschauen (bsp. 123456789abc)
2. `docker stop 123456789abc` (die Image ID eingeben)

## ENV Variablen
Environment Variablen können in der bestehenden .env.local Datei geändert werden. Diese beinhalten den API-Key für Wetterdaten und Akitendaten.
