import express from "express";
import { TransactionController } from "../../controllers";
import { resultValidator, TransactionValidator } from "../../validator";

const route = express.Router();

export default function TransactionRouter() {
	route.get("/", TransactionController.index);
	route.get("/report", TransactionController.report);
	route.post(
		"/",
		TransactionValidator.createData,
		resultValidator,
		TransactionController.store
	);
	route.get("/:id", TransactionController.show);
	route.put(
		"/:id",
		TransactionValidator.updateData,
		resultValidator,
		TransactionController.update
	);
	route.delete("/:id", TransactionController.delete);

	return route;
}
