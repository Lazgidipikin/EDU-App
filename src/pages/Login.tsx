import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Shield, GraduationCap, Users, UserCheck } from 'lucide-react';
import { Card } from '../components/common/Card';
import { cn } from '../lib/utils';
import { useFirebase } from '../contexts/FirebaseContext';
import { UserRole } from '../types';

const roles: { role: UserRole; label: string; desc: string; icon: React.ElementType; color: string }[] = [
  { role: 'admin', label: 'Administrator', desc: 'Full access to all features', icon: Shield, color: 'blue' },
  { role: 'teacher', label: 'Teacher', desc: 'Manage students, grades & attendance', icon: GraduationCap, color: 'purple' },
  { role: 'parent', label: 'Parent', desc: 'View child fees, grades & reports', icon: Users, color: 'green' },
  { role: 'student', label: 'Student', desc: 'View your grades & timetable', icon: UserCheck, color: 'orange' },
];

const colorMap: Record<string, { bg: string; icon: string; ring: string }> = {
  blue:   { bg: 'bg-blue-50', icon: 'text-blue-600', ring: 'ring-blue-500' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', ring: 'ring-purple-500' },
  green:  { bg: 'bg-green-50', icon: 'text-green-600', ring: 'ring-green-500' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', ring: 'ring-orange-500' },
};

export const Login: React.FC = () => {
  const { setRole } = useFirebase();
  const navigate = useNavigate();

  const handleSelect = (role: UserRole) => {
    setRole(role);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <div className="inline-flex bg-blue-600 p-3 rounded-2xl shadow-lg mb-4">
            <BookOpen className="text-white h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome to EDU</h1>
          <p className="text-slate-500 mt-2">Select your role to continue</p>
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map(({ role, label, desc, icon: Icon, color }) => {
              const c = colorMap[color];
              return (
                <button
                  key={role}
                  onClick={() => handleSelect(role)}
                  className={cn(
                    "flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-100 text-left transition-all",
                    "hover:border-slate-300 hover:shadow-md hover:scale-[1.02]",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2",
                    c.ring
                  )}
                >
                  <div className={cn("p-3 rounded-xl shrink-0", c.bg, c.icon)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{label}</p>
                    <p className="text-xs text-slate-500 mt-1">{desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <p className="text-center text-xs text-slate-400">
          Each role shows a different view of the platform
        </p>
      </div>
    </div>
  );
};
