import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, BookOpen, Zap } from 'lucide-react';

export const metadata = {
  title: 'Skillauro - Learn, Innovate, Succeed',
  description: 'Transform your skills with Skillauro online learning platform',
};

const features = [
  {
    icon: BookOpen,
    title: 'Expert Instructors',
    description: 'Learn from industry experts with years of experience',
  },
  {
    icon: Users,
    title: 'Interactive Classes',
    description: 'Engage in live classes with instant feedback and support',
  },
  {
    icon: Zap,
    title: 'Comprehensive Curriculum',
    description: 'Master in-demand skills with our structured courses',
  },
  {
    icon: CheckCircle,
    title: 'Certification',
    description: 'Earn recognized certificates upon course completion',
  },
];

const courses = [
  {
    id: 1,
    name: 'Web Development Mastery',
    instructor: 'Dr. Raj Kumar',
    students: 342,
    level: 'Beginner to Advanced',
  },
  {
    id: 2,
    name: 'React Advanced',
    instructor: 'Ms. Priya Verma',
    students: 256,
    level: 'Intermediate to Advanced',
  },
  {
    id: 3,
    name: 'Node.js Backend',
    instructor: 'Prof. Arun Singh',
    students: 198,
    level: 'Intermediate to Advanced',
  },
  {
    id: 4,
    name: 'Python Data Science',
    instructor: 'Dr. Meera Gupta',
    students: 287,
    level: 'Beginner to Intermediate',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/skillauro-logo.png"
              alt="Skillauro"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Skillauro
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#courses" className="text-gray-700 hover:text-blue-600 font-medium">
              Courses
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-blue-600 to-orange-500 hover:shadow-lg text-white">
                Login
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Link href="/login">
              <Button className="bg-gradient-to-r from-blue-600 to-orange-500 text-white text-sm py-1 px-3">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Learn Skills. Build Your{' '}
                <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  Future
                </span>
              </h1>
              <p className="text-lg text-gray-700">
                Master in-demand skills with expert instructors, live interactive classes, and
                industry-recognized certifications.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/login">
                  <Button className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-orange-500 hover:shadow-lg text-white">
                    Get Started
                  </Button>
                </Link>
                <Link href="#courses">
                  <Button
                    variant="outline"
                    className="px-8 py-6 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    Explore Courses
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-learning.jpg"
                alt="Student learning online with inspiration"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Skillauro?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to succeed in your learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="mb-4 inline-block p-3 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Popular Courses
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our curated selection of industry-relevant courses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{course.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    By <strong>{course.instructor}</strong>
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>📚 {course.students.toLocaleString()} students</p>
                    <p>🎓 {course.level}</p>
                  </div>
                  <Link href="/login">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who are already learning with Skillauro
          </p>
          <Link href="/login">
            <Button className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 font-semibold">
              Start Learning Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                  S
                </div>
                <span className="text-lg font-bold">Skillauro</span>
              </div>
              <p className="text-gray-400">Learn • Innovate • Succeed</p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#courses" className="hover:text-white">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Contact Us</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 management@skillauro.in</p>
                <p>📞 8220946279</p>
                <p>📞 6379652485</p>
                <p>📞 6369721553</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Skillauro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
