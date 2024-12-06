'use strict';

module.exports = function (sequelize, DataTypes) {
  const RoomStatus = sequelize.define(
    'roomStatus',
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
      tableName: 'roomStatus',
      timestamps: true,
      paranoid: true, // Enables soft deletes using `deletedAt`
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
    }
  );

  RoomStatus.associate = function (models) {
    // roomStatus has many rooms
    RoomStatus.hasMany(models.rooms, { foreignKey: 'statusId', as: 'rooms' });
  };

  return RoomStatus;
};
