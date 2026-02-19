'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Clock, FileText } from 'lucide-react';

const enrolledCourses = [
  {
    id: 1,
    name: 'Web Development Mastery',
    faculty: 'Dr. Raj Kumar',
    progress: 65,
    students: 25,
    duration: '12 weeks',
    materials: 24,
  },
  {
    id: 2,
    name: 'React Advanced',
    faculty: 'Ms. Priya Verma',
    progress: 45,
    students: 18,
    duration: '8 weeks',
    materials: 16,
  },
  {
    id: 3,
    name: 'Node.js Backend',
    faculty: 'Prof. Arun Singh',
    progress: 20,
    students: 20,
    duration: '10 weeks',
    materials: 12,
  },
];

export default function StudentCoursesPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600">View your enrolled courses and learning progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600"></div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 -mt-16 relative z-10 bg-white inline-block px-2">
                    {course.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">Instructor: {course.faculty}</p>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-bold text-blue-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students} students
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    {course.materials} files
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Continue Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
