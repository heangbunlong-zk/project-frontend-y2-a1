import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        courseLessons: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!course) {
      return Response.json({ message: "Course not found" }, { status: 404 });
    }

    // Format to match frontend
    const formattedCourse = {
      id: parseInt(course.id),
      title: course.title,
      level: course.level,
      track: course.track,
      mentor: course.mentor,
      rating: `${course.rating} ★`,
      learners: `${course.learners} learners`,
      duration: course.duration,
      lessons: course.lessons,
      description: course.description,
      outcomes: JSON.parse(course.outcomes),
      curriculum: JSON.parse(course.curriculum),
      lessonItems: course.courseLessons.map(lesson => ({
        id: parseInt(lesson.id.split('-')[1]), // Extract original id
        title: lesson.title,
        duration: `${lesson.duration} min`,
        completed: false, // Default, will be per user later
        summary: lesson.content,
      })),
    };

    return Response.json({ course: formattedCourse });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to fetch course' }, { status: 500 });
  }
}
