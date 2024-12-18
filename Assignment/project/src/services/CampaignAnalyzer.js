import { calculateCTR, calculateROAS, calculateCPA } from '../utils/metrics.js';
import { subDays, isWithinInterval } from 'date-fns';

export class CampaignAnalyzer {
  /**
   * Analyze campaign performance and determine required actions
   * @param {Campaign[]} campaigns
   * @returns {Object} Analysis results and recommendations
   */
  analyzeCampaign(campaigns) {
    const today = new Date();
    const last3Days = campaigns.filter(c => 
      isWithinInterval(c.date, {
        start: subDays(today, 3),
        end: today
      })
    );

    const metrics = {
      ctr: calculateCTR(
        last3Days.reduce((sum, c) => sum + c.clicks, 0),
        last3Days.reduce((sum, c) => sum + c.impressions, 0)
      ),
      roas: calculateROAS(
        last3Days.reduce((sum, c) => sum + c.revenue, 0),
        last3Days.reduce((sum, c) => sum + c.spend, 0)
      ),
      cpa: calculateCPA(
        last3Days.reduce((sum, c) => sum + c.spend, 0),
        last3Days.reduce((sum, c) => sum + c.conversions, 0)
      )
    };

    return this.generateRecommendations(metrics);
  }

  /**
   * Generate recommendations based on campaign metrics
   * @param {Object} metrics
   * @returns {Object} Recommendations
   */
  generateRecommendations(metrics) {
    const recommendations = {
      action: null,
      reason: '',
      budgetChange: 0
    };

    if (metrics.ctr < 1) {
      recommendations.action = 'PAUSE';
      recommendations.reason = 'CTR below 1% threshold';
    } else if (metrics.roas > 4) {
      recommendations.action = 'INCREASE_BUDGET';
      recommendations.budgetChange = 0.2; // 20% increase
      recommendations.reason = 'High ROAS performance';
    } else if (metrics.roas < 1.5) {
      recommendations.action = 'DECREASE_BUDGET';
      recommendations.budgetChange = -0.15; // 15% decrease
      recommendations.reason = 'Low ROAS performance';
    }

    return recommendations;
  }
}