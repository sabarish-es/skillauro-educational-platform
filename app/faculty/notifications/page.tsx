'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Send, Trash2 } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    title: 'Class Rescheduled',
    message: 'Web Development class has been rescheduled to 3:00 PM',
    course: 'Web Development Mastery',
    sentDate: '2024-02-05',
    recipients: 25,
  },
  {
    id: 2,
    title: 'Exam Schedule Announced',
    message: 'React Advanced exam will be held on February 20, 2024',
    course: 'React Advanced',
    sentDate: '2024-02-03',
    recipients: 18,
  },
];

export default function FacultyNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    course: '',
  });

  const handleSendNotification = () => {
    if (formData.title && formData.message && formData.course) {
      setNotifications([
        {
          id: notifications.length + 1,
          title: formData.title,
          message: formData.message,
          course: formData.course,
          sentDate: new Date().toISOString().split('T')[0],
          recipients: 0,
        },
        ...notifications,
      ]);
      setFormData({ title: '', message: '', course: '' });
      setIsOpen(false);
    }
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600">Send announcements to your course students</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-green-600 to-teal-500 hover:shadow-lg">
              <Send className="h-4 w-4" />
              Send Announcement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Course</label>
                <select
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select a course</option>
                  <option value="Web Development">Web Development Mastery</option>
                  <option value="React">React Advanced</option>
                  <option value="Node.js">Node.js Backend</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Title</label>
                <Input
                  placeholder="Announcement title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <Textarea
                  placeholder="Your announcement message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    setFormData({ title: '', message: '', course: '' });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendNotification}
                  className="bg-gradient-to-r from-green-600 to-teal-500"
                >
                  Send
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {notification.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{notification.message}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>Course: {notification.course}</span>
                    <span>Sent: {notification.sentDate}</span>
                    <span>Recipients: {notification.recipients}</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(notification.id)}
                  className="text-red-600 hover:text-red-700 ml-4"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
