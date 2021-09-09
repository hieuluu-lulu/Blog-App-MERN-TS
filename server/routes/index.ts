/** @format */
import user from './user.route';
function route(app: any) {
	app.use('/users', user);
}

export default route;
