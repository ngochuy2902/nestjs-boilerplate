## ❯ Scripts and Tasks

### Installation
- Node.js version 20.18.0
- Install all dependencies with `yarn install`

### Environment
- Create a `.env` file from the template `.env.example` file.
- Create database schema with name defined by `DB_NAME` in `.env`

### Database Migration

- Create migration: Replace `migration-name` with name of the migration

`yarn migration:create ./src/database/migration/migration-name`

- Generate migration: Replace `migration-name` with name of the migration

`yarn migration:generate ./src/database/migration/migration-name`

- Run migration

`yarn migration:run`

### Running the app
- Watch mode
  `yarn dev`
- Development
  `yarn start`
- Production mode
  `yarn start:prod`

### Docker
- Required:
  - Need to have docker installed
  - Need to create `.env` file from `.env.example` file
- Start
  `docker-compose up`
- Shutdown
  `docker-compose down`

### Test
- Unit tests
  `yarn test`
- Test coverage
  `yarn test:cov`

### Format code
- `yarn format`

### Default Account
- Super Admin
  - Username: `superadmin`
  - Password: `admin@123`
- Admin
  - Username: `admin`
  - Password: `admin@123`
- User
  - Username: `user`
  - Password: `user@123`
