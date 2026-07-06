# ROADMAP — DVD Rental Management System

Roadmap sintetica e aggiornata allo stato attuale del repository. L’obiettivo è mantenere una checklist utile e credibile, non una lista “ideale”.

## Fase 1: Setup Ambiente ✅
- [x] Struttura repository
- [x] Backend Laravel inizializzato
- [x] Frontend React + TypeScript (Vite) inizializzato
- [x] Documentazione base

---

## Fase 2: Backend Laravel ✅
- [x] Migrazioni e modelli (`clienti`, `dvds`, `noleggi`)
- [x] Controller API (catalogo, clienti, noleggi, dashboard)
- [x] Validazione input su operazioni critiche (noleggi e restituzioni)
- [x] Seeder completi per dati demo coerenti

---

## Fase 3: Bootstrap Frontend ✅
- [x] Pulizia template Vite
- [x] Router applicazione
- [x] Service layer (Axios) + types
- [x] Layout principale (sidebar/header/content)

---

## Fase 4: Design System ✅
- [x] Sidebar (expand/collapse)
- [x] Header e wrapper pagina
- [x] Stili globali + layout desktop-first
- [x] Componenti UI coerenti (tabelle, empty state, search)

---

## Fase 5: API Layer ✅
- [x] `dvd.service.ts`
- [x] `customer.service.ts`
- [x] `rental.service.ts` (multi-rental + bulk returns)
- [x] `dashboard.service.ts` (endpoint aggregato)
- [x] Hook per feature (`useDashboard`, `useRentalHistory`, `useReturnWorkflow`, ecc.)

---

## Fase 6: Componenti Condivisi ✅
- [x] Media components (`DvdCover`, `MediaListItem`)
- [x] UI components (`StatusChip`, `StatCard`, `AppTable`, `SearchBar`, `EmptyState`)
- [x] Pattern “Service → Hook → UI” applicato alle pagine

---

## Fase 7: Catalogo DVD ✅
- [x] Ricerca e filtri
- [x] Indicatori disponibilità
- [x] Workflow noleggio (rental mode, carrello, drawer, conferma)

---

## Fase 8: Clienti ✅
- [x] Ricerca + tabella
- [x] Drawer dettagli (noleggi attivi + storico)
- [x] Creazione e modifica cliente
- [x] Deep-link da dashboard (apertura drawer via query param)

---

## Fase 9: Storico Noleggi ✅
- [x] Ricerca e filtri stato
- [x] Calcolo stato/ritardo in UI
- [x] Workflow restituzione (return mode, carrello, drawer, conferma)
- [x] Restituzione multipla (bulk)

---

## Fase 10: Dashboard ✅
- [x] Rientri previsti oggi
- [x] Clienti che richiedono attenzione (ritardi)
- [x] Navigazione diretta alle pagine correlate (storico/clienti)

---

## Fase 11: Responsive & Polish
- [x] Desktop
- [ ] Tablet
- [ ] Mobile
- [ ] Rifiniture UX (micro-interazioni, spaziature, accessibilità)

---

## Fase 13: Testing
- [x] Test feature dei workflow principali (noleggio/restituzione)
- [x] Test API mirati (disponibilità DVD, transazioni, bulk returns)

---

## Fase 14: Documentazione
- [x] README
- [x] Documentazione tecnica (API/Architettura/DB/User Flow)
- [x] Screenshot applicazione
- [x] Revisione finale e allineamento continuo docs ↔ codice
