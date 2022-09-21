## ❯ Scripts and Tasks

### Installation
- Node.js version 20.18.0
- Install all dependencies with `yarn install`

### Environment
- Create a `.env` file from the template `.env.example` file.
- Create database schema with name defined by `DB_NAME` in `.env`

### Database Migration

- Create migration: Replace `migration-name` with name of the migration

`yarn migration:create migration-name`

- Generate migration: Replace `migration-name` with name of the migration

`yarn migration:generate migration-name`

- Run migration
  - Development env

  `yarn migration:run`

  - Production env

  `yarn migration:runprod`

### Seed
- Create seed:  Create a seed file in `src/database/seed` folder and seeder class in `src/database/seed/seeders` should implement `Seeder` interface
- Run seed development env: Replace `seeder-name` with name of seed file

`yarn seed seeder-name`

- Run seed production env: Replace `seeder-name` with name of seed file

`yarn seedprod seeder-name`

### Running the app
- Development mode
  `yarn dev`
- Production mode
  `yarn start:prod`

### Docker
- Start development stage
  `docker-compose up -d --build`
- Start production stage
  `TARGET=production docker-compose up -d --build`
- Shutdown
  `docker-compose down`

### Test
- Unit tests
  `yarn test`
- Test coverage
  `yarn test:cov`

### Format code
- `yarn lint`
- `yarn format`

### Default Account
- Super Admin
  - Username: `superadmin@mail.com`
  - Password: `admin@123`
- Admin
  - Username: `admin@mail.com`
  - Password: `admin@123`
- User
  - Username: `user@mail.com`
  - Password: `user@123`
