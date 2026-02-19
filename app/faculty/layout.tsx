'use client';

import React from "react"

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FacultySidebar } from '@/components/faculty/sidebar';
import { FacultyTopbar } from '@/components/faculty/topbar';

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'faculty')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || user.role !== 'faculty') {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <FacultySidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <FacultyTopbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
