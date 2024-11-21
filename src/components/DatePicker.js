"use client";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { addAppointment } from "@/actions/appointment";

export function DatePicker({ session, request }) {
  const [date, setDate] = React.useState(new Date());
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const handleAppoinmentDate = () => {
    let isDateInFuture = Date.now() < new Date(date);
    if (!isDateInFuture)
      return toast({
        title: "Select Correct Date!Mazaq ni banao",
      });
    setLoading(true);
    const obj = { user: session.user._id, request: request, date };
    const response = addAppointment(obj);
    toast({
      title: response.msg,
    });
  };
  return (
    <div className="flex flex-col my-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {session ? (
        <Button onClick={handleAppoinmentDate} className="w-full my-4">
          Book Appointment
        </Button>
      ) : (
        <Link href={"/signin"}>
          <Button className="w-full my-4">Login To Book An Appointment</Button>
        </Link>
      )}
    </div>
  );
}
