-- Users table
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  name text,
  email text unique,
  phone text,
  created_at timestamp with time zone default now()
);

-- Progress table
create table if not exists progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  data jsonb,
  created_at timestamp with time zone default now()
);

-- When a guest signs up, create a user and move their local progress to the progress table, linked by user_id. 