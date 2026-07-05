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
- PHP 8.5+
- MySQL 8

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
│   ├── catalog/
│   ├── common/
│   ├── customers/
│   ├── dashboard/
│   ├── layout/
│   └── rentals/
│
├── config/
├── constants/
├── hooks/
├── layouts/
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

Dashboard.tsx

Catalog.tsx

Customers.tsx

RentalHistory.tsx

NotFound.tsx
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

/catalog

↓

DVD Catalog

/customers

↓

Customers

/rentals

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
movie.service.ts

customer.service.ts

rental.service.ts
```

I componenti non effettuano mai chiamate HTTP direttamente.

---

# Hooks

I Custom Hook gestiscono la logica di comunicazione con i Services.

```text
useMovies()

useCustomers()

useRentals()

useDebounce()
```

---

# Utils

Funzioni riutilizzabili.

```text
date.ts

delay.ts

status.ts

availability.ts
```

---

# Types

```text
movie.ts

customer.ts

rental.ts
```

Ogni file contiene una sola interfaccia.

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

- AttentionCard
- ActivityTimeline

---

## Catalog

- MovieTable
- MovieFilters
- RentalBanner
- RentalCart
- RentalDrawer

---

## Customers

- CustomerTable
- CustomerDrawer
- CustomerForm

---

## Rental History

- RentalTable
- ReturnBanner
- ReturnCart
- ReturnDrawer
- DelayTag

---

# Comunicazione con il Backend

Il backend espone tre moduli.

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

Il frontend implementa il noleggio multiplo effettuando automaticamente più chiamate consecutive al backend, mantenendo un'esperienza utente unificata.

Lo stesso approccio viene utilizzato per la restituzione multipla.

---

# Roadmap

## Fase 1

Bootstrap

- Router
- Axios
- Layout base

---

## Fase 2

Design System

- Sidebar
- Header
- Layout definitivo

---

## Fase 3

API Layer

- Services
- Hooks

---

## Fase 4

Componenti comuni

---

## Fase 5

Dashboard

---

## Fase 6

DVD Catalog

### 6.1 Browse Mode

### 6.2 Rental Mode

### 6.3 Rental Cart

### 6.4 Rental Drawer

---

## Fase 7

Customers

### 7.1 Table

### 7.2 Drawer

### 7.3 Form

---

## Fase 8

Rental History

### 8.1 Browse Mode

### 8.2 Return Mode

### 8.3 Return Cart

### 8.4 Return Drawer

### 8.5 Delay Status

---

## Fase 9

Responsive

---

## Fase 10

Refactoring

---

## Fase 11

Testing

---

## Fase 12

Documentazione

---

# Obiettivi del Progetto

Il progetto deve dare l'impressione di essere stato sviluppato da un piccolo team professionale.

Ogni scelta progettuale deve privilegiare:

- semplicità
- coerenza
- leggibilità
- manutenibilità
- esperienza utente

piuttosto che complessità o astrazioni inutili.

L'obiettivo finale è ottenere un'applicazione enterprise pulita, coerente e facilmente estendibile.