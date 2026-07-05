# PROJECT_SPEC

## DVD Rental Management System

Applicazione enterprise per la gestione del noleggio DVD.

La UX è progettata per ridurre il numero di click e mantenere i workflow coerenti.

---

# Pagine

Dashboard

Catalogo DVD

Clienti

Storico Noleggi

Non esiste una pagina Restituzioni.

Le restituzioni vengono gestite nello Storico Noleggi.

---

# Dashboard

Mostra solamente informazioni operative.

- Restituzioni previste oggi
- Restituzioni in ritardo
- Noleggi da attenzionare
- Attività recenti

Non contiene azioni operative.

---

# Catalogo DVD

Due modalità.

Browse Mode

Rental Mode

Browse Mode

- Ricerca
- Filtri
- Tabella

Rental Mode

- Banner modalità noleggio
- Checkbox
- Rental Cart
- Drawer Nuovo Noleggio

Il Rental Cart compare solo dopo aver selezionato il primo DVD.

---

# Clienti

Tabella clienti.

Click su un cliente.

Drawer con:

- informazioni
- noleggi attivi
- storico

Nuovo cliente tramite Drawer.

Mai navigare verso un'altra pagina.

---

# Storico Noleggi

Due modalità.

Browse Mode

Return Mode

Return Mode

- Banner
- Ricerca cliente
- Return Cart
- Drawer Restituzione

Workflow identico al Catalogo.

---

# Workflow

## Noleggio

Catalogo

↓

Modalità Noleggio

↓

Rental Cart

↓

Drawer

↓

Conferma

---

## Restituzione

Storico

↓

Modalità Restituzione

↓

Return Cart

↓

Drawer

↓

Conferma

I due workflow devono risultare praticamente identici.

---

# UX

Ogni pagina deve rispondere ad una sola domanda.

Dashboard

Cosa richiede attenzione oggi?

Catalogo

Quali DVD posso noleggiare?

Clienti

Chi sono i clienti?

Storico

Qual è la situazione di ogni noleggio?

---

# Design

Utilizzare esclusivamente Ant Design.

Desktop First.

Light Theme.

UI minimale.

Ridurre il numero di click.

Ridurre il carico cognitivo.

Non duplicare funzionalità.

Progettare prima il workflow, poi la UI.