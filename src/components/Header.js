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

export default function Header() {
  const session = null;
  return (
    <div className="flex justify-between container mx-auto p-2 border">
      <div className="text-3xl font-mono">LOGO</div>
      <div>
        {session ?
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
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
        </DropdownMenu> :
        <Link href={"/signin"}>
          <Button variant={"outline"}>Login</Button>
        </Link>
        }
      </div>
    </div>
  );
}
