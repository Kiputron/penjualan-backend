import express from "express";
import ItemCategoryRouter from "./modules/item_category";

const route = express.Router();

export default function router() {
	route.get("/", (req, res) => {
		res.send("Hello World!");
	});

	route.use("/item-category", ItemCategoryRouter());

	return route;
}
