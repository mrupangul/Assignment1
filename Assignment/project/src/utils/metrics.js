/**
 * Calculate Click-Through Rate (CTR)
 * @param {number} clicks
 * @param {number} impressions
 * @returns {number}
 */
export function calculateCTR(clicks, impressions) {
  return impressions > 0 ? (clicks / impressions) * 100 : 0;
}

/**
 * Calculate Return on Ad Spend (ROAS)
 * @param {number} revenue
 * @param {number} spend
 * @returns {number}
 */
export function calculateROAS(revenue, spend) {
  return spend > 0 ? revenue / spend : 0;
}

/**
 * Calculate Cost Per Acquisition (CPA)
 * @param {number} spend
 * @param {number} conversions
 * @returns {number}
 */
export function calculateCPA(spend, conversions) {
  return conversions > 0 ? spend / conversions : 0;
}