import { pool } from "./client.ts";
import * as path from "https://deno.land/std@0.177.0/path/mod.ts";

/**
 * Setup the database schema
 */
export async function setupDatabase() {
  const client = await pool.connect();
  
  try {
    console.log("Setting up database schema...");
    
    // Read the schema SQL file
    const schemaPath = path.join(Deno.cwd(), "db", "schema.sql");
    const schemaSql = await Deno.readTextFile(schemaPath);
    
    // Execute the schema SQL
    await client.queryObject(schemaSql);
    
    console.log("Database schema setup complete!");
    return true;
  } catch (error) {
    console.error("Error setting up database schema:", error);
    return false;
  } finally {
    client.release();
  }
}

// Run the setup if this file is executed directly
if (import.meta.main) {
  await setupDatabase();
  Deno.exit(0);
}
