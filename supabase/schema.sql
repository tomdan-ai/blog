-- 1. Users Table (linked to auth.users)
create table if not exists users (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  avatar_url text,
  created_at timestamptz default now()
);

-- 2. Posts Table
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade not null,
  title text not null,
  body text not null,
  cover_image_url text,
  created_at timestamptz default now()
);

-- 3. Comments Table
create table if not exists comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  body text not null,
  created_at timestamptz default now()
);

-- 4. Likes Table
create table if not exists likes (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  unique(post_id, user_id)
);

-- Enable Row Level Security on all tables
alter table users enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;
alter table likes enable row level security;

-- 5. Automatic Profile Creation (The Production Way)
-- This function runs every time a new user signs up in auth.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, username, avatar_url)
  values (
    new.id, 
    new.raw_user_meta_data->>'username', 
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function after a new user is created in auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Policies Implementation
-- Note: No INSERT policy is needed for "users" because the trigger uses "security definer"

-- Users Policies
drop policy if exists "Anyone can read profiles" on users;
create policy "Anyone can read profiles" on users for select using (true);

drop policy if exists "Users can check their own profile" on users;
-- Use for check if user exists or public profile details
create policy "Users can check their own profile" on users for select using (auth.uid() = id);

drop policy if exists "Users can only update their own profile" on users;
create policy "Users can only update their own profile" on users for update using (auth.uid() = id);

-- Posts Policies
drop policy if exists "Anyone can read posts" on posts;
create policy "Anyone can read posts" on posts for select using (true);

drop policy if exists "Only the owner can insert posts" on posts;
create policy "Only the owner can insert posts" on posts for insert with check (auth.uid() = user_id);

drop policy if exists "Only the owner can update posts" on posts;
create policy "Only the owner can update posts" on posts for update using (auth.uid() = user_id);

drop policy if exists "Only the owner can delete posts" on posts;
create policy "Only the owner can delete posts" on posts for delete using (auth.uid() = user_id);

-- Comments Policies
drop policy if exists "Anyone can read comments" on comments;
create policy "Anyone can read comments" on comments for select using (true);

drop policy if exists "Authenticated users can insert comments" on comments;
create policy "Authenticated users can insert comments" on comments for insert with check (auth.role() = 'authenticated');

drop policy if exists "Only the owner can delete comments" on comments;
create policy "Only the owner can delete comments" on comments for delete using (auth.uid() = user_id);

-- Likes Policies
drop policy if exists "Anyone can read likes" on likes;
create policy "Anyone can read likes" on likes for select using (true);

drop policy if exists "Authenticated users can insert their own like" on likes;
create policy "Authenticated users can insert their own like" on likes for insert with check (auth.role() = 'authenticated' and auth.uid() = user_id);

drop policy if exists "Users can only delete their own like" on likes;
create policy "Users can only delete their own like" on likes for delete using (auth.uid() = user_id);
