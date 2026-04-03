import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
}

export function getGradeFromScore(score: number): { grade: string; remarks: string } {
  if (score >= 75) return { grade: 'A1', remarks: 'Excellent' };
  if (score >= 70) return { grade: 'B2', remarks: 'Very good' };
  if (score >= 65) return { grade: 'B3', remarks: 'Good' };
  if (score >= 60) return { grade: 'C4', remarks: 'Credit' };
  if (score >= 55) return { grade: 'C5', remarks: 'Credit' };
  if (score >= 50) return { grade: 'C6', remarks: 'Credit' };
  if (score >= 45) return { grade: 'D7', remarks: 'Pass' };
  if (score >= 40) return { grade: 'E8', remarks: 'Pass' };
  return { grade: 'F9', remarks: 'Fail' };
}
