import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import RoutePage from "./components/RoutePage.jsx";
import RouteDetails from "./components/RouteDetails";
// import * as Ons from "react-onsenui";
// import "onsenui/css/onsenui.css";
// import "onsenui/css/onsen-css-components.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <RoutePage />
          </Route>
          <Route path="/details/:index">
            <RouteDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
