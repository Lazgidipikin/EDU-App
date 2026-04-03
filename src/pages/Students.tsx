import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  X as CloseIcon
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, query, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Student } from '../types';

export const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEnrollModalOpen, setEnrollModalOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'students'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const studentData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Student[];
      setStudents(studentData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'students');
    });

    return () => unsubscribe();
  }, []);

  const filteredStudents = students.filter(s => 
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteDoc(doc(db, 'students', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `students/${id}`);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2" onClick={() => setEnrollModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Enroll Student
          </Button>
        </div>
      </div>

      {/* Student Table/Grid */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID / Class</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fee Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Academic Standing</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {student.fullName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{student.fullName}</p>
                        <p className="text-xs text-slate-500">{student.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-700">{student.studentId}</p>
                    <p className="text-xs text-slate-500">{student.class} {student.arm}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                      student.feeStatus === 'paid' ? "bg-green-100 text-green-700" :
                      student.feeStatus === 'partial' ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    )}>
                      {student.feeStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                      student.academicStanding === 'excellent' ? "bg-blue-100 text-blue-700" :
                      student.academicStanding === 'good' ? "bg-green-100 text-green-700" :
                      student.academicStanding === 'at-risk' ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    )}>
                      {student.academicStanding}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {isEnrollModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEnrollModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Enroll New Student</h3>
                <Button variant="ghost" size="icon" onClick={() => setEnrollModalOpen(false)}>
                  <CloseIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Date of Birth</label>
                    <input type="date" className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Gender</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Admission Number</label>
                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" placeholder="ADM/2024/..." />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Address</label>
                    <textarea className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" rows={2} placeholder="Full residential address" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Class</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option>JSS1</option>
                      <option>JSS2</option>
                      <option>JSS3</option>
                      <option>SS1</option>
                      <option>SS2</option>
                      <option>SS3</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Arm</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setEnrollModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setEnrollModalOpen(false)}>Complete Enrollment</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const X = ({ className, onClick }: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    onClick={onClick}
  >
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);
