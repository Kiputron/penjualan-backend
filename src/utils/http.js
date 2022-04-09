import url from "url";
import logger from "./logger";

class ErrorHandler extends Error {
	constructor(message, data = null, status) {
		super();
		this.message = message;
		this.status = status;
		this.data = data;
		console.log(this.message);
	}
}

function urlFormatter(request) {
	return url.format({
		protocol: request.protocol,
		host: request.get("host"),
		pathname: request.originalUrl,
	});
}

function httpResponse(response, status, message, data = null, code = null) {
	logger.info(message);

	if (!code) code = status === "success" ? 200 : 400;

	const result = {
		meta: {
			status,
			message,
			code,
		},
	};

	if (status === "success") {
		if (data) result.data = data;
	} else {
		result.error = data;
	}

	return response.status(code).send(result);
}

export { urlFormatter, httpResponse, ErrorHandler };
