'use client';

import { Course } from '@/src/types';

interface TimeTableProps {
  courses: Course[];
}

export default function TimeTable({ courses }: TimeTableProps) {
  const periods = [1, 2, 3, 4, 5];
  const days = ['月', '火', '水', '木', '金'];

  const getCellContent = (day: string, period: number) => {
    return courses.filter(course =>
      course.schedule.some(s => s.day === day && s.period === period)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 bg-gray-50"></th>
            {days.map(day => (
              <th key={day} className="border p-2 bg-gray-50 min-w-[200px]">
                {day}曜日
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {periods.map(period => (
            <tr key={period}>
              <th className="border p-2 bg-gray-50">{period}限</th>
              {days.map(day => {
                const cellCourses = getCellContent(day, period);
                return (
                  <td key={`${day}-${period}`} className="border p-2">
                    {cellCourses.map(course => (
                      <div
                        key={course.id}
                        className="bg-blue-100 p-2 rounded mb-1 text-sm"
                      >
                        <div className="font-bold">{course.name}</div>
                        <div className="text-xs text-gray-600">
                          {course.instructor}
                        </div>
                        <div className="text-xs text-gray-600">
                          {course.code}
                        </div>
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 