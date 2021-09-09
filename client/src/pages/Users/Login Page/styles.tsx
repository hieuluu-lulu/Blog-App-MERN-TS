/** @format */

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const loginStyles = makeStyles((theme: Theme) =>
	createStyles({
		login: {
			padding: '30px',
			border: '1px solid #ccc',
			borderRadius: '3px',
		},
		login__header: {
			textAlign: 'center',
			fontSize: '16px',
			textTransform: 'uppercase',
		},
		loginBtn: {
			width: '100%',
			textTransform: 'uppercase',
		},
	}),
);
