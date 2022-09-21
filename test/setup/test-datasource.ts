import * as process from 'process';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

import { MySqlContainer } from '@testcontainers/mysql';

jest.setTimeout(180000);

export async function createTestDataSource() {
  const container = await new MySqlContainer('mysql:8.0.41')
    .withDatabase('container_db')
    .withExposedPorts(3306)
    .withUsername('container_user')
    .withRootPassword('container_root_password')
    .withUserPassword('container_password')
    .start();

  const dataSourceOptions = {
    type: 'mysql' as const,
    host: container.getHost(),
    port: container.getMappedPort(3306),
    username: 'root',
    password: container.getRootPassword(),
    database: container.getDatabase(),
    entities: [__dirname + '/../../src/entity/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../src/database/migration/*{.ts,.js}'],
    timezone: 'Z',
    dateStrings: true,
    charset: 'utf8mb4',
    synchronize: false,
  } as DataSourceOptions;

  const testDataSourceOptions = {
    host: container.getHost(),
    port: container.getMappedPort(3306),
    username: 'root',
    password: container.getRootPassword(),
    database: container.getDatabase(),
    entities: [__dirname + '/../../src/entity/*.entity{.ts,.js}'],
  };
  process.env.TEST_DATA_SOURCE_OPTIONS = JSON.stringify(testDataSourceOptions);

  const testDataSource = new DataSource(dataSourceOptions);
  await testDataSource.initialize();

  return { testDataSource, dataSourceOptions, container };
}
