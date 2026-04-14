import mysql, { type ResultSetHeader, type RowDataPacket } from "mysql2/promise";

const requiredEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} must be set`);
  }
  return value;
};

const port = Number(requiredEnv("MYSQL_PORT"));

if (Number.isNaN(port) || port <= 0) {
  throw new Error("Invalid MYSQL_PORT value: " + process.env.MYSQL_PORT);
}

export const pool = mysql.createPool({
  host: requiredEnv("MYSQL_HOST"),
  user: requiredEnv("MYSQL_USER"),
  password: requiredEnv("MYSQL_PASSWORD"),
  database: requiredEnv("MYSQL_DATABASE"),
  port,
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true,
});

export async function queryRows<T extends RowDataPacket>(sql: string, params: unknown[] = []): Promise<T[]> {
  const [rows] = await pool.query<T[]>(sql, params);
  return rows;
}

export async function execute(sql: string, params: unknown[] = []): Promise<ResultSetHeader> {
  const [result] = await pool.execute<ResultSetHeader>(sql, params);
  return result;
}
