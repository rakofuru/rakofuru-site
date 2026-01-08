create extension if not exists "pgcrypto";

create table if not exists public.farms_admin (
  id text primary key,
  slug text unique,
  title text,
  body_html text,
  excerpt text,
  category_slug text,
  hero_image_url text,
  thumbnail_url text,
  address_text text,
  phone text,
  official_url text,
  google_maps_place_url text,
  google_maps_reviews_url text,
  parking_text text,
  price_text text,
  hours_text text,
  access_text text,
  is_public boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.partner_requests (
  id uuid primary key default gen_random_uuid(),
  farm_name text,
  owner_name text,
  email text,
  phone text,
  website_url text,
  location_text text,
  notes text,
  status text default 'pending',
  farm_admin_id text references public.farms_admin(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  farm_slug text not null,
  author_name text not null,
  body text not null,
  created_at timestamptz default now(),
  parent_id uuid references public.comments(id) on delete cascade,
  is_public boolean default true
);

create index if not exists comments_farm_slug_idx on public.comments (farm_slug);
