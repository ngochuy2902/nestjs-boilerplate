import { faker } from '@faker-js/faker';
import { User } from '@entity/user.entity';

export class UserBlueprint {
  static create(overrides?: Partial<User>): User {
    return <User>{
      username: faker.internet.userName(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      activated: true,
      createdBy: faker.number.int(),
      ...overrides,
    };
  }
}
