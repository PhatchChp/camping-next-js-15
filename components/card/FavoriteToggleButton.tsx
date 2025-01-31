import { auth } from "@clerk/nextjs/server";
import { SignInCardButton } from "../form/Buttons";
import { fetchFavoriteId } from "@/actions/action";
import FavoriteToggleFrom from "./FavoriteToggleFrom";

const FavoriteToggleButton = async ({ landmarkId }: { landmarkId: string }) => {
    const { userId } = await auth();

    if (!userId) return <SignInCardButton />;
    const favoriteId = await fetchFavoriteId({ landmarkId });

    return (
        <FavoriteToggleFrom favoriteId={favoriteId} landmarkId={landmarkId} />
    );
};
export default FavoriteToggleButton;
