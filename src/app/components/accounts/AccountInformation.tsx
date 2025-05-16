

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { CompleteUserProfile } from "@/interfaces/user/complete-user-profile.interface";

const user = {
    "id": "1e0b735d-6447-4b33-ac4e-75d99c221fb6",
    "dni": "34567665465",   
    "email": "sebastian@email.com",
    "names": "SEBASTIAN",
    "lastnames": "MORALES",
    "gender": null,
    "birthdate": "2024-02-11",
    "nationality": "Colombiano",
    "phone": "2345432",
    "phoneCode": "22",
    "lastConnection": "2025-05-04T03:31:48.147Z",
    "state": true,
    "coords": {
        "lat": 9.570868,
        "lng": -79.297333
    },
    "roles": [
        "USER",
        "SUPER_ADMIN"
    ],
    "profileImage": {
        "id": "8990a717-b1be-4b21-a462-f438f7d6f76c",
        "key": "8990a717-b1be-4b21-a462-f438f7d6f76c"
    }
}

interface Props{
    cloudFrontUrl: string;
    userData: CompleteUserProfile;
}

export const AccountInformation = ({ userData, cloudFrontUrl}:Props) => {
    return (
        <Card className="mx-auto p-6 rounded-lg shadow-lg w-full" >
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                        <AvatarImage
                            src={`${cloudFrontUrl}/${userData?.profileImage?.key}`}
                            alt={user.names}
                        />
                        <AvatarFallback>
                            {`${userData.names.substring(0, 1)}${userData.lastnames.substring(0, 1)}`}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-bold capitalize">
                            {user.names} {user.lastnames}
                        </h2>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="font-semibold">DNI:</span> {user.dni}
                    </div>
                    <div>
                        <span className="font-semibold">Teléfono:</span> +{user.phoneCode} {user.phone}
                    </div>
                    <div>
                        <span className="font-semibold">Nacimiento:</span>{" "}
                        {user.birthdate ? format(new Date(user.birthdate), "yyyy-MM-dd") : "N/A"}
                    </div>
                    <div>
                        <span className="font-semibold">Género:</span> {user.gender ?? "No especificado"}
                    </div>
                    <div>
                        <span className="font-semibold">Nacionalidad:</span> {user.nationality}
                    </div>
                    <div>
                        <span className="font-semibold">Última conexión:</span>{" "}
                        {user.lastConnection ? format(new Date(user.lastConnection), "yyyy-MM-dd HH:mm") : "N/A"}
                    </div>
                    <div>
                        <span className="font-semibold">Estado:</span>{" "}
                        <Badge variant={user.state ? "success" : "destructive"}>
                            {user.state ? "Activo" : "Inactivo"}
                        </Badge>
                    </div>
                    <div className="flex">
                        <span className="font-semibold">Ubicación:</span>
                        <ol className=" px-2">
                            <li>lat: {user.coords.lat}</li>
                            <li>lng: {user.coords.lng}</li>
                        </ol>
                    </div>
                </div>

                <div className="mt-4">
                    <span className="font-semibold">Roles:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {user.roles.map((role) => (
                            <Badge key={role} variant="secondary">
                                {role}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
