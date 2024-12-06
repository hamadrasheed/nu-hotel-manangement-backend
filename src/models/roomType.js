'use strict';

module.exports = function (sequelize, DataTypes) {
  const RoomType = sequelize.define(
    'roomType',
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
      tableName: 'roomType',
      timestamps: true,
      paranoid: true, // Enables soft deletes using `deletedAt`
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
    }
  );

  RoomType.associate = function (models) {
    // roomType has many rooms
    RoomType.hasMany(models.rooms, { foreignKey: 'typeId', as: 'rooms' });
  };

  return RoomType;
};
