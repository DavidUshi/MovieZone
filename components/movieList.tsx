import Link from "next/link";

type Movies = {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
}

export default async function MovieList({movies}: {movies: Movies[]}) {
    const image_path = 'http://image.tmdb.org/t/p/w185';
    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-start gap-4">
                {movies.map(movie => (
                    <div key={movie.id} className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1rem)] lg:w-[calc(20%-1rem)] xl:w-[calc(16.666%-1.25rem)] flex-shrink-0">
                        <div className="flex flex-col h-full">
                            <Link href={`/detail/${movie.id}`}>
                            {movie.poster_path ? <img 
                                width={185}
                                src={image_path + movie.poster_path} 
                                alt={movie.title}
                                className="w-full h-auto object-cover rounded transition-all hover:scale-105"
                            /> : <div className="w-[185px] h-[278px] bg-gray-200 flex items-center justify-center"></div>}
                            </Link>
                            <b className="mt-2 text-center text-sm line-clamp-2">{movie.title}</b>
                            <small className="text-center text-gray-500 text-xs">
                                {movie.release_date.split('-')[0]}
                            </small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )};
