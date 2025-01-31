export type ProfileFormState = {
    message: string;
};

export type actionFunction = (
    prevState: ProfileFormState,
    formData: FormData
) => Promise<{ message: string }>;

export type LandmarkCardProps = {
    id: string;
    name: string;
    image: string;
    category: string;
    province: string;
    description: string;
    price: number;
    lat: number;
    lng: number;
};
