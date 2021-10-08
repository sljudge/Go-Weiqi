import ReactDOM from "react-dom";
import React from "react";
import { Provider } from 'react-redux'

import { configureStore } from '../config'

import App from '../components/App'

const store = configureStore(/* provide initial state if any */)

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.getElementById("app")
);
