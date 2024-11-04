import { columns } from "@/components/AppointmentsTable/coloumns";
import { AppointmentTable } from "@/components/AppointmentsTable/data-table";
import { appointments } from "@/lib/data";


export default function Appointments() {
  return (
    <div className="min-h-screen container mx-auto">
        <h1 className="text-3xl my-8">Appointments</h1>
        <AppointmentTable columns={columns} data={appointments}/>
    </div>
  )
}
