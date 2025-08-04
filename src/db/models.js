// filepath: src/db/models.js
const db = require('./index');
db.prepare(`CREATE TABLE IF NOT EXISTS radar_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message TEXT,
  received_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`).run();

function saveRadarData(message) {
  db.prepare('INSERT INTO radar_data (message) VALUES (?)').run(message);
}

module.exports = { saveRadarData };