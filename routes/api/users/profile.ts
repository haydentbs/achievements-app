import { Handlers } from "$fresh/server.ts";
import { pool } from "../../../db/client.ts";
import { UpdateUserInput } from "../../../models/user.ts";
import { verifyToken } from "../../../utils/auth.ts";

export const handler: Handlers = {
  async GET(req) {
    // Get the authorization header
    const authHeader = req.headers.get("Authorization") || "";
    const cookie = req.headers.get("Cookie") || "";
    
    try {
      console.log("Profile API - PUT request received");
      console.log("Auth header present:", !!authHeader);
      console.log("Cookie header present:", !!cookie);
      console.log("Profile API - GET request received");
      console.log("Auth header present:", !!authHeader);
      console.log("Cookie header present:", !!cookie);
      // Extract token from cookie (primary) or Authorization header (fallback)
      let token = "";
      
      // First try to get from cookie
      const match = cookie.match(/auth=([^;]+)/);
      if (match) {
        token = match[1];
      } 
      // Fallback to Authorization header
      else if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
      
      if (!token) {
        return new Response(JSON.stringify({ message: "Unauthorized - No valid token found" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      
      // Verify the token
      const payload = await verifyToken(token);
      if (!payload || !payload.sub) {
        return new Response(JSON.stringify({ message: "Invalid token" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      
      const userId = payload.sub;
      
      // Get the user from the database
      const client = await pool.connect();
      try {
        const result = await client.queryObject<{
          id: string;
          username: string;
          email: string;
          full_name: string;
          bio: string;
          profile_image_url: string;
        }>(
          `SELECT id, username, email, full_name, bio, profile_image_url 
           FROM users 
           WHERE id = $1`,
          [userId]
        );
        
        if (result.rowCount === 0) {
          return new Response(JSON.stringify({ message: "User not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }
        
        const user = result.rows[0];
        
        return new Response(JSON.stringify({
          username: user.username,
          email: user.email,
          full_name: user.full_name || "",
          bio: user.bio || "",
          profile_image_url: user.profile_image_url || "",
        }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return new Response(JSON.stringify({ message: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
  
  async PUT(req) {
    // Get the authorization header
    const authHeader = req.headers.get("Authorization") || "";
    const cookie = req.headers.get("Cookie") || "";
    
    try {
      // Extract token from cookie (primary) or Authorization header (fallback)
      let token = "";
      
      // First try to get from cookie
      const match = cookie.match(/auth=([^;]+)/);
      if (match) {
        token = match[1];
      } 
      // Fallback to Authorization header
      else if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
      
      if (!token) {
        return new Response(JSON.stringify({ message: "Unauthorized - No valid token found" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      
      // Verify the token
      const payload = await verifyToken(token);
      if (!payload || !payload.sub) {
        return new Response(JSON.stringify({ message: "Invalid token" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      
      const userId = payload.sub;
      
      // Parse the request body
      const body = await req.json();
      const updateData: UpdateUserInput = {
        full_name: body.full_name,
        bio: body.bio,
        profile_image_url: body.profile_image_url,
      };
      
      // Update the user in the database
      const client = await pool.connect();
      try {
        const result = await client.queryObject<{
          id: string;
          username: string;
          email: string;
          full_name: string;
          bio: string;
          profile_image_url: string;
        }>(
          `UPDATE users 
           SET full_name = $1, bio = $2, profile_image_url = $3
           WHERE id = $4
           RETURNING id, username, email, full_name, bio, profile_image_url`,
          [
            updateData.full_name || null,
            updateData.bio || null,
            updateData.profile_image_url || null,
            userId,
          ]
        );
        
        if (result.rowCount === 0) {
          return new Response(JSON.stringify({ message: "User not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }
        
        const user = result.rows[0];
        
        return new Response(JSON.stringify({
          username: user.username,
          email: user.email,
          full_name: user.full_name || "",
          bio: user.bio || "",
          profile_image_url: user.profile_image_url || "",
        }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      return new Response(JSON.stringify({ message: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
