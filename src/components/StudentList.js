import React from 'react';

const StudentList = ({ students, onEdit, onDelete }) => {
    if (students.length === 0) {
        return (
            <div className="students-table">
                <p style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                    No students found. Add a new student to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="students-table">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.address}</td>
                            <td>{student.city}</td>
                            <td>{student.state}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>
                                <button
                                    className="edit-btn"
                                    onClick={() => onEdit(student)}
                                >
                                    edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => onDelete(student.id)}
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;