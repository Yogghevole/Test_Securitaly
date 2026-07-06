# Project Conventions (Frontend)

Linee guida pratiche per mantenere il codice coerente, leggibile e facilmente manutenibile.

## Principi

- Semplicità > astrazione
- Coerenza > “soluzioni creative”
- Componenti piccoli ma completi (evitare micro-frammentazione)
- Logica applicativa fuori dalla UI (Service → Hook → UI)
- Riutilizzare solo ciò che è realmente condiviso

## Lingua e naming

- **File / variabili / funzioni**: in inglese
- **Testi UI e microcopy**: in italiano
- **Classi CSS**: in inglese, con prefisso pagina (es. `catalogo-page__...`)

## Struttura del frontend

Struttura reale (semplificata):

```text
src/
  components/
    common/     (UI condivisa: DvdCover, MediaListItem, StatusChip, ecc.)
    layout/     (sidebar/header/layout shell)
    rentals/    (componenti condivisi del workflow noleggi/restituzioni)
    table/      (wrappers/utility per tabelle)
    form/       (utility per drawer/form)
  pages/
    catalogo/
      CatalogoPage.tsx
      CatalogoPage.css
      components/
      hooks/
    customers/
      CustomersPage.tsx
      CustomersPage.css
      components/
      hooks/
    rental-history/
      RentalHistoryPage.tsx
      RentalHistoryPage.css
      components/
      hooks/
    dashboard/
      DashboardPage.tsx
      DashboardPage.css
      components/
      hooks/
  services/
  types/
  utils/
  router/
  constants/
  styles/
```

## Services

- I componenti non chiamano mai HTTP direttamente.
- Ogni modulo espone un service dedicato in `src/services/`:
  - `dvd.service.ts`
  - `customer.service.ts`
  - `rental.service.ts`
  - `dashboard.service.ts`

## Hooks

- La logica di pagina vive in `pages/<feature>/hooks/`.
- I componenti di pagina (orchestratori) devono essere snelli: montano UI e passano props/handler.

## Componenti

- Componenti condivisi: solo in `src/components/common` (o moduli condivisi come `components/rentals`).
- Componenti specifici di feature: in `pages/<feature>/components/`.
- Preferire **props esplicite** e componenti “a responsabilità singola”.

## Types

- I types sono raggruppati per dominio in `src/types/`.
- È consentito avere **più interfacce nello stesso file** quando sono strettamente correlate (es. payload + filtri della stessa feature).

## Routing e deep-link

- Le route sono centralizzate in `src/constants/routes.ts`.
- Per la navigazione cross-page e l’apertura di drawer/filtri si usano **query parameters** (es. `customerId=...`, `status=...`).

## Import e alias

- Usare l’alias `@/` per import dal progetto (configurato in TypeScript).
- Ordine consigliato:
  1. React / librerie
  2. Ant Design
  3. Router
  4. Imports `@/` (services/hooks/components/types/utils)
  5. CSS

## Export

- Preferire **named exports**.
- Usare file `index.ts` per re-export mirati (evitare barrel “giganti”).

## CSS

- Ogni pagina ha il proprio file CSS (`<Page>.css`) organizzato per sezioni.
- Usare Ant Design dove possibile; introdurre classi CSS solo quando serve precisione visiva o layout custom.

## Error handling

- Evitare `console.log` per segnalare problemi all’utente.
- Usare componenti/stati UI (es. `EmptyState`) e, dove appropriato, feedback Ant Design.
