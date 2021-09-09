/** @format */

const nodemailer = require('nodemailer');
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = process.env.CLIENT_ID as string;
const CLIENT_SECRET = process.env.CLIENT_SECRET as string;
const CLIENT_REFRESH_TOKEN = process.env.CLIENT_REFRESH_TOKEN as string;
const REDIRECT_URI = process.env.REDIRECT_URI as string;
const USER_EMAIL = process.env.USER_EMAIL as string;

const sendMail = async (to: string, url: string, text: string) => {
	const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
	oAuth2Client.setCredentials({ refresh_token: CLIENT_REFRESH_TOKEN });
	try {
		const accessToken = await oAuth2Client.getAccessToken();
		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: USER_EMAIL,
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: CLIENT_REFRESH_TOKEN,
				accessToken: accessToken,
			},
		});

		const mailOptions = {
			from: USER_EMAIL,
			to: to,
			subject: 'BlogDev',
			html: `
              <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
              <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to BlogDev.</h2>
              <p>Congratulations! You're almost set to start using BlogDEV.
                  Just click the button below to validate your email address.
              </p>
              
              <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${text}</a>
          
              <p>If the button doesn't work for any reason, you can also click on the link below:</p>
          
              <div>${url}</div>
              </div>
            `,
		};

		const result = await transport.sendMail(mailOptions);
		return result;
	} catch (error) {
		console.log(error);
	}
};
export default sendMail;
