import "./assets/css/style.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import browserRoute from "./Routes/browserRoutes";
import Home from "./components/Home/HeroHome";
import Market from "./components/Market/Market";
import PrivateRoute from "./components/HOC/PrivateRoute";
import BuyPlatform from "./components/BuyMarket/BuyPlatform";
import Assets from "./components/Portfolio/Assets";
import PrivatePortfolioRoute from "./components/HOC/PrivatePortfolioRoute";
import Overview from "./components/Portfolio/Overview";
import Activity from "./components/Portfolio/Activity";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute exact path={browserRoute.HOME} component={Home} />
          <PrivateRoute exact path={browserRoute.MARKET} component={Market} />
          <PrivateRoute
            exact
            path={browserRoute.BUYMARKET}
            component={BuyPlatform}
          />

          <PrivatePortfolioRoute
            exact
            path={browserRoute.PORTFOLIO_ASSETS}
            component={Assets}
          />
          <PrivatePortfolioRoute
            exact
            path={browserRoute.PORTFOLIO}
            component={Overview}
          />
          <PrivatePortfolioRoute
            exact
            path={browserRoute.PORTFOLIO_ACTIVITY}
            component={Activity}
          />

          <Redirect from="/" to={browserRoute.HOME} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
