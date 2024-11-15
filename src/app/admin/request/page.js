import React from "react";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { getRequest } from "@/actions/requests";
import DoctorRequests from "@/components/RequestSection";

export default async function Requests() {
  const session = await auth();
  console.log("session==>", session.user.role);
  if (!session || session.user.role != "admin") redirect("/");
  const requests = await getRequest();
  console.log("requests==>", requests);

  return (
    <div className="container mx-auto">
      <h1 className="my-4 font-bold text-3xl">{`Doctor's`} Requests</h1>

      {/* <DoctorRequests requests={requests} /> */}
    </div>
  );
}
