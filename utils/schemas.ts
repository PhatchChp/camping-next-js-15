import { z, ZodSchema } from "zod";

export const profileSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: "ชื่อ อักขระต้องมากกว่า 2 อักขระ" }),
    lastName: z
        .string()
        .min(2, { message: "นามสกุล อักขระต้องมากกว่า 2 อักขระ" }),
    userName: z
        .string()
        .min(2, { message: "username อักขระต้องมากกว่า 2 อักขระ" }),
});

const validateImage = () => {
    const maxFileSize = 1024 * 1024;
    if (typeof window !== "undefined" && typeof File !== "undefined") {
        return z
            .instanceof(File)
            .refine(
                (file) => file.size <= maxFileSize,
                "File size must be less then 1MB"
            );
    }
    return z.any();
};

export const landmarkSchema = z.object({
    name: z
        .string()
        .min(2, { message: "ชื่อต้องมากกว่า 2 อักขระ" })
        .max(20, { message: "ชื่อค้องน้อยกว่า 30 อักขระ" }),
    category: z.string(),
    description: z
        .string()
        .min(2, { message: "รายละเอียดต้องมากกว่า 2 อักขระ" })
        .max(200, { message: "รายละเอียดต้องน้อยกว่า 200 อักขระ" }),
    price: z.coerce.number().int().min(0, { message: "ราคาต้องมากกว่า 0" }),
    province: z.string(),
    lat: z.coerce.number(),
    lng: z.coerce.number(),
});

export const imageSchema = z.object({
    image: validateImage(),
});

export const validateWithZod = <T>(schema: ZodSchema<T>, data: unknown): T => {
    const result = schema.safeParse(data);
    if (!result.success) {
        const errors = result.error?.errors.map((error) => error.message);
        throw new Error(errors.join(","));
    }
    return result.data;
};
