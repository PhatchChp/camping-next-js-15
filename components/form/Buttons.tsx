"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

// UnionType it's like Enum
type btnSize = "default" | "lg" | "sm";

type SubmitButton = {
    className?: string;
    size?: btnSize;
    text: string;
};

export const SubmitButton = ({ className, size, text }: SubmitButton) => {
    const { pending } = useFormStatus();
    return (
        <Button
            disabled={pending}
            className={`${className} capitalize`}
            type="submit"
            size={size}
        >
            {pending ? (
                <LoaderCircle className="animate-spin" />
            ) : (
                <p> {text}</p>
            )}
        </Button>
    );
};
