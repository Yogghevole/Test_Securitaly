# DVD Rental Management System

Applicazione full stack per la gestione del noleggio DVD sviluppata come progetto tecnico.
Il progetto simula un piccolo gestionale interno con flussi completi di catalogo, clienti, noleggio, restituzione e dashboard operativa.

## Overview

Il sistema è pensato per offrire un’esperienza semplice e coerente su desktop, con particolare attenzione a:
- consultazione veloce del catalogo DVD
- gestione clienti con dettaglio e storico
- workflow di noleggio multi-item
- workflow di rientro singolo e multiplo
- dashboard con casi operativi reali già popolati dai seed

## Stack

| Area | Tecnologie |
| --- | --- |
| Frontend | React, TypeScript, Vite, Ant Design, React Router, Axios, Dayjs |
| Backend | Laravel 13, PHP 8.3+, Eloquent ORM, API REST |
| Runtime DB | SQLite |
| Test DB | SQLite in-memory |

## Highlights

- Architettura frontend organizzata con pattern **Service -> Hook -> UI**
- Pagine strutturate per feature (`catalogo`, `customers`, `rental-history`, `dashboard`)
- Endpoint dashboard aggregato per ridurre le chiamate lato client
- Seed realistici per demo immediata
- Test feature backend sui flussi core
- Documentazione tecnica dedicata in `docs/`

---

## Quick Start & Setup Locale

Questa guida assume l'installazione in un ambiente locale pulito. Segui i passaggi in ordine cronologico per evitare conflitti o crash di comunicazione tra frontend e backend.

### 1. Prerequisiti Hardware & Software
- **Node.js** (v18+) & **npm** -> [Scarica qui](https://nodejs.org/)
- **PHP 8.3+** -> [Scarica qui](https://www.php.net/downloads.php) *(Nota: su Windows scaricare la versione "Zip" x64 Thread Safe)*
- **Composer** -> [Scarica qui](https://getcomposer.org/) *(Richiede PHP già installato sul sistema)*

> 💡 **Consiglio PRO per la revisione rapida:** Se riscontri problemi con la configurazione manuale di PHP e SQLite su Windows o Mac, ti consigliamo caldamente di usare **Laravel Herd** ([herd.laravel.com](https://herd.laravel.com/)). Configura PHP, Composer e SQLite in un click in modo isolato, senza toccare i file di sistema.

#### 🔧 Come configurare manualmente PHP e attivare le estensioni
Se usi un'installazione PHP nativa/manuale e riscontri errori di driver mancanti (es. `could not find driver` o problemi con `ZipDownloader`), segui questa procedura:

1. Vai nella cartella d'installazione di PHP (es. `C:\php-8.x.x\`).
2. Se non è presente il file `php.ini` puro, individua il file **`php.ini-development`**, copialo e nominalo esattamente **`php.ini`**.
3. Apri il file `php.ini` con un editor di testo e assicurati di decommentare (rimuovendo il punto e virgola `;` a inizio riga) le seguenti direttive ed estensioni:
   ```ini
   # Specifica la cartella delle estensioni (FONDAMENTALE su Windows)
   extension_dir = "ext"

   # Estensioni richieste da Laravel e dal sistema SQLite
   extension=curl
   extension=fileinfo
   extension=mbstring
   extension=openssl
   extension=pdo_sqlite
   extension=sqlite3
   extension=zip
   ```
4. Salva il file e verifica la corretta attivazione da terminale digitando `php -m` (le voci sopracitate dovranno apparire nella lista dei moduli caricati).

---

### 2. Configurazione Backend

Apri il terminale (se usi Windows e riscontri blocchi di esecuzione script su PowerShell, digita prima `cmd` per passare al prompt dei comandi classico) ed entra nella cartella `backend`:

```bash
cd backend

# 1. Installa le dipendenze PHP
composer install

# 2. Configura le variabili d'ambiente di Laravel
copy .env.example .env   # Su Mac/Linux: cp .env.example .env
php artisan key:generate
```

Il progetto è preconfigurato per utilizzare SQLite file-based per scopi di review tecnica:
```env
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

#### Inizializzazione e Popolamento del Database:
```bash
# 3. Crea fisicamente il file vuoto per SQLite (Windows)
type nul > database\database.sqlite
# Nota per Mac/Linux: usa il comando "touch database/database.sqlite"

# 4. Esegui le migrazioni e avvia i seed demo
php artisan migrate:fresh --seed

# 5. Avvia il server delle API locali
php artisan serve
```
*Il backend sarà in ascolto su: `http://127.0.0.1:8000`. Lascia questo terminale aperto.*

---

### 3. Configurazione Frontend

Apri un **secondo terminale** dedicato (mantenendo il backend attivo) e posizionati nella cartella `frontend`:

```bash
cd frontend

# 1. Installa i pacchetti Node
npm install
```

#### ⚠️ Configurazione Variabili d'Ambiente Frontend (.env)
Per evitare che React vada in crash cercando di risolvere le chiamate API sulla stessa porta del Dev Server (`5173`), è obbligatorio definire l'URL di destinazione del backend.

1. Crea un file chiamato **`.env`** (oppure `.env.local`) all'interno della cartella `frontend/`.
2. Inserisci la seguente variabile di configurazione:
   ```env
   VITE_API_URL=[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)
   ```

#### Avvio dell'Applicazione:
```bash
npm run dev
```
*Nota: Se la policy di esecuzione di PowerShell blocca l'avvio, digita `cmd` all'interno del terminale per bypassare le restrizioni di Windows prima di lanciare il comando.*

L'applicazione sarà accessibile nel browser all'indirizzo:
```text
[http://127.0.0.1:5173](http://127.0.0.1:5173)
```

---

## Test e verifiche

### Backend
La suite dei test backend si appoggia su un database **SQLite in-memory** configurato all'interno del file `phpunit.xml`.
```bash
cd backend
php artisan test
```

### Frontend
```bash
cd frontend
npm run build
npm run lint
```

---

## Database

### Esplorazione visiva dei dati di runtime
I dati applicativi generati e modificati durante le sessioni di utilizzo vengono registrati nel file:
```text
backend/database/database.sqlite
```
È possibile ispezionare le tabelle e le relazioni con un qualsiasi client grafico per database come:
- **DB Browser for SQLite** (Consigliato)
- **DBeaver**
- **TablePlus**

Se riscontri un database vuoto o desideri resettare lo stato iniziale dei dati demo, esegui:
```bash
cd backend
php artisan migrate:fresh --seed
```

### Opzione alternativa: MySQL
Se desideri valutare il comportamento del backend accoppiato a un DBMS relazionale tradicional, modifica il file `backend/.env` configurando le tue credenziali locali:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=securitaly_dvd_rental
DB_USERNAME=tuo_username
DB_PASSWORD=tua_password
```
Rilancia poi il comando di migrazione (`php artisan migrate:fresh --seed`) per ricostruire lo schema su MySQL.

---

## Demo Data

I seed inclusi generano istantaneamente uno scenario operativo reale per permettere una valutazione immediata delle feature senza inserimenti manuali preventivi. Il set dati include:
- Catalogo completo di film catalogati per genere con disponibilità stock variabile
- Anagrafiche clienti con stati differenziati (attivi, con ritardi o sospesi)
- Storico transazionale con contratti di noleggio attivi, conclusi, scadenze fissate per la data corrente ed eventi di over-due (utili per saggiare i widget della dashboard)

---

## Scelte progettuali

- **Pattern Service -> Hook -> UI:** Disaccoppiamento netto della logica di fetching e manipolazione dati dal livello di presentazione (UI React).
- **Feature-Based Architecture:** Cartelle organizzate per macro-funzionalità per massimizzare la leggibilità del codice e la manutenibilità futura.
- **Endpoint Dashboard Aggregato:** Ottimizzazione delle performance di caricamento tramite la creazione di un controller backend dedicato capace di restituire metriche e KPI strutturati in una singola richiesta HTTP.
- **Transazioni Multi-Item:** Implementazione di un workflow di noleggio e restituzione flessibile capace di gestire operazioni singole e bulk all'interno dello stesso ciclo di esecuzione.
- **SQLite nativo di default:** Scelta mirata a facilitare i processi di code review tecnica ed eliminare l'overhead sistemistico in fase di colloquio.

---

Screenshot principali inclusi:

- `dashboard.PNG`
- `catalogo.PNG`
- `catalogo-noleggio.PNG`
- `catalogo-carrello.PNG`
- `clienti.PNG`
- `cliente-dettagli.PNG`
- `cliente-nuovo.PNG`
- `storico.PNG`
- `storico-rientro.PNG`
- `storico-rientro-carrello.PNG`

---

## Documentazione tecnica

La cartella `docs/` contiene documentazione di supporto e approfondimento:

- [API.md](docs/API.md)
- [Architecture.md](docs/Architecture.md)
- [DATABASE.md](docs/DATABASE.md)
- [PROJECT_CONVENTIONS.md](docs/PROJECT_CONVENTIONS.md)
- [ROADMAP.md](docs/ROADMAP.md)
- [TESTING.md](docs/TESTING.md)
- [UserFlow.md](docs/UserFlow.md)

## Author

Cristian Postovan
