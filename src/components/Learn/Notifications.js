import React, { useState } from "react";
import withMainLayout from "../HOC/withMainLayout";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import Images from "../Helper/AllImages";

const data = [
  {
    title: "Login attempted from new IP",
    date: "2021-03-10 20:19:15",
    body: "Hello, youve reset the Google Authentication on your account successfully. Your old security items have expired and new security items have now been enabled",
  },
  {
    title: "Login attempted from new IP",
    date: "2021-03-10 20:19:15",
    body: "Hello, youve reset the Google Authentication on your account successfully. Your old security items have expired and new security items have now been enabled",
  },
  {
    title: "Login attempted from new IP",
    date: "2021-03-10 20:19:15",
    body: "Hello, youve reset the Google Authentication on your account successfully. Your old security items have expired and new security items have now been enabled",
  },
  {
    title: "Login attempted from new IP",
    date: "2021-03-10 20:19:15",
    body: "Hello, youve reset the Google Authentication on your account successfully. Your old security items have expired and new security items have now been enabled",
  },
  {
    title: "Login attempted from new IP",
    date: "2021-03-10 20:19:15",
    body: "Hello, youve reset the Google Authentication on your account successfully. Your old security items have expired and new security items have now been enabled",
  },
  {
    title: "Login attempted from new IP",
    date: "2021-03-10 20:19:15",
    body: "Hello, youve reset the Google Authentication on your account successfully. Your old security items have expired and new security items have now been enabled",
  },
];

function Notifications() {
  const [notificationsData, setNotificationsData] = useState(data);
  return (
    <>
      <section style={{ backgroundColor: "#F4F5F6" }}>
        <div
          style={{ backgroundColor: "#fcfcfd" }}
          className="container pt-4 pb-4 pr-4 pl-4"
        >
          <div className="row">
            <div className="col-lg-8">
              <h2 className="u-notificatiomnheadinfg099">Notifications</h2>
            </div>
            <div className="col-lg-4">
              <div className="d-flex justify-content-end">
                <button class="n-primaryNotifactionButtonss btnHoverWhite">
                  View all
                </button>
                <button
                  class="n-secondaryNotifactionButton ml-2"
                  onClick={() => setNotificationsData("")}
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
          <hr className="solid" />
          <div className="row">
            <div className="col-lg-7">
              {notificationsData.length > 0 ? (
                notificationsData.map((d) => (
                  <div>
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <h6 className="u-notificationheadinf4555">{d.title}</h6>
                      <div className="d-flex">
                        <p className="pr-2 datecalsssnotification88">
                          {d.date}
                        </p>
                        <img
                          className="u-notificationaimages4444"
                          src={Images.notificationdot}
                        />
                      </div>
                    </div>
                    <p className="u-paragraphnotification8777">{d.body}</p>
                    <hr className="solid" />
                  </div>
                ))
              ) : (
                <div>No notifications available</div>
              )}

              {/* <div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <h6 className="u-notificationheadinf4555">
                    Login attempted from new IP
                  </h6>
                  <div className="d-flex">
                    <p className="pr-2 datecalsssnotification88">
                      2021-03-10 20:19:15
                    </p>
                    <img
                      className="u-notificationaimages4444"
                      src={Images.notificationdot}
                    />
                  </div>
                </div>
                <p className="u-paragraphnotification8777">
                  Hello, you've reset the Google Authentication on your account
                  successfully. Your old security items have expired and new
                  security items have now been enabled
                </p>
                <hr className="solid" />
              </div>
              <div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <h6 className="u-notificationheadinf4555">
                    Login attempted from new IP
                  </h6>
                  <div className="d-flex">
                    <p className="pr-2 datecalsssnotification88">
                      2021-03-10 20:19:15
                    </p>
                    <img
                      className="u-notificationaimages4444"
                      src={Images.notificationdot}
                    />
                  </div>
                </div>
                <p className="u-paragraphnotification8777">
                  Hello, you've reset the Google Authentication on your account
                  successfully. Your old security items have expired and new
                  security items have now been enabled
                </p>
                <hr className="solid" />
              </div>
              <div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <h6 className="u-notificationheadinf4555">
                    Login attempted from new IP
                  </h6>
                  <div className="d-flex">
                    <p className="pr-2 datecalsssnotification88">
                      2021-03-10 20:19:15
                    </p>
                    <img
                      className="u-notificationaimages4444"
                      src={Images.notificationdot}
                    />
                  </div>
                </div>
                <p className="u-paragraphnotification8777">
                  Hello, you've reset the Google Authentication on your account
                  successfully. Your old security items have expired and new
                  security items have now been enabled
                </p>
                <hr className="solid" />
              </div>
              <div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <h6 className="u-notificationheadinf4555">
                    Login attempted from new IP
                  </h6>
                  <div className="d-flex">
                    <p className="pr-2 datecalsssnotification88">
                      2021-03-10 20:19:15
                    </p>
                    <img
                      className="u-notificationaimages4444"
                      src={Images.notificationdot}
                    />
                  </div>
                </div>
                <p className="u-paragraphnotification8777">
                  Hello, you've reset the Google Authentication on your account
                  successfully. Your old security items have expired and new
                  security items have now been enabled
                </p>
                <hr className="solid" />
              </div>
              <div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <h6 className="u-notificationheadinf4555">
                    Login attempted from new IP
                  </h6>
                  <div className="d-flex">
                    <p className="pr-2 datecalsssnotification88">
                      2021-03-10 20:19:15
                    </p>
                    <img
                      className="u-notificationaimages4444"
                      src={Images.notificationdot}
                    />
                  </div>
                </div>
                <p className="u-paragraphnotification8777">
                  Hello, you've reset the Google Authentication on your account
                  successfully. Your old security items have expired and new
                  security items have now been enabled
                </p>
                <hr className="solid" />
              </div> */}
            </div>
            <div className="col-lg-5"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default withMainLayout(Notifications);
