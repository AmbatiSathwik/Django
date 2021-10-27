import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Base from './core/Base';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import Signup from './user/Signup'
import Signin from './user/Signin'
import UserDashboard from './user/UserDashboard';



const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/signup" component={Signup} exact />
                <Route path="/signin" component={Signin} exact />
                <PrivateRoutes path="/user/dashboard/" exact component={UserDashboard} /> 
            </Switch>
        </Router>
    );
};

export default Routes;


