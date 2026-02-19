'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Video } from 'lucide-react';

const liveClasses = [
  {
    id: 1,
    course: 'Web Development Mastery',
    faculty: 'Dr. Raj Kumar',
    date: '2024-02-08',
    time: '2:00 PM - 4:00 PM',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    status: 'Upcoming',
  },
  {
    id: 2,
    course: 'React Advanced',
    date: '2024-02-09',
    time: '10:00 AM - 12:00 PM',
    faculty: 'Ms. Priya Verma',
    meetLink: 'https://meet.google.com/xyz-uvwx-yza',
    status: 'Upcoming',
  },
];

const pastClasses = [
  {
    id: 3,
    course: 'Web Development Mastery',
    date: '2024-02-06',
    time: '2:00 PM - 4:00 PM',
    recording: 'https://youtube.com/watch?v=example',
    status: 'Completed',
  },
  {
    id: 4,
    course: 'React Advanced',
    date: '2024-02-05',
    time: '10:00 AM - 12:00 PM',
    recording: 'https://youtube.com/watch?v=example2',
    status: 'Completed',
  },
];

export default function StudentClassesPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Live Classes</h1>
        <p className="text-gray-600">Join your online classes and view recordings</p>
      </div>

      {/* Upcoming Classes */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Classes</h2>
        <div className="space-y-4">
          {liveClasses.map((cls) => (
            <Card key={cls.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {cls.course}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">Instructor: {cls.faculty}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {cls.date} • {cls.time}
                      </div>
                    </div>

                    <a
                      href={cls.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                    >
                      <MapPin className="h-3 w-3" />
                      Google Meet Link
                    </a>
                  </div>

                  <Button className="ml-4 bg-green-600 hover:bg-green-700 flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Join Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Past Classes / Recordings */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Past Classes (Recordings)</h2>
        <div className="space-y-4">
          {pastClasses.map((cls) => (
            <Card key={cls.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {cls.course}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {cls.date} • {cls.time}
                    </div>

                    <a
                      href={cls.recording}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                    >
                      <Video className="h-4 w-4" />
                      Watch Recording
                    </a>
                  </div>

                  <span className="ml-4 px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-semibold">
                    Completed
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
