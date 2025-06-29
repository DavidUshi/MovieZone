'use client';

import { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({error, resetErrorBoundary}: FallbackProps) {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4 bg-red-50 text-red-800">
            <h2 className="text-xl font-semibold">Something went wrong:</h2>
            <p className="mt-2 text-sm text-red-500">{error.message}</p>
            <button onClick={resetErrorBoundary} className="mt-4 px-4 py-2 text-black border rounded hover:bg-red-700">Try again</button>
        </div>
    );
}