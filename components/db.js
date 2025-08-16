// db.js (Expo SDK 50/51+ async API; no legacy)
import { openDatabaseAsync } from 'expo-sqlite';

// cache a single async DB handle
let dbPromise;
function getDB() {
  if (!dbPromise) dbPromise = openDatabaseAsync('swimcare.db'); // fix typo from "swiimcare"
  return dbPromise;
}

// call once on app start (e.g., in a root useEffect)
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
      uri TEXT NOT NULL,
      createdAt TEXT DEFAULT (datetime('now')),
      note TEXT
    );
  `);
}

// save a photo reference (string URI) + metadata
export async function addPhoto({ uri, createdAt, note = null }) {
  const db = await getDB();
  const ts = createdAt ?? new Date().toISOString();
  await db.runAsync(
    `INSERT INTO pool_data (uri, createdAt, note) VALUES (?, ?, ?)`,
    [uri, ts, note]
  );
}

// fetch photos (newest first)
export async function getPhotos() {
  const db = await getDB();
  // datetime(createdAt) handles both DEFAULT and ISO strings
  const rows = await db.getAllAsync(
    `SELECT * FROM pool_data ORDER BY datetime(createdAt) DESC`
  );
  return rows; // -> [{ id, uri, createdAt, ... }]
}

// delete one (don’t forget to also delete the file via FileSystem.deleteAsync(uri))
export async function deletePhoto(id) {
  const db = await getDB();
  await db.runAsync(`DELETE FROM pool_data WHERE id = ?`, [id]);
}
