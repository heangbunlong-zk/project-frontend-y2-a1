import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const certificates = [
  {
    title: "Frontend Foundations",
    status: "Ready to unlock",
    detail: "Complete 2 remaining modules to generate your certificate.",
  },
  {
    title: "React Development",
    status: "In progress",
    detail: "Your progress is at 70%. Finish the final project to qualify.",
  },
  {
    title: "C++ Basics",
    status: "Eligible soon",
    detail: "Only 1 assessment remains before certification review.",
  },
];

export default function CertificatePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="rounded-4xl bg-linear-to-r from-slate-950 via-indigo-900 to-cyan-600 p-6 text-white shadow-xl md:p-8">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-cyan-100">
              Certificates hub
            </span>

            <h1 className="mt-4 text-3xl font-bold md:text-5xl">
              Showcase your learning achievements professionally
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-100 md:text-base">
              Track your completion status, unlock course certificates, and build
              a stronger portfolio from your learning journey.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">3</p>
                <p className="mt-1 text-sm text-slate-200">certificate tracks</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">2</p>
                <p className="mt-1 text-sm text-slate-200">nearly unlocked</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">2026</p>
                <p className="mt-1 text-sm text-slate-200">latest records</p>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-indigo-600">My certificates</p>
                  <h2 className="text-2xl font-bold text-slate-900">Completion status</h2>
                </div>
                <Link href="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-indigo-600">
                  Open dashboard →
                </Link>
              </div>

              <div className="mt-5 space-y-4">
                {certificates.map((certificate) => (
                  <div key={certificate.title} className="rounded-3xl border border-slate-200 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{certificate.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">{certificate.detail}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {certificate.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-indigo-600">Why certificates matter</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>• Validate your course completion professionally</li>
                  <li>• Strengthen your portfolio and CV</li>
                  <li>• Show consistent learning progress</li>
                </ul>
              </div>

              <div className="rounded-4xl bg-slate-900 p-6 text-white shadow-xl">
                <p className="text-sm font-semibold text-cyan-200">Next step</p>
                <h3 className="mt-2 text-xl font-bold">Finish your active lessons</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Continue your current courses to unlock more completion badges and certificates.
                </p>
                <Link
                  href="/Courses"
                  className="mt-4 inline-flex rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Browse Courses
                </Link>
              </div>
            </aside>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
