
import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function backupSheet() {
    console.log('--- Backing up Google Sheet ---');

    try {
        // 1. Setup Auth
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
        if (!privateKey) throw new Error('Missing Private Key');

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: privateKey,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        // 2. Fetch Data
        console.log('Fetching data...');
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A:E', // Fetch all columns A-E
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }

        // 3. Prepare Backup Directory
        const backupDir = path.join(process.cwd(), 'backups');
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
        }

        // 4. Write to CSV
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `leads_backup_${timestamp}.csv`;
        const filePath = path.join(backupDir, filename);

        const csvContent = rows.map(row => row.map(cell => `"${cell || ''}"`).join(',')).join('\n');

        fs.writeFileSync(filePath, csvContent);

        console.log(`✅ Backup saved to: backups/${filename}`);

    } catch (error: any) {
        console.error('❌ Backup failed:', error.message);
    }
}

backupSheet();
