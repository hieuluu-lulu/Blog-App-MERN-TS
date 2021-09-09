/** @format */

import React from 'react';
import { Route } from 'react-router-dom';
import { Header } from '../components/Headers';
import { IRouter } from '../utils/interfaces';
import { Container } from '@material-ui/core';
export const PublicLayout: React.FC<IRouter> = ({ component: Component, ...props }) => {
	return (
		<Route
			{...props}
			render={(routerProps) => (
				<>
					<Header />
					<Container maxWidth='lg' style={{ marginTop: 30 }}>
						<Component {...routerProps} />
					</Container>
				</>
			)}
		/>
	);
};
