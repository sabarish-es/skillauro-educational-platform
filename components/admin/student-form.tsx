'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface StudentFormProps {
  onClose: () => void;
  onSubmit: (data: StudentData) => void;
  isLoading?: boolean;
}

export interface StudentData {
  name: string;
  email: string;
  enrollmentNumber: string;
  batch: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

export function StudentForm({ onClose, onSubmit, isLoading = false }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentData>({
    name: '',
    email: '',
    enrollmentNumber: '',
    batch: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.enrollmentNumber.trim()) newErrors.enrollmentNumber = 'Enrollment number is required';
    if (!formData.batch.trim()) newErrors.batch = 'Batch is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'Confirm password is required';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('/api/admin/student/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          onSubmit(formData);
          setFormData({
            name: '',
            email: '',
            enrollmentNumber: '',
            batch: '',
            phone: '',
            address: '',
          });
        } else {
          const error = await response.json();
          setErrors({ submit: error.message || 'Failed to add student' });
        }
      } catch (error) {
        setErrors({ submit: 'Network error. Please try again.' });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-2xl my-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Add Student</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {errors.submit}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                  disabled={isLoading}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="student@skillauro.com"
                  disabled={isLoading}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enrollment Number *
                </label>
                <input
                  type="text"
                  name="enrollmentNumber"
                  value={formData.enrollmentNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                    errors.enrollmentNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="STU001"
                  disabled={isLoading}
                />
                {errors.enrollmentNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.enrollmentNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch *
                </label>
                <input
                  type="text"
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                    errors.batch ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="2024-2026"
                  disabled={isLoading}
                />
                {errors.batch && <p className="text-red-500 text-xs mt-1">{errors.batch}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="9876543210"
                  disabled={isLoading}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="Enter address"
                  rows={2}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="student@skillauro.com"
                disabled={isLoading}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enrollment Number *
              </label>
              <input
                type="text"
                name="enrollmentNumber"
                value={formData.enrollmentNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.enrollmentNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="STU001"
                disabled={isLoading}
              />
              {errors.enrollmentNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.enrollmentNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch *
              </label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.batch ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="2024-2026"
                disabled={isLoading}
              />
              {errors.batch && <p className="text-red-500 text-xs mt-1">{errors.batch}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="9876543210"
                disabled={isLoading}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Enter address"
                rows={2}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Minimum 8 characters"
                disabled={isLoading}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Re-enter password"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Student'}
              </button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
