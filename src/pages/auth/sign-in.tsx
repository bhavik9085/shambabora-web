import { Card } from "@/components/ui/card";
import { UserAuthForm } from "./components/user-auth-form";
import { ToastContainer } from "react-toastify";

export default function SignIn2() {
  return (
    <>
      {/* h-svh */}
      <div className="container grid   flex-col items-start justify-center lg:max-w-none lg:px-0 ">
        <ToastContainer />
        <div className="mx-auto flex w-full flex-col justify-start space-y sm:w-[480px] lg:p-8">
          <Card className="p-6">
            <div className="flex flex-col space-y-2 text-left">
              <div className="mb-4 flex items-center justify-center">
                <img
                  src="/images/shambabora.svg"
                  alt="shamba bora logo"
                  className="h-24 w-24"
                />
                {/* <h1 className='text-xl font-medium'>Shamba Bora</h1> */}
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            </div>
            <UserAuthForm />
            <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
              By clicking login, you agree to our{" "}
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
