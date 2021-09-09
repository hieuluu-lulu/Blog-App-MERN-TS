/** @format */

import { Schema, model } from 'mongoose';

interface User {
	name: string;
	password: string;
	avatar: string;
	role: string;
	account: string;
	type: string;
}

const userSchema = new Schema<User>(
	{
		name: { type: String, required: [true, 'Please enter your name'] },
		password: { type: String, required: [true, 'Please enter your password'] },
		account: { type: String, required: [true, 'Please enter your email or phone'], trim: true, unique: true },
		role: { type: String, default: 'user' },
		avatar: { type: String, default: 'https://hhppaper.com/anh_co_dong/default-image.png' },
		type: { type: String, default: 'register' },
	},
	{
		timestamps: true,
	},
);
const UserModel = model<User>('User', userSchema);
export default UserModel;
