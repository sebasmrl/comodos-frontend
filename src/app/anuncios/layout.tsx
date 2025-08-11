import { NavBar } from "../components/navbar/NavBar";


export default async function AnunciosLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
  return (
    <div className="w-full h-full">
      <NavBar />
      {children}
    </div>
  );
}