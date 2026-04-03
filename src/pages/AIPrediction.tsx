import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  ArrowRight,
  BrainCircuit,
  Target,
  Activity,
  MessageSquare
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { MOCK_STUDENTS, MOCK_PREDICTIONS } from '../mockData';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export const AIPredictionPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-medium mb-4">
            <BrainCircuit className="h-4 w-4" />
            AI Performance Prediction Engine
          </div>
          <h1 className="text-4xl font-bold mb-4">Forecast Student Outcomes</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Our machine learning model analyzes attendance, assessment scores, and behavioral patterns 
            to predict student performance 4-6 weeks ahead of final examinations.
          </p>
        </div>
        <BrainCircuit className="absolute right-[-20px] bottom-[-20px] h-64 w-64 text-white/10 rotate-12" />
      </div>

      {/* Risk Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RiskStatCard 
          label="On Track" 
          count={MOCK_PREDICTIONS.filter(p => p.riskLevel === 'on-track').length} 
          color="green" 
          icon={CheckCircle2} 
        />
        <RiskStatCard 
          label="At Risk" 
          count={MOCK_PREDICTIONS.filter(p => p.riskLevel === 'at-risk').length} 
          color="amber" 
          icon={AlertTriangle} 
        />
        <RiskStatCard 
          label="Critical" 
          count={MOCK_PREDICTIONS.filter(p => p.riskLevel === 'critical').length} 
          color="red" 
          icon={AlertTriangle} 
        />
      </div>

      {/* Detailed Insights */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Detailed Student Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {MOCK_PREDICTIONS.map((prediction) => {
            const student = MOCK_STUDENTS.find(s => s.id === prediction.studentId);
            return (
              <Card key={prediction.studentId} className="p-0 overflow-hidden">
                <div className={cn(
                  "h-2 w-full",
                  prediction.riskLevel === 'on-track' ? "bg-green-500" :
                  prediction.riskLevel === 'at-risk' ? "bg-amber-500" : "bg-red-500"
                )} />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg">
                        {student?.fullName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{student?.fullName}</h3>
                        <p className="text-sm text-slate-500">{student?.class} {student?.arm} • {student?.studentId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Predicted Grade</p>
                      <p className="text-3xl font-black text-blue-600">{prediction.predictedGrade}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <FactorCard 
                      icon={Activity} 
                      label="Attendance" 
                      value={`${prediction.factors.attendance}%`} 
                      status={prediction.factors.attendance > 80 ? 'good' : 'warning'}
                    />
                    <FactorCard 
                      icon={Target} 
                      label="CA Scores" 
                      value={`${prediction.factors.caScores}%`} 
                      status={prediction.factors.caScores > 55 ? 'good' : 'warning'}
                    />
                    <FactorCard 
                      icon={CheckCircle2} 
                      label="Assignments" 
                      value={`${prediction.factors.assignmentCompletion}%`} 
                      status={prediction.factors.assignmentCompletion > 70 ? 'good' : 'warning'}
                    />
                    <FactorCard 
                      icon={MessageSquare} 
                      label="Behaviour" 
                      value={prediction.factors.behaviour} 
                      status="info"
                    />
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                      <Info className="h-4 w-4 text-blue-500" />
                      AI Recommendation
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {prediction.riskLevel === 'on-track' 
                        ? "Student is performing well. Maintain current study patterns and encourage participation in advanced topics."
                        : prediction.riskLevel === 'at-risk'
                        ? "Slight decline in attendance and assignment completion. Recommended: 1-on-1 counseling session and parent notification."
                        : "Critical performance drop. Immediate intervention required. Schedule a parent-teacher conference and assign a peer mentor."}
                    </p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button variant="outline" className="flex-1 gap-2">
                      View History
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button className="flex-1">Take Action</Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const RiskStatCard = ({ label, count, color, icon: Icon }: any) => {
  const colors: any = {
    green: "bg-green-50 text-green-700 border-green-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    red: "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <div className={cn("p-6 rounded-2xl border flex items-center justify-between", colors[color])}>
      <div>
        <p className="text-sm font-medium opacity-80">{label}</p>
        <p className="text-3xl font-bold mt-1">{count} Students</p>
      </div>
      <div className={cn("p-3 rounded-xl bg-white/50")}>
        <Icon className="h-8 w-8" />
      </div>
    </div>
  );
};

const FactorCard = ({ icon: Icon, label, value, status }: any) => {
  return (
    <div className="p-3 rounded-xl border border-slate-100 bg-white">
      <div className="flex items-center gap-2 text-slate-400 mb-1">
        <Icon className="h-3 w-3" />
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className={cn(
        "text-sm font-bold",
        status === 'good' ? "text-green-600" : 
        status === 'warning' ? "text-amber-600" : "text-blue-600"
      )}>
        {value}
      </p>
    </div>
  );
};
