import { Pool } from "postgres";

// Initialize the connection pool
const POOL_CONNECTIONS = 20;
const connectionPool = new Pool({
  hostname: Deno.env.get("DB_HOST") || "localhost",
  database: Deno.env.get("DB_NAME") || "milestone_tracker",
  user: Deno.env.get("DB_USER") || "postgres",
  password: Deno.env.get("DB_PASSWORD") || "postgres",
  port: Number(Deno.env.get("DB_PORT")) || 5432,
}, POOL_CONNECTIONS);

export const pool = connectionPool;

/**
 * Execute a query with parameters
 */
export async function query(text: string, params: any[] = []) {
  const client = await pool.connect();
  try {
    return await client.queryObject(text, params);
  } finally {
    client.release();
  }
}

/**
 * Execute a transaction with multiple queries
 */
export async function transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.queryObject("BEGIN");
    const result = await callback(client);
    await client.queryObject("COMMIT");
    return result;
  } catch (e) {
    await client.queryObject("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
