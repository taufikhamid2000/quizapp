import { AppShell } from "@/components/layout/app-shell";
import { getDictionary } from "@/lib/get-dictionary";
import { createServerClient } from "@/utils/supabase/server";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { t } = await getDictionary();

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <AppShell nav={t.nav} isSignedIn={!!user}>
      {children}
    </AppShell>
  );
}
