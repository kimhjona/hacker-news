import React from "react";
import ReactDOM from "react-dom";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import * as serviceWorker from "serviceWorker";
import "styles/app.css";
import { rootReducer } from "rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { RouteContainerWrapped as RouteContainer } from "RouteContainer";

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router basename="/">
        <RouteContainer />
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
