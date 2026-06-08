import connectDB from "@/lib/mongodb";
import KYC from "@/models/KYC";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const kyc = await KYC.create({
      fullName: body.fullName,
      nin: body.nin,
      email: body.email,
      phone: body.phone,
    });

    return Response.json({
      success: true,
      kyc,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "KYC submission failed",
    });
  }
}