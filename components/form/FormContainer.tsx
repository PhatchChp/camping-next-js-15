"use client";
import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { actionFunction } from "@/utils/types";

const initialState = {
    message: "",
};

const FormContainer = ({
    action,
    children,
}: {
    action: actionFunction;
    children: React.ReactNode;
}) => {
    const { toast } = useToast();
    const [state, formAction] = useActionState(action, initialState);
    useEffect(() => {
        if (state.message) {
            toast({ description: state.message });
        }
    }, [state]);

    console.log("state ja", state);
    return <form action={formAction}>{children}</form>;
};
export default FormContainer;
