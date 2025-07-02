import MovieList from "@/components/movieList";

type Movies = {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
}

async function searchMovies(q: string): Promise<Movies[]> {
		const token = process.env.TMDB_API_KEY;
		const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${q}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		
		if (!res.ok) {
			throw new Error('Failed to fetch popular movies');
		}
		
		const data = await res.json();
		return data.results;
}

export default async function Search({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const q = params.q || '';

  if (!q.trim()) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">Search Movies</h2>
        <p className="text-gray-600">Enter a search term to find movies</p>
      </div>
    );
  }

  try {
    const movies = await searchMovies(q);
    return (
      <div>
        <h2 className="pb-2 mb-4 border-b font-bold text-xl">Search: {q}</h2>
        <MovieList movies={movies} />
      </div>
    );
  } catch (error) {
    console.error('Search error:', error);
    throw error; // This will be caught by the error boundary
  }
}
