import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigatinItems/NavigationItems';

const toolbar = (props) => (
    <header className='Toolbar'>
        <div>Menu</div>
        <Logo height='80%'/>
        <nav className='DextopOnly'>
            <NavigationItems/>
        </nav>
    </header>

);

export default toolbar;