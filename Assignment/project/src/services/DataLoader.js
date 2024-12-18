import { parse } from 'csv-parse';
import fs from 'fs/promises';

export class DataLoader {
  /**
   * Load campaign data from CSV file
   * @param {string} filePath
   * @returns {Promise<Campaign[]>}
   */
  async loadFromCSV(filePath) {
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return new Promise((resolve, reject) => {
        parse(fileContent, {
          columns: true,
          cast: true,
          castDate: true
        }, (err, records) => {
          if (err) reject(err);
          resolve(records);
        });
      });
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`Campaign data file not found: ${filePath}. Please ensure the file exists.`);
      }
      throw error;
    }
  }
}