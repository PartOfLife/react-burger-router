import React, { Component } from 'react';
import CheckoutSumary from './../../components/Order/CheckoutSumary/CheckoutSumary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 1,
      meat: 1
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1]
    }
    this.setState({ingredients});
  }

  checkoutCancelled = () => {
    this.props.history.goBack();
  }

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <CheckoutSumary
        ingredients={this.state.ingredients}
        checkoutCancelled={this.checkoutCancelled}
        checkoutContinued={this.checkoutContinued} />
    )
  }
}

export default Checkout