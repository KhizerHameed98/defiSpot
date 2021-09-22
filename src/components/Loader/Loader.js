import React from "react";
import ReactLoading from "react-loading";

const Loader = () => {
  return (
    <div>
      <div className="max-w-xs mx-auto ">
        <div className="text-center mt-3 ">
          <ReactLoading
            className="text-center"
            type={"bubbles"}
            color={"grey"}
            height={"30%"}
            width={"30%"}
          />
        </div>
      </div>
    </div>
  );
};
export default Loader;
