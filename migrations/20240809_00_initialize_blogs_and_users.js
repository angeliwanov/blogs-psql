const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable(
      'blogs',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        author: {
          type: DataTypes.STRING,
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        likes: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          name: 'createdAt',
          field: 'created_at',
        },
        updatedAt: {
          type: DataTypes.DATE,
          name: 'updatedAt',
          field: 'updated_at',
        },
      },
      {
        underscored: true,
        timestamps: true,
      }
    );
    await queryInterface.createTable(
      'users',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
          validate: {
            isEmail: true,
          },
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          name: 'createdAt',
          field: 'created_at',
        },
        updatedAt: {
          type: DataTypes.DATE,
          name: 'updatedAt',
          field: 'updated_at',
        },
      },
      {
        underscored: true,
        timestamps: true,
      }
    );
    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blogs');
    await queryInterface.dropTable('users');
  },
};
