import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { getDictionary } from "@/lib/get-dictionary";
import { createServerClient } from "@/utils/supabase/server";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { t } = await getDictionary();

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // All routes under (app) require a session — anonymous (demo) users
  // count as signed in. Individual pages (dashboard, settings) also
  // redirect on their own, so this is belt-and-suspenders for routes
  // like /subjects that didn't have their own check.
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <AppShell nav={t.nav} isSignedIn={!!user}>
      {children}
    </AppShell>
  );
}
