import React, { Component } from 'react'

class LeaveGroup extends Component {
    state={
        isExit: false,
        isClicked: false
    }
    componentDidMount(){
        this.state.isExit?
        console.log('true'):
        console.log('false');
    }
    _Exit(val) {
        this.setState({
            isExit: val
        })
        this.state.isExit?
        console.log('true'):
        console.log('false');
    }
    _handleClick() {
        this.setState({
            isClicked: true
        })
    }
    render() {
        return (
            <div>
                <button onClick={()=>this._handleClick()}>Exit</button>
                {
                    this.state.isClicked?
                    confirm('Sure you wanna exit the group ?')?()=>{this._Exit(true)}:null
                    :null
                }
                
            </div>
        )
    }
}

export default LeaveGroup
