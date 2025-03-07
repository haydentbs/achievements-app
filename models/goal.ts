import { query } from "../db/client.ts";

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: string;
  status: 'in_progress' | 'completed' | 'abandoned';
  target_date?: Date;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateGoalInput {
  user_id: string;
  title: string;
  description?: string;
  category: string;
  status?: 'in_progress' | 'completed' | 'abandoned';
  target_date?: Date;
  is_public?: boolean;
}

export interface UpdateGoalInput {
  title?: string;
  description?: string;
  category?: string;
  status?: 'in_progress' | 'completed' | 'abandoned';
  target_date?: Date | null;
  is_public?: boolean;
}

export async function createGoal(input: CreateGoalInput): Promise<Goal> {
  const result = await query(
    `INSERT INTO goals (user_id, title, description, category, status, target_date, is_public)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, user_id, title, description, category, status, target_date, is_public, created_at, updated_at`,
    [
      input.user_id,
      input.title,
      input.description || null,
      input.category,
      input.status || 'in_progress',
      input.target_date || null,
      input.is_public !== undefined ? input.is_public : false,
    ]
  );

  return result.rows[0] as Goal;
}

export async function getGoalById(id: string): Promise<Goal | null> {
  const result = await query(
    `SELECT id, user_id, title, description, category, status, target_date, is_public, created_at, updated_at
     FROM goals
     WHERE id = $1`,
    [id]
  );

  return result.rows.length ? (result.rows[0] as Goal) : null;
}

export async function getGoalsByUserId(userId: string): Promise<Goal[]> {
  const result = await query(
    `SELECT id, user_id, title, description, category, status, target_date, is_public, created_at, updated_at
     FROM goals
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows as Goal[];
}

export async function updateGoal(id: string, input: UpdateGoalInput): Promise<Goal | null> {
  const result = await query(
    `UPDATE goals
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         category = COALESCE($3, category),
         status = COALESCE($4, status),
         target_date = $5,
         is_public = COALESCE($6, is_public),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $7
     RETURNING id, user_id, title, description, category, status, target_date, is_public, created_at, updated_at`,
    [
      input.title || null,
      input.description !== undefined ? input.description : null,
      input.category || null,
      input.status || null,
      input.target_date === null ? null : (input.target_date || null),
      input.is_public !== undefined ? input.is_public : null,
      id,
    ]
  );

  return result.rows.length ? (result.rows[0] as Goal) : null;
}

export async function deleteGoal(id: string): Promise<boolean> {
  const result = await query(
    `DELETE FROM goals
     WHERE id = $1
     RETURNING id`,
    [id]
  );

  return result.rows.length > 0;
}
