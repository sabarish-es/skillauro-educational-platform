'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bell, Send, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  recipient: string;
  date: string;
  status: 'Sent' | 'Draft';
}

export default function NotificationsPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Course Available',
      message: 'Advanced JavaScript course is now available for enrollment',
      recipient: 'All Students',
      date: '2024-01-20',
      status: 'Sent',
    },
    {
      id: '2',
      title: 'Fees Payment Reminder',
      message: 'Please complete your fees payment for this semester',
      recipient: 'Students with Pending Fees',
      date: '2024-01-18',
      status: 'Sent',
    },
    {
      id: '3',
      title: 'Faculty Meeting',
      message: 'Mandatory faculty meeting on January 25 at 3 PM',
      recipient: 'All Faculty',
      date: '2024-01-15',
      status: 'Sent',
    },
  ]);

  const handleSend = () => {
    if (title.trim() && message.trim()) {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title,
        message,
        recipient: recipient === 'all' ? 'All Users' : recipient,
        date: new Date().toISOString().split('T')[0],
        status: 'Sent',
      };
      setNotifications([newNotification, ...notifications]);
      setTitle('');
      setMessage('');
      setRecipient('all');
    }
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Send Notifications</h1>

      {/* Send Notification Form */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Notification</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              placeholder="Notification title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <Textarea
              placeholder="Write your notification message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none min-h-[120px]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Send To</label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
            >
              <option value="all">All Users</option>
              <option value="faculty">All Faculty</option>
              <option value="students">All Students</option>
              <option value="pending-fees">Students with Pending Fees</option>
            </select>
          </div>

          <Button
            onClick={handleSend}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2"
          >
            <Send className="h-4 w-4" />
            Send Notification
          </Button>
        </div>
      </Card>

      {/* Sent Notifications */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Notification History</h2>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-4 p-4 rounded-lg border-l-4 border-blue-600 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">{notification.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>To: {notification.recipient}</span>
                  <span>{notification.date}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded font-medium">
                    {notification.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(notification.id)}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
