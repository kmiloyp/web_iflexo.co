-- ─────────────────────────────────────────────────────────────
-- Campos de calificación del lead (formulario ampliado).
-- Correr en el SQL Editor de Supabase. Idempotente.
-- ─────────────────────────────────────────────────────────────

alter table public.leads
  add column if not exists ciudad          text,
  add column if not exists tipo_impresion  text,  -- banda-angosta | banda-ancha | otro
  add column if not exists necesidad       text;  -- planchas | prueba-de-color | reduccion-de-color | servicios-graficos | asesoria
