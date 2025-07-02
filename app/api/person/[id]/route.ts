import { NextResponse } from "next/server";

type Person = {
    id: number;
    name: string;
    gender: number;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    const token = process.env.TMDB_API_KEY;
    const res = await fetch(`https://api.themoviedb.org/3/person/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch person');
    }

    const data: Person = await res.json();
    return NextResponse.json(data);
}