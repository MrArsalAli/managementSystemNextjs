import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { getRequest } from "@/actions/requests";
import React from "react";

import DoctorRequests from "@/components/RequestSection";

export default async function Requests() {
  const session = await auth();
  if (!session || session.user.role != "admin") redirect("/");
  const { requests } = await getRequest();
  return (
    <div className="container mx-auto">
      <h1 className="my-4 font-bold text-3xl">{`Doctor's`} Requests</h1>
        <DoctorRequests requests={requests} />
    </div>
  );
}
