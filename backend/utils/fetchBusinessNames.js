const axios = require('axios');

const fetchBusinessNames = async (dealIds) => {
  const nexarApi = process.env.NEXAR_API_URL || 'https://api.nexartechnologies.com/api/v1';
  const businessNamesRes = await axios.post(`${nexarApi}/contacts/business`, {
    dealIds
  }, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const businessNames = businessNamesRes.data?.data || [];
  return businessNames
}

module.exports = fetchBusinessNames