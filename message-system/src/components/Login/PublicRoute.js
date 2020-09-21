import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
	const isLogin = () => {
		if(sessionStorage.getItem('login') === true) {return true; }
		else{ return false; }
	}
	return (
		<Route {...rest} render={props => (
			isLogin() && restricted ?
			<Redirect to="/admin/recieve-messages" />
			: <Component {...props} />
		)} />
	);
};

export default PublicRoute;