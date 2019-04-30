import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger =(props) =>{
    // Object.keys() method turn an object into an array
    let transformedIngredient = Object.keys(props.ingredients)
        .map(igKey =>{
            return[...Array(props.ingredients[igKey])].map((_,i) =>{
                return<BurgerIngredient key={igKey + i} type={igKey}/>;
            });
        })
        // converting empty seperated array into a single array
        .reduce((arr,el)=>{                 
            return arr.concat(el)
        }, []);

        if(transformedIngredient.length===0){
            transformedIngredient = <p>Please add some ingredient!</p>;
        }
    console.log(transformedIngredient);
    return(
        <div className='Burger'>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;