Dashboard
│
├── Header
│
├── Card Operative
│     ├── Restituzioni previste oggi
│     ├── Restituzioni in ritardo
│     └── Noleggi da attenzionare
│
└── Timeline attività recenti

----------------------------------------------------------------------------------------------------------------------

Catalogo DVD
│
├── Header
│
├── Modalità Consultazione
│     ├── Barra di ricerca
│     ├── Filtri
│     └── Tabella DVD
│           ├── Copertina
│           ├── Titolo
│           ├── Categoria
│           ├── Durata
│           └── Disponibilità
│
├── Modalità Noleggio
│     ├── Banner "Rental Mode"
│     ├── Checkbox selezione DVD
│     ├── Carrello Noleggio
│     │     ├── Copertina
│     │     ├── Titolo
│     │     └── Continua
│     │
│     └── Drawer Nuovo Noleggio
│           ├── Selezione Cliente
│           ├── Data Noleggio
│           ├── Data Restituzione Prevista
│           ├── Riepilogo DVD
│           └── Conferma

----------------------------------------------------------------------------------------------------------------------

Clienti
│
├── Header
│
├── Barra di ricerca
│
├── Tabella Clienti
│
├── Drawer Cliente
│     ├── Informazioni Cliente
│     ├── Noleggi Attivi
│     └── Storico Noleggi
│
└── Drawer Nuovo Cliente
      ├── Nome
      ├── Cognome
      ├── Email
      └── Salva Cliente

----------------------------------------------------------------------------------------------------------------------

Storico Noleggi
│
├── Header
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
│     └── Stati
│           ├── In Regola
│           ├── In Scadenza
│           ├── In Ritardo
│           ├── Restituito Puntuale
│           └── Restituito in Ritardo
│
├── Modalità Restituzione
│     ├── Banner "Return Mode"
│     ├── Ricerca Cliente
│     ├── Selezione dei DVD da restituire
│     ├── Carrello Restituzione
│     │     ├── Copertina
│     │     ├── Titolo
│     │     └── Continua
│     │
│     └── Drawer Restituzione
│           ├── Cliente
│           ├── Data Restituzione
│           ├── Riepilogo DVD
│           ├── Avviso Inline (solo se presenti ritardi)
│           └── Conferma Restituzione