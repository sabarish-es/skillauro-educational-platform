'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Clock, BookOpen } from 'lucide-react';

const courseList = [
  {
    id: 1,
    name: 'Web Development Mastery',
    batch: 'Batch 2024-Feb',
    students: 25,
    duration: '12 weeks',
    progress: 65,
    status: 'Ongoing',
  },
  {
    id: 2,
    name: 'React Advanced',
    batch: 'Batch 2024-Jan',
    students: 18,
    duration: '8 weeks',
    progress: 45,
    status: 'Ongoing',
  },
  {
    id: 3,
    name: 'Node.js Backend',
    batch: 'Batch 2024-Mar',
    students: 20,
    duration: '10 weeks',
    progress: 20,
    status: 'Starting Soon',
  },
];

export default function FacultyCoursesPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600">View and manage your assigned courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseList.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{course.name}</CardTitle>
              <p className="text-sm text-gray-600">{course.batch}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    <strong>{course.students}</strong> students enrolled
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{course.duration}</span>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-1">
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

                <div className="pt-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      course.status === 'Ongoing'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 h-9"
                  size="sm"
                >
                  View Details
                </Button>
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 h-9"
                  size="sm"
                >
                  Materials
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
