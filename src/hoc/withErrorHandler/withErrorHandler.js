import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component{
        state ={
            error:null
        }
        // for the post request componentDidMount works but for the get request for error
        // handling we have to use componentWillMount because it execute befor the rendering
        // all child component and show the error if any
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req =>{
                this.setState({error:null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(null, error =>{
                this.setState({error:error});
            });
        }
        //removing the interceptors because they run unnessesary and take the memory
        // componentWillUnmount() {
        //     axios.interceptor.request.eject(this.reqInterceptor);
        //     axios.interceptor.response.eject(this.resInterceptor);
        // }
        

        errorConfirmedHandler =() =>{
            this.setState({error:null});
        }
        render() {
            return(
                <Aux>
                    <Modal show ={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>    
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
}

export default withErrorHandler;