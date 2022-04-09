import express from "express";
import cors from "cors";
import helmet from "helmet";
import { prefix } from "./helpers/version";
import router from "./routes";
import bodyParser from "body-parser";
import { connectionCheck } from "./models";
import logger from "./utils/logger";
import handleError from "./middleware/module/error-handler";
const app = express();
const MODE = process.env.MODE || "test";
const port = process.env.PORT || 3001;

const startServer = async () => {
	app.use(bodyParser.json());
	app.use(
		bodyParser.urlencoded({
			extended: true,
		})
	);

	app.use(cors());
	app.use(helmet());

	app.use(prefix, router());
	app.use((req, res) => {
		res.status(404).send({ message: "Not Found" });
	});

	app.listen(port, () => {
		console.clear();
		logger.info(
			`Server Running at http://localhost:${port}/ or http://127.0.0.1:${port}/`
		);
		logger.info(`MODE = ${MODE}`);
	});

	connectionCheck();
	app.use(handleError);
};

startServer();
