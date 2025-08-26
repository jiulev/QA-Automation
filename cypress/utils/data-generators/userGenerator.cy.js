import { faker } from "@faker-js/faker/locale/es";
class UserGenerator {
  generateRandomUserUpdateData() {
    return {
      name: faker.firstName(),
      email: faker.internet.email(),
    };
  }
}

export default UserGenerator;
