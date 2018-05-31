module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'email', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('users', 'email'),
};
