import { NextResponse } from 'next/server';

// Route für die Wikipedia API
export async function GET(request) {
  // Extrahiere die Suchparameter aus der URL
  const { searchParams } = new URL(request.url);
  const query = searchParams.toString();
  const targetUrl = `https://de.wikipedia.org/w/api.php?${query}`;
  // Fetch data from Wikipedia API
  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}