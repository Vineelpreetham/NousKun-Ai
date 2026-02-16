import { google } from 'googleapis';

export class GoogleSheetService {
    private auth;
    private sheets;

    constructor() {
        const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

        if (!clientEmail || !privateKey) {
            console.error('Missing Google Sheets credentials');
        }

        this.auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        this.sheets = google.sheets({ version: 'v4', auth: this.auth });
    }

    async appendRow(spreadsheetId: string, values: any[]) {
        try {
            const response = await this.sheets.spreadsheets.values.append({
                spreadsheetId,
                range: 'Sheet1!A1', // Appends to the first sheet
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: [values],
                },
            });
            return { success: true, data: response.data };
        } catch (error: any) {
            console.error('Google Sheets Error:', error.message);
            return { success: false, error: error.message };
        }
    }
}

export const googleSheetService = new GoogleSheetService();
