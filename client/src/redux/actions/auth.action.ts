/** @format */
import * as api from '../../api/userAPI';
import { toast } from 'react-toastify';
import { Types } from '../constants/auth.constant';
import { IUserLogin } from '../../utils/interfaces';
export const signIn = (form: IUserLogin, history: any) => async (dispatch: any) => {
	try {
		const data = await api.singIn(form);
		dispatch({
			type: Types.LOGIN,
			payload: data,
		});
		history.push('/');
	} catch (error: any) {
		toast.error(error.msg, {
			position: toast.POSITION.TOP_RIGHT,
		});
	}
};
