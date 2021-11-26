import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./Redux/store/store";
import { MidgardPool_Action } from "./Services/mainServices";
import {
  TYPE,
  METAMASK,
  KEYSTORE,
  SET_GRAPH_DATA,
} from "./Redux/actions/types";
import { GetKeyStore_TransactionHistory } from "./Services/mainServices";
import App from "./App";
import axios from "axios";
import { SERVER_URL_MAIN } from "./Routes/serverRoutes";

const AppIndex = () => {
  const [poolData, setPoolData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    store.dispatch(MidgardPool_Action());
    let type = localStorage.getItem(TYPE);
    if (type === KEYSTORE) {
      store.dispatch(GetKeyStore_TransactionHistory());
    }
    axios
      .get(`${SERVER_URL_MAIN}/api/v1/get/graph/data`)
      .then((res) => {
        // console.log("Graph data - ", res?.data?.graph?.data);
        store.dispatch({
          type: SET_GRAPH_DATA,
          payload: {
            graphDataCombined: res?.data?.graph?.data,
          },
        });
      })
      .catch((err) => console.log("Err getting graph data - ", err));
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
