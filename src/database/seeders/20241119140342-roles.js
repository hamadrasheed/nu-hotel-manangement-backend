'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('roles', [
      { name: 'Admin', slug: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Staff', slug: 'staff', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Guest', slug: 'guest', createdAt: new Date(), updatedAt: new Date() }
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }

};
