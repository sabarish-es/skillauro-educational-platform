import mysql from 'mysql2/promise';

// MySQL Connection Pool Configuration
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'skillauro_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
});

// Helper function to execute queries
export async function executeQuery(sql: string, values?: any[]) {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(sql, values || []);
    return results;
  } finally {
    connection.release();
  }
}

// Helper function to get single row
export async function getOne(sql: string, values?: any[]) {
  const results = await executeQuery(sql, values);
  return (results as any[])[0] || null;
}

// Helper function to get all rows
export async function getAll(sql: string, values?: any[]) {
  return executeQuery(sql, values);
}

// Helper function to insert
export async function insert(table: string, data: Record<string, any>) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(',');
  const sql = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${placeholders})`;
  return executeQuery(sql, values);
}

// Helper function to update
export async function update(
  table: string,
  data: Record<string, any>,
  whereClause: string
) {
  const setClause = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(',');
  const values = [...Object.values(data)];
  const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
  return executeQuery(sql, values);
}

// Helper function to delete
export async function deleteRecord(table: string, whereClause: string) {
  const sql = `DELETE FROM ${table} WHERE ${whereClause}`;
  return executeQuery(sql);
}
