import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const controls = [
  { label: 'Cheese', type: 'cheese' },
  { label: 'Salad', type: 'salad' },
  { label: 'Patty', type: 'patty' },
  { label: 'Extras', type: 'extras' }
];

const buildControls = ( props ) => (
  <div className={classes.BuildControls}>
    <p>Current Burger Price: <strong>$ {props.price.toFixed(2)}</strong></p>
    {controls.map( ctrl => {
      return <BuildControl
                key={ctrl.label}
                ingredientLabel={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
              />
    } )}
    <button
      className={classes.OrderButton}
      disabled={!props.isPurchasable}  
      onClick={props.purchasingNow}
    >ORDER NOW</button>
  </div>
)

export default buildControls;