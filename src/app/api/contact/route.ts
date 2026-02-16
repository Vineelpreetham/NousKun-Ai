
import { NextRequest, NextResponse } from 'next/server';
import { googleSheetService } from '@/lib/google-sheets';
import { whatsappService } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, businessName, businessType, whatsappNumber } = body;

        // Basic validation
        if (!name || !businessName || !businessType || !whatsappNumber) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const timestamp = new Date().toISOString();

        // 1. Save to Google Sheets
        // Structure: Timestamp, Name, Business, Type, WhatsApp
        const sheetId = process.env.GOOGLE_SHEET_ID;
        if (sheetId) {
            await googleSheetService.appendRow(sheetId, [
                timestamp,
                name,
                businessName,
                businessType,
                whatsappNumber
            ]);
        } else {
            console.warn('GOOGLE_SHEET_ID not set, skipping sheet append');
        }

        // 2. Send Admin Notification (Standard Message)
        /*
        const adminMessage = `🚀 *New Lead: NousKūn AI*
        
👤 *Name:* ${name}
🏢 *Business:* ${businessName}
🏷️ *Type:* ${businessType}
📱 *WhatsApp:* ${whatsappNumber}
⏰ *Time:* ${new Date().toLocaleString()}`;

        await whatsappService.sendToAdmin(adminMessage);
        */

        // const adminNumber = process.env.BUSINESS_WHATSAPP_NUMBER;
        // 3. Send User Confirmation (Template Message)

        /*
        try {
            // Try sending a template if variables are set
            // This requires a template named 'welcome_message' with 1 variable (name)
            
            // await whatsappService.sendToUser(whatsappNumber, 'welcome_message', [
            //    { type: 'text', text: name }
            // ]); 
            

            // Sending a direct text (only works if conversation exists)
            //  await whatsappService.sendToUserText(whatsappNumber, `Hi ${name}, thanks for reaching out to NousKūn AI! We've received your inquiry.`);
        } catch (e) {
            console.log('Could not send user message (likely due to 24h window policy)', e);
        }
        */

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
