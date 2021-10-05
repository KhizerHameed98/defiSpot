import React, { useEffect } from "react";
import { useHistory } from "react-router";
import browserRoute from "../../Routes/browserRoutes";

const Main = () => {
  let history = useHistory();
  useEffect(() => {
    history.push(browserRoute.PORTFOLIO_OVERVIEW);
  }, []);
  return <div></div>;
};

export default Main;
