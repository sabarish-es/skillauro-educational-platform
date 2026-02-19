'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const attendanceData = [
  {
    course: 'Web Development',
    percentage: 92,
    attended: 23,
    total: 25,
  },
  {
    course: 'React Advanced',
    percentage: 88,
    attended: 15,
    total: 17,
  },
  {
    course: 'Node.js Backend',
    percentage: 85,
    attended: 17,
    total: 20,
  },
];

const chartData = [
  { course: 'Web Dev', attended: 23, missed: 2 },
  { course: 'React', attended: 15, missed: 2 },
  { course: 'Node.js', attended: 17, missed: 3 },
];

export default function StudentAttendancePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
        <p className="text-gray-600">Track your attendance across all courses</p>
      </div>

      {/* Overall Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="attended" fill="#10b981" name="Attended" />
              <Bar dataKey="missed" fill="#ef4444" name="Missed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Attendance by Course */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {attendanceData.map((data) => (
          <Card key={data.course}>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">{data.course}</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Attendance Rate</span>
                    <span className="text-2xl font-bold text-green-600">{data.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full"
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Attended</p>
                    <p className="text-lg font-bold text-green-600">{data.attended}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Classes</p>
                    <p className="text-lg font-bold text-blue-600">{data.total}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
