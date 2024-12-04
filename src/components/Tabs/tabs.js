"use client";

import { useEffect, useState } from "react";
import { FilterIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function AppointmentFilterTabs({ status }) {
  const [statusFilter, setStatusFilter] = useState(status);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (statusFilter) {
      params.set("status", statusFilter);
    } else {
      params.delete("status");
    }
    replace(`${pathname}?${params.toString()}`);
    console.log("params==>", params);
  }, [statusFilter]);

  return (
    <>
      <div className="my-4 container mx-auto justify-between items-center">
        <div className="flex justify-between my-2">
          <div className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5 text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="cancelled">Rejected</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="past">Past</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
