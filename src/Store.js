import { observable, action, computed } from "mobx";

class Store {
  @observable LoginInfo = { isLoggedIn: false, user: null};

  @observable checkNewUser = false
  @observable currentPage = ''

  @observable currentGroup = {
    gId: '',
    gName: ''
  }

  @observable chatName = ''

  @action setNewUser(newUser) {
    this.checkNewUser = newUser
  }

  @action setName(Name) {
    this.chatName = Name
  }

  @action changePage(pageName) {
    this.currentPage = pageName
  }

  @action setGroup(gId,gName) {
    this.currentGroup = {
      gId,
      gName
    }
  }


  @action userLogin(isLoggedIn, user) {
    this.LoginInfo ={
      isLoggedIn,
      user
    }
  }
  
}


const appStore = new Store();

// window.appStore = appStore;
export default appStore;