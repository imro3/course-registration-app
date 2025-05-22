'use client';

import { useState, useEffect } from 'react';
import { Course, FilterOptions } from '@/src/types';
import CourseList from '@/app/components/CourseList';
import FilterPanel from '@/app/components/FilterPanel';
import TimeTable from '@/app/components/TimeTable';
import { Tab } from '@headlessui/react';

const mockCourses: Course[] = [
  {
    id: "CSE101",
    name: "プログラミング基礎",
    code: "CSE101",
    instructor: "山田太郎",
    credits: 2,
    description: "プログラミングの基礎を学ぶ授業です。",
    department: "情報工学科",
    year: 1,
    required: true,
    semester: "前期",
    schedule: [{ day: "月", period: 2 }],
    capacity: 50,
    enrolled: 30
  },
  {
    id: "CSE102",
    name: "データ構造とアルゴリズム",
    code: "CSE102",
    instructor: "鈴木花子",
    credits: 2,
    description: "基本的なデータ構造とアルゴリズムについて学びます。",
    department: "情報工学科",
    year: 1,
    required: true,
    semester: "前期",
    schedule: [{ day: "火", period: 3 }, { day: "木", period: 3 }],
    capacity: 50,
    enrolled: 45
  },
  {
    id: "CSE201",
    name: "データベース設計",
    code: "CSE201",
    instructor: "佐藤一郎",
    credits: 2,
    description: "データベース設計の基礎から応用まで学びます。",
    department: "情報工学科",
    year: 2,
    required: false,
    semester: "後期",
    schedule: [{ day: "月", period: 3 }, { day: "木", period: 4 }],
    capacity: 40,
    enrolled: 35
  },
  {
    id: "CSE202",
    name: "ウェブプログラミング",
    code: "CSE202",
    instructor: "田中美咲",
    credits: 2,
    description: "最新のウェブ技術とプログラミング手法を学びます。",
    department: "情報工学科",
    year: 2,
    required: false,
    semester: "後期",
    schedule: [{ day: "水", period: 2 }, { day: "金", period: 2 }],
    capacity: 45,
    enrolled: 40
  },
  {
    id: "EE101",
    name: "電気回路基礎",
    code: "EE101",
    instructor: "高橋誠",
    credits: 2,
    description: "電気回路の基礎を学びます。",
    department: "電気電子工学科",
    year: 1,
    required: true,
    semester: "前期",
    schedule: [{ day: "月", period: 1 }, { day: "水", period: 1 }],
    capacity: 60,
    enrolled: 55
  },
  {
    id: "EE102",
    name: "デジタル回路",
    code: "EE102",
    instructor: "木村健一",
    credits: 2,
    description: "デジタル回路の設計と解析について学びます。",
    department: "電気電子工学科",
    year: 1,
    required: true,
    semester: "後期",
    schedule: [{ day: "火", period: 4 }, { day: "金", period: 4 }],
    capacity: 55,
    enrolled: 50
  },
  {
    id: "ME101",
    name: "機械力学",
    code: "ME101",
    instructor: "斎藤守",
    credits: 2,
    description: "機械力学の基礎を学びます。",
    department: "機械工学科",
    year: 1,
    required: true,
    semester: "前期",
    schedule: [{ day: "水", period: 3 }, { day: "金", period: 3 }],
    capacity: 50,
    enrolled: 45
  },
  {
    id: "ME102",
    name: "材料力学",
    code: "ME102",
    instructor: "山本京子",
    credits: 2,
    description: "材料力学の基礎を学びます。",
    department: "機械工学科",
    year: 1,
    required: true,
    semester: "後期",
    schedule: [{ day: "火", period: 2 }, { day: "木", period: 2 }],
    capacity: 50,
    enrolled: 48
  },
  {
    id: "CSE301",
    name: "人工知能",
    code: "CSE301",
    instructor: "中村智子",
    credits: 2,
    description: "人工知能の基礎と応用について学びます。",
    department: "情報工学科",
    year: 3,
    required: false,
    semester: "前期",
    schedule: [{ day: "月", period: 4 }, { day: "水", period: 4 }],
    capacity: 35,
    enrolled: 30
  },
  {
    id: "CSE302",
    name: "情報セキュリティ",
    code: "CSE302",
    instructor: "加藤雄一",
    credits: 2,
    description: "情報セキュリティの基礎と実践について学びます。",
    department: "情報工学科",
    year: 3,
    required: false,
    semester: "後期",
    schedule: [{ day: "火", period: 1 }, { day: "金", period: 1 }],
    capacity: 40,
    enrolled: 35
  },
  {
    id: "EE301",
    name: "電子デバイス",
    code: "EE301",
    instructor: "松田優子",
    credits: 2,
    description: "最新の電子デバイスについて学びます。",
    department: "電気電子工学科",
    year: 3,
    required: false,
    semester: "前期",
    schedule: [{ day: "水", period: 5 }, { day: "金", period: 5 }],
    capacity: 30,
    enrolled: 25
  },
  {
    id: "ME301",
    name: "制御工学",
    code: "ME301",
    instructor: "渡辺隆",
    credits: 2,
    description: "制御工学の理論と応用を学びます。",
    department: "機械工学科",
    year: 3,
    required: false,
    semester: "前期",
    schedule: [{ day: "月", period: 5 }, { day: "木", period: 5 }],
    capacity: 35,
    enrolled: 30
  }
];

export default function Home() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    year: null,
    required: null,
    department: null
  });

  useEffect(() => {
    let filtered = courses;
    
    if (filters.year !== null) {
      filtered = filtered.filter(course => course.year === filters.year);
    }
    if (filters.required !== null) {
      filtered = filtered.filter(course => course.required === filters.required);
    }
    if (filters.department !== null) {
      filtered = filtered.filter(course => course.department === filters.department);
    }
    
    setFilteredCourses(filtered);
  }, [courses, filters]);

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourses(prev => {
      if (prev.includes(courseId)) {
        return prev.filter(id => id !== courseId);
      }
      return [...prev, courseId];
    });
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">履修登録システム</h1>
      
      <div className="mb-8">
        <FilterPanel filters={filters} setFilters={setFilters} />
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-4">
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5
             ${selected
              ? 'bg-white text-blue-700 shadow'
              : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            }`
          }>
            科目一覧
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5
             ${selected
              ? 'bg-white text-blue-700 shadow'
              : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            }`
          }>
            時間割
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <CourseList 
              courses={filteredCourses}
              selectedCourses={selectedCourses}
              onCourseSelect={handleCourseSelect}
            />
          </Tab.Panel>
          <Tab.Panel>
            <TimeTable 
              courses={filteredCourses.filter(course => selectedCourses.includes(course.id))}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
}
