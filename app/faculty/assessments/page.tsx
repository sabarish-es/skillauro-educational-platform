'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Edit, Trash2, CheckCircle } from 'lucide-react';

const mockAssessments = [
  {
    id: 1,
    title: 'HTML & CSS Fundamentals',
    course: 'Web Development Mastery',
    type: 'Quiz',
    totalMarks: 50,
    submissions: 22,
    evaluated: 15,
    status: 'Published',
  },
  {
    id: 2,
    title: 'React Hooks Project',
    course: 'React Advanced',
    type: 'Assignment',
    totalMarks: 100,
    submissions: 16,
    evaluated: 8,
    status: 'Published',
  },
  {
    id: 3,
    title: 'Express.js API',
    course: 'Node.js Backend',
    type: 'Project',
    totalMarks: 150,
    submissions: 18,
    evaluated: 3,
    status: 'Draft',
  },
];

export default function FacultyAssessmentsPage() {
  const [assessments, setAssessments] = useState(mockAssessments);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    type: 'quiz',
    totalMarks: '',
  });

  const handleAddAssessment = () => {
    if (formData.title && formData.course && formData.totalMarks) {
      setAssessments([
        {
          id: assessments.length + 1,
          title: formData.title,
          course: formData.course,
          type: formData.type,
          totalMarks: parseInt(formData.totalMarks),
          submissions: 0,
          evaluated: 0,
          status: 'Draft',
        },
        ...assessments,
      ]);
      setFormData({ title: '', course: '', type: 'quiz', totalMarks: '' });
      setIsOpen(false);
    }
  };

  const handleDelete = (id: number) => {
    setAssessments(assessments.filter((a) => a.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'quiz':
        return 'bg-blue-100 text-blue-800';
      case 'assignment':
        return 'bg-orange-100 text-orange-800';
      case 'project':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assessments</h1>
          <p className="text-gray-600">Create and manage assessments, quizzes, and projects</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-green-600 to-teal-500 hover:shadow-lg">
              <Plus className="h-4 w-4" />
              Create Assessment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Assessment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Title</label>
                <Input
                  placeholder="Assessment title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Course</label>
                <select
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select a course</option>
                  <option value="Web Development">Web Development Mastery</option>
                  <option value="React">React Advanced</option>
                  <option value="Node.js">Node.js Backend</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg"
                  >
                    <option value="quiz">Quiz</option>
                    <option value="assignment">Assignment</option>
                    <option value="project">Project</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Total Marks</label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={formData.totalMarks}
                    onChange={(e) =>
                      setFormData({ ...formData, totalMarks: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    setFormData({ title: '', course: '', type: 'quiz', totalMarks: '' });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddAssessment}
                  className="bg-gradient-to-r from-green-600 to-teal-500"
                >
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead>Title</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Evaluated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((assessment) => (
                <TableRow key={assessment.id} className="border-b">
                  <TableCell className="font-medium">{assessment.title}</TableCell>
                  <TableCell className="text-sm">{assessment.course}</TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${getTypeColor(
                        assessment.type
                      )}`}
                    >
                      {assessment.type}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold">{assessment.totalMarks}</TableCell>
                  <TableCell>{assessment.submissions}</TableCell>
                  <TableCell className="text-blue-600 font-semibold">
                    {assessment.evaluated}/{assessment.submissions}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        assessment.status === 'Published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {assessment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(assessment.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
