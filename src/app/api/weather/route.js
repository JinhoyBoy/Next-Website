import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.toString();
  const targetUrl = `https://api.openweathermap.org/data/2.5/forecast/?${query}`;

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}