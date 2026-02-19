'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Edit, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentNumber: string;
  batch: string;
  phone: string;
  enrolledCourses: number;
  feesPaid: boolean;
}

const initialStudents: Student[] = [
  {
    id: '1',
    name: 'Arjun Singh',
    email: 'arjun.singh@student.com',
    enrollmentNumber: 'STU001',
    batch: '2024-2026',
    phone: '9876543220',
    enrolledCourses: 4,
    feesPaid: true,
  },
  {
    id: '2',
    name: 'Anjali Sharma',
    email: 'anjali.sharma@student.com',
    enrollmentNumber: 'STU002',
    batch: '2024-2026',
    phone: '9876543221',
    enrolledCourses: 3,
    feesPaid: true,
  },
  {
    id: '3',
    name: 'Rahul Patel',
    email: 'rahul.patel@student.com',
    enrollmentNumber: 'STU003',
    batch: '2024-2026',
    phone: '9876543222',
    enrolledCourses: 4,
    feesPaid: false,
  },
  {
    id: '4',
    name: 'Neha Verma',
    email: 'neha.verma@student.com',
    enrollmentNumber: 'STU004',
    batch: '2024-2026',
    phone: '9876543223',
    enrolledCourses: 3,
    feesPaid: true,
  },
];

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manage Students</h1>
        <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or enrollment number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
          />
        </div>
      </Card>

      {/* Students Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Enrollment #</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Batch</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Courses</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fees Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{student.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{student.enrollmentNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.batch}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.enrolledCourses}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        student.feesPaid
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {student.feesPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                        <Edit className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredStudents.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-600">No students found matching your search.</p>
        </Card>
      )}
    </div>
  );
}
