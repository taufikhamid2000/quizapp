import { Spinner } from "@/components/spinner";

// Scoped to the subjects segment (and everything nested under it —
// /subjects, /subjects/[subject], /subjects/[subject]/[topic]) rather
// than the (app) group root, so it can't reach the sibling
// dashboard/settings routes. Those redirect() based on an auth check,
// and any ancestor loading.tsx around them makes Next.js start
// streaming a 200 response before the redirect can be sent as a real
// HTTP 307 — see the reverted commit for the full story. Subjects pages
// never redirect, so streaming here is safe.
export default function SubjectsLoading() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <Spinner className="h-6 w-6 text-foreground/40" />
    </div>
  );
}
