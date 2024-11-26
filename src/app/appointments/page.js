import { auth } from "../../../auth";
import { getAppointments } from "@/actions/appointment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DoctorAppointmentCard from "@/components/DoctorAppointmentCard/DoctorAppointmentCard";
dayjs.extend(relativeTime);

export default async function Appointments() {
  const session = await auth();
  const { appointments } = await getAppointments(
    session.user.role == "doctor" ? "doctor" : "user",
    session.user._id
  );
  console.log("appointments==>", appointments);

  const isDoctor = session.user.role == "doctor";
  return (
    <div className=" min-h-screen container mx-auto">
      <div className="grid grid-cols-3 gap-4 my-8">
        <h1 className="my-10 font-bold text-2xl">
          {isDoctor ? "Patients Appointments" : "Your Doctor Appointments"}
        </h1>
        {appointments.map((appointment) =>
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
