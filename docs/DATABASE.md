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
| Campo             | Tipo         | Descrizione                          |
|-------------------|--------------|--------------------------------------|
| id                | BIGINT       | Chiave primaria                      |
| titolo            | VARCHAR(255) | Titolo del DVD                       |
| data_di_uscita    | DATE         | Data di uscita                       |
| categoria         | VARCHAR(100) | Categoria (es. Azione, Commedia)     |
| durata_minuti     | INT          | Durata in minuti                     |
| quantita          | INT          | Numero totale di copie disponibili   |
| created_at        | TIMESTAMP    | Data creazione                       |
| updated_at        | TIMESTAMP    | Data ultima modifica                 |

### Noleggi
| Campo                 | Tipo         | Descrizione                          |
|-----------------------|--------------|--------------------------------------|
| id                    | BIGINT       | Chiave primaria                      |
| cliente_id            | BIGINT       | Chiave esterna a Clienti             |
| dvd_id                | BIGINT       | Chiave esterna a DVDs                |
| data_noleggio         | DATE         | Data inizio noleggio                 |
| restituzione_prevista | DATE         | Data prevista per la restituzione    |
| restituzione_effettiva| DATE NULL    | Data effettiva restituzione (NULL = non ancora restituito) |
| created_at            | TIMESTAMP    | Data creazione                       |
| updated_at            | TIMESTAMP    | Data ultima modifica                 |

## Relazioni
- **Clienti 1:N Noleggi**: Un cliente può fare più noleggi
- **DVDs 1:N Noleggi**: Un DVD può essere noleggiato più volte
- **Nota**: Copie disponibili = `quantita` - numero di noleggi attivi (dove `restituzione_effettiva IS NULL`)