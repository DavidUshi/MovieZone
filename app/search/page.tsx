import MovieList from "@/components/movieList";

type Movies = {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
}

async function searchMovies(q: string): Promise<Movies[]> {
		const token = process.env.THDB_API_KEY;
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

export default async function Search({searchParams}: {searchParams: Promise<{q: string}>}) {
    const {q} = await searchParams;    
    const movies = await searchMovies(q);    
	return (
		<div>
			<h2 className="pb-2 mb-4 border-b font-bold text-xl">Search:{q}</h2>
			<MovieList movies={movies} />
		</div>
	);
}
