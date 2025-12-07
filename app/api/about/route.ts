import { NextResponse } from "next/server";
import { hygraph } from "@/lib/hygraph";
import { GET_ABOUT } from "@/lib/queries/about";

export async function GET() {
  try {
    const data = await hygraph.request(GET_ABOUT);

    return NextResponse.json(data.aboutItems[0] || null);
  } catch (error) {
    console.error("Hygraph error:", error);
    return NextResponse.json(
      { error: "Failed to load about data" },
      { status: 500 }
    );
  }
}
