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

## Quick Start

### Prerequisiti

- PHP 8.3+
- Composer
- Node.js
- npm
- estensioni PHP `pdo_sqlite`, `sqlite3`

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Il progetto è configurato di default per usare SQLite file-based, quindi non richiede un server database esterno.

```env
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

Esegui migrazioni e seed:

```bash
php -r "file_exists('database/database.sqlite') || touch('database/database.sqlite');"
php artisan migrate:fresh --seed
php artisan serve
```

Backend disponibile su:

```text
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend disponibile su:

```text
http://127.0.0.1:5173
```

## Test e verifiche

### Backend

La suite backend usa **SQLite in-memory** tramite `phpunit.xml`.

```bash
cd backend
php artisan test
```

Se ricevi errori come `could not find driver`, abilita nel tuo `php.ini` CLI:

```ini
extension=pdo_sqlite
extension=sqlite3
```

### Frontend

```bash
cd frontend
npm run build
npm run lint
```

## Database

### Come vedere davvero i dati del progetto?

Nel setup attuale, i dati reali stanno in:

```text
backend/database/database.sqlite
```

Puoi aprirli con uno strumento grafico come:

- DB Browser for SQLite
- DBeaver
- TablePlus

Se il file è vuoto, esegui prima:

```bash
cd backend
php -r "file_exists('database/database.sqlite') || touch('database/database.sqlite');"
php artisan migrate:fresh --seed
```

### Opzione alternativa: MySQL solo per dimostrazione

Se vuoi mostrare il progetto anche con MySQL, puoi cambiare il backend in questo modo:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=securitaly_dvd_rental
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Poi eseguire:

```bash
cd backend
php artisan migrate:fresh --seed
```

MySQL resta quindi un’alternativa dimostrativa, mentre il percorso standard del repository è SQLite.

## Demo Data

Il progetto include seed completi per avere un ambiente realistico appena avviato.

Dopo `php artisan migrate:fresh --seed` troverai:

- catalogo DVD già popolato
- clienti demo
- noleggi attivi
- noleggi conclusi
- rientri previsti oggi
- clienti con ritardi utili per la dashboard

## Scelte progettuali

- Pattern architetturale **Service -> Hook -> UI**
- Frontend feature-based per mantenere il codice leggibile e scalabile
- Dashboard basata su endpoint aggregato `/dashboard`
- Workflow di noleggio multi-item in un’unica operazione
- Workflow di restituzione sia singolo sia bulk
- Interfaccia desktop-first coerente con un gestionale interno
- SQLite come database runtime predefinito per semplificare setup, demo e revisione tecnica
- MySQL mantenuto come opzione secondaria per dimostrazione di compatibilità

## Screenshots

Le schermate del progetto sono disponibili nella cartella:

```text
docs/screenshots/
```

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
