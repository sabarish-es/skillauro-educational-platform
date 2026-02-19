'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Video, ClipboardCheck } from 'lucide-react';

const stats = [
  {
    title: 'My Courses',
    value: '3',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Total Students',
    value: '63',
    icon: Users,
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Classes Conducted',
    value: '24',
    icon: Video,
    color: 'from-orange-500 to-orange-600',
  },
  {
    title: 'Assessments Created',
    value: '12',
    icon: ClipboardCheck,
    color: 'from-purple-500 to-purple-600',
  },
];

export default function FacultyDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, Faculty</h1>
        <p className="text-gray-600">
          Manage your courses, conduct classes, and track student progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  course: 'Web Development Mastery',
                  date: 'Feb 8, 2024',
                  time: '2:00 PM - 4:00 PM',
                },
                {
                  course: 'React Advanced',
                  date: 'Feb 9, 2024',
                  time: '10:00 AM - 12:00 PM',
                },
                {
                  course: 'Node.js Backend',
                  date: 'Feb 10, 2024',
                  time: '3:00 PM - 5:00 PM',
                },
              ].map((cls, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{cls.course}</p>
                    <p className="text-sm text-gray-600">
                      {cls.date} • {cls.time}
                    </p>
                  </div>
                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-all">
                    Start
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { student: 'Arjun Sharma', assignment: 'Project 1', status: 'Pending' },
                { student: 'Priya Patel', assignment: 'Quiz 2', status: 'Submitted' },
                {
                  student: 'Rohit Singh',
                  assignment: 'Assignment 3',
                  status: 'Submitted',
                },
              ].map((submission, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{submission.student}</p>
                    <p className="text-sm text-gray-600">{submission.assignment}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      submission.status === 'Submitted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
