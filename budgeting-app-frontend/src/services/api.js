import axios from 'axios';

const getAuthToken = () => localStorage.getItem('token');

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getLinkToken = async () => {
  try {
    const response = await api.get('/api/plaid/link_token', {
      headers: { 'x-auth-token': getAuthToken() },
    });
    return response.data.link_token;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const exchangePublicToken = async (publicToken) => {
  try {
    await api.post('/api/plaid/exchange_public_token', { public_token: publicToken }, {
      headers: { 'x-auth-token': getAuthToken() },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getTransactions = async (startDate, endDate) => {
  try {
    const response = await api.get(`/api/plaid/transactions?start_date=${startDate}&end_date=${endDate}`, {
      headers: { 'x-auth-token': getAuthToken() },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
