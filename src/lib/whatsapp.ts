/**
 * WhatsApp integration via Twilio
 * Docs: https://www.twilio.com/docs/whatsapp
 *
 * Required env vars:
 *   TWILIO_ACCOUNT_SID   — from twilio.com/console
 *   TWILIO_AUTH_TOKEN    — from twilio.com/console
 *   TWILIO_WHATSAPP_FROM — sandbox: "whatsapp:+14155238886"  |  production: "whatsapp:+YOUR_NUMBER"
 */

const TWILIO_API_BASE = 'https://api.twilio.com/2010-04-01';

export class WhatsAppService {
    private accountSid: string;
    private authToken: string;
    private fromNumber: string;

    constructor() {
        this.accountSid = process.env.TWILIO_ACCOUNT_SID || '';
        this.authToken = process.env.TWILIO_AUTH_TOKEN || '';
        this.fromNumber = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
    }

    private isConfigured(): boolean {
        return !!(this.accountSid && this.authToken);
    }

    private formatNumber(phone: string): string {
        let cleaned = phone.replace(/\D/g, '');
        if (!cleaned.startsWith('91') && cleaned.length === 10) {
            cleaned = '91' + cleaned;
        }
        return `whatsapp:+${cleaned}`;
    }

    /**
     * Send a plain text WhatsApp message to any number.
     * Works in sandbox without template approval.
     */
    async sendText(to: string, message: string): Promise<{ success: boolean; sid?: string; error?: string }> {
        if (!this.isConfigured()) {
            console.warn('[WhatsApp] Twilio not configured — check TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN');
            return { success: false, error: 'Not configured' };
        }

        const toFormatted = to.startsWith('whatsapp:') ? to : this.formatNumber(to);

        try {
            const credentials = Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64');

            const body = new URLSearchParams({
                From: this.fromNumber,
                To: toFormatted,
                Body: message,
            });

            const response = await fetch(
                `${TWILIO_API_BASE}/Accounts/${this.accountSid}/Messages.json`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Basic ${credentials}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: body.toString(),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error('[WhatsApp] Twilio error:', data);
                return { success: false, error: data.message || 'Twilio API error' };
            }

            console.log('[WhatsApp] Message sent ✅ SID:', data.sid, '→', toFormatted);
            return { success: true, sid: data.sid };

        } catch (error: any) {
            console.error('[WhatsApp] Exception:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Send admin notification with full lead details.
     */
    async notifyAdmin(lead: {
        name: string;
        businessName: string;
        businessType: string;
        whatsappNumber: string;
        interest?: string;
    }): Promise<{ success: boolean; error?: string }> {
        const adminNumber = process.env.BUSINESS_WHATSAPP_NUMBER || '';

        if (!adminNumber) {
            console.warn('[WhatsApp] BUSINESS_WHATSAPP_NUMBER not set');
            return { success: false, error: 'Admin number not configured' };
        }

        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true });

        const message =
            `🔔 *New Lead — NousKūn AI*

👤 *Name:* ${lead.name}
🏢 *Business:* ${lead.businessName}
🏷️ *Type:* ${lead.businessType}
📱 *WhatsApp:* ${lead.whatsappNumber}${lead.interest ? `\n💡 *Interested in:* ${lead.interest}` : ''}

🕐 ${timestamp}

Reply directly to this number to follow up.`;

        return this.sendText(adminNumber, message);
    }

    /**
     * Send acknowledgement to the lead (user who filled the form).
     */
    async acknowledgeUser(lead: {
        name: string;
        businessName: string;
        whatsappNumber: string;
    }): Promise<{ success: boolean; error?: string }> {
        const message =
            `Hello ${lead.name}! 👋

Thanks for reaching out to *NousKūn AI*. We've received your inquiry for *${lead.businessName}*.

Our team will review your details and get back to you within *24 hours* to schedule a strategy call.

In the meantime, explore what we build:
🌐 https://nouskun.com

— NousKūn AI Team`;

        return this.sendText(lead.whatsappNumber, message);
    }
}

export const whatsappService = new WhatsAppService();
