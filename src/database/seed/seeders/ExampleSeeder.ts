import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ExampleSeeder implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    console.log(`Running ExampleSeeder`);
  }
}
