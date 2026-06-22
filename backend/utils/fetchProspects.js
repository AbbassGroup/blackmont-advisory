const axios = require('axios');

// Server-side fetch of a deal's prospects from Nexar (the vendor portal has no
// Nexar credentials). Returns raw objects; the caller strips PII before sending.
const fetchProspects = async (nexarDealId) => {
  if (!nexarDealId) return [];
  const nexarApi = process.env.NEXAR_API_URL || 'https://api.nexartechnologies.com/api/v1';
  const res = await axios.get(
    `${nexarApi}/contacts/business-brokers/${nexarDealId}`,
    { headers: { 'Content-Type': 'application/json' } }
  );
  // Nexar returns either a bare array or { data: [...] } depending on endpoint.
  return Array.isArray(res.data) ? res.data : res.data?.data || [];
};

module.exports = fetchProspects;
