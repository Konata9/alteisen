import React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import lazyLoad from "./LazyLoad";

import App from "./../containers/app";

const Home = lazyLoad(() => import("./../components/Home"));
const Hello = lazyLoad(() => import("./../components/Hello"));
const Display = lazyLoad(() => import("./../containers/Display"));
const Canvas = lazyLoad(() => import("./../components/Canvas"));
const EditItem = lazyLoad(() => import("./../components/EditItem"));

const Root = () => {
  return (
    <Switch>
      <Route path="/display" component={Display} />
      <Route path="/canvas" component={Canvas} />
      <Route path="/edit" component={EditItem} />
      <Route
        path="/"
        render={() => {
          return (
            <App>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/hello" exact component={Hello} />
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
