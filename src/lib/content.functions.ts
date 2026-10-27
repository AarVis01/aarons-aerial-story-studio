import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { publicDb } from "./public-db.server";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyContent = any;

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicDb().rpc("get_published_content");
  if (error) throw new Error("Could not load site content");
  const out: Record<string, AnyContent> = {};
  for (const row of data ?? []) out[row.key] = row.content ?? {};
  return out as AnyContent;
});

export const listServices = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicDb()
    .from("services")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error) throw new Error("Could not load services");
  return data ?? [];
});

export const getService = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ slug: z.string().max(200) }).parse(d))
  .handler(async ({ data }) => {
    const { data: row } = await publicDb()
      .from("services")
      .select("*")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    return row ?? null;
  });

export const listCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicDb().from("categories").select("*").order("sort_order");
  return data ?? [];
});

export const listProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicDb()
    .from("projects")
    .select("id,slug,title,short_description,thumbnail_url,thumbnail_alt,cover_video_url,featured,featured_order,sort_order,is_placeholder,client_name,project_date,category:categories(slug,name)")
    .eq("status", "published")
    .order("sort_order");
  if (error) throw new Error("Could not load projects");
  return data ?? [];
});

export const getProject = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ slug: z.string().max(200) }).parse(d))
  .handler(async ({ data }) => {
    const { data: row } = await publicDb()
      .from("projects")
      .select("*, category:categories(slug,name), media:project_media(*)")
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    if (!row) return null;
    const media = [...((row as AnyContent).media ?? [])].sort((a: AnyContent, b: AnyContent) => a.sort_order - b.sort_order);
    return { ...row, media } as AnyContent;
  });
