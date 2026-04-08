import { PrismaClient } from '@prisma/client';
import { courses } from '../src/lib/elearn-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  for (const course of courses) {
    const createdCourse = await prisma.course.create({
      data: {
        id: course.id.toString(),
        title: course.title,
        description: course.description,
        level: course.level,
        track: course.track,
        mentor: course.mentor,
        rating: parseFloat(course.rating.split(' ')[0]) || 0,
        learners: parseInt(course.learners.split('k')[0]) * 1000 || 0,
        duration: course.duration,
        lessons: course.lessons,
        outcomes: JSON.stringify(course.outcomes),
        curriculum: JSON.stringify(course.curriculum),
      },
    });

    // Create lessons
    for (let i = 0; i < course.lessonItems.length; i++) {
      const lesson = course.lessonItems[i];
      await prisma.lesson.create({
        data: {
          id: `${course.id}-${lesson.id}`,
          courseId: createdCourse.id,
          title: lesson.title,
          duration: parseInt(lesson.duration.split(' ')[0]) || 0,
          content: lesson.summary, // Using summary as content for now
          order: i + 1,
        },
      });
    }
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });