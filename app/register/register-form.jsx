"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { registerUser } from "@/lib/apis/server";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const DEFAULT_ERROR = {
  error: false,
  message: " ",
};

//keep this as a client component

export default function RegisterForm() {
  const [error, setError] = useState(DEFAULT_ERROR);
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const handleSubmitForm = async (event) => {
    event?.preventDefault();

    const formData = new FormData(event?.currentTarget);
    const name = formData.get("name").toString();
    const email = formData.get("email").toString();
    const password = formData.get("password") ?? "";
    const confirmPassword = formData.get("confirmPassword") ?? "";
    //console.log("Submitted!", { name, email, password, ConfirmPassword });

    //Basic font validation logic
    //if (name && email && password && confirmPassword) {
    if (password === confirmPassword) {
      setError(DEFAULT_ERROR);

      //Before the Request
      setLoading(true);
      const registerResp = await registerUser({
        name,
        email,
        password,
      });
      //after the request
      setLoading(false);
      if (registerResp?.error) {
        setError({ error: true, message: registerResp.error });
      } else {
        toast({
          variant: "sucess",
          title: "your Registration Sucessfull!",
          description: "Please continue with login",
          action: (
            <ToastAction altText="login" className="hover:bg-green-600/80">
              Login
            </ToastAction>
          ),
        });
      }
      //console.log("registerResp", registerResp);
    } else {
      setError({ error: true, message: "password doesnt match" });
    }
    //}
    //console.log("Error!", error);
  };

  return (
    <div>
      {" "}
      <div className="flex justify-center items-center min-h-screen">
        <Card className="bg-blue-50/90 w-[350px]">
          <CardHeader>
            {" "}
            <CardTitle> Create an Account</CardTitle>
            <CardDescription>
              {" "}
              Enter your infromation get started{" "}
            </CardDescription>
          </CardHeader>{" "}
          <form onSubmit={handleSubmitForm}>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    placeholder="vishwa Rasanag"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="vishwa@example.com"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter the new password"
                  />
                </div>

                <div className="flex justify-center">
                  {" "}
                  {/*className="flex justify-center"*/}
                  {error.error && (
                    <span className="text-red-600 text-xs text-center">
                      {" "}
                      {/*className="text-red-600 text-xs text-center*/}
                      {error.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Enter Confrim password"
                  />
                </div>
                <div className="flex justify-center gap-1 text-xs text-blue-600 ">
                  Already an Account ?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Login
                  </Link>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              {" "}
              <Button
                className="flex-1 bg-green-600 hover:bg-blue-600"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="animate-spin" />}
                Register
              </Button>{" "}
            </CardFooter>
          </form>
        </Card>
      </div>{" "}
    </div>
  );
}
