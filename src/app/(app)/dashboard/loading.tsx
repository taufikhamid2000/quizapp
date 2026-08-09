import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-12">
      <Skeleton className="h-7 w-56" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-muted/40 p-6">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-muted/40 p-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-9 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}
