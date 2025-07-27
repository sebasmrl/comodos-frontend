import { getPublicUserProfileById } from "@/actions/user/get-public-user-profile";
import { NavBar } from "@/app/components/navbar/NavBar";
import { PublicUserProfile } from "@/interfaces/user";
import { toUpperCamelCase } from "@/lib/custom/string";
import { CLOUDFRONT_URL } from "@/config/env";
import Image from "next/image";
import { redirect } from "next/navigation";
import { dateToESFormat } from "@/utils/date-transformer";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Particles } from "@/components/magicui/particles";
import { AdCard, reformatAdDataToProfile } from "@/app/components/ads/AdCard";
import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function UsuarioDesdeUserRolePage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  const profileRs = await getPublicUserProfileById(id)

  if (profileRs.status != 200) redirect('/')
  const profile = profileRs.data as PublicUserProfile;
  console.log({coords: session?.user.data.coords})
  const ads = profile.ads.map( ad => (reformatAdDataToProfile(ad, session?.user.data.coords ?? {lat:73.9448484, lng:43.0009233})))
  return (
    <div className="flex flex-col">
      <NavBar />

      <section className="relative flex flex-col py-6 px-4 h-44 md:h-48">
        <Particles quantity={50} color={"#C2410C"}  size={3} className="absolute top-0 left-0 w-full h-full" /> {/* color="#FF9800" */}
        <div className="flex flex-col items-center absolute top-20 left-0 w-full overflow-hidden">
          <div className="z-10 rounded-full overflow-hidden aspect-square min-w-36 w-36 h-36 md:min-w-44 md:h-44 md:w-44 border">
            <Image src={`${CLOUDFRONT_URL}/${profile.profileImage.key}`} alt={""} width={200} height={200} className="object-cover aspect-square" />
          </div>
        </div>
      </section>
      
      <div className="flex flex-col justify-center self-center p-4 pt-16 text-center">
        <TypingAnimation className="leading-tight p-0">{toUpperCamelCase(`${profile.names} ${profile.lastnames}`)}</TypingAnimation>
        <p className="font-thin text-lg leading-0">{profile.nationality}</p>
        <p className="text-sm md:text-base"><strong>Ultima conexión: </strong><span>{dateToESFormat(new Date(profile.lastConnection))}</span></p>
      </div>
      <Separator />

      <section className="self-center flex flex-col w-full sm:w-4/5 md:w-2/3 sm:items-center pt-6 pb-16 gap-4">
        <h2 className="font-bold text-xl text-center text-emerald-500 dark:text-emerald-600">Anuncios publicados</h2>
        <div className="flex flex-col gap-4">
          {
            ads.map((ad)=>(
              <AdCard className="" key={ad.id} adData={ ad }/>
            ))
          }
        </div>
      </section>
    </div>
  );
}