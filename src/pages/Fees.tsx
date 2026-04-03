import React from 'react';
import { 
  CreditCard, 
  History, 
  Plus, 
  Download, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowUpRight,
  Wallet
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { cn, formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

export const Fees: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'history' | 'schedule'>('overview');

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex p-1 bg-slate-100 rounded-xl w-fit">
        <button 
          onClick={() => setActiveTab('overview')}
          className={cn(
            "px-6 py-2 rounded-lg text-sm font-medium transition-all",
            activeTab === 'overview' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={cn(
            "px-6 py-2 rounded-lg text-sm font-medium transition-all",
            activeTab === 'history' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          Payment History
        </button>
        <button 
          onClick={() => setActiveTab('schedule')}
          className={cn(
            "px-6 py-2 rounded-lg text-sm font-medium transition-all",
            activeTab === 'schedule' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          Fee Schedule
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Financial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-blue-600 text-white border-none">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Collections</p>
                  <p className="text-3xl font-bold mt-1">{formatCurrency(4250000)}</p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <Wallet className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-blue-100">
                <ArrowUpRight className="h-4 w-4" />
                <span>12% increase from last term</span>
              </div>
            </Card>
            <Card>
              <p className="text-slate-500 text-sm font-medium">Pending Payments</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{formatCurrency(850000)}</p>
              <div className="mt-6 flex items-center gap-2 text-sm text-amber-600">
                <Clock className="h-4 w-4" />
                <span>15 students outstanding</span>
              </div>
            </Card>
            <Card>
              <p className="text-slate-500 text-sm font-medium">Collection Rate</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">83.3%</p>
              <div className="mt-6 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[83.3%]" />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Transactions */}
            <Card title="Recent Transactions" description="Latest fee payments across all classes">
              <div className="space-y-4 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">John Doe</p>
                        <p className="text-xs text-slate-500">Tuition Fee • JSS1 A</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{formatCurrency(150000)}</p>
                      <p className="text-[10px] text-slate-400">Mar 01, 2024</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-600">View All Transactions</Button>
            </Card>

            {/* Defaulters List */}
            <Card title="Outstanding Fees" description="Students with overdue payments">
              <div className="space-y-4 mt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-red-50 bg-red-50/30">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Jane Smith</p>
                        <p className="text-xs text-slate-500">Hostel Fee • JSS2 B</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-red-600">{formatCurrency(45000)}</p>
                      <Button size="sm" variant="outline" className="mt-1 h-7 text-[10px]">Send Reminder</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <Card title="Fee Schedule - Term 1 2023/2024" description="Manage fee items and amounts per class">
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeeScheduleItem title="Tuition Fee" amount={150000} category="tuition" />
              <FeeScheduleItem title="Hostel Fee" amount={75000} category="hostel" />
              <FeeScheduleItem title="Lab Fee" amount={15000} category="lab" />
              <FeeScheduleItem title="Uniform" amount={25000} category="uniform" />
              <FeeScheduleItem title="Lesson Fee" amount={20000} category="other" />
              <button className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all">
                <Plus className="h-8 w-8" />
                <span className="font-medium">Add Fee Item</span>
              </button>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'history' && (
        <Card title="Full Payment History" className="p-0 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Search transactions..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 outline-none" />
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Student</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Description</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[1, 2, 3, 4, 5].map(i => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">Student {i}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">Tuition Payment</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{formatCurrency(150000)}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase">Success</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">Mar 0{i}, 2024</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

const FeeScheduleItem = ({ title, amount, category }: any) => {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
          <CreditCard className="h-6 w-6" />
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Plus className="h-4 w-4 rotate-45" />
        </Button>
      </div>
      <h4 className="text-lg font-bold text-slate-900">{title}</h4>
      <p className="text-2xl font-black text-blue-600 mt-1">{formatCurrency(amount)}</p>
      <div className="mt-4 flex items-center gap-2">
        <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
          {category}
        </span>
        <span className="text-xs text-slate-400">Per Term</span>
      </div>
    </div>
  );
};
