"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "./ui/button";
import { PlayIcon } from "@radix-ui/react-icons";

type Genre = {
    id: number;
    name: string;
}

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                // First get the token from our API route
                const tokenResponse = await fetch('/api/tmdb-token');
                if (!tokenResponse.ok) {
                    throw new Error('Failed to get TMDB token');
                }
                const { token } = await tokenResponse.json();
                
                if (!token) {
                    console.error('TMDB_API_KEY is not available');
                    return;
                }

                // Now fetch the genres using the token
                const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch genres');
                }
                const data = await res.json();
                setGenres(data.genres || []);
            } catch (error) {
                console.error('Error fetching genres:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGenres();
    }, []);

    return (
        <>
            {/* Mobile menu button - only visible on mobile */}
            <button 
                className="fixed top-4 left-4 z-40 p-2 rounded-md md:hidden bg-background border"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            {/* Overlay - only on mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:sticky top-0 left-0 h-screen w-[250px] border-r flex flex-col pr-4 flex-shrink-0 
                bg-background z-40 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="p-4 overflow-y-auto h-full">
                    <Button 
                        variant="outline"
                        className="font-bold justify-start w-full mb-4"
                        asChild
                        onClick={() => setIsOpen(false)}
                    >
                        <Link href="/">
                            <PlayIcon /> All Genres
                        </Link>
                    </Button>

                    {isLoading ? (
                        <div className="text-gray-500 p-4">Loading genres...</div>
                    ) : genres.length > 0 ? (
                        genres.map((genre: Genre) => (
                            <Button 
                                key={String(genre.id)}
                                variant="outline"
                                className="font-bold justify-start w-full mt-2"
                                asChild
                                onClick={() => setIsOpen(false)}
                            >
                                <Link href={`/genere/${genre.name}/${genre.id}`}>
                                    <PlayIcon /> {genre.name}
                                </Link>
                            </Button>
                        ))
                    ) : (
                        <div className="text-gray-500 p-4">No genres found.</div>
                    )}
                </div>
            </aside>
        </>
    );
}