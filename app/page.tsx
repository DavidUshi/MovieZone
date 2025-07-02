import MovieList from "@/components/movieList";


type Movies = {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
}

async function fetchMovies(): Promise<Movies[]> {
    const token = process.env.TMDB_API_KEY;
    const res = await fetch('https://api.themoviedb.org/3/movie/popular', {
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

async function TrendingMovies(): Promise<Movies[]> {
    const token = process.env.TMDB_API_KEY;
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    if (!res.ok) {
        throw new Error('Failed to fetch trending movies');
    }
    
    const data = await res.json();
    return data.results;
}
export default async function Home() {
    const movies = await fetchMovies();
    const trendingMovies = await TrendingMovies();
    
    return (
        <div className="space-y-12">
            <div>
                <h2 className="pb-2 mb-4 border-b font-bold text-xl">All Genres</h2>
                <MovieList movies={movies} />
            </div>

            <div>
                <h2 className="pb-2 mb-4 border-b font-bold text-xl">Trending Movies</h2>
                <MovieList movies={trendingMovies} />
            </div>
        </div>
    );
}