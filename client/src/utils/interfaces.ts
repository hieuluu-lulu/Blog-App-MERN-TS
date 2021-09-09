/** @format */
import { RouteProps } from 'react-router-dom';
export interface IRouter {
	path: RouteProps['path'];
	exact: boolean;
	component: React.ElementType;
}

export interface IUserLogin {
	account: string;
	password: string;
}
export interface IUser extends IUserLogin {
	_id: string;
	avatar: string;
	createdAt: string;
	name: string;
	role: string;
	type: string;
	updatedAt: string;
}
