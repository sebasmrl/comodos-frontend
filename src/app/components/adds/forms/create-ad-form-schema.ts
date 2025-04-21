import { z } from "zod";


export const createAdFormSchema = z.object({
    name: z.string().min(2, {
        message: "Nombre debe ser una cadena de texto",
    }),
    description: z.string().min(2, {
        message: "Descripcion debe ser una cadena de texto",
    }),
    propertyType: z.string().min(2, {
        message: "No has seleccionado ningún tipo de propiedad",
    }),
    period: z.string({ message:"Periodo de facturación es requerido"}).min(2, {
        message: "No has seleccionado ningún periodo de facturación",
    }),
    coords: z.object({
        lat:z.number(),
        lng:z.number()
    }),
    locationCountry: z.string().min(2, {
        message: "Pais es requerido",
    }),
    locationState: z.string().min(2, {
        message: "Estado es requerido",
    }),
    locationCity: z.string().min(2, {
        message: "Ciudad es requerida",
    }),
    address: z.string().min(2, {
        message: "Direccion es requerida",
    }),
    price: z.number({message:'El precio es requerido'}), 
    currency: z.string().min(3, {
        message: "La divisa es requerida",
    }),
    rooms:z.string({message:'Debes modificar el valor por defecto al menos 1 vez'}).refine((val) => !isNaN(Number(val)), { message: "Habitaciones es requerido válido" }), // Validar string numérico,
    livingRoom: z.boolean({
       message: "Sala es requerido",
   }),
    bathrooms: z.string({message:"Debes modificar el valor por defecto al menos 1 vez"}).refine((val) => !isNaN(Number(val)), { message: "Baños es un numero requerido" }), // Validar string numérico
    isSharedBathroom: z.boolean({
        message: "Es baño compartido es requerido",
    }),
    floors: z.number({message:'El piso o número de pisos del inmueble es requerido'}),
    stratum: z.string().min(1, {
        message: "Estrato debe ser una cadena de texto",
    }),
    yard: z.boolean({
        message: "Tiene patio o zona verde es requerido",
    }),
    squareMeters: z.number( {
        message: "Metros cuadrados es requerido",
    }),
    motoParking: z.boolean({
        message: "Tiene parqueadero de moto es requerido",
    }),
    carParking: z.boolean({
        message: "Tiene parqueadero de carro es requerido",
    }),
    administrationCost: z.number( {
        message: "Costo de administación es requerido",
    }),
    hasKitchen: z.boolean({
        message: "Tiene cocina es requerido",
    }),
    isSharedKitchen: z.boolean({
        message: "Es cocina compartida es requerido",
    }),
    furnished:  z.boolean({
        message: "Está amoblado es requerido",
    }),
    hasElectricLightService: z.boolean({
        message: "Tiene servicio de luz electrica es requerido",
    }),
    hasGasService: z.boolean({
        message: "Tiene servicio de gas es requerido",
    }),
    hasWaterService: z.boolean({
        message: "Tiene servicio de agua es requerido",
    }),
    hasInternetServiceIntegrated: z.boolean({
        message: "Tiene servicio de Internet integrado es requerido",
    }),
    mainImage: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000, {
        message: "El archivo es requerido y debe ser menor a 2.5MB",
    }),    
    adImage1: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000 || img[0] ==null, {
        message: "El archivo debe ser menor a 2.5MB",
    }).optional().nullable(),    
    adImage2: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000 || img[0] ==null, {
        message: "El archivo debe ser menor a 2.5MB",
    }).optional().nullable(),    
    adImage3: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000 || img[0] ==null, {
        message: "El archivo debe ser menor a 2.5MB",
    }).optional().nullable(),    
    adImage4: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000 || img[0] ==null, {
        message: "El archivo debe ser menor a 2.5MB",
    }).optional().nullable(),    
    adImage5: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000 || img[0] ==null, {
        message: "El archivo debe ser menor a 2.5MB",
    }).optional().nullable(),    
    adImage6: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000 || img[0] ==null, {
        message: "El archivo debe ser menor a 2.5MB",
    }).optional().nullable(),    

})

export const createAdFormSchemaDefaultValues = {
        name:                          '', 
        description:                   '', 
        coords:                         {}, 
        locationCountry:               '', 
        locationState:                 '', 
        locationCity:                  '', 
        address:                       '', 
        price:                          0, 
        currency:                      'COP',  //?? Por defecto es COP en backend
        rooms:                          '1', 
        livingRoom:                     true,
        bathrooms:                      '1', 
        isSharedBathroom:               false,
        floors:                         1, 
        stratum:                        '',
        yard:                           false,
        squareMeters:                   0,
        motoParking:                    false,
        carParking:                     false,
        adminitrationCost:              0,
        hasKitchen:                     true, //TODO:debe ser añadida en backend
        isSharedKitchen:                false,
        furnished:                      false,
        hasElectricLightService:        true,
        hasGasService:                  true,
        hasWaterService:                true,
        hasInternetServiceIntegrated:   false,
        period:                         '',
        propertyType:                   ''
}