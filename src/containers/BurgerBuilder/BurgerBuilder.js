import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon:0.7
}

class BurgerBuilder extends Component{
    // in form of object 
    state={
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice : 4,
        purchasable : false,
        purchasing: false
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
        alert('continue');
        this.setState({purchasing:false})
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price = {this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                    price = {this.state.totalPrice}
                    />
            </Aux>
        );
    }
}

export default BurgerBuilder;