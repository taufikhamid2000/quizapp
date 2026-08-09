import { Spinner } from "@/components/spinner";

// Fallback for any route in this group without its own loading.tsx (e.g.
// /subjects and its nested routes) — dashboard and settings override this
// with layout-matched skeletons since their shape is known and worth
// mimicking; the subjects/topic/quiz pages vary too much in shape for a
// single skeleton to make sense, so a centered spinner covers them.
export default function AppGroupLoading() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <Spinner className="h-6 w-6 text-foreground/40" />
    </div>
  );
}
