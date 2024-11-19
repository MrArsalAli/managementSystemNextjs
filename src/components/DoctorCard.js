"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckIcon, XIcon, FilterIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HomeIcon, ClockIcon, IdCardIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DoctorDetailSheet from "./DoctorDetailSheet";
import { updateRequest } from "@/actions/requests";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const DoctorCard = ({ request, isAdmin, onAccept, onReject }) => (
  <Card key={request._id}>
    <CardHeader className="flex flex-row items-center">
      <Avatar className="h-10 w-10">
        <Image
          src={request.user.picture}
          alt={`${request.user.firstName} ${request.user.lastName}`}
          width={40}
          height={40}
        />
        <AvatarFallback>
          {request.user.firstName[0]}
          {request.user.lastName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="ml-4">
        <CardTitle className="text-lg">
          {request.user.firstName} {request.user.lastName}
        </CardTitle>
        <CardDescription className="capitalize">
          {request.status}
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HomeIcon className="h-4 w-4" />
            <span className="font-semibold">Hospital:</span>
          </div>
          <span>{request.hospital}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <IdCardIcon className="h-4 w-4" />
            <span className="font-semibold">Gender:</span>
          </div>
          <span className="capitalize">{request.gender}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            <span className="font-semibold">Appointment:</span>
          </div>
          <span>{request.appointmentTime}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <DoctorDetailSheet doctor={request} />
      {isAdmin ? (
        <div>
          {request.status === "rejected" ? (
            <Button
              size="icon"
              variant="outline"
              className="bg-red-50 hover:bg-red-100 text-red-600"
              disabled
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Request rejected</span>
            </Button>
          ) : request.status === "accepted" ? (
            <Button
              size="icon"
              variant="outline"
              className="bg-green-50 hover:bg-green-100 text-green-600"
              disabled
            >
              <CheckIcon className="h-4 w-4" />
              <span className="sr-only">Request accepted</span>
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                className="bg-green-50 hover:bg-green-100 text-green-600"
                onClick={onAccept}
              >
                <CheckIcon className="h-4 w-4" />
                <span className="sr-only">Accept doctor request</span>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="bg-red-50 hover:bg-red-100 text-red-600"
                onClick={onReject}
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Reject doctor request</span>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Link href={`/doctors/${request._id}`}>
          <Button>Book Appointment</Button>
        </Link>
      )}
    </CardFooter>
  </Card>
);

export default DoctorCard;
