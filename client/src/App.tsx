/** @format */

import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import NotFound from './components/Notfound/NotFound';
function App() {
	return (
		<Suspense
			fallback={
				<Spin
					tip='Loading...'
					size='large'
					style={{
						display: 'block',
						fontSize: '20px',
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%,-50%)',
					}}
				/>
			}>
			<Router>
				<Switch>
					<PublicLayout exact path='/' component={React.lazy(() => import('./pages/Users/Home/HomePage'))}></PublicLayout>
					<PublicLayout exact path='/login' component={React.lazy(() => import('./pages/Users/Login Page/Login'))}></PublicLayout>

					<Route component={NotFound}></Route>
				</Switch>
			</Router>
		</Suspense>
	);
}

export default App;
