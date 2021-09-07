import {
  REGISTER_MSG,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  VERIFY_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FORGET_SUCCESS,
  FORGET_FAIL,
  FORGET_MSG,
  RESET_SUCCESS,
  RESET_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  ERR_USERS,
  USER_LOADED_DATA,
  AUTH_ERROR_DATA,
  LOGOUT,
  SET_AUTH_VERIFICATION,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERR,
  IS_EMAIL_AUTH_ON_SUCCESS,
  IS_EMAIL_AUTH_ON_ERR,
  UPDATE_2FA_STATUS_SUCCESS,
  UPDATE_2FA_STATUS_ERR,
  IS_SMS_AUTH_ON_SUCCESS,
  IS_SMS_AUTH_ON_ERR,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERR,
  UPDATE_USER_ERR,
  UPDATE_USER_SUCCESS,
  ENABLE_2FA_SUCCESS,
  ENABLE_2FA_ERR,
  GET_TIER_STATUS_FAIL,
  GET_TIER_STATUS_SUCCESS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token") || null,
  userDetails: localStorage.getItem("userDetails"),
  loading: true,
  isAuthenticated: null,
  userDetails: {},
  updatePassword: {},
  userWallet: {},
  isEmailAuthOn: {},
  isGoogleAuthOn: {},
  isSMSAuthOn: {},
  userUpdate: {},
  tiersStatus: null,
  users: [],
  error: {},
  errors: [],
};



export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADED:
    case REGISTER_MSG:
    case REGISTER_SUCCESS:
    case FORGET_MSG:
    case FORGET_SUCCESS:
    case RESET_SUCCESS:
    case SET_AUTH_VERIFICATION:
    case IS_EMAIL_AUTH_ON_SUCCESS:

    case UPDATE_2FA_STATUS_SUCCESS:
    case IS_SMS_AUTH_ON_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case ENABLE_2FA_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case ERR_USERS:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case REGISTER_FAIL:
    case VERIFY_FAIL:
    case FORGET_FAIL:
    case RESET_FAIL:
    case AUTH_ERROR_DATA:
    case AUTH_ERROR:
    case ENABLE_2FA_ERR:

    case IS_EMAIL_AUTH_ON_ERR:
    case UPDATE_2FA_STATUS_ERR:
    case IS_SMS_AUTH_ON_ERR:
    case UPDATE_PROFILE_ERR:
    case UPDATE_PASSWORD_ERR:
    case UPDATE_USER_ERR:
      return {
        ...state,
        errors: payload,
        loading: false,
      };

    case USER_LOADED_DATA:
      localStorage.setItem("userDetails", JSON.stringify(payload.userDetails));
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userDetails", JSON.stringify(payload.userDetails));
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.clear();

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true,
        userDetails: {},
        userWallet: {},
        userDetails: null,
        tiersStatus: null,
        users: [],
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userDetails: payload.data,
        loading: false,
      };
    case GET_TIER_STATUS_SUCCESS:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};
