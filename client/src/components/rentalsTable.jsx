import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from './common/table';
import auth from '../services/authService';

class RentalsTable extends Component {
  columns = [
    {
      path: 'name',
      label: 'Name',
      content: (rental) => (
        <Link to={`/rentals/${rental._id}`}>{rental.customer.name}</Link>
      ),
    },
    { 
      path: 'title',
      label: 'Title',
      content: (rental) => (
        <p>{rental.movie.title}</p>
      ),
    },
    {
      path: 'quantity',
      label: 'Quantity',
      content: (rental) => <p>{rental.movie.quantity}</p>,
    },
    {
      path: 'dateOut',
      label: 'Date Rented',
      content: (rental) => <p>{rental.dateOut}</p>
    },
    {
      path: 'datereturned',
      label: 'Date Returned',
      content: (rental) => <p>{rental.dateReturned}</p>
    },
    {
      path: 'rentalFee',
      label: 'Fee',
      content: (rental) => <p>{rental.rentalFee}</p>
    },
  ];

  deleteColumn = {
    key: 'delete',
    content: (rental) => (
      <button
        onClick={() => this.props.onDelete(rental)}
        className='btn btn-danger btn-sm'
      >
        Delete
      </button>
    ),
  };

  constructor () {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render () {
    const { rentals, onSort, sortColumn } = this.props;

    return (
      <Table
        data={rentals}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default RentalsTable;
