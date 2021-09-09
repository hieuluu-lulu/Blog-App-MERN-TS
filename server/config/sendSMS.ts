/** @format */

import { Twilio } from 'twilio';
const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const client = new Twilio(accountSid, authToken);

export const sendSms = (to: string, body: string, text: string) => {
	try {
		client.messages
			.create({
				body: `BlogDev ${text} - ${body}`,
				from: '+15122136766',
				to,
			})
			.then((message) => console.log(message));
	} catch (error) {
		console.log(error);
	}
};
