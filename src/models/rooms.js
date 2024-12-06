module.exports = function (sequelize, DataTypes) {
    const Rooms = sequelize.define(
      'rooms',
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        distance: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        rating: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
          get() {
            const rawValue = this.getDataValue('image'); // Fetch raw value from the database
            // const serverUrl = process.env.SERVER_URL || 'http://localhost:8600/api/images'; http://10.0.2.2:8600/api // Replace with your actual server URL
            const serverUrl = 'http://10.0.2.2:8600/api/images'; // Replace with your actual server URL
            return rawValue ? `${serverUrl}?imageName=${rawValue}` : null;
          },
        },
        freeWifi: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        freeCancellation: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        breakfastIncluded: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        statusId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'roomStatus', // Matches the table name of the referenced model
            key: 'id',
            as: 'status',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        typeId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'roomType', // Matches the table name of the referenced model
            key: 'id',
            as: 'type',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
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
        tableName: 'rooms',
        timestamps: true,
        paranoid: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt',
      }
    );
  
    // Define associations
    Rooms.associate = function (models) {
      // Associate with RoomStatus
      Rooms.belongsTo(models.roomStatus, {
        foreignKey: 'statusId',
        as: 'status',
      });
  
      // Associate with RoomType
      Rooms.belongsTo(models.roomType, {
        foreignKey: 'typeId',
        as: 'type',
      });
    };
  
    return Rooms;
  };
  