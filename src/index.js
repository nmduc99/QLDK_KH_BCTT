import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Switch  } from "react-router-dom";
import LogInTo from './LogInTo';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
    
      <LogInTo/>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
