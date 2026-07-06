# Testing

Questa nota raccoglie le informazioni operative minime per eseguire la suite di test e le verifiche del progetto.

## Backend

La suite backend è basata su Laravel Feature Test e usa:

- `RefreshDatabase`
- SQLite in-memory in ambiente test

Configurazione rilevante in `backend/phpunit.xml`:

```xml
<env name="DB_CONNECTION" value="sqlite"/>
<env name="DB_DATABASE" value=":memory:"/>
```

### Prerequisiti PHP CLI

Le seguenti estensioni devono essere abilitate:

```text
pdo_sqlite
sqlite3
pdo_mysql
```

### Comando

```bash
cd backend
php artisan test
```

### Copertura attuale

I test aggiunti coprono i flussi principali:

- creazione noleggio multiplo
- blocco noleggio senza copie disponibili
- restituzione multipla
- calcolo `copie_disponibili` nel catalogo
- ordinamento dello storico cliente per ultima attività
- endpoint aggregato dashboard

## Frontend

Verifiche minime consigliate:

```bash
cd frontend
npm run build
npm run lint
```

## Note pratiche

- Il database applicativo usato a runtime resta MySQL.
- SQLite viene usato solo per rendere la test suite veloce e isolata.
- In ambiente Windows con PHP standalone, le estensioni SQLite si abilitano tipicamente nel `php.ini` del PHP CLI.
- Il file `backend/database/database.sqlite` può restare vuoto: nel setup corrente non viene usato né dall'app a runtime né dai test, che lavorano su `:memory:`.
