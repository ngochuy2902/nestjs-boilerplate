import { DataSource } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

export class DatabaseUtil {
  static async clearData<Entity extends ObjectLiteral>(dataSource: DataSource, entity: Entity) {
    await dataSource.getRepository(entity.name).clear();
  }
}
