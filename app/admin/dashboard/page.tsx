'use client';

import { Card } from '@/components/ui/card';
import { Users, BookOpen, DollarSign, AlertCircle } from 'lucide-react';

const stats = [
  {
    icon: Users,
    label: 'Total Faculties',
    value: '12',
    color: 'bg-blue-100',
    textColor: 'text-blue-600',
  },
  {
    icon: Users,
    label: 'Total Students',
    value: '342',
    color: 'bg-green-100',
    textColor: 'text-green-600',
  },
  {
    icon: BookOpen,
    label: 'Active Courses',
    value: '28',
    color: 'bg-purple-100',
    textColor: 'text-purple-600',
  },
  {
    icon: DollarSign,
    label: 'Total Fees Collected',
    value: '₹5.2L',
    color: 'bg-orange-100',
    textColor: 'text-orange-600',
  },
];

const recentActivities = [
  {
    id: 1,
    activity: 'New student enrolled',
    user: 'Priya Singh',
    course: 'Web Development',
    time: '2 hours ago',
  },
  {
    id: 2,
    activity: 'Fee payment received',
    user: 'Arjun Kumar',
    amount: '₹50,000',
    time: '4 hours ago',
  },
  {
    id: 3,
    activity: 'Faculty assignment',
    user: 'Dr. Meera Gupta',
    course: 'Python Data Science',
    time: '1 day ago',
  },
  {
    id: 4,
    activity: 'New course created',
    course: 'Cloud Computing',
    status: 'Pending Approval',
    time: '2 days ago',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
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
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Add Faculty
              </button>
              <button className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                Add Student
              </button>
              <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                Create Course
              </button>
              <button className="w-full px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                View Reports
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
