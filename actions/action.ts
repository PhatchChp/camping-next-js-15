"use server";
import {
    imageSchema,
    landmarkSchema,
    profileSchema,
    validateWithZod,
} from "@/utils/schemas";
import { ProfileFormState } from "@/utils/types";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

const getAuthUser = async () => {
    const user = await currentUser();

    if (!user) {
        throw new Error("You must logged!!!");
    }
    if (!user.privateMetadata.hasProfile) redirect("/profile/create");
    return user;
};

const renderError = (error: unknown): { message: string } => {
    return { message: error instanceof Error ? error.message : "An Error!!" };
};

export const createProfileAction = async (
    prevState: ProfileFormState,
    formData: FormData
) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("Please Login!!!");

        const rawData = Object.fromEntries(formData);
        const validateField = validateWithZod(profileSchema, rawData);

        await db.profile.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                profileImage: user.imageUrl ?? "",
                ...validateField,
            },
        });
        const client = await clerkClient();
        await client.users.updateUserMetadata(user.id, {
            privateMetadata: {
                hasProfile: true,
            },
        });
    } catch (error) {
        return renderError(error);
    }

    redirect("/");
};

export const createLandmarkAction = async (
    prevState: ProfileFormState,
    formData: FormData
): Promise<{ message: string }> => {
    try {
        const user = await getAuthUser();
        const rawData = Object.fromEntries(formData);
        const file = formData.get("image") as File;

        const validatedFile = validateWithZod(imageSchema, { image: file });
        const validateField = validateWithZod(landmarkSchema, rawData);
        const fullPath = await uploadFile(validatedFile.image);

        await db.landmark.create({
            data: { ...validateField, image: fullPath, profileId: user.id },
        });

        return { message: "Create Landmark Success!!!" };
    } catch (error) {
        return renderError(error);
    }
};

export const fetchLandmarks = async ({
    search = "",
    category,
}: {
    search?: string;
    category?: string;
}) => {
    return await db.landmark.findMany({
        where: {
            category,
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ],
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const fetchLandmarksHero = async () => {
    return await db.landmark.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
    });
};

export const fetchFavoriteId = async ({
    landmarkId,
}: {
    landmarkId: string;
}) => {
    const user = await getAuthUser();
    const favorite = await db.favorite.findFirst({
        where: {
            landmarkId,
            profileId: user.id,
        },
        select: {
            id: true,
        },
    });

    return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
    favoriteId: string | null;
    landmarkId: string;
    pathname: string;
}) => {
    const { favoriteId, landmarkId, pathname } = prevState;
    const user = await getAuthUser();

    try {
        void (favoriteId
            ? await db.favorite.delete({ where: { id: favoriteId } })
            : await db.favorite.create({
                  data: { landmarkId, profileId: user.id },
              }));

        revalidatePath(pathname);
        return {
            message: favoriteId
                ? "Remove Favorite Success"
                : "Add Favorite Success",
        };
    } catch (error) {
        return renderError(error);
    }
};

export const fetchFavorites = async () => {
    const user = await getAuthUser();
    const favorite = await db.favorite.findMany({
        where: {
            profileId: user.id,
        },
        select: {
            landmark: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    price: true,
                    province: true,
                    category: true,
                    lat: true,
                    lng: true,
                },
            },
        },
    });

    return favorite.map((favorite) => favorite.landmark);
};

export const fetchLsndmarkDetail = async ({ id }: { id: string }) => {
    return db.landmark.findFirst({
        where: {
            id,
        },
        include: {
            profile: true,
        },
    });
};
