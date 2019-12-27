import React, { Component } from "react";
import M from "materialize-css";
import "../css/sidenav.css";
import LoginButton from "./LoginButton";
import { observer } from "mobx-react";
import Image from "../images/office.jpg";
import { Link } from "react-router-dom";

@observer
class Sidenav extends Component {
  componentDidMount() {
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems, {});
  }
  render() {
    const { store } = this.props;
    return (
      <div>
        <ul id='slide-out' className='sidenav sidenav-fixed'>
          <li>
            <div className='user-view'>
              <div className='background'>
                <img src={Image} />
              </div>
              {store.LoginInfo.isLoggedIn ? (
                <div>
                  <Link to='/profile'>
                    <img
                      className='circle sidenav-close'
                      src={store.LoginInfo.user.photoURL}
                    />
                  </Link>
                  <a href='#name'>
                    <span className='white-text name'>
                      {store.LoginInfo.user.displayName}
                    </span>
                  </a>
                  <a href='#email'>
                    <span className='white-text email'>
                      {store.LoginInfo.user.email}
                    </span>
                  </a>
                </div>
              ) : null}
            </div>
          </li>
          <li className='sidenav-close'>
            <a href='#!'>
              <i className='fab fa-google fa-2x' />
              <LoginButton showProfile={false} store={store} />
            </a>
          </li>
          <li className='sidenav-close'>
            <Link to='/profile'>Profile</Link>
          </li>

          <li className='sidenav-close'>
            <Link to='/'>Home</Link>
          </li>
          <li className='sidenav-close'>
            <Link to='/group'>New Group</Link>
          </li>
          <li className='sidenav-close'>
            <Link to='/join-group'>Join Group</Link>
          </li>
        </ul>
        <a href='#' data-target='slide-out' className='sidenav-trigger'>
          <i className='material-icons menuColor'>menu</i>
        </a>
      </div>
    );
  }
}

export default Sidenav;
