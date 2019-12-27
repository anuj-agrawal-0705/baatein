import React, { Component } from "react";
import fire from "../scripts/fire";
import M from 'materialize-css'
import { observer } from "mobx-react";
import firebase from 'firebase'
import Login from '../pages/Login'

@observer
class NewUser extends Component {
  state = {
    setUserName: false
  }
    componentDidMount() {
        
        
    }
    _userToglobal(uName) {
      let globalId = ''
      const db = fire.firestore();
      db.collection('Groups').where('gId','==','g0')
      .get()
      .then(querySnapshot=>{
        querySnapshot.forEach(doc=>{
          globalId = doc.id
        })
      })
      .then(()=>{
        const docRef = db.collection('Groups').doc(globalId)
      docRef.update({
        members: firebase.firestore.FieldValue.arrayUnion(uName)
      });
      })
      
    }
  _newUser() {
    const docData = {
      email: this.props.store.LoginInfo.user.email,
      groups: [{gId: 'g0',
                gName: 'Global'}],
      userName: document.getElementById("icon_prefix").value
    };
    
    const db = fire.firestore();
    db.collection("Users")
      .add(docData)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      })
      .then(()=>this._userToglobal(docData.userName))
      .then(()=>{
        this.setState({
          setUserName: true
        })
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }
  render() {
    const {store} = this.props
    return (
      <div>
        {
          this.state.setUserName?
          <Login store={store} />
          :
          <div className='row'>
          <h5>New User</h5>
        <form className='col s12 '>
          <div className='row'>
            <div className='input-field col m4 s6'>
              <i className='material-icons prefix'>account_circle</i>
              <input id='icon_prefix' type="text" className='validate' />
              <label htmlFor='icon_prefix'>User Name</label>
            </div>
          </div>
        </form>
        <button onClick={() => this._newUser()}
        className='btn waves-effect waves-light pink accent-2'>
        Submit
        <i className='material-icons right'>send</i>
      </button>
      </div>

        }
       
        
      </div>
    );
  }
}

export default NewUser;
