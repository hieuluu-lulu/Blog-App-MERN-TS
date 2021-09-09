/** @format */

import { Request, Response } from 'express';
import User from '../models/User.model';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateActiveToken, generateRefreshToken } from '../config/generateToken';
import { validateEmail, validatePhone } from '../middlewares/validRegister';
import sendMail from '../config/sendMail';
import { sendSms } from '../config/sendSMS';
import jwt from 'jsonwebtoken';
import { IDecodeToken } from '../config/interface';
const CLIENT_URL = process.env.BASE_URL as string;

const userController = {
	register: async (req: Request, res: Response) => {
		try {
			const { name, account, password } = req.body;
			const user = await User.findOne({ account });
			if (user) return res.status(400).json({ msg: 'Email or Phone number already exists.' });

			const passwordHash = await bcrypt.hash(password, 10);
			const newUser = { name, account, password: passwordHash };
			const active_token = generateActiveToken({ newUser });

			const url = `${CLIENT_URL}/active/${active_token}`;

			if (validateEmail(account)) {
				sendMail(account, url, 'Verify your email address');
				return res.status(200).json({ msg: 'Success! Please check your email address!' });
			} else if (validatePhone(account)) {
				sendSms(account, url, 'Verify your phone number');
				return res.status(200).json({ msg: 'Success! Please check your phone !' });
			}
		} catch (error: any) {
			return res.status(500).json({ msg: error.message });
		}
	},
	activeAccount: async (req: Request, res: Response) => {
		try {
			const { active_token } = req.body;
			const decoded = <IDecodeToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN}`);
			const { newUser } = decoded;

			if (!newUser) return res.status(400).json({ msg: 'Invalid authentication' });
			const user = new User(newUser);
			await user.save();

			return res.status(200).json({ msg: 'Account has been activated!' });
		} catch (err: any) {
			console.log(err);
			let errMsg;
			if (err.code === 11000) {
				// get error message if user already actived
				errMsg = 'account' + ' ' + err?.keyValue?.account + ' already actived.';
			} else {
				// get error if active_token.newUser don't have name
				let name = Object.keys(err?.errors)[0];
				errMsg = err.errors[`${name}`].message;
			}
			return res.status(500).json({ msg: errMsg });
		}
	},
	login: async (req: Request, res: Response) => {
		try {
			const { account, password } = req.body;

			const user = await User.findOne({ account });

			if (!user) {
				res.status(404).json({ msg: ' This account does not exist!' });
			} else {
				const isMatch = await bcrypt.compare(password, user.password);

				if (!isMatch) return res.status(400).json({ msg: 'Password is incorrect !' });

				const access_token = generateAccessToken({ id: user._id });
				const refresh_token = generateRefreshToken({ id: user._id });

				res.cookie('refresh_token', refresh_token, {
					httpOnly: true,
					path: `/users/refreshToken`,
					maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
				});
				res.json({
					user: user,
					access_token,
				});
			}
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	// handle refresh token when access token is exprise
	refreshToken: async (req: Request, res: Response) => {
		try {
			const refresh_Token = req.cookies.refresh_token;
			if (!refresh_Token) return res.status(400).json({ msg: 'Please login now !' });

			const decoded = <IDecodeToken>jwt.verify(refresh_Token, `${process.env.REFRESH_TOKEN}`);

			if (!decoded.id) return res.status(400).json({ msg: 'Please login now!' });

			const user = await User.findOne({ _id: decoded.id });

			if (!user) return res.status(404).json({ msg: 'This Account does not exist' });

			const access_token = generateAccessToken({ id: user._id });
			res.json({ access_token });
		} catch (error: any) {
			res.status(500).json({ msg: error.message });
		}
	},
	logout: async (req: Request, res: Response) => {
		try {
			res.clearCookie('refresh_token', { path: `/users/refreshToken` });
			return res.json({ msg: 'Logged out!' });
		} catch (error: any) {
			res.status(404).send({ msg: error.message });
		}
	},
};

export default userController;
