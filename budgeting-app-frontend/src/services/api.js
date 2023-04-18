import axios from 'axios';

export const getLinkToken = async () => {
  try {
    const response = await axios.get('/api/plaid/link_token');
    return response.data.link_token;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const exchangePublicToken = async (publicToken) => {
  try {
    await axios.post('/api/plaid/exchange_public_token', { public_token: publicToken });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getTransactions = async (startDate, endDate) => {
  try {
    const response = await axios.get(`/api/plaid/transactions?start_date=${startDate}&end_date=${endDate}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
