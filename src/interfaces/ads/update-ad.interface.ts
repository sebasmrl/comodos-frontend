import { Coords } from "../coords.interface";


export interface UpdateAdFormPlainData {
    name ?:                         string;
    description ?:                  string;
    coords ?:                       Coords;
    locationCountry ?:              string;
    locationState ?:                string;
    locationCity ?:                 string;
    address ?:                      string;
    price ?:                        number;
    currency ?:                     string;
    rooms ?:                        number;
    livingRoom ?:                   boolean;
    bathrooms ?:                    number;
    isSharedBathroom ?:             boolean;
    floors ?:                       number;
    stratum ?:                      string;
    yard ?:                         boolean;
    squareMeters ?:                 number;
    motoParking ?:                  boolean;
    carParking ?:                   boolean;
    adminitrationCost ?:           number;
    isSharedKitchen ?:              boolean;
    furnished ?:                    boolean;
    hasElectricLightService ?:      boolean;
    hasGasService ?:                boolean;
    hasWaterService ?:              boolean;
    hasInternetServiceIntegrated ?: boolean;
    period ?:                       string;
    propertyType ?:                 string;
}

