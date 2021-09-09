/** @format */

import { Request, Response, NextFunction } from 'express';

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
	const { name, account, password } = req.body;

	if (!name) {
		return res.status(400).json({ msg: 'Please enter your name!' });
	} else if (name.length > 20) {
		return res.status(400).json({ msg: 'Your name must be less than 20 characters' });
	}
	if (!account) {
		return res.status(400).json({ msg: 'Please enter your email or phone!' });
	} else if (!validatePhone(account) && !validateEmail(account)) {
		return res.status(400).json({ msg: 'Email or phone number format is incorrect.' });
	}

	if (password.length < 6) {
		return res.status(400).json({ msg: 'Password must be least 6 characters' });
	}

	next();
};

export function validatePhone(phone: string) {
	const regex = /^[+]/g;
	return regex.test(phone);
}

export function validateEmail(email: string) {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(String(email).toLowerCase());
}
