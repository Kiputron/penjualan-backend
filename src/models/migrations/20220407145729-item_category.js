"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("item_category", {
			id: {
				type: Sequelize.INTEGER(11).UNSIGNED,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			category_name: {
				type: Sequelize.STRING(255),
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
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("item_category");
	},
};
