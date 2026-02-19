'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [role, setRole] = useState<'admin' | 'faculty' | 'student'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password, role);
      
      // Redirect to appropriate dashboard
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else if (role === 'faculty') {
        router.push('/faculty/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const quickFill = (credRole: 'admin' | 'faculty' | 'student') => {
    setRole(credRole);
    if (credRole === 'admin') {
      setEmail('skillauro@gmail.com');
      setPassword('Skillauro@2026');
    } else if (credRole === 'faculty') {
      setEmail('faculty1@skillauro.com');
      setPassword('Faculty@123');
    } else {
      setEmail('student1@skillauro.com');
      setPassword('Student@123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Skillauro
              </span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
          <p className="text-gray-600">Access your Skillauro account</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 shadow-xl border-0">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['admin', 'faculty', 'student'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      role === r
                        ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                required
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:shadow-lg text-white font-semibold py-2.5 rounded-lg"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 font-semibold mb-4">Demo Credentials:</p>
            <div className="space-y-2">
              {[
                {
                  role: 'admin' as const,
                  email: 'skillauro@gmail.com',
                  password: 'Skillauro@2026',
                  label: 'Admin Account',
                },
                {
                  role: 'faculty' as const,
                  email: 'faculty1@skillauro.com',
                  password: 'Faculty@123',
                  label: 'Faculty Account',
                },
                {
                  role: 'student' as const,
                  email: 'student1@skillauro.com',
                  password: 'Student@123',
                  label: 'Student Account',
                },
              ].map((cred) => (
                <button
                  key={cred.role}
                  type="button"
                  onClick={() => quickFill(cred.role)}
                  className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
                >
                  <div className="font-medium text-gray-900">{cred.label}</div>
                  <div className="text-xs text-gray-600">{cred.email}</div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Go back to{' '}
            <Link href="/" className="text-blue-600 font-semibold hover:underline">
              home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
