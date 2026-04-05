import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import SchemesDirectory from '../pages/SchemesDirectory';
import SchemeDetail from '../pages/SchemeDetail';
import IssueFeed from '../pages/IssueFeed';
import ReportForm from '../pages/ReportForm';
import HowItWorks from '../pages/HowItWorks';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Profile from '../pages/auth/Profile';
import AdminLogin from '../pages/auth/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AllReports from '../pages/admin/AllReports';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* Protected Routes - Require Authentication (Any Role) */}
      <Route 
        path="/schemes" 
        element={
          <ProtectedRoute>
            <SchemesDirectory />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/schemes/:id" 
        element={
          <ProtectedRoute>
            <SchemeDetail />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/issues" 
        element={
          <ProtectedRoute>
            <IssueFeed />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/report" 
        element={
          <ProtectedRoute>
            <ReportForm />
          </ProtectedRoute>
        } 
      />
      
      {/* Citizen-Only Routes */}
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute requireCitizen={true}>
            <Profile />
          </ProtectedRoute>
        } 
      />
      
      {/* Admin-Only Routes */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/reports" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <AllReports />
          </ProtectedRoute>
        } 
      />
      
      {/* Keep How It Works public for now */}
      <Route path="/how-it-works" element={<HowItWorks />} />
    </Routes>
  );
};

export default AppRoutes;
