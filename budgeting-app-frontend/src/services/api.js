import axios from 'axios';

const api = axios.create({
  baseURL: '/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const getLinkToken = async () => {
  try {
    const response = await api.get('http://localhost:5000/api/plaid/link_token');
    return response.data.link_token;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const exchangePublicToken = async (publicToken) => {
  try {
    await api.post('http://localhost:5000/api/plaid/exchange_public_token', { public_token: publicToken });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getTransactions = async (startDate, endDate) => {
  try {
    const response = await api.get(`http://localhost:5000/api/plaid/transactions?start_date=${startDate}&end_date=${endDate}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
