import apiClient from './axiosConfig';

export const submitReport = async (reportData) => {
  const response = await apiClient.post('/reports', reportData);
  return response.data;
};

export const getIssues = async (params = {}) => {
  const response = await apiClient.get('/issues', { params });
  return response.data;
};
