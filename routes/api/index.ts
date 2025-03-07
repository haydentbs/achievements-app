import { Handlers } from "$fresh/server.ts";
import * as db from "./db/index.ts"; // Import the new db route

export const handler: Handlers = {
  ...db.handler, // Add the db route to the existing handlers
};
