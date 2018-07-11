import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1,
  patty: 2,
  extras: 1.5
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  // modern approach:
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      patty: 0,
      extras: 0
    },
    totalPrice: 1,
    purchasable: false,
    purchasing: false
  };

  updatePurchaseState(ingredients) {
    // note that here, creating an immutable copy of original ingredients has sync issues; ie, ingredients aren't getting updated at correct time (since setState is asynchronous)
    // const ingredients = {
    //   ...this.state.ingredients
    // };

    // such transformation implementation is imp | check JS docs for further info
    const sum = Object.keys(ingredients)
      .map( ingredientKey => ingredients[ingredientKey] )
      .reduce( (sum, elem) => sum + elem, 0 );

    this.setState({ purchasable: sum > 0 });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
    // note: 'updatePurchaseState' won't give this context undefined error, because we call it from 'addIngredient' or 'removeIngredient' methods, which are arrow functions; hence they preserve 'this' binding
    // in case of current function though, the this context would be lost unless we explicitly bind 'this' or use it as an arrow function
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });    
  }

  purchaseContinueHandler = () => {
    alert('You chose to Continue to checkout'); 
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceAdded = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + priceAdded;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });

    this.updatePurchaseState(updatedIngredients);
  };
  
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceDeducted = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - priceDeducted;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // disabledInfo is like { salad: true, cheese: false, ... }

    return (
      <React.Fragment>
        {/* note: order summary needs to be updated only when modal is open */}
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          isPurchasable={this.state.purchasable}
          purchasingNow={this.purchaseHandler}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;