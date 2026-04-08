import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        level: true,
        track: true,
        mentor: true,
        rating: true,
        learners: true,
        duration: true,
        lessons: true,
        description: true,
      },
    });

    // Format to match frontend expectations
    const formattedCourses = courses.map(course => ({
      ...course,
      id: parseInt(course.id),
      rating: `${course.rating} ★`,
      learners: `${course.learners} learners`,
    }));

    return Response.json({
      courses: formattedCourses,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
