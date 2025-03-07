import { Handlers } from "$fresh/server.ts";
import { query } from "../../../db/client.ts";

export const handler: Handlers = {
  async GET(req) {
    try {
      const users = await query("SELECT * FROM users");
      const goals = await query("SELECT * FROM goals");
      const milestones = await query("SELECT * FROM milestones");
      const badges = await query("SELECT * FROM badges");
      const userBadges = await query("SELECT * FROM user_badges");
      const likes = await query("SELECT * FROM likes");
      const comments = await query("SELECT * FROM comments");
      const follows = await query("SELECT * FROM follows");
      const notifications = await query("SELECT * FROM notifications");
      const tags = await query("SELECT * FROM tags");

      return new Response(
        JSON.stringify({
          users: users.rows,
          goals: goals.rows,
          milestones: milestones.rows,
          badges: badges.rows,
          userBadges: userBadges.rows,
          likes: likes.rows,
          comments: comments.rows,
          follows: follows.rows,
          notifications: notifications.rows,
          tags: tags.rows,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error fetching database data:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch database data" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
};
