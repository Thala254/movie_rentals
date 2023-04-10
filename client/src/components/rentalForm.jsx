import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import withRouter from './common/withRouter';
import { getRental, saveRental } from '../services/rentalService';

class RentalForm extends Form {
  state = {
    data: {
      name: '',
      title: '',
      quantity: '',
      dateOut: '',
      dateReturned: '',
      rentalFee: '',
    },
    errors: {},
  };

  schema = {
    //_id: Joi.string(),
    name: Joi.string().required().label('Name'),
    title: Joi.string().required().label('Title'),
    quantity: Joi.number().required().label('Quantity'),
    dateOut: Joi.string().label('Date Out'),
    dateReturned: Joi.string().label('Date Returned'),
    rentalFee: Joi.number().label('Fee'),
  };

  async populateRental() {
    try {
      const rentalId = this.props.params.id;
      if (rentalId === 'new') return;
      const { data: rental } = await getRental(rentalId);
      this.setState({ data: this.mapToViewModel(rental) });
    } catch (ex) {
      if (ex.response && ex.response.status == 404) this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateRental();
  }

  mapToViewModel = (rental) => ({
    //_id: rental._id,
    name: rental.customer.name,
    title: rental.movie.title,
    quantity: rental.movie.quantity,
    dateOut: rental.dateOut,
    dateReturned: rental.dateReturned,
    rentalFee: rental.rentalFee,
  });

  doSubmit = async () => {
    await saveRental(this.state.data);
    window.location = '/rentals';
  };

  render() {
    return (
      <div className='container'>
        <h1>Rental Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('name', 'Customer')}
          {this.renderInput('title', 'Movie')}
          {this.renderInput('quantity', 'Quantity', 'number')}
          {this.renderInput('dateOut', 'Date Out')}
          {this.renderInput('dateReturned', 'Date Returned')}
          {this.renderInput('rentalFee', 'Fee', 'number')}
        </form>
      </div>
    );
  }
}

export default withRouter(RentalForm);
