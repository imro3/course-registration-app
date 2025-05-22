export interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  description: string;
  department: string;
  year: number;
  required: boolean;
  semester: string;
  schedule: {
    day: string;
    period: number;
  }[];
  capacity: number;
  enrolled: number;
}

export type DayOfWeek = '月' | '火' | '水' | '木' | '金';
export type Period = 1 | 2 | 3 | 4 | 5;

export interface TimeSlot {
  day: DayOfWeek;
  period: Period;
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
  required: boolean | null;
  department: string | null;
} 