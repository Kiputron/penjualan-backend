import express from "express";
import { ItemCategoryController } from "../../controllers";
import { ItemCategoryValidator, resultValidator } from "../../validator";

const route = express.Router();

export default function ItemCategoryRouter() {
	route.get("/", ItemCategoryController.index);
	route.post(
		"/",
		ItemCategoryValidator.createData,
		resultValidator,
		ItemCategoryController.store
	);
	route.get("/:id", ItemCategoryController.show);
	route.put(
		"/:id",
		ItemCategoryValidator.createData,
		resultValidator,
		ItemCategoryController.update
	);
	route.delete("/:id", ItemCategoryController.delete);
	return route;
}
