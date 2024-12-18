import { stringify } from 'csv-stringify';
import fs from 'fs/promises';

export class ReportGenerator {
  /**
   * Generate a detailed performance report
   * @param {Campaign[]} campaigns
   * @param {Object} recommendations
   * @param {string} aiInsights
   * @returns {Promise<void>}
   */
  async generateReport(campaigns, recommendations, aiInsights) {
    const report = {
      date: new Date().toISOString(),
      campaigns: campaigns.length,
      recommendations,
      aiInsights,
      summary: this.generateSummary(campaigns, recommendations)
    };

    await this.saveReport(report);
  }

  /**
   * Generate a summary of campaign performance
   * @param {Campaign[]} campaigns
   * @param {Object} recommendations
   * @returns {string}
   */
  generateSummary(campaigns, recommendations) {
    const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
    const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
    
    return `
      Total Campaigns: ${campaigns.length}
      Total Spend: $${totalSpend.toFixed(2)}
      Total Revenue: $${totalRevenue.toFixed(2)}
      Recommended Actions: ${recommendations.action}
      Reason: ${recommendations.reason}
    `;
  }

  /**
   * Save the report to a file
   * @param {Object} report
   * @returns {Promise<void>}
   */
  async saveReport(report) {
    const filename = `report-${new Date().toISOString().split('T')[0]}.json`;
    await fs.writeFile(filename, JSON.stringify(report, null, 2));
  }
}