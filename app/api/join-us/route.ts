import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDENTIALS_PATH = path.join(process.cwd(), 'app/api/join-us/credentials.json');
const SPREADSHEET_ID = '1Rwd53eaV27u2_cA4J9i2KWmkSasgfM8AF_5kXxS3NPA';
const SHEET_NAME = 'Sheet1';

function getAuth() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
  return auth;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare the row in the order of the sheet columns
    const values = [
      [
        body.firstName || '',
        body.lastName || '',
        body.email || '',
        body.phone || '',
        body.howDidYouHear || '',
        body.message || '',
        new Date().toISOString(), // Date
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 