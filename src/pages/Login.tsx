import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { BookOpen, Phone, Mail, UserCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { cn } from '../lib/utils';
import { useFirebase } from '../contexts/FirebaseContext';

export const Login: React.FC = () => {
  const [method, setMethod] = React.useState<'email' | 'phone' | 'studentId'>('email');
  const [consent, setConsent] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);
  const { user, signInWithEmail, signInWithGoogle, authError, clearError } = useFirebase();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setIsLoading(true);
    await signInWithEmail(email, password);
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    if (!consent) return;
    setIsLoading(true);
    await signInWithGoogle();
    setIsLoading(false);
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
              onClick={() => { setMethod('email'); clearError(); }}
              className={cn(
                "p-3 rounded-xl border-2 transition-all",
                method === 'email' ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 text-slate-400"
              )}
            >
              <Mail className="h-6 w-6" />
            </button>
            <button 
              onClick={() => { setMethod('phone'); clearError(); }}
              className={cn(
                "p-3 rounded-xl border-2 transition-all",
                method === 'phone' ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 text-slate-400"
              )}
            >
              <Phone className="h-6 w-6" />
            </button>
            <button 
              onClick={() => { setMethod('studentId'); clearError(); }}
              className={cn(
                "p-3 rounded-xl border-2 transition-all",
                method === 'studentId' ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 text-slate-400"
              )}
            >
              <UserCircle className="h-6 w-6" />
            </button>
          </div>

          {/* Error message */}
          {authError && (
            <div className="flex items-center gap-3 p-3 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {method === 'email' ? 'Email Address' : method === 'phone' ? 'Phone Number' : 'Student ID'}
              </label>
              <input 
                type={method === 'email' ? 'email' : 'text'}
                placeholder={method === 'email' ? 'admin@school.com' : method === 'phone' ? '+234...' : 'STU-12345'}
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input 
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError(); }}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
                minLength={6}
              />
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
              disabled={!consent || isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-medium">or</span>
            </div>
          </div>

          {/* Google Sign-In */}
          <Button
            type="button"
            variant="outline"
            className="w-full py-5 gap-3 text-sm font-medium"
            onClick={handleGoogleLogin}
            disabled={!consent || isLoading}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </Button>
        </Card>

        <p className="text-center text-sm text-slate-500">
          Don't have an account? <a href="#" className="text-blue-600 font-semibold hover:underline">Contact Admin</a>
        </p>
      </div>
    </div>
  );
};
