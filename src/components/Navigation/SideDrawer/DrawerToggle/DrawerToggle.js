import React from 'react';
import './DrawerToggle.css';

const drawerToggle = (props) =>{
    return(
        <div onClick={props.openDrawer} className='DrawerToggle'>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default drawerToggle; 

