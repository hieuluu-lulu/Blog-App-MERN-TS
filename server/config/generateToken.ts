/** @format */

import jwt from 'jsonwebtoken';
export const generateActiveToken = (payload: object) => {
	return jwt.sign(payload, `${process.env.ACTIVE_TOKEN}`, { expiresIn: '5m' });
};
export const generateAccessToken = (payload: object) => {
	return jwt.sign(payload, `${process.env.ACCESS_TOKEN}`, { expiresIn: '15m' });
};
export const generateRefreshToken = (payload: object) => {
	return jwt.sign(payload, `${process.env.REFRESH_TOKEN}`, { expiresIn: '30d' });
};
