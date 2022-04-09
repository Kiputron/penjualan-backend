require("dotenv").config({ path: __dirname + "/../../.env" });
import Sequelize from "sequelize";
import fs from "fs";
import setupRelations from "./relation_setup";
import config from "../config/config.json";
import logger from "../utils/logger";
const MODE = process.env.MODE || "test";

// noinspection JSValidateTypes
const db = new Sequelize(
	config[MODE].database,
	config[MODE].username,
	config[MODE].password,
	{
		dialect: config[MODE].dialect,
		host: config[MODE].host,
		logging: false,
		timezone: "+07:00",
		define: {
			underscored: true,
			underscoredAll: true,
			timestamps: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
			deletedAt: "deleted_at",
			paranoid: true, //for deleted_at
		},
		dialectOptions: {
			useUTC: true, //for reading from database
			dateStrings: true,
			typeCast: function (field, next) {
				// for reading from database
				if (field.type === "DATETIME") {
					return field.string();
				}
				return next();
			},
		},
	}
);

async function connectionCheck() {
	return db
		.authenticate()
		.then(() => logger.info("Connection Database Successfully!"))
		.catch((err) => logger.info(err.original));
}

let files = fs.readdirSync(__dirname + "/");
let filesModel = fs.readdirSync(__dirname + "/module");

for (let f of files) {
	if (f.indexOf("index.js") >= 0) continue;
	if (f.indexOf("relation_setup.js") >= 0) continue;
	if (f.indexOf("migrations") >= 0) continue;
	if (f.indexOf(".log") >= 0) continue;
	if (f.indexOf("module") >= 0) continue;
	db.import("./" + f);
}
for (let m of filesModel) {
	db.import("./module/" + m);
}

db.Sequelize = Sequelize;

setupRelations(db);

export { db, connectionCheck };
