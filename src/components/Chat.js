import React, { Component } from "react";
import fire from "../scripts/fire.js";
import Header from "./Header";
import "../css/Chat.css";
import firebase from "firebase";
import { observer } from "mobx-react";
import LoginButton from "./LoginButton.js";
import Image from "../images/chatBg3.png";

@observer
class Chat extends Component {
  state = {
    msg: [
      {
        author: "admin",
        body: "Welcome.."
      }
    ],
    inputChat: "",
    docId: "",
    grpId: ""
  };

  // _getGroupName() {
  //   const { store } = this.props
  //   let gName
  //   const db = fire.firestore();
  //   const grpName = store.currentGroup;
  //   db.collection("Groups")
  //   .where('groupName','==',grpName)
  //   .get()
  //   .then(querySnapshot=>{
  //     querySnapshot.forEach(function(doc){
  //       console.log(doc.data());
  //       gName = doc.data().groupName
  //       store.changePage(gName)
  //       console.log('groupName',gName)
  //     })
  //   })

  // }
  // _scrollToBottom(box) {
  //   box.scrollTop = box.scrollHeight
  // }
  componentDidMount() {
    const { store } = this.props;
    store.changePage(store.currentGroup.gName);
    console.log('hello-reload')
    const db = fire.firestore();
    const groupId = this.props.match.params.gId

    console.log(groupId);
    db.collection("Groups")
      .where("gId", "==", groupId)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data().messages);
          const dbMessages = doc.data().messages;

          let dId = doc.id;
          console.log("did", dId);
          let message = [
            {
              author: "",
              body: ""
            }
          ];
          if (typeof dbMessages !== "undefined") {
            dbMessages.map(dbMsg => {
              message.push(dbMsg);
            });
          }
          this.setState({
            msg: message,
            docId: dId
          });
          console.log("docId", this.state.docId);
        });
      });
      // var box = document.getElementById('box')
      // this._scrollToBottom(box)
  }

  _send() {
    console.log("hello", this.state.docId);
    const { store } = this.props;
    console.log(store.chatName);
    const db = fire.firestore();
    const groupData = {
      body: this.state.inputChat,
      author: store.chatName
    };
    const msgData = {
      gId: store.currentGroup.gId,
      message: {
        body: this.state.inputChat,
        author: store.chatName
      }
    };
    // check docId

    var citiesRef = db.collection("Groups").doc(this.state.docId);

    citiesRef.update({
      messages: firebase.firestore.FieldValue.arrayUnion(groupData)
    });

    db.collection("Messages")
      .add(msgData)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .then(() => {
        document.getElementById("inputBox").value = "";
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { store } = this.props;

    return (
      <div>
        <Header store={store} myText={store.currentPage} />
        {store.LoginInfo.isLoggedIn ? (
          <div
            className='container'
            
          >
            <div
            style={{ backgroundImage: `url(${Image})` }}
          >
            <br />
            <br />
            <div>
              {this.state.msg.length !== 1 ? (
                this.state.msg.map((message, i) => {
                  return i != 0 ? (
                    <div className='row ' key={i}>
                      {message.author === store.chatName ? (
                        <div className='col s6 m6 l4 push-m6 push-s5 push-l8'>
                          <div className='card blue'>
                            <div className='card-content white-text'>
                              <p>{message.body}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className='col s6 m6 l4'>
                          <div className='card white'>
                            <div className='card-content'>
                              <p>{message.body}</p>
                            </div>
                            <div className='card-action transparent'>
                              <strong>{message.author}</strong>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <br key={i} />
                  );
                })
              ) : (
                <br />
              )}
            </div>
            <br />
            <br />
            
            <div className='row'>
              <span className='input-field col m6 s8 push-m1 push-l1'>
                <textarea
                  placeholder='Type message here...'
                  className='materialize-textarea'
                  id='inputBox'
                  onChange={e =>
                    this.setState({
                      inputChat: e.target.value
                    })
                  }
                />
              </span>
              <span className='col s1 push-m1 push-s1 push-l1'>
                <br />
                <button
                  onClick={() => this._send()}
                  className=' btn waves-effect waves-light pink accent-2'
                >
                  SEND
                </button>
              </span>
            </div>
            
            </div>
          </div>
        ) : (
          <div className='container'>
            <br />
            <LoginButton showProfile={false} store={store} />
          </div>
        )}
      </div>
    );
  }
}

export default Chat;
