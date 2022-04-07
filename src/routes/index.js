import express from "express";
import ItemRouter from "./modules/item";
import ItemCategoryRouter from "./modules/item_category";

const route = express.Router();

export default function router() {
	route.get("/", (req, res) => {
		res.send("Hello World!");
	});
	route.use("/item-category", ItemCategoryRouter());
	route.use("/item", ItemRouter());

	return route;
}
