'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, DollarSign, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DashboardStats {
  totalFaculties: number;
  totalStudents: number;
  activeCourses: number;
  totalFeesCollected: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalFaculties: 0,
    totalStudents: 0,
    activeCourses: 0,
    totalFeesCollected: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('[v0] Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const displayStats = [
    {
      icon: Users,
      label: 'Total Faculties',
      value: stats.totalFaculties.toString(),
      color: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      icon: Users,
      label: 'Total Students',
      value: stats.totalStudents.toString(),
      color: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      icon: BookOpen,
      label: 'Active Courses',
      value: stats.activeCourses.toString(),
      color: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      icon: DollarSign,
      label: 'Total Fees Collected',
      value: `₹${stats.totalFeesCollected.toLocaleString()}`,
      color: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
  ];

  const recentActivities: any[] = [];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
            {recentActivities.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No recent activities. Start by adding faculty or students.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border-l-4 border-blue-600"
                  >
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{activity.activity}</p>
                      <p className="text-sm text-gray-600">
                        {activity.user && `${activity.user} - `}
                        {activity.course && `${activity.course}`}
                        {activity.amount && `${activity.amount}`}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Button
                onClick={() => router.push('/admin/faculties')}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Add Faculty
              </Button>
              <Button
                onClick={() => router.push('/admin/students')}
                className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                Add Student
              </Button>
              <Button
                onClick={() => router.push('/admin/courses')}
                className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Manage Courses
              </Button>
              <Button
                onClick={() => router.push('/admin/reports')}
                className="w-full px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
              >
                View Reports
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
