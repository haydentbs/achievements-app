import { Handlers } from "$fresh/server.ts";
import { getUserWithPasswordByEmail } from "../../../models/user.ts";
import { generateToken, verifyPassword } from "../../../utils/auth.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const body = await req.json();
      
      // Validate required fields
      if (!body.email || !body.password) {
        return new Response(
          JSON.stringify({ error: "Email and password are required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      
      // Get user by email with password hash
      const user = await getUserWithPasswordByEmail(body.email);
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Invalid email or password" }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }
      
      // Verify password
      const isPasswordValid = await verifyPassword(body.password, user.password_hash);
      if (!isPasswordValid) {
        return new Response(
          JSON.stringify({ error: "Invalid email or password" }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }
      
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
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Login error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to login" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
};
