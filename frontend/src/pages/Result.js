import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, total = 0, auto = false } = location.state || {};

  const pct = total ? Math.round((score / total) * 100) : 0;

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-sm text-center">
          <div className="card-body">
            <h3 className="mb-3">Exam Completed</h3>
            {auto && <div className="mb-2 text-warning">Auto-submitted because time ran out.</div>}
            <div className="display-6 mb-2">{score} / {total}</div>
            <div className="mb-3">{pct}%</div>
            <div className="mb-4">
              {pct >= 70 ? <span className="badge bg-success">Passed</span> : <span className="badge bg-danger">Needs Improvement</span>}
            </div>
            <div>
              <button className="btn btn-primary me-2" onClick={() => navigate('/exam')}>Retake (new questions)</button>
              <button className="btn btn-outline-secondary" onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
