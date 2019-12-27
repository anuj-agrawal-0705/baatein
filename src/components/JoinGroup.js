import React, { Component } from "react";
import fire from "../scripts/fire";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import Header from "./Header";
import firebase from "firebase";
import LoginButton from "./LoginButton";

@observer
class JoinGroup extends Component {
  _isMounted = false;
  state = {
    groups: [],
    selectedGroupDocId: "",
    userDocId: "",
    userName: "",
    isJoined: false
  };
  _getUser() {
    const db = fire.firestore();
    const { store } = this.props;
    const loginEmail = store.LoginInfo.user.email;
    db.collection("Users")
      .where("email", "==", loginEmail)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            userDocId: doc.id,
            userName: doc.data().userName
          });
        });
      });
  }
  _getGroups() {
    console.log("join group");
    const db = fire.firestore();
    let grpList = [];
    db.collection("Groups")
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot);
        querySnapshot.forEach(doc => {
          grpList.push({
            gId: doc.data().gId,
            groupName: doc.data().groupName
          });
        });
      })
      .then(() => {
        this.setState({
          groups: grpList
        });
      });
  }
  _groupJoin() {
    const db = fire.firestore();
    let userDocId = "";
    let userName = "";
    let selectedGroupDocId = "";
    const { store } = this.props;
    const loginEmail = store.LoginInfo.user.email;
    db.collection("Users")
      .where("email", "==", loginEmail)
      .get()
      .then(querySnapshot => {
        console.log("1");
        querySnapshot.forEach(doc => {
          userName = doc.data().userName;
          userDocId = doc.id;
          console.log(userDocId, "ff ", userName);
        });
      })
      .then(() => {
        // this.setState({
        //   userDocId,
        //   userName
        // }).then(()=>{
        //   console.log(this.state.userDocId)
        // })
      })
      .then(() => {
        console.log("2");
        db.collection("Groups")
          .where("gId", "==", store.currentGroup.gId)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              selectedGroupDocId = doc.id;
            });
          })
          .then(() => {
            // this.setState({
            //   selectedGroupDocId
            // })

            console.log("hello", selectedGroupDocId);
          })
          .then(() => {
            console.log("3", selectedGroupDocId, userDocId, userName);
            db.collection("Groups")
              .doc(selectedGroupDocId)
              .update({
                members: firebase.firestore.FieldValue.arrayUnion(userName)
              });
          })
          .then(() => {
            console.log("4");
            db.collection("Users")
              .doc(userDocId)
              .update({
                groups: firebase.firestore.FieldValue.arrayUnion({
                  gId: store.currentGroup.gId,
                  gName: store.currentGroup.gName
                })
              });
          })
          .then(() => {
            this.setState({
              isJoined: true
            });
          });
      });
  }
  componentDidMount() {
    this._isMounted = true;
    const { store } = this.props;
    console.log("helo");
    store.changePage("Join Group");
    this._getGroups();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { store } = this.props;
    return (
      <div>
        <Header store={store} />
        {
          store.LoginInfo.isLoggedIn?
          <div className='container'>
          <div className='collection'>
            {this.state.groups.map(group => {
              return (
                <a
                  href='#'
                  className='collection-item'
                  key={group.gId}
                  onClick={() => {
                    store.setGroup(group.gId, group.groupName);
                    this._groupJoin();
                  }}
                >
                  {group.groupName}
                </a>
              );
            })}
          </div>
          {this.state.isJoined ? (
            <Link to={`/chat/${store.currentGroup.gId}`}>
              Open {store.currentGroup.gName}
            </Link>
          ) : null}
        </div>
        : 
        <div className='container'>
          <br/>
          <LoginButton showProfile={false} store={store} />
          </div>
        }
        
        
      </div>
    );
  }
}

export default JoinGroup;
