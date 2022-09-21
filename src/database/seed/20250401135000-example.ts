import { dataSource } from '../data-source';
import ExampleSeeder from './seeders/ExampleSeeder';

(async () => {
  await dataSource.initialize();
  const seeder = new ExampleSeeder();
  await seeder.run(dataSource, {} as any);
  await dataSource.destroy();
})();
