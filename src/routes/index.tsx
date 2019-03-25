import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { lazyLoad } from "./LazyLoad";

import App from "./../containers/app";

const Studio = lazyLoad(() => import("./../containers/Studio/Studio"));

const Root = () => {
  return (
    <Switch>
      <Route path="/" exact component={App}/>
      <Route path="/studio" exact component={Studio}/>
    </Switch>
  );
};

export default hot(Root);
