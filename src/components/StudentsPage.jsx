import React, { useEffect, useState } from "react";
import data from "../data/data.json";
import { useNavigate } from 'react-router-dom';

const StudentsPage = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [students, setStudents] = useState(data.students);
  const [filters, setFilters] = useState({
    search: '',
    class: '',
    section: '',
    attendanceFrom: '',
    attendanceTo: ''
  });
  const [newStudent, setNewStudent] = useState({
    name: '',
    roll_number: '',
    class: '',
    section: '',
    attendance: '',
    marks: {
      maths: '',
      science: '',
      english: ''
    }
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const uniqueClasses = [...new Set(data.students.map(student => student.class))];
  const uniqueSections = [...new Set(data.students.map(student => student.section))];

  useEffect(() => {
    console.log("JSON Data:", data);
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filteredStudents = [...data.students];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredStudents = filteredStudents.filter(student => 
        student.name.toLowerCase().includes(searchTerm) || 
        student.roll_number.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.class) {
      filteredStudents = filteredStudents.filter(student => 
        student.class === filters.class
      );
    }

    if (filters.section) {
      filteredStudents = filteredStudents.filter(student => 
        student.section === filters.section
      );
    }

    if (filters.attendanceFrom) {
      filteredStudents = filteredStudents.filter(student => 
        Number(student.attendance) >= Number(filters.attendanceFrom)
      );
    }

    if (filters.attendanceTo) {
      filteredStudents = filteredStudents.filter(student => 
        Number(student.attendance) <= Number(filters.attendanceTo)
      );
    }

    setStudents(filteredStudents);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewStudentChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('marks.')) {
      const markField = name.split('.')[1];
      setNewStudent(prev => ({
        ...prev,
        marks: {
          ...prev.marks,
          [markField]: value
        }
      }));
    } else {
      setNewStudent(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addStudent = () => {
    const studentId = Math.max(...data.students.map(s => s.id)) + 1;
    const studentToAdd = {
      id: studentId,
      ...newStudent,
      attendance: Number(newStudent.attendance),
      marks: {
        maths: Number(newStudent.marks.maths),
        science: Number(newStudent.marks.science),
        english: Number(newStudent.marks.english)
      }
    };
    
    data.students.push(studentToAdd);
    setStudents([...data.students]);
    setNewStudent({
      name: '',
      roll_number: '',
      class: '',
      section: '',
      attendance: '',
      marks: {
        maths: '',
        science: '',
        english: ''
      }
    });
    setShowAddForm(false);
    resetFilters();
  };

  const deleteStudent = (id) => {
    const index = data.students.findIndex(student => student.id === id);
    if (index !== -1) {
      data.students.splice(index, 1);
      setStudents([...data.students]);
    }
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      class: '',
      section: '',
      attendanceFrom: '',
      attendanceTo: ''
    });
    setStudents(data.students);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {isAdmin ? 'Students Management' : 'Students List'}
      </h1>
      
      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-3">Filter Students</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search (Name/Roll No)</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by name or roll number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Class Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              name="class"
              value={filters.class}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Classes</option>
              {uniqueClasses.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          {/* Section Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
              name="section"
              value={filters.section}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Sections</option>
              {uniqueSections.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
          
          {/* Attendance Range */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attendance From</label>
              <input
                type="number"
                name="attendanceFrom"
                min="0"
                max="100"
                value={filters.attendanceFrom}
                onChange={handleFilterChange}
                placeholder="Min %"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attendance To</label>
              <input
                type="number"
                name="attendanceTo"
                min="0"
                max="100"
                value={filters.attendanceTo}
                onChange={handleFilterChange}
                placeholder="Max %"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset Filters
          </button>
        </div>
      </div>
      
      {isAdmin && (
        <div className="mb-4 flex justify-end space-x-3">
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : 'Add New Student'}
          </button>
        </div>
      )}
      
      {/* Add Student Form */}
      {isAdmin && showAddForm && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-3">Add New Student</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={newStudent.name}
                onChange={handleNewStudentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
              <input
                type="text"
                name="roll_number"
                value={newStudent.roll_number}
                onChange={handleNewStudentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <input
                type="text"
                name="class"
                value={newStudent.class}
                onChange={handleNewStudentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
              <input
                type="text"
                name="section"
                value={newStudent.section}
                onChange={handleNewStudentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attendance (%)</label>
              <input
                type="number"
                name="attendance"
                min="0"
                max="100"
                value={newStudent.attendance}
                onChange={handleNewStudentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maths Marks</label>
              <input
                type="number"
                name="marks.maths"
                min="0"
                max="100"
                value={newStudent.marks.maths}
                onChange={handleNewStudentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Science Marks</label>
              <input
                type="number"
                name="marks.science"
                min="0"
                max="100"
                value={newStudent.marks.science}
                onChange={handleNewStudentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">English Marks</label>
              <input
                type="number"
                name="marks.english"
                min="0"
                max="100"
                value={newStudent.marks.english}
                onChange={handleNewStudentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={addStudent}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Student
            </button>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Roll Number</th>
              <th className="px-4 py-2 border">Class</th>
              <th className="px-4 py-2 border">Section</th>
              <th className="px-4 py-2 border">Attendance (%)</th>
              <th className="px-4 py-2 border">Maths</th>
              <th className="px-4 py-2 border">Science</th>
              <th className="px-4 py-2 border">English</th>
              {isAdmin && <th className="px-4 py-2 border">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id} className="text-center odd:bg-gray-50 even:bg-white">
                  <td className="px-4 py-2 border">{student.id}</td>
                  <td className="px-4 py-2 border">{student.name}</td>
                  <td className="px-4 py-2 border">{student.roll_number}</td>
                  <td className="px-4 py-2 border">{student.class}</td>
                  <td className="px-4 py-2 border">{student.section}</td>
                  <td className="px-4 py-2 border">{student.attendance}</td>
                  <td className="px-4 py-2 border">{student.marks.maths}</td>
                  <td className="px-4 py-2 border">{student.marks.science}</td>
                  <td className="px-4 py-2 border">{student.marks.english}</td>
                  {isAdmin && (
                    <td className="px-4 py-2 border">
                      <button 
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isAdmin ? 10 : 9} className="px-4 py-4 text-center text-gray-500">
                  No students found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsPage;