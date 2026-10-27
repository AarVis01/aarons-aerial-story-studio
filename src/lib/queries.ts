import { queryOptions } from "@tanstack/react-query";
import { getProject, getService, getSiteContent, listCategories, listProjects, listServices } from "./content.functions";

export const contentQuery = queryOptions({ queryKey: ["site-content"], queryFn: () => getSiteContent(), staleTime: 30_000 });
export const servicesQuery = queryOptions({ queryKey: ["services"], queryFn: () => listServices(), staleTime: 30_000 });
export const categoriesQuery = queryOptions({ queryKey: ["categories"], queryFn: () => listCategories(), staleTime: 30_000 });
export const projectsQuery = queryOptions({ queryKey: ["projects"], queryFn: () => listProjects(), staleTime: 30_000 });
export const serviceQuery = (slug: string) =>
  queryOptions({ queryKey: ["service", slug], queryFn: () => getService({ data: { slug } }) });
export const projectQuery = (slug: string) =>
  queryOptions({ queryKey: ["project", slug], queryFn: () => getProject({ data: { slug } }) });
