import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigatinItems/NavigationItems';
import './SideDrawer.css';

const sideDrawer = (props) =>{

    //.....
    return(
        <div className='SideDrawer'>
        {/* setting the height as a property for making responsive */}
            <Logo height='11%'/>
            <nav>
                <NavigationItems/>
            </nav>
        </div>        
    );
}

export default sideDrawer;