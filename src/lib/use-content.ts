import { useEffect, useState } from "react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { contentQuery } from "./queries";

/* eslint-disable @typescript-eslint/no-explicit-any */

/** True when the page was opened with ?preview=1 (admin draft preview). */
export function usePreviewFlag() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(new URLSearchParams(window.location.search).get("preview") === "1");
  }, []);
  return on;
}

/** Published content for a key; draft content when an admin previews with ?preview=1. */
export function useContent(key: string): any {
  const { data } = useSuspenseQuery(contentQuery);
  const preview = usePreviewFlag();
  const draft = useQuery({
    queryKey: ["draft-content", key],
    enabled: preview,
    queryFn: async () => {
      const { data: row } = await supabase.from("site_content").select("draft").eq("key", key).maybeSingle();
      return (row?.draft as any) ?? null;
    },
  });
  if (preview && draft.data) return draft.data;
  return (data as any)?.[key] ?? {};
}
