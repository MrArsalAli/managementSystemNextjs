import connectDB from "@/lib/connectDB";
import { RequestModal } from "@/lib/modals/RequestModal";
import { UserModal } from "@/lib/modals/UserModal";
import { populate } from "mongoose";

export async function POST(req) {
  await connectDB();
  try {
    const obj = await req.json();
    const isUserRequestedBefore = await RequestModal.findOne({
      user: obj.user,
    });
    if (isUserRequestedBefore) {
      return Response.json(
        {
          error: true,
          msg: "You had already requested as a doctor",
        },
        { status: 403 }
      );
    }

    let newRequest = await new RequestModal({ ...obj });
    newRequest = await newRequest.save();

    return Response.json(
      {
        error: false,
        msg: "Request Registered Successfully",
        request: newRequest,
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
  const query = {};
  const status = req.nextUrl.searchParams.get("status");
  if (status && status != "all") {
    query.status = status;
  }

  const requests = await RequestModal.find(query).populate("user");
  return Response.json(
    {
      error: false,
      msg: "Requests fetched Successfully",
      requests,
    },
    { status: 200 }
  );
}

export async function PUT(req) {
  await connectDB();
  try {
    const obj = await req.json();
    let { id, status } = obj;
    const request = await RequestModal.findOne({ _id: id });
    
    await UserModal.findOneAndUpdate({ _id: request.user }, { role: "doctor" });
    const updated = await RequestModal.findOneAndUpdate(
      { _id: id },
      { status: status }
    ).exec();
    return Response.json(
      {
        error: false,
        msg: "Request updated Successfully",
        request: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        error: false,
        msg: "Somethong went wrong",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(req) {}
