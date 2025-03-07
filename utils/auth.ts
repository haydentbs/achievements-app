import { create, verify } from "djwt";
import * as bcrypt from "bcrypt";

// Secret key for JWT signing - in production, use a secure environment variable
const JWT_SECRET = Deno.env.get("JWT_SECRET") || "your-secret-key";
const JWT_ALG = "HS256";
const JWT_EXP = 60 * 60 * 24 * 7; // 7 days

// Create JWT key for signing
const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(JWT_SECRET),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign", "verify"],
);

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

/**
 * Generate a JWT token for a user
 */
export async function generateToken(userId: string): Promise<string> {
  const payload = {
    iss: "milestone-tracker",
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + JWT_EXP,
    iat: Math.floor(Date.now() / 1000),
  };

  return await create({ alg: JWT_ALG, typ: "JWT" }, payload, key);
}

/**
 * Verify a JWT token
 */
export async function verifyToken(token: string): Promise<any> {
  try {
    return await verify(token, key);
  } catch (err) {
    return null;
  }
}

/**
 * Alias for verifyToken to maintain compatibility with existing code
 */
export const verifyJwt = verifyToken;

/**
 * Authentication middleware for Fresh
 */
export async function authMiddleware(req: Request, ctx: any) {
  const authHeader = req.headers.get("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const token = authHeader.split(" ")[1];
  const payload = await verifyToken(token);

  if (!payload) {
    return new Response(
      JSON.stringify({ error: "Invalid token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // Add user ID to context state
  ctx.state = ctx.state || {};
  ctx.state.userId = payload.sub;
  
  return await ctx.next();
}
