import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const LoadingCard = () => {
  return (
    <Card>
      <CardHeader className="p-0">
        <Skeleton className="aspect-square" />
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="mt-2 h-16" />
        <Skeleton className="mt-2 h-6 w-24" />
        <Skeleton className="mt-2 h-4 w-20" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="size-10" />
        </div>
      </CardFooter>
    </Card>
  );
};
