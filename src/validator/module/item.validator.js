import { check, validationResult } from "express-validator";
import { db } from "../../models";
import { ErrorHandler } from "../../utils/http";

function requestItemValidator(req) {
	return validationResult(req);
}

async function CheckCategory(val) {
	const data = await db.models.item_category.findByPk(val);
	if (!data) throw new ErrorHandler("Item Category not found");
}

const name = check("item_name")
	.notEmpty()
	.withMessage("Item Name cannot be empty");

const qty = check("qty")
	.notEmpty()
	.withMessage("qty cannot be empty")
	.isInt()
	.withMessage("qty must be a number");

const category_id = check("category_id")
	.notEmpty()
	.withMessage("category_id cannot be empty")
	.isInt()
	.withMessage("category_id must be a number")
	.custom(CheckCategory);

const createData = [name, qty, category_id];

export default {
	requestItemValidator,
	createData,
};
