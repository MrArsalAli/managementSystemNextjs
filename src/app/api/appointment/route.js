import connectDB from "@/lib/connectDB";
import { AppointmentModal } from "@/lib/modals/AppointmentModal";

export async function POST(req) {
  await connectDB();
  try {
    const obj = await req.json();
    let newAppointment = await new AppointmentModal({ ...obj });
    newAppointment = await newAppointment.save();
    return Response.json(
      {
        error: false,
        msg: "Your Appointment is Booked, You will soon recieve Confirmation",
        appointment: newAppointment,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        error: true,
        msg: "Something went wrong",
      },
      { status: 400 }
    );
  }
}

export async function GET(req) {
  await connectDB();
  const doctor = req?.nextUrl?.searchParams?.get("doctor");
  const user = req?.nextUrl?.searchParams?.get("user");
  const query = {};
  if (doctor) query.request = doctor;
  if (user) query.request = user;

  const appointments = await AppointmentModal.find(query)
    .populate("user")
    .populate("request");
  return Response.json(
    {
      error: false,
      msg: "Apointments fetched Successfully",
      appointments,
    },
    { status: 201 }
  );
}

export async function PUT(req) {}

export async function DELETE(req) {}
