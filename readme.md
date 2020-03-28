Backend da aplicação desenvolvida na 11 semana omnistack da rocketseat. 
A aplicação é um sistema para ongs cadastrarem ações nas quais precisam de ajuda das pessoas.

### Run project:

```
npm start
```

### KNEX:

-   Create new DB migration

```
npx knex mirate:make migration_name
```

-   Exec migrations

```
npx knex migrate:latest
```

-   Rollback last migration

```
npx knex migrate:rollback
```

-   Migrations status

```
npx knex migrate:status
```

### Run tests:

```
npm test
```
