import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import withRouter from './common/withRouter';
import { getCustomer, saveCustomer } from '../services/customerService';

class CustomerForm extends Form {
  state = {
    data: {
      //_id: '',
      name: '',
      telephone: '',
      isGold: '',
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label('Name'),
    telephone: Joi.string().required().label('Telephone'),
    isGold: Joi.boolean().required().label('isGold'),
  };

  async populateCustomer() {
    try {
      const customerId = this.props.params.id;
      if (customerId === 'new') return;
      const { data: customer } = await getCustomer(customerId);
      this.setState({ data: this.mapToViewModel(customer) });
    } catch (ex) {
      if (ex.response && ex.response.status == 404) this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateCustomer();
  }

  mapToViewModel = (customer) => ({
    _id: customer._id,
    name: customer.name,
    telephone: customer.telephone,
    isGold: customer.isGold,
  });

  doSubmit = async () => {
    await saveCustomer(this.state.data);
    window.location = '/customers';
  };

  render() {
    return (
      <div className='container'>
        <h1>Customer Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('name', 'Name')}
          {this.renderInput('telephone', 'Telephone')}
          {this.renderInput('isGold', 'isGold')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default withRouter(CustomerForm);
