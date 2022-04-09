import { validationResult } from "express-validator";
import { ErrorHandler } from "../utils/http";
import ItemCategoryValidator from "./module/item_category.validator";
import ItemValidator from "./module/item.validator";
import TransactionValidator from "./module/transaction.validator";

function resultValidator(req, res, next) {
	const validated = validationResult(req);
	if (!validated.isEmpty())
		return next(new ErrorHandler("Validation Error", validated.errors, 422));

	return next();
}

export {
	resultValidator,
	ItemCategoryValidator,
	ItemValidator,
	TransactionValidator,
};
