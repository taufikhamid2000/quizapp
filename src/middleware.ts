import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // The matcher below runs this on every route, including ones that never
  // touch auth (/, /subjects/**) — quiz content is intentionally
  // independent of Supabase, so a missing/misconfigured Supabase project
  // must not take the whole site down. Session refresh is best-effort: if
  // it fails, page-level auth checks still run and just see a stale or
  // absent session, same as any other transient auth-refresh failure.
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) {
            return req.cookies.get(name)?.value;
          },
          set(name, value, options) {
            res.cookies.set({ name, value, ...options });
          },
          remove(name, options) {
            res.cookies.set({ name, value: "", ...options });
          },
        },
      }
    );

    // ALWAYS call getUser() here – it pings the Auth API and refreshes tokens
    await supabase.auth.getUser(); // not getSession()
  } catch {
    // Supabase not configured/unreachable — fall through with res as-is.
  }

  return res;
}

// only run on routes that ever touch Supabase
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
