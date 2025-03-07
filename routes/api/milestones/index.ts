import { Handlers } from "$fresh/server.ts";
import { authMiddleware } from "../../../utils/auth.ts";
import { createMilestone, getMilestonesByUserId, getPublicMilestones } from "../../../models/milestone.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      // Check for authentication
      const authHeader = req.headers.get("Authorization");
      let userId = null;
      
      if (authHeader && authHeader.startsWith("Bearer ")) {
        // If authenticated, get user's milestones
        const authResult = await authMiddleware(req, {
          next: async () => {},
          state: {}
        });
        
        if (!(authResult instanceof Response)) {
          userId = ctx.state.userId;
        }
      }
      
      // Parse query parameters
      const url = new URL(req.url);
      const limit = parseInt(url.searchParams.get("limit") || "20");
      const offset = parseInt(url.searchParams.get("offset") || "0");
      
      let milestones;
      
      if (userId) {
        // Get user's milestones if authenticated
        milestones = await getMilestonesByUserId(userId);
      } else {
        // Otherwise get public milestones
        milestones = await getPublicMilestones(limit, offset);
      }
      
      return new Response(
        JSON.stringify({ milestones }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error fetching milestones:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch milestones" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
  
  async POST(req, ctx) {
    try {
      // Authenticate user
      const authResult = await authMiddleware(req, {
        next: async () => {},
        state: {}
      });
      
      if (authResult instanceof Response) {
        return authResult;
      }
      
      const userId = ctx.state.userId;
      const body = await req.json();
      
      // Validate required fields
      if (!body.title || !body.category || !body.achievement_date) {
        return new Response(
          JSON.stringify({ error: "Title, category, and achievement date are required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      
      // Create milestone
      const milestone = await createMilestone({
        user_id: userId,
        goal_id: body.goal_id,
        title: body.title,
        description: body.description,
        category: body.category,
        achievement_date: new Date(body.achievement_date),
        is_public: body.is_public,
      });
      
      return new Response(
        JSON.stringify({ milestone }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error creating milestone:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create milestone" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
};
