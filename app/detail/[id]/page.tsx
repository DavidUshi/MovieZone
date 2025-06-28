type Movies = {
	id: number;
	title: string;
	poster_path: string;
	overview: string;
	backdrop_path: string;
	release_date: string;
}

type Credits = {
	id: number;
	name: string;
	profile_path: string;
}

async function fetchMovie(id: string): Promise<Movies> {
	const token = process.env.THDB_API_KEY;
	const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		throw new Error('Failed to fetch movie');
	}

	const data = await res.json();
	return data;
}

async function fetchCredit(id: string): Promise<Credits[]> {
	const token = process.env.THDB_API_KEY;
	const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		throw new Error('Failed to fetch movie');
	}

	const data = await res.json();
	return data.cast;
}


export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const cover = "http://image.tmdb.org/t/p/w1280";
	const profile = "http://image.tmdb.org/t/p/w185";
	const movie = await fetchMovie(id);
	const credit = await fetchCredit(id);
	return (
		<div className="w-full">
			<h2 className="pb-2 mb-4 border-b font-bold text-xl">{movie.title} <span>({movie.release_date.split('-')[0]})</span></h2>
			<img src={cover + movie.backdrop_path} alt={movie.title} className="w-full h-auto object-cover rounded transition-all" />
			<p className="mt-4 text-md font-medium">{movie.overview}</p>
			<div className="mt-4">
				<h2 className="mt-4 pb-2 mb-4 border-b font-semibold text-2xl">Cast</h2>
				<div className="flex items-center flex-wrap gap-6">
					{credit.map(cast => (
						<div key={cast.id} className="w-[128px] text-center">
							{cast.profile_path ? (
								<img 
									src={profile + cast.profile_path} 
									alt={cast.name} 
									className="object-cover rounded transition-all" 
								/>
							) : (
								<div className="w-[128px] h-[185px] bg-gray-200 flex items-center justify-center">
									<span className="text-gray-500 text-sm">No Image</span>
								</div>
							)}
							<b className="font-medium text-sm">{cast.name}</b>
						</div>
					))}
				</div>
			</div> 
		</div>
	);
}