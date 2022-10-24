import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// redux toolkit
import { Provider, provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
