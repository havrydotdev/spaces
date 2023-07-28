import { prompt } from "@/app/fonts";
import { AuthInput, CustomButton } from "@/components";

export default function RegisterPage(): React.JSX.Element {
  return (
    <main className="w-screen flex justify-center">
      <div className="mx-[30px] sm:min-w-[480px] sm:max-w-[600px]">
        <h1 className={`mt-[90px] ${prompt.className} font-medium text-[50px]`}>
          Sign-up
        </h1>
        <form method="post" action="/api/user/register" className="mt-[70px]">
          <input name="csrfToken" type="hidden" />
          <AuthInput placeholder="Username" />
          <AuthInput
            placeholder="Full name"
            type="text"
            className="mt-[21px]"
          />
          <AuthInput
            placeholder="Password"
            type="password"
            className="mt-[21px]"
          />

          <div className="flex mt-[61px] sm:gap-[23px] justify-center max-sm:flex-col max-sm:items-center max-sm:gap-[15px] max-sm:mt-[80px]">
            <CustomButton text="Sign up" type="submit" color="primary" />
          </div>
        </form>
      </div>
    </main>
  );
}
