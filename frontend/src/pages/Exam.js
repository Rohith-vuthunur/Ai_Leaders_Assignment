import React, { useEffect, useState } from 'react';
import api from '../api';
import Timer from '../components/Timer';
import { useNavigate } from 'react-router-dom';

export default function Exam() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/exam/questions');
        const stripped = data.map(q => ({ _id: q._id, question: q.question, options: q.options }));
        setQuestions(stripped);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchQuestions();
    return () => sessionStorage.removeItem('exam_time_left');
  }, [navigate]);

  const selectOption = (qid, idx) => {
    setAnswers(prev => ({ ...prev, [qid]: idx }));
  };

  const submitExam = async (auto = false) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const { data } = await api.post('/exam/submit', { answers });
      sessionStorage.removeItem('exam_time_left');
      navigate('/result', { state: { score: data.score, total: questions.length, auto } });
    } catch (err) {
      setSubmitting(false);
      alert('Submit failed. Please try again.');
    }
  };

  const goto = (i) => {
    if (i < 0) i = 0;
    if (i >= questions.length) i = questions.length - 1;
    setCurrent(i);
  };

  if (loading) return <div className="text-center py-5">Loading questions…</div>;
  if (!questions.length) return <div className="text-center py-5">No questions available.</div>;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Exam</h5>
        <div className="d-flex gap-2 align-items-center">
          <div className="me-3 text-muted small">Answered: {Object.keys(answers).length}/{questions.length}</div>
          <Timer initialSeconds={30 * 60} onExpire={() => submitExam(true)} />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="mb-3">Question {current + 1} of {questions.length}</h6>
              <p className="lead">{questions[current].question}</p>
              <div className="list-group">
                {questions[current].options.map((opt, idx) => (
                  <label key={idx} className={`list-group-item list-group-item-action d-flex align-items-center ${answers[questions[current]._id] === idx ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name={questions[current]._id}
                      checked={answers[questions[current]._id] === idx}
                      onChange={() => selectOption(questions[current]._id, idx)}
                      className="form-check-input me-2"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <button className="btn btn-outline-secondary me-2" onClick={() => goto(current - 1)} disabled={current === 0}>Previous</button>
                  <button className="btn btn-outline-secondary" onClick={() => goto(current + 1)} disabled={current === questions.length - 1}>Next</button>
                </div>
                <div>
                  <button className="btn btn-success" onClick={() => submitExam(false)} disabled={submitting}>{submitting ? 'Submitting…' : 'Submit Exam'}</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="mb-3">Question Palette</h6>
              <div className="d-flex flex-wrap gap-2">
                {questions.map((q, i) => {
                  const done = answers[q._id] !== undefined;
                  return (
                    <button
                      key={q._id}
                      className={`btn btn-sm ${done ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => goto(i)}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <hr />
              <div className="small text-muted">Click numbers to jump. Blue means answered.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
