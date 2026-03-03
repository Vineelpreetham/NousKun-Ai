import { NextRequest, NextResponse } from 'next/server';
import { googleSheetService } from '@/lib/google-sheets';
import { whatsappService } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, businessName, businessType, whatsappNumber, interest } = body;

        // Validation
        if (!name || !businessName || !businessType || !whatsappNumber) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const now = new Date();
        const isoTimestamp = now.toISOString();

        // 1. Save to Google Sheets
        const sheetId = process.env.GOOGLE_SHEET_ID;
        if (sheetId) {
            const sheetResult = await googleSheetService.appendRow(sheetId, [
                isoTimestamp,
                name,
                businessName,
                businessType,
                whatsappNumber,
                interest || '',
            ]);
            if (!sheetResult.success) {
                console.warn('[Contact API] Google Sheets failed:', sheetResult.error);
            } else {
                console.log('[Contact API] Lead saved to Google Sheets ✅');
            }
        }

        // 2. Admin notification — plain text with all lead details
        const adminResult = await whatsappService.notifyAdmin({
            name,
            businessName,
            businessType,
            whatsappNumber,
            interest,
        });

        if (!adminResult.success) {
            console.warn('[Contact API] Admin notification failed:', adminResult.error);
        } else {
            console.log('[Contact API] Admin notified ✅');
        }

        // 3. User acknowledgement
        const userResult = await whatsappService.acknowledgeUser({
            name,
            businessName,
            whatsappNumber,
        });

        if (!userResult.success) {
            console.warn('[Contact API] User acknowledgement failed:', userResult.error);
        } else {
            console.log('[Contact API] User acknowledged ✅');
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('[Contact API] Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
