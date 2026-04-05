import apiClient from './axiosConfig';

export const submitRailwayReport = async (reportData) => {
  const response = await apiClient.post('/railway-reports', reportData);
  return response.data;
};

export const getRailwayIssues = async (params = {}) => {
  const response = await apiClient.get('/railway-issues', { params });
  return response.data;
};
