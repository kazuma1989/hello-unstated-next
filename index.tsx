import ReactDOM from "react-dom";
import React from "react";
import { App } from "./App";
import { AppBare } from "./AppBare";

ReactDOM.render(
  <div>
    <h1>App with unstated-next</h1>
    <App />

    <h1>App without unstated-next</h1>
    <AppBare />
  </div>,
  document.getElementById("app")
);
