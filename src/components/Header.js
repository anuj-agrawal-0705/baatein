import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Sidenav from './Sidenav'
import { observer } from 'mobx-react';
import LoginCard from './LoginCard';



@observer
class Header extends Component {
    render() {
        const {store} = this.props
        return (
            <div className='navbar-fixed'>
               
                   
                   <nav>
                   <Sidenav store={store}/>
                   <div className="nav-wrapper white">
                   <a href="#" className="brand-logo center black-text">{store.currentPage}</a>
                   <ul id="nav-mobile" className="right hide-on-med-and-down">
                       <li><Link className='black-text' to={{pathname: '/profile',store: {store}}}>Profile</Link></li>
                      
                       <li><Link className='black-text' to={{pathname: '/',store: {store}}}>Home</Link></li>
                       <li><Link className='black-text' to={{pathname: '/group',store: {store}}}>New Group</Link></li>
                       
                   </ul>
                   </div>
                </nav>
                
               
            </div>
            
             
        )
    }
}

export default Header