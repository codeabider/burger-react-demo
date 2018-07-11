import React from 'react';
import Aux from '../../../hoc/AuxComponent/AuxComponent';  // we are using 'React.Fragment' instead of creating custom Aux component; this implementation is just for demo
import Button from '../../UI/Button/Button';

const orderSummary =  ( props ) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map( ingredientKey => {
      return (
        <li key={ingredientKey}>
          <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span> X {props.ingredients[ingredientKey]}
        </li>
      );
    } );

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Your custom additions:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Final Order Price: $ {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  );
}

export default orderSummary;