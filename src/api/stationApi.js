import apiClient from './axiosConfig';

export const getSchemes = async (params = {}) => {
  const response = await apiClient.get('/schemes', { params });
  return response.data;
};

export const getSchemeById = async (id) => {
  const response = await apiClient.get(`/schemes/${id}`);
  return response.data;
};
