import { fetchLandmarks, fetchLandmarksHero } from "@/actions/action";
import { LandmarkCardProps } from "@/utils/types";
import LandmarkList from "./LandmarkList";

import Hero from "../hero/Hero";
import CategoryList from "./CategoryList";
import EmptyList from "./EmptyList";

const LandmarkContainer = async ({
    search,
    category,
}: {
    search?: string;
    category?: string;
}) => {
    const landmarks: LandmarkCardProps[] = await fetchLandmarks({
        search,
        category,
    });
    const landmarksHero: LandmarkCardProps[] = await fetchLandmarksHero();

    if (landmarks.length === 0) <EmptyList />;

    return (
        <>
            <Hero landmarks={landmarksHero} />
            <CategoryList search={search} category={category} />
            {landmarks.length === 0 ? (
                <EmptyList heading="No results" btnText="Clear Filters" />
            ) : (
                <LandmarkList landmarks={landmarks} />
            )}
        </>
    );
};
export default LandmarkContainer;
