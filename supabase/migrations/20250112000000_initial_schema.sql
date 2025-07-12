-- Create morning_entries table
CREATE TABLE IF NOT EXISTS morning_entries (
  id SERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  identity TEXT,
  feeling TEXT,
  action TEXT,
  replace TEXT,
  why_today_matters TEXT,
  starter_action_suggestion_used BOOLEAN DEFAULT FALSE,
  drank_water BOOLEAN DEFAULT FALSE,
  exposed_to_light BOOLEAN DEFAULT FALSE,
  moved_body BOOLEAN DEFAULT FALSE,
  timer_completed BOOLEAN DEFAULT FALSE,
  visualization_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create reflections table
CREATE TABLE IF NOT EXISTS reflections (
  id SERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  well_done TEXT,
  embodied TEXT,
  grateful TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create user_stats table
CREATE TABLE IF NOT EXISTS user_stats (
  id SERIAL PRIMARY KEY,
  current_streak INTEGER DEFAULT 0,
  total_completions INTEGER DEFAULT 0,
  last_completion_date TEXT
);

-- Insert default user stats
INSERT INTO user_stats (id, current_streak, total_completions, last_completion_date) 
VALUES (1, 0, 0, NULL) 
ON CONFLICT (id) DO NOTHING; 