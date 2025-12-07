import { NextResponse } from "next/server";
import { hygraph } from "@/lib/hygraph";
import { GET_PORTFOLIO } from "@/lib/queries/portfolio";

export async function GET() {
  try {
    const data = await hygraph.request(GET_PORTFOLIO);

    return NextResponse.json(data.portfolioItems || []);
  } catch (error) {
    console.error("Hygraph error:", error);
    return NextResponse.json(
      { error: "Failed to load about data" },
      { status: 500 }
    );
  }
}
