'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('OTP sent to your email');
        setStep('otp');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        setMessage('OTP verified. Set your new password.');
        setStep('reset');
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, password }),
      });

      if (response.ok) {
        setMessage('Password reset successfully!');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-xl border-0">
          <Link href="/login" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 mb-6 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600 mb-6">
            {step === 'email' && 'Enter your email to receive an OTP'}
            {step === 'otp' && 'Enter the OTP sent to your email'}
            {step === 'reset' && 'Set your new password'}
          </p>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {message && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">{message}</AlertDescription>
            </Alert>
          )}

          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="6-digit OTP"
                  maxLength="6"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none text-center text-2xl tracking-widest"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">OTP valid for 10 minutes</p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>

              <button
                type="button"
                onClick={() => {
                  setStep('email');
                  setOtp('');
                  setMessage('');
                }}
                className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Didn&apos;t receive OTP? Try again
              </button>
            </form>
          )}

          {step === 'reset' && (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
