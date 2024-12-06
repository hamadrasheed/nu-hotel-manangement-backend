'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roomType', [
      { name: 'Executive Room', slug: 'executive', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Deluxe Room', slug: 'delux', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Standard Room', slug: 'standard', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
  }
};
