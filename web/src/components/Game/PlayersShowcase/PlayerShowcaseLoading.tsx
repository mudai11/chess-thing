import { Skeleton } from "@/components/ui/skeleton";

const PlayerShowcaseLoading = () => {
  return (
    <div className="flex w-full flex-col gap-2 justify-center">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-4 w-[50px]" />
    </div>
  );
};

export default PlayerShowcaseLoading;
