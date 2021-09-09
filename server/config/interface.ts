/** @format */

export interface INewUser {
	name: string;
	account: string;
	password: string;
}

export interface IDecodeToken {
	newUser?: INewUser;
	id: string;
	iat: number;
	exp: number;
}
