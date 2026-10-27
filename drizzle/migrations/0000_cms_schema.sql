
create type public.app_role as enum ('admin','user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;
create policy "own roles readable" on public.user_roles for select to authenticated using (user_id = auth.uid());

-- First account created becomes the administrator; later sign-ups get no access.
create or replace function public.bootstrap_first_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users
for each row execute function public.bootstrap_first_admin();

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- Page content: draft + published JSON
create table public.site_content (
  key text primary key,
  draft jsonb not null default '{}'::jsonb,
  published jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  published_at timestamptz
);
grant select, insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;
alter table public.site_content enable row level security;
create policy "admin manage content" on public.site_content for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger t_site_content before update on public.site_content for each row execute function public.touch_updated_at();

create or replace function public.get_published_content()
returns table (key text, content jsonb) language sql stable security definer set search_path = public as $$
  select key, published from public.site_content
$$;
grant execute on function public.get_published_content() to anon, authenticated;

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  sort_order int not null default 0
);
grant select on public.categories to anon;
grant select, insert, update, delete on public.categories to authenticated;
grant all on public.categories to service_role;
alter table public.categories enable row level security;
create policy "public read categories" on public.categories for select to anon, authenticated using (true);
create policy "admin write categories" on public.categories for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null default '',
  body text not null default '',
  image_url text,
  image_alt text not null default '',
  video_url text,
  button_label text not null default 'Learn More',
  button_url text,
  sort_order int not null default 0,
  published boolean not null default true,
  seo_title text,
  seo_description text,
  og_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.services to anon;
grant select, insert, update, delete on public.services to authenticated;
grant all on public.services to service_role;
alter table public.services enable row level security;
create policy "public read services" on public.services for select to anon, authenticated using (published or public.has_role(auth.uid(),'admin'));
create policy "admin write services" on public.services for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger t_services before update on public.services for each row execute function public.touch_updated_at();

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  short_description text not null default '',
  full_description text not null default '',
  thumbnail_url text,
  thumbnail_alt text not null default '',
  cover_video_url text,
  category_id uuid references public.categories(id) on delete set null,
  client_name text,
  project_date date,
  instagram_url text,
  external_url text,
  sort_order int not null default 0,
  featured boolean not null default false,
  featured_order int not null default 0,
  status text not null default 'draft' check (status in ('draft','published')),
  is_placeholder boolean not null default false,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.projects to anon;
grant select, insert, update, delete on public.projects to authenticated;
grant all on public.projects to service_role;
alter table public.projects enable row level security;
create policy "public read projects" on public.projects for select to anon, authenticated using (status = 'published' or public.has_role(auth.uid(),'admin'));
create policy "admin write projects" on public.projects for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger t_projects before update on public.projects for each row execute function public.touch_updated_at();

create table public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  kind text not null default 'image' check (kind in ('image','video','embed')),
  url text not null,
  poster_url text,
  alt text not null default '',
  caption text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.project_media to anon;
grant select, insert, update, delete on public.project_media to authenticated;
grant all on public.project_media to service_role;
alter table public.project_media enable row level security;
create policy "public read project media" on public.project_media for select to anon, authenticated using (
  exists (select 1 from public.projects p where p.id = project_id and (p.status='published' or public.has_role(auth.uid(),'admin'))));
create policy "admin write project media" on public.project_media for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  path text unique not null,
  url text not null,
  kind text not null default 'image',
  mime text,
  size bigint,
  alt text not null default '',
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.media_assets to authenticated;
grant all on public.media_assets to service_role;
alter table public.media_assets enable row level security;
create policy "admin manage media" on public.media_assets for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text,
  email text not null,
  phone text,
  service text,
  location text not null,
  budget text,
  details text not null,
  contact_method text,
  status text not null default 'new' check (status in ('new','in_progress','replied','archived')),
  email_status text not null default 'pending',
  ip_hash text,
  created_at timestamptz not null default now()
);
grant select, update, delete on public.enquiries to authenticated;
grant all on public.enquiries to service_role;
alter table public.enquiries enable row level security;
create policy "admin read enquiries" on public.enquiries for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin update enquiries" on public.enquiries for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admin delete enquiries" on public.enquiries for delete to authenticated using (public.has_role(auth.uid(),'admin'));
create index enquiries_ip_created on public.enquiries (ip_hash, created_at desc);

-- Storage: only admins write; reads happen through the site's media proxy.
create policy "admin upload media" on storage.objects for insert to authenticated with check (bucket_id = 'media' and public.has_role(auth.uid(),'admin'));
create policy "admin update media" on storage.objects for update to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(),'admin'));
create policy "admin delete media" on storage.objects for delete to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(),'admin'));
create policy "admin read media" on storage.objects for select to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(),'admin'));
