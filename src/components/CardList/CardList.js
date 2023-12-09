import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './CardList.css';


const CardList = ({movies, onRatingChange}) => {
  return(
    <div className="card-list">
      {movies?.map((film) => (
        <MovieCard key={film.id} film={film} onRatingChange={onRatingChange} />
      ))}
    </div>
  )
}

export default CardList;