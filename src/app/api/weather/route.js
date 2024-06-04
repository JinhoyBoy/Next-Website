import { NextResponse } from 'next/server';

// Route für die Openweathermap API
export async function GET(request) {
  // Extrahiere die Suchparameter aus der URL
  const { searchParams } = new URL(request.url);
  const query = searchParams.toString();
  const targetUrl = `https://api.openweathermap.org/data/2.5/forecast/?${query}`;
  // Fetch data from Openweathermap API
  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}