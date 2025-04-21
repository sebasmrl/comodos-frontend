import { Coords } from "../coords.interface";

export interface Ad {
    id:                           string;
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
    renevaldDate:                 Date;
    expiredDate:                  Date;
    updateAt:                     Date;
    createdAt:                    Date;
    images:                       Image[];
    period:                       Period;
    propertyType:                 PropertyType;
}

export interface FavoriteAd extends Ad{
    user: string
}


export interface Image {
    id:        string;
    fieldName: string;
    key:       string;
}

export interface Period {
    id:   string;
    name: string;
}
export interface PropertyType {
    id:   string;
    name: string;
}

