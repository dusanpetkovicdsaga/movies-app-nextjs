'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';
import { Movie } from '../../types';

const fetchMovieDetails = async (movieId: number): Promise<Movie | null> => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!apiKey) {
      console.error('API key is missing');
      return null;
    }
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    const data: Movie = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

const MovieDetail = ({ params }: { params: { id: string } }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async (id: string) => {
      setLoading(true);
      setError(null);

      const movieId = Number(id);
      if (!isNaN(movieId)) {
        const movieDetails = await fetchMovieDetails(movieId);
        if (movieDetails) {
          setMovie(movieDetails);
        } else {
          setError('No movie details found.');
        }
      } else {
        setError('Invalid movie ID.');
      }
      setLoading(false);
    };

    if (params?.id) {
      const id = params.id;
      console.log('Movie ID from params:', id);
      fetchDetails(id);
    } else {
      console.error('No movie ID found in params.');
      setError('No movie ID found in params.');
      setLoading(false);
    }
  }, [params]);

  return (
    <div className="container mx-auto px-4 py-8">
    <Head>
      <title>{movie?.title || 'Movie Details'}</title>
      <meta name="description" content={movie?.overview || 'Movie details'} />
    </Head>
  
    <h1 className="text-3xl font-bold mb-6 text-center">Movie Details</h1>
  
    {loading ? (
      <p className="text-center">Loading movie details...</p>
    ) : error ? (
      <p className="text-center text-red-500">{error}</p>
    ) : movie ? (
      <div className="flex justify-center">
        <div className="w-96 border border-gray-300 rounded-lg shadow-md p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4 truncate">{movie.title}</h2>
          <Image
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} // Larger image size
            alt={movie.title}
            width={240}
            height={360}
            className="w-full h-auto mb-4 rounded"
            unoptimized
          />
          <p className="text-gray-700 text-base">{movie.overview}</p>
        </div>
      </div>
    ) : (
      <p className="text-center">No movie details found.</p>
    )}
  </div>
  );
};

export default MovieDetail;
