import { React, Component } from 'react';
import { format } from 'date-fns';
import { Rate } from 'antd';
import { ConsumerMovie } from '../GenresContext/GenresContext';
import GenresList from '../GenresList/GenresList';
import './MovieCard.css';
import RatingNumber from '../RatingNumber/RatingNumber';
import haveNoPoster from './Out_Of_Poster.jpg';


class MovieCard extends Component {
  render() {
    const { id, poster_path, overview, title, release_date, genre_ids, rating} = this.props.film;

    const releaseDate = release_date === '' ? '' : format(new Date(release_date), 'MMMM d, yyyy');
    
    const imageMovie = poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : haveNoPoster;

    function truncate(numberSymbols, useWordBoundary) {
      if(this.length <= numberSymbols) {
        return this;
      }
      const subString = this.substring(0, numberSymbols - 1);
      return `${useWordBoundary ? subString.substring(0, subString.lastIndexOf(' ')) : subString}...`;
    }

    const overviewTruncated = truncate.apply(overview, [100, true]);

    return (
      <li className="movies_item movie">
        <div className="movie_content">
          <div className="movie-inner">
            <h3 className="movie_title">{title}</h3>
            <span className="card-release-date">{releaseDate}</span>
          <ConsumerMovie>{(genresList) => {
            const movieGenres = genresList.filter((genre) => genre_ids.includes(genre.id))
            return <GenresList genresList={movieGenres} />
          }}
          </ConsumerMovie>
            <span className="card-overview">{overviewTruncated}</span>
          <RatingNumber evaluation={rating} />
          </div>
          <Rate 
          allowHalf
          count={10}
          style={{fontSize: '15px'}}
          defaultValue={rating}
          onChange={(newRating) => this.props.onRatingChange(id, newRating)}
          />
        </div>
          <img className="card-img" src={imageMovie} alt="poster" />
      </li>
    )
  }
}

export default MovieCard;
