'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Eye, EyeOff } from 'lucide-react';
import { PasswordToggle } from '@/components/auth/password-toggle';

interface FacultyFormProps {
  onClose: () => void;
  onSubmit: (data: FacultyData) => void;
  isLoading?: boolean;
}

export interface FacultyData {
  name: string;
  email: string;
  department: string;
  specialization: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

type FormStep = 'basic' | 'verification' | 'password';

export function FacultyForm({ onClose, onSubmit, isLoading = false }: FacultyFormProps) {
  const [step, setStep] = useState<FormStep>('basic');
  const [formData, setFormData] = useState<FacultyData>({
    name: '',
    email: '',
    department: '',
    specialization: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

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

  const validateBasicInfo = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'Confirm password is required';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOtp = async () => {
    if (!validateBasicInfo()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/auth/send-verification-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setOtpSent(true);
        setStep('verification');
      } else {
        const error = await response.json();
        setErrors({ submit: error.error || 'Failed to send OTP' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setErrors({ otp: 'OTP is required' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/verify-email-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      if (response.ok) {
        setStep('password');
        setErrors({});
      } else {
        const error = await response.json();
        setErrors({ otp: error.error || 'Invalid or expired OTP' });
      }
    } catch (error) {
      setErrors({ otp: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const submitForm = async () => {
    if (!validatePassword()) return;

    try {
      const response = await fetch('/api/admin/faculty/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSubmit(formData);
        setFormData({
          name: '',
          email: '',
          department: '',
          specialization: '',
          phone: '',
          address: '',
          password: '',
          confirmPassword: '',
        });
        setOtp('');
        setOtpSent(false);
        setStep('basic');
      } else {
        const error = await response.json();
        setErrors({ submit: error.message || 'Failed to add faculty' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-2xl my-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Add Faculty</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-6 flex gap-2">
            <div className={`flex-1 h-2 rounded-full ${step === 'basic' || step === 'verification' || step === 'password' ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 h-2 rounded-full ${step === 'verification' || step === 'password' ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 h-2 rounded-full ${step === 'password' ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          </div>

          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errors.submit}
            </div>
          )}

          {step === 'basic' && (
            <form onSubmit={(e) => { e.preventDefault(); sendOtp(); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Dr. John Doe"
                    disabled={loading}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="faculty@skillauro.com"
                    disabled={loading}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="9876543210"
                    disabled={loading}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Computer Science"
                    disabled={loading}
                  />
                  {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.specialization ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Web Development"
                    disabled={loading}
                  />
                  {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter address"
                    rows={2}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50" disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
                  {loading ? 'Sending OTP...' : 'Send OTP to Email'}
                </button>
              </div>
            </form>
          )}

          {step === 'verification' && (
            <form onSubmit={(e) => { e.preventDefault(); verifyOtp(); }} className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">We sent a verification code to <strong>{formData.email}</strong></p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OTP Code *</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    if (errors.otp) setErrors((prev) => ({ ...prev, otp: '' }));
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm tracking-widest text-center text-lg font-mono ${errors.otp ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="000000"
                  maxLength={6}
                  disabled={loading}
                />
                {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                <p className="text-xs text-gray-500 mt-1">Enter the 6-digit code sent to your email</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setStep('basic')} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50" disabled={loading}>
                  Back
                </button>
                <button type="button" onClick={verifyOtp} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={(e) => { e.preventDefault(); submitForm(); }} className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">Email verified! Now set your password.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <PasswordToggle
                  value={formData.password}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, password: e.target.value }));
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                  placeholder="Minimum 8 characters"
                  className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={loading}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                <PasswordToggle
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }));
                    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                  }}
                  placeholder="Re-enter password"
                  className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={loading}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setStep('verification')} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50" disabled={loading}>
                  Back
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Faculty'}
                </button>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
}
