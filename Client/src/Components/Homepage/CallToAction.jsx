import React from 'react';

const CallToAction = () => {
  return (
    <div className="container mx-auto py-16 bg-white">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Join Us Today!</h2>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
        <p className="text-gray-800 mb-4 md:mb-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et odio euismod, bibendum est sit amet, volutpat nisi.
        </p>
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg">Join Now</button>
      </div>
    </div>
  );
};

export default CallToAction;