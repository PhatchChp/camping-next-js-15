import { LandmarkCardProps } from "@/utils/types";
import Image from "next/image";
import LandmarkRating from "./LandmarkRating";
import FavoriteToggleButton from "./FavoriteToggleButton";
import Link from "next/link";

const LandmarkCard = ({ landmark }: { landmark: LandmarkCardProps }) => {
    const { id, name, image, price, description, province } = landmark;

    return (
        <article className="group relative">
            <Link href={`/landmark/${id}`}>
                <div className="relative h-[300px] rounded-md">
                    <Image
                        src={image}
                        alt={name}
                        sizes="(max-width:768px) 100vw, 50vw"
                        fill
                        className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                    ></Image>
                </div>
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold mt-3">{name}</h3>
                    <LandmarkRating />
                </div>
                <p className="text-sm mt-1 text-muted-foreground">
                    {description.substring(0, 40)}
                </p>
                <div className="mt-1 flex items-center justify-between font-semibold text-sm">
                    <span>฿ {price}</span>
                    <p>{province}</p>
                </div>
            </Link>
            <div className="absolute top-5 right-5">
                <FavoriteToggleButton landmarkId={id} />
            </div>
        </article>
    );
};
export default LandmarkCard;
