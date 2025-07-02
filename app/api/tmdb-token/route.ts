import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.TMDB_API_KEY;
  
  if (!token) {
    return NextResponse.json(
      { error: 'TMDB API key is not configured' },
      { status: 500 }
    );
  }

  return NextResponse.json({ token });
}
