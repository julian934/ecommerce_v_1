//import { authOptions } from '/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server";


export async function GET(request) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    NextResponse.status(401).json({ message: "You must be logged in." });
    return;
  }

  return NextResponse.json({
    message: 'Success', userInfo:session
  })
}