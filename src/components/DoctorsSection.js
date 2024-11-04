import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Categories, doctors } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HomeIcon, ClockIcon, IdCardIcon } from "@radix-ui/react-icons";

export default function DoctorsSection({ isHome }) {
  const filtered = isHome ? doctors.slice(0, 6) : doctors;
  return (
    <>
      <div className="container mx-auto my-20">
        <div className="flex justify-between my-2">
          <div className="font-bold text-2xl">PREMIUMS</div>
          {isHome ? (
            <Link href={"/doctors"}>
              <Button variant="outline">See All</Button>
            </Link>
          ) : (
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Speciality" />
              </SelectTrigger>
              <SelectContent>
                {Categories.map((category) => (
                  <SelectItem value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
          {filtered.map((doctor) => (
            <Card key={doctor.id}>
              <CardHeader className="flex flex-row">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div className="pl-2">
                  <CardTitle>{doctor.name}</CardTitle>
                  <CardDescription>{doctor.category}</CardDescription>
                </div>
              </CardHeader>
              {!isHome && (
                <CardContent>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <HomeIcon />
                      <p className="font-bold">Hospital :</p>
                    </div>
                    <p>{doctor.hospital}</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <IdCardIcon />
                      <p className="font-bold">Gender :</p>
                    </div>
                    <p>{doctor.gender}</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <ClockIcon />
                      <p className="font-bold">Appointment Time :</p>
                    </div>
                    <p>{doctor.appointmentTime}</p>
                  </div>
                </CardContent>
              )}
              <CardFooter>
                <Link href={`/doctors/${doctor.id}`}>
                <Button>See Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
