import MainIcon from "@/public/main.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[linear-gradient(180deg,_#7F6AFF_0%,_#5C4BC5_100%)] h-screen">
      <div className="block mx-[70px] pt-[40px] max-sm:mx-[20px]">
        <div className="flex justify-between">
          <a
            className="font-normal text-grayc uppercase opacity-[0.5] text-[25px] max-sm:text-[18px]"
            href="/newspaper"
          >
            join the newsletter
          </a>
          <a
            className="font-normal text-grayc text-[25px] uppercase max-sm:text-[18px]"
            href="/changelog"
          >
            changelog
          </a>
        </div>
        <MainIcon className="mx-auto mt-[140px] max-w-[495px]" />
        <h1 className="font-normal text-[25px] text-grayc text-center max-w-[449px] mx-auto max-sm:text-[20px] max-sm:mt-[40px]">
          <span className="font-semibold">Simple</span>,{" "}
          <span className="font-semibold">clean</span> and fast to get your
          tasks done <span className="underline">best</span>.
        </h1>

        <Link
          className="block w-[256px] h-[81px] border-[2.5px] border-solid border-[#F5F3FF] mx-auto mt-[74px] rounded-lg max-sm:mt-[100px] text-[23px] uppercase text-[#FFF] text-center font-medium tracking-1"
          href="/auth/login"
        >
          <p className="mt-[20px]">Get started</p>
        </Link>
      </div>
    </main>
  );
}
