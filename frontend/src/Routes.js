import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Base from './core/Base';
import PrivateRoutes from './auth/helper/PrivateRoutes';


const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" component={Home} exact />
                {/*<PrivateRoutes path="/user/dashboard/" exact component={} />*/}
            </Switch>
        </Router>
    );
};

export default Routes;


