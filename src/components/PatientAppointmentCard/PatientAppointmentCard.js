import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function PatientAppointmentCard({ appointment }) {
  return (
    <Card key={appointment._id} className="shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={appointment?.request?.user?.picture}
            alt={`${appointment.user.firstName} ${appointment.user.lastName}`}
          />
          <AvatarFallback>
            {appointment.user.firstName[0]}
            {appointment.user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>
            Dr. {appointment?.request?.user.firstName}{" "}
            {appointment?.request?.user.lastName}
          </CardTitle>
          <CardDescription className="uppercase font-bold">
            {appointment?.request?.specialization}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>
              {dayjs(new Date(appointment?.date)).fromNow() +
                " " +
                dayjs(new Date(appointment?.date)).format("dddd DD MMMM")}
            </span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>{appointment?.request?.appointmentTime}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>{appointment?.request?.hospital}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            {/* <Badge
                      variant={
                        status === "pending"
                          ? "secondary"
                          : status === "accepted"
                          ? "success"
                          : "destructive"
                      }
                    >
                      {status}
                    </Badge> */}
            <span className="text-sm font-medium">
              Fee: ${appointment?.request?.fees}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
