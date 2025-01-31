import { Skeleton } from "@/components/ui/skeleton";

const LoadingCard = () => {
    return (
        <>
            <SkeletionCardHero />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
                <SkeletionCard />
                <SkeletionCard />
                <SkeletionCard />
                <SkeletionCard />
                <SkeletionCard />
                <SkeletionCard />
            </div>
        </>
    );
};

export const SkeletionCard = () => {
    return (
        <div>
            <Skeleton className="h-[300px] rounded-md mb-2" />
            <Skeleton className="h-4 w-3/4 rounded-md mb-2" />
            <Skeleton className="h-4 w-1/2 rounded-md mb-2" />
            <Skeleton className="h-4 w-1/3 rounded-md" />
        </div>
    );
};

export const SkeletionCardHero = () => {
    return (
        <div>
            <Skeleton className="w-full h-[500px] rounded-md mb-2" />
            <Skeleton className="h-12 w-full rounded-md mb-2" />
        </div>
    );
};

export default LoadingCard;
