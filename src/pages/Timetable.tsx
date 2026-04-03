import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { cn } from '../lib/utils';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const PERIODS = [
  { id: 1, time: '08:00 - 08:40' },
  { id: 2, time: '08:40 - 09:20' },
  { id: 3, time: '09:20 - 10:00' },
  { id: 4, time: '10:30 - 11:10' },
  { id: 5, time: '11:10 - 11:50' },
  { id: 6, time: '11:50 - 12:30' },
];

const SUBJECTS = [
  { name: 'Mathematics', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'English', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { name: 'Science', color: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'Social Studies', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { name: 'Physical Ed', color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'Fine Arts', color: 'bg-pink-100 text-pink-700 border-pink-200' },
];

export const Timetable: React.FC = () => {
  const [selectedClass, setSelectedClass] = React.useState('JSS1');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>JSS1</option>
            <option>JSS2</option>
            <option>JSS3</option>
          </select>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronLeft className="h-4 w-4" /></Button>
            <span className="text-xs font-bold text-slate-600">Current Week</span>
            <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            PDF
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-32">Time</th>
                {DAYS.map(day => (
                  <th key={day} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center border-l border-slate-100">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PERIODS.map((period) => (
                <tr key={period.id}>
                  <td className="px-6 py-8 text-center bg-slate-50/30">
                    <p className="text-xs font-bold text-slate-900">Period {period.id}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{period.time}</p>
                  </td>
                  {DAYS.map(day => {
                    // Randomly assign subjects for mock
                    const subjectIdx = (period.id + day.length) % SUBJECTS.length;
                    const subject = SUBJECTS[subjectIdx];
                    return (
                      <td key={day} className="p-2 border-l border-slate-100 min-w-[160px]">
                        <div className={cn(
                          "p-3 rounded-xl border h-full transition-all hover:shadow-md cursor-pointer",
                          subject.color
                        )}>
                          <p className="text-sm font-bold truncate">{subject.name}</p>
                          <div className="mt-2 flex items-center gap-1.5 opacity-80">
                            <Clock className="h-3 w-3" />
                            <span className="text-[10px] font-medium">40 mins</span>
                          </div>
                          <div className="mt-1 flex items-center gap-1.5 opacity-80">
                            <MapPin className="h-3 w-3" />
                            <span className="text-[10px] font-medium">Room 10{period.id}</span>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
