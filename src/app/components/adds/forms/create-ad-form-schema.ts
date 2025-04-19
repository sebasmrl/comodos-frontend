import { z } from "zod";

export const createAdFormSchema = z.object({
    name: z.string().min(2, {
        message: "Nombre debe ser una cadena de texto",
    }),
//    description: z.string().min(2, {
//        message: "Descripcion debe ser una cadena de texto",
//    }),
    propertyType: z.string().min(2, {
        message: "Tipo de propiedad debe ser una cadena de texto",
    }),
//    period: z.string().min(2, {
//        message: "Periodo de facturación debe ser una cadena de texto",
//    }),
//    locationCountry: z.string().min(2, {
//        message: "Pais de facturación debe ser una cadena de texto",
//    }),
//    locationState: z.string().min(2, {
//        message: "Estado de facturación debe ser una cadena de texto",
//    }),
//    locationCity: z.string().min(2, {
//        message: "Ciudad de facturación debe ser una cadena de texto",
//    }),
//    address: z.string().min(2, {
//        message: "Direccion de facturación debe ser una cadena de texto",
//    }),
    price: z.string().refine((val) => !isNaN(Number(val)), { message: "Precio debe ser un número válido" }) // Validar string numérico
        .transform((val) => Number(val)), 
//    currency: z.string().min(3, {
//        message: "Divisa debe ser una cadena de texto",
//    }),
//    rooms: z.number( {
//        message: "Habitaciones es requerido",
//    }),
//    livingRoom: z.boolean({
//        message: "Sala es requerido",
//    }),
//    bathrooms: z.string().refine((val) => !isNaN(Number(val)), { message: "Baños es un numero requerido" }) // Validar string numérico
//    .transform((val) => Number(val)),
//    isSharedBathroom: z.boolean({
//        message: "Es baño compartido es requerido",
//    }),
    floors: z.string().refine((val) => !isNaN(Number(val)), { message: "Pisos es un numero requerido" }) // Validar string numérico
    .transform((val) => Number(val)),
   // stratum: z.string().min(1, {
   //     message: "Estrato debe ser una cadena de texto",
   // }),
   // yard: z.boolean({
   //     message: "Tiene patio es requerido",
   // }),
   // squareMeters: z.number( {
   //     message: "Metros cuadrados es requerido",
   // }),
   // motoParking: z.boolean({
   //     message: "Tiene parqueadero de moto es requerido",
   // }),
   // carParking: z.boolean({
   //     message: "Tiene parqueadero de carro es requerido",
   // }),
   // administrationCost: z.number( {
   //     message: "Costo de administación es requerido",
   // }).nullable().optional(),
   // isSharedKitchen: z.boolean({
   //     message: "Es cocina compartida es requerido",
   // }),
   // furnished:  z.boolean({
   //     message: "Está amoblado es requerido",
   // }),
   // hasElectricLightService: z.boolean({
   //     message: "Tiene servicio de luz electrica es requerido",
   // }),
   // hasGasService: z.boolean({
   //     message: "Tiene servicio de gas es requerido",
   // }),
   // hasWaterService: z.boolean({
   //     message: "Tiene servicio de agua es requerido",
   // }),
   // hasInternetServiceIntegrated: z.boolean({
   //     message: "Tiene servicio de Internet integrado es requerido",
   // }),
    mainImage: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000, {
        message: "El archivo debe ser menor a 3MB",
    }),    
    adImage1: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000 || img[0] ==null, {
        message: "El archivo debe ser menor a 3MB",
    }).optional().nullable(),    
    adImage2: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000 || img[0] ==null, {
        message: "El archivo debe ser menor a 3MB",
    }).optional().nullable(),    
    adImage3: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000 || img[0] ==null, {
        message: "El archivo debe ser menor a 3MB",
    }).optional().nullable(),    
    adImage4: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000 || img[0] ==null, {
        message: "El archivo debe ser menor a 3MB",
    }).optional().nullable(),    
    adImage5: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000 || img[0] ==null, {
        message: "El archivo debe ser menor a 3MB",
    }).optional().nullable(),    
    adImage6: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000 || img[0] ==null, {
        message: "El archivo debe ser menor a 3MB",
    }).optional().nullable(),    

})

export const createAdFormSchemaDefaultValues = {
        name:                          '', 
        //description:                   '', 
        //coords:                    Coords, 
        //locationCountry:               '', 
        //locationState:                 '', 
        //locationCity:                  '', 
        //address:                       '', 
        price:                          0, 
        //currency:                      'COP', 
        //rooms:                          1, 
        //livingRoom:                     true,
        //bathrooms:                      0, 
        //isSharedBathroom:               false,
        floors:                         0, 
        //stratum:                        '',
        //yard:                           false,
        //squareMeters:                   0,
        //motoParking:                    false,
        //carParking:                     false,
        //adminitrationCost:              0,
        //isSharedKitchen:                false,
        //furnished:                      false,
        //hasElectricLightService:        true,
        //hasGasService:                  true,
        //hasWaterService:                true,
        //hasInternetServiceIntegrated:   false,
        //period:                         '',
        propertyType:                   ''
}