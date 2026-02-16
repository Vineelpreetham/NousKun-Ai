
export class WhatsAppService {
    private phoneNumerId: string;
    private accessToken: string;
    private businessAccountId: string;

    constructor() {
        this.phoneNumerId = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
        this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN || '';
        this.businessAccountId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '';
    }

    async sendToUser(to: string, templateName: string, components: any[]) {
        try {
            const response = await fetch(
                `https://graph.facebook.com/v19.0/${this.phoneNumerId}/messages`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messaging_product: 'whatsapp',
                        to: to,
                        type: 'template',
                        template: {
                            name: templateName,
                            language: { code: 'en_US' },
                            components: components
                        }
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error('WhatsApp User API Error:', data);
                return { success: false, error: data };
            }

            return { success: true, data };
        } catch (error) {
            console.error('WhatsApp Service Error:', error);
            return { success: false, error };
        }
    }

    async sendToAdmin(message: string) {
        const adminNumber = process.env.BUSINESS_WHATSAPP_NUMBER;
        if (!adminNumber) {
            console.error('Admin WhatsApp number not configured');
            return { success: false, error: 'Admin number missing' };
        }

        try {
            const response = await fetch(
                `https://graph.facebook.com/v19.0/${this.phoneNumerId}/messages`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messaging_product: 'whatsapp',
                        to: adminNumber,
                        type: 'text',
                        text: { body: message }
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error('WhatsApp Admin API Error:', data);
                return { success: false, error: data };
            }

            return { success: true, data };
        } catch (error) {
            console.error('WhatsApp Service Error:', error);
            return { success: false, error };
        }
    }
}

export const whatsappService = new WhatsAppService();
