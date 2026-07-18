-- ─────────────────────────────────────────────────────────────
-- iFlexo — esquema inicial
-- Ejecutar en el SQL Editor de Supabase (o vía CLI).
-- ─────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- Enum de estado de artículo
do $$ begin
  create type article_status as enum ('draft', 'published');
exception when duplicate_object then null; end $$;

-- ── Categorías ──────────────────────────────────────────────────
create table if not exists public.categories (
  slug             text primary key,
  name             text not null,
  description      text,
  meta_title       text,
  meta_description text
);

-- ── Artículos ───────────────────────────────────────────────────
create table if not exists public.articles (
  id                  uuid primary key default gen_random_uuid(),
  category            text not null references public.categories(slug),
  slug                text not null,
  title               text not null,
  meta_title          text,
  meta_description    text,
  excerpt             text,
  content_html        text not null default '',
  cover_image_url     text,
  cover_image_alt     text,
  primary_keyword     text,
  secondary_keywords  text[],
  faq                 jsonb,
  article_schema      jsonb,
  status              article_status not null default 'draft',
  published_at        timestamptz,
  author              text default 'iFlexo',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (category, slug)
);

create index if not exists articles_status_idx on public.articles(status);
create index if not exists articles_category_idx on public.articles(category);

-- ── Log de generaciones IA (opcional) ───────────────────────────
create table if not exists public.article_generations (
  id          uuid primary key default gen_random_uuid(),
  inputs      jsonb,
  raw_output  jsonb,
  created_at  timestamptz not null default now()
);

-- ── Leads del formulario de contacto ────────────────────────────
create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  nombre     text not null,
  empresa    text,
  correo     text not null,
  telefono   text not null,
  mensaje    text not null,
  origen     text,
  created_at timestamptz not null default now()
);

-- ── updated_at automático ───────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

-- ── Row Level Security ──────────────────────────────────────────
alter table public.articles           enable row level security;
alter table public.categories         enable row level security;
alter table public.article_generations enable row level security;
alter table public.leads              enable row level security;

-- Lectura pública SOLO de artículos publicados.
drop policy if exists "public read published articles" on public.articles;
create policy "public read published articles"
  on public.articles for select
  using (status = 'published');

-- Usuarios autenticados (admin): control total de artículos (borradores incl.).
drop policy if exists "authenticated manage articles" on public.articles;
create policy "authenticated manage articles"
  on public.articles for all
  to authenticated
  using (true) with check (true);

-- Categorías: lectura pública, escritura solo admin.
drop policy if exists "public read categories" on public.categories;
create policy "public read categories"
  on public.categories for select using (true);

drop policy if exists "authenticated manage categories" on public.categories;
create policy "authenticated manage categories"
  on public.categories for all to authenticated using (true) with check (true);

-- Generaciones IA: solo admin.
drop policy if exists "authenticated manage generations" on public.article_generations;
create policy "authenticated manage generations"
  on public.article_generations for all to authenticated using (true) with check (true);

-- Leads: lectura solo admin. El INSERT se hace con service role (salta RLS),
-- por eso NO creamos policy de insert público.
drop policy if exists "authenticated read leads" on public.leads;
create policy "authenticated read leads"
  on public.leads for select to authenticated using (true);

-- ── Seed de categorías ──────────────────────────────────────────
insert into public.categories (slug, name, description) values
  ('flexografia', 'Flexografía', 'Fundamentos, materiales, ventajas y comparativas de la impresión flexográfica.'),
  ('planchas',    'Planchas',    'Fotopolímeros y planchas: Kodak Flexcel NX, distorsión y futuro.'),
  ('anilox',      'Anilox',      'Rodillos anilox: BCM, lineatura y transferencia de tinta.'),
  ('tintas',      'Tintas',      'Composición y comportamiento de las tintas en flexografía.')
on conflict (slug) do nothing;
