/** @format */

import API from './API';
export const singIn = (form: object) => API.post('/users/login', form);
