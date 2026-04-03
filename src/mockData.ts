import { Student, Grade, Attendance, AIPrediction, UserProfile } from "./types";

export const MOCK_USER: UserProfile = {
  uid: "admin123",
  email: "admin@edu.com",
  role: "admin",
  fullName: "System Administrator"
};

export const MOCK_STUDENTS: Student[] = [
  {
    id: "s1",
    fullName: "John Doe",
    dob: "2010-05-15",
    gender: "male",
    address: "123 School Lane, Lagos",
    guardianContact: "+234 801 234 5678",
    class: "JSS1",
    arm: "A",
    admissionNumber: "ADM/2023/001",
    studentId: "STU001",
    feeStatus: "paid",
    academicStanding: "good"
  },
  {
    id: "s2",
    fullName: "Jane Smith",
    dob: "2011-02-20",
    gender: "female",
    address: "456 Education St, Abuja",
    guardianContact: "+234 802 345 6789",
    class: "JSS1",
    arm: "B",
    admissionNumber: "ADM/2023/002",
    studentId: "STU002",
    feeStatus: "partial",
    academicStanding: "at-risk"
  }
];

export const MOCK_GRADES: Grade[] = [
  {
    studentId: "s1",
    subject: "Mathematics",
    term: "Term 1",
    academicYear: "2023/2024",
    ca: 18,
    assignment: 9,
    midTerm: 17,
    exam: 42,
    total: 86,
    grade: "A1",
    remarks: "Excellent"
  },
  {
    studentId: "s2",
    subject: "Mathematics",
    term: "Term 1",
    academicYear: "2023/2024",
    ca: 12,
    assignment: 5,
    midTerm: 10,
    exam: 25,
    total: 52,
    grade: "C6",
    remarks: "Credit"
  }
];

export const MOCK_ATTENDANCE: Attendance[] = [
  { studentId: "s1", date: "2024-03-01", status: "present" },
  { studentId: "s1", date: "2024-03-02", status: "present" },
  { studentId: "s2", date: "2024-03-01", status: "absent", reason: "Sick" },
  { studentId: "s2", date: "2024-03-02", status: "late" }
];

export const MOCK_PREDICTIONS: AIPrediction[] = [
  {
    studentId: "s1",
    riskLevel: "on-track",
    confidence: 0.95,
    predictedGrade: "A1",
    factors: {
      attendance: 98,
      caScores: 90,
      assignmentCompletion: 100,
      behaviour: "Excellent"
    },
    timestamp: new Date().toISOString()
  },
  {
    studentId: "s2",
    riskLevel: "at-risk",
    confidence: 0.8,
    predictedGrade: "C5",
    factors: {
      attendance: 75,
      caScores: 60,
      assignmentCompletion: 70,
      behaviour: "Needs improvement"
    },
    timestamp: new Date().toISOString()
  }
];
