const db = require('../models');
const helper = require('../shared/helper');
const sequelize = require('sequelize');

const Op = sequelize.Op;

module.exports = {

    async get(data) {

        try {

            const {
                typeId
            } = data;

            const whereClause = {};

            if (typeId?.length) {
                whereClause.typeId = +typeId
            }

            const allRooms = helper.shallowCopy(await db.rooms.findAll({
                where: {
                    ...whereClause
                },
                include: [
                    { model: db.roomStatus, as: 'status', attributes: ['name', 'slug'] },
                    { model: db.roomType, as: 'type', attributes: ['name', 'slug'] },
                  ],
            }));
            
            if (!allRooms) {
                throw Error('No Rooms found!');
            }

            return allRooms;

        } catch (error) {
            throw error;   
        }

    },

    async getAllForHome(data) {

        try {

            const allRooms = helper.shallowCopy(await db.rooms.findAll({
                include: [
                    { model: db.roomStatus, as: 'status', attributes: ['id', 'name', 'slug'] },
                    { model: db.roomType, as: 'type', attributes: ['id', 'name', 'slug'] },
                  ],
            }));
            
            if (!allRooms) {
                throw Error('No Rooms found!');
            }
    
            const groupedData = Object.values(
                allRooms.reduce((acc, item) => {
                  const typeSlug = item.type.slug;
                  const typeName = item.type.name;
                  const typeId = item.type.id;
              
                  if (!acc[typeSlug]) {
                    acc[typeSlug] = {
                      type: typeSlug,
                      name: typeName,
                      id: typeId,
                      data: [],
                    };
                  }
              
                  acc[typeSlug].data.push(item);
              
                  return acc;
                }, {})
              );

            return groupedData;

        } catch (error) {
            throw error;   
        }

    },

}