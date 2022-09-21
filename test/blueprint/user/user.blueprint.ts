import { User } from '@entity';
import { faker } from '@faker-js/faker';

export class UserBlueprint {
  static create(overrides?: Partial<User>): User {
    return <User>{
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      activated: true,
      createdBy: faker.number.int({ min: 1, max: 1000000 }),
      ...overrides,
    };
  }
}
