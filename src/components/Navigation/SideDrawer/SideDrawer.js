import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigatinItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop'; 
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) =>{

    //.....
    return(
        <Aux>
            <Backdrop show/>
            <div className='SideDrawer'>
            {/* setting the height as a property for making responsive */}
                <Logo height='11%'/>
                <nav>
                    <NavigationItems/>
                </nav>
            </div> 
        </Aux>           
    );
}

export default sideDrawer;