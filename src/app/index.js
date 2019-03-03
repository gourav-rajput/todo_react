import React, { Component } from "react";
import { Provider } from "react-redux";
import ToDo from "./components";
import store from "./reducers";

require("./style.css");

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ToDo />
      </Provider>
    )
  }
}

export default App;
