import express from "express";
import ItemRouter from "./modules/item";
import ItemCategoryRouter from "./modules/item_category";
import TransactionRouter from "./modules/transaction";

const route = express.Router();

export default function router() {
	route.get("/", (req, res) => {
		res.send("Hello World!");
	});
	route.use("/item-category", ItemCategoryRouter());
	route.use("/item", ItemRouter());
	route.use("/transaction", TransactionRouter());

	return route;
}
