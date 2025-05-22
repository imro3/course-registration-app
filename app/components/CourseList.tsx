'use client';

import { useState } from 'react';
import { Course } from '@/src/types';

interface CourseListProps {
  courses: Course[];
  selectedCourses: string[];
  onCourseSelect: (courseId: string) => void;
}

export default function CourseList({ courses, selectedCourses, onCourseSelect }: CourseListProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <div className="grid gap-4">
      {courses.map(course => (
        <div key={course.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold">{course.name}</h2>
                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                  {course.year}年
                </span>
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                  {course.required ? '必修' : '選択'}
                </span>
              </div>
              <p className="text-gray-600">{course.code}</p>
              <p className="text-sm">担当教員: {course.instructor}</p>
              <p className="text-sm">単位数: {course.credits}</p>
              <p className="text-sm">学科: {course.department}</p>
              <p className="text-sm">
                履修者数: {course.enrolled}/{course.capacity}
              </p>
              <div className="mt-2">
                <p className="text-sm font-semibold">授業時間:</p>
                {course.schedule.map((s, i) => (
                  <span key={i} className="text-sm mr-2">
                    {s.day}{s.period}限
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onCourseSelect(course.id)}
                className={`px-4 py-2 rounded ${
                  selectedCourses.includes(course.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {selectedCourses.includes(course.id) ? '履修取消' : '履修登録'}
              </button>
              <button
                onClick={() => handleShowDetails(course)}
                className="px-4 py-2 rounded bg-gray-500 text-white"
              >
                詳細を見る
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-700">{course.description}</p>
        </div>
      ))}

      {/* 詳細情報モーダル */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedCourse.name}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold mb-2">基本情報</h3>
                <p><span className="font-medium">科目コード:</span> {selectedCourse.code}</p>
                <p><span className="font-medium">担当教員:</span> {selectedCourse.instructor}</p>
                <p><span className="font-medium">単位数:</span> {selectedCourse.credits}</p>
                <p><span className="font-medium">履修者数:</span> {selectedCourse.enrolled}/{selectedCourse.capacity}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">授業時間</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.schedule.map((s, i) => (
                    <span key={i} className="bg-blue-100 px-3 py-1 rounded">
                      {s.day}曜{s.period}限
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">科目説明</h3>
              <p className="text-gray-700">{selectedCourse.description}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => onCourseSelect(selectedCourse.id)}
                className={`px-6 py-2 rounded ${
                  selectedCourses.includes(selectedCourse.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {selectedCourses.includes(selectedCourse.id) ? '履修取消' : '履修登録'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 