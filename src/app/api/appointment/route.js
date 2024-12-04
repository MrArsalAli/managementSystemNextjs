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
  const status = req?.nextUrl?.searchParams?.get("status");
  const now = Date.now();
  const query = {};
  if (doctor) {
    const doctorRequest = await RequestModal.findOne({ user: doctor });
    query.request = doctorRequest._id;
  }
  if (status && status != "upcoming" && status != "past") query.status = status;
  if (status && status == "upcoming") {
    query.date = { $gt: now };
    query.status = "accepted";
  }
  if (status && status == "past") {
    query.date = { $lt: now };
  }
  if (user) query.user = user;

  const stats = {
    accepted: await AppointmentModal.find({
      status: "accepted ",
    }).countDocuments(),
    cancelled: await AppointmentModal.find({
      status: "cancelled ",
    }).countDocuments(),
    pending: await AppointmentModal.find({
      status: "pending ",
    }).countDocuments(),
  };

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
      stats,
    },
    { status: 201 }
  );
}

export async function PUT(req) {
  await connectDB();
  try {
    const { id, status } = await req.json();
    const update = await AppointmentModal.findOneAndUpdate(
      { _id: id },
      { status: status }
    ).exec();
    return Response.json(
      {
        error: false,
        msg: "Appointment updated Successfully",
        appointment: update,
      },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      {
        error: true,
        msg: "Something went wrong",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(req) {}
