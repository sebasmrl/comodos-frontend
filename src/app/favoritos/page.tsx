//import { auth } from "@/auth";

//import { redirect } from "next/navigation";
import { NavBar } from "../components/navbar/NavBar";
import { getFavoriteAdsAction } from "@/actions/cookies/server/favorites/favorites.action";

export default async function FavoritosPage() {
  //TODO: Activate later session blocked 
  //const session = await auth();
  //if (!(session?.user)) redirect('/');


  const favoriteAds = await getFavoriteAdsAction();

  return (
    <div>
      <NavBar />
      <p>length:{favoriteAds.length}</p> 
      {
       favoriteAds.length > 0 && favoriteAds.map((ad) => (
          <div key={ad.id}>
              <pre className="p-2">{JSON.stringify(ad,null, 3)}</pre>
          </div>)
        )
      }
    </div>
  );
}