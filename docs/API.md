# API REST - Gestione Noleggio DVD

## 1. Clienti
| Metodo | Endpoint       | Descrizione                          |
|--------|----------------|--------------------------------------|
| GET    | /api/clienti   | Elenca tutti i clienti               |
| POST   | /api/clienti   | Crea un nuovo cliente                |

### POST /api/clienti (esempio)
Corpo della richiesta (JSON):
```json
{
  "nome": "Mario",
  "cognome": "Rossi",
  "email": "mario.rossi@example.com"
}
```

## 2. Catalogo DVD
| Metodo | Endpoint       | Descrizione                          |
|--------|----------------|--------------------------------------|
| GET    | /api/dvds      | Elenca tutti i DVD con copie disponibili |

### GET /api/dvds (esempio risposta)
```json
[
  {
    "id": 1,
    "titolo": "Cars - Motori Ruggenti",
    "data_di_uscita": "2006-09-08",
    "categoria": "Animazione",
    "durata_minuti": 117,
    "quantita": 3,
    "copie_disponibili": 3,
    "created_at": "2026-07-01T09:40:24.000000Z",
    "updated_at": "2026-07-01T09:40:24.000000Z"
  }
]
```

## 3. Noleggi
| Metodo | Endpoint                      | Descrizione                                                           |
|--------|-------------------------------|-----------------------------------------------------------------------|
| POST   | /api/noleggi                  | Crea un nuovo noleggio (solo se DVD disponibile)                      |
| PUT    | /api/noleggi/{id}/restituisci | Segna un noleggio come restituito                                     |
| GET    | /api/noleggi                  | Elenca tutti i noleggi (con filtri opzionali: cliente_id, titolo_dvd) |

### POST /api/noleggi (esempio)
Corpo della richiesta:
```json
{
  "cliente_id": 1,
  "dvd_id": 1,
  "data_noleggio": "2026-07-01",
  "restituzione_prevista": "2026-07-08"
}
```