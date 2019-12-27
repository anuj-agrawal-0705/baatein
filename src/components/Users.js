import React, { Component } from "react";
import fire from "../scripts/fire";
import NewUser from './NewUser'
import { observer } from "mobx-react";
import {Link} from 'react-router-dom'

@observer
class Users extends Component {
  state = {
    groupList: [],
    userEmail: "",
    userData: {},
    newUser: false
  };
  componentDidMount() {
    this._getUser();
  }
  _getUser() {
    const {store} = this.props
    const loginEmail = store.LoginInfo.user.email;
    const db = fire.firestore();
    db.collection("Users")
      .where("email", "==", loginEmail)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // console.log(doc.id, " => ", doc.data());
          const grps = this.state.groupList;
          doc.data().groups.forEach(group => {
            grps.push({
              gId: group.gId,
              gName:group.gName});
          });
          this.setState({
            groupList: grps,
            userData: doc.data(),
          });
          store.setName(doc.data().userName)
        });
      })
      .then(()=>{
        if(this.state.groupList.length === 0)
      {
        console.log('new user',this.state.groupList);
        this.setState({
          newUser: true
        })
      }
      else {
        console.log('old user',this.state.groupList);
      }
      })
      
  }
  render() {
    const {store} = this.props
    return (
      <div>
        <div >
          
          {
            this.state.newUser?
            <NewUser store={store}/>
            :
            <div className='collection'>

            {this.state.groupList.map(group => {
              return (
                <Link to={`/chat/${group.gId}`} className='collection-item' key={group.gId} onClick={()=>{store.setGroup(group.gId,group.gName)}}>
                  <span className='new badge'>4</span>
                  {group.gName}
                </Link>
              );
             })}
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Users;
