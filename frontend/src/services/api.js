import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getAllMembers = async () => {
  try {
    const response = await axios.get(`${API_URL}/members`);
    return response.data;
  } catch (error) {
    console.error('Error fetching members data:', error);
    throw error;
  }
};
