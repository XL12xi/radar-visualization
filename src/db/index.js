// 初始化连接
// filepath: src/db/index.js
const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../../db/radar.db'));
module.exports = db;