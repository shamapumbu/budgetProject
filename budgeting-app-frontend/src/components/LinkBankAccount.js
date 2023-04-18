import React, { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { getLinkToken, exchangePublicToken } from '../services/api';

const LinkBankAccount = () => {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const fetchLinkToken = async () => {
      const token = await getLinkToken();
      setLinkToken(token);
    };

    fetchLinkToken();
  }, []);

  const onSuccess = async (publicToken) => {
    await exchangePublicToken(publicToken);
  };

  const config = {
    token: linkToken,
    onSuccess
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <div>
      <button onClick={() => open()} disabled={!ready}>
        Link Bank Account
      </button>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default LinkBankAccount;
