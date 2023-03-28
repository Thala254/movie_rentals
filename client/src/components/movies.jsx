import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';
import MoviesTable from './moviesTable';
import SearchBox from './searchBox';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { getMovies, deleteMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import paginate from '../utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: '',
    sortColumn: { path: 'title', order: 'asc' },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: '', name: 'All Genres' }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('This movie has already been deleted.');
        this.setState({ movies: originalMovies });
      }
    }
  };

  handleLike = async (movie) => {
    try {
      const movies = [...this.state.movies];
      const index = movies.indexOf(movie);
      movies[index] = { ...movies[index] };
      movies[index].like = movies[index].like === false ? true : false;
      this.setState({ movies });
      const updatedMovie = movies[index];
      updatedMovie.genreId = updatedMovie.genre?._id;
      delete updatedMovie.genre;
      await saveMovie(updatedMovie);
    } catch (err) {
      console.log(err);
    }
  };

  handlePageChange = (page) => this.setState({ currentPage: page });

  handleGenreSelect = (genre) => this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });

  handleSearch = (query) => this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });

  handleSort = (sortColumn) => this.setState({ sortColumn });

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      movies: allMovies,
      sortColumn,
    } = this.state;

    let filtered = allMovies;

    if (searchQuery)
      filtered = allMovies.filter((m) => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      genres,
      selectedGenre,
      searchQuery,
    } = this.state;
    const { user } = this.props;
    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-3'>
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className='col'>
            {user  && (
              <Link
                to='/movies/new'
                className='btn btn-primary'
                style={{marginBottom: 20}}
              >
                New Movie
              </Link>
            )}
            <p>Showing {totalCount} movies in the database</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch}/>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
