import React from 'react';
import './Genre.css';

function Genre({genreName}) {
  return (
    <li className="movie_genres-item">
      {genreName}
    </li>
  )
}

export default Genre;