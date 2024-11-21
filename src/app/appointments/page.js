import { columns } from "@/components/AppointmentsTable/coloumns";
import { AppointmentTable } from "@/components/AppointmentsTable/data-table";
import { auth } from "../../../auth";
import { getAppointments } from "@/actions/appointment";

export default async function Appointments() {
  const session = await auth();
  const {appointments}  = await getAppointments("user", session.user._id);
  console.log("appointments==>", appointments);
  return (
    <div className="min-h-screen container mx-auto">
      <h1 className="text-3xl my-8">Appointments</h1>

      {/* <AppointmentTable columns={columns} data={appointments} /> */}
    </div>
  );
}
