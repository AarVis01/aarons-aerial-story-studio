/**
 * Sends the "new enquiry" notification email to the business.
 * Returns a status stored on the enquiry: "sent", "not_configured" or "failed".
 */
export async function notifyNewEnquiry(_args: {
  to: string;
  enquiryId: string;
  enquiry: Record<string, string | undefined>;
}): Promise<"sent" | "not_configured" | "failed"> {
  return "not_configured";
}
