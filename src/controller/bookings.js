const db = require('../models');
const helper = require('../shared/helper');
const sequelize = require('sequelize');
const { format } = require('date-fns');
const Op = sequelize.Op;

module.exports = {

    async getUserBookings(data) {

        try {

            const {
                userId,
                userRole
            } = data;

            let whereClause = {
                userId: userId
            };

            if (userRole == 'admin') {
                whereClause = {};
            }

            const userBookings = helper.shallowCopy(await db.bookings.findAll({
                where: {
                    ...whereClause
                },
                include: [
                    {
                        model: db.rooms, as: 'room'
                    },
                    {
                     model: db.bookingStatus, as: 'bookingStatus',
                    },
                    {
                     model: db.users, as: 'user',
                     attributes: ['firstName', 'lastName']

                    }
                ]
            }));

            return userBookings?.map(x => ({
                ...x,
                status: x?.bookingStatus?.name
            }));

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
                inlcude: {
                    model: db.bookingStatus, 
                    as: 'bookingStatus',
                    required: true,
                    where: {
                        slug: { [Op.ne]: 'checkedOut'}
                    }
                }
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
                totalDays: numberOfNigths
            } = data;

            if(checkInDate < new Date()) {
                throw Error('Cannot book room on previous dates');
            }

            const bookedStatus = helper.shallowCopy(await db.bookingStatus.findOne({
                where: {
                    slug: 'booked'
                },
                attributes: ['id']
            }));

            await db.bookings.create({
                roomId,
                checkInDate,
                checkOutDate,
                paymentVia,
                totalPaid,
                userId,
                numberOfNigths,
                statusId: bookedStatus.id
            });

            return true;

        } catch (error) {
            console.log('error', error);
            throw error;
        }

    },

    async updateStatus(data) {

        try {

            const {
                id,
                statusToBe,
                userId,
            } = data;

            const status = helper.shallowCopy(await db.bookingStatus.findOne(
                {
                    where: {
                        slug: statusToBe
                    },
                    attributes: ['id']
                }
            ));

            if(!status) {
                throw Error('Invalid status slug is shared!');
            }

            console.log('status',status);

            await db.bookings.update(
                {
                    statusId: status.id,
                    updatedBy: userId || null
                },
                {
                    where: {
                        id: id
                    }
                }
            )

            return true;

        } catch (error) {
            console.log('error', error);
            throw error;
        }

    },

    async getForStaff(data) {

        try {

            const {
                status,
            } = data;

            const userBookings = helper.shallowCopy(await db.bookings.findAll({
                where: {},
                include: [
                    {
                        model: db.rooms, as: 'room'
                    },
                    {
                        model: db.bookingStatus, 
                        as: 'bookingStatus',
                        required: true,
                        where: {
                            slug: {[Op.in]: ['cleaning', 'checkedOut']}
                        }

                    }
                ]
            }));

            return userBookings?.map(x => ({
                ...x,
                status: x?.bookingStatus?.name
            }));

        } catch (error) {
            throw error;
        }

    },

}