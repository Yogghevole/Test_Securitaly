# DVD Rental Management System

## Project Architecture

Questo documento descrive l'architettura generale del frontend, l'organizzazione del codice e la roadmap di sviluppo.

L'obiettivo è mantenere un progetto pulito, modulare e facilmente manutenibile.

---

# Stack Tecnologico

## Frontend

- React
- TypeScript
- Vite
- React Router
- Ant Design
- Axios
- Dayjs

## Backend

- Laravel 13
- PHP ^8.3
- Database runtime: MySQL (configurabile via `.env`)
- Database test suite: SQLite in-memory (`phpunit.xml`)

---

# Architettura

Il frontend segue una struttura a livelli.

```text
UI Components

↓

Hooks

↓

Services

↓

Axios

↓

Laravel API
```

Ogni livello ha una responsabilità precisa.

---

# Struttura del progetto

```text
src/
│
├── assets/
│
├── components/
│   ├── common/
│   ├── form/
│   ├── layout/
│   ├── rentals/
│   └── table/
│
├── config/
├── constants/
├── lib/
├── pages/
├── router/
├── services/
├── styles/
├── types/
├── utils/
│
├── App.tsx
└── main.tsx
```

---

# Struttura delle Pages

```text
pages/
dashboard/
  DashboardPage.tsx
  components/
  hooks/

catalogo/
  CatalogoPage.tsx
  components/
  hooks/

customers/
  CustomersPage.tsx
  components/
  hooks/

rental-history/
  RentalHistoryPage.tsx
  components/
  hooks/

DashboardPage.tsx        (re-export)
CatalogoPage.tsx         (re-export)
ClientiPage.tsx          (re-export)
RentalHistoryPage.tsx    (re-export)
NotFoundPage.tsx
```

Ogni pagina rappresenta una funzionalità principale dell'applicazione.

---

# Layout

L'intera applicazione utilizza un unico MainLayout.

```text
MainLayout

├── Sidebar

├── Header

└── Content
```

Le pagine vengono renderizzate all'interno del Content.

---

# Sidebar

La Sidebar utilizza due stati.

## Expanded

```text
[Logo] DVD Rental                          [Collapse]
```

## Collapsed

```text
[Logo]
```

Quando il mouse passa sopra il logo:

```text
Logo

↓

Expand Button
```

Con una transizione fade di circa 300ms.

---

# Routing

```text
/

↓

Dashboard

/catalogo

↓

DVD Catalog

/clienti

↓

Customers

/storico-noleggi

↓

Rental History
```

Le route sono centralizzate in:

```text
constants/routes.ts
```

---

# Services

I Services comunicano con Laravel.

```text
dvd.service.ts
customer.service.ts
rental.service.ts
dashboard.service.ts
```

I componenti non effettuano mai chiamate HTTP direttamente.

---

# Testing

## Backend

La suite backend usa `RefreshDatabase` con configurazione di test su SQLite in-memory.

Prerequisiti minimi nel PHP CLI:

```text
pdo_sqlite
sqlite3
```

Comando:

```bash
php artisan test
```

## Frontend

Verifiche consigliate prima della consegna:

```bash
npm run build
npm run lint
```

---

# Hooks

I Custom Hook gestiscono la logica di comunicazione con i Services.

```text
useDashboard()
useCustomerDrawer()
useRentalHistory()
useReturnWorkflow()
```

---

# Utils

Funzioni riutilizzabili.

```text
filterDvds.ts
formatDuration.ts
getAvailabilityStatus.ts
getCoverUrl.ts
components/rentals/rentalStatus.ts
```

---

# Types

```text
Dvd.ts
Cliente.ts
Noleggio.ts
Dashboard.ts
```

I types sono raggruppati per dominio. È consentito includere più interfacce nello stesso file quando sono strettamente correlate (es. payload + filtri della stessa feature).

---

# Costanti

```text
routes.ts

status.ts

colors.ts
```

---

# User Flow

## Dashboard

Dashboard

↓

Monitoraggio operativo

↓

Accesso alle sezioni principali

---

## DVD Catalog

Browse Mode

↓

New Rental

↓

Rental Mode

↓

Selezione DVD

↓

Rental Cart

↓

Rental Drawer

↓

Conferma

↓

API Laravel

---

## Customers

Lista Clienti

↓

Customer Drawer

↓

Storico

↓

Noleggi Attivi

oppure

↓

Nuovo Cliente

↓

Drawer

↓

Salvataggio

---

## Rental History

Browse Mode

↓

Register Return

↓

Return Mode

↓

Ricerca Cliente

↓

Selezione DVD

↓

Return Cart

↓

Return Drawer

↓

Conferma

↓

API Laravel

---

# Modalità dell'applicazione

L'applicazione utilizza sempre due modalità.

## Browse Mode

Consultazione dati.

Interfaccia pulita.

Nessun controllo temporaneo.

---

## Action Mode

Operazioni.

Visualizza:

- Banner
- Checkbox
- Cart
- Drawer
- Pulsanti di conferma

Terminata l'operazione, l'interfaccia torna automaticamente in Browse Mode.

---

# Componenti Principali

## Dashboard

- DashboardTodayReturns
- DashboardNeedAttention

---

## Catalog

- CatalogTable
- CatalogToolbar
- RentalCart
- RentalDrawer

---

## Customers

- CustomerTable
- CustomerDrawer
- CustomerForm

---

## Rental History

- RentalHistoryTable
- RentalHistoryToolbar
- ReturnModeBanner
- ReturnCart
- ReturnDrawer
- RentalDetailDrawer

---

# Comunicazione con il Backend

Il backend espone quattro moduli principali.

## Clienti

- elenco
- creazione

---

## DVD

- elenco

---

## Noleggi

- elenco
- creazione
- restituzione

Il noleggio multiplo avviene con una singola `POST /noleggi` che invia `dvd_ids`: il backend crea più record in transazione e restituisce l’elenco dei noleggi creati.

La restituzione multipla avviene tramite `POST /noleggi/restituzioni` (bulk), mentre la restituzione singola usa `PUT /noleggi/{id}/restituisci`.

---

## Dashboard

- endpoint aggregato `GET /dashboard` per alimentare la home operativa con una sola chiamata.
