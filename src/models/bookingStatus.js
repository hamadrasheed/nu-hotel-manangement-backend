'use strict';

module.exports = function (sequelize, DataTypes) {
  const BookingStatus = sequelize.define(
    'bookingStatus',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: true,
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
      tableName: 'bookingStatus',
      timestamps: true,
      paranoid: true, // Enables soft deletes using `deletedAt`
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
    }
  );

  BookingStatus.associate = function (models) {
    // bookingStatus has many rooms
    BookingStatus.hasMany(models.bookings, { foreignKey: 'statusId', as: 'bookings' });
  };

  return BookingStatus;
};
