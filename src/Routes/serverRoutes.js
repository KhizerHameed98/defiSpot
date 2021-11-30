// const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const SERVER_URL = "https://defispot-testnet.herokuapp/api/v1";
// export const SERVER_URL_MAIN = "https://defispot.herokuapp.com";
// export const SERVER_URL_MAIN = "https://defispot-testnet.herokuapp.com";
export const SERVER_URL_MAIN = "https://client-side-defi-spot.herokuapp.com";
export const INBOUND_ADDRESSES =
  "https://testnet.midgard.thorchain.info/v2/thorchain/inbound_addresses";

// export const MIDGARD_POOL = "https://midgard.thorchain.info/v2/pools";
// export const SERVER_URL_MAIN = "http://18.116.89.176:5000";

export const mainRoute = {
  MarketCap: `${SERVER_URL}/marketcap`,
  MIDGARD_POOL: `${SERVER_URL_MAIN}/fluctuations`,
};
