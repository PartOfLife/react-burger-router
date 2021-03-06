import React, { Component } from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: 'Vaximilian',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 9
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: '',
        valid: true
      },
    },
    formIsValid: false,
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {}
    for (let formElementIndentifier in this.state.orderForm) {
      formData[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderForm: formData
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false});
      });
  }

  inputChangedHandler = (event, inputIndentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIndentifier] }
    updatedFormElement.value = event.target.value;
    if (inputIndentifier !== 'deliveryMethod') {
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    }
    updatedFormElement.touched = true;
    updatedOrderForm[inputIndentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIndentifier in updatedOrderForm) {
      formIsValid  = updatedOrderForm[inputIndentifier].valid && formIsValid;
    }
    console.log(formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid });
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {/* <Input inputtype="input" type="text" name="name" placeholder="Your Name" /> */}
        { formElementsArray.map((el) => {
          return <Input
                    key={el.id}
                    elementType={el.config.elementType}
                    elementConfig={el.config.elementConfig}
                    value={el.config.value}
                    changed={(event) => this.inputChangedHandler(event, el.id)}
                    inValid={!el.config.valid}
                    shouldValidate={el.config.validation}
                    touched={el.config.touched}
                  />
        }) }
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        { form }
      </div>
    );
  };
}

export default ContactData