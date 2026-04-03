import React from 'react';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  TrendingUp,
  Award,
  BookOpen,
  Calculator
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { MOCK_STUDENTS, MOCK_GRADES } from '../mockData';
import { cn } from '../lib/utils';

export const Grades: React.FC = () => {
  const [selectedClass, setSelectedClass] = React.useState('JSS1');
  const [selectedSubject, setSelectedSubject] = React.useState('Mathematics');

  return (
    <div className="space-y-8">
      {/* Grading Header */}
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
          <select 
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Mathematics</option>
            <option>English Language</option>
            <option>Basic Science</option>
            <option>Social Studies</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calculator className="h-4 w-4" />
            Compute Finals
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Report Cards
          </Button>
        </div>
      </div>

      {/* Grading Table */}
      <Card className="p-0 overflow-hidden" title="Grade Entry" description="Enter scores for continuous assessment and exams">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">CA (20%)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Assign (10%)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Mid (20%)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Exam (50%)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_STUDENTS.filter(s => s.class === selectedClass).map((student) => {
                const grade = MOCK_GRADES.find(g => g.studentId === student.id && g.subject === selectedSubject);
                return (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {student.fullName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <p className="text-sm font-semibold text-slate-900">{student.fullName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input type="number" defaultValue={grade?.ca} className="w-16 px-2 py-1 rounded border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    </td>
                    <td className="px-6 py-4">
                      <input type="number" defaultValue={grade?.assignment} className="w-16 px-2 py-1 rounded border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    </td>
                    <td className="px-6 py-4">
                      <input type="number" defaultValue={grade?.midTerm} className="w-16 px-2 py-1 rounded border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    </td>
                    <td className="px-6 py-4">
                      <input type="number" defaultValue={grade?.exam} className="w-16 px-2 py-1 rounded border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-900">{grade?.total || 0}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-bold",
                        (grade?.total || 0) >= 70 ? "bg-green-100 text-green-700" :
                        (grade?.total || 0) >= 50 ? "bg-blue-100 text-blue-700" :
                        "bg-red-100 text-red-700"
                      )}>
                        {grade?.grade || 'F9'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <Button>Save All Grades</Button>
        </div>
      </Card>

      {/* Grade Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Class Average" description="Subject performance overview">
          <div className="flex items-center justify-center py-8">
            <div className="relative h-48 w-48">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  className="stroke-slate-100"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="stroke-blue-600"
                  strokeWidth="3"
                  strokeDasharray="78, 100"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900">78%</span>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Average</span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Top Performers" description="Highest scores in this subject">
          <div className="space-y-4 mt-4">
            {MOCK_STUDENTS.slice(0, 3).map((student, idx) => (
              <div key={student.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs",
                    idx === 0 ? "bg-amber-100 text-amber-600" :
                    idx === 1 ? "bg-slate-200 text-slate-600" :
                    "bg-orange-100 text-orange-600"
                  )}>
                    #{idx + 1}
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{student.fullName}</p>
                </div>
                <p className="text-sm font-black text-blue-600">92%</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
