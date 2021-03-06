import { Op } from "sequelize";
import { db } from "../../models";
import { ErrorHandler, httpResponse } from "../../utils/http";

const { item_category } = db.models;
export default {
	index: async (req, res, next) => {
		try {
			const { category_name } = req.query;

			let data = await item_category.findAndCountAll({
				where: {
					...(category_name && {
						category_name: { [Op.like]: `%${category_name}%` },
					}),
				},
			});

			httpResponse(res, "success", "get all item category successfully", data);
		} catch (err) {
			next(new ErrorHandler(err.message, err.message, err.status || 500));
		}
	},

	store: async (req, res, next) => {
		try {
			let insertData = await item_category.create({
				...req.body,
			});

			httpResponse(
				res,
				"success",
				"Create Item Category successfully",
				insertData,
				201
			);
		} catch (err) {
			next(new ErrorHandler(err.message, err.message, err.status || 500));
		}
	},

	show: async (req, res, next) => {
		try {
			let data = await item_category.findByPk(req.params.id);

			if (!data)
				throw new ErrorHandler("Data Not Found", "Data Not Found", 404);

			httpResponse(res, "success", "get one item category successfully", data);
		} catch (err) {
			next(new ErrorHandler(err.message, err.message, err.status || 500));
		}
	},

	update: async (req, res, next) => {
		try {
			let data = await item_category.findByPk(req.params.id);
			if (!data)
				throw new ErrorHandler("Data Not Found", "Data Not Found", 404);

			await data.update({ ...req.body });

			httpResponse(res, "success", "Update Item Category successfully", data);
		} catch (err) {
			next(new ErrorHandler(err.message, err.message, err.status || 500));
		}
	},

	delete: async (req, res, next) => {
		try {
			let data = await item_category.findByPk(req.params.id);
			if (!data)
				throw new ErrorHandler("Data Not Found", "Data Not Found", 404);
			await data.destroy();

			httpResponse(res, "success", "Delete Item Category successfully");
		} catch (err) {
			next(new ErrorHandler(err.message, err.message, err.status || 500));
		}
	},
};
