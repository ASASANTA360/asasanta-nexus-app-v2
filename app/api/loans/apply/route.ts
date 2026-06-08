import connectDB from "@/lib/mongodb";
import Loan from "@/models/Loan";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const loan = await Loan.create({
      businessName: body.businessName,
      amount: body.amount,
      purpose: body.purpose,
      duration: body.duration,
    });

    return Response.json({
      success: true,
      loan,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Loan application failed",
    });
  }
}