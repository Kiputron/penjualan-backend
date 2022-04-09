/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"transaction",
		{
			id: {
				type: DataTypes.INTEGER(11).UNSIGNED,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			item_id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
			stock: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
			qty: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
			transaction_date: {
				type: DataTypes.DATE,
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
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			tableName: "transaction",
		}
	);
};
