'use strict';

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    'bookings',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      checkInDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      numberOfNigths: {
        type: DataTypes.INTEGER,
      },
      totalPaid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paymentVia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('confirmed', 'cancelled'),
        allowNull: true,
        defaultValue: 'confirmed',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'bookings',
      timestamps: true,
      paranoid: true, // Enables soft deletes
    }
  );

  Booking.associate = (models) => {

    Booking.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user',
    });

    Booking.belongsTo(models.rooms, {
      foreignKey: 'roomId',
      as: 'room',
    });
  };

  return Booking;
};
