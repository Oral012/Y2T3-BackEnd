const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Major extends Model {}

  Major.init({
    name: DataTypes.STRING(120),
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Major',
    tableName: 'major_tbl',
    timestamps: false
  });

  return Major;
};
