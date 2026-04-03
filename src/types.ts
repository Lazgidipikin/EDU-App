/**
 * EDU - School Management Platform Types
 */

export type UserRole = 'admin' | 'teacher' | 'parent' | 'student';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  fullName: string;
  phoneNumber?: string;
  studentId?: string; // For students
  childIds?: string[]; // For parents
  department?: string; // For staff
  subjects?: string[]; // For teachers
}

export interface Student {
  id: string;
  fullName: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  guardianContact: string;
  class: string;
  arm: string; // A, B, C
  admissionNumber: string;
  studentId: string; // Auto-generated
  feeStatus: 'paid' | 'partial' | 'unpaid';
  academicStanding: 'excellent' | 'good' | 'average' | 'at-risk' | 'critical';
}

export interface Grade {
  studentId: string;
  subject: string;
  term: string;
  academicYear: string;
  ca: number; // 20%
  assignment: number; // 10%
  midTerm: number; // 20%
  exam: number; // 50%
  total: number;
  grade: string; // A1, B2, etc.
  remarks: string;
}

export interface Attendance {
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  session?: string; // morning/afternoon
  reason?: string;
}

export interface FeeItem {
  id: string;
  name: string;
  amount: number;
  category: 'tuition' | 'hostel' | 'lab' | 'uniform' | 'other';
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  status: 'success' | 'pending' | 'failed';
  reference: string;
  items: string[]; // FeeItem IDs
}

export interface AIPrediction {
  studentId: string;
  riskLevel: 'on-track' | 'at-risk' | 'critical';
  confidence: number;
  predictedGrade: string;
  factors: {
    attendance: number;
    caScores: number;
    assignmentCompletion: number;
    behaviour: string;
  };
  timestamp: string;
}

export interface TimetableEntry {
  id: string;
  class: string;
  arm: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  period: number;
  subject: string;
  teacherId: string;
  room: string;
  startTime: string;
  endTime: string;
}
