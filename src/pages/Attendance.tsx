import React from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  Download,
  ChevronLeft,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { MOCK_STUDENTS, MOCK_ATTENDANCE } from '../mockData';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

export const AttendancePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedClass, setSelectedClass] = React.useState('JSS1');

  return (
    <div className="space-y-6">
      {/* Attendance Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-xl border border-slate-200 flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-bold min-w-[120px] text-center">
              {format(selectedDate, 'MMMM dd, yyyy')}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>JSS1</option>
            <option>JSS2</option>
            <option>JSS3</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Report
          </Button>
          <Button className="gap-2">
            <UserCheck className="h-4 w-4" />
            Mark All Present
          </Button>
        </div>
      </div>

      {/* Attendance Grid */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Reason / Note</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_STUDENTS.filter(s => s.class === selectedClass).map((student) => {
                const attendance = MOCK_ATTENDANCE.find(a => a.studentId === student.id && a.date === format(selectedDate, 'yyyy-MM-dd'));
                return (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                          {student.fullName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{student.fullName}</p>
                          <p className="text-[10px] text-slate-500">{student.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <AttendanceButton status="present" active={attendance?.status === 'present'} />
                        <AttendanceButton status="absent" active={attendance?.status === 'absent'} />
                        <AttendanceButton status="late" active={attendance?.status === 'late'} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        type="text" 
                        placeholder="Add a note..."
                        defaultValue={attendance?.reason}
                        className="text-xs bg-transparent border-none outline-none focus:ring-0 w-full text-slate-600 italic"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600 text-xs">Save</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4 p-6">
          <div className="bg-green-100 text-green-600 p-3 rounded-xl">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Present</p>
            <p className="text-2xl font-bold text-slate-900">42</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-6">
          <div className="bg-red-100 text-red-600 p-3 rounded-xl">
            <XCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Absent</p>
            <p className="text-2xl font-bold text-slate-900">3</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-6">
          <div className="bg-amber-100 text-amber-600 p-3 rounded-xl">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Late</p>
            <p className="text-2xl font-bold text-slate-900">5</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

const AttendanceButton = ({ status, active }: { status: 'present' | 'absent' | 'late', active: boolean }) => {
  const configs = {
    present: { icon: CheckCircle2, label: 'P', activeClass: 'bg-green-500 text-white border-green-500', inactiveClass: 'text-slate-400 border-slate-200 hover:border-green-300 hover:text-green-500' },
    absent: { icon: XCircle, label: 'A', activeClass: 'bg-red-500 text-white border-red-500', inactiveClass: 'text-slate-400 border-slate-200 hover:border-red-300 hover:text-red-500' },
    late: { icon: Clock, label: 'L', activeClass: 'bg-amber-500 text-white border-amber-500', inactiveClass: 'text-slate-400 border-slate-200 hover:border-amber-300 hover:text-amber-500' },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <button className={cn(
      "h-8 w-8 rounded-lg border-2 flex items-center justify-center transition-all",
      active ? config.activeClass : config.inactiveClass
    )}>
      <span className="text-xs font-bold">{config.label}</span>
    </button>
  );
};
