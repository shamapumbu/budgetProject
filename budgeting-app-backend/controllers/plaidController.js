const plaidClient = require('../config/plaid');

exports.getLinkToken = async (req, res) => {
  try {
    const response = await plaidClient.createLinkToken({
      user: {
        client_user_id: req.user.id
      },
      client_name: 'Budgeting App',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en'
    });

    res.json({ link_token: response.link_token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.exchangePublicToken = async (req, res) => {
  const publicToken = req.body.public_token;

  try {
    const response = await plaidClient.exchangePublicToken(publicToken);
    const accessToken = response.access_token;

    // TODO: Save the access_token to the database associated with the user

    res.json({ msg: 'Bank account linked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getTransactions = async (req, res) => {
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;

  // TODO: Retrieve the access_token from the database associated with the user

  try {
    const response = await plaidClient.getTransactions(accessToken, startDate, endDate);
    res.json(response.transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
