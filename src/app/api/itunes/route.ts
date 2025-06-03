import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");
  const limit = searchParams.get("limit");

  if (!term) {
    return NextResponse.json(
      { error: "Missing 'term' query parameter" },
      { status: 400 }
    );
  }

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    term
  )}&limit=${limit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch from iTunes API" },
      { status: 500 }
    );
  }
}