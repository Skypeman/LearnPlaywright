import { faker } from "@faker-js/faker";

/*
///////
При реализации через класс созданный юзер не передаётся из предусловий в тесты, а это бывает нужно. Поэтому вынесено в отдельную функцию
//////

class createTestUser {
   constructor(userFirstName = '', userEmail = '', userPassword = '') {
      const sex = faker.person.sexType();
      const firstName = userFirstName || faker.person.firstName(sex);
      const email = userEmail || faker.internet.email({ firstName });
      const avatar = faker.image.avatar();
      const bio = faker.person.bio();
      const password = userPassword || faker.internet.password();
   }
}
   */

function createTestUser(userName = '', userEmail = '', userPassword = '') {
   const sex = faker.person.sexType();
   const firstName = userName || faker.person.firstName(sex);
   const email = userEmail || faker.internet.email({ firstName });
   const avatar = faker.image.avatar();
   const bio = faker.person.bio();
   const password = userPassword || faker.internet.password();

   return {
      avatar,
      bio,
      email,
      firstName,
      password
   }
};

export { createTestUser };