import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function getUserFromToken(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const userId = getUserFromToken(request);

    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Get enrolled courses
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
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
        },
      },
    });

    const myCourses = enrollments.map(enrollment => ({
      ...enrollment.course,
      id: parseInt(enrollment.course.id),
      rating: `${enrollment.course.rating} ★`,
      learners: `${enrollment.course.learners} learners`,
      progress: enrollment.progress,
      lessons: enrollment.course.lessons,
      duration: enrollment.course.duration,
    }));

    const stats = {
      activeCourses: myCourses.length,
      averageProgress: 0,
      lessonsLeft: myCourses.reduce((total, course) => {
        const num = parseInt(course.lessons.split(' ')[0]) || 0;
        return total + num;
      }, 0),
    };

    return Response.json({
      user: {
        name: user.name,
        membership: "Pro Student",
      },
      myCourses,
      stats,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to fetch dashboard' }, { status: 500 });
  }
}
