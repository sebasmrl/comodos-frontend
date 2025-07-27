import { Coords } from "../coords.interface";
import { Image } from "../image/image.interface";

export interface CreateAdFormPlainData {
    name:                         string;
    description:                  string;
    coords:                       Coords;
    locationCountry:              string;
    locationState:                string;
    locationCity:                 string;
    address:                      string;
    price:                        number;
    currency:                     string;
    rooms:                        number;
    livingRoom:                   boolean;
    bathrooms:                    number;
    isSharedBathroom:             boolean;
    floors:                       number;
    stratum:                      string;
    yard:                         boolean;
    squareMeters:                 number;
    motoParking:                  boolean;
    carParking:                   boolean;
    adminitrationCost?:           number;
    isSharedKitchen:              boolean;
    furnished:                    boolean;
    hasElectricLightService:      boolean;
    hasGasService:                boolean;
    hasWaterService:              boolean;
    hasInternetServiceIntegrated: boolean;
    period:                       string;
    propertyType:                 string;
    //images:                       Image[];
    //user:                         string;
}



export interface CreateAdResponse extends CreateAdFormPlainData{
    id:string;
    images: Image[];
}
