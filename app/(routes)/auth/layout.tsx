import PlanetIcon from "@/public/planet.svg";
import SpacesIcon from "@/public/spaces.svg";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex mt-[37px] ml-[40px]">
        <PlanetIcon />
        <div className="flex flex-col justify-center">
          <SpacesIcon className="max-sm:hidden" />
        </div>
      </div>
      {children}
    </>
  );
}
