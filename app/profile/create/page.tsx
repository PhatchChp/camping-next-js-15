import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { ProfileFormState } from "@/utils/types";

const createProfileAction = async (
    prevState: ProfileFormState,
    formData: FormData
) => {
    "use server";
    // const firstName = formData.get("firstName") as string;
    const all = Object.fromEntries(formData);
    // Validate
    // Insert to db
    console.log("Jukkru!!", all);
    return { message: "Create Profile Success!" };
};

const CreateProfile = () => {
    return (
        <section>
            <h1 className="text-2xl font-semibold mb-8 capitalize">new user</h1>
            <div className="border p-8 rounded-md">
                <FormContainer action={createProfileAction}>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <FormInput
                            name="firstName"
                            type="text"
                            label="First Name"
                            placeholder="First Name"
                        />
                        <FormInput
                            name="lastName"
                            type="text"
                            label="Last Name"
                            placeholder="Last Name"
                        />
                        <FormInput
                            name="userName"
                            type="text"
                            label="User Name"
                            placeholder="User Name"
                        />
                    </div>
                    <SubmitButton
                        className=""
                        size="default"
                        text="create profile"
                    />
                </FormContainer>
            </div>
        </section>
    );
};
export default CreateProfile;
