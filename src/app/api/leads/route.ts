import { NextRequest, NextResponse } from 'next/server';
import { googleSheetService } from '@/lib/google-sheets';
import { whatsappService } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name, phone, source, interest, extra } = body;

        // Validation — email is always required
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { success: false, error: 'Valid email is required' },
                { status: 400 }
            );
        }

        const now = new Date();
        const isoTimestamp = now.toISOString();
        const readableTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true });

        // Lead score based on completeness + source
        let score = 1; // base
        if (name) score += 1;
        if (phone) score += 2;
        if (source === 'exit-intent') score += 1;
        if (source === 'roi-calculator') score += 2;
        if (source === 'pricing-inquiry') score += 3;
        if (source === 'service-page') score += 2;

        const scoreLabel = score >= 5 ? 'HOT 🔥' : score >= 3 ? 'WARM 🟡' : 'COLD ❄️';

        // 1. Save to Google Sheets (Leads tab)
        const sheetId = process.env.GOOGLE_SHEET_ID;
        if (sheetId) {
            const sheetResult = await googleSheetService.appendRow(
                sheetId,
                [
                    isoTimestamp,
                    email,
                    name || '',
                    phone || '',
                    source || 'unknown',
                    interest || '',
                    extra || '',
                    scoreLabel,
                    'NEW',
                ],
                'Leads!A1'
            );

            if (!sheetResult.success) {
                console.warn('[Leads API] Google Sheets failed:', sheetResult.error);
            } else {
                console.log('[Leads API] Lead saved to Google Sheets ✅');
            }
        }

        // 2. WhatsApp admin notification for warm/hot leads
        if (score >= 3) {
            const adminNumber = process.env.BUSINESS_WHATSAPP_NUMBER;
            if (adminNumber) {
                const message =
                    `🔔 *New Lead — NousKūn AI*\n\n` +
                    `📧 *Email:* ${email}\n` +
                    `${name ? `👤 *Name:* ${name}\n` : ''}` +
                    `${phone ? `📱 *Phone:* ${phone}\n` : ''}` +
                    `🎯 *Source:* ${source || 'unknown'}\n` +
                    `${interest ? `💡 *Interest:* ${interest}\n` : ''}` +
                    `${extra ? `📊 *Extra:* ${extra}\n` : ''}` +
                    `🏷️ *Score:* ${scoreLabel}\n\n` +
                    `🕐 ${readableTime}`;

                const result = await whatsappService.sendText(adminNumber, message);
                if (!result.success) {
                    console.warn('[Leads API] Admin WhatsApp failed:', result.error);
                }
            }
        }

        return NextResponse.json({ success: true, score: scoreLabel });

    } catch (error: any) {
        console.error('[Leads API] Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
