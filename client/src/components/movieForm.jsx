import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import withRouter from './common/withRouter';
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      inStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(5).max(255).required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    inStock: Joi.number().required().min(0).max(255).label('Number in Stock'),
    dailyRentalRate: Joi.number().required().min(0).max(255).label('Daily Rental Rate'),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.params.id;
      if (movieId === 'new') return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status == 404) this.props.history.push('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel = (movie) => ({
    _id: movie._id,
    title: movie.title,
    genreId: movie.genre._id,
    inStock: movie.inStock,
    dailyRentalRate: movie.dailyRentalRate,
  });

  doSubmit = async () => {
    await saveMovie(this.state.data);
    window.location = '/movies';
  };

  render() {
    return (
      <div className='container'>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('inStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default withRouter(MovieForm);
