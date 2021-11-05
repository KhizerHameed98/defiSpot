import React from 'react';
import withMainLayout from "../HOC/withMainLayout";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import Images from "../Helper/AllImages";

const Learn = () => {
    return (
        <div>
          <section>
              <div class="container">
                  <h2 className="d-flex justify-content-center marketbannerhed" style={{marginTop: "80px"}}>Learn DeFi trading</h2>
                  <p className="learnp111">A Beginner’s Guide to decentralized trading</p>
                  <div className="d-flex justify-content-center mb-5 mt-2">
                    <button className="buttonlearnmore1234">Learn now</button>
                    <button className="buttonlearnmorebordered ml-4" style={{fontWeight: "normal"}}>Video tutorial</button>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                   <p className="learnpage-234">Search anything about crypto</p>
                    <img style={{width:"48px", height:"48px"}} src={Images.learnsearch}/>
                  </div>
                  <hr class="solid"/>
                  <div className="d-flex justify-content-between mb-3">
                  <div class="dropdown">
  <button class="btn btn-secondary234" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  Recently added
  <img className="pl-5" src={Images.ButtonSecondarySmall}/>
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>
                  <ul className="list-unstyled d-flex">
            <li>
              <button
               className="alltype"
                style={{ color: "#fff", fontFamily: "DM Sans" }}
              >
                Tutorial
              </button>
            </li>
            <li>
              <button
                className="alltype-nonActive"
                style={{ color: "#fff", fontFamily: "DM Sans" }}
              >
               Liquidity providing 
              </button>
            </li>
            <li>
              <button
               className="alltype-nonActive"
                style={{ color: "#fff", fontFamily: "DM Sans" }}
              >
               Trading
              </button>
            </li>
            <li>
              <button
             className="alltype-nonActive"
                style={{ color: "#fff", fontFamily: "DM Sans" }}
              >
                Wallet
              </button>
            </li>
          </ul>
                  </div>
                  {/* new section cards starts */}
                  <section>
                      <div className="container mt-5">
                        <div className="row">
                            <div className="col-lg-4" style={{paddingLeft:"0px"}}>
                            <div class="card" style={{border:"none"}}>
  <img src={Images.learnvideo}/>
  <span className="spanclass-343" style={{fontWeight: "normal", paddingRight: "11px"}}>video tutorial</span>
  <div class="card-body" style={{paddingLeft:"0px",paddingRight:"0px"}}>
      <div>
      <div className="d-flex">
          <img style={{width:"40px"}} src={Images.trainer}/>
          <div className="ml-2">
    <h5 class="card-title cardtitle234">CEX vs DEX</h5>
    <p class="card-text pname4566">First name</p>
    </div>
    </div>
    </div>
    <div>
    <p class="card-text pname456667" style={{fontWeight: "normal"}}>POPULAR</p>
    </div>

  </div>
</div>
</div>
{/* card 2 */}
<div className="col-lg-4">
                            <div class="card" style={{border:"none"}}>
  <img src={Images.learnvideo} height="300px"/>
  <span className="spanclass-343900" style={{fontWeight: "normal", paddingRight: "11px"}}>POPULAR</span>
  <div class="card-body" style={{paddingLeft:"0px",paddingRight:"0px"}}>
      <div>
      <div className="d-flex">
          <img style={{width:"40px"}} src={Images.traineravatar}/>
          <div className="ml-2">
    <h5 class="card-title cardtitle234">Introduction to LP</h5>
    <p class="card-text pname4566">LP University</p>
    </div>
    </div>
    </div>
    <div>
    <p class="card-text pname456667" style={{fontWeight: "normal"}}>POPULAR</p>
    </div>

  </div>
</div>
</div>
{/* card 3 */}
<div className="col-lg-4" style={{paddingRight:"0px"}}>
                            <div class="card" style={{border:"none"}}>
  <img src={Images.learnvideo}/>
  <span className="spanclass-343339" style={{fontWeight: "normal", paddingRight: "11px"}}>NEW</span>
  <div class="card-body" style={{paddingLeft:"0px",paddingRight:"0px"}}>
      <div>
      <div className="d-flex">
          <img style={{width:"40px"}} src={Images.trainer}/>
          <div className="ml-2">
    <h5 class="card-title cardtitle234">What is DeFi?</h5>
    <p class="card-text pname4566">First name</p>
    </div>
    </div>
    </div>
    <div>
    <p class="card-text pname456667" style={{fontWeight: "normal"}}>POPULAR</p>
    </div>

  </div>
</div>
</div>
                            </div>
                            {/* new row */}
                            <div className="row mt-4" >
                            <div className="col-lg-4" style={{paddingLeft:"0px"}}>
                            <div class="card" style={{border:"none"}}>
  <img src={Images.learnvideo}/>
  <span className="spanclass-343" style={{fontWeight: "normal", paddingRight: "11px"}}>video tutorial</span>
  <div class="card-body" style={{paddingLeft:"0px",paddingRight:"0px"}}>
      <div>
      <div className="d-flex">
          <img style={{width:"40px"}} src={Images.trainer}/>
          <div className="ml-2">
    <h5 class="card-title cardtitle234">Top 7 NFT usecase</h5>
    <p class="card-text pname4566">First name</p>
    </div>
    </div>
    </div>
    <div>
    <p class="card-text pname456667" style={{fontWeight: "normal"}}>POPULAR</p>
    </div>

  </div>
</div>
</div>
<div className="col-lg-4">
                            <div class="card" style={{border:"none"}}>
  <img src={Images.learnvideo} height="300px"/>
  <span className="spanclass-343" style={{fontWeight: "normal", paddingRight: "11px"}}>video tutorial</span>
  <div class="card-body" style={{paddingLeft:"0px",paddingRight:"0px"}}>
      <div>
      <div className="d-flex">
          <img style={{width:"40px"}} src={Images.trainer}/>
          <div className="ml-2">
    <h5 class="card-title cardtitle234">Top 7 NFT usecase</h5>
    <p class="card-text pname4566">First name</p>
    </div>
    </div>
    </div>
    <div>
    <p class="card-text pname456667" style={{fontWeight: "normal"}}>POPULAR</p>
    </div>

  </div>
</div>
</div>
<div className="col-lg-4" style={{paddingRight:"0px"}}>
                            <div class="card" style={{border:"none"}}>
  <img src={Images.learnvideo}/>
  <span className="spanclass-343" style={{fontWeight: "normal", paddingRight: "11px"}}>video tutorial</span>
  <div class="card-body" style={{paddingLeft:"0px",paddingRight:"0px"}}>
      <div>
      <div className="d-flex">
          <img style={{width:"40px"}} src={Images.trainer}/>
          <div className="ml-2">
    <h5 class="card-title cardtitle234">Top 7 NFT usecase</h5>
    <p class="card-text pname4566">First name</p>
    </div>
    </div>
    </div>
    <div>
    <p class="card-text pname456667" style={{fontWeight: "normal"}}>POPULAR</p>
    </div>

  </div>
</div>
</div>   
 </div>
 <div class="d-flex justify-content-center mb-5 mt-5">
            <button type="button" class="btn loaderbutton">
            More articles
            <img className="pl-3 mb-1" src={Images.morearticle}/>
            </button>
          </div>
                      </div>
                  </section>
              </div>
              </section>  
        </div>
    )
}

export default withMainLayout(Learn);
