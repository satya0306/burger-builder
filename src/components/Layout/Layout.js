import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import  './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler=()=>{
        this.setState({ showSideDrawer: false});
    }
    // this logic also works
    // sideDrawerMenuOpen =() =>{
    //     this.setState({ showSideDrawer: true});
    // }
    sideDrawerMenuOpen =() =>{
        this.setState((prevState) =>{
            return{showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render(){
        return(
            <Aux>
                <Toolbar openMenu={this.sideDrawerMenuOpen}/>
                <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
                <main className='Content'>
                    {this.props.children}
                </main>
            </Aux> 
        );
    }
}


export default Layout;