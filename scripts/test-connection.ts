
import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testSheets() {
    console.log('--- Google Sheets Connection Test ---');
    console.log('Client Email:', process.env.GOOGLE_CLIENT_EMAIL?.substring(0, 30) + '...');

    try {
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
        if (!privateKey) throw new Error('Missing Private Key');

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: privateKey,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        console.log('Attempting to append a test row...');
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'Sheet1!A1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[new Date().toISOString(), 'Connection Test', 'System', 'Debug', '0000000000']],
            },
        });

        console.log('✅ SUCCESS: Connected and appended row to Google Sheet!');
    } catch (error: any) {
        console.error('❌ FAILED:', error.message);
        if (error.response) {
            console.error('Error details:', error.response.data);
        }
    }
}

testSheets();
