'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Edit, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  specialization: string;
  phone: string;
  courses: number;
}

const initialFaculties: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Raj Kumar',
    email: 'raj.kumar@skillauro.com',
    department: 'Computer Science',
    specialization: 'Web Development',
    phone: '9876543210',
    courses: 3,
  },
  {
    id: '2',
    name: 'Ms. Priya Verma',
    email: 'priya.verma@skillauro.com',
    department: 'Computer Science',
    specialization: 'React & JavaScript',
    phone: '9876543211',
    courses: 2,
  },
  {
    id: '3',
    name: 'Prof. Arun Singh',
    email: 'arun.singh@skillauro.com',
    department: 'Computer Science',
    specialization: 'Backend Development',
    phone: '9876543212',
    courses: 4,
  },
  {
    id: '4',
    name: 'Dr. Meera Gupta',
    email: 'meera.gupta@skillauro.com',
    department: 'Data Science',
    specialization: 'Python & AI/ML',
    phone: '9876543213',
    courses: 2,
  },
];

export default function FacultiesPage() {
  const [faculties, setFaculties] = useState(initialFaculties);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaculties = faculties.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setFaculties(faculties.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manage Faculties</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Faculty
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
          />
        </div>
      </Card>

      {/* Faculties Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Department</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Specialization</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Courses</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFaculties.map((faculty) => (
                <tr key={faculty.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{faculty.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{faculty.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{faculty.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{faculty.specialization}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{faculty.courses}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                        <Edit className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(faculty.id)}
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

      {filteredFaculties.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-600">No faculties found matching your search.</p>
        </Card>
      )}
    </div>
  );
}
