import axios from "axios";
import {
  COINMARKETCAP_FAIL,
  COINMARKETCAP_SUCCESS,
  MIDGARDPOOL_FAIL,
  MIDGARDPOOL_SUCCESS,
  MIDGARDPOOL_REQUESTING,
} from "../Redux/actions/types";
import { mainRoute } from "../Routes/serverRoutes";
import { toast } from "react-toastify";
import browserRoute from "../Routes/browserRoutes";
import { config } from "../config";
import { TokenName } from "../components/Helper/api-names";
//alert toast
const alertToast = (error, message) => {
  if (!error) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

//BNB-BUSD
export const MidgardPool_Action = () => async (dispatch) => {
  try {
    dispatch({
      type: MIDGARDPOOL_REQUESTING,
    });

    let d = "";
    let res = await axios.get("https://midgard.thorchain.info/v2/pools");
    let data = res.data;

    let allData = [];
    for (let i = 0; i < data.length; i++) {
      let v = data[i].asset.split("-");

      data[i].asset = v[0];
      let s = data[i].asset.split(".");
      data[i].blockchain = s[0];
      data[i].asset = s[1];
      data[i].address = v[1];
      data[i].assetFullName = TokenName[data[i].asset].name;
      allData.push(data[i]);

      // let check = await axios.get(
      //   `https://api.nomics.com/v1/currencies?key=74dab9ea0b25111d3692742725381a8a982c91ae&ids=${data[i].asset}&attributes=name,id`
      // );
      // console.log("check=====>", check);
      // if (i === data.length - 1) {
      //   d = d + data[i].asset;
      // } else {
      //   d = d + data[i].asset + ",";
      // }
    }
    // let des = await axios.get(
    //   `https://api.nomics.com/v1/currencies?key=74dab9ea0b25111d3692742725381a8a982c91ae&ids=${d}&attributes=name,id`
    // );
    // setPoolData(data);
    dispatch({
      type: MIDGARDPOOL_SUCCESS,
      payload: { midgardPool: data },
    });
    // const config = {
    //   headers: {
    //     // "Content-Type": "application/json",
    //     "X-CMC_PRO_API_KEY": "356979e7-00ff-4a80-9e94-577e22c7cf9b",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //   },
    //   // qs: {
    //   //   start: "1",
    //   //   limit: "5000",
    //   //   convert: "USD",
    //   // },
    //   // json: true,
    //   // gzip: true,
    // };
    // let res = await axios.get(
    //   "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5&convert=USD"
    //   // config
    // );
    // console.log("res=========>>>>", res);
    alertToast(false, "Successfull");
    // setLoading(false);
  } catch (err) {
    // setLoading(false);
    console.log(err);
    dispatch({
      type: MIDGARDPOOL_FAIL,
    });
    const errorMsg = err?.response?.data?.msg || err.message;

    alertToast(true, errorMsg);
  }
};

//Forget Password
// export const forgetPassword =
//   ({ formData, history }) =>
//   (dispatch) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const body = JSON.stringify({ formData });
//     axios
//       .post(auth.FORGET_PASSWORD, formData, config)
//       .then(async (res) => {
//         toast.success(res.data.msg);
//         await dispatch({
//           type: FORGET_MSG,
//           payload: res.data,
//         });

//         history.push(browserRoute.SIGNIN);
//       })
//       .catch((err) => {
//         const errMsg = err?.response?.data?.msg || "Oppps, Something wrong...";
//         toast.error(errMsg);

//         dispatch({
//           type: FORGET_FAIL,
//         });
//       });
//   };

// //Register User
// export const register =
//   ({ formData, history, setLoading }) =>
//   (dispatch) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     setLoading(true);
//     const body = JSON.stringify(formData);
//     axios
//       .post(auth.SIGNUP, body, config)
//       .then(async (res) => {
//         await dispatch({
//           type: REGISTER_MSG,
//           payload: res.data,
//         });
//         alertToast(false, res && res.data && res.data.msg && res.data.msg);
//         setLoading(false);
//         history.push(browserRoute.SIGNUP_SUCCESS);
//       })
//       .catch((err) => {
//         setLoading(false);
//         dispatch({
//           type: REGISTER_FAIL,
//         });

//         const errorMsg =
//           (err &&
//             err.response &&
//             err.response.data &&
//             err.response.data.msg &&
//             err.response.data.msg) ||
//           err.message;
//         alertToast(true, errorMsg);
//       });
//   };
