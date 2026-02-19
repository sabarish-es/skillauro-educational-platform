'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';

const students = [
  { id: 1, name: 'Arjun Sharma', rollNo: 'STU001' },
  { id: 2, name: 'Priya Patel', rollNo: 'STU002' },
  { id: 3, name: 'Rohit Singh', rollNo: 'STU003' },
  { id: 4, name: 'Meera Gupta', rollNo: 'STU004' },
  { id: 5, name: 'Rahul Verma', rollNo: 'STU005' },
];

export default function FacultyAttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [attendance, setAttendance] = useState<Record<number, string>>({});
  const [saved, setSaved] = useState(false);

  const handleAttendanceChange = (studentId: number, status: string) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
    setSaved(false);
  };

  const handleSaveAttendance = () => {
    if (selectedCourse && selectedDate) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const getPresent = () => Object.values(attendance).filter((s) => s === 'present').length;
  const getAbsent = () => Object.values(attendance).filter((s) => s === 'absent').length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
        <p className="text-gray-600">Mark and manage student attendance</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select a course</option>
                <option value="Web Development">Web Development Mastery</option>
                <option value="React">React Advanced</option>
                <option value="Node.js">Node.js Backend</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Date</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleSaveAttendance}
                className="w-full bg-gradient-to-r from-green-600 to-teal-500 hover:shadow-lg"
              >
                Save Attendance
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {selectedCourse && selectedDate && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600 mb-1">Present</p>
              <p className="text-3xl font-bold text-green-600">{getPresent()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600 mb-1">Absent</p>
              <p className="text-3xl font-bold text-red-600">{getAbsent()}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Attendance Table */}
      {selectedCourse && selectedDate ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead>Roll No</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} className="border-b">
                    <TableCell className="font-mono">{student.rollNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAttendanceChange(student.id, 'present')}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            attendance[student.id] === 'present'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(student.id, 'absent')}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            attendance[student.id] === 'absent'
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500">Select a course and date to mark attendance</p>
          </CardContent>
        </Card>
      )}

      {saved && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
          ✓ Attendance saved successfully
        </div>
      )}
    </div>
  );
}
