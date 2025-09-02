import React, { useState, useEffect } from 'react';

const StudentList = ({ students, onEdit, onDelete }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    if (students.length === 0) {
        return (
            <div className="students-table">
                <p style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                    No students found. Add a new student to get started.
                </p>
            </div>
        );
    }

    // Mobile Card Layout
    if (isMobile) {
        return (
            <div className="students-mobile-cards">
                {students.map((student) => (
                    <div key={student.id} className="student-card">
                        <div className="student-card-header">
                            <h3>{student.name}</h3>
                            <div className="student-card-actions">
                                <button
                                    className="edit-btn"
                                    onClick={() => onEdit(student)}
                                    aria-label={`Edit ${student.name}`}
                                >
                                    edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => onDelete(student.id)}
                                    aria-label={`Delete ${student.name}`}
                                >
                                    delete
                                </button>
                            </div>
                        </div>
                        <div className="student-card-details">
                            {student.address && (
                                <div className="detail-row">
                                    <span className="detail-label">Address:</span>
                                    <span className="detail-value">{student.address}</span>
                                </div>
                            )}
                            {student.city && (
                                <div className="detail-row">
                                    <span className="detail-label">City:</span>
                                    <span className="detail-value">{student.city}</span>
                                </div>
                            )}
                            {student.state && (
                                <div className="detail-row">
                                    <span className="detail-label">State:</span>
                                    <span className="detail-value">{student.state}</span>
                                </div>
                            )}
                            <div className="detail-row">
                                <span className="detail-label">Email:</span>
                                <span className="detail-value">
                                    <a href={`mailto:${student.email}`}>{student.email}</a>
                                </span>
                            </div>
                            {student.phone && (
                                <div className="detail-row">
                                    <span className="detail-label">Phone:</span>
                                    <span className="detail-value">
                                        <a href={`tel:${student.phone}`}>{student.phone}</a>
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Desktop Table Layout
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
                            <td>{student.address || '-'}</td>
                            <td>{student.city || '-'}</td>
                            <td>{student.state || '-'}</td>
                            <td>
                                <a href={`mailto:${student.email}`}>{student.email}</a>
                            </td>
                            <td>
                                {student.phone ? (
                                    <a href={`tel:${student.phone}`}>{student.phone}</a>
                                ) : (
                                    '-'
                                )}
                            </td>
                            <td>
                                <button
                                    className="edit-btn"
                                    onClick={() => onEdit(student)}
                                    aria-label={`Edit ${student.name}`}
                                >
                                    edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => onDelete(student.id)}
                                    aria-label={`Delete ${student.name}`}
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