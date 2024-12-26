export type ProfileFormState = {
    message: string;
};

export type actionFunction = (
    prevState: ProfileFormState,
    formData: FormData
) => Promise<{ message: string }>;
