/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"items",
		{
			id: {
				type: DataTypes.INTEGER(11).UNSIGNED,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			item_name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			stock: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
			category_id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			tableName: "items",
		}
	);
};
