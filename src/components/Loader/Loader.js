import React from "react";
import ReactLoading from "react-loading";

const Loader = ({ height, width }) => {
  return (
    <div>
      <div className="max-w-xs mx-auto ">
        <div className="text-center mt-3 ">
          <ReactLoading
            className="text-center"
            type={"bubbles"}
            color={"grey"}
            height={height}
            width={width}
          />
        </div>
      </div>
    </div>
  );
};
export default Loader;
