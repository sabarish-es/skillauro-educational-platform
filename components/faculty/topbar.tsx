'use client';

import { useAuth } from '@/lib/auth-context';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function FacultyTopbar() {
  const { user } = useAuth();

  return (
    <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">Faculty Dashboard</h1>

      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-all">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <Avatar className="h-10 w-10 bg-gradient-to-r from-green-600 to-teal-500">
            <AvatarFallback className="text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
