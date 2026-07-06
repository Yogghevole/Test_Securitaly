# Database Schema - Gestione Noleggio DVD

## Tabelle

### Clienti
| Campo         | Tipo         | Descrizione                          |
|---------------|--------------|--------------------------------------|
| id            | BIGINT       | Chiave primaria                      |
| nome          | VARCHAR(255) | Nome cliente                         |
| cognome       | VARCHAR(255) | Cognome cliente                      |
| email         | VARCHAR(255) | Email cliente (unica)                |
| created_at    | TIMESTAMP    | Data creazione                       |
| updated_at    | TIMESTAMP    | Data ultima modifica                 |

### DVDs
| Campo             | Tipo               | Descrizione                          |
|-------------------|--------------------|--------------------------------------|
| id                | BIGINT             | Chiave primaria                      |
| titolo            | VARCHAR(255)       | Titolo del DVD                       |
| data_di_uscita    | DATE               | Data di uscita                       |
| categoria         | VARCHAR(100)       | Categoria (es. Azione, Commedia)     |
| durata_minuti     | INT                | Durata in minuti                     |
| quantita          | INT                | Numero totale di copie disponibili   |
| cover_path        | VARCHAR(255) NULL  | Path relativo della copertina (es. `/covers/avatar.jpg`) |
| created_at        | TIMESTAMP          | Data creazione                       |
| updated_at        | TIMESTAMP          | Data ultima modifica                 |

### Noleggi
| Campo                 | Tipo               | Descrizione                          |
|-----------------------|--------------------|--------------------------------------|
| id                    | BIGINT             | Chiave primaria                      |
| cliente_id            | BIGINT             | Chiave esterna a Clienti             |
| dvd_id                | BIGINT             | Chiave esterna a DVDs                |
| data_noleggio         | DATE               | Data inizio noleggio                 |
| restituzione_prevista | DATE               | Data prevista per la restituzione    |
| restituzione_effettiva| DATE NULL          | Data effettiva restituzione (NULL = non ancora restituito) |
| created_at            | TIMESTAMP          | Data creazione                       |
| updated_at            | TIMESTAMP          | Data ultima modifica                 |

## Relazioni
- **Clienti 1:N Noleggi**: Un cliente può fare più noleggi
- **DVDs 1:N Noleggi**: Un DVD può essere noleggiato più volte
- **Nota**: Copie disponibili = `quantita` - numero di noleggi attivi (dove `restituzione_effettiva IS NULL`)

---

## Motore Database

Il progetto usa **SQLite** come configurazione runtime predefinita tramite la configurazione Laravel standard.

- La connessione usata dall’applicazione è determinata da `DB_CONNECTION` nel file `.env`.
- Il setup raccomandato del repository usa `DB_CONNECTION=sqlite`.
- Il file `backend/database/database.sqlite` contiene il database locale dell'applicazione.
- Durante i test automatici Laravel usa SQLite **in-memory**, quindi i dati della test suite non vengono salvati in quel file.
- MySQL resta disponibile come configurazione alternativa solo per dimostrazione o validazione su RDBMS server-based.

Nota: evitare di committare credenziali reali nel repository; usare placeholder o variabili d’ambiente locali.
