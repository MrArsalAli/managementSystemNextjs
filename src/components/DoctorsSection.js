import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Categories, doctors } from "@/lib/data";
import { Button } from "./ui/button";
import Link from "next/link";
import { getRequest } from "@/actions/requests";
import DoctorCard from "./DoctorCard";

export default async function DoctorsSection({ isHome }) {
  const { requests } = await getRequest("accepted");
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
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
          {requests.map((request) => (
            <DoctorCard key={request._id} request={request} isAdmin={false} />
          ))}
        </div>
      </div>
    </>
  );
}
