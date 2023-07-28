import PlanetIcon from "@/public/planet.svg";
import SpacesIcon from "@/public/spaces.svg";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link
        className="flex mt-[37px] ml-[40px] max-sm:ml-[30px] max-w-[155px] gap-[10px]"
        href="/"
      >
        <PlanetIcon />
        <div className="flex flex-col justify-center">
          <SpacesIcon className="max-sm:hidden" />
        </div>
      </Link>
      {children}
    </>
  );
}
