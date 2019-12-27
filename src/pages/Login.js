import React, { Component } from "react";
import LoginButton from "../components/LoginButton";
import { observer } from "mobx-react";
import fire from "../scripts/fire";
import Users from '../components/Users'
import Header from "../components/Header";
import {Link} from 'react-router-dom'




@observer
class Login extends Component {
  state = {
    userEmail: ''
  }
  _getUser() {
    fire.firestore().collection('Users').get().then((querySnapshot) => {
      querySnapshot.forEach((doc)=>{
        console.log(`${doc.id} => ${doc.data().groups}`)

      })
    })
  }


  componentDidMount() {
    this.props.store.changePage('Home')
  }
  

  render() {
      const {store} = this.props
    return (
      <div>
        <Header store={store} />
        <br />
        <div className='container'>
          
          {
            store.LoginInfo.isLoggedIn?
            <div>
              
              <Users store={store}/>
            </div>
            :<div>
              
              <LoginButton showProfile={false} store={store} />

            </div>
          }
         
        </div>
      </div>
    );
  }
}

export default Login;
