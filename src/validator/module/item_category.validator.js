import { check, validationResult } from "express-validator";

function requestItemCategoryValidator(req) {
	return validationResult(req);
}
const name = check("category_name")
	.notEmpty()
	.withMessage("Category Name cannot be empty");

const createData = [name];

export default {
	requestItemCategoryValidator,
	createData,
};
