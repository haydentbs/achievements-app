import { Handlers } from "$fresh/server.ts";
import { createUser, getUserByEmail, getUserByUsername } from "../../../models/user.ts";
import { generateToken } from "../../../utils/auth.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const body = await req.json();
      
      // Validate required fields
      if (!body.username || !body.email || !body.password) {
        return new Response(
          JSON.stringify({ error: "Username, email, and password are required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      
      // Check if username or email already exists
      const existingUserByEmail = await getUserByEmail(body.email);
      if (existingUserByEmail) {
        return new Response(
          JSON.stringify({ error: "Email already in use" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      
      const existingUserByUsername = await getUserByUsername(body.username);
      if (existingUserByUsername) {
        return new Response(
          JSON.stringify({ error: "Username already taken" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      
      // Create user
      const user = await createUser({
        username: body.username,
        email: body.email,
        password: body.password,
        full_name: body.full_name,
        bio: body.bio,
        profile_image_url: body.profile_image_url,
      });
      
      // Generate JWT token
      const token = await generateToken(user.id);
      
      return new Response(
        JSON.stringify({
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            full_name: user.full_name,
            bio: user.bio,
            profile_image_url: user.profile_image_url,
          },
          token,
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Registration error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to register user" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
};
