import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const feedUrl = searchParams.get('feedUrl');

  try {
    const response = await fetch(feedUrl);
    const text = await response.text();
    return NextResponse.json(text);
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return NextResponse.error();
  }
}