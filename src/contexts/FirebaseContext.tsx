import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile, UserRole } from '../types';

interface FirebaseContextType {
  userProfile: UserProfile;
  loading: boolean;
  setRole: (role: UserRole) => void;
  logout: () => void;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

const DEFAULT_PROFILES: Record<UserRole, UserProfile> = {
  admin: {
    uid: 'demo-admin',
    email: 'admin@school.com',
    role: 'admin',
    fullName: 'Admin User',
  },
  teacher: {
    uid: 'demo-teacher',
    email: 'teacher@school.com',
    role: 'teacher',
    fullName: 'Teacher User',
  },
  parent: {
    uid: 'demo-parent',
    email: 'parent@school.com',
    role: 'parent',
    fullName: 'Parent User',
  },
  student: {
    uid: 'demo-student',
    email: 'student@school.com',
    role: 'student',
    fullName: 'Student User',
  },
};

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILES.admin);

  useEffect(() => {
    // Check if a role was previously selected
    const savedRole = localStorage.getItem('edu-app-role') as UserRole | null;
    if (savedRole && DEFAULT_PROFILES[savedRole]) {
      setUserProfile(DEFAULT_PROFILES[savedRole]);
    }
    setLoading(false);
  }, []);

  const setRole = (role: UserRole) => {
    localStorage.setItem('edu-app-role', role);
    setUserProfile(DEFAULT_PROFILES[role]);
  };

  const logout = () => {
    localStorage.removeItem('edu-app-role');
    setUserProfile(DEFAULT_PROFILES.admin);
  };

  return (
    <FirebaseContext.Provider value={{ userProfile, loading, setRole, logout }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
