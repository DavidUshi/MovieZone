import MovieList from "@/components/movieList";


type Movies = {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
}

async function fetchGenreMovies(id: number): Promise<Movies[]> {
    const token = process.env.THDB_API_KEY;
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${id}`, {
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

export default async function Home({
	params,
}: {
	params: Promise<{ id: string; name: string }>;
}) {
    const {id, name} = await params;
    const movies = await fetchGenreMovies(parseInt(id));
    return (
        <div className="w-full">
            <h2 className="pb-2 mb-4 border-b font-bold text-xl">{name}</h2>
            <MovieList movies={movies} />
        </div>
    );
}