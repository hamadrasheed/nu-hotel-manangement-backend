'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roomStatus', [
      { name: 'Available' ,slug: 'available', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Booked' ,slug: 'booked', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cleaning' ,slug: 'cleaning', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Do Not Disturb' ,slug: 'doNotDisturb', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
  }
};
