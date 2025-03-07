import { Handlers } from "$fresh/server.ts";
import db from "./db/index.ts"; // Import the new db route

export const handler: Handlers = {
  ...db, // Add the db route to the existing handlers
};
