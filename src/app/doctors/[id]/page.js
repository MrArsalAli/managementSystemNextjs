import { getSingleRequest } from "@/actions/requests";
import { DatePicker } from "@/components/DatePicker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ClockIcon,
  HomeIcon,
  CreditCardIcon,
  PhoneIcon,
  MapPinIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  CalendarIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { auth } from "../../../../auth";

export default async function DoctorDetail({ params }) {
  const { requests } = await getSingleRequest(params.id);
  const session = await auth();
  const doctor = requests;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="w-32 h-32">
            <AvatarImage
              src={doctor.user.picture}
              alt={`${doctor.user?.firstName} ${doctor.user?.lastName}`}
            />
            <AvatarFallback>
              {doctor.user?.firstName[0]}
              {doctor?.user?.lastName?.[0] || ""}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl font-bold">
              Dr. {doctor.user?.firstName} {doctor.user?.lastName}
            </CardTitle>
            <p className="text-lg text-muted-foreground">
              {doctor.specialization} Specialist
            </p>
            <div className="flex items-center justify-center sm:justify-start mt-2">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span className="ml-1 text-sm text-muted-foreground">
                {doctor.experience} years experience
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">{doctor.bio}</p>
          <Separator className="my-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem
              icon={<HomeIcon />}
              label="Hospital"
              value={doctor.hospital}
            />
            <InfoItem
              icon={<UserIcon />}
              label="Gender"
              value={doctor.gender}
            />
            <InfoItem
              icon={<ClockIcon />}
              label="Appointment Time"
              value={doctor.appointmentTime}
            />
            <InfoItem
              icon={<GraduationCapIcon />}
              label="Degree"
              value={doctor.degree.toUpperCase()}
            />
            <InfoItem
              icon={<BriefcaseIcon />}
              label="Specialization"
              value={doctor.specialization}
            />
            <InfoItem
              icon={<PhoneIcon />}
              label="Contact"
              value={doctor.number}
            />
            <InfoItem
              icon={<MapPinIcon />}
              label="Address"
              value={doctor.address}
            />
            <InfoItem
              icon={<CreditCardIcon />}
              label="Fees"
              value={`$${doctor.fees}`}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch">
          <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
          <div className="flex items-center gap-4 mb-4">
            <CalendarIcon className="w-6 h-6 text-primary" />
            <span className="font-medium">Select Date:</span>
          </div>
          <DatePicker session={session} request={params.id} />
        </CardFooter>
      </Card>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold capitalize">{value}</p>
      </div>
    </div>
  );
}
