import { NextResponse } from 'next/server';

// Route für den RSS-Feed
export async function GET(request) {
  // Extrahiere die Suchparameter aus der URL
  const { searchParams } = new URL(request.url);
  const feedUrl = searchParams.get('feedUrl');
  // Fetch data from the RSS feed
  try {
    const response = await fetch(feedUrl);
    const text = await response.text();
    return NextResponse.json(text);
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return NextResponse.error();
  }
}