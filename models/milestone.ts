import { query } from "../db/client.ts";

export interface Milestone {
  id: string;
  user_id: string;
  goal_id?: string;
  title: string;
  description?: string;
  category: string;
  achievement_date: Date;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateMilestoneInput {
  user_id: string;
  goal_id?: string;
  title: string;
  description?: string;
  category: string;
  achievement_date: Date;
  is_public?: boolean;
}

export interface UpdateMilestoneInput {
  title?: string;
  description?: string;
  category?: string;
  achievement_date?: Date;
  is_public?: boolean;
  goal_id?: string | null;
}

export async function createMilestone(input: CreateMilestoneInput): Promise<Milestone> {
  const result = await query(
    `INSERT INTO milestones (user_id, goal_id, title, description, category, achievement_date, is_public)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, user_id, goal_id, title, description, category, achievement_date, is_public, created_at, updated_at`,
    [
      input.user_id,
      input.goal_id || null,
      input.title,
      input.description || null,
      input.category,
      input.achievement_date,
      input.is_public !== undefined ? input.is_public : false,
    ]
  );

  return result.rows[0] as Milestone;
}

export async function getMilestoneById(id: string): Promise<Milestone | null> {
  const result = await query(
    `SELECT id, user_id, goal_id, title, description, category, achievement_date, is_public, created_at, updated_at
     FROM milestones
     WHERE id = $1`,
    [id]
  );

  return result.rows.length ? (result.rows[0] as Milestone) : null;
}

export async function getMilestonesByUserId(userId: string): Promise<Milestone[]> {
  const result = await query(
    `SELECT id, user_id, goal_id, title, description, category, achievement_date, is_public, created_at, updated_at
     FROM milestones
     WHERE user_id = $1
     ORDER BY achievement_date DESC`,
    [userId]
  );

  return result.rows as Milestone[];
}

export async function getMilestonesByGoalId(goalId: string): Promise<Milestone[]> {
  const result = await query(
    `SELECT id, user_id, goal_id, title, description, category, achievement_date, is_public, created_at, updated_at
     FROM milestones
     WHERE goal_id = $1
     ORDER BY achievement_date DESC`,
    [goalId]
  );

  return result.rows as Milestone[];
}

export async function getPublicMilestones(limit = 20, offset = 0): Promise<Milestone[]> {
  const result = await query(
    `SELECT id, user_id, goal_id, title, description, category, achievement_date, is_public, created_at, updated_at
     FROM milestones
     WHERE is_public = true
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  return result.rows as Milestone[];
}

export async function updateMilestone(id: string, input: UpdateMilestoneInput): Promise<Milestone | null> {
  const result = await query(
    `UPDATE milestones
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         category = COALESCE($3, category),
         achievement_date = COALESCE($4, achievement_date),
         is_public = COALESCE($5, is_public),
         goal_id = $6,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $7
     RETURNING id, user_id, goal_id, title, description, category, achievement_date, is_public, created_at, updated_at`,
    [
      input.title || null,
      input.description !== undefined ? input.description : null,
      input.category || null,
      input.achievement_date || null,
      input.is_public !== undefined ? input.is_public : null,
      input.goal_id === null ? null : (input.goal_id || null),
      id,
    ]
  );

  return result.rows.length ? (result.rows[0] as Milestone) : null;
}

export async function deleteMilestone(id: string): Promise<boolean> {
  const result = await query(
    `DELETE FROM milestones
     WHERE id = $1
     RETURNING id`,
    [id]
  );

  return result.rows.length > 0;
}

export async function getMilestoneWithStats(id: string): Promise<any | null> {
  const result = await query(
    `SELECT m.id, m.user_id, m.goal_id, m.title, m.description, m.category, 
            m.achievement_date, m.is_public, m.created_at, m.updated_at,
            u.username as author,
            COUNT(DISTINCT l.id) as likes_count,
            COUNT(DISTINCT c.id) as comments_count
     FROM milestones m
     JOIN users u ON m.user_id = u.id
     LEFT JOIN likes l ON m.id = l.milestone_id
     LEFT JOIN comments c ON m.id = c.milestone_id
     WHERE m.id = $1
     GROUP BY m.id, u.username`,
    [id]
  );

  return result.rows.length ? result.rows[0] : null;
}
