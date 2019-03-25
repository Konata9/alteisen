import * as React from "react";
import Bundle from "./Bundle";

const Loading = () => <div>Loading...</div>;

export const lazyLoad = (loadComponent: Object) => (props: Object) => (
  <Bundle load={loadComponent}>
    {(Comp: any) => (Comp ? <Comp {...props} /> : <Loading/>)}
  </Bundle>
);
