import { Button } from "@/components/ui/button";
import { auth, signIn } from "../../../auth";
import { redirect } from "next/navigation";

export default async function Signin() {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="min-h-screen container mx-auto flex justify-center items-center">
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button>Continue with GOOGLE</Button>
      </form>
    </div>
  );
}
