/** @format */

import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { signIn } from '../../../redux/actions/auth.action';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../../hooks/hookState';
import { loginStyles } from './styles';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
export default function Login() {
	const dispatch = useAppDispatch();
	const classes = loginStyles();
	const history = useHistory();
	const [form] = Form.useForm();
	const onFinish = (values: any) => {
		dispatch(signIn(values, history));
	};

	return (
		<Row justify='center'>
			<Col lg={12} sm={24} md={12}>
				<div className={classes.login}>
					<Form
						form={form}
						name='basic'
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 20 }}
						initialValues={{ remember: true }}
						onFinish={onFinish}
						autoComplete='off'>
						<div className={classes.login__header}>
							<LockOpenIcon />
							<h1>Login</h1>
						</div>
						<Form.Item label='Account' name='account' rules={[{ required: true, message: 'Please input your account!' }]}>
							<Input />
						</Form.Item>

						<Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
							<Input.Password />
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 4, span: 20 }}>
							<Button type='primary' htmlType='submit' className={classes.loginBtn}>
								Login
							</Button>
						</Form.Item>
						<Form.Item
							style={{ margin: '5px 0', textAlign: 'center', width: '100%' }}
							wrapperCol={{
								offset: 4,
								span: 20,
							}}>
							<Link to='/register'>
								<Typography style={{ float: 'right' }}>{`You don't have account ? Sign Up`}</Typography>
							</Link>
						</Form.Item>
					</Form>
				</div>
			</Col>
		</Row>
	);
}
