'use client';

import { useState } from 'react';
import { Course, FilterOptions } from '@/src/types';

// モックデータを更新
const mockCourses: Course[] = [
  {
    id: '1',
    name: '情報科学概論',
    code: 'INFO101',
    instructor: '山田太郎',
    credits: 2,
    capacity: 100,
    enrolled: 45,
    schedule: [
      { day: '月', period: 2 },
      { day: '水', period: 2 }
    ],
    description: '情報科学の基礎を学ぶ講義です。',
    year: 1,
    type: '必修',
    department: '情報工学科'
  },
  {
    id: '2',
    name: 'プログラミング基礎',
    code: 'PROG101',
    instructor: '鈴木花子',
    credits: 3,
    capacity: 50,
    enrolled: 30,
    schedule: [
      { day: '火', period: 3 },
      { day: '木', period: 3 }
    ],
    description: 'プログラミングの基礎を学びます。',
    year: 1,
    type: '必修',
    department: '情報工学科'
  },
  {
    id: '3',
    name: 'データベース設計',
    code: 'DB201',
    instructor: '佐藤一郎',
    credits: 2,
    capacity: 60,
    enrolled: 40,
    schedule: [
      { day: '月', period: 3 },
      { day: '木', period: 4 }
    ],
    description: 'データベース設計の基礎から応用まで学びます。',
    year: 2,
    type: '選択必修',
    department: '情報工学科'
  },
  {
    id: '4',
    name: '人工知能入門',
    code: 'AI101',
    instructor: '中村智子',
    credits: 2,
    capacity: 80,
    enrolled: 75,
    schedule: [
      { day: '火', period: 2 },
      { day: '金', period: 2 }
    ],
    description: 'AI技術の基礎と最新トレンドを学習します。',
    year: 1,
    type: '選択',
    department: '情報工学科'
  },
  {
    id: '5',
    name: 'ネットワーク基礎',
    code: 'NET101',
    instructor: '高橋誠',
    credits: 2,
    capacity: 70,
    enrolled: 50,
    schedule: [
      { day: '水', period: 1 },
      { day: '金', period: 1 }
    ],
    description: 'コンピュータネットワークの基礎を学びます。',
    year: 1,
    type: '選択',
    department: '情報工学科'
  },
  {
    id: '6',
    name: 'Webアプリケーション開発',
    code: 'WEB301',
    instructor: '田中美咲',
    credits: 3,
    capacity: 40,
    enrolled: 35,
    schedule: [
      { day: '月', period: 4 },
      { day: '水', period: 4 }
    ],
    description: '実践的なWebアプリケーション開発を学びます。',
    year: 2,
    type: '選択',
    department: '情報工学科'
  },
  {
    id: '7',
    name: 'データ構造とアルゴリズム',
    code: 'ALG201',
    instructor: '木村健一',
    credits: 3,
    capacity: 55,
    enrolled: 45,
    schedule: [
      { day: '火', period: 1 },
      { day: '木', period: 1 }
    ],
    description: '効率的なプログラミングのための基礎を学びます。',
    year: 1,
    type: '選択',
    department: '情報工学科'
  },
  {
    id: '8',
    name: 'セキュリティ基礎',
    code: 'SEC101',
    instructor: '斎藤守',
    credits: 2,
    capacity: 65,
    enrolled: 40,
    schedule: [
      { day: '水', period: 3 },
      { day: '金', period: 3 }
    ],
    description: '情報セキュリティの基礎知識を学びます。',
    year: 1,
    type: '選択',
    department: '情報工学科'
  },
  {
    id: '9',
    name: 'モバイルアプリ開発',
    code: 'MOB201',
    instructor: '山本京子',
    credits: 3,
    capacity: 45,
    enrolled: 40,
    schedule: [
      { day: '月', period: 5 },
      { day: '木', period: 5 }
    ],
    description: 'スマートフォンアプリの開発手法を学びます。',
    year: 2,
    type: '選択',
    department: '情報工学科'
  },
  {
    id: '10',
    name: 'クラウドコンピューティング',
    code: 'CLD301',
    instructor: '加藤雄一',
    credits: 2,
    capacity: 50,
    enrolled: 30,
    schedule: [
      { day: '火', period: 4 },
      { day: '金', period: 4 }
    ],
    description: 'クラウドサービスの概念と実践を学びます。',
    year: 1,
    type: '選択',
    department: '情報工学科'
  },
  {
    id: '11',
    name: 'ビッグデータ分析',
    code: 'DAT301',
    instructor: '松田優子',
    credits: 3,
    capacity: 40,
    enrolled: 35,
    schedule: [
      { day: '水', period: 5 },
      { day: '金', period: 5 }
    ],
    description: 'ビッグデータの処理と分析手法を学びます。',
    year: 2,
    type: '選択',
    department: '情報工学科'
  },
  {
    id: '12',
    name: 'システム設計演習',
    code: 'SYS301',
    instructor: '渡辺隆',
    credits: 3,
    capacity: 35,
    enrolled: 30,
    schedule: [
      { day: '月', period: 1 },
      { day: '木', period: 2 }
    ],
    description: '実践的なシステム設計手法を学びます。',
    year: 3,
    type: '選択',
    department: '情報工学科'
  }
];

// 利用可能な学科一覧
const departments = ['情報工学科', '電気電子工学科', '機械工学科'];
const years = [1, 2, 3, 4];
const types = ['必修', '選択必修', '選択'] as const;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'timetable'>('list');
  const [filters, setFilters] = useState<FilterOptions>({
    year: null,
    type: null,
    department: null
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourses(prev => {
      if (prev.includes(courseId)) {
        return prev.filter(id => id !== courseId);
      }
      return [...prev, courseId];
    });
  };

  const handleShowDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === '' ? null : value
    }));
  };

  const resetFilters = () => {
    setFilters({
      year: null,
      type: null,
      department: null
    });
  };

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = 
      filters.year === null || course.year === filters.year;

    const matchesType = 
      filters.type === null || course.type === filters.type;

    const matchesDepartment = 
      filters.department === null || course.department === filters.department;

    return matchesSearch && matchesYear && matchesType && matchesDepartment;
  });

  // 選択された科目の時間割データを取得
  const selectedCoursesData = mockCourses.filter(course => 
    selectedCourses.includes(course.id)
  );

  // 時間割表のデータ構造
  const periods = [1, 2, 3, 4, 5];
  const days = ['月', '火', '水', '木', '金'];
  
  // 時間割セルの内容を取得する関数
  const getCellContent = (day: string, period: number) => {
    return selectedCoursesData.filter(course =>
      course.schedule.some(s => s.day === day && s.period === period)
    );
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">履修登録システム</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* タブ切り替え */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            科目一覧
          </button>
          <button
            onClick={() => setActiveTab('timetable')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'timetable'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            時間割表示
          </button>
        </div>

        {activeTab === 'list' && (
          <>
            <div className="mb-6 space-y-4">
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  placeholder="科目を検索..."
                  className="flex-1 p-2 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  フィルター {isFilterOpen ? '▼' : '▶'}
                </button>
              </div>

              {isFilterOpen && (
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        学年
                      </label>
                      <select
                        className="w-full p-2 border rounded"
                        value={filters.year || ''}
                        onChange={(e) => handleFilterChange('year', Number(e.target.value))}
                      >
                        <option value="">全て</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}年</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        科目区分
                      </label>
                      <select
                        className="w-full p-2 border rounded"
                        value={filters.type || ''}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                      >
                        <option value="">全て</option>
                        {types.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        学科
                      </label>
                      <select
                        className="w-full p-2 border rounded"
                        value={filters.department || ''}
                        onChange={(e) => handleFilterChange('department', e.target.value)}
                      >
                        <option value="">全て</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      フィルターをリセット
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid gap-4">
              {filteredCourses.map(course => (
                <div key={course.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold">{course.name}</h2>
                        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                          {course.year}年
                        </span>
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                          {course.type}
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
                        onClick={() => handleCourseSelect(course.id)}
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
            </div>
          </>
        )}

        {activeTab === 'timetable' && (
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
                      const courses = getCellContent(day, period);
                      return (
                        <td key={`${day}-${period}`} className="border p-2">
                          {courses.map(course => (
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
        )}

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
                  onClick={() => handleCourseSelect(selectedCourse.id)}
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
    </main>
  );
}
