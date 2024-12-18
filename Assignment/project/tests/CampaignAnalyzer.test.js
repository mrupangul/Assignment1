import { expect, test, describe } from 'vitest';
import { CampaignAnalyzer } from '../src/services/CampaignAnalyzer.js';

describe('CampaignAnalyzer', () => {
  const analyzer = new CampaignAnalyzer();

  test('should recommend pausing campaign with low CTR', () => {
    const campaigns = [{
      date: new Date(),
      impressions: 10000,
      clicks: 50, // 0.5% CTR
      conversions: 10,
      spend: 1000,
      revenue: 2000
    }];

    const result = analyzer.analyzeCampaign(campaigns);
    expect(result.action).toBe('PAUSE');
  });

  test('should recommend increasing budget for high ROAS', () => {
    const campaigns = [{
      date: new Date(),
      impressions: 10000,
      clicks: 500,
      conversions: 100,
      spend: 1000,
      revenue: 5000 // ROAS = 5
    }];

    const result = analyzer.analyzeCampaign(campaigns);
    expect(result.action).toBe('INCREASE_BUDGET');
  });
});