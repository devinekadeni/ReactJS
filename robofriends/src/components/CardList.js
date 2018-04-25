import React from 'react';
import Card from './Card';

const CardList = ({robots}) => {
  const CardComponent = robots.map(val => {
    return <Card key={val.id} id={val.id} name={val.name} email={val.email} />
  })
  return(
    <div>
      {CardComponent}
    </div>
  );
}

export default CardList;