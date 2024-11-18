"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckIcon, XIcon, FilterIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HomeIcon, ClockIcon, IdCardIcon } from "@radix-ui/react-icons"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DoctorDetailSheet from "./DoctorDetailSheet"
import { updateRequest } from "@/actions/requests"

export default function Component({ requests = [] }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedAction, setSelectedAction] = useState({
    type: null,
    requestId: null,
  })
  const [statusFilter, setStatusFilter] = useState("all")

  const handleAction = (type, requestId) => {
    setSelectedAction({ type, requestId })
    setDialogOpen(true)
  }

  const confirmAction = async () => {
    if (selectedAction.type === "accept") {
      await updateRequest(selectedAction.requestId, "accepted")
    } else if (selectedAction.type === "reject") {
      await updateRequest(selectedAction.requestId, "rejected")
    }
    setDialogOpen(false)
  }

  const filteredRequests = requests.filter((request) => {
    if (statusFilter === "all") return true
    return request.status === statusFilter
  })

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Doctor Requests</h2>
        <div className="flex items-center gap-2">
          <FilterIcon className="h-5 w-5 text-gray-500" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
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
        {filteredRequests.map((request) => (
          <Card key={request._id}>
            <CardHeader className="flex flex-row items-center">
              <Avatar className="h-10 w-10">
                <Image
                  src={request.user.picture}
                  alt={`${request.user.firstName} ${request.user.lastName}`}
                  width={40}
                  height={40}
                />
                <AvatarFallback>{request.user.firstName[0]}{request.user.lastName[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <CardTitle className="text-lg">
                  {request.user.firstName} {request.user.lastName}
                </CardTitle>
                <CardDescription className="capitalize">{request.status}</CardDescription>
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
                    onClick={() => handleAction("accept", request._id)}
                  >
                    <CheckIcon className="h-4 w-4" />
                    <span className="sr-only">Accept doctor request</span>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="bg-red-50 hover:bg-red-100 text-red-600"
                    onClick={() => handleAction("reject", request._id)}
                  >
                    <XIcon className="h-4 w-4" />
                    <span className="sr-only">Reject doctor request</span>
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to {selectedAction.type} this doctor request?
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
    </>
  )
}