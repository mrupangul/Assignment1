/**
 * @typedef {Object} Campaign
 * @property {string} campaignId - Unique identifier for the campaign
 * @property {number} impressions - Number of ad impressions
 * @property {number} clicks - Number of clicks received
 * @property {number} conversions - Number of successful actions
 * @property {number} spend - Total money spent
 * @property {number} revenue - Total revenue generated
 * @property {string} status - Current campaign status
 * @property {Date} date - Date of the campaign data
 */

export const CampaignStatus = {
  ACTIVE: 'Active',
  PAUSED: 'Paused'
};