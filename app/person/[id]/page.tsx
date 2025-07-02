type Person = {
    id: number;
    name: string;
    gender: number;
}

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const { id } = await params;
        const response = await fetch(`${baseUrl}/api/person/${id}`, { 
            next: { revalidate: 3600 },
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch person data: ${response.statusText}`);
        }
        
        const person: Person = await response.json();
        
        return (
            <div>
                <h1>{person.name}</h1>
                <p>Gender: {person.gender === 1 ? 'Female' : 'Male'}</p>
            </div>
        );
    } catch (error) {
        console.error('Error in PersonPage:', error);
        return (
            <div>
                <h1>Error</h1>
                <p>Failed to load person data. Please try again later.</p>
            </div>
        );
    }
}