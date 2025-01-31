"use client";
import { toggleFavoriteAction } from "@/actions/action";
import FormContainer from "../form/FormContainer";
import { usePathname } from "next/navigation";
import { CardSubmitButton } from "../form/Buttons";

const FavoriteToggleFrom = ({
    favoriteId,
    landmarkId,
}: {
    favoriteId: string | null;
    landmarkId: string;
}) => {
    const pathname = usePathname();
    const toggleAction = toggleFavoriteAction.bind(null, {
        favoriteId,
        landmarkId,
        pathname,
    });

    return (
        <FormContainer action={toggleAction}>
            <CardSubmitButton isFavorite={favoriteId ? true : false} />
        </FormContainer>
    );
};
export default FavoriteToggleFrom;
