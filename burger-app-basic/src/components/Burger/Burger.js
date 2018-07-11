import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
  // here we need to transform the 'ingredient' object into an array of 'ingredient name' and 'ingredient count' for each 'ingredient'
  // this will be an array of arrays
  let transformedIngredients = Object.keys( props.ingredients )
    .map( ingredientKey => {
      return [...Array( props.ingredients[ingredientKey] )]
        .map( (_, i) => {
          return <BurgerIngredient key={ingredientKey + i} type={ingredientKey}/>
        } )
    } )
    .reduce( (arr, el) => {
      return arr.concat(el);
    }, [] );

  if(!transformedIngredients.length) {
    transformedIngredients = <p>Please add a minimum of 1 ingredient!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;