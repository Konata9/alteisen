import React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import lazyLoad from "./LazyLoad";

import App from "./../containers/app";

const Canvas = lazyLoad(() => import("./../components/Canvas"));
const Home = lazyLoad(() => import("./../components/Home"));

const Root = () => {
  return (
    <Switch>
      <Route path="/canvas" component={Canvas} />
      <Route
        path="/"
        render={() => {
          return (
            <App>
              <Switch>
                <Route path="/" exact component={Home} />
              </Switch>
            </App>
          );
        }}
      />
      } />
    </Switch>
  );
};

export default hot(Root);
