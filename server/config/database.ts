/** @format */

import { connect, ConnectOptions } from 'mongoose';

const URI = process.env.MONGO_URL as string;
const options = {
	autoIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
} as ConnectOptions;
async function connectDB(): Promise<void> {
	try {
		await connect(URI, options);
		console.log('Connected to Mongo Successfully');
	} catch (error) {
		console.error(error);
	}
}
export default connectDB;
