'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     for (let index = 0; index < 20; index++) {
      await queryInterface.bulkInsert('Contacts', [{
        name: faker.person.fullName(),
        age: index + 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});

      await queryInterface.bulkInsert('Phones', [{
        contact_id: index + 1,
        number: '+55318888888'+index,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});

     }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Contacts', null, {});
    await queryInterface.bulkDelete('Phones', null, {});
  }
};
