

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { CompleteUserProfile } from "@/interfaces/user/complete-user-profile.interface";


interface Props {
    cloudFrontUrl: string;
    userData: CompleteUserProfile;
}

export const AccountInformation = ({ userData, cloudFrontUrl }: Props) => {
    return (
        <Card className="mx-auto p-6 rounded-lg shadow-lg w-full" >
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                        <AvatarImage
                            className=" object-contain"
                            src={`${cloudFrontUrl}/${userData?.profileImage?.key}`}
                            alt={userData.names}
                        />
                        <AvatarFallback>
                            {`${userData.names.substring(0, 1)}${userData.lastnames.substring(0, 1)}`}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-bold capitalize">
                            {userData.names} {userData.lastnames}
                        </h2>
                        <p className="text-sm text-muted-foreground">{userData.email}</p>
                    </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="font-semibold">Nacionalidad:</span> {userData.nationality}
                    </div>
                    <div>
                        <span className="font-semibold">Teléfono:</span> +{userData.phoneCode} {userData.phone}
                    </div>
                    <div>
                        <span className="font-semibold">Nacimiento:</span>{" "}
                        {userData.birthdate ? format(new Date(userData.birthdate), "yyyy-MM-dd") : "N/A"}
                    </div>
                    <div>
                        <span className="font-semibold">Género:</span> {userData.gender ? (userData.gender =='M' ? 'Masculino': 'Femenino' )  : "No especificado"}
                    </div>
                    <div>
                        <span className="font-semibold">Última conexión:</span>{" "}
                        {userData.lastConnection ? format(new Date(userData.lastConnection), "yyyy-MM-dd HH:mm") : "N/A"}
                    </div>
                    <div>
                        <span className="font-semibold">Estado:</span>{" "}
                        <Badge variant={userData.state ? "success" : "destructive"}>
                            {userData.state ? "Activo" : "Inactivo"}
                        </Badge>
                    </div>
                    <div className="flex">
                        <span className="font-semibold">Ubicación:</span>
                        <ol className=" px-2">
                            {userData.coords ?
                                <>
                                    <li>lat: {userData?.coords?.lat}</li>
                                    <li>lng: {userData?.coords?.lng}</li>
                                </>
                                :<li> Sin seleccionar en el mapa</li>
                        }
                        </ol>
                    </div>
                </div>

                <div className="mt-4">
                    <span className="font-semibold">Roles:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {userData.roles.map((role) => (
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
