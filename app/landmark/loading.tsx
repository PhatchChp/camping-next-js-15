import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
    return (
        <>
            <Skeleton className="h-4  w-2/4 rounded-md mb-4" />
            <Skeleton className="h-8  w-full rounded-md mb-2" />
            <Skeleton className="h-[300px] md:h-[500px] w-full rounded-md" />
            <Skeleton className="h-4  w-full rounded-md mt-2" />
            <Skeleton className="h-4  w-3/4 rounded-md mt-2" />
            <Skeleton className="h-4  w-2/4 rounded-md mt-2" />
        </>
    );
};
export default loading;
