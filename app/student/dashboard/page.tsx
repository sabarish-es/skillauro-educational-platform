'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle, AlertCircle, Zap } from 'lucide-react';

export default function StudentDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Student!</h1>
        <p className="text-gray-600">Track your courses, attendance, and progress</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Enrolled Courses</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">3</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Avg Attendance</p>
                <p className="text-2xl font-bold text-green-600 mt-2">92%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pending Fees</p>
                <p className="text-2xl font-bold text-orange-600 mt-2">₹4,000</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Tests Completed</p>
                <p className="text-2xl font-bold text-purple-600 mt-2">5/8</p>
              </div>
              <Zap className="h-8 w-8 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrolled Courses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: 'Web Development Mastery',
                  faculty: 'Dr. Raj Kumar',
                  progress: 65,
                  status: 'Ongoing',
                },
                {
                  name: 'React Advanced',
                  faculty: 'Ms. Priya Verma',
                  progress: 45,
                  status: 'Ongoing',
                },
                {
                  name: 'Node.js Backend',
                  faculty: 'Prof. Arun Singh',
                  progress: 20,
                  status: 'Starting Soon',
                },
              ].map((course) => (
                <div
                  key={course.name}
                  className="flex items-center justify-between py-4 border-b last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{course.name}</p>
                    <p className="text-sm text-gray-600">Instructor: {course.faculty}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-600">{course.progress}%</span>
                    </div>
                  </div>
                  <Button className="ml-4" size="sm">
                    Open Course
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { course: 'Web Development', date: 'Today 2:00 PM' },
                { course: 'React Advanced', date: 'Tomorrow 10:00 AM' },
                { course: 'Node.js Backend', date: 'Feb 10, 3:00 PM' },
              ].map((event, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{event.course}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: 'Fee Payment Reminder',
                message: 'Your pending fees need to be paid by Feb 28, 2024',
                type: 'alert',
              },
              {
                title: 'Class Rescheduled',
                message: 'Web Development class has been moved to 3:00 PM',
                type: 'info',
              },
              {
                title: 'Exam Announcement',
                message: 'React Advanced exam scheduled for Feb 20, 2024',
                type: 'info',
              },
            ].map((announcement, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 py-3 border-b last:border-0"
              >
                <div
                  className={`h-3 w-3 rounded-full mt-1 flex-shrink-0 ${
                    announcement.type === 'alert' ? 'bg-orange-600' : 'bg-blue-600'
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{announcement.title}</p>
                  <p className="text-sm text-gray-600">{announcement.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
