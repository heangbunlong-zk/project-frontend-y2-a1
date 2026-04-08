export type LessonItem = {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  summary: string;
};

export type Course = {
  id: number;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  track: string;
  mentor: string;
  rating: string;
  learners: string;
  duration: string;
  lessons: string;
  description: string;
  outcomes: string[];
  curriculum: string[];
  lessonItems: LessonItem[];
  dashboard?: {
    progress: number;
    lessonsLeft: string;
    durationLeft: string;
  };
};

export type CourseSummary = Omit<
  Course,
  "outcomes" | "curriculum" | "lessonItems" | "dashboard"
>;

const courses: Course[] = [
  {
    id: 1,
    title: "C++ Basics",
    level: "Beginner",
    track: "Programming",
    mentor: "Sarah Khan",
    rating: "4.8 ★",
    learners: "1.4k learners",
    duration: "6 weeks",
    lessons: "14 lessons",
    description:
      "Learn variables, loops, functions, and problem-solving with beginner-friendly practice.",
    outcomes: [
      "Understand variables, loops, conditions, and functions",
      "Write beginner-friendly problem solving code",
      "Practice with exercises and mini real-world tasks",
      "Build a strong foundation for data structures",
    ],
    curriculum: [
      "Getting started with C++ and your setup",
      "Core syntax, variables, and data types",
      "Conditions, loops, and reusable functions",
      "Practice challenges and mini project",
    ],
    lessonItems: [
      {
        id: 1,
        title: "Introduction",
        duration: "6 min",
        completed: true,
        summary: "Understand the course structure and set up your first C++ environment.",
      },
      {
        id: 2,
        title: "Variables",
        duration: "10 min",
        completed: true,
        summary: "Learn how variables work and how to store values in clean, readable code.",
      },
      {
        id: 3,
        title: "Loops",
        duration: "12 min",
        completed: false,
        summary: "Practice repeating tasks efficiently with loops and simple exercises.",
      },
    ],
    dashboard: {
      progress: 40,
      lessonsLeft: "8 lessons left",
      durationLeft: "3 weeks left",
    },
  },
  {
    id: 2,
    title: "React Development",
    level: "Intermediate",
    track: "Frontend",
    mentor: "Daniel Lee",
    rating: "4.9 ★",
    learners: "2.1k learners",
    duration: "8 weeks",
    lessons: "18 lessons",
    description:
      "Build responsive interfaces with components, hooks, and real UI projects.",
    outcomes: [
      "Create reusable components and scalable UI structure",
      "Use hooks and state effectively in real interfaces",
      "Connect pages, forms, and dynamic interactions",
      "Ship polished frontend projects with confidence",
    ],
    curriculum: [
      "React fundamentals and component thinking",
      "Hooks, props, and state-driven UI",
      "Routing, forms, and reusable patterns",
      "Capstone project and UI polish",
    ],
    lessonItems: [
      {
        id: 1,
        title: "React Overview",
        duration: "8 min",
        completed: true,
        summary: "See how React powers component-driven interfaces and reusable UI patterns.",
      },
      {
        id: 2,
        title: "Props & State",
        duration: "14 min",
        completed: false,
        summary: "Use props and state to create dynamic, interactive components.",
      },
      {
        id: 3,
        title: "Hooks Practice",
        duration: "16 min",
        completed: false,
        summary: "Apply hooks to manage state and side effects in realistic frontend examples.",
      },
    ],
    dashboard: {
      progress: 70,
      lessonsLeft: "5 lessons left",
      durationLeft: "2 weeks left",
    },
  },
  {
    id: 3,
    title: "Advanced Web Development",
    level: "Advanced",
    track: "Full Stack",
    mentor: "Maya Ibrahim",
    rating: "4.7 ★",
    learners: "980 learners",
    duration: "10 weeks",
    lessons: "22 lessons",
    description:
      "Master scalable apps, APIs, and advanced architecture for production-ready products.",
    outcomes: [
      "Design scalable frontend and backend structures",
      "Work with APIs and production deployment workflows",
      "Improve performance and maintainability of large apps",
      "Build portfolio-ready advanced projects",
    ],
    curriculum: [
      "Architecture and scalable project setup",
      "API design, authentication, and integrations",
      "Performance optimization and clean code patterns",
      "Production deployment and final project review",
    ],
    lessonItems: [
      {
        id: 1,
        title: "Architecture Review",
        duration: "11 min",
        completed: true,
        summary: "Review scalable project architecture and modern web engineering decisions.",
      },
      {
        id: 2,
        title: "API Integration",
        duration: "15 min",
        completed: false,
        summary: "Connect your app with APIs and understand robust data-flow patterns.",
      },
      {
        id: 3,
        title: "Deployment Strategy",
        duration: "13 min",
        completed: false,
        summary: "Prepare your app for production with deployment and optimization best practices.",
      },
    ],
  },
  {
    id: 4,
    title: "JavaScript Essentials",
    level: "Beginner",
    track: "Web Basics",
    mentor: "Omar Adel",
    rating: "4.8 ★",
    learners: "1.8k learners",
    duration: "5 weeks",
    lessons: "12 lessons",
    description:
      "Understand JavaScript fundamentals and apply them in interactive mini exercises.",
    outcomes: [
      "Work with variables, arrays, and functions confidently",
      "Understand DOM basics and browser-side logic",
      "Build small interactive web exercises",
      "Prepare for React and modern frontend learning",
    ],
    curriculum: [
      "JavaScript syntax and core concepts",
      "Arrays, objects, and reusable functions",
      "DOM events and interactivity",
      "Mini project and review",
    ],
    lessonItems: [
      {
        id: 1,
        title: "JS Foundations",
        duration: "7 min",
        completed: true,
        summary: "Learn the basic syntax and mindset behind writing JavaScript code.",
      },
      {
        id: 2,
        title: "Functions & Arrays",
        duration: "12 min",
        completed: false,
        summary: "Use arrays and functions to organize data and behavior cleanly.",
      },
      {
        id: 3,
        title: "DOM Practice",
        duration: "15 min",
        completed: false,
        summary: "Make the page interactive by updating content and responding to events.",
      },
    ],
  },
];

export const platformData = {
  brand: {
    name: "E-Learn",
    subtitle: "Professional Academy",
  },
  banner: {
    badge: "Professional e-learning experience",
    title: "Learn front-end and web development with clear, guided lessons",
    description:
      "Study with structured paths, real projects, and dashboard tracking that feels like a modern learning platform.",
  },
  stats: [
    { value: "120+", label: "guided lessons" },
    { value: "24/7", label: "learning access" },
    { value: "4.8/5", label: "average rating" },
  ],
  resources: ["Learning Paths", "Certificates", "Student Support"],
  contact: {
    email: "support@elearn.com",
    phone: "+20 100 123 4567",
    hours: "Sun - Thu, 9:00 AM - 6:00 PM",
  },
  footerNote: "Built for a clean, modern, and professional learning experience.",
};

function toCourseSummary(course: Course): CourseSummary {
  const { outcomes, curriculum, lessonItems, dashboard, ...summary } = course;
  return summary;
}

export function getCourses(): CourseSummary[] {
  return courses.map(toCourseSummary);
}

export function getFeaturedCourses(limit = 3): CourseSummary[] {
  return getCourses().slice(0, limit);
}

export function getCourseById(id: number): Course | undefined {
  return courses.find((course) => course.id === id);
}

export { courses };

export function getDashboardData(userName = "Student") {
  const myCourses = courses
    .filter((course) => course.dashboard)
    .map((course) => ({
      ...toCourseSummary(course),
      progress: course.dashboard!.progress,
      lessons: course.dashboard!.lessonsLeft,
      duration: course.dashboard!.durationLeft,
    }));

  const lessonsLeft = myCourses.reduce((total, course) => {
    const value = Number.parseInt(course.lessons, 10);
    return total + (Number.isNaN(value) ? 0 : value);
  }, 0);

  const averageProgress = Math.round(
    myCourses.reduce((total, course) => total + course.progress, 0) /
      myCourses.length
  );

  return {
    user: {
      name: userName,
      membership: "Pro Student",
    },
    myCourses,
    stats: {
      activeCourses: myCourses.length,
      averageProgress,
      lessonsLeft,
    },
  };
}
