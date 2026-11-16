-- Business contact details and quote-notification recipient.
-- Instagram links are pointed at @AaronsVisualsUK; other social links (e.g. WhatsApp) are kept.
update public.site_content set
  draft = jsonb_set(jsonb_set(jsonb_set(jsonb_set(draft,
    '{contact,email}', '"info@aaronsvisuals.co.uk"'),
    '{contact,phone}', '"+44 7354 740445"'),
    '{notificationEmail}', '"info@aaronsvisuals.co.uk"'),
    '{social}', (
      select coalesce(jsonb_agg(case when e->>'url' ilike '%instagram%'
        then jsonb_set(e, '{url}', '"https://www.instagram.com/AaronsVisualsUK/"') else e end), '[]'::jsonb)
      from jsonb_array_elements(coalesce(draft->'social', '[]'::jsonb)) e)),
  published = jsonb_set(jsonb_set(jsonb_set(jsonb_set(published,
    '{contact,email}', '"info@aaronsvisuals.co.uk"'),
    '{contact,phone}', '"+44 7354 740445"'),
    '{notificationEmail}', '"info@aaronsvisuals.co.uk"'),
    '{social}', (
      select coalesce(jsonb_agg(case when e->>'url' ilike '%instagram%'
        then jsonb_set(e, '{url}', '"https://www.instagram.com/AaronsVisualsUK/"') else e end), '[]'::jsonb)
      from jsonb_array_elements(coalesce(published->'social', '[]'::jsonb)) e)),
  published_at = now()
where key = 'settings';
