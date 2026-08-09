"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SupabaseListener({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // This wraps every page in the root layout, including ones that never
  // touch auth (/, /subjects/**) — createClient() throws synchronously if
  // Supabase env vars aren't set, which would otherwise crash the whole
  // app render, not just the auth-dependent parts of it.
  const [supabase] = useState(() => {
    try {
      return createClient();
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!supabase) return;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      // Only these two actually change what should render. Every other
      // event (TOKEN_REFRESHED on the auto-refresh timer, INITIAL_SESSION
      // fired the moment this listener subscribes, USER_UPDATED, ...) was
      // triggering a router.refresh() too, which is what made the app
      // feel like it kept reloading itself in the background.
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        router.refresh();
      }
    });
    return () => subscription.unsubscribe();
  }, [supabase, router]);

  return <>{children}</>;
}
