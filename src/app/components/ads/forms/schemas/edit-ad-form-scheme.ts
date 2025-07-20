import { z } from "zod";
import { createAdFormSchema } from "./create-ad-form-schema";

export const editAdFormSchema = createAdFormSchema.extend({
            main: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000 || img[0] == null, {
                message: "El archivo es requerido y debe ser menor a 2.5MB",
            })
        })
    