import { Op } from "sequelize";
import { db } from "../../models";
import { ErrorHandler, httpResponse } from "../../utils/http";
import moment from "moment";

const { transaction, items, item_category } = db.models;
export default {
	index: async (req, res, next) => {
		try {
			let { item_name, category_name, start_date, end_date } = req.query;
			let filterDate;

			if (start_date && end_date) {
				filterDate = {
					[Op.between]: [
						moment(start_date).startOf("days"),
						moment(end_date).endOf("days"),
					],
				};
			} else if (start_date && !end_date) {
				filterDate = { [Op.gte]: moment(start_date).startOf("days") };
			} else if (!start_date && end_date) {
				filterDate = { [Op.lte]: moment(end_date).endOf("days") };
			} else {
				filterDate = { [Op.lte]: moment().add(1, "years") };
			}

			let data = await transaction.findAndCountAll({
				where: {
					transaction_date: filterDate,
				},
				include: [
					{
						association: "item",
						attributes: ["id", "item_name"],
						where: {
							...(item_name && {
								item_name: { [Op.like]: `%${item_name}%` },
							}),
						},
						include: [
							{
								association: "item_category",
								attributes: ["category_name"],
								where: {
									...(category_name && {
										category_name: { [Op.like]: `%${category_name}%` },
									}),
								},
							},
						],
					},
				],
			});
			httpResponse(res, "success", "get all transaction successfully", data);
		} catch (err) {
			next(new ErrorHandler(err.message, err.message, err.status || 500));
		}
	},

	store: async (req, res, next) => {
		try {
			let { item_id, qty } = req.body;

			let item = await items.findByPk(item_id);

			let stockItem = item.qty;
			item.qty = stockItem - qty;

			let insertData = await transaction.create({
				stock: stockItem,
				...req.body,
			});

			await item.save();

			return httpResponse(
				res,
				"success",
				"Create transaction successfully",
				insertData,
				201
			);
		} catch (err) {
			next(new ErrorHandler(err.message, err.message, err.status || 500));
		}
	},

	show: async (req, res, next) => {
		try {
			const data = await transaction.findByPk(req.params.id, {
				include: [
					{
						association: "item",
						attributes: ["id", "item_name"],
						include: [
							{
								association: "item_category",
								attributes: ["category_name"],
							},
						],
					},
				],
			});

			if (!data)
				throw new ErrorHandler("Data Not Found", "Data Not Found", 404);

			httpResponse(res, "success", "get one transaction successfully", data);
		} catch (err) {
			next(new ErrorHandler(err.message, err.message, err.status || 500));
		}
	},

	update: async (req, res, next) => {
		try {
			let { item_id, qty } = req.body;

			let data = await transaction.findByPk(req.params.id);
			if (!data)
				throw new ErrorHandler("Data Not Found", "Data Not Found", 404);

			/* return old item qty */
			let oldItem = await items.findByPk(data.item_id);
			oldItem.qty = oldItem.qty + data.qty;
			await oldItem.save();

			/* reduce stock items */
			let item = await items.findByPk(item_id);
			let stockItem = item.qty;
			item.qty = stockItem - qty;

			await data.update({
				stock: stockItem,
				...req.body,
			});

			await item.save();

			httpResponse(res, "success", "Update Transaction successfully");
		} catch (err) {
			next(new ErrorHandler(err.message, err.message, err.status || 500));
		}
	},

	delete: async (req, res, next) => {
		try {
			let data = await transaction.findByPk(req.params.id);

			if (!data)
				throw new ErrorHandler("Data Not Found", "Data Not Found", 404);

			let item = await items.findByPk(data.item_id);
			if (!item)
				throw new ErrorHandler("Data Not Found", "Data Not Found", 404);

			item.qty = item.qty + data.qty;

			await item.save();
			await data.destroy();

			httpResponse(res, "success", "Delte Transaction successfully");
		} catch (err) {
			next(new ErrorHandler(err.message, err.message, err.status || 500));
		}
	},

	report: async (req, res, next) => {
		try {
			let { start_date, end_date } = req.query;
			let filterDate;

			if (start_date && end_date) {
				filterDate = {
					[Op.between]: [
						moment(start_date).startOf("days"),
						moment(end_date).endOf("days"),
					],
				};
			} else if (start_date && !end_date) {
				filterDate = { [Op.gte]: moment(start_date).startOf("days") };
			} else if (!start_date && end_date) {
				filterDate = { [Op.lte]: moment(end_date).endOf("days") };
			} else {
				filterDate = { [Op.lte]: moment().add(1, "years") };
			}

			let data = await item_category.findAll({
				attributes: ["id", "category_name"],
				include: [
					{
						association: "items",
						attributes: ["id", "item_name"],
						include: [
							{
								association: "transactions",
								attributes: ["id", "qty", "stock", "transaction_date"],
								where: {
									transaction_date: filterDate,
								},
							},
						],
					},
				],
				distinct: true,
			});

			let vanilla = JSON.parse(JSON.stringify(data));

			vanilla.forEach((it) => {
				it.items.forEach((itx) => {
					itx.total = itx.transactions.reduce((a, { qty }) => a + qty, 0);
				});
			});

			vanilla.forEach((it) => {
				it.subtotal = it.items.reduce((a, { total }) => a + total, 0);
			});

			httpResponse(
				res,
				"success",
				"get transaction report successfully",
				vanilla
			);
		} catch (err) {
			next(new ErrorHandler(err.message, err.message, err.status || 500));
		}
	},
};
