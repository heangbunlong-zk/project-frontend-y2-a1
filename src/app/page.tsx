import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import CourseCard from "./components/CourseCard";
import { getFeaturedCourses } from "@/lib/elearn-data";

export default function Home() {
  const featuredCourses = getFeaturedCourses(3);

  return (
    <>
      <Navbar />
      <HeroSection />

      <section className="bg-slate-50 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-indigo-600">Featured programs</p>
              <h2 className="text-3xl font-bold text-slate-900">
                Popular learning paths
              </h2>
            </div>
            <a
              href="/Courses"
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600"
            >
              View all courses →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                level={course.level}
                description={course.description}
                track={course.track}
                duration={course.duration}
                lessons={course.lessons}
                mentor={course.mentor}
                rating={course.rating}
                learners={course.learners}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
