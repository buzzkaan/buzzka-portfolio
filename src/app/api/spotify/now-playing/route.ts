import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

export const revalidate = 30;

export async function GET() {
  const track = await getNowPlaying();

  if (!track) {
    return NextResponse.json({ isPlaying: false }, { status: 200 });
  }

  return NextResponse.json(track);
}
