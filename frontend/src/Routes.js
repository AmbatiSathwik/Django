import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Base from './core/Base';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import Signup from './user/Signup'


const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/signup" component={Signup} exact />
                {/*<PrivateRoutes path="/user/dashboard/" exact component={} />*/}
            </Switch>
        </Router>
    );
};

export default Routes;


