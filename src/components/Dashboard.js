import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import TestPage from './TestPage';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [currentPage, setCurrentPage] = useState('schedule');
  const [testResults, setTestResults] = useState([]);

  const scheduleData = [
    {
      id: 1,
      date: 'Today',
      fullDate: 'March 12, 2025',
      sessions: [
        {
          id: 1,
          timeFrom: '09:00 AM',
          timeTo: '10:20AM',
          course: 'Online Apptitude Test ',
          status: 'active'
        }
      ]
    }
  ];

  const handleStartTest = () => {
    setCurrentPage('test');
  };

  const handleTestComplete = (results) => {
    const newResult = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      testName: 'Aptitude Online Test',
      ...results
    };
    setTestResults(prev => [newResult, ...prev]);
    setCurrentPage('results');
  };

  const renderSidebar = () => (
    <div className="sidebar">
      <div className="sidebar-nav">
        <button
          className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentPage('home')}
        >
          <div className="nav-icon">🏠</div>
          <span>Home</span>
        </button>

        

        <button
          className={`nav-item ${currentPage === 'schedule' ? 'active' : ''}`}
          onClick={() => setCurrentPage('schedule')}
        >
          <div className="nav-icon">📅</div>
          <span>Schedule</span>
        </button>

        <button
          className={`nav-item ${currentPage === 'results' ? 'active' : ''}`}
          onClick={() => setCurrentPage('results')}
        >
          <div className="nav-icon">📊</div>
          <span>Results</span>
        </button>

        <button
          className={`nav-item ${currentPage === 'certificate' ? 'active' : ''}`}
          onClick={() => setCurrentPage('certificate')}
        >
          <div className="nav-icon">🏆</div>
          <span>Certificate</span>
        </button>

      </div>

      <div className="sidebar-bottom">
        <button className="nav-item settings" onClick={() => setCurrentPage('settings')}>
          <div className="nav-icon">⚙️</div>
          <span>Settings</span>
        </button>
      </div>
    </div>
  );

  const renderResultsContent = () => (
    <div className="main-content">
      <div className="top-header">
        <div className="brand-section">
          <div className="brand-logo">
            <span className="brand-name">Results</span>
          </div>
        </div>

        <div className="search-section">
          <div className="search-container">
            <div className="search-icon">🔍</div>
            <input type="text" placeholder="Search results..." className="search-input" />
          </div>
        </div>

        <div className="header-actions">
          <div className="user-profile">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <div className="user-name">{user?.name || 'Jashwanth Boddupally'}</div>
              <div className="user-email">{user?.email || 'jashwanthboddupally@gmail.com'}</div>
            </div>
          </div>

          <button className="logout-btn" onClick={logout} title="Logout">
            <span className="exit-icon"> </span>
            ➜]
          </button>
        </div>
      </div>

      <div className="content-area">
        <div className="page-header">
          <h1 className="page-title">Test Results</h1>
          <button className="create-btn" onClick={() => setCurrentPage('home')}>
            <span className="plus-icon">←</span>
            Back to Dashboard
          </button>
        </div>

        <div className="results-container">
          {testResults.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">📊</div>
              <h3>No Test Results Yet</h3>
              <p>Complete a test to see your results here</p>
              <button className="start-test-btn" onClick={() => setCurrentPage('home')}>
                Take a Test
              </button>
            </div>
          ) : (
            <div className="results-grid">
              {testResults.map(result => (
                <div key={result.id} className="result-card">
                  <div className="result-header">
                    <h3 className="result-title">{result.testName}</h3>
                    <div className="result-date">
                      <span>{result.date}</span>
                      <span>{result.time}</span>
                    </div>
                  </div>
                  
                <div className="result-stats">
                  <div className="stat-group">
                    <div className="stat-item">
                      <div className="stat-value">{result.score}/10</div>
                      <div className="stat-label">Score</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">{result.percentage}%</div>
                      <div className="stat-label">Percentage</div>
                    </div>
                  </div>
                  <div className="stat-group">
                    <div className="stat-item">
                      <div className="stat-value correct">{result.correct}</div>
                      <div className="stat-label">Correct</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value incorrect">{result.wrong}</div>
                      <div className="stat-label">Wrong</div>
                    </div>
                  </div>
                </div>                  <div className="result-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${result.percentage}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{result.percentage}% Complete</span>
                  </div>

                  <div className="result-actions">
                    <button className="view-details-btn">View Details</button>
                    <button className="retake-btn" onClick={handleStartTest}>Retake Test</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => (
    <div className="main-content">
      <div className="top-header">
        <div className="brand-section">
          <div className="brand-logo">

            <span className="brand-name">Home</span>
          </div>
        </div>

        <div className="search-section">
          <div className="search-container">
            <div className="search-icon">🔍</div>
            <input type="text" placeholder="Search" className="search-input" />
          </div>
        </div>

        <div className="header-actions">
          <div className="user-profile">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <div className="user-name">{user?.name || 'Jashwanth Boddupally'}</div>
              <div className="user-email">{user?.email || 'jashwanthboddupally@gmail.com'}</div>
            </div>
          </div>

          <button className="logout-btn" onClick={logout} title="Logout">
            <span className="exit-icon"> </span>
            ➜]
          </button>
        </div>
      </div>

      <div className="content-area">
        <div className="page-header">
          <h1 className="page-title">Schedule</h1>
          <button className="create-btn">
            <span className="plus-icon">+</span>
            Create appointment
          </button>
        </div>

        <div className="schedule-tabs">
          <button
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button
            className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past
          </button>

          <div className="tab-actions">
            <button className="filter-btn">
              <span className="filter-icon">⚙️</span>
              Filters
            </button>
            <button className="export-btn">
              <span className="export-icon">📥</span>
              Export
            </button>
          </div>
        </div>

        <div className="schedule-content">
          {scheduleData.filter(dayData => dayData.date === 'Today').map(dayData => (
            <div key={dayData.id} className="schedule-day">
              <div className="day-header">
                <h3 className="day-title">{dayData.date}</h3>
                <span className="day-date">{dayData.fullDate}</span>
              </div>

              <div className="sessions-list">
                {dayData.sessions.map(session => (
                  <div key={session.id} className="session-card">
                    <div className="session-time">
                      <div className="time-label">From</div>
                      <div className="time-value">{session.timeFrom}</div>
                      <div className="time-label">To</div>
                      <div className="time-value">{session.timeTo}</div>
                    </div>

                    <div className="session-details">
                      <div className="course-info">
                        <div className="course-label">Course</div>
                        <div className="course-name">{session.course}</div>
                        {session.lecture && (
                          <>
                            <div className="lecture-label">Lecture</div>
                            <div className="lecture-name">{session.lecture}</div>
                          </>
                        )}
                        {session.link && (
                          <>
                            <div className="link-label">Link</div>
                            <div className="meeting-link">{session.link}</div>
                          </>
                        )}
                      </div>

                      {session.students && (
                        <div className="students-section">
                          <div className="students-label">Students</div>
                          <div className="students-avatars">
                            {session.students.slice(0, 5).map(student => (
                              <div key={student.id} className="student-avatar">
                                {student.avatar}
                              </div>
                            ))}
                            {session.studentCount > 5 && (
                              <div className="student-count">+{session.studentCount - 5}</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="session-actions">
                      <button className="start-test-btn" onClick={handleStartTest}>
                        <span className="start-test-text">Start Test</span>
                        <div className="start-test-arrow">→</div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (currentPage === 'test') {
    return <TestPage 
      onBackToDashboard={() => setCurrentPage('schedule')} 
      onTestComplete={handleTestComplete}
    />;
  }

  return (
    <div className="dashboard-container">
      {renderSidebar()}
      {currentPage === 'results' ? renderResultsContent() : renderMainContent()}
    </div>
  );
};

export default Dashboard;