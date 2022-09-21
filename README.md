## ❯ Scripts and Tasks

### Installation
- Install all dependencies with `yarn install`

### Environment
- Create a `.env` file from the template `.env.example` file.
- Create database schema with name defined by `DB_NAME` in `.env`

### Database Migration

- Create migration: Replace `migration-name` with name of the migration

`typeorm migration:create ./src/database/migration/migration-name`

- Run migration

`yarn typeorm migration:run`

### Running the app
- Watch mode
`yarn dev`
- Development
`yarn start`
- Production mode
`yarn start:prod`

### Test
- Unit tests
`yarn test`
- E2E tests
`yarn test:e2e`
- Test coverage
`yarn test:cov`

### Format code
- `yarn format`
