import { Coords } from "../coords.interface";
import { Image } from "../image/image.interface";
import { AdPeriod } from "../ad-period/ad-period.interface";
import { PropertyType } from "../property-types/property-type.interface";
import { PublicUserData } from "../user/public-user-profile.interface";

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
    administrationCost?:          number;
    isSharedKitchen:              boolean;
    hasKitchen:                   boolean;
    furnished:                    boolean;
    hasElectricLightService:      boolean;
    hasGasService:                boolean;
    hasWaterService:              boolean;
    hasInternetServiceIntegrated: boolean;
    renewalDate:                  Date;
    expiredDate:                  Date;
    updateAt:                     Date;
    createdAt:                    Date;
    images:                       Image[];
    period:                       AdPeriod;
    propertyType:                 PropertyType;
}

export interface FavoriteAd extends Ad{
    user: string
}

export interface AdWithUserId extends Ad{
    user: string
}

export interface AdWithUser extends Ad {
    user:PublicUserData
}







