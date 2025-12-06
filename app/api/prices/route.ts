import { NextResponse } from "next/server";
import { hygraph } from "@/lib/hygraph";
import {GET_PRICES} from "@/lib/queries/prices";

export async function GET() {
  try {
    const data = await hygraph.request(GET_PRICES);
    return NextResponse.json(data.pricePackages);
  } catch (error) {
    console.error("Hygraph error:", error);
    return NextResponse.json({ error: "Failed to load prices" }, { status: 500 });
  }
}
