import React from 'react';

export const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language } }) => {
  return (
    <div className="movie-card bg-gray-900 bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden flex flex-col transition hover:bg-opacity-60">
      <img
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div>
          <div className="content mt-2 flex items-center text-gray-300">
            <p className="pr-1">{original_language}</p>
            <span>•</span>
            <p className="pl-1">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
            <img src="star.svg" alt="Star Icon" className="w-4 h-4 ml-2" />
            <p className="ml-1">{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className="p-4 mt-auto">
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          Add to Watchlist
        </button>
      </div>
    </div>
  );
};
