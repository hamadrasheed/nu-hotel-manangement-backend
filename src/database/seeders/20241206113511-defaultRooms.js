'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch room type IDs
    const roomTypes = await queryInterface.sequelize.query(
      `SELECT id, slug FROM roomType;`
    );
    const roomTypeMap = roomTypes[0].reduce((map, type) => {
      map[type.slug] = type.id;
      return map;
    }, {});

    const roomStatus = await queryInterface.sequelize.query(
      `SELECT id, slug FROM roomStatus;`
    );
    const roomStatusMap = roomStatus[0].reduce((map, status) => {
      map[status.slug] = status.id;
      return map;
    }, {});


    const rooms = [
      {
        name: 'Executive Room 1',
        price: '$250',
        distance: '5 miles from city center',
        rating: '9.1 Excellent',
        image: 'p5.jpg',
        freeWifi: true,
        freeCancellation: true,
        breakfastIncluded: true,
        description: 'A luxurious executive room.',
        statusId: roomStatusMap['available'], // Available
        typeId: roomTypeMap['executive'], // Executive Room
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Executive Room 2',
        price: '$260',
        distance: '6 miles from city center',
        rating: '9.0 Excellent',
        image: 'p4.jpg',
        freeWifi: true,
        freeCancellation: false,
        breakfastIncluded: true,
        description: 'Spacious executive room with premium facilities.',
        statusId: roomStatusMap['available'], // Booked
        typeId: roomTypeMap['executive'], // Executive Room
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Executive Room 3',
        price: '$280',
        distance: '6 miles from city center',
        rating: '9.2 Excellent',
        image: 'p3.jpg',
        freeWifi: true,
        freeCancellation: true,
        breakfastIncluded: true,
        description: 'Spacious executive room with premium facilities.',
        statusId: roomStatusMap['available'], // Booked
        typeId: roomTypeMap['executive'], // Executive Room
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Deluxe Rooms
      {
        name: 'Deluxe Room 1',
        price: '$200',
        distance: '7 miles from city center',
        rating: '8.5 Very Good',
        image: 'p1.jpg',
        freeWifi: true,
        freeCancellation: true,
        breakfastIncluded: false,
        description: 'A deluxe room with modern amenities.',
        statusId: roomStatusMap['available'], // Available
        typeId: roomTypeMap['delux'], // Deluxe Room
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Deluxe Room 2',
        price: '$210',
        distance: '8 miles from city center',
        rating: '8.8 Excellent',
        image: 'p2.jpg',
        freeWifi: false,
        freeCancellation: false,
        breakfastIncluded: true,
        description: 'Comfortable deluxe room with city views.',
        statusId: roomStatusMap['available'], // Booked
        typeId: roomTypeMap['delux'], // Deluxe Room
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Deluxe Room 3',
        price: '$210',
        distance: '8 miles from city center',
        rating: '8.8 Excellent',
        image: 'https://via.placeholder.com/150',
        freeWifi: false,
        freeCancellation: false,
        breakfastIncluded: true,
        description: 'Comfortable deluxe room with city views.',
        statusId: roomStatusMap['available'], // Booked
        typeId: roomTypeMap['delux'], // Deluxe Room
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Deluxe Room 4',
        price: '$210',
        distance: '8 miles from city center',
        rating: '8.8 Excellent',
        image: 'd1.jpg',
        freeWifi: true,
        freeCancellation: true,
        breakfastIncluded: false,
        description: 'Comfortable deluxe room with city views.',
        statusId: roomStatusMap['available'], // Booked
        typeId: roomTypeMap['delux'], // Deluxe Room
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add 3 more Deluxe Rooms...

      // Standard Rooms
      {
        name: 'Standard Room 1',
        price: '$150',
        distance: '9 miles from city center',
        rating: '8.0 Good',
        image: 'd2.jpg',
        freeWifi: false,
        freeCancellation: true,
        breakfastIncluded: false,
        description: 'A budget-friendly standard room.',
        statusId: roomStatusMap['available'], // Available
        typeId: roomTypeMap['standard'], // Standard Room
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Standard Room 2',
        price: '$160',
        distance: '10 miles from city center',
        rating: '8.2 Good',
        image: 'd3.jpg',
        freeWifi: true,
        freeCancellation: false,
        breakfastIncluded: true,
        description: 'Cozy standard room with basic facilities.',
        statusId: roomStatusMap['available'], // Cleaning
        typeId: roomTypeMap['standard'], // Standard Room
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Standard Room 3',
        price: '$160',
        distance: '10 miles from city center',
        rating: '8.2 Good',
        image: 's1.jpg',
        freeWifi: true,
        freeCancellation: false,
        breakfastIncluded: true,
        description: 'Cozy standard room with basic facilities.',
        statusId: roomStatusMap['available'], // Cleaning
        typeId: roomTypeMap['standard'], // Standard Room
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Standard Room 4',
        price: '$150',
        distance: '10 miles from city center',
        rating: '8.2 Good',
        image: 's2.jpg',
        freeWifi: true,
        freeCancellation: false,
        breakfastIncluded: false,
        description: 'Cozy standard room with basic facilities.',
        statusId: roomStatusMap['available'], // Cleaning
        typeId: roomTypeMap['standard'], // Standard Room
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Standard Room 5',
        price: '$160',
        distance: '10 miles from city center',
        rating: '8.2 Good',
        image: 'p3.jpg',
        freeWifi: true,
        freeCancellation: false,
        breakfastIncluded: false,
        description: 'Cozy standard room with basic facilities.',
        statusId: roomStatusMap['available'], // Cleaning
        typeId: roomTypeMap['standard'], // Standard Room
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('rooms', rooms);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rooms', null, {});
  },
};
