'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  LayoutDashboard,
  BookOpen,
  Video,
  ClipboardList,
  TestTube,
  Bell,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', href: '/faculty/dashboard', icon: LayoutDashboard },
  { label: 'My Courses', href: '/faculty/courses', icon: BookOpen },
  { label: 'Online Classes', href: '/faculty/classes', icon: Video },
  { label: 'Attendance', href: '/faculty/attendance', icon: ClipboardList },
  { label: 'Assessments', href: '/faculty/assessments', icon: TestTube },
  { label: 'Notifications', href: '/faculty/notifications', icon: Bell },
];

export function FacultySidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white transform transition-transform duration-300 lg:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center font-bold text-white">
              S
            </div>
            <div>
              <div className="font-bold text-lg">Skillauro</div>
              <div className="text-xs text-slate-400">Faculty</div>
            </div>
          </div>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-green-600 to-teal-500 font-semibold'
                    : 'hover:bg-slate-700 text-slate-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-all font-semibold"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
