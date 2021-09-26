import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={() => "Home"} />
            <Route path="/tv" component={() => "TV"} />
            <Route path="/search" component={() => "Search"} />
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>
);

export default Router;