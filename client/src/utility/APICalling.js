const BASE_URL = "http://localhost:8080";
export const postData = async (url, body, headers) => {
	try {
		const response = await fetch(`${BASE_URL}${url}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				...(headers && headers)
			},
			body: JSON.stringify(body)
		});
		return response.json();
	} catch (error) {
		console.log(error.message);
	}
};
export const getData = async (url, headers) => {
    try {
		const response = await fetch(`${BASE_URL}${url}`, {
			headers: {
                "Content-Type": "application/json;charset=utf-8",
                ...(headers && headers)
			},
		});
		return response.json();
	} catch (error) {
		console.log(error.message);
	}
};
