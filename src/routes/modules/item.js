import express from "express";
import { ItemController } from "../../controllers";
import { ItemValidator, resultValidator } from "../../validator";

const route = express.Router();

export default function ItemRouter() {
	route.get("/", ItemController.index);
	route.post(
		"/",
		ItemValidator.createData,
		resultValidator,
		ItemController.store
	);
	route.get("/:id", ItemController.show);
	route.put(
		"/:id",
		ItemValidator.createData,
		resultValidator,
		ItemController.update
	);
	route.delete("/:id", ItemController.delete);

	return route;
}
