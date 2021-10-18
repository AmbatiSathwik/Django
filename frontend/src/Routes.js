import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Base from './core/Base';

const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/base/" component={Base} exact />
            </Switch>
        </Router>
    );
};

export default Routes;


