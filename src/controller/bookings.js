const db = require('../models');
const helper = require('../shared/helper');
const sequelize = require('sequelize');
const { format } = require('date-fns');
const Op = sequelize.Op;

module.exports = {

    async getUserBookings(data) {

        try {

            const {
                userId
            } = data;

            const userBookings = helper.shallowCopy(await db.bookings.findAll({
                where: {
                    userId
                },
                include: {
                     model: db.rooms, as: 'room',
                }
            }));

            return userBookings;
            // []

        } catch (error) {
            throw error;
        }

    },

    async checkAvailablity(data) {

        try {

            const { roomId, checkInDate, checkOutDate } = data;

            const overlappingBookings = helper.shallowCopy(await db.bookings.findAll({
                where: {
                    roomId,
                    [Op.or]: [
                        {
                            checkInDate: {
                                [Op.between]: [checkInDate, checkOutDate],
                            },
                        },
                        {
                            checkOutDate: {
                                [Op.between]: [checkInDate, checkOutDate],
                            },
                        },
                        {
                            checkInDate: {
                                [Op.lte]: checkInDate,
                            },
                            checkOutDate: {
                                [Op.gte]: checkOutDate,
                            },
                        },
                    ],
                },
            }));

            if (overlappingBookings?.length > 0) {
                const bookedDates = overlappingBookings.map((booking) => {
                    const formattedCheckIn = format(new Date(booking.checkInDate), 'MMMM dd, yyyy hh:mm a');
                    const formattedCheckOut = format(new Date(booking.checkOutDate), 'MMMM dd, yyyy hh:mm a');
                    return `From: ${formattedCheckIn} To: ${formattedCheckOut}`;
                });
            
                return { available: false, bookedDates };
            }

            return { available: true };

        } catch (error) {
            console.log('error', error);
            throw error;
        }

    },

    async create(data) {

        try {

            const {
                roomId,
                checkInDate,
                checkOutDate,
                paymentVia,
                totalPaid,
                userId,
                numberOfNigths
            } = data;

            await db.bookings.create({
                roomId,
                checkInDate,
                checkOutDate,
                paymentVia,
                totalPaid,
                userId,
                numberOfNigths
            });

            return true;

        } catch (error) {
            console.log('error', error);
            throw error;
        }

    }

}