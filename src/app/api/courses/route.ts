import { getCourses } from "@/lib/elearn-data";

export async function GET() {
  return Response.json({
    courses: getCourses(),
    updatedAt: new Date().toISOString(),
  });
}
