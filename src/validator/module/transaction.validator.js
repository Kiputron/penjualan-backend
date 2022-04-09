import { check, validationResult } from "express-validator";
import { db } from "../../models";
import { ErrorHandler } from "../../utils/http";

function requestTransactionValidator(req) {
	return validationResult(req);
}

async function checkItem(val) {
	const data = await db.models.items.findByPk(val);
	if (!data) throw new ErrorHandler("Item not found");
}

async function stock(val, { req }) {
	const data = await db.models.items.findByPk(req.body.item_id);
	if (data && data.qty < +val) {
		throw new ErrorHandler("qty of items exceeds stock");
	}
}

async function stokcUpdate(val, { req }) {
	let dataTransaction = await db.models.transaction.findByPk(req.params.id);

	/* if no change item */
	if (dataTransaction.item_id === req.body.item_id) {
		const data = await db.models.items.findByPk(dataTransaction.item_id);
		if (data && data.qty + dataTransaction.qty < +val) {
			throw new ErrorHandler("qty of items exceeds stock");
		}
	}
	const data = await db.models.items.findByPk(req.body.item_id);
	if (data && data.qty < +val) {
		throw new ErrorHandler("qty of items exceeds stock");
	}
}

const item_id = check("item_id")
	.notEmpty()
	.withMessage("item_id cannot be empty")
	.isInt()
	.withMessage("item_id must be a number")
	.custom(checkItem);

const qty = check("qty")
	.notEmpty()
	.withMessage("qty cannot be empty")
	.isInt()
	.withMessage("qty must be a number")
	.custom(stock);

const qtyUpdate = check("qty")
	.notEmpty()
	.withMessage("qty cannot be empty")
	.isInt()
	.withMessage("qty must be a number")
	.custom(stokcUpdate);

const transaction_date = check("transaction_date")
	.notEmpty()
	.withMessage("transaction_date cannot be empty")
	.isISO8601()
	.toDate()
	.withMessage("start must be in correct format yyyy:mm:dd hh:mm:ss");

const createData = [item_id, qty, transaction_date];
const updateData = [item_id, qtyUpdate, transaction_date];

export default {
	requestTransactionValidator,
	createData,
	updateData,
};
