'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

export interface CourseFormData {
  name: string;
  code: string;
  description: string;
  instructor: string;
  facultyId?: string;
  duration: string;
  credits: string;
  maxStudents: string;
  level: string;
  status: 'Active' | 'Inactive' | 'Upcoming';
  image?: File;
  imagePreview?: string;
}

interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
}

interface CourseFormProps {
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  initialData?: CourseFormData;
}

export function CourseForm({ onClose, onSubmit, isLoading, initialData }: CourseFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loadingFaculties, setLoadingFaculties] = useState(false);

  useEffect(() => {
    const fetchFaculties = async () => {
      setLoadingFaculties(true);
      try {
        const response = await fetch('/api/admin/faculties/list');
        if (response.ok) {
          const data = await response.json();
          setFaculties(data.faculties || []);
        }
      } catch (error) {
        console.error('[v0] Error fetching faculties:', error);
      } finally {
        setLoadingFaculties(false);
      }
    };
    fetchFaculties();
  }, []);

  const [formData, setFormData] = useState<CourseFormData>(
    initialData || {
      name: '',
      code: '',
      description: '',
      instructor: '',
      facultyId: '',
      duration: '',
      credits: '',
      maxStudents: '',
      level: 'Beginner',
      status: 'Active',
      image: undefined,
      imagePreview: undefined,
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result as string,
        }));
        if (errors.image) {
          setErrors((prev) => ({ ...prev, image: '' }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Course name is required';
    if (!formData.code.trim()) newErrors.code = 'Course code is required';
    if (!formData.instructor.trim()) newErrors.instructor = 'Instructor is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.credits.trim()) newErrors.credits = 'Credits are required';
    if (!formData.maxStudents.trim()) newErrors.maxStudents = 'Max students is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('code', formData.code);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('instructor', formData.instructor || '');
      formDataToSend.append('facultyId', formData.facultyId || '');
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('credits', formData.credits);
      formDataToSend.append('maxStudents', formData.maxStudents);
      formDataToSend.append('level', formData.level);
      formDataToSend.append('status', formData.status);
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch('/api/admin/courses/add', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        onSubmit();
        onClose();
      } else {
        const error = await response.json();
        setErrors({ submit: error.message || 'Failed to add course' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-2xl my-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Course</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {errors.submit}
              </div>
            )}

            {/* Image Upload Section */}
            <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={submitting || isLoading}
              />
              {formData.imagePreview ? (
                <div className="relative">
                  <img src={formData.imagePreview} alt="Course preview" className="w-full h-48 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData((prev) => ({ ...prev, image: undefined, imagePreview: undefined }));
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload course image</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
            {errors.image && <p className="text-red-500 text-xs mb-4">{errors.image}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Web Development"
                  disabled={submitting || isLoading}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Code *
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${
                    errors.code ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="WEB101"
                  disabled={submitting || isLoading}
                />
                {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructor *
                </label>
                {faculties.length > 0 ? (
                  <select
                    name="facultyId"
                    value={formData.facultyId || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    disabled={submitting || isLoading || loadingFaculties}
                  >
                    <option value="">Select Faculty...</option>
                    {faculties.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.name} ({faculty.department})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${
                      errors.instructor ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={loadingFaculties ? 'Loading faculties...' : 'Dr. John Doe'}
                    disabled={submitting || isLoading || loadingFaculties}
                  />
                )}
                {errors.instructor && <p className="text-red-500 text-xs mt-1">{errors.instructor}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  disabled={submitting || isLoading}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${
                    errors.duration ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="12 weeks"
                  disabled={submitting || isLoading}
                />
                {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credits *
                </label>
                <input
                  type="number"
                  name="credits"
                  value={formData.credits}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${
                    errors.credits ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="4"
                  disabled={submitting || isLoading}
                />
                {errors.credits && <p className="text-red-500 text-xs mt-1">{errors.credits}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Students *
                </label>
                <input
                  type="number"
                  name="maxStudents"
                  value={formData.maxStudents}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${
                    errors.maxStudents ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="50"
                  disabled={submitting || isLoading}
                />
                {errors.maxStudents && <p className="text-red-500 text-xs mt-1">{errors.maxStudents}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  disabled={submitting || isLoading}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Upcoming</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="Enter course description"
                  rows={3}
                  disabled={submitting || isLoading}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting || isLoading}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Add Course'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
