# API Specification
## DVD Rental Management System

Versione: 1.0

Questo documento definisce le API utilizzate dal frontend React.

Il backend Laravel rappresenta la fonte di verità dell'applicazione.

Il frontend non deve effettuare trasformazioni, filtri o ricerche che possono essere eseguite dal backend.

---

# Convenzioni

Base URL

/api

Formato

application/json

Tutte le date vengono restituite in formato ISO.

---

# DVD

## GET /dvds

Restituisce il catalogo dei DVD.

Supporta filtri opzionali.

Query Parameters

search

Ricerca nel titolo.

categoria

Filtra per categoria.

available

true | false

Mostra solamente DVD disponibili.

order

title

release_date

category

Response

[
    {
        "id": 1,
        "titolo": "Matrix",
        "categoria": "Fantascienza",
        "durata_minuti": 136,
        "quantita": 3,
        "copie_disponibili": 2,
        "data_di_uscita": "1999-03-31"
    }
]

---

## GET /dvds/{id}

Dettaglio singolo DVD.

Utilizzato solamente quando necessario.

---

# Clienti

## GET /clienti

Elenco clienti.

Supporta:

search

Ricerca per:

nome

cognome

email

Response

[
    {
        "id":1,
        "nome":"Mario",
        "cognome":"Rossi",
        "email":"...",
        "active_rentals":2
    }
]

active_rentals è calcolato dal backend.

---

## GET /clienti/{id}

Dettaglio completo cliente.

Response

{
    "cliente":{

    },

    "active_rentals":[

    ],

    "rental_history":[

    ]
}

Questo endpoint alimenta il Drawer Cliente.

---

## POST /clienti

Creazione cliente.

Body

{
    "nome":"",
    "cognome":"",
    "email":""
}

---

# Noleggi

## GET /noleggi

Supporta filtri.

Query Parameters

cliente_id

dvd_id

status

search

date_from

date_to

Response

[
    {
        "id":1,

        "cliente":{},

        "dvd":{},

        "data_noleggio":"",

        "restituzione_prevista":"",

        "restituzione_effettiva":"",

        "status":"OVERDUE",

        "delay_days":4
    }
]

Lo status viene calcolato dal backend.

Delay viene calcolato dal backend.

Il frontend non deve eseguire questi calcoli.

---

## POST /noleggi

Creazione di uno o più noleggi.

Body

{
    "cliente_id":1,

    "dvd_ids":[
        3,
        5,
        7
    ],

    "data_noleggio":"",

    "restituzione_prevista":""
}

Il backend crea un record per ogni DVD.

Restituisce i noleggi creati.

---

## PUT /noleggi/{id}/restituisci

Registra una restituzione.

Body

{
    "data_restituzione":""
}

Il backend:

- aggiorna la data
- calcola eventuale ritardo
- restituisce il noleggio aggiornato

---

# Dashboard

## GET /dashboard

Restituisce esclusivamente dati operativi.

Response

{
    "returns_today":3,

    "late_returns":2,

    "need_attention":5,

    "recent_activity":[

    ]
}

La Dashboard effettua una sola chiamata HTTP.

---

# Filosofia

Il backend è responsabile di:

✓ Filtri

✓ Ricerca

✓ Calcolo disponibilità

✓ Stato noleggio

✓ Giorni di ritardo

✓ Noleggi attivi

✓ Ordinamenti

Il frontend è responsabile solamente di:

✓ Visualizzazione

✓ Workflow

✓ Gestione stato UI

✓ Esperienza utente

Il frontend non deve duplicare logica già presente nel backend.
