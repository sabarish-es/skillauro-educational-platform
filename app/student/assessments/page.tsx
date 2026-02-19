'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle } from 'lucide-react';

const assessments = [
  {
    id: 1,
    title: 'HTML & CSS Fundamentals',
    course: 'Web Development Mastery',
    type: 'Quiz',
    totalMarks: 50,
    status: 'Completed',
    obtainedMarks: 45,
    dueDate: '2024-02-10',
  },
  {
    id: 2,
    title: 'React Hooks Project',
    course: 'React Advanced',
    type: 'Assignment',
    totalMarks: 100,
    status: 'Submitted',
    obtainedMarks: 88,
    dueDate: '2024-02-15',
  },
  {
    id: 3,
    title: 'Express.js API',
    course: 'Node.js Backend',
    type: 'Project',
    totalMarks: 150,
    status: 'Pending',
    obtainedMarks: null,
    dueDate: '2024-02-28',
  },
  {
    id: 4,
    title: 'JavaScript ES6+',
    course: 'Web Development Mastery',
    type: 'Quiz',
    totalMarks: 40,
    status: 'Not Started',
    obtainedMarks: null,
    dueDate: '2024-02-25',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Submitted':
      return 'bg-blue-100 text-blue-800';
    case 'Pending':
      return 'bg-orange-100 text-orange-800';
    case 'Not Started':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function StudentAssessmentsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Assessments</h1>
        <p className="text-gray-600">View upcoming and completed assessments</p>
      </div>

      <div className="space-y-4">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {assessment.title}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                        assessment.status
                      )}`}
                    >
                      {assessment.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{assessment.course}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Type</p>
                      <p className="font-semibold text-gray-900">{assessment.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Marks</p>
                      <p className="font-semibold text-gray-900">{assessment.totalMarks}</p>
                    </div>
                    {assessment.obtainedMarks !== null && (
                      <div>
                        <p className="text-gray-600">Obtained</p>
                        <p className="font-semibold text-green-600">{assessment.obtainedMarks}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-600">Due Date</p>
                      <p className="font-semibold text-gray-900">{assessment.dueDate}</p>
                    </div>
                  </div>
                </div>

                {assessment.status === 'Not Started' && (
                  <Button className="ml-4 bg-blue-600 hover:bg-blue-700">
                    Start Assessment
                  </Button>
                )}
                {assessment.status === 'Pending' && (
                  <Button className="ml-4 bg-green-600 hover:bg-green-700">
                    Continue
                  </Button>
                )}
                {assessment.status === 'Completed' && (
                  <div className="ml-4 flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">Passed</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
