"use server";

import { revalidatePath } from "next/cache";

export async function addAppointment(data) {
  let add = await fetch(`${process.env.BASE_URL}api/appointment`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  add = add.json();
  return add;
}

export async function getAppointments(role, id) {
  let url;
  if (role == "user") {
    url = `${process.env.BASE_URL}api/appointment?user=${id}`;
  } else {
    url = `${process.env.BASE_URL}api/appointment?doctor=${id}`;
  }
  let appointments = await fetch(url, { cache: "no-cache" });
  appointments = appointments.json();
  return appointments;
}
