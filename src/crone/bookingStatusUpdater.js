const cron = require('node-cron');
const { Op } = require('sequelize');
const db = require('../models');
const helper = require('../shared/helper');

const bookingStatusUpdater = () => {

  cron.schedule('0 * * * *', async () => {
    console.log('Running booking status updater...');

    try {
      const outdatedBookings = helper.shallowCopy(await db.bookings.findAll({
        where: {
          checkOutDate: {
            [Op.lt]: new Date(), 
          },
        },
        attributes: ['id'],
        include: {
            model: db.bookingStatus, 
            as: 'bookingStatus',
            required: true,
            where: {
                slug: {[Op.notIn]: ['cleaning', 'checkedOut', 'completed'] }
            }
        }
      }));

      const bookedStatus = helper.shallowCopy(await db.bookingStatus.findOne({
        where: {
            slug: 'checkedOut'
        },
        attributes: ['id'],
    }));

      for (const booking of outdatedBookings) {
        await db.bookings.update({ statusId: bookedStatus.id }, {where: { id: booking.id }});
      }

      console.log(`Updated ${outdatedBookings.length} bookings to "Checked Out".`);
    } catch (error) {
      console.error('Error updating booking statuses:', error.message);
    }
  });
};

module.exports = bookingStatusUpdater;
