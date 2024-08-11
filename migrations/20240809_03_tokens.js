const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'enabled', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    });
    await queryInterface.createTable('tokens', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      jwt: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'enabled');
    await queryInterface.dropTable('tokens');
  },
};
