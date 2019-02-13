import React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import lazyLoad from "./LazyLoad";

import App from "./../containers/app";

const Canvas = lazyLoad(() => import("./../containers/Canvas"));

const Root = () => {
  return (
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/canvas" exact component={Canvas} />
    </Switch>
  );
};

export default hot(Root);
