"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("items", {
			id: {
				type: Sequelize.INTEGER(11).UNSIGNED,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			item_name: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			qty: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			category_id: {
				type: Sequelize.INTEGER(11).UNSIGNED,
				references: {
					model: "item_category",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
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
		await queryInterface.dropTable("items");
	},
};
