const fs = require('fs').promises;
const path = require('path');

// Data directory path
const DATA_DIR = path.join(__dirname, '../data');

/**
 * Ensure data directory exists
 */
const ensureDataDir = async () => {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
};

/**
 * Read data from JSON file
 * @param {string} filename - Name of the JSON file
 * @returns {Array|Object} - Parsed JSON data
 */
const readData = async (filename) => {
  try {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, return empty array/object
      return filename.endsWith('.json') ? [] : {};
    }
    throw error;
  }
};

/**
 * Write data to JSON file
 * @param {string} filename - Name of the JSON file
 * @param {any} data - Data to write
 */
const writeData = async (filename, data) => {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

/**
 * Generate unique ID for new items
 * @returns {string} - Unique ID
 */
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Find item by ID in array
 * @param {Array} array - Array to search in
 * @param {string} id - ID to find
 * @returns {Object|null} - Found item or null
 */
const findById = (array, id) => {
  return array.find(item => item.id === id) || null;
};

/**
 * Update item by ID in array
 * @param {Array} array - Array to update
 * @param {string} id - ID of item to update
 * @param {Object} updates - Updates to apply
 * @returns {Array} - Updated array
 */
const updateById = (array, id, updates) => {
  return array.map(item => 
    item.id === id ? { ...item, ...updates } : item
  );
};

/**
 * Delete item by ID from array
 * @param {Array} array - Array to delete from
 * @param {string} id - ID of item to delete
 * @returns {Array} - Array without deleted item
 */
const deleteById = (array, id) => {
  return array.filter(item => item.id !== id);
};

module.exports = {
  readData,
  writeData,
  generateId,
  findById,
  updateById,
  deleteById,
  DATA_DIR
};

