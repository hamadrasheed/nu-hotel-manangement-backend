'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roomStatus', [
      { name: 'Available' ,slug: 'available', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Not Available' ,slug: 'notAvailable', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
  }
};
