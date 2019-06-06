import React from "react";
import { Route, IndexRedirect } from "react-router";
import { Spin } from "antd";
import { asyncComponent } from 'react-async-component';


const BaseLayout = asyncComponent({
  resolve: () => new Promise(resolve =>
    require.ensure([], require => {
      resolve(require("@/layouts/baseLayout"));
    })
  )
});
const Index = asyncComponent({
  resolve: () => new Promise(resolve =>
    require.ensure([], require => {
      resolve(require("@/pages/Index"));
    })
  ),
});

import NotFound from "@/pages/404";


const Routers = (
  <Route path="/" component={BaseLayout}>
    <IndexRedirect to="index"/>
    <Route path="index" component={Index} />
    <Route path="*" component={NotFound} />
  </Route>
);
export default Routers;
