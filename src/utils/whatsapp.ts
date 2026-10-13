export const WHATSAPP_NUMBER = '918825910051';
export const DISPLAY_MOBILE = '8825910051';
export const DISPLAY_EMAIL = 'freelearner505@gmail.com';

export interface WhatsAppEnquiryPayload {
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  service?: string;
  packageTier?: string;
  budget?: string;
  timeline?: string;
  brief?: string;
}

/**
 * Builds a direct WhatsApp click-to-chat URL with an optional encoded message.
 */
export function createWhatsAppUrl(customMessage?: string): string {
  const defaultText = "Hi Vici Studio! I'm interested in discussing a website project for my business.";
  const text = customMessage && customMessage.trim().length > 0 ? customMessage : defaultText;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Formats a comprehensive, structured project enquiry for WhatsApp
 */
export function buildEnquiryWhatsAppMessage(data: WhatsAppEnquiryPayload): string {
  const parts: string[] = [
    `*NEW PROJECT ENQUIRY — VICI STUDIO*`,
    `----------------------------------------`,
    `👤 *Client Name:* ${data.name || 'Anonymous Partner'}`,
  ];

  if (data.company?.trim()) {
    parts.push(`🏢 *Company / Brand:* ${data.company.trim()}`);
  }

  if (data.phone?.trim()) {
    parts.push(`📞 *WhatsApp / Mobile:* ${data.phone.trim()}`);
  }

  if (data.email?.trim()) {
    parts.push(`✉️ *Email:* ${data.email.trim()}`);
  }

  if (data.service?.trim()) {
    parts.push(`🚀 *Requested Service:* ${data.service.trim()}`);
  }

  if (data.packageTier?.trim()) {
    parts.push(`📦 *Package Tier:* ${data.packageTier.trim()}`);
  }

  if (data.budget?.trim()) {
    parts.push(`💰 *Budget Range:* ${data.budget.trim()}`);
  }

  if (data.timeline?.trim()) {
    parts.push(`⏱️ *Expected Timeline:* ${data.timeline.trim()}`);
  }

  if (data.brief?.trim()) {
    parts.push(`\n📝 *Project Brief:*\n${data.brief.trim()}`);
  } else {
    parts.push(`\n📝 *Project Brief:* Client requested a discovery consultation and fast quote.`);
  }

  parts.push(`----------------------------------------`);
  parts.push(`_Sent via Vici Studio Web Portal_`);

  return parts.join('\n');
}

/**
 * Opens WhatsApp directly in a new window/tab safely
 */
export function openWhatsAppDirect(message?: string): void {
  const url = createWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}
