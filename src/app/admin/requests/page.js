import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { getRequest } from "@/actions/requests";
import React from "react";
import DoctorRequests from "@/components/RequestSection";

export default async function Requests({ searchParams }) {
  const { status } = searchParams;
  const session = await auth();
  if (!session || session.user.role != "admin") redirect("/");
  const { requests } = await getRequest(status);
  return <DoctorRequests status={status} requests={requests} />;
}
