'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Edit, Trash2, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CourseForm } from '@/components/admin/course-form';

interface Course {
  id: string;
  name: string;
  instructor: string;
  students: number;
  duration: string;
  level: string;
  status: 'Active' | 'Inactive' | 'Upcoming';
}

const initialCourses: Course[] = [];

export default function CoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/courses/list');
        if (response.ok) {
          const data = await response.json();
          setCourses(data.courses || []);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await fetch(`/api/admin/courses/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCourses(courses.filter((c) => c.id !== id));
        setError(null);
      } else {
        setError('Failed to delete course');
      }
    } catch (err) {
      console.error('[v0] Error deleting course:', err);
      setError('Failed to delete course');
    }
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manage Courses</h1>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by course name, instructor, or level..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
          />
        </div>
      </Card>

      {/* Courses Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {course.imageUrl && (
              <div className="h-40 bg-gray-200 relative overflow-hidden">
                <img
                  src={course.imageUrl}
                  alt={course.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E';
                  }}
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{course.name}</h3>
                  <p className="text-sm text-gray-600">
                    {course.instructor === 'TBD' ? 'Pending Assignment' : `by ${course.instructor}`}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${
                    course.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : course.status === 'Upcoming'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {course.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Duration</p>
                  <p className="font-semibold text-gray-900">{course.duration} weeks</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Level</p>
                  <p className="text-sm font-medium text-gray-900">{course.level}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Students</p>
                  <p className="font-semibold text-gray-900">{course.students}</p>
                </div>
              </div>

              {course.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
              )}

              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <button className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-blue-100 rounded-lg transition-colors">
                  <Edit className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-600">Delete</span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {error && (
        <Card className="p-4 bg-red-50 border border-red-200">
          <p className="text-red-700">{error}</p>
        </Card>
      )}

      {isLoading ? (
        <Card className="p-8 text-center">
          <p className="text-gray-600">Loading courses...</p>
        </Card>
      ) : filteredCourses.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-600">
            {searchTerm ? 'No courses found matching your search.' : 'No courses added yet. Click "Add Course" to get started.'}
          </p>
        </Card>
      ) : null}

      {showForm && (
        <CourseForm
          onClose={() => setShowForm(false)}
          onSubmit={() => {
            setShowForm(false);
            const fetchCourses = async () => {
              try {
                const response = await fetch('/api/admin/courses/list');
                if (response.ok) {
                  const data = await response.json();
                  setCourses(data.courses || []);
                }
              } catch (err) {
                console.error('Error fetching courses:', err);
              }
            };
            fetchCourses();
          }}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
