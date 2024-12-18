import OpenAI from 'openai';
import { getConfig } from '../config/environment.js';
import { calculateCTR, calculateROAS, calculateCPA } from '../utils/metrics.js';

export class AIInsightGenerator {
  constructor() {
    const config = getConfig();
    this.openai = new OpenAI({
      apiKey: config.openai.apiKey
    });
  }

  /**
   * Generate AI-powered insights for campaign optimization
   * @param {Campaign[]} campaigns
   * @returns {Promise<string>}
   */
  async generateInsights(campaigns) {
    const prompt = this.createInsightPrompt(campaigns);
    
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: "You are a marketing analytics expert. Analyze the campaign data and provide actionable insights."
        }, {
          role: "user",
          content: prompt
        }],
        temperature: 0.7,
        max_tokens: 500
      });

      return completion.choices[0].message.content;
    } catch (error) {
      if (error.status === 401) {
        throw new Error(
          'Invalid OpenAI API key. Please check your API key at https://platform.openai.com/account/api-keys'
        );
      }
      throw error;
    }
  }

  /**
   * Create a prompt for the AI model based on campaign data
   * @param {Campaign[]} campaigns
   * @returns {string}
   */
  createInsightPrompt(campaigns) {
    const campaignMetrics = campaigns.map(c => ({
      ctr: calculateCTR(c.clicks, c.impressions),
      roas: calculateROAS(c.revenue, c.spend),
      cpa: calculateCPA(c.spend, c.conversions)
    }));

    return `Analyze the following campaign metrics and provide optimization recommendations:
      ${JSON.stringify(campaignMetrics, null, 2)}
      
      Please provide:
      1. Key trends and patterns
      2. Optimization opportunities
      3. Specific recommendations for improvement`;
  }
}