import apiClient from './axiosConfig';

export const getRailwaySchemes = async (params = {}) => {
  const response = await apiClient.get('/railway-schemes', { params });
  return response.data;
};

export const getRailwaySchemeById = async (id) => {
  const response = await apiClient.get(`/railway-schemes/${id}`);
  return response.data;
};
