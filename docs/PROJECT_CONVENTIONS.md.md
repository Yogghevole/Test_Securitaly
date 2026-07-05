# Frontend Development Guidelines

## Filosofia del progetto

Questo progetto è una prova tecnica sviluppata con **React + TypeScript**, **Ant Design** e backend **Laravel 13** già funzionante.

L'obiettivo è realizzare un'applicazione enterprise semplice, pulita e facilmente manutenibile.

### Principi fondamentali

- Semplicità > Astrazione
- Leggibilità > Clever Code
- Coerenza > Fantasia
- Componenti piccoli > Componenti enormi
- Riutilizzare solo quando ha realmente senso
- Evitare qualsiasi over-engineering

L'obiettivo non è creare il progetto più complesso possibile, ma quello più pulito e professionale.

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

# Convenzioni di Naming

## Componenti

Sempre PascalCase.

```text
MovieTable.tsx
RentalDrawer.tsx
StatusTag.tsx
```

Mai:

```text
movieTable.tsx
movie-table.tsx
```

---

## Hooks

Sempre:

```text
useMovies.ts
useCustomers.ts
useRentals.ts
useDebounce.ts
```

---

## Services

Sempre:

```text
movie.service.ts
customer.service.ts
rental.service.ts
```

---

## Types

Sempre:

```text
movie.ts
customer.ts
rental.ts
```

Ogni file esporta una singola interfaccia.

Esempio:

```ts
export interface Movie {

}
```

---

## Utils

Sempre camelCase.

```text
date.ts
delay.ts
status.ts
availability.ts
```

---

# Organizzazione dei Componenti

Ogni componente segue sempre questa struttura.

```text
Imports

↓

Types

↓

Component

↓

State

↓

Effects

↓

Handlers

↓

Return

↓

Export
```

Mai logica sparsa.

---

# Props

Usare sempre una interface.

```ts
interface MovieTableProps {

}
```

Mai:

```ts
type Props
```

---

# Export

Usare sempre:

```ts
export default
```

---

# Ordine degli Import

Seguire sempre questo ordine.

```text
React

↓

Ant Design

↓

React Router

↓

Services

↓

Hooks

↓

Components

↓

Types

↓

Utils

↓

CSS
```

---

# Cartelle

Massimo tre livelli di profondità.

Corretto:

```text
components/
    catalog/
        MovieTable.tsx
```

Da evitare:

```text
components/
    catalog/
        table/
            movie/
                MovieTable.tsx
```

---

# Responsabilità dei Componenti

Ogni componente deve avere una sola responsabilità.

Esempio:

MovieTable

- mostra la tabella
- non apre Drawer
- non chiama API
- non salva dati

---

# Chiamate API

Le API non vengono mai chiamate direttamente nei componenti.

Il flusso è sempre:

```text
Component

↓

Hook

↓

Service

↓

Axios
```

---

# Ordine interno del componente

Seguire sempre questo ordine.

```text
Constants

↓

State

↓

Hooks

↓

Memo

↓

Effects

↓

Handlers

↓

Return
```

---

# Handler

Utilizzare sempre nomi descrittivi.

```ts
handleCreateRental()

handleReturnMovie()

handleSearch()
```

Mai:

```ts
onClick1()
```

---

# CSS

Utilizzare Ant Design il più possibile.

Le classi CSS devono essere usate solo quando realmente necessarie.

---

# Tabelle

Le colonne vengono sempre dichiarate fuori dal return.

Corretto:

```tsx
const columns = [...]
```

Da evitare:

```tsx
<Table columns={[...]} />
```

---

# Drawer

Sempre controllati tramite stato locale.

```ts
const [open, setOpen] = useState(false)
```

---

# Form

Utilizzare sempre Ant Design Form.

Mai form HTML.

---

# Gestione Date

Utilizzare esclusivamente Dayjs.

Mai usare direttamente:

```ts
new Date()
```

---

# Costanti

Mai utilizzare stringhe hardcoded.

Corretto:

```ts
ROUTES.CUSTOMERS
```

Da evitare:

```ts
"/customers"
```

---

# Error Handling

Mai utilizzare:

```ts
console.log()
```

Per notificare errori all'utente.

Utilizzare invece:

```ts
message.error()

notification.error()
```

---

# TODO

Sempre:

```ts
// TODO:
```

---

# Commenti

I commenti devono spiegare **perché** è stata fatta una scelta.

Mai descrivere codice ovvio.

---

# Git

Ogni fase termina con un commit.

Messaggi consigliati.

```text
feat(catalog): add rental mode

feat(customers): implement customer drawer

feat(rentals): implement return workflow

fix(layout): improve sidebar interaction

refactor(common): simplify status tag
```

---

# Regola dei 250

Nessun file dovrebbe superare circa **250 righe**.

Se un file cresce troppo bisogna valutare di:

- estrarre componenti
- estrarre hook
- estrarre utility

Le pagine orchestrano.

I componenti visualizzano.

Gli hook gestiscono la logica.

I service comunicano con il backend.

---

# Principi di Architettura

Il backend Laravel è già disponibile.

Il frontend segue sempre questo flusso.

```text
Component

↓

Hook

↓

Service

↓

Axios

↓

Laravel API
```

Mai bypassare questa struttura.

---

# Prompt Standard per Trae

Ogni prompt dovrà terminare con queste istruzioni.

```text
Before writing code:

Think carefully about the architecture.

Do not over-engineer.

Prefer simple solutions.

Keep components small.

Respect the existing project structure.

Reuse existing code before creating new files.

The project must compile at the end.

There must be no TypeScript errors.

There must be no ESLint errors.

Do not continue beyond the requested tasks.
```

---

# Obiettivo Finale

L'obiettivo è costruire un'applicazione che sembri sviluppata da un piccolo team professionale.

Ogni decisione deve privilegiare:

- chiarezza
- semplicità
- manutenibilità
- coerenza

piuttosto che complessità o astrazioni premature.