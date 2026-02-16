
import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function formatSheet() {
    console.log('--- Formatting Google Sheet ---');

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
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        if (!spreadsheetId) throw new Error('Missing Spreadsheet ID');

        // 1. Define Headers
        const headers = ['Timestamp', 'Contact Name', 'Business Name', 'Business Type', 'WhatsApp Number'];

        // 2. Update Headers (Row 1)
        console.log('Setting headers...');
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'Sheet1!A1:E1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [headers],
            },
        });

        // 3. Apply Formatting
        console.log('Applying styles...');
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
                requests: [
                    {
                        repeatCell: {
                            range: {
                                sheetId: 0, // Default sheet
                                startRowIndex: 0,
                                endRowIndex: 1,
                            },
                            cell: {
                                userEnteredFormat: {
                                    backgroundColor: { red: 0.2, green: 0.2, blue: 0.2 }, // Dark Grey
                                    textFormat: {
                                        foregroundColor: { red: 1, green: 1, blue: 1 }, // White
                                        bold: true,
                                        fontSize: 11,
                                    },
                                    horizontalAlignment: "CENTER",
                                },
                            },
                            fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)",
                        },
                    },
                    {
                        // Add Borders to the header and potential data rows (e.g., up to 100 rows)
                        updateBorders: {
                            range: {
                                sheetId: 0,
                                startRowIndex: 0,
                                endRowIndex: 100, // Apply to first 100 rows safely
                                startColumnIndex: 0,
                                endColumnIndex: 5,
                            },
                            top: { style: "SOLID", width: 1, color: { red: 0.8, green: 0.8, blue: 0.8 } },
                            bottom: { style: "SOLID", width: 1, color: { red: 0.8, green: 0.8, blue: 0.8 } },
                            left: { style: "SOLID", width: 1, color: { red: 0.8, green: 0.8, blue: 0.8 } },
                            right: { style: "SOLID", width: 1, color: { red: 0.8, green: 0.8, blue: 0.8 } },
                            innerHorizontal: { style: "SOLID", width: 1, color: { red: 0.8, green: 0.8, blue: 0.8 } },
                            innerVertical: { style: "SOLID", width: 1, color: { red: 0.8, green: 0.8, blue: 0.8 } },
                        },
                    },
                    {
                        // Auto-resize columns
                        autoResizeDimensions: {
                            dimensions: {
                                sheetId: 0,
                                dimension: "COLUMNS",
                                startIndex: 0,
                                endIndex: 5,
                            },
                        },
                    },
                ],
            },
        });

        console.log('✅ Sheet formatted successfully!');

    } catch (error: any) {
        console.error('❌ Failed to format sheet:', error.message);
        if (error.response) {
            console.error('Error details:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

formatSheet();
