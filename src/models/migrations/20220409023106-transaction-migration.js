"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("transaction", {
			id: {
				type: Sequelize.INTEGER(11).UNSIGNED,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			item_id: {
				type: Sequelize.INTEGER(11).UNSIGNED,
				references: {
					model: "items",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			stock: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			qty: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			transaction_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			deleted_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("transaction");
	},
};
