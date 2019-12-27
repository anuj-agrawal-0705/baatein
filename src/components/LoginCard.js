import React, { Component } from "react";
import LoginButton from "./LoginButton";
import appStore from "../Store";

class LoginCard extends Component {
  render() {
    return (
      <div>
        <div className='row m6 push-m6 modal'>
            <div><p></p></div>
          <div className='col s6 m4 l4 push-m4 modal-content'>
            <div className='card-panel '>
              <span>
                 <LoginButton showProfile={false} store={appStore} />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginCard;
