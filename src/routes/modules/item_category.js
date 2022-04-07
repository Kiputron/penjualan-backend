import express from "express";
import { ItemCategoryController } from "../../controllers";

const route = express.Router();

export default function ItemCategoryRouter() {
	route.get("/", ItemCategoryController.index);
	route.post("/", ItemCategoryController.store);
	route.get("/:id", ItemCategoryController.show);
	route.put("/:id", ItemCategoryController.update);
	route.delete("/:id", ItemCategoryController.delete);
	return route;
}
