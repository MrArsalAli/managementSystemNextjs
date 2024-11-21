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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateRequest } from "@/actions/requests";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import DoctorCard from "./DoctorCard";

export default function DoctorRequests({ requests = [], status }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState({
    type: null,
    requestId: null,
  });
  const [statusFilter, setStatusFilter] = useState(status);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleAction = (type, requestId) => {
    setSelectedAction({ type, requestId });
    setDialogOpen(true);
  };

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

  const confirmAction = async () => {
    if (selectedAction.type === "accept") {
      await updateRequest(selectedAction.requestId, "accepted");
    } else if (selectedAction.type === "reject") {
      await updateRequest(selectedAction.requestId, "rejected");
    }
    setDialogOpen(false);
  };

  // const filteredRequests = requests.filter((request) => {
  //   if (statusFilter === "all") return true;
  //   return request.status === statusFilter;
  // });

  return (
    <>
      <div className="my-4 container mx-auto justify-between items-center">
        <div className="flex justify-between my-2">
          <h2 className="text-3xl font-bold">Doctor Requests</h2>
          <div className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5 text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request) => (
            <DoctorCard
              key={request._id}
              request={request}
              isAdmin={true}
              onAccept={() => handleAction("accept", request._id)}
              onReject={() => handleAction("reject", request._id)}
            />
          ))}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Action</DialogTitle>
              <DialogDescription>
                Are you sure you want to {selectedAction.type} this doctor
                request?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmAction}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
