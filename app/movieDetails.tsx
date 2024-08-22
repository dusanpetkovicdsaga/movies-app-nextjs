import { Movie } from './types';

const API_URL = 'https://api.themoviedb.org/3/search/movie';


interface ApiResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export async function fetchMovies(query: string = ''): Promise<Movie[]> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (!apiKey) {
      throw new Error('API key is missing');
    }
    
    const url = `${API_URL}?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    console.log('Fetching URL:', url);

    const res = await fetch(url, {
      next: { revalidate: 10 } 
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Fetch error:', errorText);
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data: ApiResponse = await res.json();
    console.log('Fetched data:', data);
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}
