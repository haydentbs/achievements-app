import { Handlers } from "$fresh/server.ts";
import { pool } from "../../../db/client.ts";
import { verifyJwt } from "../../../utils/auth.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

export const handler: Handlers = {
  async PUT(req) {
    // Get the authorization header
    const authHeader = req.headers.get("Authorization") || "";
    const cookie = req.headers.get("Cookie") || "";
    
    try {
      // Extract token from Authorization header or cookie
      let token = "";
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      } else {
        // Try to get from cookie
        const match = cookie.match(/auth=([^;]+)/);
        if (match) {
          token = match[1];
        }
      }
      
      if (!token) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      
      // Verify the token
      const payload = await verifyJwt(token);
      if (!payload || !payload.sub) {
        return new Response(JSON.stringify({ message: "Invalid token" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      
      const userId = payload.sub;
      
      // Parse the request body
      const body = await req.json();
      const { currentPassword, newPassword } = body;
      
      if (!currentPassword || !newPassword) {
        return new Response(JSON.stringify({ message: "Current password and new password are required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      
      if (newPassword.length < 8) {
        return new Response(JSON.stringify({ message: "New password must be at least 8 characters long" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      
      // Get the user from the database
      const client = await pool.connect();
      try {
        // First, get the current password hash
        const userResult = await client.queryObject<{ password_hash: string }>(
          `SELECT password_hash FROM users WHERE id = $1`,
          [userId]
        );
        
        if (userResult.rowCount === 0) {
          return new Response(JSON.stringify({ message: "User not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }
        
        const storedHash = userResult.rows[0].password_hash;
        
        // Verify the current password
        const isPasswordValid = await bcrypt.compare(currentPassword, storedHash);
        if (!isPasswordValid) {
          return new Response(JSON.stringify({ message: "Current password is incorrect" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
        
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const newPasswordHash = await bcrypt.hash(newPassword, salt);
        
        // Update the password in the database
        await client.queryObject(
          `UPDATE users SET password_hash = $1 WHERE id = $2`,
          [newPasswordHash, userId]
        );
        
        return new Response(JSON.stringify({ message: "Password updated successfully" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error("Error changing password:", error);
      return new Response(JSON.stringify({ message: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
