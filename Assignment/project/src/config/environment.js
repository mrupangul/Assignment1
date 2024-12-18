import dotenv from 'dotenv';
import { validateApiKey } from '../utils/validation.js';

// Load environment variables
dotenv.config();

/**
 * Get and validate environment configuration
 * @returns {Object} Validated configuration object
 * @throws {Error} If required configuration is missing or invalid
 */
export function getConfig() {
  const config = {
    openai: {
      apiKey: process.env.OPENAI_API_KEY
    },
    paths: {
      data: 'data',
      reports: 'reports'
    }
  };

  validateConfig(config);
  return config;
}

/**
 * Validate configuration values
 * @param {Object} config
 * @throws {Error} If configuration is invalid
 */
function validateConfig(config) {
  if (!config.openai.apiKey) {
    throw new Error(
      'OpenAI API key is missing. Please add OPENAI_API_KEY to your .env file.\n' +
      'You can get your API key from https://platform.openai.com/account/api-keys'
    );
  }

  if (!validateApiKey(config.openai.apiKey)) {
    throw new Error(
      'Invalid OpenAI API key format. The key should start with "sk-" followed by a string of characters.\n' +
      'Please check your API key at https://platform.openai.com/account/api-keys'
    );
  }
}