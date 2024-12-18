/**
 * Validate OpenAI API key format
 * @param {string} apiKey
 * @returns {boolean}
 */
export function validateApiKey(apiKey) {
  return typeof apiKey === 'string' && 
         apiKey.startsWith('sk-') && 
         apiKey.length > 20;
}

/**
 * Validate campaign data structure
 * @param {Campaign} campaign
 * @returns {boolean}
 */
export function validateCampaign(campaign) {
  return (
    typeof campaign.campaignId === 'string' &&
    typeof campaign.impressions === 'number' &&
    typeof campaign.clicks === 'number' &&
    typeof campaign.conversions === 'number' &&
    typeof campaign.spend === 'number' &&
    typeof campaign.revenue === 'number' &&
    typeof campaign.status === 'string' &&
    campaign.date instanceof Date
  );
}

/**
 * Validate campaign metrics are within reasonable ranges
 * @param {Campaign} campaign
 * @returns {Object} Validation results
 */
export function validateMetrics(campaign) {
  const issues = [];

  if (campaign.clicks > campaign.impressions) {
    issues.push('Clicks cannot exceed impressions');
  }
  if (campaign.conversions > campaign.clicks) {
    issues.push('Conversions cannot exceed clicks');
  }
  if (campaign.spend < 0 || campaign.revenue < 0) {
    issues.push('Spend and revenue must be non-negative');
  }

  return {
    isValid: issues.length === 0,
    issues
  };
}