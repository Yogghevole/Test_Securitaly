Applicazione
│
├── Dashboard
│     └── Monitoraggio operativo
│
├── Catalogo DVD
│     ├── Modalità Consultazione
│     └── Modalità Noleggio
│
├── Clienti
│     ├── Consultazione Clienti
│     ├── Nuovo Cliente
│     └── Dettaglio Cliente
│
└── Storico Noleggi
      ├── Modalità Consultazione
      └── Modalità Restituzione

--------------------------------------------------------------------------------------------------------------------------------------

Dashboard
│
├── Home Operativa
│
├── Card Operative
│     ├── Restituzioni previste oggi
│     │     └── Click
│     │           └── Apre Storico Noleggi filtrato sulle restituzioni odierne
│     │
│     ├── Restituzioni in ritardo
│     │     └── Click
│     │           └── Apre Storico Noleggi filtrato sui ritardi
│     │
│     └── Noleggi che richiedono attenzione
│           └── Mostra il numero totale
│
└── Timeline Attività Recenti
      ├── Mario ha noleggiato Matrix
      ├── Luca ha restituito Cars
      └── Giulia ha noleggiato Avatar

--------------------------------------------------------------------------------------------------------------------------------------

Catalogo DVD
│
├── Modalità Consultazione
│     ├── Barra di ricerca
│     ├── Filtri
│     ├── Tabella DVD
│     │     ├── Copertina
│     │     ├── Titolo
│     │     ├── Categoria
│     │     ├── Durata
│     │     └── Disponibilità
│     │
│     └── Pulsante "Nuovo Noleggio"
│
└── Modalità Noleggio
      ├── Banner "Rental Mode"
      ├── Compare la colonna con i checkbox
      ├── Selezione di uno o più DVD
      │
      ├── Alla prima selezione compare il Rental Cart
      │
      ├── Rental Cart
      │     ├── Copertina
      │     ├── Titolo
      │     ├── Rimuovi DVD
      │     └── Continua (N)
      │
      ├── Se non sono selezionati DVD il Rental Cart scompare
      │
      └── Drawer "Nuovo Noleggio"
            ├── Ricerca Cliente
            ├── Data Noleggio
            ├── Data Restituzione Prevista
            ├── Riepilogo DVD
            │     ├── Copertina
            │     ├── Titolo
            │     ├── Categoria
            │     └── Durata
            │
            └── Conferma Noleggio

--------------------------------------------------------------------------------------------------------------------------------------

Clienti
│
├── Barra di ricerca
│
├── Tabella Clienti
│
├── Click su un Cliente
│     │
│     └── Drawer Cliente
│           ├── Informazioni Cliente
│           ├── Noleggi Attivi
│           └── Storico Noleggi
│
└── Pulsante "Nuovo Cliente"
      │
      └── Drawer Nuovo Cliente
            ├── Nome
            ├── Cognome
            ├── Email
            └── Salva Cliente

--------------------------------------------------------------------------------------------------------------------------------------

Storico Noleggi
│
├── Modalità Consultazione
│     ├── Barra di ricerca
│     ├── Filtri
│     ├── Tabella Noleggi
│     │     ├── Cliente
│     │     ├── DVD
│     │     ├── Data Noleggio
│     │     ├── Restituzione Prevista
│     │     ├── Restituzione Effettiva
│     │     ├── Ritardo
│     │     └── Stato
│     │
│     ├── Stato
│     │     ├── In Regola
│     │     ├── In Scadenza
│     │     ├── In Ritardo
│     │     ├── Restituito Puntuale
│     │     └── Restituito in Ritardo
│     │
│     ├── Data Restituzione Prevista
│     │     ├── Verde
│     │     ├── Gialla
│     │     └── Rossa
│     │
│     └── Pulsante "Registra Restituzione"
│
└── Modalità Restituzione
      ├── Banner "Return Mode"
      ├── Ricerca Cliente
      ├── Visualizzazione automatica dei noleggi attivi del cliente
      ├── Selezione di uno o più DVD
      │
      ├── Alla prima selezione compare il Return Cart
      │
      ├── Return Cart
      │     ├── Copertina
      │     ├── Titolo
      │     ├── Rimuovi DVD
      │     └── Continua (N)
      │
      ├── Se non sono selezionati DVD il Return Cart scompare
      │
      └── Drawer Restituzione
            ├── Cliente
            ├── Data Restituzione
            ├── Riepilogo DVD
            │     ├── Copertina
            │     ├── Titolo
            │     ├── Categoria
            │     └── Durata
            │
            ├── Avviso Inline (solo se presenti ritardi)
            │     ├── Film restituiti in ritardo
            │     └── Numero di giorni di ritardo
            │
            └── Conferma Restituzione