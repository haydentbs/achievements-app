import { query } from "../db/client.ts";
import { hashPassword } from "../utils/auth.ts";

export interface User {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  bio?: string;
  profile_image_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  full_name?: string;
  bio?: string;
  profile_image_url?: string;
}

export interface UpdateUserInput {
  full_name?: string;
  bio?: string;
  profile_image_url?: string;
}

export async function createUser(input: CreateUserInput): Promise<User> {
  const passwordHash = await hashPassword(input.password);
  
  const result = await query(
    `INSERT INTO users (username, email, password_hash, full_name, bio, profile_image_url)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, username, email, full_name, bio, profile_image_url, created_at, updated_at`,
    [
      input.username,
      input.email,
      passwordHash,
      input.full_name || null,
      input.bio || null,
      input.profile_image_url || null,
    ]
  );

  return result.rows[0] as User;
}

export async function getUserById(id: string): Promise<User | null> {
  const result = await query(
    `SELECT id, username, email, full_name, bio, profile_image_url, created_at, updated_at
     FROM users
     WHERE id = $1`,
    [id]
  );

  return result.rows.length ? (result.rows[0] as User) : null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await query(
    `SELECT id, username, email, full_name, bio, profile_image_url, created_at, updated_at
     FROM users
     WHERE email = $1`,
    [email]
  );

  return result.rows.length ? (result.rows[0] as User) : null;
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const result = await query(
    `SELECT id, username, email, full_name, bio, profile_image_url, created_at, updated_at
     FROM users
     WHERE username = $1`,
    [username]
  );

  return result.rows.length ? (result.rows[0] as User) : null;
}

export async function getUserWithPasswordByEmail(email: string): Promise<(User & { password_hash: string }) | null> {
  const result = await query(
    `SELECT id, username, email, password_hash, full_name, bio, profile_image_url, created_at, updated_at
     FROM users
     WHERE email = $1`,
    [email]
  );

  return result.rows.length ? (result.rows[0] as User & { password_hash: string }) : null;
}

export async function updateUser(id: string, input: UpdateUserInput): Promise<User | null> {
  const result = await query(
    `UPDATE users
     SET full_name = COALESCE($1, full_name),
         bio = COALESCE($2, bio),
         profile_image_url = COALESCE($3, profile_image_url),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $4
     RETURNING id, username, email, full_name, bio, profile_image_url, created_at, updated_at`,
    [
      input.full_name || null,
      input.bio || null,
      input.profile_image_url || null,
      id,
    ]
  );

  return result.rows.length ? (result.rows[0] as User) : null;
}
