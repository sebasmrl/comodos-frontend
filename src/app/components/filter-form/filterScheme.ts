import { z } from "zod";

 const filterScheme = z.object({
    propertyType: z.string().min(2, {
        message: "El tipo de propiedad debe ser uno válido",
    }),
    range: z.array(z.number()),
    minPrice: z.number(),
    maxPrice: z.number(),
})


const filterSchemeDefaultValues = {
            propertyType: undefined,
            range:[0],
            minPrice: 0,
            maxPrice:0
}

export {
    filterScheme,
    filterSchemeDefaultValues
}