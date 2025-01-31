import Link from "next/link";
import { Button } from "../ui/button";

const EmptyList = ({
    heading = "No items",
    message = "Please try again",
    btnText = "Back home",
}: {
    heading?: string;
    message?: string;
    btnText?: string;
}) => {
    return (
        <div>
            <h1 className="text-xl font-bold">{heading}</h1>
            <p className="text-lg mb-4">{message}</p>
            <Button className="capitalize" asChild>
                <Link href={"/"}>{btnText}</Link>
            </Button>
        </div>
    );
};
export default EmptyList;
