'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('bookings', 'statusId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'bookingStatus', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

  },

  down: async (queryInterface, Sequelize) => {
   
  }
};
