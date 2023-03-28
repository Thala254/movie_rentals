import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';
import RentalsTable from './rentalsTable';
import SearchBox from './searchBox';
import Pagination from './common/pagination';
import { getRentals, getRental, deleteRental } from '../services/rentalService';
import paginate from '../utils/paginate';

class Rentals extends Component {
  state = {
    rentals: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: '',
    sortColumn: { path: 'name', order: 'asc' },
  };

  async componentDidMount() {
    const { data: rentals } = await getRentals();
    this.setState({ rentals });
  }

  handleDelete = async (rental) => {
    const originalRentals = this.state.rentals;
    const rentals = originalRentals.filter((r) => r._id !== rental._id);
    this.setState({ rentals });
    
    try {
      await deleteRental(rental._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) toast.error('This rental has already been deleted.');
      this.setState({ rentals: originalRentals });
    }
    
  };

  handlePageChange = (page) => this.setState({ currentPage: page });

  handleSort = (sortColumn) => this.setState({ sortColumn });

  handleSearch = (query) => this.setState({ searchQuery: query, currentPage: 1 });

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      searchQuery,
      rentals: allRentals,
      sortColumn,
    } = this.state;

    let filtered = allRentals;
    if (searchQuery) filtered = allRentals.filter((r) => r.customer.name.toLowerCase().startsWith(searchQuery.toLowerCase()));
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const rentals = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: rentals };
  };

  render() {
    const { sortColumn, searchQuery, currentPage, pageSize } = this.state;
    const { user } = this.props;
    const { totalCount, data: rentals } = this.getPagedData();

    return (
      <div className='container'>
        <h1>Rentals</h1>
        <p>Showing {totalCount} rentals in the database</p>
        {user && (
          <Link
            to='/rentals/new'
            className='btn btn-primary'
            style={{ marginBottom: 20 }}
          >
            New Rental
          </Link>
        )}
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <RentalsTable
          rentals={rentals}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Rentals;
