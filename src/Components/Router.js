import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "Components/Header";

const Router = () => (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route path="/" exact component={() => "Home"} />
            <Route path="/tv" component={() => "TV"} />
            <Route path="/search" component={() => "Search"} />
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>
);

export default Router;