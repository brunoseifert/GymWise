import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 mt-4">
      <Skeleton className="h-[225px] w-[650px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[200px]" />
      </div>
    </div>
  );
}
