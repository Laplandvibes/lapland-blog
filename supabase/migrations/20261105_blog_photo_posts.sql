-- Applied to project oogioaxmfnqcbvjbcodh on 2026-11-05 (migration
-- "blog_photo_posts_12_langs_ensure_profile"). Kept here as the record.
--
-- 1) A writer's post may be in any of the site's 12 languages (was fi/sv/en only).
alter table public.blog_posts drop constraint if exists blog_posts_lang_check;
alter table public.blog_posts add constraint blog_posts_lang_check
  check (lang = any (array['en','fi','de','ja','es','pt-BR','zh-CN','ko','fr','it','nl','sv']));

-- 2) Create the writer's public profile if it is missing, never overwrite it.
--    The client used to upsert on every page load, which (a) reset a changed
--    address back to the email prefix and (b) failed silently on a taken
--    handle, after which saving a post hit the author_id foreign key.
--    Default name is NOT taken from the email address: a public name must be
--    one the writer chose or one the sign-in provider gave.
create or replace function public.ensure_blog_profile(p_handle text default null, p_display text default null)
returns text
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  uid uuid := auth.uid();
  existing text;
  base text;
  candidate text;
  i int := 0;
begin
  if uid is null then
    raise exception 'not signed in' using errcode = '28000';
  end if;
  select handle into existing from blog_profiles where id = uid;
  if existing is not null then
    return existing;
  end if;
  base := lower(regexp_replace(coalesce(p_handle, ''), '[^a-zA-Z0-9_-]', '', 'g'));
  base := left(base, 24);
  if length(base) < 2 then
    base := 'lapland';
  end if;
  candidate := base;
  while exists (select 1 from blog_profiles where handle = candidate) or (base = 'lapland' and i = 0) loop
    i := i + 1;
    candidate := base || '-' || (1000 + floor(random() * 9000))::int::text;
    exit when i > 20;
  end loop;
  insert into blog_profiles (id, handle, display_name, role)
  values (uid, candidate, coalesce(nullif(trim(p_display), ''), candidate), 'author');
  return candidate;
end;
$$;

revoke all on function public.ensure_blog_profile(text, text) from public, anon;
grant execute on function public.ensure_blog_profile(text, text) to authenticated;
