import React from 'react';
import './RatingNumber.css';

function RatingNumber({evaluation}) {
  const inputClasses= [ 'rating-number' ];
  if(evaluation >= 0 && evaluation < 5) {
    inputClasses.push('orange');
  }
  if(evaluation >= 5 && evaluation < 7) {
    inputClasses.push('yellow');
  }
  if(evaluation >= 7 ) {
    inputClasses.push('green');
  }
  return(
    <div className={inputClasses.join(' ')}>
      {evaluation}
    </div>
  )
}

export default RatingNumber;