import { getCourseById } from "@/lib/elearn-data";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const course = getCourseById(Number(id));

  if (!course) {
    return Response.json({ message: "Course not found" }, { status: 404 });
  }

  return Response.json({ course });
}
