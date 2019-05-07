import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinnner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders'; 


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon:0.7
}

class BurgerBuilder extends Component{
    // in form of object 
    state={
        // ingredients: [], this can be used instead of null. 
        //when we use null to ingredients and it loads the object.key() not accept the 
        //the null value, so we have to check in if condition whether the there is something
        //in ingredients 
        ingredients: null,
        totalPrice : 4,
        purchasable : false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-22594.firebaseio.com/ingredients.json')
        .then(response =>{
            this.setState({ingredients:response.data})
        })
        .catch(error =>{
            this.setState({error: true});
        });
    }
    
    // for checking there is any ingredient added or not if 
    // added purchable becomes true
    updatePurchaseState (ingredients){
        // converting ingredients object into array and then 
        // returning the value of each ingredients using map function
        const sum = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey];
            })
        //using reduce method converting the value of array element into singal value 
            .reduce((sum,el)=>{
                return sum + el;
            },0);
            this.setState({purchasable:sum>0})
    }

    addIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        // this condition will take us out of the current method 
        if(oldCount<=0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler =() =>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler =() =>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () =>{
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Satyapriya',
        //         address: {
        //             street: 'teststreet',
        //             zipCode: '42315',
        //             country: 'Germany'
        //         },
        //         email: 'satyapriya@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // axios.post('/orders.json',order)
        //     .then(response => {
        //         this.setState({loading: true ,purchasing:false})
        //     })
        //     .catch(error => {
        //         this.setState({loading: true ,purchasing:false})
        //     });
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'./checkout',
            search: '?' + queryString
        });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> :<Spinner/>;
        if(this.state.ingredients){
            burger = (<Aux>
                            <Burger ingredients={this.state.ingredients}/>
                            <BuildControls 
                            ingredientAdded = {this.addIngredientHandler}
                            ingredientRemoved = {this.removeIngredientHandler}
                            disabled={disabledInfo}
                            purchasable = {this.state.purchasable}
                            ordered = {this.purchaseHandler}
                            price = {this.state.totalPrice}
                            />
                        </Aux> );
            orderSummary = 
                        <OrderSummary 
                            ingredients={this.state.ingredients}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                            price = {this.state.totalPrice}
                        />;
        }       
        if(this.state.loading){
            orderSummary= <Spinner/>
        }         
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);