import { fetchFavorites } from "@/actions/action";
import EmptyList from "@/components/home/EmptyList";
import LandmarkList from "@/components/home/LandmarkList";

const FavoritesPage = async () => {
    const favorite = await fetchFavorites();

    return favorite.length === 0 ? (
        <EmptyList heading="No items Favorites" />
    ) : (
        <LandmarkList landmarks={favorite} />
    );
};
export default FavoritesPage;
