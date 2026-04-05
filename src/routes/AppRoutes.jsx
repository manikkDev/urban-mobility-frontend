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
      
      {/* Protected Citizen Routes */}
      <Route 
        path="/schemes" 
        element={
          <ProtectedRoute requireCitizen={true}>
            <SchemesDirectory />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/schemes/:id" 
        element={
          <ProtectedRoute requireCitizen={true}>
            <SchemeDetail />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/issues" 
        element={
          <ProtectedRoute requireCitizen={true}>
            <IssueFeed />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/report" 
        element={
          <ProtectedRoute requireCitizen={true}>
            <ReportForm />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute requireCitizen={true}>
            <Profile />
          </ProtectedRoute>
        } 
      />
      
      {/* Protected Admin Routes */}
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
      <Route 
        path="/admin/schemes" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <SchemesDirectory />
          </ProtectedRoute>
        } 
      />
      
      {/* Keep How It Works public for now */}
      <Route path="/how-it-works" element={<HowItWorks />} />
    </Routes>
  );
};

export default AppRoutes;
