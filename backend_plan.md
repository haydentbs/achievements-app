# MilestoneTracker Backend Planning

## Database Schema Design

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  bio TEXT,
  profile_image_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Goals Table
```sql
CREATE TABLE goals (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'in_progress', -- in_progress, completed, abandoned
  target_date DATE,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_goals_user_id ON goals(user_id);
```

### Milestones Table
```sql
CREATE TABLE milestones (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  goal_id UUID REFERENCES goals(id) ON DELETE SET NULL, -- Optional association with a goal
  title VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  achievement_date DATE NOT NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_milestones_user_id ON milestones(user_id);
CREATE INDEX idx_milestones_goal_id ON milestones(goal_id);
```

### Badges Table
```sql
CREATE TABLE badges (
  id UUID PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  criteria TEXT NOT NULL, -- Description of how to earn this badge
  category VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### User_Badges Table
```sql
CREATE TABLE user_badges (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
```

### Likes Table
```sql
CREATE TABLE likes (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, milestone_id)
);

CREATE INDEX idx_likes_milestone_id ON likes(milestone_id);
```

### Comments Table
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comments_milestone_id ON comments(milestone_id);
```

### Follows Table
```sql
CREATE TABLE follows (
  id UUID PRIMARY KEY,
  follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(follower_id, following_id)
);

CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);
```

### Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- like, comment, follow, badge_earned, etc.
  content TEXT NOT NULL,
  related_id UUID, -- ID of the related entity (milestone, comment, etc.)
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
```

### Tags Table
```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Milestone_Tags Table
```sql
CREATE TABLE milestone_tags (
  milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (milestone_id, tag_id)
);

CREATE INDEX idx_milestone_tags_tag_id ON milestone_tags(tag_id);
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and get JWT token
- POST /api/auth/refresh - Refresh JWT token
- POST /api/auth/logout - Logout (invalidate token)
- GET /api/auth/me - Get current user info

### Users
- GET /api/users - Get list of users (with pagination)
- GET /api/users/:id - Get user profile
- PUT /api/users/:id - Update user profile
- GET /api/users/:id/followers - Get user followers
- GET /api/users/:id/following - Get users being followed
- POST /api/users/:id/follow - Follow a user
- DELETE /api/users/:id/follow - Unfollow a user

### Goals
- GET /api/goals - Get current user's goals
- POST /api/goals - Create a new goal
- GET /api/goals/:id - Get a specific goal
- PUT /api/goals/:id - Update a goal
- DELETE /api/goals/:id - Delete a goal
- GET /api/goals/:id/milestones - Get milestones for a goal

### Milestones
- GET /api/milestones - Get current user's milestones
- POST /api/milestones - Create a new milestone
- GET /api/milestones/:id - Get a specific milestone
- PUT /api/milestones/:id - Update a milestone
- DELETE /api/milestones/:id - Delete a milestone
- POST /api/milestones/:id/like - Like a milestone
- DELETE /api/milestones/:id/like - Unlike a milestone
- GET /api/milestones/:id/comments - Get comments for a milestone
- POST /api/milestones/:id/comments - Add a comment to a milestone

### Feed
- GET /api/feed - Get personalized feed of milestones
- GET /api/feed/following - Get feed of followed users' milestones
- GET /api/feed/trending - Get trending milestones

### Badges
- GET /api/badges - Get all available badges
- GET /api/users/:id/badges - Get badges earned by a user

### Notifications
- GET /api/notifications - Get current user's notifications
- PUT /api/notifications/:id/read - Mark notification as read
- PUT /api/notifications/read-all - Mark all notifications as read

## Future-Proofing Considerations

### Scalability
- Implement database sharding for users table based on user_id
- Consider NoSQL solutions for feed generation and storage
- Implement caching layer (Redis) for frequently accessed data
- Design for horizontal scaling of API servers

### Analytics
```sql
CREATE TABLE user_activity_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action_type VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  metadata JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_activity_logs_user_id ON user_activity_logs(user_id);
CREATE INDEX idx_user_activity_logs_created_at ON user_activity_logs(created_at);
```

### Future Features

#### Milestone Streaks
```sql
CREATE TABLE streaks (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  current_count INTEGER DEFAULT 1,
  longest_count INTEGER DEFAULT 1,
  last_milestone_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, category)
);
```

#### Challenges
```sql
CREATE TABLE challenges (
  id UUID PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE challenge_participants (
  challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active', -- active, completed, dropped
  PRIMARY KEY (challenge_id, user_id)
);
```

#### Groups
```sql
CREATE TABLE groups (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  is_private BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE group_members (
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL DEFAULT 'member', -- admin, moderator, member
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (group_id, user_id)
);
```

#### Milestone Templates
```sql
CREATE TABLE milestone_templates (
  id UUID PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_public BOOLEAN DEFAULT true,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Security Considerations

- Implement rate limiting on all API endpoints
- Store password hashes using bcrypt with appropriate work factor
- Implement JWT with short expiration and refresh token rotation
- Use prepared statements for all database queries to prevent SQL injection
- Implement CORS policies to restrict API access to trusted domains
- Add request validation middleware for all API endpoints
- Implement audit logging for sensitive operations

## Performance Optimization

- Add database indexes for frequently queried columns
- Implement query caching for feed generation
- Use connection pooling for database connections
- Implement pagination for all list endpoints
- Consider materialized views for complex aggregations
- Implement background processing for non-critical operations

## Deployment Considerations

- Use database migrations for schema changes
- Implement blue-green deployment strategy
- Set up database backups and point-in-time recovery
- Configure monitoring and alerting for API and database performance
- Implement CI/CD pipeline for automated testing and deployment
