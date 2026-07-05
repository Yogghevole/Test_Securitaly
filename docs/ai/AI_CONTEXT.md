# AI_CONTEXT

## Obiettivo

Stiamo sviluppando una DVD Rental Management System come progetto per un colloquio tecnico.

L'obiettivo NON è realizzare un semplice CRUD, ma un'applicazione enterprise pulita, coerente e facilmente estendibile.

Prima di implementare qualsiasi funzionalità consulta sempre questo documento e PROJECT_SPEC.md.

---

# Stack

Frontend

- React
- TypeScript
- Vite
- Ant Design
- React Router
- Axios

Backend

- Laravel
- MySQL

---

# Lingua

Tutto ciò che vede l'utente deve essere in italiano.

Esempi:

Dashboard

Catalogo DVD

Clienti

Storico Noleggi

Nuovo Noleggio

Registra Restituzione

I nomi tecnici del codice possono rimanere in inglese.

---

# Architettura

Seguire questa struttura.

src/

components/

common/

layout/

table/

form/

pages/

services/

hooks/

constants/

types/

utils/

layouts/

styles/

---

# Convenzioni

Un componente deve avere una sola responsabilità.

Preferire componenti piccoli.

Preferire composizione invece di componenti enormi.

Non duplicare codice.

Riutilizzare sempre i componenti condivisi.

---

# Services

I Services devono solamente effettuare chiamate HTTP.

Non devono contenere:

- filtri
- ordinamenti
- map
- find
- logica UI

Devono essere uno specchio delle API Laravel.

---

# Hooks

Gli Hook gestiscono:

- loading
- error
- chiamate ai services
- stato locale

Non effettuano rendering.

---

# Componenti

Preferire sempre componenti condivisi.

Ad esempio:

PageContainer

AppPageHeader

AppTable

SearchBar

DrawerFooter

EmptyState

---

# Layout

Application Shell già completata.

Sidebar definitiva già completata.

Header già completato.

Non modificare il Layout salvo richiesta esplicita.

---

# Design System

Framework:

Ant Design

Tema:

Light

Primary

#1677FF

Background

#F5F7FA

Cards

Bianco

Border Radius

10-12px

Shadow

Molto leggere

Font

Inter

Desktop First

Responsive successivamente.

---

# Coding Style

Utilizzare TypeScript.

Mai utilizzare any.

Commenti solo quando realmente utili.

Preferire funzioni semplici.

Preferire export object ai service.

---

# Barrel Export

Utilizzare index.ts per:

components

services

hooks

Non utilizzare barrel export per constants.

---

# Commit

Ogni milestone deve essere autonoma.

Al termine di ogni milestone:

- progetto compilabile
- TypeScript OK
- ESLint OK

Non implementare mai funzionalità appartenenti alla milestone successiva.

---

# Filosofia

Prima progettare.

Poi implementare.

Non anticipare codice.

Non aggiungere funzionalità non richieste.

Mantenere il codice semplice, leggibile e facilmente estendibile.