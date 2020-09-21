import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({component: Component, ...rest}) => {
	const isLogin = () => {
        var login = JSON.parse(sessionStorage.getItem('login').toLowerCase());
		if (login === true){ 
            return true;
         }
        if(login === false) {
            return false; 
        }
    }
    console.log(isLogin);
    return (

        <Route {...rest} render={props => (
            isLogin() === true ?
            <Redirect to="/admin/recieve-messages"  />
            : <Redirect to="/login"  />
        )} />
    );
};

export default PrivateRoute;