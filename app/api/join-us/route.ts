import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), 'join-us-data.xlsx');
    let workbook;
    let worksheet;

    // If file exists, load it; otherwise, create a new workbook
    if (fs.existsSync(filePath)) {
      workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);
      worksheet = workbook.getWorksheet('Submissions') || workbook.addWorksheet('Submissions');
    } else {
      workbook = new ExcelJS.Workbook();
      worksheet = workbook.addWorksheet('Submissions');
      worksheet.addRow([
        'First Name', 'Last Name', 'Email', 'Phone', 'How did you hear about us?', 'Message', 'Date'
      ]);
    }

    worksheet.addRow([
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.heardFrom,
      data.message,
      new Date().toLocaleString()
    ]);

    await workbook.xlsx.writeFile(filePath);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error?.toString() });
  }
} 