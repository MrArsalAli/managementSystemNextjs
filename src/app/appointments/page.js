import { auth } from "../../../auth";
import { getAppointments } from "@/actions/appointment";
import DoctorAppointmentCard from "@/components/DoctorAppointmentCard/DoctorAppointmentCard.js";
import PatientAppointmentCard from "@/components/PatientAppointmentCard/PatientAppointmentCard.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default async function Appointments() {
  const session = await auth();
  const { appointments } = await getAppointments(
    session?.user?.role == "doctor" ? "doctor" : "user",
    session?.user?._id
  );

  console.log("Appointments==>", appointments)

  const isDoctor = session.user.role == "doctor";
  return (
    <div className=" min-h-screen container mx-auto">
      <h1 className="my-4 font-bold text-2xl">
        {isDoctor ? "Patients Appointments" : "Your Doctor Appointments"}
      </h1>
      <div className="grid grid-cols-3 gap-4 my-8">
        {appointments?.map((appointment) =>
          isDoctor ? (
            <DoctorAppointmentCard
              key={appointment._id}
              appointment={appointment}
            />
          ) : (
            <PatientAppointmentCard
              key={appointment._id}
              appointment={appointment}
            />
          )
        )}
      </div>
    </div>
  );
}
