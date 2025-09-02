import React, { useState, useEffect } from 'react';
import StudentList from './components/StudentList';
import StudentModal from './components/StudentModal';
import { studentService } from './services/studentService';

function App() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            setLoading(true);
            const data = await studentService.getAllStudents();
            setStudents(data);
            setError(null);
        } catch (err) {
            setError('Failed to load students. Please try again.');
            console.error('Error loading students:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddStudent = () => {
        setEditingStudent(null);
        setShowModal(true);
    };

    const handleEditStudent = (student) => {
        setEditingStudent(student);
        setShowModal(true);
    };

    const handleDeleteStudent = async (studentId) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await studentService.deleteStudent(studentId);
                setStudents(students.filter(s => s.id !== studentId));
            } catch (err) {
                setError('Failed to delete student. Please try again.');
                console.error('Error deleting student:', err);
            }
        }
    };

    const handleSaveStudent = async (studentData) => {
        try {
            if (editingStudent) {
                const updatedStudent = await studentService.updateStudent(editingStudent.id, studentData);
                setStudents(students.map(s => s.id === editingStudent.id ? updatedStudent : s));
            } else {
                const newStudent = await studentService.createStudent(studentData);
                setStudents([...students, newStudent]);
            }
            setShowModal(false);
            setEditingStudent(null);
            setError(null);
        } catch (err) {
            setError('Failed to save student. Please try again.');
            console.error('Error saving student:', err);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingStudent(null);
    };

    return (
        <div className="App">
            <header className="header">
                <h1>XYZ University</h1>
                <nav className="nav">
                    <a href="#home">Home</a>
                    <a href="#students">Students list</a>
                </nav>
            </header>

            <div className="container">
                <div className="students-section">
                    <h2>All students</h2>

                    {error && <div className="error">{error}</div>}

                    <button className="add-student-btn" onClick={handleAddStudent}>
                        Add a new student
                    </button>

                    {loading ? (
                        <div className="loading">Loading students...</div>
                    ) : (
                        <StudentList
                            students={students}
                            onEdit={handleEditStudent}
                            onDelete={handleDeleteStudent}
                        />
                    )}
                </div>
            </div>

            {showModal && (
                <StudentModal
                    student={editingStudent}
                    onSave={handleSaveStudent}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default App;