# API — DVD Rental Management System

Questo documento descrive le API REST esposte dal backend Laravel e utilizzate dalla SPA React.

## Convenzioni

- **Base URL**: `/api`
- **Formato**: `application/json`
- **Date**: `YYYY-MM-DD` per i campi data (coerente con i tipi Laravel `date`)

## DVD

### GET `/dvds`

Restituisce l’intero catalogo DVD. Ogni record include anche `copie_disponibili` calcolato lato backend.

**Response (200)**

```json
[
  {
    "id": 1,
    "titolo": "Matrix",
    "categoria": "Fantascienza",
    "durata_minuti": 136,
    "quantita": 3,
    "copie_disponibili": 2,
    "data_di_uscita": "1999-03-31",
    "cover_path": "/covers/matrix.jpg"
  }
]
```

## Clienti

### GET `/clienti`

Elenco clienti. Supporta ricerca testuale.

**Query parameters**
- `search`: ricerca su `nome`, `cognome`, `email`

**Response (200)**

```json
[
  {
    "id": 1,
    "nome": "Mario",
    "cognome": "Rossi",
    "email": "mario.rossi@example.com",
    "active_rentals": 2
  }
]
```

### GET `/clienti/{id}`

Dettaglio cliente usato dal drawer (cliente + noleggi attivi + storico).

**Response (200)**

```json
{
  "cliente": {},
  "active_rentals": [],
  "rental_history": []
}
```

### POST `/clienti`

Crea un cliente.

**Body**

```json
{
  "nome": "Mario",
  "cognome": "Rossi",
  "email": "mario.rossi@example.com"
}
```

### PUT `/clienti/{id}`

Aggiorna i dati anagrafici del cliente.

**Body**

```json
{
  "nome": "Mario",
  "cognome": "Rossi",
  "email": "mario.rossi@example.com"
}
```

## Noleggi

### GET `/noleggi`

Elenco noleggi con relazioni `cliente` e `dvd`. Include anche `is_attivo` calcolato lato backend.

**Query parameters**
- `cliente_id`: filtra per cliente
- `titolo_dvd`: filtra per titolo DVD (parziale)

**Response (200)**

```json
[
  {
    "id": 1,
    "cliente": {},
    "dvd": {},
    "data_noleggio": "2026-07-01",
    "restituzione_prevista": "2026-07-08",
    "restituzione_effettiva": null,
    "is_attivo": true
  }
]
```

### POST `/noleggi`

Crea uno o più noleggi. Il backend genera un record per ogni DVD richiesto (workflow multi-rental).

**Body (multi)**

```json
{
  "cliente_id": 1,
  "dvd_ids": [3, 5, 7],
  "data_noleggio": "2026-07-01",
  "restituzione_prevista": "2026-07-08"
}
```

**Body (singolo)**

```json
{
  "cliente_id": 1,
  "dvd_id": 3,
  "data_noleggio": "2026-07-01",
  "restituzione_prevista": "2026-07-08"
}
```

**Response (201)**

```json
[
  {
    "id": 10,
    "cliente": {},
    "dvd": {},
    "data_noleggio": "2026-07-01",
    "restituzione_prevista": "2026-07-08",
    "restituzione_effettiva": null,
    "is_attivo": true
  }
]
```

### PUT `/noleggi/{id}/restituisci`

Registra la restituzione di un singolo noleggio. La data viene impostata automaticamente a **oggi** lato backend.

**Response (200)**

```json
{
  "id": 10,
  "cliente": {},
  "dvd": {},
  "restituzione_effettiva": "2026-07-06",
  "is_attivo": false
}
```

### POST `/noleggi/restituzioni`

Registra una **restituzione multipla** (bulk) per più noleggi.

**Body**

```json
{
  "noleggio_ids": [10, 11, 12],
  "data_restituzione": "2026-07-06"
}
```

**Response (200)**

```json
[
  {
    "id": 10,
    "restituzione_effettiva": "2026-07-06",
    "is_attivo": false
  }
]
```

## Dashboard

### GET `/dashboard`

Endpoint aggregato: una singola chiamata per alimentare la dashboard.

**Response (200)**

```json
{
  "today_returns": [],
  "need_attention": [
    {
      "customer": {},
      "max_delay_days": 3,
      "overdue_rentals_count": 2
    }
  ]
}
```

## Note di implementazione

- Alcune funzionalità (filtri UI, calcoli di stato/ritardo) sono gestite lato frontend per migliorare la reattività. Dove possibile, la logica “di dominio” rimane centralizzata nel backend.
- La suite di test backend usa SQLite in-memory; il database applicativo usato a runtime resta MySQL.
