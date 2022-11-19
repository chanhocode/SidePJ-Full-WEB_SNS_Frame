const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
        },
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        age: {
          type: DataTypes.INTEGER(100).UNSIGNED,
          allowNull: false,
        },
        birth: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        gender: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        phonNumber: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        profileImage: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
      },
      {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Accuse);
    db.User.hasMany(db.Image);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followers',
      foreignKey: 'FollowingId',
    });
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followings',
      foreignKey: 'FollowerId',
    });
  }
};
