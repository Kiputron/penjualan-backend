import { db } from "../../models";
import { ErrorHandler, httpResponse } from "../../utils/http";

const { items } = db.models;

export default {
	index: async (req, res, next) => {
		try {
			let data = await items.findAndCountAll({
				include: [
					{
						association: "item_category",
					},
				],
			});
			httpResponse(res, "success", "get all item successfully", data);
		} catch (err) {
			next(new ErrorHandler(err.message, err.status || 500));
		}
	},
	show: async (req, res, next) => {
		try {
			let data = await items.findByPk(req.params.id, {
				include: [
					{
						association: "item_category",
					},
				],
			});
			httpResponse(res, "success", "get one item  successfully", data);
		} catch (err) {
			next(new ErrorHandler(err.message, err.status || 500));
		}
	},
	store: async (req, res, next) => {
		try {
			let insertData = await items.create({
				...req.body,
			});

			httpResponse(res, "success", "Create Item successfully", insertData, 201);
		} catch (err) {
			next(new ErrorHandler(err.message, err.status || 500));
		}
	},
	update: async (req, res, next) => {
		try {
			let data = await items.findByPk(req.params.id);
			await data.update({ ...req.body });

			httpResponse(res, "success", "Update Item  successfully", data);
		} catch (err) {
			next(new ErrorHandler(err.message, err.status || 500));
		}
	},
	delete: async (req, res, next) => {
		try {
			let data = await items.findByPk(req.params.id);
			await data.destroy();

			httpResponse(res, "success", "Delte Item  successfully");
		} catch (err) {
			next(new ErrorHandler(err.message, err.status || 500));
		}
	},
};
