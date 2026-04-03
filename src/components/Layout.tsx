import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Calendar, 
  CreditCard, 
  Settings, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  BookOpen,
  UserCheck,
  TrendingUp
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './common/Button';
import { useFirebase } from '../contexts/FirebaseContext';

interface LayoutProps {
  children: React.ReactNode;
  userRole: 'admin' | 'teacher' | 'parent' | 'student';
}

export const Layout: React.FC<LayoutProps> = ({ children, userRole }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const { userProfile, logout } = useFirebase();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', roles: ['admin', 'teacher', 'parent', 'student'] },
    { icon: Users, label: 'Students', path: '/students', roles: ['admin', 'teacher'] },
    { icon: GraduationCap, label: 'Grades', path: '/grades', roles: ['admin', 'teacher', 'parent', 'student'] },
    { icon: UserCheck, label: 'Attendance', path: '/attendance', roles: ['admin', 'teacher', 'parent'] },
    { icon: CreditCard, label: 'Fees', path: '/fees', roles: ['admin', 'parent'] },
    { icon: Calendar, label: 'Timetable', path: '/timetable', roles: ['admin', 'teacher', 'parent', 'student'] },
    { icon: TrendingUp, label: 'AI Prediction', path: '/ai-prediction', roles: ['admin', 'teacher', 'parent'] },
    { icon: Bell, label: 'Notifications', path: '/notifications', roles: ['admin', 'teacher', 'parent', 'student'] },
    { icon: Settings, label: 'Settings', path: '/settings', roles: ['admin'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(userRole));

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full lg:hidden"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="text-white h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">EDU App</h1>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {filteredMenu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.path 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-slate-600"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h2 className="text-lg font-semibold text-slate-800">
              {filteredMenu.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{userProfile?.fullName || 'User'}</p>
              <p className="text-xs text-slate-500 capitalize">{userRole}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {userProfile?.fullName?.split(' ').map(n => n[0]).join('') || 'U'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
