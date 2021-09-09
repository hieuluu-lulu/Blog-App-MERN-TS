/** @format */

import { IAuth } from '../types/auth';
import { Types } from '../constants/auth.constant';
const profile: any = localStorage.getItem('profile');
const authState: IAuth = JSON.parse(profile) || {};

const authReducer = (state = authState, action: any) => {
	switch (action.type) {
		case Types.LOGIN:
			localStorage.setItem('profile', JSON.stringify(action.payload));
			return {
				access_token: action.payload.access_token,
				user: action.payload.user,
			};
		default:
			return state;
	}
};

export default authReducer;
