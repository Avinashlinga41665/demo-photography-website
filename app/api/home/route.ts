import { NextResponse } from "next/server";
import { hygraph } from "@/lib/hygraph";
import { GET_HOME } from "@/lib/queries/home";

export async function GET() {
  try {
    const data = await hygraph.request(GET_HOME);

    // Extract the first (and only) HomeItem
    const item = data.homeItems?.[0];

    if (!item) {
      return NextResponse.json({
        headline: "",
        subText: "",
        photos: Array(8).fill("/default.jpg")
      });
    }

    // Build the collage array in order
    const photos = [
      item.collagePhoto1TallLeft?.url || "/default.jpg",
      item.collagePhoto2WideTop?.url || "/default.jpg",
      item.collagePhoto3SmallBox1?.url || "/default.jpg",
      item.collagePhoto4TallRight?.url || "/default.jpg",
      item.collagePhoto5SmallBox2?.url || "/default.jpg",
      item.collagePhoto6WideBottom?.url || "/default.jpg",
      item.collagePhoto7TallColumnRight?.url || "/default.jpg",
      item.collagePhoto8SmallBox3?.url || "/default.jpg",
    ];

    return NextResponse.json({
      headline: item.headline || "",
      subText: item.subText || "",
      photos,
    });

  } catch (error) {
    console.error("Hygraph error:", error);
    return NextResponse.json(
      {
        headline: "",
        subText: "",
        photos: Array(8).fill("/default.jpg"),
      },
      { status: 500 }
    );
  }
}
