import React from 'react';
import Reaction from './Reaction';
import SharesAndFavourite from './SharesAndFavourite';

const Actions = () => {
  return (
    <div className="flex items-center justify-between">
      <Reaction />
      <SharesAndFavourite />
    </div>
  );
};

export default Actions;
