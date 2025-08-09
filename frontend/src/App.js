import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppNav from './components/AppNav';
import Register from './pages/Register';
import Login from './pages/Login';
import Exam from './pages/Exam';
import Result from './pages/Result';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <>
      <AppNav />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Navigate to="/exam" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/exam" element={<Exam />} />
            <Route path="/result" element={<Result />} />
          </Route>
          <Route path="*" element={<h3 className="text-center">404 - Page not found</h3>} />
        </Routes>
      </div>
    </>
  );
}
