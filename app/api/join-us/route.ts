import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, heardFrom, message } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !heardFrom || !message) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
    }

    await prisma.joinUsSubmission.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        heardFrom,
        message,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 