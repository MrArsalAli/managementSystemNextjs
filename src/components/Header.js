import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "../../auth";
import Image from "next/image";

export default async function Header() {
  const session = await auth()
  return (
    <div className="flex justify-between container mx-auto p-2 border">
      <div className="flex items-center ">
        <Image
        height={50}
        width={50}
        src={"https://images.pexels.com/photos/7048014/pexels-photo-7048014.jpeg?auto=compress&cs=tinysrgb&w=600"}
        />
      </div>
      <div>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
              height={40}
              width={40}
              className="rounded-full"
              src={session?.user?.image}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/profile"}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link href={"/appointments"}>
                <DropdownMenuItem>My Appointments</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/signin"}>
            <Button variant={"outline"}>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
