import Link from "next/link";
import { Button } from "./ui/button";
import { PlayIcon } from "@radix-ui/react-icons";


type Genre = {
    id: number;
    name: string;
}


async function fetchGenre(): Promise<Genre[]> {
    const token = process.env.THDB_API_KEY;
    if (!token) {
        console.error('TMDB_API_KEY is missing');
        return [];
    }
    try {
        const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            console.error('Failed to fetch genres:', res.statusText);
            return [];
        }
        const data = await res.json();
        return data.genres ?? [];
    } catch (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
}

export default async function Sidebar() {
    const genre = await fetchGenre();
    return (
        <aside className="w-[250px] border-r flex flex-col pr-4 flex-shrink-0">
            <Button variant="outline"
                className="font-bold justify-start"
                asChild>
                <Link href="/">
                    <PlayIcon /> All Genres
                </Link>
            </Button>

            {Array.isArray(genre) && genre.length > 0 ? (
                genre.map(genre => (
                    <Button key={String(genre.id)}
                        variant="outline"
                        className="font-bold justify-start mt-2"
                        asChild>
                        <Link href={`/genere/${genre.name}/${genre.id}`}>
                            <PlayIcon /> {genre.name}
                        </Link>
                    </Button>
                ))
            ) : (
                <div className="text-gray-500 p-4">No genres found.</div>
            )}
        </aside>
    );
}