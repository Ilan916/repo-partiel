const fs = require('fs');
const path = require('path');
const databasePath = path.join(__dirname, '../data/database.json');

const getDatabase = () => {
  try {
    const data = fs.readFileSync(databasePath);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database file:', error);
    throw error;
  }
};

exports.getAllMembers = (req, res) => {
  try {
    const data = getDatabase();
    res.json(data.members);
  } catch (error) {
    console.error('Error in getAllMembers:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des adhérents.' });
  }
};
