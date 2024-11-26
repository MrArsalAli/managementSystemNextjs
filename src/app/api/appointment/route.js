import connectDB from "@/lib/connectDB";
import { AppointmentModal } from "@/lib/modals/AppointmentModal";
import { RequestModal } from "@/lib/modals/RequestModal";
import { populate } from "mongoose";

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
  if (doctor){
    const doctorRequest = await RequestModal.findOne({user : doctor})
    query.request = doctorRequest._id;
  }
  const query = {};
  if (user) query.user = user;
  const appointments = await AppointmentModal.find(query)
    .populate("user")
    .populate({
      path: "request",
      populate: { path: "user" },
    });
  return Response.json(
    {
      error: false,
      msg: "Appointments fetched Successfully",
      appointments,
    },
    { status: 201 }
  );
}

export async function PUT(req) {}

export async function DELETE(req) {}
