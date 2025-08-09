import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const { data } = await api.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
      navigate('/exam');
    } catch (error) {
      setErr(error?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title mb-3">Create your account</h4>
            {err && <div className="alert alert-danger">{err}</div>}
            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">Full name</label>
                <input name="name" value={form.name} onChange={change} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input name="email" value={form.email} onChange={change} type="email" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input name="password" value={form.password} onChange={change} type="password" className="form-control" required minLength={6} />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-primary" type="submit">Register & Start</button>
                <small className="text-muted">Already have account? <a href="/login">Login</a></small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
