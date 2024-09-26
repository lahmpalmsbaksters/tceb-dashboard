import React from 'react';

const JourneyCard = ({ path, count }) => {
  return (
    <div className="bg-white shadow-lg p-4 rounded-lg text-center">
      <div className="text-lg font-bold">{path}</div>
      <div className="text-2xl mt-2">{count}</div>
    </div>
  );
};

export default JourneyCard;
