import { categories } from "@/utils/categories";
import Link from "next/link";

const CategoryList = ({
    search,
    category,
}: {
    search?: string;
    category?: string;
}) => {
    const searchTerm = search ? `&search=${search}` : "";

    return (
        <div className="flex justify-center my-4 gap-x-4">
            {categories.map((item) => {
                const isActive = item.label === category;

                return (
                    <Link
                        href={`/?category=${item.label}${searchTerm}`}
                        key={item.label}
                    >
                        <article
                            className={`p-3 flex flex-col justify-center items-center hover:text-primary hover:scale-100 duration-300 ${
                                isActive ? "text-primary" : ""
                            }`}
                        >
                            <item.icon />
                            {item.label}
                        </article>
                    </Link>
                );
            })}
        </div>
    );
};
export default CategoryList;
