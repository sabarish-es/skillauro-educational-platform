'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Video, Plus, Clock, Users, Link as LinkIcon, Trash2 } from 'lucide-react';

const classesList = [
  {
    id: 1,
    course: 'Web Development Mastery',
    date: '2024-02-08',
    time: '2:00 PM - 4:00 PM',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    status: 'Scheduled',
    students: 25,
  },
  {
    id: 2,
    course: 'React Advanced',
    date: '2024-02-09',
    time: '10:00 AM - 12:00 PM',
    meetLink: 'https://meet.google.com/xyz-uvwx-yza',
    status: 'Scheduled',
    students: 18,
  },
  {
    id: 3,
    course: 'Web Development Mastery',
    date: '2024-02-06',
    time: '2:00 PM - 4:00 PM',
    meetLink: 'https://meet.google.com/old-class-link',
    recording: 'Recording available',
    status: 'Completed',
    students: 24,
  },
];

export default function FacultyClassesPage() {
  const [classes, setClasses] = useState(classesList);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    course: '',
    date: '',
    time: '',
    meetLink: '',
  });

  const handleAddClass = () => {
    if (formData.course && formData.date && formData.time && formData.meetLink) {
      setClasses([
        {
          id: classes.length + 1,
          course: formData.course,
          date: formData.date,
          time: formData.time,
          meetLink: formData.meetLink,
          status: 'Scheduled',
          students: 0,
        },
        ...classes,
      ]);
      setFormData({ course: '', date: '', time: '', meetLink: '' });
      setIsOpen(false);
    }
  };

  const handleDelete = (id: number) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Online Classes</h1>
          <p className="text-gray-600">Schedule and manage your online classes</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-green-600 to-teal-500 hover:shadow-lg">
              <Plus className="h-4 w-4" />
              Schedule Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Class</DialogTitle>
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
                  <option value="Web Development Mastery">Web Development Mastery</option>
                  <option value="React Advanced">React Advanced</option>
                  <option value="Node.js Backend">Node.js Backend</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Time</label>
                <Input
                  placeholder="2:00 PM - 4:00 PM"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Google Meet Link</label>
                <Input
                  placeholder="https://meet.google.com/..."
                  value={formData.meetLink}
                  onChange={(e) =>
                    setFormData({ ...formData, meetLink: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    setFormData({ course: '', date: '', time: '', meetLink: '' });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddClass}
                  className="bg-gradient-to-r from-green-600 to-teal-500"
                >
                  Schedule
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Classes List */}
      <div className="space-y-4">
        {classes.map((cls) => (
          <Card key={cls.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {cls.course}
                  </h3>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        {cls.date} • {cls.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{cls.students} students</span>
                    </div>
                    <div>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          cls.status === 'Completed'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {cls.status}
                      </span>
                    </div>
                  </div>

                  {cls.recording && (
                    <p className="text-sm text-green-700 mb-3">
                      ✓ {cls.recording}
                    </p>
                  )}

                  <a
                    href={cls.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                  >
                    <LinkIcon className="h-3 w-3" />
                    {cls.meetLink}
                  </a>
                </div>

                <div className="flex gap-2 ml-4">
                  {cls.status === 'Scheduled' && (
                    <Button className="bg-green-600 hover:bg-green-700" size="sm">
                      <Video className="h-4 w-4 mr-1" />
                      Start Class
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(cls.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
