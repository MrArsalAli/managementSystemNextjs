"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "../ui/button";
import { updateAppointment } from "@/actions/appointment";
import { useState } from "react";
dayjs.extend(relativeTime);



export default async function DoctorAppointmentCard({ appointment }) {
  const handleAccept = async () => {
    setLoading(true);
    await updateAppointment(appointment._id, "accepted");
    setLoading(false);
  };
  
  const handleReject = async () => {
    setLoading(true);
    await updateAppointment(appointment._id, "cancelled");
    setLoading(false);
  };
  
  const [loading, setLoading] = await useState(false);
  return (
    <Card key={appointment._id} className="shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={appointment?.user?.picture}
            alt={`${appointment.user.firstName} ${appointment.user.lastName}`}
          />
          <AvatarFallback>
            {appointment.user.firstName[0]}
            {appointment.user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>
            {appointment?.user.firstName} {appointment?.user.lastName}
          </CardTitle>
          <CardDescription className="uppercase">
            {appointment.status}
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
            <span>{appointment?.request.appointmentTime}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>{appointment?.request.hospital}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-medium">
              Fee: ${appointment?.fees}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {loading && <span>Loading...</span>}
        {appointment.status === "pending" && (
          <>
            <Button
              size="sm"
              variant="outline"
              className="bg-green-50 hover:bg-green-100 text-green-600"
              onClick={() => handleAccept(appointment._id)}
            >
              <CheckIcon className="h-4 w-4 mr-2" />
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-red-50 hover:bg-red-100 text-red-600"
              onClick={() => handleReject(appointment._id)}
            >
              <XIcon className="h-4 w-4 mr-2" />
              Reject
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
