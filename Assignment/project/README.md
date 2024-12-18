# AI Marketing Automation System

An intelligent system for automating marketing campaign optimization using AI-powered insights and data analysis.

## Features

- Campaign performance analysis
- Automated decision-making for budget optimization
- AI-powered insights using OpenAI GPT
- Detailed reporting and visualization
- Scalable and modular architecture

## Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create a .env file with your OpenAI API key:
\`\`\`
OPENAI_API_KEY=your_api_key_here
\`\`\`

**Important**: Replace `your_api_key_here` with your actual OpenAI API key. You can get your API key from [OpenAI's API Keys page](https://platform.openai.com/account/api-keys).

3. Place your campaign data in `data/campaigns.csv`

## Usage

Run the automation system:
\`\`\`bash
npm start
\`\`\`

Run tests:
\`\`\`bash
npm test
\`\`\`

## Architecture

The system is built with a modular architecture:

- `DataLoader`: Handles data ingestion from various sources
- `CampaignAnalyzer`: Processes campaign data and generates recommendations
- `AIInsightGenerator`: Generates AI-powered insights using OpenAI
- `ReportGenerator`: Creates detailed performance reports
- `Config`: Manages environment configuration and validation
- `Utils`: Contains shared utilities for metrics and validation

## Error Handling

The system includes comprehensive error handling for:
- Invalid or missing API keys
- Data validation issues
- API rate limits and errors
- File system operations

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request