import { DataLoader } from './services/DataLoader.js';
import { CampaignAnalyzer } from './services/CampaignAnalyzer.js';
import { AIInsightGenerator } from './services/AIInsightGenerator.js';
import { ReportGenerator } from './services/ReportGenerator.js';
import fs from 'fs/promises';

async function ensureDirectoryExists(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function main() {
  try {
    // Ensure required directories exist
    await ensureDirectoryExists('data');
    
    // Initialize services
    const dataLoader = new DataLoader();
    const campaignAnalyzer = new CampaignAnalyzer();
    const aiInsightGenerator = new AIInsightGenerator();
    const reportGenerator = new ReportGenerator();

    // Load campaign data
    const campaigns = await dataLoader.loadFromCSV('data/campaigns.csv');

    // Analyze campaigns
    const recommendations = campaignAnalyzer.analyzeCampaign(campaigns);

    // Generate AI insights
    const aiInsights = await aiInsightGenerator.generateInsights(campaigns);

    // Generate and save report
    await reportGenerator.generateReport(campaigns, recommendations, aiInsights);

    console.log('Marketing automation analysis completed successfully!');
  } catch (error) {
    console.error('Error in marketing automation:', error.message);
    if (error.message.includes('OpenAI API key')) {
      console.error('Please add your OpenAI API key to the .env file.');
    } else if (error.message.includes('not found')) {
      console.error('Please ensure all required files are present in the correct locations.');
    }
    process.exit(1);
  }
}

main();