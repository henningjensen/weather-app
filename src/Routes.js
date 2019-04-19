import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import HistoryToday from "./containers/HistoryToday";
import NotFound from "./containers/NotFound";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/today" exact component={HistoryToday} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
