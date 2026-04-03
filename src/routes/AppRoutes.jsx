import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import SchemesDirectory from '../pages/SchemesDirectory';
import SchemeDetail from '../pages/SchemeDetail';
import IssueFeed from '../pages/IssueFeed';
import ReportForm from '../pages/ReportForm';
import HowItWorks from '../pages/HowItWorks';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/schemes" element={<SchemesDirectory />} />
      <Route path="/schemes/:id" element={<SchemeDetail />} />
      <Route path="/issues" element={<IssueFeed />} />
      <Route path="/report" element={<ReportForm />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
    </Routes>
  );
};

export default AppRoutes;
