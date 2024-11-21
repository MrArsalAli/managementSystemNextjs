import connectDB from "@/lib/connectDB";
import { RequestModal } from "@/lib/modals/RequestModal";
import { UserModal } from "@/lib/modals/UserModal";
import { populate } from "mongoose";


export async function GET(req, {params}) {
  await connectDB();
  const query = {};
  const requests = await RequestModal.findOne({_id : params.id }).populate("user");
  return Response.json(
    {
      error: false,
      msg: "Single Request fetched Successfully",
      requests,
    },
    { status: 200 }
  );
}

export async function DELETE(req) {}
