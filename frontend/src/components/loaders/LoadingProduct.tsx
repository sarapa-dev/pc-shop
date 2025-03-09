import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";

export const LoadingProduct = () => {
  return (
    <div className="container mx-auto grid gap-8 p-6 md:grid-cols-2">
      <Skeleton className="aspect-square rounded-lg" />
      <div className="space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-8 w-1/3" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
        <div className="flex gap-4">
          <Skeleton className="h-11 flex-1" />
          <Skeleton className="h-11 w-32" />
        </div>
      </div>
    </div>
  );
};
