import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";

import { Provider } from "react-redux";
import store from "./Redux/store/store";
import { MidgardPool_Action } from "./Services/mainServices";

const AppIndex = () => {
  const [poolData, setPoolData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    store.dispatch(MidgardPool_Action());
  }, []);
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <App />
      </Provider>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AppIndex />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
