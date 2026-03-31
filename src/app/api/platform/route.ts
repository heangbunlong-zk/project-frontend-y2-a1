import { getFeaturedCourses, platformData } from "@/lib/elearn-data";

export async function GET() {
  return Response.json({
    ...platformData,
    featuredCourses: getFeaturedCourses(3),
  });
}
