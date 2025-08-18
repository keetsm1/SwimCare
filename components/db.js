// db.js (Expo SDK 50/51+ async API; no legacy)
import { openDatabaseAsync } from 'expo-sqlite';

// cache a single async DB handle
let dbPromise;
function getDB() {
  if (!dbPromise) dbPromise = openDatabaseAsync('swimcare.db');
  return dbPromise;
}

export async function initDB() {
  const db = await getDB();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS pool_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      salt REAL,
      chlorine REAL,
      ph REAL,
      cyanuric REAL,
      alkalinity REAL,
      uri TEXT,
      createdAt TEXT DEFAULT (datetime('now')) -- 🔵 removed note column
    );
  `);
}

// 🔵 addEntry simplified (no note anymore)
export async function addEntry({
  salt = null,
  chlorine = null,
  ph = null,
  cyanuric = null,
  alkalinity = null,
  uri,                // required
  createdAt,          // optional ISO; defaults to now()
}) {
  const db = await getDB();
  const ts = createdAt ?? new Date().toISOString();
  await db.runAsync(
    `INSERT INTO pool_data
      (salt, chlorine, ph, cyanuric, alkalinity, uri, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [salt, chlorine, ph, cyanuric, alkalinity, uri, ts] // 🔵 no note arg
  );
}

export async function getEntries() {
  const db = await getDB();
  return db.getAllAsync(
    `SELECT * FROM pool_data ORDER BY datetime(createdAt) DESC`
  );
}

export async function deletePhoto(id) {
  const db = await getDB();
  await db.runAsync(`DELETE FROM pool_data WHERE id = ?`, [id]);
}
