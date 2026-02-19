'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Bell, BookOpen, DollarSign, Trash2 } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    title: 'Fee Payment Reminder',
    message: 'Your pending fees for Node.js Backend course need to be paid by Feb 28, 2024',
    type: 'fee_alert',
    timestamp: '2 hours ago',
    isRead: false,
  },
  {
    id: 2,
    title: 'Class Rescheduled',
    message: 'Your Web Development Mastery class has been rescheduled to 3:00 PM today',
    type: 'class_update',
    timestamp: '5 hours ago',
    isRead: false,
  },
  {
    id: 3,
    title: 'Exam Schedule Announced',
    message: 'React Advanced exam will be held on February 20, 2024 from 10:00 AM to 12:00 PM',
    type: 'exam_alert',
    timestamp: '1 day ago',
    isRead: true,
  },
  {
    id: 4,
    title: 'New Course Materials Available',
    message: 'Check your Web Development course for newly uploaded materials and lecture notes',
    type: 'announcement',
    timestamp: '2 days ago',
    isRead: true,
  },
  {
    id: 5,
    title: 'Assessment Deadline',
    message: 'Remember to submit your React Hooks Project by February 15, 2024',
    type: 'exam_alert',
    timestamp: '3 days ago',
    isRead: true,
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'fee_alert':
      return <DollarSign className="h-5 w-5 text-orange-600" />;
    case 'class_update':
      return <BookOpen className="h-5 w-5 text-blue-600" />;
    case 'exam_alert':
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    default:
      return <Bell className="h-5 w-5 text-purple-600" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'fee_alert':
      return 'bg-orange-50 border-orange-200';
    case 'class_update':
      return 'bg-blue-50 border-blue-200';
    case 'exam_alert':
      return 'bg-red-50 border-red-200';
    default:
      return 'bg-purple-50 border-purple-200';
  }
};

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'read') return n.isRead;
    return true;
  });

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">
            Stay updated with class schedules, announcements, and alerts
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-semibold">
            {unreadCount} Unread
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filter === 'unread'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Unread
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filter === 'read'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`border-l-4 ${getTypeColor(notification.type)} ${
                !notification.isRead ? 'font-semibold' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {notification.title}
                    </h3>
                    <p className="text-gray-700 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 text-lg">No notifications yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
