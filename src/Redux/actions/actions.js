//Auth
export {
  loadUser,
  register,
  verifyEmail,
  login,
  forgetPassword,
  resetPasswordFunction,
  verifyGoogleAuthCode,
  verifyEmailAuthCode,
  logout,
  verifySMSAuthCode,
  updateProfile,
  emailAuthentiactionOn,
  smsAuthentiactionOn,
} from "../../Services/authServices";

//Profile
export {
  updateUserDetails,
  updatePassword,
  enableGoogleAuth,
  update2FaStatus,
  TierStatus,
  CreateCompliance_Tier1,
  GetCompliance_Tier1,
} from "../../Services/profileServices";
