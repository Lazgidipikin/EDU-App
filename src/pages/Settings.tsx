import React from 'react';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Globe, 
  Database, 
  Smartphone,
  Check
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-8">
      <Card title="General Configuration" description="Manage school branding and system-wide settings">
        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">School Name</label>
              <input type="text" defaultValue="EDU International School" className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Academic Year</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>2023/2024</option>
                <option>2024/2025</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">School Website</p>
                <p className="text-xs text-slate-500">www.eduschool.edu.ng</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
        </div>
      </Card>

      <Card title="AI Engine Settings" description="Configure the performance prediction parameters">
        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Enable AI Predictions</p>
              <p className="text-xs text-slate-500">Allow the system to forecast student outcomes</p>
            </div>
            <div className="h-6 w-11 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Attendance Threshold</p>
              <p className="text-xs text-slate-500">Minimum attendance before flagging as 'At Risk'</p>
            </div>
            <span className="text-sm font-bold text-blue-600">75%</span>
          </div>
        </div>
      </Card>

      <Card title="Security & Permissions" description="Manage user roles and data access">
        <div className="space-y-4 mt-4">
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
            <Shield className="h-5 w-5 text-slate-400" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Role Management</p>
              <p className="text-xs text-slate-500">Define permissions for Teachers, Parents, and Students</p>
            </div>
            <Check className="h-4 w-4 text-green-500" />
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
            <Database className="h-5 w-5 text-slate-400" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Data Backup</p>
              <p className="text-xs text-slate-500">Last automated backup: 2 hours ago</p>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600">Backup Now</Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Discard Changes</Button>
        <Button>Save Settings</Button>
      </div>
    </div>
  );
};
