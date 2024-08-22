'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { fetchMovies as fetchMoviesFromAPI } from './movieDetails';
import { Movie } from './types';
import SearchBar from './SearchBar';

const Home = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchMovies = async (searchQuery: string) => {
    setLoading(true);
    setError(null); 
    try {
      const fetchedMovies = await fetchMoviesFromAPI(searchQuery);
      setMovies(fetchedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchMovies('');
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Movie Search</title>
        <meta name="description" content="Search movies using TMDB API" />
      </Head>

      <h1 className="text-3xl font-bold mb-4">Search Movies</h1>

      <SearchBar onSearch={async (searchQuery: string) => {
        setQuery(searchQuery);
        await fetchMovies(searchQuery);
      }} />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="border border-gray-300 rounded-lg p-4 cursor-pointer"
              >
                <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="w-full h-auto mb-2"
                  unoptimized
                />
              </Link>
            ))
          ) : (
            <p>Search for the movie!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;


