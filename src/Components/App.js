import React from "react";
import Router from "Components/Router";
import GlobalStyles from "Components/GlobalStyles";
import { HelmetProvider } from "react-helmet-async";

const App = () => (
    <HelmetProvider>
        <Router />
        <GlobalStyles />
    </HelmetProvider>
);

export default App;