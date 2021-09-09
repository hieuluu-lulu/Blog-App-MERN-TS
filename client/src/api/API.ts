/** @format */

import axios from 'axios';
import queryString from 'querystring';
const API = axios.create({
	baseURL: 'http://localhost:4000',
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});
API.interceptors.request.use((req) => {
	const user = localStorage.getItem('profile');
	if (user) {
		req.headers.authorization = 'Bearer ' + JSON.parse(user).access_token;
	}

	return req;
});
API.interceptors.response.use(
	(response: any) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(err) => {
		throw new Error(err);
	},
);

export default API;
