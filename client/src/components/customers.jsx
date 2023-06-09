import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';
import CustomersTable from './customersTable';
import SearchBox from './searchBox';
import Pagination from './common/pagination';
import { getCustomers, deleteCustomer } from '../services/customerService';
import paginate from '../utils/paginate';

class Customers extends Component {
  state = {
    customers: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: '',
    sortColumn: { path: 'name', order: 'asc' },
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  handleDelete = async (customer) => {
    const originalCustomers = this.state.customers;
    const customers = originalCustomers.filter((c) => c._id !== customer._id);
    this.setState({ customers });

    try {
      await deleteCustomer(customer._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) toast.error('This customer has already been deleted.');
      this.setState({ customers: originalCustomers });
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
      customers: allCustomers,
      sortColumn,
    } = this.state;

    let filtered = allCustomers;
    if (searchQuery) filtered = allCustomers.filter((c) => c.name.toLowerCase().startsWith(searchQuery.toLowerCase()));
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const customers = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: customers };
  };

  render() {
    const { sortColumn, searchQuery, currentPage, pageSize } = this.state;
    const { user } = this.props;
    const { totalCount, data: customers } = this.getPagedData();

    return (
      <div className='container'>
        <h1>Customers</h1>
        <p>Showing {totalCount} customers in the database</p>
        {user && (
          <Link
            to='/customers/new'
            className='btn btn-primary'
            style={{ marginBottom: 20 }}
          >
            New Customer
          </Link>
        )}
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <CustomersTable
          customers={customers}
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

export default Customers;
