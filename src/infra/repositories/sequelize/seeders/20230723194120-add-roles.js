const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('roles',
    [
      {
        id: uuidv4(),
        name: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CUSTOMER',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('roles', null, {}),
};
