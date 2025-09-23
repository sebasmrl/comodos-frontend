import { z } from "zod";

 const filterScheme = z.object({
    propertyType: z.string().min(2, {
        message: "Debes seleccionar un tipo de propiedad",
    }),
    type: z.string().min(2, {
        message: "Debes seleccionar un tipo de anuncio",
    }),
    range: z.array(z.number()),
    minPrice: z.coerce.number({message:'Precio minimo debe ser un número'}),
    maxPrice: z.coerce.number({message:'Precio máximo debe ser un número'}),
    period: z.string().min(2,{ message:'Debes seleccionar alguna opción'})
})


const filterSchemeDefaultValues = {
            period: 'all',
            propertyType: 'all',
            range:[0],
            minPrice: 0,
            maxPrice:0,
            type: 'Arriendo'
}

export {
    filterScheme,
    filterSchemeDefaultValues
}