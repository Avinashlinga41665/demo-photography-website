import { NextResponse } from "next/server";
import { hygraph } from "@/lib/hygraph";
import { GET_FAQ } from "@/lib/queries/faq";

export async function GET() {
  try {
    const data = await hygraph.request(GET_FAQ);

    // return array of FAQ items
    return NextResponse.json(data.faqItems || []);
  } catch (error) {
    console.error("Hygraph error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
