export interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  capacity: number;
  enrolled: number;
  schedule: {
    day: string;
    period: number;
  }[];
  description: string;
  year: number;
  type: '必修' | '選択必修' | '選択';
  department: string;
}

export interface Student {
  id: string;
  name: string;
  studentId: string;
  enrolledCourses: string[]; // Course IDs
}

export interface RegistrationPeriod {
  start: Date;
  end: Date;
  isActive: boolean;
}

export interface FilterOptions {
  year: number | null;
  type: ('必修' | '選択必修' | '選択') | null;
  department: string | null;
} 