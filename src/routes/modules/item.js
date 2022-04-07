import express from "express";
import { ItemController } from "../../controllers";

const route = express.Router();

export default function ItemRouter() {
	route.get("/", ItemController.index);
	route.post("/", ItemController.store);
	route.get("/:id", ItemController.show);
	route.put("/:id", ItemController.update);
	route.delete("/:id", ItemController.delete);

	return route;
}
