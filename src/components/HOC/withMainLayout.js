import React from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
const withMainLayout = (WrappedComponent) => {
  const WithMain = (props) => {
    return (
      <div>
        <Header />
        <WrappedComponent {...props} />
        <Footer />
      </div>
    );
  };

  return WithMain;
};

export default withMainLayout;
