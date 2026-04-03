import React, { useEffect, useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { MOCK_STUDENTS, MOCK_GRADES, MOCK_PREDICTIONS } from '../mockData';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Student } from '../types';

const data = [
  { name: 'Term 1', avg: 72 },
  { name: 'Term 2', avg: 78 },
  { name: 'Term 3', avg: 85 },
];

const attendanceData = [
  { name: 'Mon', present: 95 },
  { name: 'Tue', present: 92 },
  { name: 'Wed', present: 88 },
  { name: 'Thu', present: 94 },
  { name: 'Fri', present: 90 },
];

export const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const atRiskCount = MOCK_PREDICTIONS.filter(p => p.riskLevel !== 'on-track').length;

  useEffect(() => {
    const q = query(collection(db, 'students'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const studentData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Student[];
      setStudents(studentData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'students');
    });

    return () => unsubscribe();
  }, []);

  const totalStudents = students.length || MOCK_STUDENTS.length;

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value={totalStudents.toString()} 
          icon={Users} 
          trend="+2.5%" 
          color="blue" 
        />
        <StatCard 
          title="Avg. Performance" 
          value="78%" 
          icon={GraduationCap} 
          trend="+5.2%" 
          color="green" 
        />
        <StatCard 
          title="Daily Attendance" 
          value="92%" 
          icon={UserCheck} 
          trend="-1.2%" 
          color="purple" 
        />
        <StatCard 
          title="Fees Collected" 
          value="₦4.2M" 
          icon={CreditCard} 
          trend="+12%" 
          color="orange" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Chart */}
        <Card title="Academic Performance Trend" description="Average score across all subjects over terms">
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="avg" 
                  stroke="#2563eb" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Attendance Chart */}
        <Card title="Weekly Attendance" description="Percentage of students present daily">
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="present" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* AI Insights & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card 
          title="AI Performance Insights" 
          className="lg:col-span-2"
          description="Machine learning predictions for student outcomes"
        >
          <div className="space-y-4 mt-4">
            {MOCK_PREDICTIONS.map((prediction, idx) => {
              const student = MOCK_STUDENTS.find(s => s.id === prediction.studentId);
              return (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-2 rounded-lg",
                      prediction.riskLevel === 'on-track' ? "bg-green-100 text-green-600" :
                      prediction.riskLevel === 'at-risk' ? "bg-amber-100 text-amber-600" :
                      "bg-red-100 text-red-600"
                    )}>
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{student?.fullName}</p>
                      <p className="text-xs text-slate-500">Predicted Grade: {prediction.predictedGrade}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                      prediction.riskLevel === 'on-track' ? "bg-green-500 text-white" :
                      prediction.riskLevel === 'at-risk' ? "bg-amber-500 text-white" :
                      "bg-red-500 text-white"
                    )}>
                      {prediction.riskLevel.replace('-', ' ')}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">Confidence: {(prediction.confidence * 100).toFixed(0)}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Recent Alerts" description="System notifications and urgent updates">
          <div className="space-y-4 mt-4">
            <AlertItem 
              icon={AlertTriangle} 
              color="red" 
              title="Critical Attendance" 
              desc="5 students below 60% attendance" 
              time="2h ago" 
            />
            <AlertItem 
              icon={Clock} 
              color="amber" 
              title="Fee Deadline" 
              desc="Term 2 fee deadline in 3 days" 
              time="5h ago" 
            />
            <AlertItem 
              icon={CheckCircle2} 
              color="green" 
              title="Grades Published" 
              desc="JSS1 Math results are now live" 
              time="1d ago" 
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-xl", colors[color])}>
          <Icon className="h-6 w-6" />
        </div>
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded-full",
          trend.startsWith('+') ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        )}>
          {trend}
        </span>
      </div>
      <h4 className="text-slate-500 text-sm font-medium">{title}</h4>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </motion.div>
  );
};

const AlertItem = ({ icon: Icon, color, title, desc, time }: any) => {
  const colors: any = {
    red: 'bg-red-50 text-red-600',
    amber: 'bg-amber-50 text-amber-600',
    green: 'bg-green-50 text-green-600',
  };

  return (
    <div className="flex gap-4">
      <div className={cn("h-10 w-10 shrink-0 rounded-full flex items-center justify-center", colors[color])}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-900 truncate">{title}</p>
        <p className="text-xs text-slate-500 line-clamp-1">{desc}</p>
        <p className="text-[10px] text-slate-400 mt-1">{time}</p>
      </div>
    </div>
  );
};
