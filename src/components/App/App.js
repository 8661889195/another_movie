import { Component } from 'react';
import './App.css';
import _ from 'lodash';
import { Pagination, Spin } from 'antd';
import CardList from '../CardList/CardList';
import { ProviderMovie } from '../GenresContext/GenresContext';
import NavTabs from '../NavTabs/NavTabs';
import Search from '../Search/Search';
import MovieDbService from '../services/movieDbService';

class App extends Component {
  callMovieDbService = new MovieDbService();

  state = {
    movies: [],
    genresList: [],
    query: 'return',
    currentTab: 'Search',
    currentPage: 1,
    pageSize: 20,
    totalPages: 0,
    isLoading: true,
  };

  componentDidMount() {
    const pageFromStorage = +window.localStorage.getItem('page');
    this.searchMovies(
      pageFromStorage || this.state.currentPage,
      this.state.query
    );
    this.setState({
      currentPage: pageFromStorage,
    });
  }

  searchMovies(query, page = 1) {
    this.callMovieDbService.getAllMovie(query, page).then((data) => {
      data.results.forEach((item) => {
        const filmStorage = window.localStorage.getItem('rated-films');
        const arrFilmStorage = JSON.parse(filmStorage);
        arrFilmStorage?.forEach((withRate) => {
          if (item.id === withRate.id) {
            item.rating = withRate.rating;
          }
        });
      });
      this.setState({
        movies: data.results,
        totalPages: data.total_pages,
        isLoading: false,
      });
    });
    this.callMovieDbService.getGenresList().then((data) => {
      this.setState({
        genresList: data.genres,
      });
    });
  }

  tabChangeHandler = (newTab) => {
    if (newTab === this.state.currentTab) return;
    if (newTab === 'Search') {
      this.setState({
        currentTab: 'Search',
        currentPage: 1,
        isLoading: true,
      });
      this.searchMovies(this.state.currentPage, this.state.query);
    }
    if (newTab === 'Rated') {
      this.setState({
        currentTab: 'Rated',
        currentPage: 1,
        isLoading: true,
      });
      const filmStorage = window.localStorage.getItem('rated-films');
      const maxFilms = JSON.parse(filmStorage);
      let startIndex = (this.state.currentPage - 1) * this.state.pageSize;
      const endIndex = startIndex + this.state.pageSize;
      const arrFILMStorage = maxFilms?.slice(startIndex, endIndex);
      this.setState({
        movies: arrFILMStorage,
        totalPages: maxFilms?.length,
        isLoading: false,
      });
    }
  };

  filmRateChange = (movieId, newRating) => {
    const newMovieArray = this.state.movies.map((item) =>
      item.id === movieId ? { ...item, rating: newRating } : item
    );
    this.setState({
      movies: newMovieArray,
      isLoading: false
    });

    const filmStorage = window.localStorage.getItem('rated-films');
    const storagedFilms = filmStorage ? JSON.parse(filmStorage) : [];
    const isMovieInStorage = storagedFilms.find((item) => item.id === movieId);
    if (isMovieInStorage) {
      const newStorageFilm = storagedFilms.map((item) =>
        movieId === item.id ? { ...item, rating: newRating } : item
      );
      window.localStorage.setItem(
        'rated-films',
        JSON.stringify(newStorageFilm)
      );
    } else {
      const newRateFilm = this.state.movies.find((item) => item.id === movieId);
      newRateFilm.rating = newRating;
      storagedFilms.unshift(newRateFilm);
      window.localStorage.setItem('rated-films', JSON.stringify(storagedFilms));
    }
  };

  paginationChangeHandler = (page) => {
    window.localStorage.setItem('page', `${page}`);
    this.setState({
      currentPage: page,
      isLoading: true,
    });
    if (this.state.currentTab === 'Rated') {
      const startIndex = (page - 1) * this.state.pageSize;
      const endIndex = startIndex + this.state.pageSize;
      const filmStorage = window.localStorage.getItem('rated-films');
      const maxFilms = JSON.parse(filmStorage);
      const arrFILMStorage = maxFilms.slice(startIndex, endIndex);
      this.setState({
        movies: arrFILMStorage,
        totalPages: maxFilms.length,
        isLoading: true,
      });
    } else {
      this.searchMovies(page, this.state.query);
    }
  };

  debaucedHandler = _.debounce((searchQuery) => {
    console.log(searchQuery);
    if (searchQuery) {
      this.setState({
        isLoading: true,
      });
      this.searchMovies(this.state.currentPage, searchQuery);
    }
  }, 1000);

  render() {
    const { movies, genresList, currentTab, query, isLoading } = this.state;

    let contentLoading = isLoading ? (
      <Spin />
    ) : (
      <>
        <ProviderMovie value={genresList}>
          <div className="movies">
            <CardList movies={movies} onRatingChange={this.filmRateChange} />
            <Pagination
              style={{ textAlign: 'center' }}
              defaultCurrent={this.state.currentPage}
              pageSize={this.state.pageSize}
              total={this.state.totalPages}
              showChanger={false}
              onChange={this.paginationChangeHandler}
            />
          </div>
        </ProviderMovie>
      </>
    );

    return (
      <section>
        <NavTabs onChange={this.tabChangeHandler} />
        {currentTab === 'Search' ? (
          <Search searchQuery={query} changeHandler={this.debaucedHandler} />
        ) : null}
        {contentLoading}
      </section>
    );
  }
}

export default App;
