import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { BookOpen, Phone, Mail, UserCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { cn } from '../lib/utils';
import { useFirebase } from '../contexts/FirebaseContext';

export const Login: React.FC = () => {
  const [method, setMethod] = React.useState<'email' | 'phone' | 'studentId'>('email');
  const [consent, setConsent] = React.useState(false);
  const { user, signIn } = useFirebase();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    await signIn();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex bg-blue-600 p-3 rounded-2xl shadow-lg mb-4">
            <BookOpen className="text-white h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome to EDU</h1>
          <p className="text-slate-500 mt-2">Centralized School Management Platform</p>
        </div>

        <Card className="p-8">
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => setMethod('email')}
              className={cn(
                "p-3 rounded-xl border-2 transition-all",
                method === 'email' ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 text-slate-400"
              )}
            >
              <Mail className="h-6 w-6" />
            </button>
            <button 
              onClick={() => setMethod('phone')}
              className={cn(
                "p-3 rounded-xl border-2 transition-all",
                method === 'phone' ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 text-slate-400"
              )}
            >
              <Phone className="h-6 w-6" />
            </button>
            <button 
              onClick={() => setMethod('studentId')}
              className={cn(
                "p-3 rounded-xl border-2 transition-all",
                method === 'studentId' ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 text-slate-400"
              )}
            >
              <UserCircle className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {method === 'email' ? 'Email Address' : method === 'phone' ? 'Phone Number' : 'Student ID'}
              </label>
              <input 
                type={method === 'email' ? 'email' : 'text'}
                placeholder={method === 'email' ? 'admin@school.com' : method === 'phone' ? '+234...' : 'STU-12345'}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input 
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Login as</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="admin">Administrator</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="consent" className="text-xs text-slate-500 leading-relaxed">
                I consent to the processing of my data as outlined in the 
                <a href="#" className="text-blue-600 hover:underline mx-1">Terms of Service</a> 
                and 
                <a href="#" className="text-blue-600 hover:underline ml-1">Privacy Policy</a>.
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full py-6 text-lg" 
              disabled={!consent}
            >
              Sign In
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-slate-500">
          Don't have an account? <a href="#" className="text-blue-600 font-semibold hover:underline">Contact Admin</a>
        </p>
      </div>
    </div>
  );
};
