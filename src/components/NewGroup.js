import React, { Component } from "react";
import fire from "../scripts/fire";
import { observer } from "mobx-react";
import firebase from "firebase";
import Header from "../components/Header";
import {Link} from 'react-router-dom'

@observer
class NewGroup extends Component {
  state = {
    groupData: {
      gId: "g",
      groupName: "",
      members: []
    },
    groupCount: 0,
    grps: [],
    docId: "",
    isCreated: false
  };
  componentDidMount() {
    const {store} = this.props
    store.changePage('New Group')
  }
  _createGroup() {
    const { store } = this.props
    const db = fire.firestore();
    let groupId = "";
    const loginEmail = store.LoginInfo.user.email;
    let userRef = db.collection("Users").where("email", "==", loginEmail);
    db.collection("Groups")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            groupCount: this.state.groupCount + 1
          });
        });
      })
      .then(() => {
        groupId = this.state.groupData.gId + (this.state.groupCount + 1);
      })
      .then(() => {
        userRef
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              let mem = [];
              mem.push(doc.data().userName);

              this.setState({
                groupData: {
                  members: mem
                },
                grps: doc.data().groups,
                docId: doc.id
              });
            });
          })
          .then(() => {
            console.log(groupId);
            this.setState({
              groupData: {
                gId: groupId,
                groupName: document.getElementById("icon_prefix").value
              }
            });

            const grp = {
              gId: this.state.groupData.gId,
              gName: this.state.groupData.groupName
            };
            console.log(this.state.groupData.gId);
            console.log("hrllo", this.state.docId, "jhghj");
            db.collection("Users")
              .doc(this.state.docId)
              .update({
                groups: firebase.firestore.FieldValue.arrayUnion(grp)
              });

            this._addGroup();
          });
      });
  }
  _addGroup() {
    const db = fire.firestore();
    db.collection("Groups")
      .add(this.state.groupData)
      .then((docRef)=> {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('icon_prefix').value=''
        this.setState({

          isCreated: true
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
        <Header store={store}/>
        <br/>
        <div className='container '>
          <div className='row'>
            <form className='col s12 '>
              <div className='row'>
                <div className='input-field col s6'>
                  <i className='material-icons prefix'>account_circle</i>
                  <input id='icon_prefix' type='text' className='validate' />
                  <label htmlFor='icon_prefix'>Group Name</label>
                </div>
              </div>
            </form>
            <button
              onClick={() => this._createGroup()}
              className='modal-close btn waves-effect waves-light pink accent-2'
            >
              Submit
            </button>
          </div>
          {
            this.state.isCreated?
            <Link to={`/chat/${this.state.groupData.gId}`} onClick={() => {
              store.setGroup(this.state.groupData.gId, this.state.groupData.groupName) 
            }} >Open chat</Link>
            :null
          }
        </div>
        
      </div>
    );
  }
}

export default NewGroup;
