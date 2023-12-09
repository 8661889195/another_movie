import React from 'react';
import Genre from '../Genre/Genre';
import './GenresList.css';

function GenresList({genresList}) {
  return(
    <ul className="movie_genres-list">
      {genresList.map((genre) => (
        <Genre genreName={genre.name} key={genre.id}/>
      ))}
    </ul>
  )
}

export default GenresList;