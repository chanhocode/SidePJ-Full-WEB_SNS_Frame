const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Accuse extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: 'Accuse',
        tableName: 'Accuses',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Accuse.belongsTo(db.User);
    db.Accuse.belongsTo(db.Post);
  }
};
