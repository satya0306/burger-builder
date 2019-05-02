import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigatinItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className='Toolbar'>
        <DrawerToggle openDrawer={props.openMenu}/>
        <Logo height='80%'/>
        <nav className='DextopOnly'>
            <NavigationItems/>
        </nav>
    </header>

);

export default toolbar;