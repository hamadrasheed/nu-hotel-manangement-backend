'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bookings', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'users', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      roomId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'rooms', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      checkInDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      checkOutDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      totalPaid: {
        type: Sequelize.STRING,
      },
      numberOfNigths: {
        type: Sequelize.INTEGER,
      },
      paymentVia: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM('confirmed', 'cancelled'), 
        allowNull: true,
        defaultValue: 'confirmed', 
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bookings');
  },
};
